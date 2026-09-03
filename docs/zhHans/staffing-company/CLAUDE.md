---
createdDate: 2026-09-02
lastUpdated: 2026-09-02
---
# CLAUDE.md — staffing-company

外包公司 / ICC pages. Unlike `direct-hire-company/`, this directory is **flat** and all JSON
sits in one shared `data/` folder.

## Layout

```
staffing-company/
  index.md          hand-written section landing page
  overview.md       GENERATED — never edit by hand
  <company>.md      one company page
  <topic>.md        a topic article with no company JSON
  data/
    <company>.json
```

No subdirectories. `StaffingCompanyTable` resolves JSON via
`import.meta.glob('/zhHans/staffing-company/data/*.json')`, which is a single flat level.

## Two kinds of page

**Company pages** (14 today) pair with `data/<company>.json` and follow a fixed section order:

```markdown
---
title: BeaconFire
description: 新泽西ICC
createdDate: 2025-01-30
lastUpdated: 2026-08-27
outline: deep
---
# BeaconFire Inc.

## 公司信息

<StaffingCompanyTable companyJsonFileName="beaconfire"/>

## 招聘信息

## 航海日志

### 2026年8月

...
```

- `companyJsonFileName` is written **without** the `.json` extension. (The component appends
  it, but the neighbouring `<DirectHireCompanyTable />` is conventionally written *with* the
  extension — the two directories differ; follow the local one.)
- `outline: deep` is standard here because 航海日志 grows long.
- Some pages prefix headings with emoji (`## 📌 公司信息`, `## 🚢 航海日志`). Both styles exist;
  match whatever the page you are editing already uses.

**Topic articles** (`self-payroll.md`, `icc-iq-tax.md`, `fake-job-scam-sms-collection.md`,
`icc-unable-to-support-payroll.md`, `silicon-inc.md`, `hongshu-*.md`) have no JSON and no
table — they are plain Markdown. Do not create an empty `data/*.json` for them.

## 航海日志

The user-report log, and the reason this directory exists. Convention:

- `###` subsections titled `YYYY年M月`, **newest first**.
- Thematic subsections (`### 贷款篇`) may sit at the top, before the dated ones.
- Reports are first-hand accounts. Keep the contributor's wording and specifics (dollar
  amounts, contract terms, timelines) rather than paraphrasing into generalities.
- These pages carry accusations against named companies. Only add claims traceable to a
  contributed source, and cite external sources with `<ReferenceSource />`.

## JSON schema

Typed by [staffingCompanyTypes.ts](../../.vitepress/theme/types/staffingCompanyTypes.ts). Top
level: `companyInfo`, `staffingAgencyPosition`, `recruiterInformation[]`, `training`,
`marketing`, `metadata`.

```json
{
  "companyInfo": {
    "companyName": "BeaconFire Inc.",
    "foundedYear": "2022 年",
    "contact": { "phone": "", "email": "", "website": "" },
    "location": { "addressLine1": "", "addressLine2": "", "county": "",
                  "cityOrTown": "East Windsor", "state": "NJ", "zipCode": "08520" },
    "industry": ["IT", "金融"]
  },
  "staffingAgencyPosition": {
    "jobType": "合同工",
    "usIdentitySupport": "支持 OPT / Opt Ext / H1B / CPT",
    "payStubSupport": "不支持",
    "recruitmentProcess": "简历筛选 → 初步面试 → 员工培训 → 客户面试 → 外包员工上岸新公司"
  },
  "recruiterInformation": [
    { "name": "Evita", "email": "", "wechat": "BeaconFire_Evita", "linkedin": "", "xiaohongshu": "" }
  ],
  "training":  { "content": "", "duration": "", "cost": "", "remoteAllowed": "",
                 "location": { }, "penaltyForTermination": "最多$15,000" },
  "marketing": { "duration": "6个月", "preparation": "", "cost": "", "remoteAllowed": "否",
                 "location": { }, "penaltyForTermination": "每个月3000美元，封顶15000美元" },
  "metadata": { "lastUpdated": "2025-03-27" }
}
```

- `training` and `marketing` are the two phases of the ICC model; `penaltyForTermination`
  (违约金) on each is the field readers care about most — fill it whenever a source states it.
- `location.state` is the two-letter abbreviation; keep every key present with `""` when
  unknown, including the nested empty `location` objects.
- `metadata.lastUpdated` is hand-maintained, unlike the frontmatter `lastUpdated` that CI
  injects.
- Recruiter contact fields are published publicly. Only include what the recruiter themselves
  posted for recruiting purposes.

`StaffingCompanyInformation` and `StaffingCompanyRecruiterTable` are registered globally in the
theme but are not used by any page here — `StaffingCompanyTable` renders everything. Don't
reach for them for new pages.

## Generated files — do not hand-edit

- `overview.md` comes from
  [generate_folder_overview.py](../../../scripts/generate_folder_overview.py) (daily
  `auto-generate-overview` workflow). Edit source frontmatter `title` / `description` instead.
- `createdDate` / `lastUpdated` are injected by the `update-frontmatter` workflow on each PR.

Note: `docs/en/` has no `staffing-company/` mirror. This section is Chinese-only for now.
