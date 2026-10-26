---
title: Google SDE3两轮面试经验：Behavioral 与最大效率路径
description: 两轮面试涵盖项目经历、设计取舍与图论 Coding，因讨论耗时未完成代码验证，最终未通过
outline: deep
createdDate: 2026-10-26
lastUpdated: 2026-10-26
---
# Google软件工程师两轮面试经验：Behavioral 与最大效率路径

<InterviewDetail />

## 基本信息

- **公司**：Google
- **具体岗位及职级**：SDE3
- **面试轮数**：2 轮
- **面试内容**：Behavioral、项目经历、DSA
- **面试结果**：Rejected

## Round 1：Behavioral

这一轮主要围绕简历和过往项目展开。

面试官重点追问：

- 之前如何构建服务
- 设计过程中做过哪些 trade-offs
- 为什么选择相应的实现方案

原文未提供具体项目及回答细节。

## Round 2：Coding

### Maximum Efficiency Path

给定一个包含 `n` 个节点和若干条边的图。

边代表 transmission lines，每条边的效率取值范围为 `0` 到 `1`。

给定 source 和 destination，要求返回效率最高的路径。

原文未明确路径效率的计算方式，也未说明图是否有向。

### 初始思路：Dijkstra

候选人看到题目后，直接提出使用 Dijkstra，并解释了整体解题思路。

随后，面试官要求进一步讨论 DFS 和 BFS 是否可行。

### DFS 讨论

候选人解释了如何使用 DFS 搜索路径，但认为枚举路径的时间复杂度过高，因此没有将其作为首选方案。

候选人在原帖中将复杂度描述为 `O(V!)`。这一估计与稠密图中枚举简单路径的最坏情况有关，具体复杂度仍取决于图结构与实现方式。

### BFS 讨论

面试官继续追问 BFS 的解法。

候选人尝试提出了几种思路，但面试官指出这些方案无法正确解决问题，并最终表示不能使用 BFS 求解。

这里记录的是面试中的讨论结论，原文没有提供足够细节来判断双方具体讨论了哪种 BFS 实现。

### Coding 与完成情况

讨论结束后，候选人开始编写 Dijkstra 解法，但剩余时间不足。

最终情况：

- 未能在结束前通过具体示例走查代码
- 解释了所用方案的 Time / Space Complexity
- 原文未提供完整代码或运行结果

### 需求澄清方面的反馈

候选人在开始解题前，没有主动询问约束，也没有明确说明自己的假设。

遗漏的问题包括：

- 节点数量范围
- 边数量范围
- source 到 destination 是否保证存在路径

面试官明确指出了这些遗漏。

## 面试结果

候选人最初发帖时，希望了解这样的表现是否可能通过。

后续更新确认：收到了拒绝邮件。

原文未提供正式拒绝原因。

## 总结

两轮分别覆盖：

- **Round 1**：Behavioral + 项目经历 + 设计取舍
- **Round 2**：最大效率路径 + DFS / BFS / Dijkstra 讨论

这次经历中值得关注的环节包括：

- 开始解题前确认题意、输入约束和边界情况
- 提出算法时，说明其适用条件及选择依据
- 比较不同方案时，明确它们是否能够保证正确性
- 为代码实现与示例走查预留时间

候选人较早提出了 Dijkstra，但后续方案讨论占用了较多时间，最终未能完成代码走查。面试官也指出了需求澄清不足的问题。

<ReferenceSource
:sources="[
{
title: 'Google SDE 3 interview | phone screen experience | USA',
link: 'https://leetcode.com/discuss/post/8572982/google-sde-3-interview-phone-screen-expe-ov8g/',
site: 'LeetCode',
author: '匿名用户',
date: '2026-10-14'
}
]"
/>
