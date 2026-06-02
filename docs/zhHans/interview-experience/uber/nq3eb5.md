---
title: Backend Engineer
description: Uber L4 Backend Engineer电话面试经验
createdDate: 2026-05-30
lastUpdated: 2026-06-02
outline: deep
---
# Uber L4 Backend Engineer电话面试经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **岗位**：Backend Engineer
- **岗位等级**：L4
- **面试形式**：Phone Screen
- **申请渠道**：内推
- **候选人背景**：硕士

## 面试详情

### 电话面试

面试题为矩阵遍历与广度优先搜索（BFS）相关问题。

给定一个二维矩阵，矩阵中的元素只包含字符 `"-"` 和若干字母。要求将所有 `"-"` 替换为距离最近的字母。如果某个位置与多个距离为 1 的相邻字母相连，则可以任选其中一个字母进行替换。

我采用多源 BFS 的思路进行求解，题目与 LeetCode 286（Walls and Gates）较为相似。

### Follow Up

面试官进一步增加约束条件：

对于存在多个距离相同且均为最近字母的情况，不再允许任意选择，而是要求替换为字典序（字母排序）更靠前的字母。

回答继续基于 BFS 思路完成讨论。

## 面试整体体验

题目属于经典图搜索类型，主要考察 BFS 建模能力以及对多源搜索场景的理解。Follow Up 在原题基础上增加了字典序处理要求，需要额外考虑相同距离情况下的优先级问题。

## 面试结果反馈

- **最终结果**：通过 Phone Screen
- **后续进展**：已与 HR 预约后续面试

<ReferenceSource
:sources="[
{
title: 'Uber L4 Backend Phone Screen',
link: 'https://www.1point3acres.com/bbs/thread-1178489-1-1.html',
site: '一亩三分地',
author: 'Depth24',
date: '2026-05-29',
category: '海外面经'
}
]"
/>