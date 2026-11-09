"""Section index checks: parsing the interviewItems array, missing rows and article counts."""

import json

import pytest


SECTION = "docs/zhHans/interview-experience"
INDEX = f"{SECTION}/index.md"
FIRST_ROW_LINE = 3  # the line of the first row in index_page()


@pytest.fixture
def index(load_script):
    return load_script("check_section_index.py")


def row(folder="acme", count=1):
    return {"title": folder, "description": "", "href": f"./{folder}/index.md", "articleCount": count}


def index_page(*rows, raw=None):
    """The section index page; `raw` replaces the row lines verbatim."""
    lines = raw if raw is not None else ["  " + json.dumps(r) + "," for r in rows]
    return "\n".join(["<script setup>", "const interviewItems = [", *lines, "]", "</script>", ""])


@pytest.fixture
def site(tmp_path, write_file):
    def build(files):
        for path, content in files.items():
            write_file(path, content)
        return tmp_path

    return build


def acme(**extra):
    """A company folder with an index and one article, plus extra files."""
    files = {f"{SECTION}/acme/index.md": "---\ntitle: Acme\n---\n", f"{SECTION}/acme/a1.md": "# A\n"}
    files.update({f"{SECTION}/acme/{name}": "# x\n" for name in extra})
    return files


def test_parse_rows_handles_commas_comments_and_brackets_in_strings(index):
    text = index_page(raw=['  {"a": 1},', "", "  // a [comment]", '  {"b": "x ] y"}'])
    rows, close_line, problems = index.parse_rows(text)
    assert rows == [(FIRST_ROW_LINE, {"a": 1}), (FIRST_ROW_LINE + 3, {"b": "x ] y"})]
    assert close_line == FIRST_ROW_LINE + 4
    assert problems == []


@pytest.mark.parametrize("text, message", [
    ("<script setup>\nconst items = []\n", "no `const interviewItems = [` array found"),
    ('const interviewItems = [\n  {"a": 1}\n', "has no matching `]`"),
])
def test_an_array_that_cannot_be_found_is_an_error(index, site, text, message):
    problems, rows = index.check(site({**acme(), INDEX: text}))
    assert rows == 0
    assert len(problems) == 1 and message in problems[0][1]


@pytest.mark.parametrize("line", ['  {"href": "./acme/index.md",,}', '  {"a": 1}, {"b": 2}', "  [1, 2]"])
def test_a_row_that_is_not_one_json_object_is_an_error(index, site, line):
    problems, _ = index.check(site({**acme(), INDEX: index_page(raw=[line])}))
    assert problems[0][0] == FIRST_ROW_LINE
    assert "row is not" in problems[0][1]


def test_a_matching_index_has_no_errors(index, site):
    assert index.check(site({**acme(), INDEX: index_page(row())})) == ([], 1)


def test_the_count_includes_nested_folders_and_leaves_out_folder_pages_and_notes(index, site):
    root = site({
        **acme(**{"onsite/b2.md": "", "onsite/deep/c3.md": "", "onsite/index.md": "", "overview.md": "",
                  "CLAUDE.md": "", "AGENTS.md": "", "GEMINI.md": "", "data.json": ""}),
        INDEX: index_page(row(count=3)),
    })
    assert index.check(root) == ([], 1)


@pytest.mark.parametrize("count", [0, 2, "1"])
def test_a_wrong_article_count_is_an_error(index, site, count):
    problems, _ = index.check(site({**acme(), INDEX: index_page(row(count=count))}))
    assert problems == [(FIRST_ROW_LINE, f"articleCount is {count}, but ./acme/ holds 1 article(s)")]


def test_a_company_folder_without_a_row_is_an_error_at_the_closing_bracket(index, site):
    root = site({**acme(), f"{SECTION}/zeta/index.md": "", f"{SECTION}/zeta/n1.md": "", INDEX: index_page(row())})
    problems, _ = index.check(root)
    assert problems == [(FIRST_ROW_LINE + 1, "no row for ./zeta/, which has an index.md and 1 article(s)")]


@pytest.mark.parametrize("files", [
    {f"{SECTION}/empty/index.md": ""},  # an index but no article
    {f"{SECTION}/loose/x.md": ""},  # articles but no index
    {f"{SECTION}/.hidden/index.md": "", f"{SECTION}/.hidden/x.md": ""},
])
def test_folders_that_need_no_row(index, site, files):
    assert index.check(site({**acme(), **files, INDEX: index_page(row())})) == ([], 1)


def test_a_row_whose_href_is_not_a_folder_index_does_not_cover_the_folder(index, site):
    problems, _ = index.check(site({**acme(), INDEX: index_page(row() | {"href": "./acme/"})}))
    assert problems == [(FIRST_ROW_LINE + 1, "no row for ./acme/, which has an index.md and 1 article(s)")]


def test_main_reports_ok_and_exits_0(index, site, capsys):
    site({**acme(), INDEX: index_page(row())})
    assert index.main([]) == 0
    assert capsys.readouterr().out == f"OK: 1 row(s) in {INDEX} checked, no errors\n"


def test_main_lists_errors_with_file_and_line_and_exits_1(index, site, capsys):
    site({**acme(), INDEX: index_page(row(count=5))})
    assert index.main([]) == 1
    assert capsys.readouterr().out == (
        f"1 error(s) in 1 row(s) of {INDEX}:\n"
        f"  {INDEX}:{FIRST_ROW_LINE}: articleCount is 5, but ./acme/ holds 1 article(s)\n"
    )


def test_main_rejects_unknown_arguments(index, capsys):
    assert index.main(["--fix"]) == 2
    assert "unknown: --fix" in capsys.readouterr().out
