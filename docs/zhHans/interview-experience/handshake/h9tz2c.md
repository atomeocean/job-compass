---
title: Handshake Onsite 面试经验
description: Handshake Software Engineer Onsite 面试经验
outline: deep
createdDate: 2026-11-18
lastUpdated: 2026-11-18
---
# Handshake Software Engineer Onsite 面试经验

<InterviewDetail />

## 面试详情

- **Coding 平台**：CodeSignal

分享一个小众公司的最新 data point。这个公司在业界的时间还挺长的，最近做 data 跟 agent 的企业部署，估值又开始增长。他们的题库挺小的，之前的面经都无效。最近，他们的题库更新了。

### Coding

Coding 是一个 web application。你可以选择不同的 code stack。这像是一个 peer coding，可以使用 AI，但是使用的是 CoderSignal 里面自己带的 AI tool，叫 Cosmo。这个 AI 不能帮你直接在文件上改，但是可以按照你的指令写 code。你需要自己 copy-paste。

这个题是一个 career event register。你需要实现前端跟后端。前端需要输入用户名、邮件，有一个 button 可以 register 一个 event。默认只有一个 event，所以你不需要输入 event 的名字。其实相当于用户点一下这个 button，我们就在数据库存这个用户的信息。你也需要设计 API 跟后端交互，同时最后输出的结果要根据最新的 check-in 时间来 sort。基本这个做完就可以过了。如果做完这个，还有个 bonus，是有一个新的 field 让你加进去，我具体忘了是哪一个。

### System design

System design 就是 design 一个 job board。Employer 可以 post job，user 可以申请 job。还要支持搜索的功能。但是他们不强调由 Career Center 来 approve 这个 job，来控制这个 visibility。

<ReferenceSource
:sources="[
{
title: 'Handshake on site 面试经验',
link: 'https://www.1point3acres.com/bbs/thread-1197033-1-1.html',
site: '一亩三分地',
author: '匿名用户-JTUE4',
date: '2026-11-14',
category: '海外面经'
}
]"
/>
