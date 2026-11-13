---
title: OCI VO
description: Oracle OCI 全职 VO面试经验
outline: deep
---
# Oracle OCI VO面试经验

<InterviewDetail />

## 面试详情

- **团队**：OCI

上周面完的 OCI VO，四轮，整理一下题目给后面的人参考。

流程是 recruiter 聊完一周左右约电面，电面过了再约 VO，VO 分两天。每轮前面都有十来分钟 BQ，哪轮考什么事先不告诉你，进去才知道，佛了。

### 电面

电面是 simplify expression，带加减号和括号的表达式，去掉括号化简。做出来了，写完自己造了几个 case 跑了跑。

### VO

#### 第一轮：Coding

给一个排好序的请求时间戳列表，返回被丢弃的请求数。限制有三层：每秒最多 3 个，每 10 秒最多 20 个，每 60 秒最多 60 个。

坑在于被丢掉的请求也要算进后面的额度里，我一开始没注意这点，跑 test case 的时候数字对不上才发现。面试官让先讲 naive 做法再讲怎么优化，最后分析时间空间复杂度。

#### 第二轮：LLD

其实就是 OOD。写一个 Logger，构造的时候传进来一个 handler 列表，log(message) 要让 message 依次经过所有 handler。要实现的 handler 有两个，一个 TruncateHandler，一个 StoreHandler，后者不打印，把 message 存进内部的 list。这轮不要求跑代码，主要聊接口怎么设计。

#### 第三轮：SD

tiny url，没有什么特别的，tradeoff 被追问得比较多。

#### 第四轮：HM

本来说是 SD，结果基本在挖简历，问了 oncall 和最难的项目，follow up 很多。

## 面试体验

整体题目难度正常，感觉 OCI 比较看重 BQ 和 tradeoff 的讨论

<ReferenceSource
:sources="[
{
title: 'OCI VO',
link: 'https://www.1point3acres.com/bbs/thread-1196488-1-1.html',
site: '一亩三分地',
author: '匿名用户-EPEJY',
date: '2026-11-10',
category: '海外面经'
}
]"
/>
