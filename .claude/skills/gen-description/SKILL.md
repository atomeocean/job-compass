---
name: gen-description
description: Generate or update the `description` frontmatter field for a markdown article under docs/. Use when the user asks to generate, write, or update the description/meta description of a markdown file in this VitePress site.
---

# Generate `description` frontmatter for a markdown article

Write a concise Chinese `description` field that VitePress injects as `<meta name="description">` and `og:description`. Good descriptions improve search snippet quality and social sharing previews.

The input is a single markdown file under `docs/` (e.g. `docs/zhHans/staffing-company/beaconfire.md`). If no path was given, ask the user for one before continuing.

## Steps

1. Read the target file. Note:
   - All existing frontmatter keys, especially `title` and any existing `description`
   - The H1 heading and first 2–3 paragraphs of body content
   - Key H2/H3 section headings to understand scope

2. If `description` already exists in the frontmatter, show the current value to the user and ask whether to replace it or abort. Do not overwrite silently.

3. Read 2–3 sibling files in the same directory that already have a `description` field. Use them to calibrate tone and length for this content area.

4. Generate the description following project conventions:
   - Plain Simplified Chinese, one sentence, no trailing period
   - 50–120 characters — enough to be informative in a search snippet, short enough not to be truncated
   - Formula: `[Subject/company/topic] + [what the article covers]` — factual, not marketing
   - Keep English proper nouns as they appear in the article (e.g. H1B, OPT, New Grad, SDE, Google)
   - Must stand alone as a complete sentence — avoid filler openers like "本文介绍" or "这篇文章讲述"

5. Write the description into frontmatter using the Edit tool:
   - If a frontmatter block exists: insert `description:` immediately after the `title:` line, or replace the existing `description:` line if present
   - If no frontmatter block exists: create one at the top of the file containing only `description:`

6. Report the generated description and remind the user to run `npm run docs:dev` to preview the page and verify the `<meta name="description">` tag in the browser's dev tools.
