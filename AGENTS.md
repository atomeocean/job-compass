---
lastUpdated: 2026-05-08
---
# AGENTS.md

This file gives Codex and other coding agents project-specific guidance for working in this repository. Codex reads repo guidance from `AGENTS.md`, so keep durable project rules here.

## Project Overview

Job Compass is an open-source, multilingual job-seeking guide platform built as a VitePress documentation site with custom Vue 3 components.

The primary content language is Simplified Chinese under `docs/zhHans/`. English content lives under `docs/en/`.

## Commands

```bash
# Development
npm run docs:dev

# Production build
npm run docs:build

# Preview the production build
npm run docs:preview
```

Use `npm run docs:build` after changes to theme code, VitePress config, Vue components, or broad Markdown structure. For small content-only Markdown edits, a build is optional unless the change touches links, frontmatter, custom components, or generated navigation behavior.

## Tech Stack

- VitePress 1.5.0, with docs rooted at `docs/`
- Vue 3 for custom theme components
- Element Plus for UI components
- TypeScript for theme code
- Python for utility scripts in `scripts/`

Do not introduce another frontend framework such as React, Next.js, Nuxt, Svelte, or Astro unless the user explicitly asks for a major migration.

## Repository Structure

- `docs/.vitepress/config.ts` - VitePress config, i18n, auto-sidebar, analytics, markdown plugins
- `docs/.vitepress/theme/index.ts` - theme entrypoint and global component registration
- `docs/.vitepress/theme/components/` - reusable Vue components
- `docs/.vitepress/theme/composables/` - Vue composables
- `docs/.vitepress/theme/constants/` - shared constants
- `docs/.vitepress/theme/types/` - shared TypeScript types
- `docs/.vitepress/theme/utils/` - shared utilities
- `docs/zhHans/` - Simplified Chinese docs, the primary content tree
- `docs/en/` - English docs
- `scripts/` - Python helper scripts
- `templates/` - content templates

Locale content generally mirrors these sections:

- `guide/`
- `direct-hire-company/`
- `job-postings/`
- `interview-experience/`
- `interview-prepare/`
- `career-guide/`
- `referral/`
- `staffing-company/`
- `visa-solution-company/`

## Critical Constraints

- Never modify `docs/_*` directories, including `docs/_data/`; these are auto-synced or generated.
- Reuse existing components and utilities before adding new ones.
- Keep edits scoped to the requested feature, page, or bug.
- Preserve existing user changes in the worktree. Do not revert unrelated edits.
- Avoid large refactors unless they are necessary to complete the user request.
- Do not add dependencies unless the user asks or the existing stack cannot reasonably solve the problem.

## Markdown Content Guidelines

- Use Markdown files for pages.
- Keep frontmatter consistent with nearby files, usually:

```yaml
---
title: Page Title
createdDate: YYYY-MM-DD
lastUpdated: YYYY-MM-DD
---
```

- Use clear heading hierarchy: `#`, then `##`, then `###`.
- Keep paragraphs short and readable.
- Use kebab-case for Markdown files and content folders.
- Prefer root-relative VitePress links that match the existing site style. In the default `zhHans` locale, links commonly look like `/direct-hire-company/virginia/mclean/capital-one` rather than filesystem paths.
- Link to the rendered route, not the `.md` file, unless the surrounding content already does otherwise.
- For Chinese content, match the tone and terminology of neighboring `docs/zhHans/` pages.
- When adding company, interview, job posting, or guide pages, inspect nearby pages first and follow their frontmatter, headings, and component usage.

## Vue and Theme Guidelines

- Use Vue 3 with `<script setup lang="ts">`.
- Define props explicitly with TypeScript types.
- Keep components single-purpose and easy to reuse.
- Prefer existing Element Plus patterns already used in the theme.
- Keep business/data transformation logic in utilities or composables when it is shared.
- Register globally used components through the existing theme entry pattern.
- Keep Vue components thin and presentational when possible. Put page/runtime state coordination in `docs/.vitepress/theme/composables/`, and pure normalization, matching, sorting, or data transformation helpers in `docs/.vitepress/theme/utils/`.
- For theme UI, prefer Element Plus components such as `el-space`, `el-link`, `el-avatar`, `el-text`, buttons, tags, tables, and form controls over raw HTML when an Element Plus component fits the job.
- Prefer `@ao-` aliases for theme imports instead of long relative paths.
- For route-dependent theme logic that reads VitePress `page` data or Nolebase git changelog data, explicitly handle route changes, for example by watching a page-relative key and refreshing derived data.
- For multilingual names or initials, use Unicode-safe string handling such as `Array.from(value)[0]` instead of `charAt(0)`.

## Path Aliases

Use the existing `@ao-` aliases:

- `@ao-components/*` -> `docs/.vitepress/theme/components/*`
- `@ao-types/*` -> `docs/.vitepress/theme/types/*`
- `@ao-utils/*` -> `docs/.vitepress/theme/utils/*`
- `@ao-composables/*` -> `docs/.vitepress/theme/composables/*`
- `@ao-constants/*` -> `docs/.vitepress/theme/constants/*`
- `@ao-theme/*` -> `docs/.vitepress/theme/*`

## Naming Conventions

| Type | Convention | Example |
| --- | --- | --- |
| Vue component files/folders | PascalCase | `StaffCard/`, `UserProfile.vue` |
| Markdown content folders | kebab-case | `h1b-guide/` |
| Markdown files | kebab-case | `getting-started.md` |
| Python scripts | snake_case | `generate_data.py` |

## Validation Guidance

- For content-only edits, check the diff and verify links/routes by comparing nearby files.
- For component, config, dependency, or navigation changes, run `npm run docs:build`.
- If changing UI behavior or layout, run the dev server and inspect the affected pages in a browser when practical.
- If a command fails because dependencies are missing, prefer `npm install` using the existing `package-lock.json`.

## Agent Workflow

- Read the relevant files before editing.
- Use `rg`/`rg --files` for repository search.
- Keep comments concise and only add them where they clarify non-obvious logic.
- Explain important tradeoffs to the user, but implement straightforward requested changes without unnecessary back-and-forth.
