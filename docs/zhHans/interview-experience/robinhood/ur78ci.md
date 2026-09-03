---
title: SDE
createdDate: 2026-09-02
lastUpdated: 2026-09-03
outline: deep
---
# Robinhood SDE 电面经验

## 面试基本信息

- 公司信息：[Robinhood](https://careers.robinhood.com/)
- 面试时间：2026年Q2


<InterviewDetail />

## 面试过程

Robinhood SDE 岗位第一轮technical店面，一道题目，45分钟内完成+反问。题目不是LC原题，他们家有自己题库。

题目大概内容是每个用户有referral relationship，并且自己refer的用户再refer的新用户也会积累到自己的refer credit里。
要求是完成一个动态更新的referral credit leaderboard

基本思路就是graph + topological sort那一套，然后用heap存储leaderboard信息。

完成题目之后会追问实现细节和复杂度优化，之后就是常规问面试官问题。总体面试流程和沟通比较顺畅，之后拿到了下一步onsite。
