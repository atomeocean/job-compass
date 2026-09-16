---
title: SDE
createdDate: 2026-07-18
lastUpdated: 2026-08-02
outline: deep
---
# DoorDash SDE 面试经验

## 面试基本信息

- 公司信息：[DoorDash](https://doordash.com)
- 面试时间：2026年7-9月

<InterviewDetail />

## 面试过程

一天一共 4 轮，强度在线。

### 案例分析（现场事故分析）

问的是商家价格标错，去现场买货的 dasher 没法结账，因为他们用公司的卡，里面额度不够，客服电话被打爆了，该怎么办。

### 系统设计（System Design）

设计一个 job scheduler。候选人在 DB 的 field 设计上给得比较随意，被面试官疯狂 challenge。面试官接着问：进了 queue 的 job 没有在到时间时执行怎么办。这部分候选人没有仔细准备，最后提到可以用 Temporal，面试官追问 Temporal 是什么、具体怎么工作。

### AI Coding

要求写两个 microservice 来处理 customer refund。候选人先写了一个原始版本，面试官问从 product 角度还有什么想实现的功能，候选人想了想提出了 partial refund（针对诈骗场景）。随后按面试官要求，用 prompt 实现出了 partial refund 功能。

### Hiring Manager 面试

聊天比较常规，问了一些常规 BQ 问题，还仔细问了如果回头重新做某个 project，从产品角度会想做什么、为什么。候选人提到这一轮面试官对每个问题的回复习惯都是 "what do you think, you make the decision"，体验和其他轮次不太一样。

## 结果反馈

候选人自评 system design 轮没有准备好；最终结果为 Fail。

## 引用来源

<ReferenceSource
:sources="[
  {
    title: '6刀大师onsite应该是挂经 求加米',
    link: 'https://www.1point3acres.com/interview/thread/1183345',
    site: '一亩三分地',
    author: '匿名用户',
    date: '2026-07-17',
    category: '面经',
    description: '一篇 DoorDash SDE onsite 四轮面试的面经，涵盖案例分析、系统设计、AI coding 及 Hiring Manager 环节。'
  }
]"
/>
