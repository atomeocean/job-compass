---
title: eBay SDE 面试经验
description: eBay SDE 三轮面试经验，包含 DSA、System Design 和 Hiring Manager Round
createdDate: 2026-08-18
lastUpdated: 2026-08-18
outline: deep
---

# eBay SDE 面试经验

<InterviewDetail />

## 基本信息

- **工作经验**：2 YOE + 6 个月同团队实习
- **面试轮数**：3 轮
- **面试内容**：DSA、System Design、HM / Design
- **面试结果**：Positive，等待 Offer Letter

## Round 1：DSA

时长 1 小时，共两道题。

面试前会先问一些澄清问题，答题时先介绍 brute force，再优化到更好的解法。

### Q1：Container With Most Water

给定数组 `heights`，每个元素表示一条垂直线的高度。

选择其中两条线作为容器两侧，返回能够容纳的最大水量。

主要考察：

- Two Pointers
- Brute Force 到 Optimal Solution 的优化

### Q2：Daily Temperatures

给定每日温度数组 `temps`，返回：

```text
answer[i] = 第 i 天之后需要等待多少天才能遇到更高温度
````

如果之后没有更高温度，则：

```text
answer[i] = 0
```

面试官还要求结合具体例子 walkthrough。

整体这一轮发挥不错。

## Round 2：System Design

时长 1 小时。

### Design LunchDrop

设计一个供企业员工在办公地点订餐的应用。

每天展示不同的餐厅，用户可以：

1. 登录系统
2. 查看当天可用餐厅
3. 浏览餐厅菜单
4. 选择菜品
5. 自定义配料、蔬菜、酱料等选项
6. 提交订单

开始设计前先和面试官进行了需求澄清。

### Follow-up Questions

讨论的问题包括：

* 下单过程中菜单发生变化，或者商品突然 unavailable，如何处理？
* Menu Database 应该选择什么数据库？
* 如何获取实时菜单更新？
* 餐厅列表实时变化如何同步？
* 系统中哪些地方适合使用 Cache？

此外还问了：

* Why eBay?
* Why are you leaving your current company?

整体这一轮感觉很好。

## Round 3：HM / Design Round

时长 1 小时。

面试官和 Round 1 是同一个人。

原本以为会是 Resume Deep Dive 和 Cultural Fit，但实际又是一轮 System Design。

### Design eBay Top 10 Dashboard

设计一个 Dashboard，实时展示 eBay：

* Top 10 Items by quantities sold
* Top 10 Categories by quantities sold

需求澄清后开始设计，面试官会深入追问每一个设计决策。

### Follow-up Questions

主要包括：

* Item Quantity Aggregator 如何设计？
* Category Aggregator 如何设计？
* Aggregator 如何确定当前 quantity？
* 在 eBay 流量规模下，多频繁更新 State Store？
* 高频写入和低频写入分别有什么优缺点？
* 如何从 RocksDB 中获取最终聚合结果？
* 如果每个 Partition 都有独立 RocksDB，如何聚合所有 Partition 的数据？
* 什么时候触发跨 Partition 的最终聚合？
* 如果有 100 万个 Event，是否需要向 Intermediate Kafka Topic 发布 100 万条消息？
* 如果不需要，如何优化？

主要涉及：

* Kafka
* Partition
* Stream Aggregation
* RocksDB
* State Store
* Batch / Incremental Update
* Event Aggregation

### Behavioral Questions

* 有没有和 Team Member 发生冲突？如何解决？
* 有没有和 Manager 意见冲突？如何解决？
* Why eBay?

## 面试总结

整体三轮分别为：

* **Round 1**：DSA
* **Round 2**：System Design
* **Round 3**：HM + System Design + Behavioral

System Design 的追问比较深入，尤其关注：

* 实时数据处理
* Kafka Partition
* Aggregation
* RocksDB
* State Management
* 写入频率和性能权衡
* 大规模数据下的系统优化

最终收到 Positive Response，目前等待 Offer Letter。

<ReferenceSource
:sources="[
{
title: 'eBay | SDE-2 interview experience | Virtual',
link: '[https://www.1point3acres.com/bbs/thread-1179582-1-1.html](http://xhslink.com/o/HHyukpkczG](https://leetcode.com/discuss/post/8467010/ebay-sde-2-interview-experience-virtual-h2rgv/)',
site: 'LeetCode',
author: '匿名',
date: '2026-08-18'
}
]"
/>
