---
title: Compass SDE VO 技术面
description: Compass SDE VO Technical 面试经验
outline: deep
---
# Compass SDE VO 技术面

<InterviewDetail />

## 面试过程

面试题目的框架是LC上的word break，也就是给一个target string 和一个word list，问能不能用list里的词拼出target string（可以复用），原版的思路应该是用dp把target根据index切分，然后遍历list寻找可行性。

面试的题目改了使用条件，给出的word list是exhaustive，也就是list里每个词只能用一次。这样用dp就很难记录每个index的具体用词情况，必须转用backtracking，保存word使用情况，同时遍历所有可能性。具体流程就是先用counter统计word list，然后走经典backtrack流程把word list尝试一一代入。

写完之后简单要求加了几个test case，然后问了一些edge case比如null、empty string、space等等，也做了简单的复杂度分析，总体沟通比较顺畅，流程也比较标准，面试过程中面试官给的feedback不会很多，要自己把握节奏。

## 面试结果反馈

- **最终结果**：Rejected
