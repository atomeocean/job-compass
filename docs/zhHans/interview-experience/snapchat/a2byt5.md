---
title: Security Engineer（IAM方向）L4 一面
description: Snap L4 Security Engineer 电面面试经验
outline: deep
---
# Snap L4 Security Engineer 电面面试经验

<InterviewDetail />

## 面试详情

- **岗位方向**：IAM
- **面试时长**：1 小时
- **面试平台**：HackerRank CodePair

我看地里没人提过 Snap 的 Security Engineer 面试情况，刚刚面了第一轮，来分享一下信息。
面试总共 1 小时。

### 第一轮：技术电面

第一轮主要分为：5 分钟自我介绍、behavior、25 分钟 IAM domain knowledge、大概 25 分钟 coding，以及 5 分钟 Q&A。

**IAM 部分**：

主要问了 identity onboarding/offboarding lifecycle，比如新员工入职怎么 provision access、怎么设置 permissions、员工离职后怎么 revoke access 等。还有一些相关的 IAM 基础和实际场景问题，整体偏 practical。

**Coding 部分**：

用 HackerRank CodePair。（写的时候不小心误触了一下 MacBook 的切换窗口键，不知道会不会在 HackerRank 后台有影响。）但是面试官没让我 share screen，我问他要不要我 share screen，他说不用。
考的是 [LeetCode 210](https://leetcode.com/problems/course-schedule-ii/)（Course Schedule II），需要用 topological sort。面试官比较注重思路，会一直追问为什么用 topological sorting、brute-force approach 是什么，以及为什么选择当前解法。
最后代码在还有 5 分钟结束的时候写完了。我认为思路是对的，面试官也是淡淡地肯定（看不出态度），但是跑 test case 的时候发现有 bug。
当时只剩 5 分钟，面试官想留时间给 Q&A，所以就没有让我继续 debug。

## 面试体验

目前还不知道结果，感觉 coding 没有完全跑通有点悬，先发出来给大家参考～

## 面试结果反馈

- **最终结果**：暂未出结果

HR当时打电话说，如果通过了，后续的面试还会有AI-assisted coding。如果有人做过 Snap 家的 AI-assisted coding，也可以交流。

<ReferenceSource
:sources="[
{
title: '分享一个 Snap Security Engineer（IAM方向）L4 的一面面经',
link: 'https://www.1point3acres.com/bbs/thread-1194018-1-1.html',
site: '一亩三分地',
author: '匿名用户-OI2WW',
date: '2026-10-22',
category: '海外面经'
}
]"
/>