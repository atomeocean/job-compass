#!/usr/bin/env python3
"""
Check the interview-experience data records against the article pages and the site's types.

Every interview article is a pair of files: the page under docs/zhHans/interview-experience/
and a JSON record under docs/assets/json/interview-experience/ at the same subpath. The
<InterviewDetail /> card finds its record by that subpath, and when the record is missing it
only logs to the browser console, so a broken pair never fails the build. The JSON check in CI
only tests that a changed file parses. This script fills both gaps.

Usage (run from the repo root):
    python3 scripts/check_interview_data.py [--warnings]

Standard library only, so it needs no PYTHONPATH.

Errors (printed, exit code 1): the page shows nothing or shows a wrong value.
- A record with no article at its subpath, or an article that places <InterviewDetail />
  with no record at its subpath.
- A record that is not valid JSON, or not a JSON object.
- A field of the wrong kind for the type in docs/.vitepress/theme/utils/interviewData.ts
  (text where the type says text, a number where it says number; an empty string in
  yearsOfExperience prints "Experience:  Years").
- A template placeholder left in (the value "string" anywhere, or company "url").
- A difficulty rating that is a number outside 1 to 5.

Warnings (counted; listed with --warnings): drift from the contract in
docs/zhHans/interview-experience/CLAUDE.md that still renders. A company name that differs
from its folder, a value outside the documented vocabulary, a missing difficulty rating (null
or 0), the legacy flat roundType/rate form, null where the type says text, a missing
position or interview object, and a record whose article does not place the card.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import NamedTuple

REPO_ROOT = Path(__file__).resolve().parents[1]
RECORD_DIR = Path("docs/assets/json/interview-experience")
ARTICLE_DIRS = (Path("docs/zhHans/interview-experience"), Path("docs/en/interview-experience"))
EXCLUDED_FILES = {"CLAUDE.md"}

CARD = re.compile(r"<InterviewDetail\b")
FENCE = re.compile(r"^\s*(`{3,}|~{3,})")
PLACEHOLDER = "string"
COMPANY_PLACEHOLDERS = {"url", PLACEHOLDER}

# Field kinds from the InterviewData type. "required" fields are not optional in the type.
TEXT_FIELDS = {
    ("position", "title"): True,
    ("position", "level"): True,
    ("position", "jobType"): True,
    ("position", "jobPostUrl"): False,
    ("applicationSource", "channel"): False,
    ("applicationSource", "referralDetails"): False,
    ("candidate", "education"): False,
    ("candidate", "background"): False,
    ("interview", "date"): True,
    ("interview", "result"): True,
}
NUMBER_FIELDS = {("candidate", "yearsOfExperience")}
OBJECTS = {"position": True, "applicationSource": False, "candidate": False, "interview": True}

# The documented vocabulary (docs/zhHans/interview-experience/CLAUDE.md, "Vocabulary").
VOCABULARY = {
    ("position", "jobType"): {"", "full-time", "internship", "contract"},
    ("applicationSource", "channel"): {
        "", "direct-apply", "referral", "recruiter", "online-assessment", "other"},
    ("candidate", "education"): {"", "bachelor", "master", "phd"},
    ("interview", "result"): {"pass", "rejected", "pending", "unknown"},
}
ROUND_TYPES = {
    "oa", "recruiter-screen", "phone-screen", "technical", "coding", "system-design",
    "behavioral", "hiring-manager", "onsite",
}
LEVEL = re.compile(r"^(|intern|new-grad|mid-level|senior|[a-z]+[0-9]+)$")
RATE_RANGE = (1, 5)


class Finding(NamedTuple):
    level: str  # "error" or "warning"
    path: str
    message: str


def is_number(value) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def normalized(name: str) -> str:
    return re.sub(r"[^0-9a-z]", "", name.lower())


def places_card(markdown: str) -> bool:
    """True when <InterviewDetail /> appears outside fenced code blocks."""
    fence = None
    for line in markdown.splitlines():
        match = FENCE.match(line)
        if match:
            marker = match.group(1)
            if fence is None:
                fence = marker
            elif marker[0] == fence[0] and len(marker) >= len(fence):
                fence = None
            continue
        if fence is None and CARD.search(line):
            return True
    return False


def collect_records(root: Path) -> dict:
    """Map each record's subpath key (e.g. "amazon/onsite/608997") to its file."""
    base = root / RECORD_DIR
    if not base.is_dir():
        return {}
    return {p.relative_to(base).with_suffix("").as_posix(): p for p in sorted(base.rglob("*.json"))}


def collect_articles(root: Path) -> dict:
    """Map each article's subpath key to its files across the locales."""
    articles = {}
    for article_dir in ARTICLE_DIRS:
        base = root / article_dir
        if not base.is_dir():
            continue
        for page in sorted(base.rglob("*.md")):
            if page.name in EXCLUDED_FILES:
                continue
            key = page.relative_to(base).with_suffix("").as_posix()
            articles.setdefault(key, []).append(page)
    return articles


def check_pairs(root: Path, records: dict, articles: dict) -> list:
    findings = []
    names = {}
    for key in records:
        names.setdefault(key.rsplit("/", 1)[-1], []).append(key)

    for key, path in records.items():
        if key not in articles:
            expected = (ARTICLE_DIRS[0] / f"{key}.md").as_posix()
            findings.append(Finding(
                "error", rel(root, path),
                f"no article at {expected}, so this record is never shown"))
        elif not any(places_card(read_text(p)) for p in articles[key]):
            findings.append(Finding(
                "warning", rel(root, path),
                "record not shown: its article does not place <InterviewDetail />"))

    for key, pages in articles.items():
        for page in pages:
            if key in records or not places_card(read_text(page)):
                continue
            expected = (RECORD_DIR / f"{key}.json").as_posix()
            message = f"places <InterviewDetail /> but there is no record at {expected}"
            others = [k for k in names.get(key.rsplit("/", 1)[-1], []) if k not in articles]
            if others:
                message += "; a record with this name sits at " + ", ".join(
                    (RECORD_DIR / f"{k}.json").as_posix() for k in others)
            findings.append(Finding("error", rel(root, page), message))
    return findings


def check_record(path: str, folder: str, data) -> list:
    """Check one parsed record. `folder` is the company folder the record sits in."""
    findings = []

    def error(message):
        findings.append(Finding("error", path, message))

    def warning(message):
        findings.append(Finding("warning", path, message))

    if not isinstance(data, dict):
        error(f"the record is a JSON {type(data).__name__}, not an object")
        return findings

    for field, value in iter_strings(data):
        if value == PLACEHOLDER:
            error(f'{field} is the template placeholder "{PLACEHOLDER}"')

    company = data.get("company")
    if not isinstance(company, str) or not company.strip():
        error(f"company must be the company's name, found {company!r}")
    elif company in COMPANY_PLACEHOLDERS:
        if company != PLACEHOLDER:
            error(f'company is the template placeholder "{company}"')
    elif company != folder:
        if normalized(company) == normalized(folder):
            warning(f'company "{company}" differs from its folder "{folder}"')
        else:
            warning(f'company "{company}" does not name its folder "{folder}"')

    for name, required in OBJECTS.items():
        if name not in data or data[name] is None:
            if required:
                warning(f"no {name} object, so the card shows no {name} details")
        elif not isinstance(data[name], dict):
            error(f"{name} must be an object, found {kind(data[name])}")

    for (parent, name), required in TEXT_FIELDS.items():
        container = data.get(parent)
        if not isinstance(container, dict):
            continue
        field = f"{parent}.{name}"
        if name not in container:
            if required:
                warning(f"{field} is missing")
            continue
        value = container[name]
        if value is None:
            if required:
                warning(f'{field} is null; the site types it as text, use "" when unknown')
        elif not isinstance(value, str):
            error(f"{field} must be text, found {kind(value)}")

    for parent, name in NUMBER_FIELDS:
        container = data.get(parent)
        if isinstance(container, dict) and name in container:
            value = container[name]
            if value is not None and not is_number(value):
                hint = "; use null when there is no count" if value == "" else ""
                error(f"{parent}.{name} must be a number or null, found {kind(value)}{hint}")

    findings.extend(check_rounds(path, data.get("interview")))
    findings.extend(check_vocabulary(path, data))
    return findings


def check_rounds(path: str, interview) -> list:
    findings = []
    if not isinstance(interview, dict):
        return findings
    rounds = interview.get("rounds")
    legacy = "roundType" in interview or "rate" in interview
    if rounds is not None and not isinstance(rounds, list):
        findings.append(Finding("error", path, f"interview.rounds must be a list, found {kind(rounds)}"))
        return findings
    if legacy:
        findings.append(Finding(
            "warning", path,
            "legacy flat interview.roundType/rate; the current form is interview.rounds"))
        findings.extend(check_round(path, "interview", interview))
    if rounds:
        for index, item in enumerate(rounds):
            field = f"interview.rounds[{index}]"
            if not isinstance(item, dict):
                findings.append(Finding("error", path, f"{field} must be an object, found {kind(item)}"))
                continue
            findings.extend(check_round(path, field, item))
    elif not legacy:
        findings.append(Finding("warning", path, "no interview rounds"))
    return findings


def check_round(path: str, field: str, item: dict) -> list:
    findings = []
    round_type = item.get("roundType")
    if round_type is not None and not isinstance(round_type, str):
        findings.append(Finding("error", path, f"{field}.roundType must be text, found {kind(round_type)}"))
    elif isinstance(round_type, str) and round_type != PLACEHOLDER and round_type not in ROUND_TYPES:
        findings.append(Finding("warning", path, f'{field}.roundType "{round_type}" is outside the vocabulary'))

    rate = item.get("rate")
    low, high = RATE_RANGE
    if rate is None or (is_number(rate) and rate == 0):
        findings.append(Finding("warning", path, f"{field}.rate is {rate!r}: no difficulty rating"))
    elif not is_number(rate):
        findings.append(Finding("error", path, f"{field}.rate must be a number {low} to {high}, found {kind(rate)}"))
    elif not low <= rate <= high:
        findings.append(Finding("error", path, f"{field}.rate {rate} is outside {low} to {high}"))
    return findings


def check_vocabulary(path: str, data: dict) -> list:
    findings = []
    for (parent, name), allowed in VOCABULARY.items():
        container = data.get(parent)
        value = container.get(name) if isinstance(container, dict) else None
        if isinstance(value, str) and value != PLACEHOLDER and value not in allowed:
            findings.append(Finding("warning", path, f'{parent}.{name} "{value}" is outside the vocabulary'))
    position = data.get("position")
    level = position.get("level") if isinstance(position, dict) else None
    if isinstance(level, str) and level != PLACEHOLDER and not LEVEL.match(level):
        findings.append(Finding("warning", path, f'position.level "{level}" is outside the vocabulary'))
    return findings


def iter_strings(value, field=""):
    """Yield (dotted field, string) for every string value in a parsed record."""
    if isinstance(value, str):
        yield field, value
    elif isinstance(value, dict):
        for key, item in value.items():
            yield from iter_strings(item, f"{field}.{key}" if field else key)
    elif isinstance(value, list):
        for index, item in enumerate(value):
            yield from iter_strings(item, f"{field}[{index}]")


def kind(value) -> str:
    if value is None:
        return "null"
    if isinstance(value, bool):
        return f"boolean {json.dumps(value)}"
    if isinstance(value, str):
        return f"text {json.dumps(value, ensure_ascii=False)}"
    if is_number(value):
        return f"number {value}"
    if isinstance(value, list):
        return "a list"
    return "an object"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def rel(root: Path, path: Path) -> str:
    try:
        return path.relative_to(root).as_posix()
    except ValueError:
        return str(path)


def check(root: Path):
    """Return (findings, number of records, number of articles placing the card)."""
    records = collect_records(root)
    articles = collect_articles(root)
    findings = check_pairs(root, records, articles)
    for key, path in records.items():
        shown = rel(root, path)
        try:
            data = json.loads(read_text(path))
        except json.JSONDecodeError as exc:
            findings.append(Finding("error", shown, f"invalid JSON: {exc.msg} (line {exc.lineno}, column {exc.colno})"))
            continue
        findings.extend(check_record(shown, key.split("/", 1)[0], data))
    cards = sum(1 for pages in articles.values() for p in pages if places_card(read_text(p)))
    return findings, len(records), cards


def main(argv=None) -> int:
    args = sys.argv[1:] if argv is None else argv
    unknown = [a for a in args if a != "--warnings"]
    if unknown:
        print(f"usage: check_interview_data.py [--warnings] (unknown: {' '.join(unknown)})")
        return 2
    findings, records, cards = check(REPO_ROOT)
    errors = [f for f in findings if f.level == "error"]
    warnings = [f for f in findings if f.level == "warning"]
    scope = f"{records} data record(s) and {cards} article(s) with the card"

    if errors:
        print(f"{len(errors)} error(s) in {scope}:")
        for finding in errors:
            print(f"  {finding.path}: {finding.message}")
    else:
        print(f"OK: {scope} checked, no errors")

    if warnings:
        print(f"{len(warnings)} warning(s) in {len({f.path for f in warnings})} file(s)", end="")
        if "--warnings" in args:
            print(":")
            for finding in warnings:
                print(f"  {finding.path}: {finding.message}")
        else:
            counts = Counter(warning_kind(f.message) for f in warnings)
            print(" (run with --warnings to list them):")
            for label, count in counts.most_common():
                print(f"  {count:4d}  {label}")
    return 1 if errors else 0


def warning_kind(message: str) -> str:
    """Group a warning message under a short label for the summary."""
    for needle, label in (
        ("outside the vocabulary", "value outside the vocabulary"),
        ("differs from its folder", "company name differs from its folder"),
        ("does not name its folder", "company name does not name its folder"),
        ("no difficulty rating", "no difficulty rating"),
        ("legacy flat", "legacy flat roundType/rate"),
        ("is null", "null where the type says text"),
        ("is missing", "missing field"),
        ("object, so the card", "missing object"),
        ("record not shown", "record not shown by its article"),
        ("no interview rounds", "no interview rounds"),
    ):
        if needle in message:
            return label
    return "other"


if __name__ == "__main__":
    sys.exit(main())
