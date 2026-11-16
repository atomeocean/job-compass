---
title: Mid Level Onsite面经
description: Microsoft Mid Level 码农类General Onsite面试经验
outline: deep
createdDate: 2026-11-16
lastUpdated: 2026-11-16
---
# Microsoft Mid Level 码农类General Onsite面试经验

<InterviewDetail />

## 面试详情

### 第一轮

1. [Valid parenthesis](https://leetcode.com/problems/valid-parentheses/)
2. Build the subsequences """ **题目**：Build the Subsequences

**描述**：子序列是从字符串中删除零个或多个字符、同时保持字符原有顺序得到的。
你的任务是生成给定字符串所有子序列组成的数组，按字母升序排列，省略空字符串。

**函数签名**：def buildSubsequences(s: str) -> List[str]:

**参数**：
- s (str)：一个由互不相同的小写英文字母组成的字符串

**返回**：
- List[str]：一个字符串数组，包含给定字符串所有非空子序列，按字母升序排列

**约束**：
- 1 <= len(s) <= 16
- s 是一个由互不相同的小写英文字母 (a-z) 组成的字符串

**示例**：输入：s = "xyz"
输出：['x', 'xy', 'xyz', 'xz', 'y', 'yz', 'z']

**解释**："xyz" 所有非空子序列按字典序排列为：'x', 'xy', 'xyz', 'xz', 'y', 'yz', 'z' """

### 第二轮

1. [Valid parenthesis](https://leetcode.com/problems/valid-parentheses/) - 快速检查是偶数还是奇数。
2. Behavioural

### 第三轮
1. [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**Followups**：
1. 返回这个子串
2. 时间复杂度从 2N 降到 N。（记录 index）

### 第四轮：System Design

设计 data aggregation。
1. C 从 System A 获取（profile info）要 500ms。
2. C 从 System B 获取（Order info）要 500ms
3. 要获取 B，需要 A 的 profile info。

Nonfunct req
1. Latency < 500ms，用来服务 System C 的客户端。
2. 引入新的 System D 时可扩展。

**我的回答**：鉴于 latency 要求，不能按顺序调用。但也不能并行调用。设计 ETL 把数据加载进我们的 DB，并聚合所有需要的数据（取决于 use case，整个数据集或者预取客户端发起的调用）。Poll vs Push（推荐）SNS, SQS, Workers。

Scaling
1. Regional scaling
2. Horizontal scaling
3. Failover (AZs)

**Ops**：
1. Success、failure、latency 的 metrics 和 monitors。整体和客户端级别都要。
2. 用 Change data capture 做数据校验
3. 如果数据新鲜度很关键，监控延迟的 ETL。

<ReferenceSource
:sources="[
{
title: 'Microsoft - Onsite - Mid Level - 有具体题目',
link: 'https://www.1point3acres.com/bbs/thread-1197083-1-1.html',
site: '一亩三分地',
author: '背头乌亮的烤土司',
date: '2026-11-14',
category: '海外面经'
}
]"
/>