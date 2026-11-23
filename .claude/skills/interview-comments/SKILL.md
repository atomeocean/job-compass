---
name: interview-comments
description: Add a source post's comment thread to an existing 面经 page — writes every comment, verbatim and without usernames, into the `comments` field of its JSON under docs/assets/json/interview-experience/, and carries reader-relevant facts from the comments into the Markdown. Use when the user wants the comments / 评论 / 楼主回复 / 后续 of a 面经 added or updated, or when web-source-to-interview or organize-interview-exp offers it at the end.
---
# Add a source post's comments to a 面经 page

Input: one existing page pair, plus the comments.

```
docs/zhHans/interview-experience/<company>/<slug>.md
docs/assets/json/interview-experience/<company>/<slug>.json
```

The JSON shape and the page rendering are documented in the **`comments`** section of
[docs/zhHans/interview-experience/CLAUDE.md](../../../docs/zhHans/interview-experience/CLAUDE.md);
read it first. The schema is `CommentSchema` in
[interviewSchema.ts](../../../docs/.vitepress/theme/types/interviewSchema.ts).

## Hard gates — stop and ask

- **Page not identifiable** (no path, slug or link that matches one pair) → ask.
- **No comments to work from**: when called from another skill, take the comments that skill
  already has: web-source-to-interview's fetch, or what the user pasted for
  organize-interview-exp. From organize-interview-exp with nothing pasted, ask for them; that
  skill never fetches the link. Otherwise use what the user pasted; when nothing was pasted,
  fetch the JSON's `source.link` once. If that fetch is blocked or
  doesn't show the comment thread, ask the user to paste the comments and end the turn. Never
  reconstruct a comment from memory or from a summary.
- **Comments already in the JSON** → don't drop them. Merge: keep existing floors, append new
  ones after the last `id`, and fill a `content: null` floor when the source now shows its
  text. Report what changed.

## Writing `comments`

Every comment under the post, in source order — questions, the author's replies, off-topic
remarks and 求大米 alike. It is a record, not a selection.

```json
"comments": [
  { "id": 1, "role": "user", "date": "2026-11-13 08:02", "content": "<comment text, verbatim>" },
  { "id": 2, "role": "author", "date": "2026-11-13 08:03", "replyTo": 1, "content": null }
]
```

- `id`: 1, 2, 3… in source order.
- `role`: `author` for the original poster, `user` for anyone else.
- **Never write a username**, in any field. Drop a leading `@name` or 「回复 xxx：」 from the
  text; `replyTo` carries that.
- `replyTo`: the `id` of the earlier comment it answers, when the source shows one.
- `content`: the comment's own words, character for character, without the quote of what it
  replies to. Platform-injected text (「本帖最后由 … 编辑」, hidden-content notices) may be
  removed; list each removal in the report. When only the quote was captured, write `null`
  and keep the floor.
- `date`: `YYYY-MM-DD HH:mm`, or coarser, as the source shows it; `null` when it shows none.
- An English comment is translated literally, the same way organize-interview-exp translates
  a post body.

## Carrying facts into the Markdown

The comments section sits below the article, so a fact a reader needs while reading — location,
team, round format, the final result — also goes into the article:

- No JSON field for it (location, team, platform) → a bullet at the top of `## 面试详情`, e.g.
  `- **地点 / 团队**：温哥华，为 Agent Factory 提供支持的一个组（评论区补充）`.
- A JSON field exists (`interview.result`, `timeline`, …) and the JSON still says
  `unknown` / `""` / `[]` there → propose the value in the report; don't overwrite a value the
  post itself set.
- When the page was built by organize-interview-exp, wording copied into the Markdown must stay
  verbatim; append the comments to that run's `source.txt` so `check_verbatim.py` still passes.

## Steps

1. Read the JSON and the Markdown.
2. Write or merge `comments` (above). Keep the JSON's existing formatting style.
3. Add the Markdown lines, if any (above).
4. `npm run validate:interview -- <json path>` prints `✅`. It rejects a duplicate `id` and a
   `replyTo` that points forward or at nothing.
5. **Report**: the number of comments written (new vs. kept), the floors with `content: null`,
   whether the thread had more comment pages than were read, removed platform text, Markdown
   lines added, and JSON values proposed. Leave the changes uncommitted.
