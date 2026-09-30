#!/usr/bin/env python3
"""Check that every body line of an interview-experience markdown appears verbatim in the source.

Usage: python3 check_verbatim.py <article.md> <source.txt>

Skips frontmatter, heading lines, <InterviewDetail />, the <ReferenceSource> block, code-fence
markers, and the extracted-metadata sections (## 基本信息, ## 面试结果反馈). Every remaining line
is stripped of Markdown markup and whitespace, then substring-matched against the source.
Exits 1 and prints the offending lines if any are not found.
"""
import re
import sys

METADATA_SECTIONS = {"基本信息", "面试结果反馈"}

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
    for lineno in range(i, len(lines)):
        line = lines[lineno]
        stripped = line.strip()

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


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__.strip().splitlines()[2], file=sys.stderr)
        return 2

    with open(sys.argv[1], encoding="utf-8") as f:
        md = f.read()
    with open(sys.argv[2], encoding="utf-8") as f:
        source = normalize(LINK.sub(r"\1", f.read()))

    missing = []
    for lineno, line in body_lines(md):
        text = LIST_MARKER.sub("", LINK.sub(r"\1", line))
        if normalize(text) not in source:
            missing.append((lineno, line))

    if not missing:
        print("OK: every body line appears verbatim in the source")
        return 0

    print(f"{len(missing)} body line(s) not found verbatim in the source:")
    for lineno, line in missing:
        print(f"  {lineno}: {line}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
