---
title: Software Engineer
description: Uber OA+技术电面经验分享
createdDate: 2026-05-08
lastUpdated: 2026-05-08
outline: deep
---
# Uber公司OA+技术电面经验分享

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **面试岗位**：Software Engineer
- **学历背景**：硕士
- **工作类型**：全职
- **投递方式**：网上海投
- **面试形式**：Online Assessment + 技术电面
- **当前状态**：在职跳槽

## 面试详情

### Online Assessment

使用 HackerRank 平台，面试过程中需要开启摄像头。

**第一题是Jump Game Prime**。Hard level的DP问题。

是lc 1696的变体，跳步规则换成质数条件。卡了一会儿，最后想出来了。

**第二题是Pipeline Throughput**。二分答案。

给串行pipeline，整体throughput是所有服务的最小值。每个服务扩容 x 次后 throughput 变成 t[i] * (1 + x)，成本 x * cost[i]，总预算固定。
二分target，对每个服务算最少扩容次数 x = ceil(target / t[i]) - 1，累加成本判断是否在budget内，单调性很明显。

### 技术电面 coding

店面是lc 362，25分钟搞定。然后聊了10多分钟tradeoff：什么时候clear queue，有没有background thread的处理方式，stale data的情况怎么考虑。题本身没多难，但tradeoff那段聊了挺久，感觉比题本身更重要，可以提前想想这几个角度。

**面试体验:** 两道OA题刷过，确实原题。感觉黑车做完题之后还会聊tradeoff，没想到聊了这么久，可以提前准备一下。

## 面试结果反馈

- **当前状态**：未知

<ReferenceSource
:sources="[
{
title: '黑车oa+店面',
link: 'https://www.1point3acres.com/bbs/thread-1175269-1-1.html',
site: '一亩三分地',
author: '匿名用户-CQLWT',
date: '2026-05-01',
category: '海外面经'
}
]"
/>