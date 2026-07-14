# 应用方式 — 面试经验 index（方案 2a）

将 `repo/docs/` 下的 4 个文件按相同路径复制进仓库：

1. `docs/.vitepress/theme/components/InterviewExperienceList.vue` — 新组件
2. `docs/.vitepress/theme/types/interviewExperienceListTypes.ts` — 数据类型
3. `docs/.vitepress/theme/index.ts` — 已加两行（import + `app.component("InterviewExperienceList", …)`），
   其余内容与现仓库版本一致；若 index.ts 有其他改动，只需手动加这两行
4. `docs/zhHans/interview-experience/index.md` — 新首页（layout: page + sidebar: false）

## 说明

- 数据数组内嵌在 index.md 的 `<script setup>` 中，格式沿用 overview.md 的模式，
  基于 2026-07-11 仓库内容人工生成（32 家公司 / 78 篇，日期与篇数均为真实统计）。
- 后续建议扩展 `scripts/generate_folder_overview.py`，为每个条目输出
  `articleCount`（目录内面经篇数）、`lastUpdated`（最近一篇的 lastUpdated）、
  `createdDate`（最早一篇的 createdDate），即可脚本化维护该数组。
- `description` 目前大部分公司 index.md 未填写；在各公司 `index.md` frontmatter
  补上 `description` 后，脚本即可输出真实简介（表中兜底文案为“X 面试经验分享”）。
- NEW 标签逻辑：`lastUpdated` 距今 ≤ 30 天（组件 prop `freshWindowDays` 可调）。
- `docs/en/interview-experience/index.md` 未改动；如需英文版可按同样结构翻译。
