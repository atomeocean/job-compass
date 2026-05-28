---
name: translate-to-en
description: Create an English mirror under docs/en/ of a Chinese article or folder under docs/zhHans/. Use when the user asks to translate, mirror, port, or create an English version of a markdown file or folder in this VitePress site. Accepts a single .md path or a folder path.
---

# Translate Chinese docs to English mirror

Create an English mirror of the Chinese content the user pointed at. The input is either:
- a single markdown file under `docs/zhHans/` (e.g. `docs/zhHans/policy-document/foo.md`), or
- a folder under `docs/zhHans/` (e.g. `docs/zhHans/policy-document`) — translate every `.md` inside recursively.

If no path was given, ask the user for one before continuing.

## Steps

1. Resolve the source path. If it's a folder, find all `.md` files recursively, skipping any directory or file whose name starts with `_` (e.g. `_includes/`).
2. For each source file, compute the destination by replacing the `docs/zhHans/` segment with `docs/en/`, keeping the rest of the relative path identical.
3. If the destination already exists, ask the user before overwriting that file.
4. Read the source. If a sibling English file already exists in the same `docs/en/...` folder, glance at its frontmatter to match local conventions.
5. Translate the file to English:
   - Translate the frontmatter `title` and `description`. Keep `createdDate`, `lastUpdated`, and `outline` exactly as-is.
   - Preserve all markdown structure: headings, lists, tables, code blocks, blockquotes, Vue component tags, and every `[text](url)` link verbatim.
   - Use a measured, factual tone matching the sibling English articles. No marketing language, no emojis (unless the source has them).
   - Translate proper nouns naturally and gloss Chinese-only names on first use, e.g. `小红书` → "RedNote (Xiaohongshu)".
   - Keep statistics, dates, official quotes, and external URLs verbatim.
   - Do NOT add an "AI-translated" banner — existing English articles don't use one.
6. Write each destination file with the Write tool (creating parent directories if needed).
7. After all files are written, report the list of created/updated paths and remind the user that `npm run docs:dev` will auto-pick them up via `vitepress-sidebar` (no config edits needed).
