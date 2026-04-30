# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Job Compass is an open-source, multilingual (Chinese/English) job-seeking guide platform built as a VitePress documentation site with custom Vue 3 components.

## Commands

```bash
# Development
npm run docs:dev       # Start local dev server

# Build & Preview
npm run docs:build     # Production build
npm run docs:preview   # Preview production build
```

## Architecture

### Tech Stack

- **VitePress 1.5.0** — static site generator (docs root: `docs/`)
- **Vue 3** — custom interactive components
- **Element Plus** — UI component library
- **Python** — utility scripts in `scripts/`

Do not introduce other frameworks (React, Next.js, etc.).

### Content Structure

Content is organized by locale under `docs/`:

- `docs/zhHans/` — Simplified Chinese content (primary)
- `docs/en/` — English content

Each locale mirrors sections: `guide/`, `direct-hire-company/`, `job-postings/`, `interview-experience/`, `interview-prepare/`, `career-guide/`, `referral/`, `staffing-company/`, `visa-solution-company/`

### Theme & Components

`docs/.vitepress/theme/` contains the custom VitePress theme:

- `index.ts` — theme entry; registers all custom components globally, integrates Element Plus, sets up Giscus comments and contributor display via slot hooks
- `components/` — 16+ custom Vue components (e.g., `JobPostingTable.vue`, `InterviewDetail.vue`, `DirectHireCompanyTable.vue`)
- `types/` — shared TypeScript types
- `utils/` — utility functions (address formatting, number formatting)
- `composables/` — Vue composables
- `constants/` — shared constants

### Path Aliases

All aliases use the `@ao-` prefix (short for AtomOcean):

- `@ao-components/*` → `docs/.vitepress/theme/components/*`
- `@ao-types/*` → `docs/.vitepress/theme/types/*`
- `@ao-utils/*` → `docs/.vitepress/theme/utils/*`
- `@ao-composables/*` → `docs/.vitepress/theme/composables/*`
- `@ao-constants/*` → `docs/.vitepress/theme/constants/*`
- `@ao-theme/*` → `docs/.vitepress/theme/*`

### VitePress Config

`docs/.vitepress/config.ts` — main config; sets up i18n (default locale: `zhHans`), auto-sidebar, git changelog plugin, inline link preview, analytics (Google Analytics, Cloudflare, Umami), and a custom markdown-it plugin that injects `<DocTitleMeta />` after every h1.

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Vue component files/folders | PascalCase | `StaffCard/`, `UserProfile.vue` |
| Markdown content folders | kebab-case | `h1b-guide/` |
| Markdown files | kebab-case | `getting-started.md` |
| Python scripts | snake_case | `generate_data.py` |

## Vue Component Guidelines

- Use `<script setup lang="ts">`
- Define props explicitly with types
- Keep components single-responsibility; no complex business logic inside components

## Critical Constraints

- **Never modify `docs/_*` directories** (e.g., `docs/_data/`) — these are auto-synced by CI workflows
- Reuse existing components before creating new ones
- Maintain consistent style with surrounding content
