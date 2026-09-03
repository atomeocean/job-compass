---
createdDate: 2026-09-02
lastUpdated: 2026-09-02
---
# CLAUDE.md — direct-hire-company

直接雇佣公司 (companies that hire employees directly, no staffing agency in between). Pages
are organized **by US location**, and each company page is a thin wrapper around
`<DirectHireCompanyTable />`.

## Layout

Three levels, all kebab-case, and every level needs an `index.md`:

```
direct-hire-company/
  index.md            hand-written section landing page
  general.md          hand-written explainer (what 直接雇佣 / 上岸 means, how to contribute)
  overview.md         GENERATED — never edit by hand
  <state>/            full state name, e.g. north-carolina, district-of-columbia
    index.md
    <city>/
      index.md
      <company>.md
      data/
        <company>.json
```

The JSON lives in a `data/` folder **next to the company page, inside the city folder** — not
at the state level and not in `docs/assets/`. `DirectHireCompanyTable` builds the path as
`/zhHans/direct-hire-company/<state>/<city>/data/<file>.json`, resolved through
`import.meta.glob("/zhHans/direct-hire-company/**/*.json")`.

When adding a city, create `<city>/index.md` and `<city>/data/` at the same time.

## Page shape

```markdown
---
title: IQVIA
createdDate: 2025-05-27
lastUpdated: 2025-09-03
---

# IQVIA

## 公司信息

<DirectHireCompanyTable state="north-carolina" city="durham" companyJsonFileName="iqvia.json" />
```

- `state` and `city` must repeat the folder names exactly — the component concatenates them
  into the path and does not infer them from the route.
- `companyJsonFileName` is written **with** the `.json` extension here. (The component appends
  it if missing, but note the sibling `<StaffingCompanyTable />` is conventionally written
  **without** it — the two directories differ on purpose. Follow the local convention.)
- Anything beyond the table — culture notes, interview links, 航海日志 — goes after the
  `## 公司信息` section as normal Markdown.

## JSON schema

Typed by
[directHireCompanyTypes.ts](../../.vitepress/theme/types/directHireCompanyTypes.ts). All fields
optional; write `""` / `[]` for unknowns rather than omitting keys.

```json
{
  "companyInfo": {
    "companyName": "IQVIA",
    "location": {
      "addressLine1": "2400 Ellis Road",
      "addressLine2": "",
      "county": "Durham County",
      "cityOrTown": "Durham",
      "state": "NC",
      "zipCode": "27703"
    },
    "contact": { "phone": "", "email": "", "website": "", "linkedin": "" },
    "industry": ["临床数据", "医疗科技"],
    "foundedYear": "1982",
    "description": "...",
    "mainProductsOrServices": ["..."],
    "companySize": "约 87,000 名员工"
  },
  "metadata": { "lastUpdated": "2025-05-09" }
}
```

- `location.state` is the **two-letter abbreviation** (`NC`), even though the folder uses the
  full name (`north-carolina`).
- `location.cityOrTown` is the display-cased city (`Durham`) vs the folder's `durham`.
- `industry`, `description`, `mainProductsOrServices` are in Chinese; `companyName`, addresses,
  and URLs stay in English.
- `metadata.lastUpdated` is maintained by hand and is separate from the Markdown frontmatter's
  `lastUpdated`, which CI injects.
- Addresses are rendered through `formatAddress` in
  [util.ts](../../.vitepress/theme/utils/util.ts) — don't pre-format them in the JSON.

## Generated files — do not hand-edit

- `overview.md` comes from
  [generate_folder_overview.py](../../../scripts/generate_folder_overview.py), refreshed daily
  by the `auto-generate-overview` workflow. Change the source pages' frontmatter
  `title` / `description` instead.
- `createdDate` / `lastUpdated` in Markdown frontmatter are injected by the
  `update-frontmatter` workflow on every PR.

The contributor-facing version of these rules lives at
[/guide/direct-hire-company-utils/company-info-guide](../guide/direct-hire-company-utils/company-info-guide.md);
keep the two in sync when the format changes.
