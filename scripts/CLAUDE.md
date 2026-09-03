# CLAUDE.md — scripts

Python helper scripts. Most are invoked by GitHub Actions workflows; a few are local
utilities. Python 3.13 in CI, dependencies in [requirements.txt](../requirements.txt)
(PyYAML, requests, beautifulsoup4). Filenames are `snake_case`.

## Running them

Scripts import each other as `from scripts.utils.x import y`, i.e. **as a package rooted at the
repo root**. Run them from the repo root with the root on the path:

```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
python scripts/generate_folder_overview.py --all
```

CI does exactly this (`export PYTHONPATH="${PYTHONPATH}:${GITHUB_WORKSPACE}"`). Running a
script from inside `scripts/` will fail on the imports.

`scripts/utils/path_utils.py` exposes `get_project_root(root_depth=2)`, which walks up from
`scripts/utils/*.py`. **If you move a script to a different depth, pass the matching
`root_depth`** — the default only works for files two levels below the root.

## Local config

`scripts/utils/config.py` holds secrets (Discord webhook URLs, rsync host/user/SSH key path,
remote JSON directories) and is **gitignored**. `config-ex.py` is the committed template:
copy it to `config.py` and fill it in. Never commit `config.py`, and never add a real value to
`config-ex.py`. Only `pull_visa_solution_company_json.py` and `utils/rsync_downloader.py`
import it — keep new secret usage behind the same module.

## What each script is for

Called by workflows in [.github/workflows/](../.github/workflows/):

| Script | Workflow | Purpose |
|---|---|---|
| `generate_folder_overview.py` | `auto-generate-overview` (daily) | regenerates every `overview.md` |
| `git-actions/add_created_date_to_md.py` | `update-frontmatter` (each PR) | injects `createdDate` into newly added `.md` |
| `git-actions/add_last_updated_to_md.py` | `update-frontmatter` (each PR) | injects `lastUpdated` into changed `.md` |
| `pull_visa_solution_company_json.py` | `pull-visa-solution-company-json` | rsyncs visa-solution-company JSON from the remote server |
| `parse_pr_payload.py` | `sync-json-data-source` | turns a merged-PR payload into a record JSON |
| `send_discord_push_notification.py` | `markdown_publish` | posts a push-event embed to Discord |

Local / manual:

- `sync_git_created_date.py`, `sync_git_last_updated.py` — backfill frontmatter dates across
  all of `docs/` from git history (rename-aware). The `git-actions/` pair is the incremental
  per-PR version; these are the full sweep.
- `convert_html_to_markdown.py` — one-off HTML → Markdown conversion via BeautifulSoup.
- `notify_direct_hire_company_subscribers.py` — reads subscriber email + filename out of
  Markdown frontmatter.

`sync-json-data-source.yml` also calls `scripts/domains/job-compass/add_job_compass_pr_record.py`.
That path is **on the remote server**, not in this repo — don't go looking for it here.

## Shared utilities

Reuse these rather than reimplementing:

- `utils/path_utils.py` — `get_project_root()`
- `utils/logging_utils.py` — logger setup
- `utils/json_utils.py` — JSON read/write helpers
- `utils/rsync_downloader.py` — remote folder sync

## generate_folder_overview.py

The most consequential script here: it **overwrites `overview.md` files in place**, and its
output carries a header saying the file must not be edited by hand.

- Scans `docs/zhHans` and `docs/en` (`DOC_ROOTS`), reading each page's frontmatter
  `title` / `description` to build the entry list.
- `--all` regenerates only directories that **already have** an `overview.md`. To add a new
  one, either create the file first or pass the directory explicitly:
  `python scripts/generate_folder_overview.py docs/zhHans/career-guide`
- `--dry-run` prints targets and data without writing. Use it first.
- `--all` cannot be combined with explicit directory arguments.
- Wrapper text is locale-specific via the `OVERVIEW_TEXT` map — add both `zhHans` and `en`
  entries when touching it.

## Conventions

- Docstring at the top of the module in Chinese, matching the existing files.
- Scripts that mutate `docs/` must be idempotent — CI reruns them on every PR or nightly.
- Never write into `docs/_*`; those are synced by CI from elsewhere.
- `scripts/utils/__pycache__/` is build output, leave it alone.
