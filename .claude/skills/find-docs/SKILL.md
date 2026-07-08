---
name: find-docs
description: Locate existing content in docs/zhHans for a topic and list every related file path; when nothing relevant exists, recommend the best file path to create following project conventions. Use before writing or editing a doc, when asked where something lives, where to put a new page, or "is there already a doc about X".
---

# Find content in docs/zhHans (or decide where it should go)

Given a topic, keyword, or feature name, search the Simplified-Chinese content root
(`docs/zhHans/`) and report **every related Markdown file as a clickable path**. If nothing
relevant exists, recommend the single best file path to create for a new doc, following the
project's directory taxonomy and naming conventions.

If the user gave no topic, ask for one before searching.

## Steps

1. **Normalize the query.** Pull the core concepts out of the user's request and expand them
   into search terms: include English technical terms, likely Chinese phrasings, and obvious
   synonyms (e.g. "面经 / 面试经验 / interview", "内推 / referral", "ICC / staffing / 外包",
   "背调 / background check", "New Grad / 应届 / entry level"). The content mixes Chinese body
   text with English terms, company names, and acronyms, so search both.

2. **Search `docs/zhHans/` three ways** and union the results:
   - **Directory & file names** — kebab-case paths often name the topic or company directly:
     ```bash
     find docs/zhHans -type d -iname '*<term>*'
     find docs/zhHans -type f -name '*.md' -iname '*<term>*'
     ```
   - **H1 titles & frontmatter** — the sidebar label lives in the `# H1` or `title:` field:
     ```bash
     rg -il --glob 'docs/zhHans/**/*.md' '^(#|title:).*<term>'
     ```
   - **Body content** — full-text match for the concept:
     ```bash
     rg -il --glob 'docs/zhHans/**/*.md' '<term>'
     ```
   Run a few term variants; don't stop at the first hit. Read the `# H1` of each candidate to
   confirm it's actually on-topic before listing it.

3. **Rank and present results.** If one or more files match, list them most-relevant first as
   clickable links (relative to the repo root), each with its H1 title and a one-line note on
   what it covers and how it relates to the query. Call out the difference when several files
   look similar (e.g. a company's interview-experience folder vs. its job-postings folder vs.
   its referral page), so the user can pick the right one to read or extend.

   ```markdown
   Found 3 related docs:

   1. [docs/zhHans/interview-experience/google/...](docs/zhHans/interview-experience/google/...) — Google 面经（最贴合）
   2. [docs/zhHans/job-postings/google/...](docs/zhHans/job-postings/google/...) — Google 在招岗位
   3. [docs/zhHans/referral/...](docs/zhHans/referral/...) — 内推渠道页
   ```

4. **If nothing relevant exists, recommend a path to create.** Pick the best-fit top-level
   category from the taxonomy below, descend into (or propose) the most specific subdirectory,
   and propose a `lowercase-kebab-case.md` filename. State your reasoning in one line and offer
   the path as a ready-to-create suggestion (don't create the file unless asked):

   ```markdown
   No existing doc covers this. Suggested location:
   docs/zhHans/interview-prepare/<page-name>.md
   理由：这是一篇面试准备类的通用知识，归入 interview-prepare 最合适。
   ```

   Naming & placement rules:
   - Content lives under `docs/zhHans/<category>/...`; an English mirror is optional at
     `docs/en/<same-path>` (see the `translate-to-en` skill). Never put new content directly at
     the `docs/` root.
   - Directories and Markdown files are **lowercase kebab-case** (`feature-name.md`) —
     except interview-experience pages, which use a random 6-char slug (see the
     `web-source-to-interview` skill).
   - Never create or modify anything under `docs/_*` directories (e.g. `docs/_data/`) —
     they are auto-synced by CI. The `data/` subfolders inside categories (e.g.
     `staffing-company/data/*.json`, `referral/data/*.json`) hold component data, not articles.
   - Prefer an existing subdirectory over inventing a new one; only propose a new directory
     when no existing subtree fits. New directories are picked up automatically by the
     auto-generated sidebar (no config edit needed).

## Top-level taxonomy of docs/zhHans

Use this to route a new doc to the right category:

| Category | What belongs here |
|---|---|
| `career-guide/` | Workplace & career essays — performance reviews, office politics, entry-level survival, work philosophy |
| `direct-hire-company/` | Direct-hire (非 ICC) company directory, organized by US state (`california/`, `texas/`, …) |
| `guide/` | Site & contribution how-tos — contribution-guide, GitHub PR/setup guides, `interview-experience-utils/`, `direct-hire-company-utils/`, captain-notes, author-info |
| `interview-experience/` | 面经 — one folder per company (`google/`, `meta/`, …), pages named with a random 6-char slug |
| `interview-prepare/` | Interview preparation — behavior questions, background checks, LeetCode, resume/LinkedIn, fake-job-scam warnings, how staffing companies work |
| `job-postings/` | Job postings, one folder per company |
| `referral/` | 内推 channels per company (+ `data/` JSON) |
| `staffing-company/` | Staffing-company (ICC) profiles, reviews & warnings (+ `data/` JSON) |
| `visa-solution-company/` | Visa-solution companies & agents (挂靠/H1B 中介) — profiles, warnings, policy-news analysis |

Quick routing heuristic: an **interview writeup for a specific company** → `interview-experience/`;
**general interview/job-search prep** → `interview-prepare/`; **job listing** → `job-postings/`;
**内推** → `referral/`; **ICC/staffing company intel** → `staffing-company/`; **visa agent /
挂靠 / immigration-policy news** → `visa-solution-company/`; **direct-hire employer info** →
`direct-hire-company/<state>/`; **career/workplace essay** → `career-guide/`; **how to
contribute / site mechanics** → `guide/`.

## Notes

- Always emit paths as clickable markdown links relative to the repo root, per the workspace
  convention — never bare backticks for file references.
- Searching is read-only. Creating the suggested file, or scaffolding its frontmatter, only
  happens if the user explicitly asks.
- A brand-new doc needs the standard frontmatter (`title`, `description`, optional
  `outline: deep`); `createdDate`/`lastUpdated` are auto-filled by the `update-frontmatter.yml`
  CI workflow on PR. The `gen-description` skill can fill in `description` afterward.
