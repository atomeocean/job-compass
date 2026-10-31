"""Interview data checks: record and article pairing, field kinds, placeholders, ratings, vocabulary."""

import copy
import json

import pytest


RECORDS = "docs/assets/json/interview-experience"
ARTICLES = "docs/zhHans/interview-experience"

VALID = {
    "company": "amazon",
    "position": {
        "jobPostUrl": None,
        "title": "Software Development Engineer",
        "level": "new-grad",
        "jobType": "full-time",
    },
    "applicationSource": {"channel": "referral", "referralDetails": ""},
    "candidate": {"education": "master", "background": "", "yearsOfExperience": 0},
    "interview": {
        "date": "2026-01-15",
        "result": "pass",
        "rounds": [{"roundType": "technical", "rate": 3}, {"roundType": "onsite", "rate": 4}],
    },
}


@pytest.fixture
def data(load_script):
    return load_script("check_interview_data.py")


def record(**changes):
    """A valid record with dotted-path changes applied; the value DELETE removes the key."""
    result = copy.deepcopy(VALID)
    for dotted, value in changes.items():
        *parents, name = dotted.split("__")
        target = result
        for parent in parents:
            target = target[parent]
        if value is DELETE:
            del target[name]
        else:
            target[name] = value
    return result


DELETE = object()


def messages(findings, level=None):
    return [f.message for f in findings if level is None or f.level == level]


def check(data, folder="amazon", **changes):
    return data.check_record("x.json", folder, record(**changes))


# --- the card's placement in an article ---------------------------------------------------

def test_places_card_outside_code(data):
    assert data.places_card("# Title\n\n<InterviewDetail />\n\nText")
    assert data.places_card("<InterviewDetail/>")


def test_places_card_ignores_fenced_code(data):
    assert not data.places_card("```md\n<InterviewDetail />\n```\n")
    assert not data.places_card("~~~\n<InterviewDetail />\n~~~\n")
    assert data.places_card("```\ncode\n```\n<InterviewDetail />\n")


def test_places_card_needs_the_component(data):
    assert not data.places_card("# Title\n\nNo card here. <InterviewDetails />")


# --- pairing records with articles ---------------------------------------------------------

@pytest.fixture
def site(tmp_path, write_file):
    def build(files):
        for path, content in files.items():
            write_file(path, content if isinstance(content, str) else json.dumps(content))
        return tmp_path

    return build


def test_a_paired_record_has_no_pairing_finding(data, site):
    root = site({
        f"{RECORDS}/amazon/a1b2c3.json": VALID,
        f"{ARTICLES}/amazon/a1b2c3.md": "# A\n\n<InterviewDetail />\n",
    })
    findings, records, cards = data.check(root)
    assert findings == []
    assert (records, cards) == (1, 1)


def test_a_record_without_an_article_is_an_error(data, site):
    root = site({f"{RECORDS}/amazon/a1b2c3.json": VALID})
    findings, _, _ = data.check(root)
    assert [(f.level, f.path) for f in findings] == [("error", f"{RECORDS}/amazon/a1b2c3.json")]
    assert f"no article at {ARTICLES}/amazon/a1b2c3.md" in findings[0].message


def test_an_article_with_the_card_but_no_record_is_an_error(data, site):
    root = site({f"{ARTICLES}/amazon/a1b2c3.md": "<InterviewDetail />\n"})
    findings, _, _ = data.check(root)
    assert len(findings) == 1
    assert findings[0].level == "error"
    assert findings[0].path == f"{ARTICLES}/amazon/a1b2c3.md"
    assert f"no record at {RECORDS}/amazon/a1b2c3.json" in findings[0].message
    assert "sits at" not in findings[0].message


def test_a_record_one_folder_off_is_named_in_the_error(data, site):
    root = site({
        f"{RECORDS}/amazon/608997.json": VALID,
        f"{ARTICLES}/amazon/onsite/608997.md": "<InterviewDetail /> \n",
    })
    findings, _, _ = data.check(root)
    by_path = {f.path: f.message for f in findings}
    assert set(by_path) == {f"{RECORDS}/amazon/608997.json", f"{ARTICLES}/amazon/onsite/608997.md"}
    assert by_path[f"{ARTICLES}/amazon/onsite/608997.md"].endswith(
        f"a record with this name sits at {RECORDS}/amazon/608997.json")


def test_a_paired_name_elsewhere_is_not_offered_as_the_fix(data, site):
    root = site({
        f"{RECORDS}/amazon/608997.json": VALID,
        f"{ARTICLES}/amazon/608997.md": "<InterviewDetail />\n",
        f"{ARTICLES}/amazon/onsite/608997.md": "<InterviewDetail />\n",
    })
    findings, _, _ = data.check(root)
    assert len(findings) == 1
    assert "sits at" not in findings[0].message


def test_an_article_without_the_card_is_not_an_error(data, site):
    root = site({f"{ARTICLES}/amazon/amazon-ng-sde.md": "# Old article without a record\n"})
    findings, _, cards = data.check(root)
    assert findings == []
    assert cards == 0


def test_a_record_whose_article_lacks_the_card_is_a_warning(data, site):
    root = site({
        f"{RECORDS}/airbnb/0105yy.json": record(company="airbnb"),
        f"{ARTICLES}/airbnb/0105yy.md": "# Article\n",
    })
    findings, _, _ = data.check(root)
    assert [(f.level, f.message) for f in findings] == [
        ("warning", "record not shown: its article does not place <InterviewDetail />")]


def test_an_english_article_pairs_too(data, site):
    root = site({
        f"{RECORDS}/amazon/a1b2c3.json": VALID,
        "docs/en/interview-experience/amazon/a1b2c3.md": "<InterviewDetail />\n",
    })
    findings, _, cards = data.check(root)
    assert findings == []
    assert cards == 1


def test_claude_md_is_not_an_article(data, site):
    root = site({f"{ARTICLES}/CLAUDE.md": "Example: <InterviewDetail />\n"})
    findings, _, cards = data.check(root)
    assert findings == []
    assert cards == 0


def test_invalid_json_is_an_error_with_its_position(data, site):
    root = site({
        f"{RECORDS}/amazon/a1b2c3.json": '{"company": "amazon",\n  "position": }\n',
        f"{ARTICLES}/amazon/a1b2c3.md": "<InterviewDetail />\n",
    })
    findings, _, _ = data.check(root)
    assert len(findings) == 1
    assert findings[0].message.startswith("invalid JSON: ")
    assert "(line 2, column" in findings[0].message


def test_no_folders_means_nothing_to_check(data, tmp_path):
    assert data.check(tmp_path) == ([], 0, 0)


# --- one record ----------------------------------------------------------------------------

def test_a_valid_record_has_no_findings(data):
    assert check(data) == []


def test_a_record_that_is_not_an_object_is_an_error(data):
    findings = data.check_record("x.json", "amazon", [VALID])
    assert messages(findings) == ["the record is a JSON list, not an object"]


def test_string_placeholders_are_errors_with_their_field(data):
    findings = check(
        data,
        position__jobType="string",
        applicationSource__referralDetails="string",
        interview__rounds=[{"roundType": "string", "rate": 2}],
    )
    assert messages(findings, "error") == [
        'position.jobType is the template placeholder "string"',
        'applicationSource.referralDetails is the template placeholder "string"',
        'interview.rounds[0].roundType is the template placeholder "string"',
    ]
    assert messages(findings, "warning") == []


def test_company_url_placeholder_is_an_error(data):
    assert messages(check(data, folder="google", company="url"), "error") == [
        'company is the template placeholder "url"']


def test_company_placeholder_string_is_reported_once(data):
    assert messages(check(data, company="string"), "error") == [
        'company is the template placeholder "string"']


@pytest.mark.parametrize("value", ["", "  ", None, 3])
def test_company_must_be_a_name(data, value):
    assert messages(check(data, company=value), "error") == [
        f"company must be the company's name, found {value!r}"]


def test_missing_company_is_an_error(data):
    assert messages(check(data, company=DELETE), "error") == [
        "company must be the company's name, found None"]


def test_company_in_another_case_is_a_warning(data):
    findings = check(data, folder="capital-one", company="Capital One")
    assert messages(findings) == ['company "Capital One" differs from its folder "capital-one"']
    assert findings[0].level == "warning"


def test_company_naming_another_folder_is_a_warning(data):
    assert messages(check(data, folder="walmart", company="walmart labs"), "warning") == [
        'company "walmart labs" does not name its folder "walmart"']


def test_a_missing_required_object_is_a_warning(data):
    findings = check(data, interview=DELETE)
    assert messages(findings) == ["no interview object, so the card shows no interview details"]
    assert findings[0].level == "warning"


def test_a_missing_optional_object_is_fine(data):
    assert check(data, candidate=DELETE, applicationSource=None) == []


def test_an_object_of_the_wrong_kind_is_an_error(data):
    assert messages(check(data, position="Software Engineer"), "error") == [
        'position must be an object, found text "Software Engineer"']


def test_required_text_that_is_null_is_a_warning(data):
    findings = check(data, interview__result=None)
    assert messages(findings, "warning") == [
        'interview.result is null; the site types it as text, use "" when unknown']
    assert messages(findings, "error") == []


def test_required_text_that_is_missing_is_a_warning(data):
    assert messages(check(data, position__level=DELETE), "warning") == ["position.level is missing"]


def test_optional_text_may_be_null_or_missing(data):
    assert check(data, position__jobPostUrl=None, candidate__background=DELETE) == []


@pytest.mark.parametrize("value, shown", [(3, "number 3"), (True, "boolean true"), ([], "a list")])
def test_text_of_the_wrong_kind_is_an_error(data, value, shown):
    assert messages(check(data, position__title=value), "error") == [
        f"position.title must be text, found {shown}"]


def test_years_of_experience_empty_text_is_an_error_with_a_hint(data):
    assert messages(check(data, candidate__yearsOfExperience=""), "error") == [
        'candidate.yearsOfExperience must be a number or null, found text ""; '
        "use null when there is no count"]


@pytest.mark.parametrize("value", [None, 0, 3, 1.5])
def test_years_of_experience_may_be_a_number_or_null(data, value):
    assert check(data, candidate__yearsOfExperience=value) == []


@pytest.mark.parametrize("value, shown", [("3", 'text "3"'), (False, "boolean false")])
def test_years_of_experience_of_the_wrong_kind_is_an_error(data, value, shown):
    assert messages(check(data, candidate__yearsOfExperience=value), "error") == [
        f"candidate.yearsOfExperience must be a number or null, found {shown}"]


# --- rounds and difficulty ratings -----------------------------------------------------------

def rounds(*items):
    return {"interview__rounds": list(items)}


@pytest.mark.parametrize("rate", [1, 5, 2.5])
def test_a_rating_from_1_to_5_is_fine(data, rate):
    assert check(data, **rounds({"roundType": "coding", "rate": rate})) == []


@pytest.mark.parametrize("rate", [None, 0])
def test_a_missing_rating_is_a_warning(data, rate):
    findings = check(data, **rounds({"roundType": "coding", "rate": rate}))
    assert messages(findings) == [f"interview.rounds[0].rate is {rate!r}: no difficulty rating"]
    assert findings[0].level == "warning"


def test_a_rating_key_that_is_absent_is_a_warning(data):
    assert messages(check(data, **rounds({"roundType": "coding"})), "warning") == [
        "interview.rounds[0].rate is None: no difficulty rating"]


@pytest.mark.parametrize("rate", [6, -1, 0.5])
def test_a_rating_outside_1_to_5_is_an_error(data, rate):
    assert messages(check(data, **rounds({"roundType": "coding", "rate": rate})), "error") == [
        f"interview.rounds[0].rate {rate} is outside 1 to 5"]


@pytest.mark.parametrize("rate, shown", [("3", 'text "3"'), (True, "boolean true")])
def test_a_rating_that_is_not_a_number_is_an_error(data, rate, shown):
    assert messages(check(data, **rounds({"roundType": "coding", "rate": rate})), "error") == [
        f"interview.rounds[0].rate must be a number 1 to 5, found {shown}"]


def test_rounds_that_are_not_a_list_are_an_error(data):
    assert messages(check(data, interview__rounds={"roundType": "coding"}), "error") == [
        "interview.rounds must be a list, found an object"]


def test_a_round_that_is_not_an_object_is_an_error(data):
    assert messages(check(data, **rounds("coding", {"roundType": "onsite", "rate": 3}))) == [
        'interview.rounds[0] must be an object, found text "coding"']


def test_a_round_type_outside_the_vocabulary_is_a_warning(data):
    assert messages(check(data, **rounds({"roundType": "VO1", "rate": 3})), "warning") == [
        'interview.rounds[0].roundType "VO1" is outside the vocabulary']


def test_a_round_type_of_the_wrong_kind_is_an_error(data):
    assert messages(check(data, **rounds({"roundType": 1, "rate": 3})), "error") == [
        "interview.rounds[0].roundType must be text, found number 1"]


def test_no_rounds_is_a_warning(data):
    assert messages(check(data, interview__rounds=[])) == ["no interview rounds"]
    assert messages(check(data, interview__rounds=DELETE)) == ["no interview rounds"]


def test_the_legacy_flat_form_is_a_warning_and_still_checked(data):
    findings = check(data, interview__rounds=DELETE, interview__roundType="onsite", interview__rate=7)
    assert messages(findings, "warning") == [
        "legacy flat interview.roundType/rate; the current form is interview.rounds"]
    assert messages(findings, "error") == ["interview.rate 7 is outside 1 to 5"]


# --- vocabulary --------------------------------------------------------------------------------

@pytest.mark.parametrize("field, value", [
    ("position__jobType", "full time"),
    ("applicationSource__channel", "online application"),
    ("candidate__education", "Master's degree"),
    ("interview__result", "Pass"),
    ("interview__result", ""),
    ("position__level", "L4"),
    ("position__level", "Senior"),
])
def test_values_outside_the_vocabulary_are_warnings(data, field, value):
    findings = check(data, **{field: value})
    shown = field.replace("__", ".")
    assert messages(findings) == [f'{shown} "{value}" is outside the vocabulary']
    assert findings[0].level == "warning"


@pytest.mark.parametrize("field, value", [
    ("position__jobType", ""),
    ("position__jobType", "internship"),
    ("applicationSource__channel", "online-assessment"),
    ("candidate__education", "phd"),
    ("interview__result", "unknown"),
    ("position__level", ""),
    ("position__level", "l4"),
    ("position__level", "ic3"),
    ("position__level", "mid-level"),
])
def test_values_in_the_vocabulary_pass(data, field, value):
    assert check(data, **{field: value}) == []


# --- the command line ---------------------------------------------------------------------------

def test_main_reports_ok_and_exits_0(data, site, capsys):
    site({
        f"{RECORDS}/amazon/a1b2c3.json": record(candidate__education="Masters"),
        f"{ARTICLES}/amazon/a1b2c3.md": "<InterviewDetail />\n",
    })
    assert data.main([]) == 0
    out = capsys.readouterr().out
    assert out.startswith("OK: 1 data record(s) and 1 article(s) with the card checked, no errors\n")
    assert "1 warning(s) in 1 file(s) (run with --warnings to list them):" in out
    assert "   1  value outside the vocabulary" in out


def test_main_lists_errors_and_exits_1(data, site, capsys):
    site({f"{RECORDS}/amazon/a1b2c3.json": record(position__jobType="string")})
    assert data.main([]) == 1
    out = capsys.readouterr().out
    assert out.startswith("2 error(s) in 1 data record(s) and 0 article(s) with the card:\n")
    assert f"  {RECORDS}/amazon/a1b2c3.json: no article at" in out
    assert 'position.jobType is the template placeholder "string"' in out


def test_main_lists_warnings_on_request(data, site, capsys):
    site({
        f"{RECORDS}/amazon/a1b2c3.json": record(company="Amazon"),
        f"{ARTICLES}/amazon/a1b2c3.md": "<InterviewDetail />\n",
    })
    assert data.main(["--warnings"]) == 0
    out = capsys.readouterr().out
    assert f'  {RECORDS}/amazon/a1b2c3.json: company "Amazon" differs from its folder "amazon"' in out


def test_main_rejects_unknown_arguments(data, capsys):
    assert data.main(["--fix"]) == 2
    assert "unknown: --fix" in capsys.readouterr().out
