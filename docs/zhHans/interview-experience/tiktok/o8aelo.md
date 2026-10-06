---
title: TikTok MLE 两轮技术面
description: TikTok MLE NG 面经
date: 2025-03-09
company: TikTok
position: Machine Learning Engineer
result: Rejected
createdDate: 2026-10-01
lastUpdated: 2026-10-06
outline: deep
---
# TikTok MLE 面试经验（两轮技术面）

<InterviewDetail />

## 基本信息
- **公司信息**：[TikTok](https://careers.tiktok.com/)
- **岗位**：Machine Learning Engineer (CV/NLP/Multimodal/LLM)，New Grad
- **地点**：San Jose 或 Bellevue，onsite
- **面试时间**：2025年3月

## 面试过程

### 投递和筛选
网申通过后，recruiter 先发邮件做了一轮书面筛选，都是常规问题：毕业和可入职时间、现在的雇主、最早入职日期、能不能 relocate、能不能接受每周 4 到 5 天到办公室，以及工作身份和是否需要 sponsor。

### 第一轮：技术面（Lark 视频，45 到 60 分钟）
recruiter 提前说明了前两轮的结构（两轮一样），也发了一份准备文档，每轮分三块：
1. 项目讨论：围绕简历上的项目，结合领域知识和 ML 基础、算法问题。

   讲了一些之前做prompt engineering的项目经历，面试官觉得很trivial。他们这个岗是想找一些电商审核，需要有一些处理视频的经验。
2. Coding：难度大概 LeetCode medium（难度参考：[200. 岛屿数量 Number of Islands](https://leetcode.com/problems/number-of-islands/)，用 DFS/BFS 遍历网格），再加一些 CS 基础。

大概五天后收到 positive feedback，进入第二轮。

### 第二轮：技术面（Lark 视频，约 60 分钟）
还是同样的三块：项目讨论、Coding 加 CS 基础、工作经历，ai知识。但是问的更深更详细。
面试官有问到各种attention mechanism，具体公式，维度相关的问题。听说别的岗也有要把attention写出来的。
还问了一些别的LLM相关的基础知识，normalization layer，regularization，skip-connection之类的问题。

第二轮结束后大概五天收到拒信。

## 一些建议
- 项目要能从头讲到尾：问题、数据、模型选择、评估方式、如果重做会改什么。也要准备好被追问每个选择背后的基础知识。
- 按岗位方向复习基础：CV/NLP/多模态岗，把主要模型族和训练基础过一遍，能比较不同方法，而不只是报名字。
- Coding 是常规难度，在共享编辑器里写干净，边写边讲思路，写完自己测一下。tiktok要求比较严，一般必须结果跑对才能通过。
- 后面的轮次可能排得很紧，前一轮反馈不好会直接取消后面的轮次，最好第一轮之前就把所有轮次都准备好。
- 多问 recruiter 每一轮考什么，一般都会说明结构，还会发准备文档。
