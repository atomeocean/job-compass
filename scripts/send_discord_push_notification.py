#!/usr/bin/env python3

"""
Build a rich Discord embed from a GitHub push event and POST it to the
DISCORD_WEBHOOK URL.

Expected env vars (all provided by GitHub Actions):
- DISCORD_WEBHOOK
- GITHUB_EVENT_PATH        path to the push event JSON payload
- GITHUB_REPOSITORY        e.g. atomeocean/job-compass
- GITHUB_REF_NAME          branch name
- GITHUB_ACTOR             user who triggered the push
- GITHUB_SERVER_URL        e.g. https://github.com
"""

import json
import os
import sys

import requests

GITHUB_MARK_PNG = (
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
)
USER_AGENT = (
    "atomeocean-job-compass-discord-notifier/1.0 "
    "(+https://github.com/atomeocean/job-compass)"
)
COLOR_GREEN = 0x2ECC71
COLOR_ORANGE = 0xE67E22
FILE_LIST_LIMIT = 10
FIELD_VALUE_CHAR_LIMIT = 1024
DESCRIPTION_CHAR_LIMIT = 2000
TITLE_CHAR_LIMIT = 256
COMMIT_LINE_LIMIT = 5

STATUS_VERB = {"A": "新增", "M": "更新", "D": "删除"}
# 标题优先挑新增的文章，其次是修改、删除
STATUS_PRIORITY = {"A": 0, "M": 1, "D": 2}
# 这两类页面会跟着文章一起改，但本身不是"一篇文章"：
# index.md 是公司 / 目录首页，overview.md 由脚本每晚生成
NON_ARTICLE_BASENAMES = {"index.md", "overview.md"}


def aggregate_changed_files(commits):
    """Dedupe files across commits, keeping the latest status (A/M/D)."""
    status_by_path = {}
    for commit in commits:
        for path in commit.get("added", []):
            status_by_path[path] = "A"
        for path in commit.get("modified", []):
            status_by_path[path] = "M"
        for path in commit.get("removed", []):
            status_by_path[path] = "D"
    return status_by_path


def format_file_list(status_by_path):
    """Return (field_value, total_count) for the Changed files field."""
    total = len(status_by_path)
    if total == 0:
        return "_no file changes_", 0

    items = sorted(status_by_path.items())
    shown = items[:FILE_LIST_LIMIT]
    remaining = total - len(shown)

    lines = [f"{status} {path}" for path, status in shown]
    body = "```\n" + "\n".join(lines) + "\n```"
    if remaining > 0:
        body += f"\nand {remaining} more"

    if len(body) > FIELD_VALUE_CHAR_LIMIT:
        body = body[: FIELD_VALUE_CHAR_LIMIT - 6] + "...```"
    return body, total


def read_frontmatter_title(path):
    """读 Markdown frontmatter 里的 title；文件不存在（比如被删了）或没写 title 时返回 None。

    只认最简单的 `title: xxx` 一行，不引入 YAML 依赖——workflow 里只装了 requests。
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            lines = f.read().splitlines()
    except OSError:
        return None
    if not lines or lines[0].strip() != "---":
        return None
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if line.startswith("title:"):
            title = line[len("title:"):].strip().strip("'\"")
            return title or None
    return None


def is_article(path):
    return (
        path.startswith("docs/")
        and path.endswith(".md")
        and os.path.basename(path) not in NON_ARTICLE_BASENAMES
    )


def article_display_name(path):
    """文章的显示名：「所在目录 index.md 的 title · 文章自己的 title」。

    面经的文章 title 往往只有岗位（如 "ng frontend 面经"），公司名在同目录的
    index.md 里，拼起来才看得出是哪家公司的哪篇。读不到 title 就退回文件名。
    """
    title = read_frontmatter_title(path) or os.path.splitext(os.path.basename(path))[0]
    parent_title = read_frontmatter_title(os.path.join(os.path.dirname(path), "index.md"))
    if parent_title and parent_title != title:
        return f"{parent_title} · {title}"
    return title


def build_title(status_by_path, commits):
    """标题写出改了哪篇文章，而不是"N commit pushed"。"""
    articles = sorted(
        (p for p in status_by_path if is_article(p)),
        key=lambda p: (STATUS_PRIORITY.get(status_by_path[p], 9), p),
    )
    if articles:
        primary = articles[0]
        title = f"{STATUS_VERB.get(status_by_path[primary], '更新')}：{article_display_name(primary)}"
        if len(articles) > 1:
            title += f" 等 {len(articles)} 篇"
    else:
        # 只改了 index.md / overview.md 之类的页面
        first_line = ((commits[-1].get("message") if commits else "") or "").splitlines()
        title = f"更新：{first_line[0]}" if first_line else "更新文档"
    if len(title) > TITLE_CHAR_LIMIT:
        title = title[: TITLE_CHAR_LIMIT - 3] + "..."
    return title


def build_description(commits):
    """每个 commit 只取 message 第一行；squash merge 的正文常常很长，放进卡片只会刷屏。"""
    lines = []
    for commit in commits[-COMMIT_LINE_LIMIT:]:
        message = (commit.get("message") or "").strip()
        first_line = message.splitlines()[0] if message else "(no commit message)"
        lines.append(first_line)
    if len(commits) > COMMIT_LINE_LIMIT:
        lines.insert(0, f"…（共 {len(commits)} 个 commit，只列最后 {COMMIT_LINE_LIMIT} 个）")
    if not lines:
        return "(no commit message)"
    description = "\n".join(f"• {line}" for line in lines) if len(lines) > 1 else lines[0]
    if len(description) > DESCRIPTION_CHAR_LIMIT:
        description = description[: DESCRIPTION_CHAR_LIMIT - 3] + "..."
    return description


def build_payload(event, repo, ref_name, actor, server_url):
    commits = event.get("commits") or []
    head_commit = event.get("head_commit") or {}
    compare_url = event.get("compare") or f"{server_url}/{repo}"

    status_by_path = aggregate_changed_files(commits)
    has_deletions = "D" in status_by_path.values()
    color = COLOR_ORANGE if has_deletions else COLOR_GREEN

    file_list_value, total_files = format_file_list(status_by_path)

    author_name = (head_commit.get("author") or {}).get("name") or actor

    head_sha = head_commit.get("id") or event.get("after") or ""
    short_sha = head_sha[:7] if head_sha else "?"

    # 分支几乎永远是 main、commit 数几乎永远是 1，不再单独占字段；
    # 只有不是 main 时才在页脚注明
    footer = f"{repo} · {short_sha}"
    if ref_name and ref_name != "main":
        footer += f" · {ref_name}"

    embed = {
        "title": build_title(status_by_path, commits),
        "url": compare_url,
        "color": color,
        "author": {
            "name": author_name,
            "url": f"{server_url}/{actor}",
            "icon_url": f"{server_url}/{actor}.png",
        },
        "description": build_description(commits),
        "fields": [
            {
                "name": f"Changed files ({total_files})",
                "value": file_list_value,
                "inline": False,
            },
        ],
        "footer": {"text": footer},
    }
    if head_commit.get("timestamp"):
        embed["timestamp"] = head_commit["timestamp"]

    return {
        "username": "Job Compass GitHub Bot",
        "avatar_url": GITHUB_MARK_PNG,
        "embeds": [embed],
        # commit message 里的 @everyone / @用户 不触发提醒
        "allowed_mentions": {"parse": []},
    }


def post_to_discord(webhook_url, payload):
    headers = {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
    }
    response = requests.post(webhook_url, json=payload, headers=headers, timeout=15)
    response.raise_for_status()
    return response.status_code


def main():
    webhook = os.environ.get("DISCORD_WEBHOOK")
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    repo = os.environ.get("GITHUB_REPOSITORY", "")
    ref_name = os.environ.get("GITHUB_REF_NAME", "")
    actor = os.environ.get("GITHUB_ACTOR", "")
    server_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com")

    if not webhook:
        print("DISCORD_WEBHOOK is not set", file=sys.stderr)
        return 1
    if not event_path or not os.path.exists(event_path):
        print(f"GITHUB_EVENT_PATH missing or unreadable: {event_path}", file=sys.stderr)
        return 1

    with open(event_path, "r", encoding="utf-8") as f:
        event = json.load(f)

    payload = build_payload(event, repo, ref_name, actor, server_url)

    try:
        status = post_to_discord(webhook, payload)
    except requests.HTTPError as e:
        code = e.response.status_code if e.response is not None else "?"
        body = e.response.text if e.response is not None else ""
        print(f"Discord webhook returned HTTP {code}: {body}", file=sys.stderr)
        return 1
    except requests.RequestException as e:
        print(f"Discord webhook request failed: {e}", file=sys.stderr)
        return 1

    print(f"Discord webhook accepted (HTTP {status})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
