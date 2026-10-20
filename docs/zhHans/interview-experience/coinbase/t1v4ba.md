---
title: 电面
description: Coinbase Software Engineer 电面面试经验
outline: deep
createdDate: 2026-10-20
lastUpdated: 2026-10-20
---
# Coinbase Software Engineer 电面面试经验

<InterviewDetail />

## 面试详情

是那个从 mempool 里挑交易打包的题，之前没怎么碰过这块，刚读题的时候有点懵。

### 第一问

第一问给一个没排序的交易数组，每笔有 id、fee、size。block 容量固定是 100，要挑一些交易放进去，总 size 不能超，收的 fee 尽量多，返回选中的交易。题里专门写了 mempool 会很大，更关心跑得快，不要求一定找到最优解。这个条件最好先看清楚，容易一上来就往背包上想。

### 第二问

第二问给交易加了 parent ID。要选一笔 child，必须先把它的 parent 放进同一个 block，返回顺序也得 parent 在前。如果没有 parent ID，就表示它的 parent 已经被挖过了，不需要再管。

然后就是 CPFP，child pays for parent。大概意思是 parent 自己给的 fee 很低，单独看不值得选，但 child 愿意多给钱，把它们放一起看可能就划算了。所以不能只盯着 child 自己的 fee，还得把它依赖的 parent 的 fee 和 size 一起考虑。

这个依赖还可能往上有好几层，不保证只有一对父子，不过题目保证没有环。选了 child 就得连着它需要的那串一起装进去，总容量还是不能超过 100。我觉得这部分比第一问绕多了，看起来只加了一个字段，要考虑的东西一下就多了。

### Optional

最后题面还挂了个 optional，给定 parent ID 和一个 child 的 size，问这个 child 至少要付多少 fee，才能让自己和 parent 进下一个 block。这部分标了 strictly optional，我就先顾前面的了。

## 面试体验

等后续消息，顺便求米求米看面经。感觉至少要提前知道 CPFP 是什么，不然现场读那段英文题意还挺费时间的。

## 面试结果反馈

- **最终结果**：等待中

<ReferenceSource
:sources="[
{
title: 'Coinbase 电面',
link: 'https://www.1point3acres.com/bbs/thread-1193765-1-1.html',
site: '一亩三分地',
author: '匿名用户-BEGXU',
date: '2026-10-20',
category: '海外面经'
}
]"
/>