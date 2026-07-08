---
name: web-source-to-interview
description: Turn a shared interview experience (面经) from a web link (RedNote/小红书, 一亩三分地, forum thread) or pasted text into an interview-experience page pair — the markdown under docs/zhHans/interview-experience/<company>/ plus its matching JSON under docs/assets/json/interview-experience/<company>/. Use when the user gives a 面经/interview writeup and asks to add it to the site. For non-interview sources use web-source-to-article instead.
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
   ---
   # <Company>面试经验

   公司介绍页面链接暂无
   ```

4. **Generate the slug** — a random 6-char lowercase alphanumeric ID (existing
   examples: `y2ti8x`, `sw9b1u`, `12nbu7`):
   ```bash
   LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 6
   ```
   Confirm no file with that name exists in the company's md or json folder.

5. **Write the JSON** `docs/assets/json/interview-experience/<company>/<slug>.json`,
   following the prevailing shape (see
   `docs/assets/json/interview-experience/openai/y2ti8x.json`):
   ```json
   {
     "company": "<Company>",
     "position": {
       "jobPostUrl": null,
       "title": "<Role>",
       "level": "<new-grad / senior / '' if unknown>",
       "jobType": "full-time"
     },
     "applicationSource": {
       "channel": "<内推 / direct apply / 猎头>",
       "referralDetails": "<detail or 'na'>"
     },
     "candidate": {
       "education": "<bachelor / master / phd / na>",
       "background": "<e.g. 26ng / 在职跳槽>",
       "yearsOfExperience": 0
     },
     "interview": {
       "date": "<YYYY-MM-DD or ''>",
       "result": "<pass / rejected / pending>",
       "rounds": [
         { "roundType": "<phone screen / technical / onsite / vo>", "rate": 3 }
       ]
     }
   }
   ```
   Use `""` / `null` / `"na"` for unknowns — never guess. One `rounds` entry per
   round the source describes.

6. **Write the markdown** `docs/zhHans/interview-experience/<company>/<slug>.md`,
   following `docs/zhHans/interview-experience/openai/y2ti8x.md`:
   - **Frontmatter**: `title` = concise role tag (e.g. `SDE`, `MachineLearningEng 挂经`),
     `description` (one zh-Hans sentence, no trailing period), `outline: deep`.
     Omit `createdDate`/`lastUpdated` — CI auto-fills them.
   - `# H1` naming company + role, e.g. `# 美国Google公司软件工程师面试经验`.
   - `<InterviewDetail />` on its own line right after the H1 (globally registered,
     no import).
   - `## 基本信息` — bullets from
     `docs/zhHans/guide/interview-experience-utils/requirement.md`, only the ones the
     source supports: **面试日期 / 面试岗位 / 学历背景 / 工作类型 / 投递方式 / 面试形式 / 当前状态**.
   - `## 面试详情` — subsections as fits the source, typically:
     `### 面试过程的详细描述` (one `####` per round; state the questions, link
     LeetCode problems like `[LeetCode 124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)`),
     `### 解决方法`, `### 面试流程`, `### 和面试官沟通细节`, `### 面试结果反馈`.
     Mark inferences explicitly (e.g. "从行文语气推断") rather than stating them as fact.
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
   - `python3 -c "import json; json.load(open('<json path>'))"` — the
     `validate-json.yml` CI runs `jq empty` on every changed JSON.
   - The JSON path mirrors the md path exactly (company folder and slug).
   - The sidebar picks the page up automatically — no config edits.

8. **Report** the two file paths, the branch name, and anything the source didn't
   specify (fields left `na`/empty). Leave the change on the branch — do not commit,
   push, or open a PR unless the user asks.

## Reference examples

- Markdown: `docs/zhHans/interview-experience/openai/y2ti8x.md`
- JSON: `docs/assets/json/interview-experience/openai/y2ti8x.json`
- Minimal company index: `docs/zhHans/interview-experience/google/index.md`
- Metadata field list: `docs/zhHans/guide/interview-experience-utils/requirement.md`
