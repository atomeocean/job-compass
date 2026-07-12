---
title: SDE
createdDate: 2026-07-12
lastUpdated: 2026-07-12
outline: deep
---

# Amazon L4 SDE 面试经验

## 面试基本信息

- 公司信息：[Amazon](https://www.amazon.jobs/)
- 面试时间：2026年7月

## 背景

候选人为码农类硕士，2026年7-9月批次全职求职，面试的是 L4 SDE 职位。

## 面试过程

整场面试持续 4 个小时，共 4 轮，BQ 和 technical 穿插进行：前三轮基本是每轮开场简介后，30 分钟 technical 加 30 分钟 BQ；第四轮为纯 BQ。

### Technical Round 1

题目为股票交易最大利润计算器：给定价格数组 `prices`，支持两种交易模式——`max_transactions = 1`（最多一次买卖）和 `max_transactions = -1`（无限次交易，但每次卖出需支付手续费 `fee`，同一时间最多持有一股）。要求返回给定规则下的最大利润。

Follow-up：将两种模式合并到同一个 function 中实现，之后继续在此基础上优化。

### Technical Round 2

题目为低层设计 Amazon Locker 系统：设计一个类似 Amazon Locker 的包裹自提柜系统，支持管理多个 Locker Location、每个地点包含多个不同尺寸（SMALL / MEDIUM / LARGE）的 Locker Slot，为包裹分配尺寸足够的空柜格，Courier 投递、Customer 用 pickup code 取件（code 需有过期时间），处理包裹超时未取的释放/退回流程，并支持查询某地点是否有可用柜格。设计需说明核心类和对象模型、主要 API、柜格分配策略、投递/取件/过期处理流程、并发问题（如两个包裹同时抢占同一柜格）的处理方式，可简要说明持久化表结构，不要求写完整代码。

### Technical Round 3

题目为正则表达式匹配：给定字符串 `s` 和模式串 `p`，实现支持 `.` 和 `*` 的正则匹配，`.` 匹配任意单个字符，`*` 匹配其前面元素零次或多次，匹配需覆盖整个字符串 `s`，返回是否能完整匹配。

### Behavioral Round（贯穿全程 + 第4轮纯BQ）

4 个小时里一共被问了 17 个 BQ 问题，候选人形容"喝了两瓶水，嗓子都冒烟了，最后嗑着润喉糖回答的问题"。覆盖的 LP 包括：

Have Backbone; Disagree and Commit、Invent and Simplify、Insist on the Highest Standards、Are Right A Lot、Deliver Results、Dive Deep、Customer Obsession、Ownership、Learn and Be Curious、Earn Trust。

## 结果反馈

结果标注为 Pass。

## 引用来源

