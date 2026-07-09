---
name: web-source-to-article
description: Turn an external web link (RedNote/小红书 note, 一亩三分地 thread, forum post, article) into a Chinese markdown article under docs/zhHans/ that preserves the source's original content and cites it via <ReferenceSource>. Use when the user gives a URL and asks for a docs article/topic/case writeup — if the URL is missing, ask for it. For interview experiences (面经), use the web-source-to-interview skill instead.
---

# Create a docs article from an external web link

Produce ONE new markdown article under `docs/zhHans/` that (1) faithfully reproduces
the source's original content and (2) cites it via `<ReferenceSource>`. This is a
job-seeking guide read by real job seekers — never invent facts, company claims,
salary numbers, or outcomes.

**Interview experiences are out of scope**: if the source is a 面经 / interview
writeup for a specific company, stop and use the `web-source-to-interview` skill —
those pages have their own format and location.

## Hard gates — stop and ask, never guess

- **No URL in the request** → ask the user for the URL in plain text and end the
  turn. Do not web-search for a likely URL or proceed from memory.
- **Verbatim text unavailable** → `WebFetch` returns a model-summarized rendering,
  not verbatim text. If the sections that must stay in the author's own words (the
  original post, the author's claims and complaints) only came back as a summary —
  or the site blocks fetching entirely (小红书 often requires login) — ask the user
  to paste the original text and end the turn. Do not write those sections from a
  summary.

## Token discipline

- One `WebFetch` of the URL. Discourse-style forums support fetching `<url>.json`
  (full post + replies in one request); use that when the site is Discourse-based.
- Read at most ONE sibling article in the target folder, with `limit: 50`, just to
  match frontmatter and tone.
- Do not run `npm run docs:dev` and do not re-read the file you wrote. Finish by
  reporting the file path + a 2–3 line summary, not the full article text.

## Steps

1. **Branch** off the current branch before writing anything (never on `main`):
   `git checkout -b web-source/<topic-kebab>`.
2. **Fetch** per Token discipline; then apply the verbatim gate above.
3. **Title**: punchy Simplified-Chinese H1 naming the concrete situation and the
   stakes. No `案例：` prefix. e.g. `在美国找工作的小伙伴们千万不要选某某机构`.
4. **Path**: most specific existing subfolder under `docs/zhHans/` (see the
   `find-docs` skill taxonomy). Typical routing:
   - staffing-company (ICC) review/warning → `staffing-company/<company-kebab>.md`
   - visa agent / 挂靠 / immigration-policy story → `visa-solution-company/`
     (RedNote account profiles there use the `hongshu-<account-id>.md` naming)
   - job-scam warning or general prep story → `interview-prepare/`
   - career/workplace essay → `career-guide/`
   If area or angle is ambiguous, confirm with AskUserQuestion.
5. **Write the markdown**:
   - Frontmatter: `title`, `description` (one zh-Hans sentence, no trailing period),
     `outline: deep`. Omit `createdDate`/`lastUpdated` — CI auto-fills them.
   - `# H1` = the title, then a one-sentence lead with the sharpest painpoint.
   - Faithful sections preserving the original wording, with headings natural to the
     source. No editorial notes like "已做匿名处理" inside them.
   - `## 网友讨论` (discussion threads only): paraphrase the replies.
   - End with `<ReferenceSource>` — the component is **globally registered, no
     import needed**; pass the sources inline:
     ```vue
     <ReferenceSource
     :sources="[
     {
     title: '<source page title>',
     link: '<source url>',
     site: '<site name, e.g. 小红书 / 一亩三分地>',
     author: '<original author handle>',
     date: 'YYYY-MM-DD',
     category: '<笔记 / 论坛求助 / 新闻 / 问答>'
     }
     ]"
     />
     ```
   - Never include: `## 相关文章` body sections (use `relatedArticles` frontmatter —
     see the `related-articles-frontmatter` skill), disclaimers / `免责声明`, emojis
     beyond what the source itself uses.
6. **Verify** (cheap checks only): any cross-linked docs actually exist. The sidebar
   picks the article up automatically — no registration, no dev-server run.

Reference example: `docs/zhHans/staffing-company/man-teng.md`.
