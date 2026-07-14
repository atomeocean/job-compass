---
title: SE
createdDate: 2026-07-14
lastUpdated: 2026-07-14
outline: deep
---
# Google Software Engineer 面试经验

## 面试基本信息

- 公司信息：[Google](https://careers.google.com)
- 面试时间：2026年4-6月

<InterviewDetail />

## 背景

候选人为硕士学历，本次面试为在职跳槽期间进行。

## 面试过程

### Phone Interview

给定化学元素周期表的所有元素符号（Symbols）和一个单词，要求返回使用这些元素符号组成该目标单词的所有可能组合方式的总数。

例如：Physics 可以有以下几种组成方式：

1. P - H - Y - Si - C - S
2. P - H - Y - Si - Cs
3. P - H - Y - S - I - C - S
4. P - H - Y - S - I - Cs

### Onsite Round 1（DSA）

给定 n 个棋手（编号从 0 到 n - 1）以及一组比赛结果 gameResults，其中每个 pair (u, v) 表示选手 u 赢了选手 v。已知排名更靠前的选手（rank 较小的选手）总是会赢。基于此信息完成以下任务：

1. 计算有多少个选手的排名是可以被唯一确定的。
2. 返回这些选手的具体排名。

### Onsite Round 2（DSA）

给定一个钢琴音符序列 notes（用键盘上的整数位置表示）以及一个最大手掌跨度 k（即手掌一次能覆盖的按键范围，最左侧和最右侧按键之间的最大距离）。

手掌可以在不抬起的情况下覆盖跨度k内的多个音符。如果要弹奏的音符超出了当前手掌覆盖的范围，则必须抬手并重新定位。计算弹奏完序列中所有音符所需的最少抬手次数。

例子：

Input: notes = [1, 3, 5, 7, 9, 11], k = 4

Output: 2

解释：

1. 初始位置 1：覆盖按键 1-5（跨度为 4），弹奏音符 1, 3, 5
2. 第一次抬手：移动并覆盖按键 7-11，弹奏音符 7
3. 第二次抬手：弹奏音符 9, 11

## 结果反馈

本轮流程最终结果为 Fail。

## 引用来源

<ReferenceSource
:sources="[
  {
    title: 'Google L4 面经',
    site: '一亩三分地',
    url: https://www.1point3acres.com/interview/thread/1182964
    author: '地里匿名用户',
    date: '2026-07-14',
    category: '面经',
    description: '记录 Google L4 全职面试的 Phone Interview 及两轮 Onsite（均为 DSA）真实经历，结果为 Fail。'
  }
]"
/>
