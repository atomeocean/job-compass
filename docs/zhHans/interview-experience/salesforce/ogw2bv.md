---
title: MTS
createdDate: 2026-07-18
lastUpdated: 2026-07-18
outline: deep
---

# Salesforce MTS 面试经验

## 面试基本信息

- 公司信息：[Salesforce](https://www.salesforce.com/)
- 面试时间：2026年7-9月

<InterviewDetail />

## 面试过程

### Interview 1

第一题是 Maximal Square（LeetCode 221），经典的 DP 题目。

第二题是 Maximal Rectangle（LeetCode 85），考察 Monotonic Stack 和 Largest Histogram 的原理，要求给出逻辑推导和代码实现。

### Interview 2

第一题是棋盘上的骑士遍历（Knight traversal in a Chessboard），给定起点和终点，计算到达终点所需的最小步数，使用 BFS 解决。

第二题是 UDP packets ordering：给定一个数字流和缓冲区大小 n，每个数字距离其正确排序位置的偏移量最多为 n，要求对数字进行序列化输出。由于不允许存储所有数字，需使用 Priority Queue 解决。

之后针对简历中的通知系统项目进行系统设计，讲解高层架构（Notification System HLD）。

### Interview 3

围绕架构设计展开深入讨论，问题包括：

- 为什么团队决定将 Monolith 拆分为 Microservices？
- 为什么避免使用 Synchronous calls，而选择 Asynchronous event-driven model？
- 技术选型：为什么主要使用 Kafka，而不是 RabbitMQ 或 Redis？
- 详细解释 Notification System 的设计方案。
- 如果 Stream 中出现 poison message，该如何处理？说明如何 debug 并修复此问题。
- 关于架构设计的深入讨论：解释项目的 Event-driven architecture；其他团队如何从该模型中获益；如果适用，会把 Circuit breaker pattern 加在什么地方？
- 针对 Consumer，如何防止 Race conditions？首先解释在这种 Consumer 场景下 Race condition 是如何发生的。
- 在高层面上解释如何为 Kafka 实现 DLQ（Dead Letter Queue）pattern。
- 解释团队的 On-call culture，以及收到 Pager 后的处理流程。
- 讨论 Outbox pattern 和 Sidecar pattern 的相关应用。

## 结果反馈

最终结果为 Fail。

## 引用来源

<ReferenceSource
:sources="[
  {
    title: 'Salesforce MTS 面经',
    link: 'https://www.1point3acres.com/interview/thread/1183338',
    site: '一亩三分地',
    author: '匿名用户',
    date: '2026-07-17',
    category: '面经',
    description: 'Salesforce MTS 全职面试三轮面经，涵盖算法、系统设计与架构深度讨论，结果为 Fail。'
  }
]"
/>
