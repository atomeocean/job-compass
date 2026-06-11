---
title: Uber OA
description: Uber Software Engineer Online Assessment面试经验
createdDate: 2026-06-03
lastUpdated: 2026-06-03
outline: deep
---
# Uber Software Engineer OA面试经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **岗位**：Software Engineer
- **面试形式**：Online Assessment
- **申请渠道**：内推
- **候选人背景**：硕士，在职跳槽
- **考试平台**：HackerRank
- **考试时长**：90分钟
- **面试结果**：未知

## 面试详情

### OA 环境

- HackerRank 平台
- 全程需要开启摄像头
- 仅允许使用一个显示器

### 第一题：Maximize Pipeline Throughput

给定一组串行服务，整个系统的 Throughput 由所有服务中的最小吞吐量决定。

对于第 `i` 个服务：
```text
throughput = t[i] * (1 + x)
```

其中：
- `x` 为扩容次数；
- 每次扩容成本为：

```text
x * cost[i]
```

给定总预算 `budget`，求系统能够达到的最大整体 Throughput。

#### 解法思路

使用二分答案。

假设目标吞吐量为 `target`：

对于每个服务，计算达到目标吞吐量所需的最少扩容次数：
```text
x = ceil(target / t[i]) - 1
```

然后累加所有服务的扩容成本。
- 如果总成本不超过预算，说明当前目标可行；
- 如果超出预算，说明目标过高。

利用单调性进行二分，求出最大可行 Throughput。

### 第二题

类似 LeetCode 2858

## 面试体验

整体 OA 难度偏高。

第一题属于二分答案类优化问题，需要快速识别单调性并完成可行性判断函数设计。

## 面试结果反馈

- **最终结果**：未知

<ReferenceSource
:sources="[
{
title: 'Uber OA',
link: 'https://www.1point3acres.com/bbs/thread-1178698-1-1.html',
site: '一亩三分地',
author: 'wzcfly',
date: '2026-05-30',
category: '海外面经'
}
]"
/>