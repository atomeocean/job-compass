---
title: SWE L4 面经
description: Google L4 软件工程师技术电面与 Onsite 三轮 Coding 及 Googleyness & Leadership 面经
outline: deep
createdDate: 2026-09-14
lastUpdated: 2026-09-14
---
# Google L4 软件工程师面试经验

<InterviewDetail />

## 基本信息

- **面试岗位**：Software Engineer（码农类 General，L4）
- **学历背景**：硕士
- **工作类型**：全职
- **面试形式**：技术电面 + Onsite
- **当前状态**：在职跳槽
- **面试结果**：Pass

## 面试详情

### 面试流程

1. 技术电面（Phone Interview）
2. Onsite Coding 1
3. Onsite Coding 2
4. Onsite Coding 3
5. Googleyness & Leadership

原文对整体难度的评价为 **Hardest**，整体面试感受为 **Positive**。

### 面试过程的详细描述

#### 技术电面

给定一个二叉树结构表示公司员工的汇报关系，每个节点代表一个员工，父节点代表其直属 manager。要求写一个算法，找出给定的一个员工集合（多个员工）的最近共同 manager，即 Lowest Common Ancestor 的变种。

追问：

1. 员工数量为 K、树的高度为 H，要求对时间复杂度进行优化。
2. 如果员工集合非常大，或者需要频繁查询，如何进行预处理和优化。

#### Onsite Coding 1

设计一个温度监控系统的数据结构，支持实时插入温度数据，并能高效查询最近 N 天的数据。

需要实现的接口：

1. `insert(temperature)`：插入一个新的温度读数。
2. `get_moving_average()`：返回最近 N 个温度读数的滑动平均值。
3. `get_max_temp()`：返回最近 N 个温度读数中的最大值，要求时间复杂度为 O(1)。

#### Onsite Coding 2

给定一个二维网格地图，其中包含起点、障碍物以及若干个送货点。设计算法找出从起点出发、送达所有货物并返回起点的最短路径。

追问：

1. 送货点数量较少（N < 10），可以使用 DP 或 backtracking 求解 Traveling Salesperson Problem（TSP）。
2. 如果网格很大，如何优化寻路算法以减少搜索空间。

#### Onsite Coding 3

设计一个日志限流器（Logger Rate Limiter）。由于网络延迟，日志消息到达系统的时间戳可能会乱序（out of order）。

要求：

1. 实现 `shouldPrintMessage(timestamp, message)` 接口，如果同一个 message 在过去 10 秒内没有被打印过，则允许打印并返回 `true`，否则返回 `false`。
2. 必须处理乱序到达的日志，例如时间戳为 12 的日志比时间戳为 10 的日志先到达。

#### Googleyness & Leadership

行为面试主要考察团队协作、冲突解决以及个人成长，问到的问题包括：

1. 描述一次你与 Product Manager 在产品方向或技术实现上产生严重分歧的经历，你是如何沟通并达成共识的？
2. 当项目面临紧急 Deadline，而技术债（Tech Debt）严重影响开发效率时，你如何平衡业务交付与代码质量？

### 面试结果反馈

- **最终结果**：Pass
- **整体难度**：Hardest
- **个人感受**：Positive

原文未提及各轮的具体解法、与面试官的沟通细节以及面试的具体日期。

<ReferenceSource
:sources="[
{
title: 'Google L4 面经',
link: 'https://www.1point3acres.com/bbs/thread-1189058-1-1.html',
site: '一亩三分地',
author: '匿名用户-CG8LB',
category: '海外面经'
}
]"
/>
