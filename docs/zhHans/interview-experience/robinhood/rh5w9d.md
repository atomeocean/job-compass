---
title: mid level backend面经
description: Robinhood Mid Level Backend Onsite面试经验
outline: deep
createdDate: 2026-11-05
lastUpdated: 2026-11-05
---
# Robinhood Mid Level Backend Onsite面试经验

<InterviewDetail />

## 面试详情

九月份内推了RH家，Mid level backend general hire。分享下面经回馈地里，求米

### 店面

店面 - Referral count / top3 leaderboard - 地里原题。Topo+DP做法。问了复杂度。有点紧张一开始漏写了一个符号，耽误了几分钟。

### VO 第一轮：PDD

PDD - gpt老师准备2页ppt，给了一些project的数字（SLA，TPS，Timeline），然后配了简要的design图，讲的时候我share screen然后就在上面边讲边画。和面试官说有问题随时打断我。对sync/async，consistency有一些追问。应该会根据你project问一些不同的问题。然后穿插了一两个常规bq（conflict，failure）

### VO 第二轮：SD

SD - Job scheduler，cron job only，at least once delivery。上来先clarify5分钟，确定了requirement，正常SD流程，后面又问了如何monitor和存储log，提了independent watchdog + s3。然后也问了transcation/outbox的优化。基本上跟着gpt老师准备一遍没啥问题

### VO 第三轮：Coding

Coding - Fractional share / inventory原题。面试网炸了，少了十分钟，还好原题。followup是加log，记录系统的变化（比如client 买1 share，log就是RH 卖1 share）一开始写的时候规划好插log的地方，log不用跑，写好就行。

## 面试体验

总体来说，感觉RH出原题的几率很大，建议把几个高频好好准备。PDD和SD和AI仔细过一过。希望大家都顺利考原题。求米许愿TM顺利

<ReferenceSource
:sources="[
{
title: '罗宾汉全套',
link: 'https://www.1point3acres.com/bbs/thread-1195682-1-1.html',
site: '一亩三分地',
author: '匿名用户-MNIAS',
date: '2026-11-05',
category: '海外面经'
}
]"
/>