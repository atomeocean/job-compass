---
description: Show where this branch's work stands, or update the branch's progress note
argument-hint: "[save] [-n <sessions>]"
---

Report — or update — the current state of work on this branch. Progress facts come from the
committed helper script, **not** from your own memory of the conversation and not from a fresh
scan of the repo.

The script is [scripts/claude_hooks/session_progress.py](../../scripts/claude_hooks/session_progress.py):
self-contained standard library (no venv), and the same script the `SessionStart` hook runs, so its
output is what a new session already sees.

## Run this first, always

```bash
python3 scripts/claude_hooks/session_progress.py show
```

It prints three sections: the hand-written progress note for this branch, the git picture (commits
ahead of `main`, uncommitted files), and the last few sessions with their opening prompt.

## Then, depending on `$ARGUMENTS`

**No arguments — read-only speed-read.** Summarize the script's output in Chinese, in this shape,
and stop:

- **在做什么** — one line, from the note's 目标/进行中 plus the branch name.
- **已落地** — commits ahead of `main` (subject lines, not hashes) and what the uncommitted files
  add up to; say "工作区干净" when it is.
- **下一步** — the note's 下一步, or, when there is no note, what the uncommitted diff implies is
  half-finished.
- **待确认** — only if the note lists open questions or you can see a real one.

Skip a bullet rather than padding it. If there's an open PR for the branch, add its number and
title (`gh pr status` — one call, skip silently if it fails).

**`save` — update the note.** Create it if missing:

```bash
python3 scripts/claude_hooks/session_progress.py init
```

Then rewrite the file (path from `… path`) so it reflects reality now. Rules:

- Keep the five headings (`## 目标` / `## 已完成` / `## 进行中` / `## 下一步` / `## 已知坑 / 待确认`).
- The note holds only what **git cannot**: decisions and their reasons, open questions, traps you
  hit, why an approach was abandoned. Never restate the commit log or the file list — the digest
  already derives those.
- Rewrite rather than append; move finished items from 进行中 to 已完成 as one-liners and drop stale
  ones. Keep the whole file under ~40 lines so it stays injectable.
- Absolute dates (`2026-09-03`), never 「今天」/「上次」.
- Facts only. If a claim isn't in the conversation, the diff, or the git log, leave it out.

Then tell the user in one line what you changed in the note.

Anything else in `$ARGUMENTS` (e.g. `-n 8`, `-n 0`) is a script flag — pass it through to `show`.

## Notes

- The note lives at `.claude/state/progress/<branch-slug>.md`, one per branch, and is gitignored —
  local scratch, never part of a PR.
- Long-lived facts worth surviving the branch belong in the memory directory, not here.
