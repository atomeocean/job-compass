---
title: SDE(embedded) Intern OA
description: Amazon Intern SDE(embedded) OA面试经验
outline: deep
---
# Amazon Intern SDE(embedded) OA面试经验

<InterviewDetail />

## 面试详情

- **oa面试平台**：HackerRank

上周三投递的岗位，上周四拿到了OA邀请，刚做完。

整个 OA 分成三个部分：

- Coding Challenge — 100 min
- Work Simulation — ~45 min
- Work Style Assessment — ~6 min

### Part 1: Coding Challenge

这次 Coding 一共两道题：

**Q1 — 滑动窗口**

给定一个只包含 0 和 1 的字符串 log，其中：

- 1 表示服务器正常运行
- 0 表示服务器发生故障

允许最多进行一次维护操作：选择一个长度恰好为 k 的连续子串，将其中所有 0 修改为 1。
要求返回操作后最长连续 1 的长度。

应该是最长子字符串的变体……但关键区别在于，维护操作必须作用于长度恰好为 k 的连续区间，而不是任意翻转最多 k 个零。

可以考虑 Sliding Window，结合左右连续 1 的长度进行计算。

**Q2 — AI-assisted Code Repository**

第二题是新版 OA 的 Repository Coding，使用 HackerRank 提供的在线 VS Code 风格 IDE，可以使用平台内置的 AI Assistant。

与传统 LeetCode 不同，这部分更偏真实的软件工程开发，需要阅读已有代码、理解项目结构并完成指定任务。

### Part 2: Work Simulation

个人感觉这部分比 Coding 还累……

本来以为写完代码就轻松了，结果后面还有将近 45 分钟的 Work Simulation。

这一部分主要评估工程师在实际工作场景中的决策方式，需要综合考虑技术问题、任务优先级、团队协作和潜在风险。

它和算法题一点都不一样。Coding 至少有比较明确的正确答案，Work Simulation 则需要不断权衡不同选择的合理性……太累了……

连续做下来真的非常消耗注意力，尤其是刚经历完 100 分钟 Coding Challenge 之后

### Part 3: Work Style Assessment

最后还有工作风格问卷，主要涉及平时的工作方式和个人偏好。

<ReferenceSource
:sources="[
{
title: '亚马逊SDE(embedded) Intern OA面经',
link: 'https://www.1point3acres.com/bbs/thread-1196565-1-1.html',
site: '一亩三分地',
author: 'wuq',
date: '2026-11-11',
category: '海外面经'
}
]"
/>
