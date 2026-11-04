# CLAUDE.md — community rules (`guide/rules/`)

One rule per page. A page's path is the rule's permanent link: maintainers paste it into the
comment that closes a violating PR, so once published the path stays fixed.

## Rule pages

- **New rule**: a kebab-case file with `title`, `description`, `outline: deep` and `order`
  (no dates; the `update-frontmatter` workflow injects them). Add a row to the 规则列表 table in
  [index.md](index.md) and a 修订记录 entry.
- **Changed rule**: edit the page in place, so the body always states the current rule, and add
  a 修订记录 entry: date, what changed, and why, citing the real case that prompted it.
- **Abolished rule**: keep the file so old links still resolve, and replace its body with the
  date and the reason. Remove its row from 规则列表, add a 修订记录 entry, and repoint links to it
  (`grep -rn 'guide/rules/<name>' docs .claude .github`).
- Rules use exactly two levels, **禁止** and **不鼓励**, as defined in index.md 用词约定.
- `no-ai-content.md` has no written boundary: an admin judges each case, so its 典型案例 are the
  precedent later judgements follow. `comments.md` has no cases, because removed comments are not
  kept.

## 典型案例

What a case may say, the five-per-page cap and the appeal route are public policy in index.md
§典型案例; follow it. The mechanics:

- One `::: details` block per case, titled `✗ <一句话>` or `✓ <一句话>`, with **判定** (month and
  outcome), **原因** and **处理**. See [promotion.md](promotion.md).
- Links run one way, from the closing PR comment to the rule page. A case links to the folded
  page on this site or to its archive copy in the recycle repo, and describes the content, never
  a GitHub or source account; it never links the PR. ✓ cases link to the live page.
- Adding or replacing a case is not a rule change and gets no 修订记录 entry.

## Archiving a case

Archive only content a rule page cites as a case, in the public repo `atomeocean/code-recycle-bin`:

- Path `docs/zhHans/job-compass/rules/<rule-file-name>/<YYYY-MM-DD>-<slug>.md`, the folder named
  after the rule's file here. It is as permanent as the rule's path.
- A maintainer commits it, so the git author is the maintainer.
- Strip `authors` frontmatter, names and account handles, contact details, QR codes, and the URLs
  of promoted sites (keep the surrounding text).
- Keep the copy out of search engines with this frontmatter:

  ```yaml
  head:
    - - meta
      - name: robots
        content: noindex
  ```

- Link it from the rule page by its GitHub file URL,
  `https://github.com/atomeocean/code-recycle-bin/blob/main/docs/zhHans/job-compass/rules/...`.

## Closing a violating PR

Reply with the rule page, the part that breaks it and the appeal route, then close. The reply is
read on GitHub, so the link is absolute:

```text
感谢投稿。这个 PR 违反了社区规则中的「<规则名>」：https://jobcompass.atomeocean.com/guide/rules/<文件名>.html

具体问题：<哪部分内容、为什么违规>

如果你认为判定有误，直接在这个 PR 里回复说明，管理员会复核。
```
