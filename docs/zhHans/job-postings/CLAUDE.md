---
createdDate: 2026-09-02
lastUpdated: 2026-09-02
---
# CLAUDE.md — job-postings

Job posting pages. Each posting is a **thin Markdown page + a sibling JSON file**; all
rendering is done by `<JobPostingTable />`.

## Layout

```
job-postings/
  index.md                     hand-written landing page
  overview.md                  GENERATED — never edit by hand
  <company>/
    index.md                   hand-written company landing page
    <role>-<YYYYMMDD>.md       one posting
    data/
      <role>-<YYYYMMDD>.json   that posting's data, same basename as the .md
```

Company directories are exactly **one level deep**. `JobPostingTable` resolves JSON via
`import.meta.glob("/zhHans/job-postings/*/data/*.json")`, so a nested
`<company>/<team>/data/*.json` silently fails to load. A company directory with only an
`index.md` and no postings yet is fine (see `reddit/`).

## Page shape

A posting page is frontmatter + H1 + the component, nothing else:

```markdown
---
title: software development engineer 20250313
expired: true
createdDate: 2025-03-17
lastUpdated: 2025-09-03
---

# Amazon 招聘信息

<JobPostingTable job-posting-json-path="amazon/data/software-development-engineer-20250313.json" />
```

- `job-posting-json-path` is relative to `docs/zhHans/job-postings/`, i.e. it always starts
  with the company folder. The `.json` suffix is optional (the component appends it), but
  every existing page writes it out — keep doing that.
- Keep the `.md` and `.json` basenames identical. The component does not derive one from the
  other, but every tool and reviewer in this repo assumes the pairing.
- `title` is the humanized file name, not the full job title. The real job title lives in the
  JSON's `jobTitle`.

## Naming

`<role-in-kebab-case>-<YYYYMMDD>.md`, where the date is when the posting was collected, not
the posting's own deadline. Two postings collected the same day for the same role get a
`-1` / `-2` suffix (`business-analyst-20250610-1.md`).

## Expired postings

Do not delete an expired posting. Mark it:

- `expired: true` in the Markdown frontmatter
- `"notes": "职位信息已过期"` in the JSON

## JSON schema

Typed by [jobPostingTypes.ts](../../.vitepress/theme/types/jobPostingTypes.ts). Every field is
optional; prefer empty arrays over omitting keys, matching neighbours.

```json
{
  "companyName": "Amazon",
  "jobTitle": "Business Analyst - Finance Operations",
  "jobLocation": ["USA, VA, Arlington"],
  "jobType": "全职",
  "jobResponsibilities": ["..."],
  "candidateQualifications": {
    "basicQualifications": ["..."],
    "preferredQualifications": ["..."]
  },
  "salary": [],
  "benefits": [],
  "jobLink": "https://...",
  "notes": ""
}
```

- `jobLocation` entries follow `USA, <2-letter state>, <City>`.
- `jobType` is Chinese (`全职`, `实习`, `合同工`).
- Responsibilities and qualifications are translated into Chinese; `jobTitle` and `jobLink`
  stay in the original English.

## Generated files — do not hand-edit

- `overview.md` (here and in every `<company>/`) is produced by
  [generate_folder_overview.py](../../../scripts/generate_folder_overview.py) and refreshed
  daily by the `auto-generate-overview` workflow. Its own header says so. To change what it
  shows, edit the source pages' frontmatter `title` / `description` instead.
- `createdDate` and `lastUpdated` are injected on every PR by the `update-frontmatter`
  workflow. Do not hand-maintain them on new files.
