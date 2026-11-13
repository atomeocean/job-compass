---
title: 27 Summer PhD SDE Intern 电面
description: Google PhD SDE Intern 技术电面面试经验
outline: deep
createdDate: 2026-11-13
lastUpdated: 2026-11-13
---
# Google PhD SDE Intern 技术电面面试经验

<InterviewDetail />

## 面试详情

第一轮被鸽了，先面的第二个，整体不算难。好像我的方法和标准的不太一样，白男面试官稍微花了点时间理解。

### 技术电面

大概是说给两个 int sequences 作为输入:

```text
1, 2, 15, 8

2, 4, 7, 8
```

目标是判断能否将它们合并成一个不包含重复数字的单一序列，同时保持每个原始序列中数字的先后相对顺序不变。

稍微 clarify 一下就可以做了，也没问时空复杂度。

后面追问 under what condition is the consolidation unique, what signle line in your loop would you change to check？

然后问怎么得到 lexicographically minimal sequence，并修改代码。

最后口述[[1,2],[1,2]]的代码流程

<ReferenceSource
:sources="[
{
title: 'Google 27 Summer PhD SDE Intern',
link: 'https://www.1point3acres.com/bbs/thread-1196635-1-1.html',
site: '一亩三分地',
author: 'BUILDERlym',
date: '2026-11-11',
category: '海外面经'
}
]"
/>