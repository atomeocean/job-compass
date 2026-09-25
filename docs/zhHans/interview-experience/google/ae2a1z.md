---
title: Google L4 面试经验
description: Google L4 Software Engineer 面试经验，包含 Phone Interview、Onsite Coding 以及 Googleyness & Leadership 行为面试。
createdDate: 2026-09-24
lastUpdated: 2026-09-24
outline: deep
---
# Google L4 面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer（L4）
- **面试形式**Phone Interview + Onsite
- **申请渠道**：网上海投
- **候选人背景**：硕士，在职跳槽
- **面试结果**：Pass

## 面试详情

### Phone Interview

给定一个二叉树结构表示公司员工的汇报关系，每个节点代表一个员工，父节点代表其直属 manager。要求找出给定员工集合中多个员工的最近共同 manager，即 Lowest Common Ancestor 的变种。

主要追问：

1. 员工数量为 K，树的高度为 H，要求优化时间复杂度。
2. 如果员工集合非常大，或者需要进行频繁查询，如何进行预处理和优化。

### Onsite Coding 1：温度监控系统

设计一个温度监控系统的数据结构，支持实时插入温度数据，并高效查询最近 N 天的数据。

需要实现：

1. insert(temperature)：插入一个新的温度读数。
2. get_moving_average()：返回最近 N 个温度读数的滑动平均值。
3. get_max_temp()：返回最近 N 个温度读数中的最大值，要求时间复杂度为 O(1)。

### Onsite Coding 2：网格地图送货

给定一个二维网格地图，其中包含起点、障碍物以及若干个送货点。要求设计一个算法，从起点出发，送达所有货物后返回起点，并找到最短路径。

主要考虑：

1. 当送货点数量较少，即 N < 10 时，可以使用 DP 或 backtracking 求解 Traveling Salesperson Problem（TSP）。
2. 当网格很大时，如何优化寻路算法，以减少搜索空间。

### Onsite Coding 3：Logger Rate Limiter

设计一个日志限流器。由于网络延迟，日志消息到达系统的时间戳可能存在乱序（out of order）。

需要实现：

shouldPrintMessage(timestamp, message)

如果同一个 message 在过去 10 秒内没有被打印过，则允许打印并返回 true，否则返回 false。

主要难点是处理乱序到达的日志，例如时间戳为 12 的日志先于时间戳为 10 的日志到达。

## BQ 面试

行为面试主要考察团队协作、冲突解决以及个人成长。

主要问题包括：

1. 描述一次与 Product Manager 在产品方向或技术实现上产生严重分歧的经历，以及如何通过沟通最终达成共识。
2. 当项目面临紧急 Deadline，而技术债（Tech Debt）已经严重影响开发效率时，如何平衡业务交付与代码质量。

## 面试结果反馈

- **最终结果：** Pass

<ReferenceSource
:sources="[
{
title: 'Google L4 面经',
link: 'https://www.1point3acres.com/bbs/thread-1189058-1-1.html',
site: '一亩三分地',
author: '匿名用户-CG8LB',
date: '2026-09-24',
category: '海外面经'
}
]"
/>
