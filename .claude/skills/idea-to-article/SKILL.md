---
name: idea-to-article
description: Turn rough ideas/notes into a new skeleton markdown article under docs/zhHans/. First runs the find-docs search to list existing related pages to extend (or recommend a new file path when nothing matches), then scaffolds a skeleton .md with frontmatter, an H1, and the ideas organized into section headings with TODO markers. Use when the user has new ideas/notes/a draft topic and wants to start a new docs article.
---

# Turn new ideas into a skeleton docs article

Given some rough ideas, notes, or a draft topic, (1) **find where it should live** — list every
related existing doc so the user can extend one, or recommend the best new path — and then
(2) **scaffold a skeleton markdown file** that organizes those ideas into section headings,
ready for the user (or a later pass) to flesh out.

The input is the ideas themselves (free-form text), plus any user preference on path or angle.
If the user gave no ideas, ask for them before continuing. Keep the scope to **one article**
unless the ideas clearly span distinct topics and the user asks for several.

This is a job-seeking guide read by real job seekers: faithfully preserve the user's ideas in
the skeleton, and never invent facts or fill placeholders with made-up specifics (salary
numbers, company policies, visa rules) — leave a clear `TODO` where an idea needs evidence
or expansion.

## Steps

1. **Distill the ideas.** Read the user's input and pull out the core topic plus the discrete
   sub-points. Note the natural grouping — each cluster of ideas becomes a `##` section later.

2. **Find the right location (reuse the `find-docs` skill).** Search `docs/zhHans/` for existing
   content on the topic, exactly as `find-docs` does — search **directory/file names**, **H1
   titles & frontmatter**, and **body content**, with both English terms and Chinese phrasings:
   ```bash
   find docs/zhHans -type d -iname '*<term>*'
   find docs/zhHans -type f -name '*.md' -iname '*<term>*'
   rg -il --glob 'docs/zhHans/**/*.md' '^(#|title:).*<term>'
   rg -il --glob 'docs/zhHans/**/*.md' '<term>'
   ```
   Read the `# H1` of each candidate to confirm it's on-topic. Present the matches **most-relevant
   first as clickable links** (relative to repo root), each with its H1 title and a one-line note
   on how it relates — see the `find-docs` skill for the taxonomy and presentation format.

3. **Decide the target path.**
   - **If one or more existing docs are a strong fit**, the ideas may belong *inside* an existing
     page rather than a new file. Use `AskUserQuestion` to let the user choose: **extend an
     existing doc** (offer the top matches) or **create a new sibling article**. Don't assume.
   - **If nothing relevant exists**, recommend the single best new path following the `find-docs`
     taxonomy: pick the top-level category (`interview-prepare/`, `career-guide/`,
     `staffing-company/`, `visa-solution-company/`, `guide/`, …), descend into the most
     specific existing subfolder, and propose a `lowercase-kebab-case.md` filename. State the
     reasoning in one line. Never place content at the `docs/` root or under any `docs/_*`
     directory.
   - When the area is ambiguous, confirm the path with the user before writing.

4. **Read 1–2 sibling articles** in the chosen folder to match the local frontmatter shape and tone.

5. **Create a local branch — only when on `main`.** Before writing any file, check the current
   branch:
   ```bash
   git branch --show-current
   ```
   - **If the current branch is `main`**, never write straight to it — create and switch to a new
     branch off `main`, named after the topic, kebab-case, with an `idea/` prefix:
     ```bash
     git checkout -b idea/<topic-kebab-case>
     ```
     (e.g. `git checkout -b idea/hireright-background-check-tips`).
   - **If the current branch is anything other than `main`** (already a working/feature branch),
     stay on it and write there — do **not** create a new `idea/...` branch.

   This applies whether the work creates a new file or targets **extending an existing doc**.

6. **Write the skeleton file.** Create the `.md` at the confirmed path with:
   - **Frontmatter:**
     ```yaml
     ---
     title: <descriptive Simplified-Chinese H1>
     description: <one Simplified-Chinese sentence, no trailing period>
     outline: deep
     ---
     ```
     **Omit `createdDate` / `lastUpdated`** — the `update-frontmatter.yml` CI workflow auto-fills
     them on PR. Optionally add a `relatedArticles:` block pointing at the on-topic matches from
     step 2 (see the `related-articles-frontmatter` skill for the schema).
   - **`# H1`** = the title.
   - **One-sentence lead** capturing what the article is about (the hook).
   - **Section headings (`##`, `###`) from the idea clusters in step 1.** Under each heading,
     place the user's own idea as bullet points or a short prose stub — **kept faithful to their
     wording** — followed by a `<!-- TODO: ... -->` note for anything that still needs detail,
     evidence, a screenshot, or a link. The goal is a navigable skeleton, not a finished article.
   - Do **not** invent facts, fabricate numbers/dates, or pad thin ideas with plausible-sounding
     filler. Leave `TODO`s instead.
   - Do **not** add disclaimer / `免责声明` blockquotes or emojis.

7. **Report back.** Give the clickable path to the new skeleton, the branch name, a one-line
   summary of the section outline, the related docs found in step 2, and what to flesh out next.
   Mention the follow-up skills: `gen-description` to finalize the `description`, and
   `translate-to-en` to mirror it under `docs/en/` once the content is filled in. Leave the change
   on the branch — do not commit, push, or open a PR unless the user asks.

## Skeleton example

```markdown
---
title: HireRight 背调流程与常见问题
description: 梳理 HireRight 背调的流程节点、所需材料与延误时的应对方式
outline: deep
---

# HireRight 背调流程与常见问题

面向拿到 offer 后进入背调环节的求职者，梳理 HireRight 背调的流程与准备清单。

## 背调启动前的准备
- <用户原始想法：需要提前准备哪些材料>
<!-- TODO: 列全材料清单，确认前雇主联系方式的格式要求 -->

## 常见卡点
- <用户原始想法：前雇主 HR 不回复怎么办>
<!-- TODO: 补充实际案例或论坛链接 -->

## 延误时的沟通策略
- <用户原始想法：如何跟新雇主解释背调延误>
<!-- TODO: 补充邮件模板 -->
```

## Notes

- Searching (step 2) is read-only; only step 6 creates a file, and only after the path is confirmed
  and the branch step (step 5) is settled — a new `idea/...` branch when starting from `main`, or
  the current working branch otherwise.
- Always emit file paths as clickable markdown links relative to the repo root — never bare backticks.
- New directories are picked up automatically by the auto-generated sidebar — no config edit needed.
