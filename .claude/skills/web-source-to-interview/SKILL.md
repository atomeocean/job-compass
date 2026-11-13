---
name: web-source-to-interview
description: Turn a shared interview experience (面经) from a web link (RedNote/小红书, 一亩三分地, forum thread) or pasted text into an interview-experience page pair — the markdown under docs/zhHans/interview-experience/<company>/ plus its matching JSON under docs/assets/json/interview-experience/<company>/. Use when the user gives a 面经/interview writeup and asks to add it to the site. For non-interview sources use web-source-to-article instead.
lastUpdated: 2026-10-13
---
# Create an interview-experience (面经) page from a web source

Produce a **file pair** for one interview experience:

1. `docs/zhHans/interview-experience/<company>/<slug>.md` — the article, rendered with `<InterviewDetail />`
2. `docs/assets/json/interview-experience/<company>/<slug>.json` — structured metadata

`InterviewDetail.vue` resolves the JSON **by mirroring the markdown's path**
(`interview-experience/<company>/<slug>.md` → `assets/json/interview-experience/<company>/<slug>.json`),
so the two paths must match exactly or the info card silently won't render.

This is a job-seeking guide read by real candidates: report only what the source
actually says. Never invent questions, rounds, results, or compensation. Follow the
contribution rules in `docs/zhHans/guide/interview-experience-utils/contributing.md`:
anonymize the original author, objective tone, no attacks on interviewers.

## Hard gates — stop and ask, never guess

- **No URL and no pasted text** → ask the user for one and end the turn.
- **Fetch blocked or summarized** → 小红书 usually requires login and `WebFetch`
  returns a summary at best. If the fetched content doesn't include the actual
  interview questions in enough detail to restate them faithfully, ask the user to
  paste the original text and end the turn. Do not fabricate question details.
- **Source breaks a community rule**:
  [no-ai-content](../../../docs/zhHans/guide/rules/no-ai-content.md),
  [low-quality](../../../docs/zhHans/guide/rules/low-quality.md) or
  [promotion](../../../docs/zhHans/guide/rules/promotion.md)
  → tell the user which rule and why, and end the turn; do not write the page.

## Token discipline

- One `WebFetch` of the URL (Discourse-style forums: fetch `<url>.json` instead).
- Read at most ONE sibling 面经 (with `limit: 60`) to match tone — the reference
  examples below are usually enough.
- Do not run `npm run docs:dev`; finish by reporting the two file paths + a 2–3 line
  summary, not the full article text.

## Steps

1. **Branch** off the current branch before writing anything (never on `main`):
   `git checkout -b interview/<company>-<role-kebab>`.

2. **Fetch/read the source** and extract: company, role + level (New Grad / intern /
   senior…), round type(s), the questions (link LeetCode problems when identifiable),
   the candidate's approach, interviewer interactions, and the outcome. Apply the
   hard gates above.

3. **Resolve the company folder** — kebab-case company name (e.g. `capital-one`,
   `bytedance`) under both roots. If `docs/zhHans/interview-experience/<company>/`
   doesn't exist, create it with a minimal `index.md` following
   `docs/zhHans/interview-experience/google/index.md`:
   ```markdown
   ---
   title: <Company>
   description: <Company> 面试经验分享
   ---
   <script setup>
   import CompanyInterviewList from '@ao-components/interview/CompanyInterviewList.vue'
   </script>

   # <Company>面试经验

   <CompanyInterviewList />
   ```

4. **Generate the slug** — a random 6-char lowercase alphanumeric ID (existing
   examples: `y2ti8x`, `sw9b1u`, `12nbu7`):
   ```bash
   LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 6
   ```
   Confirm no file with that name exists in the company's md or json folder.

5. **Write the JSON** `docs/assets/json/interview-experience/<company>/<slug>.json`.
   **Read `docs/.vitepress/theme/constants/interviewEnums.ts` first**: it is the only list of
   legal values for `sourceType`, `level`, `jobType`, `channel`, `education`, `result` and
   `roundType`. Write the code from that file (lowercase kebab-case), never a label, a
   translation or your own wording. The example below shows one legal value per field, not
   the full list; for a complete real file that passes validation, see
   `docs/assets/json/interview-experience/google/k7fq2m.json`. Older files elsewhere in the
   folder still carry legacy values — don't copy values from them:
   ```json
   {
     "company": "<company folder name, e.g. capital-one>",
     "sourceType": "repost",
     "source": { "site": "<小红书 / 一亩三分地>", "author": "<author or ''>", "link": "<post url>" },
     "position": {
       "jobPostUrl": null,
       "title": "<Role>",
       "level": "new-grad",
       "jobType": "full-time"
     },
     "applicationSource": {
       "channel": "referral",
       "referralDetails": "<detail or ''>"
     },
     "candidate": {
       "education": "master",
       "background": "<e.g. 26ng / 在职跳槽, or ''>",
       "yearsOfExperience": null
     },
     "interview": {
       "date": "<YYYY-MM-DD, YYYY-MM or YYYY — only as precise as the source; else ''>",
       "result": "rejected",
       "rounds": [
         { "roundType": "phone-screen", "rate": 3 }
       ]
     },
     "highlights": [],
     "timeline": []
   }
   ```
   `highlights` and `timeline` are always `[]`: highlights are written by an editor by hand
   later, and timeline backfill is a separate pass (rules in interview-experience/CLAUDE.md).
   Unknowns — never guess, and never write `"na"` or `"string"`: `""` for strings
   (`level`, `jobType`, `channel`, `education`, `date`, free text), `null` for `jobPostUrl`,
   `yearsOfExperience` and a round's `rate` (difficulty 1–5), and `"unknown"` for `result`.
   One `rounds` entry per round the source describes; `roundType` says what kind of round it
   is, not which one (no `vo1` / `round-1`; a virtual onsite is `onsite`).
   **A fixed-value field holds the code and nothing else.** When the source adds detail to
   one (「CS 硕士」, 「通过 → Team Match」, 「组里同事内推」), write only the code and leave
   the detail out of the JSON — where it belongs, and in what wording, is a human call. List
   each one in the report (step 8).
   `sourceType` is always `repost` for a page built from a web
   source (it ends with `<ReferenceSource>`); `source` repeats that block's `site` / `author` /
   `link` exactly.

6. **Write the markdown** `docs/zhHans/interview-experience/<company>/<slug>.md`,
   following `docs/zhHans/interview-experience/openai/y2ti8x.md`:
   - **Frontmatter**: `title` = concise role tag (e.g. `SDE`, `MachineLearningEng 挂经`),
     `description` (one zh-Hans sentence, no trailing period), `outline: deep`.
     Omit `createdDate`/`lastUpdated` — CI auto-fills them.
   - `# H1` naming company + role, e.g. `# 美国Google公司软件工程师面试经验`.
   - `<InterviewDetail />` on its own line right after the H1 (globally registered,
     no import).
   - **No `## 基本信息` list** — 面试日期 / 岗位 / 学历 / 工作类型 / 投递方式 / 面试形式 / 结果
     go in the JSON (step 5), where the page's info card shows them.
   - `## 面试详情` — open with bullets only for facts the JSON has no field for (team,
     location, test platform, duration) and the source states; then subsections as fits the
     source, typically:
     `### 面试过程的详细描述` (one `####` per round; state the questions, link
     LeetCode problems like `[LeetCode 124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)`),
     `### 解决方法`, `### 面试流程`, `### 和面试官沟通细节`, `### 面试结果反馈`.
     Mark inferences explicitly (e.g. "从行文语气推断") rather than stating them as fact.
     `### 面试结果反馈` is only for what the source says beyond the result itself (HR feedback,
     rejection reason) — never restate pass / rejected there, the JSON `result` shows it; if
     that is all the source says, leave the section out.
   - End with `<ReferenceSource>` citing the source (globally registered, inline props):
     ```vue
     <ReferenceSource
     :sources="[
     {
     title: '<source title>',
     link: '<source url>',
     site: '<小红书 / 一亩三分地 / …>',
     author: '<author handle>',
     date: 'YYYY-MM-DD',
     category: '<海外面经 / 笔记>'
     }
     ]"
     />
     ```

7. **Verify** (cheap checks only):
   - `npm run validate:interview -- <json path>` prints `✅`. It checks the JSON against the
     schema and names each field with an illegal value; fix them and rerun until it passes.
     The `validate-json.yml` CI runs the same command on every new interview JSON.
   - The JSON path mirrors the md path exactly (company folder and slug).
   - The sidebar picks the page up automatically — no config edits.

8. **Report** the two file paths, the branch name, anything the source didn't
   specify (fields left empty / `null` / `unknown`), and each detail left out of a
   fixed-value field (field, code written, the source's exact words) for a human to place. Leave the change on the branch — do not commit,
   push, or open a PR unless the user asks.

## Reference examples

- Markdown: `docs/zhHans/interview-experience/openai/y2ti8x.md`
- JSON: `docs/assets/json/interview-experience/google/k7fq2m.json` (passes
  `npm run validate:interview`; the Markdown example's own JSON predates the rules)
- Minimal company index: `docs/zhHans/interview-experience/google/index.md`
- Legal values: `docs/.vitepress/theme/constants/interviewEnums.ts`. Not
  `guide/interview-experience-utils/requirement.md`: that page is a reader-needs discussion
  written in display wording (网上海投, 本科或研究生), not JSON values.
