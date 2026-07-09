---
name: related-articles-frontmatter
description: Convert a related-links section (## 相关 / ## 相关文章 / ## Related) in a markdown article into a relatedArticles frontmatter array, which auto-renders via RelatedArticles.vue. Use when the user asks to convert/move a "相关" or "Related" section to relatedArticles frontmatter in a docs/ markdown file.
---

# Convert a related-links section to `relatedArticles` frontmatter

Move a hand-written related-links section out of a markdown body and into a
`relatedArticles` frontmatter array. The [RelatedArticles.vue](../../../docs/.vitepress/theme/components/RelatedArticles.vue)
component reads that array and auto-renders a styled "相关文章" block in the
`doc-footer-before` slot (registered in [index.ts](../../../docs/.vitepress/theme/index.ts)),
so the body section becomes redundant and must be deleted.

The input is a single markdown file under `docs/` (e.g. `docs/zhHans/interview-prepare/beware-of-fake-job-scams.md`).
If no path was given, ask the user for one before continuing.

## Schema

The frontmatter array follows [relatedArticlesTypes.ts](../../../docs/.vitepress/theme/types/relatedArticlesTypes.ts):

```yaml
relatedArticles:
  - title: <link text>
    href: <site-absolute path or external URL>
    # category: <optional — external source label only>
```

`title` and `href` are required; `category` is optional (the component groups
entries by category; categories with a single entry collapse into "其他").

## Steps

1. Read the target file. Locate the related section — its heading is one of
   `## 相关`, `## 相关文章`, `## Related`, `## Related Articles` (match the heading
   text, not just the level). The section runs from that heading to the next
   heading or end of file.
2. Parse each list item in the section (bulleted `- [text](href)` or numbered
   `1 [text](href)`). For each markdown link, `title` = link text, `href` = link target.
   - If a list item has **no** link (a plain-text note), it can't become a
     `relatedArticles` entry — leave it in the body and tell the user, or ask how
     to handle it. Don't drop content silently.
3. Resolve each `href` to a **site-absolute, locale-aware** path:
   - Determine the page's URL base from its path under `docs/<locale>/`:
     `zhHans` is the **default locale served at root `/`** (no prefix); `en` is
     served under `/en/`.
   - Relative hrefs (`./foo.md`, `../bar/`) resolve against the current page's
     directory URL. Example: from `docs/zhHans/interview-prepare/background-check/index.md`,
     `./american-data-bank.md` → `/interview-prepare/background-check/american-data-bank`
     and `../behavior-question/` → `/interview-prepare/behavior-question/`.
   - Hrefs already starting with `/` are site-absolute — keep as-is.
   - External URLs (`http(s)://`) — keep verbatim.
   - The component strips a trailing `.md`, so drop `.md` for cleanliness but keep
     trailing slashes on directory/index links.
   - **Omit `category` for internal cross-links.** Only add it when the link is an
     external source with a meaningful label (e.g. `category: 流程指南` for a
     logbook.atomeocean.com guide link — see
     `docs/zhHans/guide/interview-experience-utils/contributing.md`).
4. Merge into frontmatter:
   - If the file has a frontmatter block, insert `relatedArticles:` after the
     existing keys, before the closing `---`.
   - If `relatedArticles` already exists, merge the new entries in (don't
     duplicate existing hrefs) — ask the user if unsure.
   - If the file has no frontmatter, create a block at the top.
5. Remove the related section from the body — heading, all converted list items,
   and the surrounding blank lines — so the file ends cleanly with no dangling
   heading. (Keep any non-link plain-text items per step 2.)
6. **Remove any explicit `<RelatedArticles />` tag in the body.** A few older
   pages placed the tag manually before the `doc-footer-before` slot hook existed
   (PR #776); with the slot registered, an explicit tag renders the block twice.
7. Report the change and remind the user: the block auto-renders via
   `RelatedArticles.vue`, so no component tag or import is needed. Suggest
   `npm run docs:dev` to preview the "相关文章" block above the footer, and
   optionally `npm run docs:build` to catch dead links.
