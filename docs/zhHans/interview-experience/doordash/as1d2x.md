---
title: 经典店面过经
description: DoorDash Software Engineer 技术电面面试经验
outline: deep
createdDate: 2026-10-16
lastUpdated: 2026-10-16
---
# DoorDash Software Engineer 技术电面面试经验

<InterviewDetail />

## 面试详情

- **面试形式**: 技术电面

经典dasher pay

### 第一轮：Coding

**part1：** 单纯根据base rate和每个interval同时进行的订单数量算

**followup：** 问了一些sd问题，比如如果数据上游有duplicates如何handle，答了idempotency

**part2：** 加上double pay intervals；写了找overlap的写法，解释了O(1)的prefixSum写法

会给testcase，写完需要自己modify testcase来测试一些edge case


## 面试结果反馈

- **最终结果**：Pass

面完后第四个工作日收到onsite邀请

<ReferenceSource
:sources="[
{
title: 'doordash经典店面',
link: 'https://www.1point3acres.com/bbs/thread-1193262-1-1.html',
site: '一亩三分地',
author: 'ytxu',
date: '2026-10-15',
category: '海外面经'
}
]"
/>