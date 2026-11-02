---
title: ICT4 两轮店面 coding
description: Apple ICT4 Software Engineer 技术电面面试经验
outline: deep
createdDate: 2026-11-02
lastUpdated: 2026-11-02
---
# Apple ICT4 Software Engineer 技术电面面试经验

<InterviewDetail />

## 面试详情

- **团队**：Apple Service Engineering 下面的组

### 第一轮 Coding：Network Node Count

**题目描述**： 给定一个 Node 类以及一组用于左右通信和状态查询的 API：

- isLeftMost() / isRightMost()：判断当前节点是否为最左或最右边界。
- sendMessageToLeft(Message m) / sendMessageToRight(Message m)：向左右邻居发送消息。
- receiveMessageFromLeft(Message m) / receiveMessageFromRight(Message m)：接收来自左右邻居的消息。

**核心要求**：设计一个函数，当任意节点接收到一个获取网络总节点数的请求时，通过节点间的协同通信，让该节点能够计算并返回整个网络中的总节点数（Node Count）。

我的做法是由两端边界（LeftMost / RightMost）发起初始化消息，向内遍历并把总数或各自的累加编号传播给所有节点，使得每个节点在本地缓存（precompute）好全局的 node count。这样当任意节点后续接收到查询请求时，可以直接O(1)返回结果。

### 第二轮 Coding：3D Grid Diagonal Walk Probability

**题目描述**： 给定一个 8x8x8 的 3D 网格，合法的坐标范围是 0<= x, y, z < 8。初始位置为 (x, y, z)，总步数为 N （N<20）。 在每一步中，从当前位置向 3D 空间的 8 个对角线方向以相等的概率移动 1 个单位。 求在走了整整 N 步之后，最终位置仍然保持在 3D 网格边界内部的概率。

标准的概率动态规划（Probability DP）问题。由于网格非常小（8^3 = 512 个状态），定义 dp[step][x][y][z] 表示走了 step 步停留在 (x, y, z)的概率。通过迭代 N 步，每次枚举 8 个对角线方向更新合法位置的概率，是leetcode的一道二维相似题目的变种。

<ReferenceSource
:sources="[
{
title: '果子ICT4两轮店面coding求米',
link: 'https://www.1point3acres.com/bbs/thread-1195315-1-1.html',
site: '一亩三分地',
author: '匿名用户-JK9GP',
date: '2026-11-01',
category: '海外面经'
}
]"
/>