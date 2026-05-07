---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Job Compass"
  text: "北美求职指南"
  tagline: 真实面经驱动的北美求职社区，由志愿者匿名共享与维护
  image:
    # TODO: 用一个 200–400px 的方形 logo 替换 favicon（favicon 渲染在 hero 区会模糊）
    src: /favicon.ico
    alt: Job Compass
  actions:
    - theme: brand
      text: 浏览面经
      link: /interview-experience/
    - theme: alt
      text: 分享我的面经
      link: /guide/interview-experience-utils/contributing
    - theme: alt
      text: 什么是 Job Compass
      link: /guide/overview
    - theme: alt
      text: GitHub
      link: https://github.com/atomeocean/job-compass

features:
  - icon: 💼
    title: 招聘信息
    details: 来自各大公司官网与招聘网站的最新职位，覆盖 SDE、数据、金融等岗位
    link: /job-postings/overview
    linkText: 查看招聘信息
  - icon: 🤝
    title: 内推
    details: 公司内部推荐渠道汇总，提升简历进面率
    link: /referral/overview
    linkText: 查看内推信息
  - icon: 🏝️
    title: 直接入职公司（上岸）
    details: 一步到位入职目标公司，无需经过中介
    link: /direct-hire-company/general
    linkText: 查看直招公司
  - icon: 🚢
    title: 外包中介公司（上船）
    details: 通过中介过渡，再寻找下家直接入职。Bon Voyage！
    link: /staffing-company/overview
    linkText: 查看中介公司
  - icon: 🎯
    title: 面试准备
    details: 从 Recruiter Call 到 Onsite，完整的面试前准备清单
    link: /interview-prepare/recruiter-call-step
    linkText: 开始准备面试
  - icon: 📝
    title: 面试经验
    details: 各公司真实面经，覆盖流程、题型与考察重点；欢迎匿名贡献
    link: /interview-experience/
    linkText: 查看面经
  - icon: 📚
    title: 职场建议
    details: 北美职场文化、汇报关系与生存指南
    link: /career-guide/manager-is-god
    linkText: 熟悉北美职场
  - icon: 🕵️
    title: 在美身份
    details: 识别合法的身份解决方案，远离 OPT / H1B 挂靠诈骗
    link: /visa-solution-company/hongshu-27410952937
    linkText: 身份解决公司列表
createdDate: 2024-11-18
lastUpdated: 2026-05-07
---
<script setup>
import CommunityStatistic from '@ao-components/siteStatistic/CommunityStatistic.vue'
</script>

## Job Compass：一个开放的求职者社区

Job Compass 是一个开源求职社区，核心是社区成员匿名分享的真实面经，并配套招聘信息、内推渠道、签证身份解决方案等求职资源。所有内容由志愿者共同维护，免费、透明、开放。

<CommunityStatistic :job-postings="234" :direct-hire-companies="99" :staffing-companies="13" />

无论你是求职者、招聘方，还是希望贡献信息的志愿者，我们都欢迎你的加入！一起构建一个自由共享、互帮互助的求职平台。

## 面经专区

Job Compass 的核心是社区成员匿名分享的真实面经。无论你是想看别人的面试经历，还是想分享自己的，都可以从这里开始。

### 📖 我想阅读面经

- [浏览全部面经（按公司分类）](/interview-experience/)
- [求职术语速查](/guide/interview-experience-utils/essential-terms)

### ✍️ 我想分享面经

- [面经贡献指南](/guide/interview-experience-utils/contributing) — 流程、隐私原则、文件命名
- [面经必填字段 / Frontmatter 模版](/guide/interview-experience-utils/requirement)
- [Markdown 速查](/guide/markdown-cheatsheet) ・ [GitHub 入门](/guide/github-setup-guide)

## 常见问题

- **完全免费吗？** 是。所有内容开源、免费访问，无需注册。
- **信息从哪来？** 来自社区志愿者整理的公开招聘信息和亲历的面试经验。
- **怎么贡献？** 直接在 [GitHub](https://github.com/atomeocean/job-compass) 提 PR，或参考 [任务指南](/guide/task-guide)。

## 热门公司

- 亚马逊 [Amazon](/direct-hire-company/washington/seattle/amazon)
- 沃尔玛 [Walmart](/direct-hire-company/california/sunnyvale/walmart)
<!-- TODO: 补充至 6–8 家热门公司，否则只有两条会显得栏目未完成 -->

<SiteViewStatistic />
