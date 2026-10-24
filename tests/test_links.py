"""Internal link checks follow the site's routing and ignore code and external links."""

import pytest


@pytest.fixture
def links(load_script):
    return load_script("check_internal_links.py")


@pytest.fixture
def site(write_file):
    """A small site: zhHans pages at the root, en pages under /en/, one public file."""
    for path in [
        "docs/zhHans/index.md",
        "docs/zhHans/guide/index.md",
        "docs/zhHans/guide/setup.md",
        "docs/zhHans/guide/Upper-Case.md",
        "docs/zhHans/assets/data.json",
        "docs/en/index.md",
        "docs/en/guide/setup.md",
        "docs/en/leetcode/solutions/two_sum.py",
        "docs/public/favicon.ico",
    ]:
        write_file(path, "x\n")
    return write_file


def extract(links, md):
    return [(lineno, target) for lineno, target, _ in links.iter_links(md)]


def test_iter_links_finds_inline_reference_and_href_targets(links):
    md = "\n".join([
        "See [setup](/guide/setup.md) and [titled](./a.md \"Title\").",
        "[angle](<./b c.md>) and [nested [brackets]](../c)",
        "[ref]: /guide/ref",
        '<a href="/guide/html">x</a> <a href=\'./single\'>y</a>',
        '<a :href="item.link">bound</a> <a v-bind:href="other">bound</a>',
        "[^1]: a footnote, not a link",
    ])
    assert extract(links, md) == [
        (1, "/guide/setup.md"), (1, "./a.md"), (2, "./b c.md"), (2, "../c"),
        (3, "/guide/ref"), (4, "/guide/html"), (4, "./single"),
    ]


def test_iter_links_skips_images_inline_code_and_fenced_code(links):
    md = "\n".join([
        "![image](./missing.png) `[code](/in/code)` [real](/real)",
        "````md",
        "[fenced](/fenced)",
        "```",
        "[still fenced](/still)",
        "````",
        "~~~",
        "[tilde](/tilde)",
        "~~~",
        "[after](/after)",
    ])
    assert extract(links, md) == [(1, "/real"), (10, "/after")]


def test_iter_links_reports_snippet_imports(links):
    found = list(links.iter_links("<<< ./solutions/two_sum.py\n<<< @/snippets/a.py{2-3} [label]"))
    assert found == [(1, "./solutions/two_sum.py", "snippet"), (2, "@/snippets/a.py{2-3}", "snippet")]


@pytest.mark.parametrize("target", [
    "", "#heading", "https://example.invalid/a", "mailto:a@example.invalid", "//cdn.example.invalid/x",
    "{{ page.link }}", "$withBase",
])
def test_is_skipped(links, target):
    assert links.is_skipped(target)


@pytest.mark.parametrize("target", ["/guide/setup", "./setup.md", "../index", "setup.md"])
def test_internal_targets_are_not_skipped(links, target):
    assert not links.is_skipped(target)


@pytest.mark.parametrize("target", [
    "/guide/setup.md", "/guide/setup.html", "/guide/setup", "/guide/", "/guide", "/",
    "/guide/setup#step-1", "/guide/setup?x=1", "/en/guide/setup", "/en/", "/en",
    "/favicon.ico", "/assets/data.json", "/guide/Upper-Case", "/guide/%55pper-Case",
])
def test_absolute_targets_that_exist(links, site, tmp_path, target):
    page = tmp_path / "docs/zhHans/index.md"
    assert links.resolve(page, target) is None


@pytest.mark.parametrize("target", [
    "/guide/missing", "/en/guide/missing.md", "/zhHans/guide/setup", "/guide/upper-case",
    "/guide/setup/", "/en/favicon.ico/x",
])
def test_absolute_targets_that_are_broken(links, site, tmp_path, target):
    page = tmp_path / "docs/zhHans/index.md"
    assert links.resolve(page, target) == "no page or file at this path"


@pytest.mark.parametrize(("page", "target"), [
    ("docs/zhHans/guide/index.md", "./setup.md"),
    ("docs/zhHans/guide/index.md", "setup"),
    ("docs/zhHans/guide/setup.md", "../index.md"),
    ("docs/zhHans/guide/setup.md", "./"),
    ("docs/en/guide/setup.md", "../index"),
])
def test_relative_targets_resolve_from_the_page_folder(links, site, tmp_path, page, target):
    assert links.resolve(tmp_path / page, target) is None


def test_relative_target_outside_docs_is_broken(links, site, tmp_path):
    reason = links.resolve(tmp_path / "docs/zhHans/guide/setup.md", "../../../scripts/a.py")
    assert reason == "points outside the docs folder, so it is not part of the site"


def test_relative_target_that_is_missing(links, site, tmp_path):
    assert links.resolve(tmp_path / "docs/en/guide/setup.md", "./other") == "no page or file at this path"


@pytest.mark.parametrize(("target", "expected"), [
    ("./solutions/two_sum.py", None),
    ("./solutions/two_sum.py{1-3}", None),
    ("@/en/leetcode/solutions/two_sum.py", None),
    ("./solutions/missing.py", "snippet file not found"),
    ("./solutions/Two_Sum.py", "snippet file not found"),
])
def test_snippet_targets(links, site, tmp_path, target, expected):
    page = tmp_path / "docs/en/leetcode/index.md"
    assert links.resolve(page, target, "snippet") == expected


def test_main_reports_broken_links_with_page_and_line(links, site, capsys):
    site("docs/zhHans/guide/links.md", "# Links\n[ok](/guide/setup)\n[bad](/guide/nope)\n[out](https://example.invalid)\n")
    site("docs/en/guide/links.md", "<<< ./missing.py\n")
    assert links.main([]) == 1
    assert capsys.readouterr().out == (
        "2 broken internal link(s) out of 3 checked:\n"
        "  docs/zhHans/guide/links.md:3: /guide/nope (no page or file at this path)\n"
        "  docs/en/guide/links.md:1: ./missing.py (snippet file not found)\n"
    )


def test_main_skips_claude_md_and_accepts_file_arguments(links, site, capsys):
    site("docs/zhHans/guide/CLAUDE.md", "[bad](/nope)\n")
    good = site("docs/zhHans/guide/good.md", "[ok](./setup.md)\n")
    assert links.main([]) == 0
    assert capsys.readouterr().out == "OK: 1 internal link(s) checked, none broken\n"
    assert links.main([str(good)]) == 0
    assert capsys.readouterr().out == "OK: 1 internal link(s) checked, none broken\n"
