---
name: organize-interview-exp
description: Organize a pasted 面经 (link + author + full post text) verbatim into an interview-experience page pair — markdown under docs/zhHans/interview-experience/<company>/ and matching JSON under docs/assets/json/interview-experience/<company>/ — keeping the author's own first-person wording and only adding structure. Use when the user pastes the full text of an interview post and asks to 整理 / add it. English posts are literally translated to Chinese first.
createdDate: 2026-09-30
lastUpdated: 2026-10-01
---
# Organize a pasted 面经 verbatim

The user pastes three things: the post's **link**, its **author**, and the **full post text**.
Produce one file pair:

1. `docs/zhHans/interview-experience/<company>/<slug>.md`
2. `docs/assets/json/interview-experience/<company>/<slug>.json`

The governing rule is **verbatim**: the body is the author's text, in the author's voice. You
add structure around it — headings, paragraph breaks, extracted metadata — and the words
themselves stay exactly as written. The file-pair contract and JSON vocabulary live in
[docs/zhHans/interview-experience/CLAUDE.md](../../../docs/zhHans/interview-experience/CLAUDE.md);
read it before writing.

## Hard gates — stop and ask

- **No full text pasted** → ask for it and end the turn. The pasted text is the only source;
  do not fetch the link to fill it in.
- **No link or no author** → ask; both go into `<ReferenceSource>`.
- **Company or role not determinable from the text** → ask.

## English source: translate literally first

When the post body is English, translate the whole post into Chinese **literally** before
organizing: sentence for sentence, same meaning, same person (`I` → 我), same casual tone,
nothing added, dropped, smoothed, or summarized. Keep company names, role titles, technical
terms, and problem names in English (Behavioral Questions, System Design, Validate Binary
Search Tree, Leadership Principles), as existing 面经 do. The translation then becomes "the
source" for every rule below.

A Chinese post with English terms mixed in is already Chinese — keep it as is.

## Verbatim rules

Every body sentence is copied from the source character for character: first person, slang,
Chinese–English mixing, typos, emoji, and asides like `lol` all stay. The author says 我; the
page says 我.

The only edits allowed:

1. Insert `##` / `###` headings.
2. Break paragraphs at existing sentence boundaries.
3. Move a whole paragraph into the section it belongs to (e.g. an overall remark like
   「整体难度中等」 into `## 面试体验`), its text unchanged.
4. Link a LeetCode problem the author already names: `LC98` →
   `[LC98](https://leetcode.com/problems/validate-binary-search-tree/)`. The visible text stays
   the author's. Link only when you are certain of the problem's slug.
5. Bold the author's own **labels** — a short name for the content that follows, ending in a
   colon — so a round with several parts scans easily. A label on its own line
   (`Warmup Question:` → `**Warmup Question**:`) or opening a line (`追问：如果…` →
   `**追问**：如果…`). The label text and its colon stay exactly as written, with the colon
   **outside** the `**`: markdown-it leaves `**追问：**如果` unbolded, showing literal
   asterisks. A lead-in sentence like 「比如优先检查：」 is prose, so it stays plain.
6. Write `## 基本信息` and `## 面试结果反馈` as short structured fields. These are extracted
   metadata, so the phrasing is yours, but every value comes from the source.

Keep the author's own lists as lists and their prose as prose. Keep their descriptions of the
interviewer as written.

A section the source has nothing for is left out entirely (no overall remarks → no
`## 面试体验`).

Platform-injected text can be removed: 「本帖最后由 … 编辑」, 「注册一亩三分地论坛，查看更多干货！」,
hidden-content notices. List each removal in the report. Text the author wrote themselves —
even 「求大米」 — stays; flag it in the report so the user can decide.

Sections are separated by headings alone: the only `---` lines are the two around the
frontmatter.

## Race / nationality disclaimer

When the source makes a **discriminatory or hostile** remark about a race, ethnicity,
nationality, or region — contempt, insults, or hostility toward the group, like
「这些恶心人的国人」 or 「清理掉这些…」 — the text still stays verbatim, and the paragraph
holding it is followed directly by this block, worded exactly so:

```markdown
::: warning 免责声明
以上言论仅代表原帖作者个人观点，不代表 Atomeocean 的观点和立场。
:::
```

The block covers only the paragraph right above it, not the whole page: put one after each
paragraph that holds such a remark, and none anywhere else.

Identity labels on their own — 三哥 / 老印 / 印度小哥 / 国人面试官 / 中东的哥们 — don't
trigger it; they're kept as written under the interviewer-description rule above.

`check_verbatim.py` skips this block by its opener line, so change the wording here and in
the script together. Quote the triggering phrases in the report.

## Markdown skeleton

Reference pages: [b1t3iq.md](../../../docs/zhHans/interview-experience/amazon/b1t3iq.md),
[b2qavb.md](../../../docs/zhHans/interview-experience/google/b2qavb.md).

```markdown
---
title: <short form of the post title, e.g. L4过经 / phone screen L5>
description: <Company> <Level> <Role> <面试形式>面试经验
outline: deep
---
# <Company> <Level> <Role> <面试形式>面试经验

<InterviewDetail />

## 基本信息

- **岗位**：<Role>（<Level>）
- **面试形式**：<Phone Screen / Onsite / OA …>
- **申请渠道**：<内推 / 网上海投 …>
- **候选人背景**：<…>
- **面试结果**：<Pass / Fail / Pending …>

## 面试详情

<the author's overall description of the process, verbatim>

### 第一轮：Coding

**<author's label, e.g. Warmup Question>**:

<the author's text for this round, verbatim>

## 面试体验

<the author's overall remarks, verbatim>

## 面试结果反馈

- **最终结果**：<…>

<ReferenceSource
:sources="[
{
title: '<post title exactly as published — English titles stay English>',
link: '<post url>',
site: '<一亩三分地 / 小红书 / …>',
author: '<author>',
date: '<post date, YYYY-MM-DD>',
category: '海外面经'
}
]"
/>
```

- `## 基本信息`: include only the fields the source supports.
- `###` subsections follow the source's own rounds or parts (`### 第一轮：Coding`,
  `### Behavioral Questions`, `### 加面：AI / ML`).
- Omit `createdDate` / `lastUpdated`; CI injects them.

## JSON

Shape per [interviewData.ts](../../../docs/.vitepress/theme/utils/interviewData.ts); values
from the **Vocabulary** table in interview-experience/CLAUDE.md (`l5`, `new-grad`, `master`,
`referral`, `direct-apply`, `rejected`, `phone-screen`, `onsite` …) — the two reference JSONs
predate that table, so take their shape, not their values.

```json
{
  "company": "<company dir name>",
  "position": { "jobPostUrl": null, "title": "<Role>", "level": "<l5 / new-grad / \"\">", "jobType": "full-time" },
  "applicationSource": { "channel": "<vocabulary value>", "referralDetails": "<e.g. 内推 / \"\">" },
  "candidate": { "education": "<bachelor / master / phd / \"\">", "background": "<e.g. 在职跳槽 / \"\">", "yearsOfExperience": null },
  "interview": {
    "date": "<interview date the author states, else \"\">",
    "result": "<pass / rejected / pending / unknown>",
    "rounds": [{ "roundType": "<oa / phone-screen / onsite …>", "rate": 3 }]
  }
}
```

- `rounds`: one entry per interview stage (OA, phone screen, onsite loop).
- `rate` is difficulty 1–5 from the author's own words (「中等」→ 3, 「不算高」→ 2). When the
  author gives none, use `0` and say so in the report.
- Unstated fields: `""` for strings, `null` for `jobPostUrl` and `yearsOfExperience`.
- `interview.date` is the interview date; the post date belongs in `<ReferenceSource>`.

## Steps

1. **Branch**: if on `main`, create a branch; otherwise stay on the current one.
2. **Save the source**: write the pasted post, unchanged, to `source.txt` in the scratchpad.
   For an English post, also write the literal translation to `source_zh.txt`. The Chinese
   file is the source from here on.
3. **Pick the folder**: `<company>` is lowercase kebab-case. If the company folder has
   stage subfolders (e.g. `amazon/online-assessment/`) and the post belongs to one, use it —
   the md and json paths mirror each other below `interview-experience/`. For a new company,
   create `<company>/index.md` modelled on `google/index.md` with `title` and `description`.
4. **Update the landing page** `docs/zhHans/interview-experience/index.md`: in
   `interviewItems`, bump the company's `articleCount` and set `lastUpdated` to today, or add a
   row for a new company.
5. **Generate the slug**: `LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 6`; regenerate
   until no `<slug>.md` / `<slug>.json` exists in the target md or json folder.
6. **Write the JSON**, then **the markdown**.
7. **Check** — done when all four pass:
   - `python3 -c "import json; json.load(open('<json path>'))"`
   - `python3 scripts/check_verbatim.py <md path> <source file>`
     prints `OK`. Every line it lists is a sentence that drifted from the source: restore the
     source wording and rerun.
   - `grep -c '^---$' <md path>` prints `2`.
   - The md and json paths match below `interview-experience/`.
8. **Report**: the two file paths, fields left empty or `rate: 0`, platform text removed,
   author-written filler flagged, whether the race / nationality disclaimer was added (and the
   phrases that triggered it), whether the post was translated from English, and the check
   results. Leave the changes uncommitted.
