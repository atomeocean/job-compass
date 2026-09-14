---
title: Microsoft MAI Copilot Onsite 面试经验
description: Microsoft MAI Copilot 四轮 Onsite 面试经验
outline: deep
createdDate: 2026-09-13
lastUpdated: 2026-09-14
---
# Microsoft MAI Copilot Onsite 面试经验

<InterviewDetail />

## 基本信息

- **面试岗位**：Software Engineer（MAI Copilot 团队）
- **工作类型**：全职
- **面试形式**：Onsite，共四轮
- **当前状态**：未通过

## 面试详情

### Hiring Manager 面试

这一轮主要是项目深入介绍，以及 Microsoft 常见的领导力问题，例如 **Drive for Results** 和 **Bias for Action**。

### Coding 1

这是一道中等难度的Leetcode算法题，有多个逐步追加的 Follow-up。

### Coding 2

题目给定一个数组和一组查询下标。对于每个查询，需要计算从该下标到数组末尾的后缀中，当前最大值出现的次数。

直接对每个查询遍历对应后缀会导致效率不足。更高效的方法是从数组末尾向前只遍历一次，维护当前最大值及其出现次数：

- 遇到更大的元素时，更新当前最大值，并将出现次数重置为 1
- 遇到等于当前最大值的元素时，将出现次数加 1
- 依次记录每个位置对应的后缀最大值出现次数，再回答查询

面试官继续追问了负数，以及最大值连续重复出现的情况。

### System Design

题目是设计一个基于 RAG 的聊天机器人记忆系统，需要处理历史信息互相冲突的情况。

<ReferenceSource
:sources="[
{
title: 'Microsoft MAI Copilot onsite, rejected after the follow ups escalated',
link: 'https://www.hack2hire.com/forum/6a9efba20ca9cc4e1c78dcce?backTo=%2Fforum%3Fcompany%3Dmicrosoft',
site: 'Hack2Hire',
author: 'vikramreddy23',
date: '2026-09-07',
category: '海外面经'
}
]"
/>
