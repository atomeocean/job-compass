---
title: Senior SWE 电面
description: Cresta Senior Software Engineer 技术电面面试经验
outline: deep
createdDate: 2026-11-25
lastUpdated: 2026-11-25
---
# Cresta Senior Software Engineer 技术电面面试经验

<InterviewDetail />

## 面试详情

刚面完 Cresta 第一轮 coding，来回报一下。岗位是 Senior Software Engineer，recruiter call 之后是两轮 coding，每轮一小时，这轮是 problem solving 那轮。

### 第一轮：Coding（Problem Solving）

题目是这样的：给一个 dict，key 是 agent，value 是这个 agent 的 active periods，每个 period 是 [start, end, chats]，start 和 end 都包含。任意时间 t 的 load 就是所有包含 t 的 period 的 chats 加起来。求最大的 load，还有出现这个最大 load 的一个时间。

我是这么想的：sweep line。先把 dict 拍平成 intervals，然后每个 interval 在 start 加 chats，在 end+1 减 chats，因为 end 是包含的。排好序扫一遍，记当前 load 和最大值就行。

```text
changes = sorted map from time to load change
for each [start, end, load]:
    changes[start] += load
    changes[end + 1] -= load
currentLoad = 0
maximumLoad = 0
bestTime = none
for each (time, change) in changes in ascending order:
    currentLoad += change
    if currentLoad > maximumLoad:
        maximumLoad = currentLoad
        bestTime = time
return maximumLoad and bestTime
```

注意两点：end 是包含的，所以减在 end+1；比较用严格大于，tie 的时候留最早的时间。

## 面试结果反馈


结果还没出，出了再来更新。求大米，谢谢。

<ReferenceSource
:sources="[
{
title: 'Cresta Senior Software Engineer 电面面经',
link: 'https://www.1point3acres.com/bbs/thread-1197443-1-1.html',
site: '一亩三分地',
author: 'jacksonshuati',
date: '2026-11-17',
category: '海外面经'
}
]"
/>