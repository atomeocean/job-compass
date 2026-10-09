---
createdDate: 2026-09-02
lastUpdated: 2026-10-09
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
- Known-broken today: `amazon/onsite/608997.md` and `amazon/onsite/260414.md` sit one level
  deeper than their JSON at `amazon/608997.json` / `amazon/260414.json`. Fix by moving the
  JSON to `amazon/onsite/`, not by adding a prop.

Older articles (about a quarter of them) predate the component and have no JSON. That is
acceptable for existing files, but **every new page ships both files**.

## Source attribution

Whether a page is a 转载 (repost) or a 原创分享 (author's own experience) is **inferred**, not
declared: `transformPageData` in [config.ts](../../.vitepress/config.ts) sets
`frontmatter.sourceType` to `repost` when the file contains `<ReferenceSource`, and to
`original` when it doesn't. `InterviewDetail` turns that into a tag next to the result, and
`original` pages get a 原创声明 card appended automatically through the `doc-footer-before` slot
([OriginalStatement.vue](../../.vitepress/theme/components/OriginalStatement.vue)).

- **Repost** — end the page with `<ReferenceSource :sources="[...]" />`, as the 面经 skills
  already do. A repost without it gets labelled 原创分享.
- **Original** — write nothing. Do **not** hand-write `<ReferenceSource original />`; the slot
  already renders it and the card would appear twice. When a maintainer submits on the
  author's behalf, `originalAuthor: <name>` in frontmatter adds a 作者 line to the card.
- **Unconfirmed** — `sourceType: unknown` in frontmatter suppresses both the tag and the card.
  Older pages whose origin nobody can confirm carry it; never remove it to make a page look
  original.

## Slugs

Short opaque slugs are the norm for community-submitted 面经 (`amz445`, `b1t3iq`, `021201`);
descriptive kebab-case (`amazon-ng-sde`) also exists. Either is fine — just keep the `.md`
and `.json` names identical.

## JSON schema

Typed by [interviewData.ts](../../.vitepress/theme/utils/interviewData.ts).

```json
{
  "company": "amazon",
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
- `rate` is that round's **difficulty**, 1–5.

### Vocabulary

The existing 70 JSON files have drifted badly (mixed case, mixed languages, and literal
`"string"` placeholders left over from the template). **Do not copy a neighbour's values
blindly.** Use these:

| Field | Use | Seen in the wild — do not imitate |
|---|---|---|
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
