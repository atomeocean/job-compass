---
createdDate: 2026-09-02
lastUpdated: 2026-10-01
---
# CLAUDE.md — interview-experience

面经 pages. Every page is a **pair of files in two different trees**: the article here, and a
structured JSON under `docs/assets/json/`. Getting the pairing wrong is the main failure mode
in this directory.

For the authoring workflow (turning a shared 面经 into a page), use the
`web-source-to-interview` skill. This file documents the structural contract only.

When a page keeps a source's discriminatory or hostile remark about a race, ethnicity,
nationality, or region, follow that paragraph with the fixed `::: warning 免责声明` block —
wording and scope in the **Race / nationality disclaimer** section of
[organize-interview-exp](../../../.claude/skills/organize-interview-exp/SKILL.md).

## The file pair

```
docs/zhHans/interview-experience/<company>/<slug>.md
docs/assets/json/interview-experience/<company>/<slug>.json
```

`<InterviewDetail />` takes **no props**. It reads VitePress `page.relativePath`, strips
everything up to `interview-experience/`, and looks up
`assets/json/interview-experience/<that exact suffix>.json`
(see [interviewData.ts](../../.vitepress/theme/utils/interviewData.ts)).

Consequences:

- The **full subpath after `interview-experience/` must match**, not just the basename.
- Renaming or moving the `.md` without moving the `.json` silently breaks the page — the
  component logs to the console and renders nothing.

**Every page has its JSON** — the older articles that predated the component were backfilled
from their Markdown, with whatever the text did not say left empty. Every new page ships both
files, and places `<InterviewDetail />` directly under the H1.

## Source attribution

Whether a page is a 转载 (repost) or a 原创分享 (author's own experience) is declared by the
JSON's `sourceType` — **the single source of truth**. `transformPageData` in
[config.ts](../../.vitepress/config.ts) reads it at build time and copies it into the page's
`frontmatter.sourceType` so components can use it during SSR; a `sourceType` hand-written in
Markdown frontmatter is overwritten. `InterviewDetail` turns it into a tag next to the result,
and `original` pages get a 原创声明 card appended through the `doc-footer-before` slot
([OriginalStatement.vue](../../.vitepress/theme/components/OriginalStatement.vue)).

| `sourceType` | Use when | Markdown must |
|---|---|---|
| `repost` | Content comes from another post | end with `<ReferenceSource :sources="[...]" />` |
| `original` | Confirmed to be the submitter's own interview | **not** contain `<ReferenceSource>` — the slot already renders the 原创声明 card |
| `unknown` | Origin can't be confirmed | either |

- A missing or invalid value is treated as `unknown` (no tag, no card), so forgetting the
  field never mislabels a repost as original. The build prints a `[sourceType]` warning when
  `repost` lacks `<ReferenceSource>` or `original` has one.
- Never flip `unknown` to `original` without confirmation from the author or a maintainer.
- When a maintainer submits an original on the author's behalf, `originalAuthor: <name>` in
  the Markdown frontmatter adds a 作者 line to the card.
- `docs:dev` does not pick up a JSON-only edit to `sourceType`; restart the dev server.

## Slugs

Short opaque slugs are the norm for community-submitted 面经 (`amz445`, `b1t3iq`, `021201`);
descriptive kebab-case (`amazon-ng-sde`) also exists. Either is fine — just keep the `.md`
and `.json` names identical.

## JSON schema

Typed by [interviewData.ts](../../.vitepress/theme/utils/interviewData.ts).

```json
{
  "company": "amazon",
  "sourceType": "repost",
  "position": {
    "jobPostUrl": null,
    "title": "Software Development Engineer",
    "level": "new-grad",
    "jobType": "full-time"
  },
  "applicationSource": { "channel": "referral", "referralDetails": "内推" },
  "candidate": { "education": "硕士", "background": "", "yearsOfExperience": 0 },
  "interview": {
    "date": "",
    "result": "pass",
    "rounds": [{ "roundType": "technical", "rate": 3 }]
  }
}
```

- `company` matches the directory name (lowercase kebab-case).
- `rounds[]` is the current shape. A flat `interview.roundType` + `interview.rate` is a legacy
  form still present in a few files and tolerated by the component — do not write new ones.
- `rate` is that round's **difficulty**, 1–5, or `null` when the source doesn't say (shown as
  未提及难度).
- `yearsOfExperience` is `null` when unknown; empty `level` / `jobType` / `date` / `result:
  "unknown"` are simply not shown.

### Vocabulary

The older JSON files have drifted badly (mixed case, mixed languages, and literal
`"string"` placeholders left over from the template). **Do not copy a neighbour's values
blindly.** Use these:

| Field | Use | Seen in the wild — do not imitate |
|---|---|---|
| `sourceType` | `repost`, `original`, `unknown` — see **Source attribution** | missing |
| `position.level` | `intern`, `new-grad`, `mid-level`, `senior`, or a company ladder in lowercase (`l4`, `l5`) | `L4`, `SDE2`, `Senior` |
| `position.jobType` | `full-time`, `internship`, `contract` | `string`, `full time`, `software engineer` |
| `applicationSource.channel` | `direct-apply`, `referral`, `recruiter`, `online-assessment`, `other` | `string`, `网上海投`, `online application` |
| `candidate.education` | `bachelor`, `master`, `phd` | `硕士`, `Master's degree`, `na` |
| `interview.result` | `pass`, `rejected`, `pending`, `unknown` | `Pass`, `passed`, `fail`, `未通过` |
| `roundType` | `oa`, `recruiter-screen`, `phone-screen`, `technical`, `coding`, `system-design`, `behavioral`, `hiring-manager`, `onsite` | `techinical`, `VO1`, `round 1` |

`interview.result` also flows through
[interviewResultEnum.ts](../../.vitepress/theme/types/interviewResultEnum.ts), whose
`InterviewResultMap` supplies the display label and colour.

Leave a field as `""` (or `null` for `jobPostUrl`) when the source does not say — never invent
a value, and never leave the template's `"string"` placeholder.

## Company `index.md`

Each `<company>/index.md` needs frontmatter `title` (display name, e.g. `Amazon`) and
`description` (short blurb). Both are read by `generate_folder_overview.py` and surface in the
listings, so a missing `description` shows up as generic filler text on the section page.

## Landing pages

- `index.md` — the section landing page. It is **hand-maintained**: the `interviewItems` array
  is written in the shape `generate_folder_overview.py` *would* emit, but the script does not
  yet output `articleCount` / `lastUpdated` / `createdDate`
  ([interviewExperienceListTypes.ts](../../.vitepress/theme/types/interviewExperienceListTypes.ts)).
  When you add a company, add its row here too.
- `overview.md` — **generated**, never edit by hand.

## folded-entry/

`folded-entry/` holds 面经 that were demoted rather than deleted: ad accounts, duplicates, and
obviously fabricated posts. LLM-generated 面经 are deleted outright, not folded. Move a page
here instead of deleting it when it falls into those categories.
