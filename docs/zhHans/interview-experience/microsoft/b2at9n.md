---
title: SDE Loop Onsite面经
description: Microsoft SDE Loop Onsite面试经验
outline: deep
---
# Microsoft SDE Loop Onsite面试经验

<InterviewDetail />


## 面试详情

- **面试形式**：Onsite
- **申请背景**：在职跳槽

### 第一轮：System Design

设计一个系统，从简单的单客户端（single-client）设计开始，逐步扩展并讨论：
1. 负载均衡 (Load balancing)
2. 水平扩展 (Horizontal scaling)
3. 数据库分片 (Sharding)

### 第二轮：Object-Oriented Design

**第一部分：类设计 (Class design)**

建模一个攻击路径系统 (attack-path system)，设计以下类和属性：
1. Node：包含 ID, name, criticality
2. VirtualMachine：继承自 Node，包含 internet-connectivity 属性
3. Database：继承自 Node，包含指示是否含有敏感数据 (sensitive data) 的属性
4. Edge：连接源节点 (source node) 和目标节点 (target node)，具有自身的 criticality
5. AttackPath：包含一组 Node 和 Edge，以及 severity 属性

**第二部分：路径验证与构建 (Path validation / construction)**

实现一个函数，根据给定的节点 (nodes) 和边 (edges) 来验证或构建一条攻击路径 (attack path)。

### 第三轮：Data Structures & Algorithms

**第一题**

给你一个二进制数组，在最多可以把 K 个 0 翻转成 1 的情况下，求最大连续 1 的个数。
LeetCode 对应题目：[1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)

**第二题**

给定二叉树中的一个目标节点 (target node)，计算火焰从该节点蔓延到整棵树所需的最短时间（火焰每秒向相邻节点蔓延一步）。
注意：面试中给定的二叉树节点结构中已经包含了指向父节点 (parent) 的指针。
LeetCode 对应题目：[2385. Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/)

**第三题**

给定一系列带有时间戳 (timestamps) 的消息 (messages) 以及一个时间窗口 K。要求返回一个布尔向量，指示每条消息是应该被接收 (accepted) 还是被抑制 (suppressed)。
具体要求：
1. 如果同一条消息在过去 K 秒内已经接收过，则进行抑制
2. 明确被抑制的消息是否应该更新其时间戳（本题实现中，只有当消息被成功接收时才更新时间戳）
LeetCode 相似题目：[359. Logger Rate Limiter](https://leetcode.com/problems/logger-rate-limiter/)

## 面试结果反馈

- **最终结果**：Fail

<ReferenceSource
:sources="[
{
title: 'Microsoft SDE Loop面经',
link: 'https://www.1point3acres.com/bbs/thread-1194079-1-1.html',
site: '一亩三分地',
author: '匿名用户-EHNMT',
date: '2026-10-22',
category: '海外面经'
}
]"
/>