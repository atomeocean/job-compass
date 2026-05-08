---
title: Bloomberg SWE 面经
description: Bloomberg SWE面试经验分享
createdDate: 2026-05-08
lastUpdated: 2026-05-08
outline: deep
---
# Bloomberg公司SWE面试经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **面试岗位**：Software Engineer
- **岗位级别**：New Grad
- **学历背景**：本科
- **工作类型**：全职
- **投递方式**：网上海投
- **面试形式**：技术电面
- **当前状态**：应届毕业生

## 面试详情

最近在准备 bbg，按地里高频和自己 mock 的流程整理了一下面经，给后面准备开花堡的同学一点参考。不是正经 offer 贴，主要是记录一下技术面会被怎么拷打

背景：NG / SWE，投的是 NYC。整体感觉 bbg 的 technical 不是那种上来就硬塞很偏的题，更多是看你能不能把思路讲清楚，边写边沟通。面试官会追问很多 tradeoff，所以别光闷头写。

Timeline 大概是：投递后两周左右收到 recruiter 邮件约了一个 60min technical phone screen平台是 Hackerrank / 类似在线编辑器，不要求一定跑通但最好自己写 test case

### 第一轮 简历

一开始 5-10min 简单聊简历。问了我最近一个 project，主要追问：
- 数据是怎么存的 
- 为什么选这个 design 
- 如果 QPS 上去怎么改 
- 有没有遇到过 prod issue / bug

这里感觉不用讲得特别花，重点是别背稿。我说了一个 cache + db 的小项目，面试官追问 cache invalidation，我卡了一下，但后来补了 TTL 和 event-based invalidate 两种方案，他点了点头。

### 第二轮 coding

Coding 题是类似 log aggregation / sliding window 的题。

大概意思：给一堆 request logs，每条 log 有 timestamp 和 userId，要求实现一个 class，支持：
- `add(timestamp, userId)`
- `getActiveUsers(currentTimestamp)`

active user 定义是过去5分钟内出现过的user。follow up 是如果同一个 user 在窗口里出现很多次怎么办，以及 timestamp 是不是一定递增。

我一开始想用 queue 存所有 event，再用 hashmap 记录 user 出现次数。每次 get 的时候把过期的 log 从 queue 里 pop 掉，同时 decrement hashmap 里的 count，如果 count 变成0就删掉。这样 getActiveUsers 直接返回hashmap size。

复杂度：`add O(1)` `get O(k)`，k 是这次被清掉的过期log数量，space O(n)，n是窗口内log数

面试官问了几个 follow up：

如果 timestamp 不递增怎么办我说 queue 就不够了，可以用 TreeMap / balanced BST 按 timestamp 存 bucket，每个 bucket 里面存 user count。清理的时候扫 timestamp 小于 current - 300 的部分。

如果数据量很大，单机放不下怎么办我说可以按 userId hash 分 shard，每个 shard 维护自己的 window，最后 aggregate active user count。这里要小心 distinct user，如果同一个 user 一定只去一个 shard，那就不会 double count。

如果 getActiveUsers 调用非常频繁怎么办我说可以 lazy cleanup + cache last result，但 currentTimestamp 变化会影响窗口，所以 cache 只能短时间有效。也可以定期 background cleanup，不过面试代码里没必要搞复杂。

代码写得还算顺，bug 出在边界条件。我一开始写的是 timestamp < current - 300 才删，面试官问如果刚好 300 秒算不算 active，我才意识到要先确认定义。最后按 inclusive window 改了一下。

第二题没完整写，是一个简化版股票价格 stream：update(stock, price) topK(k)。我讲了 heap + hashmap lazy deletion，也提了如果 update 很频繁，heap 会有很多 stale entry，需要 pop 的时候检查 current price。面试官主要听思路，没有让我全部敲完。

## 面试结果反馈

**面试体感**: 面试官人挺nice，但不会直接给答案。感觉 bbg 很看沟通，尤其是你发现 edge case 后怎么修。题不算变态，但是 follow up 会一直往系统一点的方向推。

**准备建议：**

高频 LC medium 还是要刷，尤其是 hashmap / queue / heap / tree map，练习边写边说，不要沉默太久

每道题先问清楚 timestamp、duplicate、window inclusive/exclusive 这种细节

写完主动跑 test case，哪怕只是口头 dry run

目前还在等结果，不知道能不能过

<ReferenceSource
:sources="[
{
title: 'Bloomberg 面经',
link: 'https://www.1point3acres.com/bbs/thread-1175450-1-1.html',
site: '一亩三分地',
author: '匿名用户-5HVXW',
date: '2026-05-03',
category: '海外面经'
}
]"
/>