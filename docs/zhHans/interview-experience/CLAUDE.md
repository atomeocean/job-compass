---
createdDate: 2026-09-02
lastUpdated: 2026-10-12
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

## What the page renders

Most of a 面经 page's chrome comes from the JSON and the company folder, not from the
Markdown:

| Where | What | Built from |
|---|---|---|
| Above the H1 | breadcrumb, and a 「<Company> 面经」button opening a drawer of this company's 面经 | the folder, the company `index.md` `title`, each sibling's frontmatter `title` and JSON |
| Under the H1 (`<InterviewDetail />`) | 本篇亮点, then the info card on screens narrower than 1280px | JSON `highlights`; the rest of the JSON |
| Right aside (≥ 1280px) | the info card: company, role, result, level, date, channel, background, each round's difficulty | JSON |
| After the article | 求职时间线, and a 「帮忙补充」link while `highlights` is empty | JSON `timeline` / `highlights` |

- Interview article pages have **no site sidebar**: `transformPageData` in
  [config.ts](../../.vitepress/config.ts) sets `sidebar: false` on them (not `layout: page`, which
  would drop the `vp-doc` styles and the `doc-*` slots) and builds the drawer list
  ([interviewNav.ts](../../.vitepress/interviewNav.ts)).
- **No 「基本信息」 list in the Markdown.** Date, role, level, education, job type, channel,
  result, rounds and background belong in the JSON, where the info card shows them. A fact with
  no JSON field (team, location, test platform, duration, what a round covered) goes as a bullet
  at the top of the first content section (`## 面试详情` / `## 面试过程`), or right under
  `<InterviewDetail />` when that section is a single round. The old lists were removed from
  all pages this way in one pass.
- A hand-written 「时间线」 section overlaps a JSON `timeline`; moving those into the JSON is a
  separate, later pass — leave them in place until then.
- The drawer list is read when the Markdown compiles; under `docs:dev`, restart the dev server
  after a JSON-only edit to see it change.

## Source attribution

Whether a page is a 转载 (repost) or a 原创分享 (author's own experience) is declared by the
JSON's `sourceType` — **the single source of truth**. `transformPageData` in
[config.ts](../../.vitepress/config.ts) reads it at build time and copies it into the page's
`frontmatter.sourceType` so components can use it during SSR; a `sourceType` hand-written in
Markdown frontmatter is overwritten. The info card turns it into a 转载 / 原创分享 line,
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
  },
  "highlights": [],
  "timeline": []
}
```

- `company` matches the directory name (lowercase kebab-case).
- `rounds[]` is the current shape. A flat `interview.roundType` + `interview.rate` is a legacy
  form still present in a few files and tolerated by the component — do not write new ones.
- `rate` is that round's **difficulty**, 1–5, or `null` when the source doesn't say (shown as
  未提及难度).
- `yearsOfExperience` is `null` when unknown; empty `level` / `jobType` / `date` / `result:
  "unknown"` are simply not shown.
- `highlights` and `timeline` are `[]` by default; a missing field reads the same as `[]`, so
  older files need no backfill.

### `highlights` — written by a person

The 本篇亮点 box at the top of the page. **The skills always write `[]`**; an editor fills it in
by hand afterwards.

```json
"highlights": [
  { "title": "写代码只剩 20 分钟", "detail": "clarify 和实现细节讨论占了大半时间", "anchor": "#coding问题" }
]
```

- 1–3 items: a short `title` (about 15 characters) and a one-sentence `detail`.
- `anchor` is optional: the id of a heading on this page, which makes the title a link.
- Highlights restate what the post says; never add a claim the post doesn't make.
- While it is empty, the box is not rendered at all, and the page footer shows a 「帮忙补充」
  link that opens this JSON for editing on GitHub.

### `timeline` — dated steps, not interview-day content

The 求职时间线 rendered after the article: applying, replies, scheduling, each interview, the
result. What was asked *inside* an interview stays in the Markdown.

```json
"timeline": [
  { "date": "2026-03-01", "event": "网申", "type": "apply" },
  { "date": "2026-03-10", "event": "安排面试", "type": "schedule", "note": "约定 04-07 Onsite" },
  { "date": "2026-04-07", "event": "Onsite 两轮", "type": "interview", "rounds": [1, 2] },
  { "date": null, "event": "拿到 Offer", "type": "result" }
]
```

- Events in chronological order. The skills write `[]` for now.
- `date` holds only what the post states precisely: `YYYY-MM-DD`, or `YYYY-MM` when it names
  just the month. Otherwise `null`, with the post's own words in `dateText` (`约两周后`,
  `Day 10`). Don't fill in a missing year unless the post or `interview.date` pins it down.
- The page shows the gap in days only between two full dates, and flags the longest gap when
  there are at least two.
- `rounds` are 1-based indexes into `interview.rounds`; `note` is one short line.

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
| `timeline[].type` | `apply`, `reply`, `oa`, `schedule`, `interview`, `result`, `other` | — |

The Chinese labels and colours shown on the page come from
[interviewFormat.ts](../../.vitepress/theme/utils/interviewFormat.ts), which also tolerates the
legacy values in the right-hand column. (`InterviewResultMap` in `interviewResultEnum.ts` is not
used by these pages.)

Leave a field as `""` (or `null` for `jobPostUrl`) when the source does not say — never invent
a value, and never leave the template's `"string"` placeholder.

## Company `index.md`

Each `<company>/index.md` needs frontmatter `title` (display name, e.g. `Amazon`) and
`description` (short blurb). Both are read by `generate_folder_overview.py` and surface in the
listings, so a missing `description` shows up as generic filler text on the section page. The
`title` is also the company name in every article's breadcrumb, drawer and info card.

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
