---
title: SDE 3 phone screen
description: Google SDE 3 Software Engineer Phone Screen面试经验
outline: deep
createdDate: 2026-10-27
lastUpdated: 2026-10-30
---
# Google SDE 3 Software Engineer Phone Screen面试经验

<InterviewDetail />

## 面试详情

- **地点**：USA

一共有 2 场面试。

### 第一轮：Behavioral

第一场是 behavioral，面试官问了我简历上的问题，让我描述我是怎么构建那些 services 的，以及它们的 tradeoffs 是什么。

### 第二轮：Coding

第二场面试是 coding 面试。

**题目**：给你 n 个 nodes 和 edges，这些 edges 是传输线，取值可以从 0 到 1。给定一个 Source 和 destination，返回效率最高的路径。

对于这道题，我立刻就想到了 dijkstra's algorithm，并解释了我会怎么解。但面试官问那 DFS 和 BFS 呢？我讲了用 DFS 我会怎么解，但时间复杂度会是 O(V!)，所以我没有提这个方案。然后他问我 BFS 的解法。我试着讲一个 BFS 的答案，但没能找到解法，讲了几个思路，他指出那些行不通，后来他告诉我用 BFS 是解不出来的。于是我开始写 dijkstra's 的解法，然后时间就用完了。我没来得及用一个例子把代码走一遍。我只讲了这个解法的时间和空间复杂度。

我也没有问 constraints，也没有做任何 assumptions，比如有多少 nodes 或 edges。是不是一定保证有路径。我没能问出这些问题，面试官也把这些指出来了。

<ReferenceSource
:sources="[
{
title: 'Google SDE 3 interview | phone screen experience | USA',
link: 'https://leetcode.com/discuss/post/8572982/google-sde-3-interview-phone-screen-expe-ov8g/',
site: 'LeetCode',
author: 'Anonymous User',
date: '2026-10-14',
category: '海外面经'
}
]"
/>