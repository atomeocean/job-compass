---
title: Software Engineer
description: Netflix SDE 面试经验（Ghost全套）
createdDate: 2026-05-29
lastUpdated: 2026-06-02
outline: deep
---
# Netflix 软件工程师面试经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期（面完已两周）
- **面试形式**：OA + Virtual Onsite（4轮VO）
- **职位等级**：申请Staff，被HR告知外部6在这里就是5
- **申请渠道**：网上海投
- **候选人背景**：硕士，在职跳槽

## 面试详情

### 面试整体体验

本次面试为Netflix Ghost组（光羔组）面经。OA结束后两天即通知VO，四轮VO结束后两周仍无消息，后续公司全公司freeze，目前大概率已石沉大海。

### OA 轮

题目为 **Versioned KV Store**。面试官非常友好，知道候选人也在做类似广告数据存储方向，因此允许按照 Ads Data Store 的思路来设计。双方沟通比较顺畅，虽然代码写得稍慢，但最终还是通过了。

### VO 第一轮 - Coding

题目是最接近面经的 **Topological Sort**，但增加了类似 DP 的 constraint，需要处理 prerequisite 什么时候完成（没见过的变体）。  
候选人反馈：虽然面试官给了 hint，也理解了 edge case，但最终没能修完 bug。

### VO 第二轮 - System Design

问的是 **Pacing** 而非常见的 Freq Cap。  
候选人反馈：High-level 逻辑比较了解，但 rate limit 具体实现等细节没有 deep dive，面试官也没有继续深挖。

### VO 第三轮 - Data Modeling

问的是 Supply Side 如何 manage publisher specific config rules。  
候选人反馈：自己一直在 Demand Side，脑子有点懵，clarify 了好一会儿才进入状态。回答中 inventory 如何 modeling 的部分可能和面试官预期不完全一致。

### VO 第四轮 - Behavioral Questions

两个 BQ 轮，问题都比较 general。  
候选人反馈：尽量往 match 的方向回答。

## 面试结果反馈

- **最终结果**：Ghost（两周无消息 + 全公司 freeze）
- **整体难度**：Hard
- **个人感受**：前两轮发挥一般，后续几轮状态逐渐下滑，最终未能通过。

<ReferenceSource
:sources="[
{
title: '耐飞家ghost经全套',
link: 'https://www.1point3acres.com/bbs/thread-1177568-1-1.html',
site: '一亩三分地',
author: '匿名用户-DTH6J',
date: '2026-05-23',
category: '海外面经'
}
]"
/>