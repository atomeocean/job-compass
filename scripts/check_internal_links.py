#!/usr/bin/env python3
"""
Check that internal links in the site's Markdown pages point at files that exist.

The VitePress config sets `ignoreDeadLinks: true`, so the build never reports a broken
internal link. This script fills that gap.

Usage (run from the repo root):
    python3 scripts/check_internal_links.py [file-or-dir ...]

With no arguments it checks every page under docs/zhHans and docs/en. Standard library only,
so it needs no PYTHONPATH.

What is checked, outside fenced code blocks and inline code:
- inline links `[text](target)` (images are left to the build),
- reference definitions `[label]: target` (footnotes `[^1]:` are not links),
- HTML `href="target"` attributes (a Vue-bound `:href` is an expression, not a path),
- snippet imports `<<< path` (`@/` is the docs folder).

How a target is resolved, following the site's routing:
- `/en/...` is served from docs/en; any other absolute path from docs/zhHans (the
  `zhHans/:rest*` rewrite); docs/public is served at the root for both.
- A relative target is resolved from the page's own folder.
- `x.md` and `x.html` mean the page x.md; `x/` means x/index.md; a bare `x` may be x.md,
  x/index.md, or the file x itself.
- Matching is case-exact, because the deployed site is served from a case-sensitive file
  system even when the checkout sits on a case-insensitive one.

External links (any scheme, or `//host`), pure `#anchor` links and templated targets are
skipped; the `#anchor` part of a page link is not checked. CLAUDE.md files are skipped, as the
site's `srcExclude` leaves them out of the build. Broken links are printed as
`path:line: target (reason)` and the script exits with code 1.
"""
import os
import re
import sys
from pathlib import Path
from urllib.parse import unquote

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_LOCALE = "zhHans"
LOCALE_PREFIXES = {"en": "en"}
EXCLUDED_FILES = {"CLAUDE.md"}

INLINE_LINK = re.compile(r"(?<!!)\[(?:[^\[\]]|\[[^\]]*\])*\]\(\s*(<[^>]*>|[^\s)]+)(?:\s+(?:\"[^\"]*\"|'[^']*'))?\s*\)")
REFERENCE_DEF = re.compile(r"^\s{0,3}\[(?!\^)[^\]]+\]:\s*(<[^>]*>|\S+)")
HREF = re.compile(r"""(?<![:@\w-])href\s*=\s*(?:"([^"]*)"|'([^']*)')""")
SNIPPET = re.compile(r"^\s*<<<\s+(\S+)")
INLINE_CODE = re.compile(r"(`+)(?:(?!\1).)+\1")
FENCE = re.compile(r"^\s*(`{3,}|~{3,})")
SCHEME = re.compile(r"^[a-zA-Z][a-zA-Z0-9+.-]*:")


def docs_dir() -> Path:
    return REPO_ROOT / "docs"


def iter_links(md: str):
    """Yield (line number, target, kind) for every link outside code."""
    fence = None
    for lineno, line in enumerate(md.splitlines(), start=1):
        opener = FENCE.match(line)
        if fence:
            if opener and opener.group(1)[0] == fence[0] and len(opener.group(1)) >= len(fence):
                fence = None
            continue
        if opener:
            fence = opener.group(1)
            continue

        snippet = SNIPPET.match(line)
        if snippet:
            yield lineno, snippet.group(1), "snippet"
            continue

        text = INLINE_CODE.sub(lambda m: " " * len(m.group(0)), line)
        reference = REFERENCE_DEF.match(text)
        if reference:
            yield lineno, reference.group(1).strip("<>"), "link"
        for match in INLINE_LINK.finditer(text):
            yield lineno, match.group(1).strip("<>"), "link"
        for match in HREF.finditer(text):
            yield lineno, match.group(1) if match.group(1) is not None else match.group(2), "link"


def is_skipped(target: str) -> bool:
    return (
        not target
        or target.startswith("#")
        or target.startswith("//")
        or bool(SCHEME.match(target))
        or "{{" in target
        or target.startswith("$")
    )


_listing_cache = {}


def exists_exact(path: Path) -> bool:
    """True if path exists with exactly this spelling, checked part by part."""
    path = Path(os.path.normpath(path))
    root = docs_dir()
    try:
        parts = path.relative_to(root).parts
    except ValueError:
        return False
    current = root
    for part in parts:
        if current not in _listing_cache:
            try:
                _listing_cache[current] = set(os.listdir(current))
            except (FileNotFoundError, NotADirectoryError):
                _listing_cache[current] = set()
        if part not in _listing_cache[current]:
            return False
        current = current / part
    return True


def candidates(base: Path, raw: str):
    """The files a link path may mean, in the order the site would try them."""
    if raw.endswith("/") or raw == "":
        return [base / "index.md"]
    if raw.endswith(".md"):
        return [base]
    if raw.endswith(".html"):
        return [base.with_name(base.name[: -len(".html")] + ".md")]
    return [base.with_name(base.name + ".md"), base / "index.md", base]


def resolve(page: Path, target: str, kind: str = "link"):
    """Return None if the target exists, else the reason it is broken."""
    root = docs_dir()
    raw = unquote(re.split(r"[#?]", target, maxsplit=1)[0])
    if kind == "snippet":
        raw = re.split(r"[{\[#]", target, maxsplit=1)[0]
        path = root / raw[2:] if raw.startswith("@/") else page.parent / raw
        path = Path(os.path.normpath(path))
        return None if path.is_file() and exists_exact(path) else "snippet file not found"
    if raw == "":
        return None

    if raw.startswith("/"):
        site_path = raw.lstrip("/")
        first, _, rest = site_path.partition("/")
        locale = LOCALE_PREFIXES.get(first)
        if locale is not None:
            base = root / locale / rest
            tail = rest if rest or site_path.endswith("/") else "/"
        else:
            base = root / DEFAULT_LOCALE / site_path
            tail = site_path
        public = root / "public" / site_path
        if site_path and public.is_file() and exists_exact(public):
            return None
    else:
        base = Path(os.path.normpath(page.parent / raw))
        tail = raw
        try:
            base.relative_to(root)
        except ValueError:
            return "points outside the docs folder, so it is not part of the site"

    for candidate in candidates(base, tail):
        if candidate.is_file() and exists_exact(candidate):
            return None
    return "no page or file at this path"


def iter_pages(args):
    paths = [Path(a) for a in args] or [docs_dir() / DEFAULT_LOCALE, docs_dir() / "en"]
    for path in paths:
        path = path.resolve()
        if path.is_dir():
            for page in sorted(path.rglob("*.md")):
                if page.name not in EXCLUDED_FILES and "node_modules" not in page.parts:
                    yield page
        elif path.suffix == ".md" and path.name not in EXCLUDED_FILES:
            yield path


def display(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def main(argv=None) -> int:
    args = sys.argv[1:] if argv is None else argv
    broken = []
    checked = 0
    for page in iter_pages(args):
        md = page.read_text(encoding="utf-8")
        for lineno, target, kind in iter_links(md):
            if kind == "link" and is_skipped(target):
                continue
            checked += 1
            reason = resolve(page, target, kind)
            if reason:
                broken.append((display(page), lineno, target, reason))

    if not broken:
        print(f"OK: {checked} internal link(s) checked, none broken")
        return 0

    print(f"{len(broken)} broken internal link(s) out of {checked} checked:")
    for path, lineno, target, reason in broken:
        print(f"  {path}:{lineno}: {target} ({reason})")
    return 1


if __name__ == "__main__":
    sys.exit(main())
