#!/usr/bin/env python3
"""
解析 logbook 面经投稿建出来的 issue，给 organize-interview-submission skill 用。
维护者在本地用 Claude Code 跑这个 skill（CI 里不能跑 Claude Code），这个脚本只做确定性的拆分。

用法（在仓库根目录运行）：
    gh issue view <编号> --json body -q .body > <临时目录>/body.md
    python3 scripts/parse_interview_submission.py <临时目录>/body.md <临时目录>

issue 由 admin 后端的 InterviewSubmissionServiceImpl 生成，格式是两边的契约，改一边要同步改另一边：
    第一行  <!-- interview-submission {"version":1,"githubLogin":...,"githubId":...,"anonymous":...} -->
    之后    ## 面经投稿 + 字段列表 + ### 正文 + 一个代码块（围栏比正文里最长的反引号串多一个）

写出两个文件：
    <输出目录>/source.txt  代码块里的正文，原样，给整理 skill 和 check_verbatim.py 当原文
    <输出目录>/fields.md   ## 面经投稿 到 ### 正文 之间的字段列表
标准输出打印 key=value 行：
    github_login   投稿人的 GitHub 用户名，匿名或非 GitHub 登录时为空
    github_id      投稿人的数字 id，查不到时为空
    commit_author  git commit --author 的值（noreply 邮箱，GitHub 据此把提交关联到投稿人），为空时不加 --author
    anonymous      true / false
格式不对时以退出码 1 结束。
只用标准库，不需要 PYTHONPATH。
"""
import json
import re
import sys
from pathlib import Path

METADATA_PREFIX = "<!-- interview-submission "
METADATA_SUFFIX = " -->"
SUPPORTED_VERSION = 1
FIELDS_HEADING = "## 面经投稿"
CONTENT_HEADING = "### 正文"
# GitHub 用户名：字母数字和连字符，不以连字符开头，最长 39
GITHUB_LOGIN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9-]{0,38}$")
FENCE = re.compile(r"^`{3,}")


def fail(message: str):
    print(f"投稿 issue 格式不对：{message}", file=sys.stderr)
    sys.exit(1)


def parse_metadata(first_line: str) -> dict:
    if not (first_line.startswith(METADATA_PREFIX) and first_line.endswith(METADATA_SUFFIX)):
        fail("第一行不是元数据注释")
    try:
        metadata = json.loads(first_line[len(METADATA_PREFIX):-len(METADATA_SUFFIX)])
    except json.JSONDecodeError:
        fail("元数据不是合法 JSON")
    if metadata.get("version") != SUPPORTED_VERSION:
        fail(f"不认识的元数据版本 {metadata.get('version')}")
    login = metadata.get("githubLogin")
    if login is not None and not (isinstance(login, str) and GITHUB_LOGIN.match(login)):
        fail("githubLogin 不合法")
    github_id = metadata.get("githubId")
    if github_id is not None and not (isinstance(github_id, int) and not isinstance(github_id, bool)):
        fail("githubId 不合法")
    if not isinstance(metadata.get("anonymous"), bool):
        fail("anonymous 不是布尔值")
    return metadata


def extract_content(lines: list[str], heading_index: int) -> str:
    """取 ### 正文 之后的第一个代码块，按开头那行的反引号数找结尾"""
    start = heading_index + 1
    while start < len(lines) and not lines[start].strip():
        start += 1
    match = FENCE.match(lines[start]) if start < len(lines) else None
    if not match:
        fail("正文不在代码块里")
    fence = match.group()
    for end in range(start + 1, len(lines)):
        if lines[end] == fence:
            return "\n".join(lines[start + 1:end])
    fail("正文代码块没有结尾")


def main():
    if len(sys.argv) != 3:
        fail("用法：python3 scripts/parse_interview_submission.py <issue 正文文件> <输出目录>")
    body_path, output_dir = Path(sys.argv[1]), Path(sys.argv[2])

    # GitHub 存的 issue 正文是 CRLF 还是 LF 不固定，统一成 LF
    lines = body_path.read_text(encoding="utf-8").replace("\r\n", "\n").split("\n")
    metadata = parse_metadata(lines[0])
    if FIELDS_HEADING not in lines or CONTENT_HEADING not in lines:
        fail("缺少字段列表或正文标题")
    fields_index, content_index = lines.index(FIELDS_HEADING), lines.index(CONTENT_HEADING)
    if content_index < fields_index:
        fail("正文标题在字段列表之前")

    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "source.txt").write_text(extract_content(lines, content_index) + "\n", encoding="utf-8")
    fields = "\n".join(lines[fields_index:content_index]).strip()
    (output_dir / "fields.md").write_text(fields + "\n", encoding="utf-8")

    login = "" if metadata["anonymous"] else (metadata.get("githubLogin") or "")
    github_id = metadata.get("githubId") if login else None
    print(f"github_login={login}")
    print(f"github_id={'' if github_id is None else github_id}")
    print(f"commit_author={commit_author(login, github_id)}")
    print(f"anonymous={'true' if metadata['anonymous'] else 'false'}")


def commit_author(login: str, github_id) -> str:
    """带数字 id 的 noreply 邮箱改了用户名也认；查不到 id 时用旧格式，GitHub 同样关联到账号"""
    if not login:
        return ""
    if github_id is None:
        return f"{login} <{login}@users.noreply.github.com>"
    return f"{login} <{github_id}+{login}@users.noreply.github.com>"


if __name__ == "__main__":
    main()
