#!/usr/bin/env python3
"""
检查面经 markdown 的正文是否逐行照录自原文（organize-interview-exp skill 的自检步骤）。

用法（在仓库根目录运行）：
    python3 scripts/check_verbatim.py <article.md> <source.txt>

跳过 frontmatter、标题行、<InterviewDetail />、<ReferenceSource> 块、种族 / 国籍免责声明块、代码块标记，
以及提取元信息的「## 基本信息」「## 面试结果反馈」两节。其余每一行去掉 Markdown 标记和空白后，与原文做子串匹配。
有匹配不上的行时逐行打印，并以退出码 1 结束。
"""
import re
import sys

METADATA_SECTIONS = {"基本信息", "面试结果反馈"}
# skill 加的种族 / 国籍免责声明容器的首行，措辞改动需与 SKILL.md 同步
DISCLAIMER_OPENER = "::: warning 免责声明"

LINK = re.compile(r"\[([^\]]*)\]\([^)]*\)")
LIST_MARKER = re.compile(r"^\s*(?:[-*+]|\d+[.)]|>)\s+")


def normalize(text: str) -> str:
    text = text.replace("**", "").replace("`", "")
    return re.sub(r"\s+", "", text)


def body_lines(md: str):
    lines = md.splitlines()
    i = 0
    if lines and lines[0].strip() == "---":
        i = 1
        while i < len(lines) and lines[i].strip() != "---":
            i += 1
        i += 1

    in_metadata = False
    in_reference = False
    in_disclaimer = False
    for lineno in range(i, len(lines)):
        line = lines[lineno]
        stripped = line.strip()

        if in_disclaimer:
            if stripped == ":::":
                in_disclaimer = False
            continue
        if stripped == DISCLAIMER_OPENER:
            in_disclaimer = True
            disclaimer_lineno = lineno + 1
            continue

        if in_reference:
            if stripped.endswith("/>"):
                in_reference = False
            continue
        if stripped.startswith("<ReferenceSource"):
            in_reference = not stripped.endswith("/>")
            continue

        heading = re.match(r"^(#+)\s+(.*)$", stripped)
        if heading:
            if len(heading.group(1)) == 2:
                in_metadata = heading.group(2).strip() in METADATA_SECTIONS
            continue

        if in_metadata or not stripped:
            continue
        if stripped.startswith("```") or stripped == "<InterviewDetail />":
            continue

        yield lineno + 1, line

    # 未闭合的免责声明块会吞掉后面所有行，导致检查假通过
    if in_disclaimer:
        raise ValueError(f"第 {disclaimer_lineno} 行的免责声明块缺少闭合的 :::")


def main() -> int:
    if len(sys.argv) != 3:
        print("用法: python3 scripts/check_verbatim.py <article.md> <source.txt>", file=sys.stderr)
        return 2

    with open(sys.argv[1], encoding="utf-8") as f:
        md = f.read()
    with open(sys.argv[2], encoding="utf-8") as f:
        source = normalize(LINK.sub(r"\1", f.read()))

    missing = []
    try:
        for lineno, line in body_lines(md):
            text = LIST_MARKER.sub("", LINK.sub(r"\1", line))
            if normalize(text) not in source:
                missing.append((lineno, line))
    except ValueError as e:
        print(f"错误: {e}", file=sys.stderr)
        return 1

    if not missing:
        print("OK: every body line appears verbatim in the source")
        return 0

    print(f"{len(missing)} body line(s) not found verbatim in the source:")
    for lineno, line in missing:
        print(f"  {lineno}: {line}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
