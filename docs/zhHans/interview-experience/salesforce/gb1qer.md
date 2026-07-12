---
title: Software Engineer 面经
description: Salesforce Software Engineer Onsite面试经验
createdDate: 2026-07-11
lastUpdated: 2026-07-12
outline: deep
---
# Salesforce Software Engineer Onsite面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer
- **面试形式**：Onsite
- **申请渠道**：Other
- **候选人背景**：硕士
- **面试结果**：Other

## 面试详情

Onsite 主要是一道动态规划题。

题目描述如下：

给定一个包含多个 campaign cost 的数组，以及一个整数 `weeks`，需要将所有 campaign 按顺序划分到若干周中。

要求：

1. 每一周至少包含一个 campaign。
2. 每周负责的 campaign 必须是数组中的连续区间。
3. 所有 campaign 都必须被划分，且不能重叠。
4. 目标是使每周 **最大开销（maximum cost）** 之和最小。

示例：

```text
costs = [2, 5, 4, 3, 7, 1, 6, 8]
weeks = 3
```

需要找到一种最优划分方案，使三周对应区间内的最大值之和达到最小。

## 解题思路

这道题属于典型的区间动态规划（Interval DP）。

状态设计可以围绕：

- 前 i 个 campaign
- 已划分 j 周

进行定义。

状态转移时，需要枚举最后一周所覆盖的区间，并维护该区间内的最大值，从而更新最优答案。

整体属于经典的数组划分优化问题。

## 面试体验

整场 Onsite 基本围绕这一道题展开。

虽然题目描述比较简单，但属于难度较高的动态规划题，需要较强的状态设计和转移能力。

如果没有做过类似的数组分组 DP，现场推导会比较有挑战。

## 面试结果反馈

- **最终结果**：Other

<ReferenceSource
:sources="[
{
title: 'Salesforce 面经',
link: 'https://www.1point3acres.com/bbs/thread-1180921-1-1.html',
site: '一亩三分地',
author: '匿名用户-EMABY',
date: '2026-06-22',
category: '海外面经'
}
]"
/>