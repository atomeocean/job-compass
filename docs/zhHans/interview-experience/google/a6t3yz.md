---
title: tech phone interview
description: Google技术电面面试经验
outline: deep
---
# Google技术电面面试经验

<InterviewDetail />

## 面试详情

### 第一轮：BQ

有没有过conflict，如果team有人和你work style不一样会怎么处理，conflict，有team里的人不involve怎么办，task太多做不完怎么办

### 第二轮：coding

There are n machines labeled 1 to n, and a list of existing bidirectional connections. A message can travel at most ttl hops.

Return the minimum number of new connections needed so that every pair of machines can reach each other within ttl hops.

Example 1: Input: n = 4, connections = [[1, 2], [2, 3]], ttl = 1 Output: 4 Explanation: With ttl = 1, every pair of machines must be directly connected. A fully connected network of 4 machines needs 4 * 3 / 2 = 6 connections. 2 already exist, so we need 4 more: (1, 3), (1, 4), (2, 4), (3, 4).

**Follow-up**: There is no TTL limit. Return the minimum number of new connections needed so that all machines are connected.

Example 2: Input: n = 4, connections = [[1, 2], [2, 3]] Output: 1 Explanation: Machines {1, 2, 3} are already connected, and machine 4 is isolated. There are 2 connected components, so we need 2 - 1 = 1 new connection, for example (3, 4).

第二个coding烙应小哥面试官合作不很smooth，example也不给，我只能自己写了问对不对，他很多时候不说对也不说不对，问才说不对，我又写一个他又说不对，也不告诉我哪里不对，花了很多时间，最后问他才给我一个example。 然后说我iterate through connections，然后判断需要多少connections， 他说太复杂，有更simple solution，我要个提醒他提醒我再读一遍题 :) 。。。 光第一问就花了30min，一共45min面试。

第二问union find也不知道写对没，google doc写的，错了也很难检查的出来，写完他说有minor bug 由于时间很紧，我也不知道改对没。。问答环节也是只会说yes/no，我问AI adoption他说good，我得继续问有多good。。。

## 面试结果反馈

- **最终结果**：Other
- **面试形式**：技术电面
- **申请背景**：在职跳槽

<ReferenceSource
:sources="[
{
title: '🐶家tech phone',
link: 'https://www.1point3acres.com/bbs/thread-1194054-1-1.html',
site: '一亩三分地',
author: '匿名用户-JVJQO',
date: '2026-10-22',
category: '海外面经'
}
]"
/>