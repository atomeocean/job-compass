---
title: SWE OA + Onsite
description: Coinbase软件工程师面试经验，OA考察Bank System，Onsite包含0-1背包DP、Pagination接口设计与实时价格系统设计
outline: deep
createdDate: 2026-08-28
lastUpdated: 2026-08-29
---
# Coinbase公司软件工程师OA及Onsite面试经验

<InterviewDetail />

## 基本信息

- **面试岗位**：Software Engineer（码农类General）
- **学历背景**：本科
- **工作类型**：全职
- **投递方式**：网上海投
- **面试流程**：OA + Onsite（Coding 两轮 + System Design + BQ）
- **当前状态**：在职跳槽

## 面试详情

### OA：Bank System

OA 的 Coding 部分是一道 Bank System（银行系统）相关的题目，与一亩三分地之前出现过的题目比较相似。

题目需要逐步实现一个银行账户系统，主要包括以下功能：

- **Add Account**：添加新的账户
- **Make a Deposit**：向账户中存款
- **Transfer Money**：在账户之间进行转账
- **Rank Top Spenders**：根据消费金额对用户进行排名
- **Schedule Delayed Payment**：创建延迟付款
- **Cancel Delayed Payment**：取消已经安排的延迟付款
- **Merge Accounts**：合并两个账户
- **Get Balance**：查询账户余额

整体属于逐层增加功能的系统实现题，需要在前面设计的数据结构基础上不断扩展新的功能。

### OA：智力题与性格测试

Coding 之外还有智力题和性格测试。

这一部分题量非常大，需要回答很多题目。

### Onsite Coding 1：Transaction Selection

给定 `N` 个 transactions，每笔交易包含：

```text
<id, size, fee>
```

给定一个 block size 为 100，要求用这些 transactions 填充这个 block，使得 total fee 最大化。

解法要点：

- **必须用 0-1 背包 DP**，greedy 解法在这道题上不成立
- `block size = 100` 这个常量很关键
- 据说这一轮总共有 3 问，第一问就用 DP 写，对后面几问有帮助

面试过程遇到的问题：

- 这一轮**没有提供任何 test case**，一个都没有
- 面试官对这道题本身不熟悉，也不清楚为什么 greedy 在这里不适用
- 围绕「要不要 sort、怎么 sort」讨论了大约 30 分钟
- 面试官后续给出的测试样例本身是错误的
- 候选人先实现了 greedy 解法后，被反问是否知道自己的答案为什么是错的——但在完全没有 test case 的情况下，很难自行验证

### Onsite Coding 2：Pagination

这一轮原本安排的是 domain 相关内容，实际直接进入了 coding。

题目是 pagination（分页），一亩三分地上出现过。

难点不在算法本身：

- 题目不会告诉你需要实现哪些 function
- 也不会给出每个 function 的 input 和 output
- 面试官想看的是候选人如何自己定义这套 pagination 接口

候选人当时按 OOD 的思路设计，但没能在规定时间内写完。

### Onsite System Design：首页实时价格

设计 Coinbase 的 explore 页面（`https://www.coinbase.com/explore`），实时显示每种 crypto 的价格。

考察重点是：**如何将价格变动 realtime stream 到客户端**。

这道题属于常见的老题。面试过程中，候选人提出几个需求澄清问题时，面试官没有回应，而是在自己打字，这种情况出现了多次。

### Onsite BQ

BQ 轮除了常规行为问题外，还会追问技术细节。这一轮面试官投入程度和认真程度明显高于前面几轮。

## 面试体验总结

候选人的主要感受：

- Coinbase 的 coding 轮完全可以用 OA 的形式替代，现场面试反而额外占用面试官时间和开销
- OA 至少有 test case，写错能立刻知道原因；而 onsite 的 coding 轮一个 test case 都没有
- 各轮之间体验差异很大，比较依赖面试官个人的准备程度和状态

## 面试结果反馈

- **最终结果**：无结果（HR 失联，未收到任何反馈）

<ReferenceSource
:sources="[
{
title: 'coinbase SWE OA + Onsite',
link: 'https://www.1point3acres.com/bbs/thread-1161073-1-1.html',
site: '一亩三分地',
author: '匿名用户-PFBTW',
date: '2026-01-13',
category: '海外面经'
}
]"
/>
