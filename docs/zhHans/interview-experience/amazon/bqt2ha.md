---
title: SDE2 onsite
description: Amazon SDE2 Onsite面试经验
createdDate: 2026-06-30
lastUpdated: 2026-07-09
outline: deep
---
# Amazon SDE2 Onsite面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Development Engineer II（SDE2）
- **面试形式**：Onsite
- **申请渠道**：网上海投
- **候选人背景**：硕士，在职跳槽
- **面试结果**：Other

## 面试详情

整体是标准 Amazon Onsite 流程。

每一轮结构基本固定：

- 30min Behavioral Questions
- 25min Coding / Design

所有题目都是从零开始手写，没有 test case 运行环节。

## Coding 1

### Kth Largest Binary Perfect Tree

给定一个 binary tree，以及一个整数 k。

要求：

找出第 K 大的 “binary perfect tree”。

（题目本身偏定义型 + 树结构处理）

主要考察：

- 树的遍历
- 子树结构判断
- 排序 / 优先级选择

## Coding 2

### Find Conflicting Events

输入是一个 event list，每个 event 包含：

- user name
- region name
- timestamp

定义 conflict event 需要满足：

1. 同一个 user id
2. 不同 region name
3. timestamp 小于给定值 K

要求找出所有符合条件的冲突事件对 / 记录。

主要考察：

- HashMap 分组
- 时间过滤
- 条件组合判断
- 双层遍历优化

## System Design

### Primary DB + Read Replicas

这一轮是偏 Amazon 自家 DB 体系的设计题。

不是传统互联网系统设计，而更偏：

- 数据库高可用
- 主从架构
- 故障检测机制
- failover / recovery 流程

讨论点包括：

- Primary DB 挂掉如何检测
- 如何进行自动切换
- Read Replica 同步机制
- 数据一致性问题
- 恢复策略

## OOD

### Snake Game（贪吃蛇）

经典 OOD 设计题：

需要设计：

- Snake body
- Grid / Board
- Movement logic
- Collision detection
- Food generation

重点在：

- 类设计合理性
- 状态管理
- 扩展性（例如多蛇 / 不同模式）

## 面试体验

整体节奏比较标准 Amazon 风格：

- 强 Behavioral（每轮必问）
- Coding 偏基础 + 业务化变体
- SD 偏内部系统（尤其 DB 组）
- OOD 经典题

难度中等偏上，主要压力在时间分配和完整表达。

## 面试结果反馈

- **最终结果**：Other

<ReferenceSource
:sources="[
{
title: 'Amazon SDE 2 Onsite',
link: 'https://www.1point3acres.com/bbs/thread-1181449-1-1.html',
site: '一亩三分地',
author: '匿名用户-BNFQP',
date: '2026-06-26',
category: '海外面经'
}
]"
/>