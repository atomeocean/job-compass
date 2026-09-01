---
createdDate: 2026-09-01
lastUpdated: 2026-09-01
---
# PR #890 Review — Oracle SDE Intern 面经

- **PR**: [#890](https://github.com/atomeocean/job-compass/pull/890) — Oracle SDE Intern 面经
- **Author**: ALEXPANLI
- **Branch**: `ALEXPANLI-patch-1` → `main`
- **变更规模**: +95 / -0，2 个新增文件，无既有内容改动
- **Review 日期**: 2026-09-01

新增文件：

| 文件 | 行数 |
|---|---|
| `docs/assets/json/interview-experience/oracle/qe34tu.json` | +27 |
| `docs/zhHans/interview-experience/oracle/qe34tu.md` | +68 |

## 总体评价

内容质量不错，结构基本对齐同目录的 `oracle/ax1e2a.md`：frontmatter 字段完整，`<InterviewDetail />` 与 `<ReferenceSource>` 用法正确，两个文件末尾均有换行，JSON 可正常解析。

`rate: 2` 与正文的 "Easy / Medium" 描述是一致的 —— 本仓库的 `rate` 语义是**难度**而非体验分（对照 `ax1e2a.json` 的 `rate: 4` 搭配正文 "整体难度偏高"），这里无需改动。

**结论：修复下面的 `result` 取值后可以合并。** 其余均为可选的一致性打磨，`rounds` 那条属于背景说明而非修改要求。

---

## [MAJOR]

### 1. `docs/assets/json/interview-experience/oracle/qe34tu.json:20` — `"result": "accepted"` 会渲染成灰色徽标而不是绿色

`InterviewDetail.vue:33-44` 把 result 字符串映射为 Element Plus 的 tag type：

```js
case 'pass':
case 'offer':   return 'success'
case 'reject':
case 'fail':    return 'danger'
case 'pending':
case 'waiting': return 'warning'
default:        return 'info'   // ← "accepted" 落在这里
```

结果是：页面顶部的状态徽标会显示灰色的 `ACCEPTED`，视觉上和 "结果未知" 的条目无法区分 —— 而这其实是一场通过并接受了 offer 的面试。

全仓库范围内被正确识别的取值占绝对多数（`rejected` ×20、`pass` ×13、`offer` ×5），`accepted` 只出现 3 次，且这 3 次同样都是坏的。

**建议**：改成 `"offer"`（或 `"pass"`），即可正常渲染为绿色。

> 附带说明（不阻塞本 PR）：出现次数最多的 `"rejected"` 同样没有命中 `reject` / `fail` 分支，也会掉进灰色 `info`。这是组件的既有 bug，值得单开一个 issue 修 `resultTagType` 的映射表。

---

## [MINOR]

### 2. `qe34tu.json:21-25` — `rounds` 数组目前没有任何组件读取，不会显示出来

`InterviewDetail.vue:64,73` 读的是扁平字段 `info.interview.roundType` 和 `info.interview.rate`；对 `docs/.vitepress/theme/` 做 grep 确认，没有任何地方引用 `rounds`。

实际效果：

- "Round Type" 那一行描述项渲染为空
- `<el-rate v-model="info.interview.rate">` 绑定到 `undefined`

这是**既有问题**：70 个面经 JSON 里有 65 个用的是 `rounds`，本 PR 遵循的是主流写法，因此**不要求作者改动**。

在这里记录，只是为了避免误以为这三轮面试的明细已经呈现在页面上。组件与数据结构的这处偏离值得单独开 issue 处理。

### 3. `docs/zhHans/interview-experience/oracle/qe34tu.md:17,19` — 两个自造的「基本信息」字段

```markdown
17: - **候选人身份**：匿名
19: - **面试体验**：Positive
```

这两个字段在整个 `interview-experience/` 目录下各只出现 1 次，也就是只在本文件里出现。而且「匿名」是本站每一条面经的默认状态，这一行不携带任何信息量。

`**整体难度**`（第 20 行）是有先例的（其他文件用过 Average / Hard），保留即可。

**建议**：删除第 17 行和第 19 行。

---

## [NIT]

### 4. `qe34tu.md:18` — `**面试结果**：Accepted Offer` 是孤例

既有约定是 `Pass`（×6）和 `Fail`（×5）。建议改成 `Pass`，与列表页 / 侧边栏的表述保持一致。

### 5. `qe34tu.md:64` / `qe34tu.json:19` — 面试日期和原文发布日期复用了同一个值

两处都填了 `2026-08-30`。`ReferenceSource.vue:36` 把这个字段标注为「发布时间」，而 Glassdoor 的评论发布日期与面试日期是分开记录的两个字段。建议确认二者确实是同一天，而不是直接复用。

### 6. `qe34tu.md:63` — `author: 'Anonymous employee'`

这是本仓库第一条来自 Glassdoor 的引用来源（此前的来源都是一亩三分地 / 小红书，作者字段用的是站内原始 ID，例如 `匿名用户-N0VZT`）。当前写法没问题，只是需要意识到它会成为后续 Glassdoor 来源的署名先例。

### 7. PR 描述本身

- 「相关 Issue」小节里残留了一段断裂的 markdown 链接碎片：`](https://github.com/atomeocean/job-compass/blob/...qe34tu.md?plain=1)`
- 「变更类型」里的 `文档更新` 复选框未勾选

---

## 已核查但无问题的项

- `createdDate: 2026-08-30` / `lastUpdated: 2026-09-01` —— 由 CI 的 `scripts/sync_git_created_date.py` 与 `sync_git_last_updated.py` 依据 git 历史自动同步，分支上最后一个 commit 正是 `chore: update createdDate and lastUpdated in md files`，取值正确。
- 无需更新 `oracle/index.md` —— 该页不手工罗列文章，侧边栏由 auto-sidebar 生成，目录概览由 `scripts/generate_folder_overview.py` 写入 `docs/_data/`（该目录按 CLAUDE.md 约定不可手改）。
- 无需补 `docs/en/` 镜像 —— 目前只有 `amazon` 一家有英文镜像，不是通行要求。
- `jobType: "internship"` —— 仓库中已有先例。
- 两个文件末尾都有换行；JSON 通过 `json.load()` 解析验证。