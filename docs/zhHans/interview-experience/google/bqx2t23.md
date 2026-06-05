---
title: L4 R1时间线
description: Google L4 Software Engineer R1面试经验
createdDate: 2026-06-05
lastUpdated: 2026-06-05
outline: deep
---

# Google L4 Software Engineer R1面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer（L4）
- **面试形式**：技术电面 + BQ
- **申请渠道**：网上海投
- **候选人背景**：硕士，6年工作经验
- **面试结果**：Pass

## 时间线

### 申请到面试

- **4.14** 收到 Recruiter 邮件，表示已经审阅申请并愿意推进流程，需要填写问卷。
- **4.28** 再次收到 Recruiter 回复，并抄送 Google HR。
- **4.29** HR 电话沟通。
- **4.30** 提交 R1 面试时间。
- **5.08** Recruiter 确认 R1 时间。

整个流程等待时间比较长，尤其是确认面试时间阶段。

### R1 面试

- **5.26** 原定进行一轮 Coding 和一轮 BQ，但 BQ 面试官缺席。
- **5.27** 收到新的 BQ 时间安排。
- **5.29** Recruiter 邮件确认。
- **6.03** 完成 BQ。
- **6.04** HR 通知通过 R1，并开始安排 R2。
- **6.05** 确认 R2 时间。

### R2

R2 要求线下面试（Onsite）。

尝试申请远程面试，并说明身体原因，希望改为线上，但 HR 表示可以延期数周安排，不过必须参加线下面试。

## 面试详情

### Behavioral Questions

问题都比较常规：
- 入职后如何持续保持工作热情和兴奋感？
- 如果有人在团队汇报时抢走了你的 Credit，你会怎么办？
- 当手头工作过多时如何处理？
- 当别人不同意你的建议时怎么办？
- 描述一次失败经历，以及你后续如何改进。

面试官明显按照 STAR 原则进行提问。

每个问题都会继续拆分为多个部分深入追问，例如：
- Situation
- Task
- Action
- Result

基本上每个大问题都会拆成四个小问题继续挖掘细节。

### Coding

Coding 难度整体不高。 核心考点是嵌套 HashMap（双层字典）的使用。

例如输入：
```text
[
  [a, b],
  [a, b],
  [a, c],
  [f, g],
  [f, g],
  [f, g],
  [f, p],
  [f, p]
]
```

统计结果：
```text
{
  a: {
    b: 2,
    c: 1
  },
  f: {
    g: 3,
    p: 2
  }
}
```

实现过程中主要就是：
```text
map[a][b] += 1
```

#### Follow Up 1

返回每个外层 Key 对应的最大值。
例如：

```text
{
  a: b,
  f: g
}
```

遍历内层字典，找到出现次数最多的元素即可。

#### Follow Up 2

分析时间复杂度。

#### Follow Up 3

给定一批新的数据，如何更新已有统计结果。

直接遍历新数据并更新原有字典即可。

## 面试体验

BQ 部分属于标准 Google 风格，重点是 STAR 结构化表达能力。

Coding 难度不高，更偏向数据结构基础和代码实现能力，没有出现复杂算法题。

整体流程推进比较慢，但最终顺利通过 R1。

## 面试结果反馈

- **R1 结果**：Pass
- **后续阶段**：进入 R2 Onsite

<ReferenceSource
:sources="[
{
title: '🐶家L4 R1 和 时间线',
link: 'https://www.1point3acres.com/bbs/thread-1179303-1-1.html',
site: '一亩三分地',
author: 'lrddrl',
date: '2026-06-05',
category: '海外面经'
}
]"
/>