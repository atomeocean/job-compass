#!/usr/bin/env python3
"""
Check the company rows of the interview-experience section index against the company folders.

docs/zhHans/interview-experience/index.md holds a hand-maintained `interviewItems` array, one
row per company folder (title, description, href, articleCount, lastUpdated, createdDate).
The page lists the rows and sums articleCount. Nothing checked these rows, so they drift: a
maintainer review on PR #998 had to flag a company row that was not bumped for its new
article as a blocker. This script checks the two facts that drift most:
- every company folder (one with an index.md and at least one article) has a row, and
- each row's articleCount equals the number of articles in its folder.
docs/en/interview-experience has no index page (only an amazon folder), so it has no such
array and only the Chinese page is checked.

What counts as an article: every .md file anywhere under the company folder, nested folders
included, except index.md and overview.md (folder pages) and the agent notes CLAUDE.md,
AGENTS.md and GEMINI.md. This rule matches 40 of the 43 rows on the page (2026-11-08) and
51 of the 54 row bumps in the page's git history, counted at each bump's own commit; the
misses are real drift. The dates are not checked: lastUpdated follows no rule the data pins.

The array is the text between `const interviewItems = [` and its matching `]`; each row is
one JSON object on one line, and a trailing comma, blank lines and `//` comments are allowed.

Usage (run from the repo root):
    python3 scripts/check_section_index.py

Standard library only, so it needs no PYTHONPATH. Problems are printed as `path:line:
message` and the script exits with code 1.
"""
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
INDEX_PAGE = Path("docs/zhHans/interview-experience/index.md")
ARRAY_START = "const interviewItems = ["
NON_ARTICLES = {"index.md", "overview.md", "CLAUDE.md", "AGENTS.md", "GEMINI.md"}
HREF = re.compile(r"^\./([^/]+)/index\.md$")


def line_of(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def parse_rows(text: str):
    """Return (rows as (line, dict), line of the closing `]`, problems as (line, message))."""
    start = text.find(ARRAY_START)
    if start < 0:
        return [], None, [(None, f"no `{ARRAY_START}` array found")]
    opening = start + len(ARRAY_START) - 1
    depth, quote, index = 0, None, opening
    while index < len(text):
        char = text[index]
        if quote:
            if char == "\\":
                index += 1
            elif char == quote:
                quote = None
        elif char in "\"'`":
            quote = char
        elif text.startswith("//", index):
            newline = text.find("\n", index)
            index = len(text) if newline < 0 else newline
            continue
        elif char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                break
        index += 1
    else:
        return [], None, [(line_of(text, opening), "the interviewItems array has no matching `]`")]

    rows, problems = [], []
    first = line_of(text, opening)
    for offset, raw in enumerate(text[opening + 1:index].split("\n")):
        item = raw.strip()
        if not item or item.startswith("//"):
            continue
        if item.endswith(","):
            item = item[:-1].rstrip()
        try:
            data = json.loads(item)
        except json.JSONDecodeError as exc:
            problems.append((first + offset, f"row is not one JSON object on one line: {exc.msg}"))
            continue
        if isinstance(data, dict):
            rows.append((first + offset, data))
        else:
            problems.append((first + offset, "row is not a JSON object"))
    return rows, line_of(text, index), problems


def count_articles(folder: Path) -> int:
    return sum(1 for p in folder.rglob("*.md") if p.name not in NON_ARTICLES)


def check(root: Path):
    """Return (problems as (line, message), number of rows) for the section index."""
    path = root / INDEX_PAGE
    if not path.is_file():
        return [(None, "the section index page does not exist")], 0
    rows, close_line, problems = parse_rows(path.read_text(encoding="utf-8"))
    if close_line is None:
        return problems, 0
    section = path.parent

    covered = set()
    for lineno, data in rows:
        match = HREF.match(str(data.get("href", "")))
        if not match:
            continue
        name = match.group(1)
        covered.add(name)
        if (section / name).is_dir():
            count = count_articles(section / name)
            if data.get("articleCount") != count:
                problems.append((lineno, f"articleCount is {data.get('articleCount')}, but ./{name}/ holds {count} article(s)"))

    for folder in sorted(p for p in section.iterdir() if p.is_dir() and not p.name.startswith(".")):
        count = count_articles(folder)
        if folder.name not in covered and (folder / "index.md").is_file() and count:
            problems.append((close_line, f"no row for ./{folder.name}/, which has an index.md and {count} article(s)"))
    return problems, len(rows)


def main(argv=None) -> int:
    args = sys.argv[1:] if argv is None else argv
    if args:
        print(f"usage: check_section_index.py (unknown: {' '.join(args)})")
        return 2
    problems, rows = check(REPO_ROOT)
    page = INDEX_PAGE.as_posix()
    if not problems:
        print(f"OK: {rows} row(s) in {page} checked, no errors")
        return 0
    print(f"{len(problems)} error(s) in {rows} row(s) of {page}:")
    for lineno, message in problems:
        print(f"  {page}:{lineno}: {message}" if lineno else f"  {page}: {message}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
