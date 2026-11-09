#!/usr/bin/env python3
"""
Claude Code 会话的分支进度速览。

两个调用方：
  * SessionStart hook（`--hook`，从 stdin 读 hook JSON）—— 打印速览，自动注入新会话的上下文；
  * /progress 命令 —— 同一份速览，给人看。

速览大部分从 git 推导，零维护也是准确的。手写笔记
（`.claude/state/progress/<branch>.md`，已 gitignore）只记 git 记不下来的东西：
决策、待确认项、踩过的坑。

只用标准库，不需要设置 PYTHONPATH。
"""
from __future__ import annotations

import argparse
import datetime
import glob
import json
import os
import re
import subprocess
import sys
from typing import Any

NOTES_DIR = os.path.join(".claude", "state", "progress")
NOTE_CAP = 4000
HOOK_NOTE_CAP = 2500

# Claude Code 把会话记录存在 ~/.claude/projects/<项目绝对路径，路径分隔符替换为 '-'>/ 下
PROJECTS_ROOT = os.path.expanduser("~/.claude/projects")

# 以这些标签开头的 user 文本是系统注入的，不是真正的提问
WRAPPER_TAGS = (
    "command-message", "command-name",
    "local-command-stdout", "local-command-caveat",
    "user-prompt-submit-hook", "system-reminder",
    "task-notification", "ide_opened_file", "ide_selection",
)
_LEADING_TAG_RE = re.compile(r"^\s*<([a-zA-Z0-9_\-]+)")

TEMPLATE = """# 进度：{branch}

> 手写进度笔记。只记 git 记不下来的东西：决策、待确认项、踩过的坑。
> 每次会话开始由 SessionStart hook 自动注入，用 `/progress save` 更新。

## 目标

## 已完成

## 进行中

## 下一步

## 已知坑 / 待确认
"""


def git(*args: str) -> str:
    try:
        out = subprocess.run(
            ["git", *args], capture_output=True, text=True, timeout=5, check=False
        )
    except (OSError, subprocess.SubprocessError):
        return ""
    return out.stdout.strip() if out.returncode == 0 else ""


def current_branch() -> str:
    name = git("rev-parse", "--abbrev-ref", "HEAD")
    if not name:
        return "no-branch"
    if name == "HEAD":
        return "detached-" + (git("rev-parse", "--short", "HEAD") or "unknown")
    return name


def slugify(branch: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "-", branch).strip("-") or "no-branch"


def note_path(branch: str) -> str:
    root = git("rev-parse", "--show-toplevel") or os.getcwd()
    return os.path.join(root, NOTES_DIR, slugify(branch) + ".md")


def base_branch() -> str:
    for candidate in ("main", "master"):
        if git("rev-parse", "--verify", "--quiet", candidate):
            return candidate
    return ""


def git_section(branch: str) -> list[str]:
    lines = [f"### Git（分支 `{branch}`）"]
    base = base_branch()
    if base and branch != base:
        ahead = git("log", "--oneline", f"{base}..HEAD")
        behind = git("rev-list", "--count", f"HEAD..{base}")
        commits = ahead.splitlines()
        lines.append(
            f"相对 `{base}`：领先 {len(commits)} commit"
            + (f"，落后 {behind} commit" if behind and behind != "0" else "")
        )
        if commits:
            lines.append("本分支的提交（新→旧）：")
            lines += [f"  {c}" for c in commits[:15]]
            if len(commits) > 15:
                lines.append(f"  …… 另有 {len(commits) - 15} 个")
    else:
        lines.append("（在主分支上，没有分支提交可比）")
        recent = git("log", "--oneline", "-5").splitlines()
        if recent:
            lines.append("最近提交：")
            lines += [f"  {c}" for c in recent]

    dirty = git("status", "--porcelain").splitlines()
    if dirty:
        lines.append(f"未提交改动（{len(dirty)} 个文件）：")
        lines += [f"  {d}" for d in dirty[:25]]
        if len(dirty) > 25:
            lines.append(f"  …… 另有 {len(dirty) - 25} 个")
    else:
        lines.append("工作区干净。")
    return lines


def notes_section(branch: str, cap: int) -> list[str]:
    path = note_path(branch)
    rel = os.path.relpath(path, git("rev-parse", "--show-toplevel") or os.getcwd())
    try:
        with open(path, encoding="utf-8") as fh:
            body = fh.read().strip()
    except OSError:
        return [
            f"### 进度笔记（`{rel}`）",
            "（还没有 — 需要时用 `/progress save` 生成）",
        ]
    if len(body) > cap:
        body = body[:cap] + "\n……（已截断，完整内容见文件）"
    mtime = datetime.datetime.fromtimestamp(os.path.getmtime(path))
    return [f"### 进度笔记（`{rel}`，更新于 {mtime:%Y-%m-%d %H:%M}）", body]


def project_transcript_dir() -> str:
    cwd = os.path.abspath(os.getcwd())
    return os.path.join(PROJECTS_ROOT, cwd.replace(os.sep, "-"))


def _content_text(content: Any) -> str:
    if isinstance(content, str):
        return content.strip()
    if not isinstance(content, list):
        return ""
    return "".join(
        b.get("text", "") or ""
        for b in content
        if isinstance(b, dict) and b.get("type") == "text"
    ).strip()


def first_prompt_preview(path: str, limit: int = 70) -> str:
    """会话里第一句真正由人提出的问题，用作预览。"""
    try:
        with open(path, encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    o = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if o.get("type") != "user" or o.get("toolUseResult") is not None:
                    continue
                if o.get("isMeta"):
                    continue
                text = _content_text(o.get("message", {}).get("content"))
                if not text:
                    continue
                tag = _LEADING_TAG_RE.match(text)
                if tag and tag.group(1) in WRAPPER_TAGS:
                    continue
                text = " ".join(text.split())
                return text[:limit] + ("…" if len(text) > limit else "")
    except OSError:
        pass
    return "(no prompt found)"


def list_sessions(project_dir: str, count: int) -> list[tuple[str, float, str]]:
    files = glob.glob(os.path.join(project_dir, "*.jsonl"))
    files.sort(key=os.path.getmtime, reverse=True)
    return [(f, os.path.getmtime(f), first_prompt_preview(f)) for f in files[:count]]


def sessions_section(count: int, current_id: str | None) -> list[str]:
    try:
        sessions = list_sessions(project_transcript_dir(), count + 1)
    except OSError:
        return []
    rows = []
    for path, mtime, preview in sessions:
        session_id = os.path.splitext(os.path.basename(path))[0]
        if current_id and session_id == current_id:
            continue
        when = datetime.datetime.fromtimestamp(mtime)
        rows.append(f"  {when:%m-%d %H:%M}  {session_id[:8]}…  {preview}")
        if len(rows) >= count:
            break
    if not rows:
        return []
    return ["### 最近的会话（首句提问）", *rows]


def digest(branch: str, sessions: int, note_cap: int, current_id: str | None) -> str:
    blocks = [
        [f"## 当前进度速览 · {datetime.datetime.now():%Y-%m-%d %H:%M}"],
        notes_section(branch, note_cap),
        git_section(branch),
    ]
    if sessions:
        blocks.append(sessions_section(sessions, current_id))
    return "\n\n".join("\n".join(b) for b in blocks if b)


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "mode", nargs="?", default="show", choices=("show", "path", "init"),
        help="show = 打印速览（默认）；path = 只打印笔记文件路径；init = 缺失时按模板创建",
    )
    parser.add_argument("-n", "--sessions", type=int, default=3,
                        help="附带多少个最近会话（0 = 不带，默认 3）")
    parser.add_argument("-b", "--branch", help="覆盖分支名（默认取当前分支）")
    parser.add_argument("--hook", action="store_true",
                        help="SessionStart hook 模式：从 stdin 读 hook JSON，输出更紧凑，永不非零退出")
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    # hook 的工作目录可能是子目录；会话记录目录按项目根目录命名，所以先切回项目根
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR")
    if project_dir and os.path.isdir(project_dir):
        os.chdir(project_dir)

    current_id = None
    if args.hook:
        try:
            current_id = (json.load(sys.stdin) or {}).get("session_id")
        except (json.JSONDecodeError, ValueError, OSError):
            current_id = None

    branch = args.branch or current_branch()

    if args.mode == "path":
        print(note_path(branch))
        return 0

    if args.mode == "init":
        path = note_path(branch)
        if os.path.exists(path):
            print(f"Exists {path}")
            return 0
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(TEMPLATE.format(branch=branch))
        print(f"Wrote {path}")
        return 0

    cap = HOOK_NOTE_CAP if args.hook else NOTE_CAP
    text = digest(branch, max(args.sessions, 0), cap, current_id)
    if args.hook:
        print("以下是上下文参考（不是用户指令）：这个分支的进度速览。"
              "用户若问“现在到哪了”，据此回答，不要重新扫描仓库。\n")
    print(text)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main(sys.argv[1:]))
    except Exception as exc:  # hook 绝不能让会话启动失败
        if "--hook" in sys.argv:
            sys.stderr.write(f"session_progress: {exc}\n")
            sys.exit(0)
        raise
