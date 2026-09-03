---
createdDate: 2026-09-02
lastUpdated: 2026-09-02
---
# CLAUDE.md — VitePress theme

Custom theme code: Vue 3 + `<script setup lang="ts">`, Element Plus, and a handful of
Nolebase plugins. Content authoring rules live in the `docs/zhHans/*/CLAUDE.md` files; this
file is about the code.

## Layout

```
theme/
  index.ts        theme entry: global component registration, Element Plus, layout slots
  components/     21 components (+ components/siteStatistic/)
  composables/    useContributors.ts
  types/          shared TS interfaces and enums
  utils/          pure helpers (contributors.ts, interviewData.ts, util.ts)
```

There is **no `constants/` directory** even though the `@ao-constants` alias is defined in
[alias.ts](../alias.ts). Create the folder if you genuinely need it; don't assume it exists.

## Path aliases

Defined in [alias.ts](../alias.ts) and mirrored in `tsconfig.json`. Use them instead of long
relative paths:

`@ao-components` · `@ao-composables` · `@ao-types` · `@ao-utils` · `@ao-constants` · `@ao-theme`

Note that `interviewData.ts` currently uses a relative `import.meta.glob` path
(`'../../../assets/json/...'`) because the glob pattern is resolved by Vite at build time
against the file's own location — aliases do not work inside `import.meta.glob`. Same reason
the table components use root-absolute glob patterns like `/zhHans/job-postings/*/data/*.json`.

## Registering a component

Global registration happens in [index.ts](index.ts) via `app.component(...)` inside
`enhanceApp`. Markdown pages can only use globally registered components, so any component
meant for content **must** be added there.

Three components are wired through layout slots instead, and are not globally registered:

| Slot | Component |
|---|---|
| `doc-before` | `ContributorWrapper` |
| `doc-footer-before` | `RelatedArticles` |
| `doc-after` | `Giscus` |

`<DocTitleMeta />` is not written by hand either — a custom markdown-it plugin in
[config.ts](../config.ts) appends it after every `h1` during render.

## SSR + SPA navigation gotchas

These break at runtime only. **`npm run docs:build` passes even when they are broken**, so
always verify with `npm run docs:dev` and click between pages before declaring done.

- **Never use `<component :is="'el-link'">` (or any dynamic tag resolving to a globally
  registered Element Plus component) in an SSR-rendered template.** Hydration resolves the
  dynamic component differently than the SSR pass. The symptom is a "blink and disappear":
  the SSR HTML flashes, then Vue discards it and re-renders client-side with empty data. Use
  static `v-if` / `v-else` branches instead — see
  [ContributorWrapper.vue](components/ContributorWrapper.vue), which spells out both branches
  by hand for exactly this reason.
- **`useChangelog()` does not refresh on SPA navigation.** Calling `useHmr()` once in
  `onMounted` is not enough. Watch the page key and re-fetch — see
  [useContributors.ts](composables/useContributors.ts), which does
  `watch(componentKey, () => useHmr())` with `componentKey = page.value.relativePath`.
- **Keep `:key="page.value.relativePath"` on the root of any subtree driven by per-page data.**
  It forces a rebuild on route change. Removing it as "redundant" breaks SPA navigation:
  navigating A → B leaves stale or empty data until a manual refresh.
- **Data-loading components must reload on route change, not just on mount.** Both
  `InterviewDetail` and `ContributorWrapper` pair `onMounted(load)` with
  `watch(() => page.value.relativePath, load)`. Copy that pattern.

## Loading JSON content

Content JSON is pulled in with `import.meta.glob`, which is **statically analyzed** — the
pattern must be a literal, and only files matching it are bundled. A path built at runtime
that falls outside the pattern resolves to `undefined` and the component renders nothing.
When changing where content JSON lives, update the glob pattern in the same commit:

| Component | Pattern |
|---|---|
| `JobPostingTable` | `/zhHans/job-postings/*/data/*.json` (one company level only) |
| `DirectHireCompanyTable` | `/zhHans/direct-hire-company/**/*.json` |
| `StaffingCompanyTable` | `/zhHans/staffing-company/data/*.json` (flat) |
| `utils/interviewData.ts` | `../../../assets/json/interview-experience/**/*.json` |

Each of these normalizes a missing `.json` suffix before lookup, so both `"iqvia"` and
`"iqvia.json"` work — but the per-directory conventions differ, so match the neighbouring
pages rather than picking one.

## Conventions

- `<script setup lang="ts">`, props declared with explicit TypeScript types.
- Shared shapes go in `types/`; pure transformation/normalization helpers go in `utils/`;
  page/runtime state coordination goes in `composables/`. Keep components presentational.
- Prefer Element Plus (`el-space`, `el-link`, `el-avatar`, `el-text`, tables, tags) over raw
  HTML when one fits. All Element Plus icons are registered globally in `enhanceApp`.
- Use Unicode-safe string handling for multilingual names — `Array.from(value)[0]`, never
  `charAt(0)`.
- Log a `console.warn` / `console.error` naming the component and the missing key when a JSON
  lookup fails, matching the existing components — it is the only signal an author gets.

## Verifying

- `npm run docs:build` for anything touching this directory, config, or dependencies.
- `npm run docs:dev` plus real SPA navigation for anything that renders per-page data.
- Note that [config.ts](../config.ts) sets `ignoreDeadLinks: true` — **a green build does not
  mean the links work.** Check links by hand.
- The sidebar is generated from the folder structure by `vitepress-sidebar`, so renaming or
  moving content files changes navigation without any config edit.
