Please review PR #$ARGUMENTS.

Start with `python3 scripts/pr_review_prep.py $ARGUMENTS`. It prints, in one call, the PR metadata, CI results, existing review comments (don't repeat them), the hard-constraint check, the 面经 structure and source checks, and the diff with new-file line numbers. Use it instead of `gh pr view` / `gh pr diff` / `gh pr checks`, and only open other files when the output isn't enough to judge something.

Provide feedback categorized as [BLOCKER] / [MAJOR] / [MINOR] / [NIT] with file and line references.

For a PR that adds 面经 under `docs/zhHans/interview-experience/`, check the source against the **来源用于导流或推广** rule in `docs/zhHans/guide/rules/promotion.md` (linked from 贡献原则 item 4 in `docs/zhHans/guide/interview-experience-utils/contributing.md`). A suspected ad or traffic-driving source is a [BLOCKER]: do not approve until a maintainer has decided.

- Judge the source only from what the script prints (site, author, domain, same-author pages, promo keywords) and the PR text. **Never fetch or open the source link** (一亩三分地 and 小红书 block automated fetches), and don't mention that the original post wasn't checked.
- Don't report a missing newline at end of file.
