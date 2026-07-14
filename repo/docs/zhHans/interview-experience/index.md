---
title: 面试经验
createdDate: 2025-08-05
lastUpdated: 2026-07-09
layout: page
sidebar: false
---
<script setup>
// 以下数组按 generate_folder_overview 脚本的输出格式维护（title/description/href
// 来自各公司 index.md frontmatter；articleCount/lastUpdated/createdDate 为需要
// 脚本扩展输出的新字段）。当前数据基于 2026-07-11 的仓库内容生成。
const interviewItems = [
  { "title": "Amazon", "description": "SDE OA / VO / Onsite 面经", "href": "./amazon/index.md", "articleCount": 8, "lastUpdated": "2026-07-06", "createdDate": "2025-10-21" },
  { "title": "Google", "description": "L4 SWE 电面与 Onsite 面经", "href": "./google/index.md", "articleCount": 10, "lastUpdated": "2026-06-28", "createdDate": "2025-10-22" },
  { "title": "Airbnb", "description": "SWE 全流程面经与时间线", "href": "./airbnb/index.md", "articleCount": 2, "lastUpdated": "2026-06-24", "createdDate": "2025-11-25" },
  { "title": "Snowflake", "description": "SWE 技术电面经验", "href": "./snowflake/index.md", "articleCount": 3, "lastUpdated": "2026-06-21", "createdDate": "2025-10-22" },
  { "title": "Meta", "description": "SWE 电面 / NG / OA / Recruiter Call", "href": "./meta/index.md", "articleCount": 5, "lastUpdated": "2026-06-16", "createdDate": "2025-09-26" },
  { "title": "Netflix", "description": "HR Screening 与技术面", "href": "./netflix/index.md", "articleCount": 3, "lastUpdated": "2026-06-09", "createdDate": "2026-05-29" },
  { "title": "Oracle", "description": "健康组技术电面面经", "href": "./oracle/index.md", "articleCount": 1, "lastUpdated": "2026-06-09", "createdDate": "2026-06-09" },
  { "title": "Bloomberg", "description": "SDE Intern 与电面经验", "href": "./bloomberg/index.md", "articleCount": 3, "lastUpdated": "2026-06-06", "createdDate": "2025-11-21" },
  { "title": "Notion", "description": "Notion 面试经验分享", "href": "./notion/index.md", "articleCount": 1, "lastUpdated": "2026-06-05", "createdDate": "2026-06-05" },
  { "title": "Uber", "description": "Uber 面试经验分享", "href": "./uber/index.md", "articleCount": 10, "lastUpdated": "2026-06-03", "createdDate": "2025-11-21" },
  { "title": "Microsoft", "description": "Microsoft 面试经验分享", "href": "./microsoft/index.md", "articleCount": 1, "lastUpdated": "2026-05-28", "createdDate": "2026-05-28" },
  { "title": "Nvidia", "description": "Nvidia 面试经验分享", "href": "./nvidia/index.md", "articleCount": 2, "lastUpdated": "2026-05-27", "createdDate": "2025-10-22" },
  { "title": "ByteDance", "description": "SDE NG 多轮面经", "href": "./bytedance/index.md", "articleCount": 4, "lastUpdated": "2026-05-26", "createdDate": "2025-08-27" },
  { "title": "TikTok", "description": "SDE Intern 面经", "href": "./tiktok/index.md", "articleCount": 4, "lastUpdated": "2026-05-26", "createdDate": "2025-09-26" },
  { "title": "Apple", "description": "Apple 面试经验分享", "href": "./apple/index.md", "articleCount": 2, "lastUpdated": "2026-05-08", "createdDate": "2025-10-22" },
  { "title": "GEICO", "description": "GEICO 面试经验分享", "href": "./geico/index.md", "articleCount": 1, "lastUpdated": "2026-05-08", "createdDate": "2026-05-08" },
  { "title": "Open AI", "description": "Open AI 面试经验分享", "href": "./openai/index.md", "articleCount": 1, "lastUpdated": "2026-05-08", "createdDate": "2026-05-08" },
  { "title": "Walmart labs", "description": "Walmart labs 面试经验分享", "href": "./walmart/index.md", "articleCount": 1, "lastUpdated": "2026-05-08", "createdDate": "2026-05-08" },
  { "title": "Applied Intuition", "description": "Applied Intuition 面试经验分享", "href": "./applied-intuition/index.md", "articleCount": 1, "lastUpdated": "2026-02-20", "createdDate": "2026-02-20" },
  { "title": "DoorDash", "description": "电面与面试流程", "href": "./doordash/index.md", "articleCount": 2, "lastUpdated": "2025-12-31", "createdDate": "2025-10-20" },
  { "title": "Snap", "description": "Snap 面试经验分享", "href": "./snapchat/index.md", "articleCount": 1, "lastUpdated": "2025-11-21", "createdDate": "2025-11-21" },
  { "title": "Stubhub", "description": "Stubhub 面试经验分享", "href": "./stubhub/index.md", "articleCount": 2, "lastUpdated": "2025-11-21", "createdDate": "2025-11-21" },
  { "title": "Capital One", "description": "Capital One 面试经验分享", "href": "./capital-one/index.md", "articleCount": 1, "lastUpdated": "2025-10-22", "createdDate": "2025-10-22" },
  { "title": "Bethesda Game Studios", "description": "游戏工作室面试分享", "href": "./bethesda-game-studios/index.md", "articleCount": 1, "lastUpdated": "2025-10-22", "createdDate": "2025-10-22" },
  { "title": "被折叠", "description": "Palantir 等被折叠公司条目", "href": "./folded-entry/index.md", "articleCount": 1, "lastUpdated": "2025-10-22", "createdDate": "2025-10-22" },
  { "title": "Databricks", "description": "SWE Intern VO 面经", "href": "./databricks/index.md", "articleCount": 1, "lastUpdated": "2025-10-20", "createdDate": "2025-10-20" },
  { "title": "Whatnot", "description": "SDE Video Interview 面经", "href": "./whatnot/index.md", "articleCount": 1, "lastUpdated": "2025-10-16", "createdDate": "2025-10-16" },
  { "title": "ICBC", "description": "Model 岗位面经", "href": "./icbc/index.md", "articleCount": 1, "lastUpdated": "2025-10-03", "createdDate": "2025-10-03" },
  { "title": "Fortinet", "description": "Fortinet 面试经验分享", "href": "./fortinet/index.md", "articleCount": 1, "lastUpdated": "2025-09-18", "createdDate": "2025-09-18" },
  { "title": "Nomura", "description": "Risk Analyst 面经", "href": "./nomura/index.md", "articleCount": 1, "lastUpdated": "2025-09-15", "createdDate": "2025-09-15" },
  { "title": "SMBC", "description": "Model Validation 面经", "href": "./smbc/index.md", "articleCount": 1, "lastUpdated": "2025-09-15", "createdDate": "2025-09-15" },
  { "title": "Rednote", "description": "纽约岗位面经", "href": "./rednote/index.md", "articleCount": 1, "lastUpdated": "2025-08-05", "createdDate": "2025-08-05" }
]

const totalArticles = interviewItems.reduce((sum, i) => sum + i.articleCount, 0)
const latestUpdate = interviewItems.map(i => i.lastUpdated).sort().at(-1)
</script>

<div class="ie-page">
  <div class="ie-page__header">
    <div>
      <h1 class="ie-page__title">面试经验分享</h1>
      <p class="ie-page__stats">{{ interviewItems.length }} 家公司 · {{ totalArticles }} 篇面经 · 最近更新 {{ latestUpdate }}</p>
    </div>
    <div class="ie-page__actions">
      <a href="/guide/interview-experience-utils/contributing.md"><el-button>投稿手册</el-button></a>
      <a href="/guide/interview-experience-utils/contributing.md"><el-button type="primary">投稿面经</el-button></a>
    </div>
  </div>

  <InterviewExperienceList :items="interviewItems" />
</div>

<style scoped>
.ie-page {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 32px 96px;
}

.ie-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.ie-page__title {
  margin: 0;
  font-size: 30px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.ie-page__stats {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.ie-page__actions {
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: 6px;
}

.ie-page__actions a {
  text-decoration: none;
}
</style>
