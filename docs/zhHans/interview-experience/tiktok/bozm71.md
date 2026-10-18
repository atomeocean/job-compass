---
title: TikTok MLE 电商组面经
description: TikTok Machine Learning Engineer, Ecommerce 面经：书面筛选和第一轮技术面
outline: deep
createdDate: 2026-10-17
lastUpdated: 2026-10-17
---
# TikTok Machine Learning Engineer（电商）面试经验

<InterviewDetail />

## 面试过程

- **团队**：Ecommerce（电商）
- **地点**：San Jose 或 Bellevue，onsite

### 投递和筛选
recruiter 先发邮件做了一轮书面筛选，都是常规问题：找工作的时间线、现在的工作、毕业时间、为什么想来 TikTok、最早入职时间、能不能 relocate 和接受 onsite，以及工作身份和是否需要 sponsor。

回复后大概一周，两轮技术面一起排好了。recruiter 说第二轮是提前排的，第一轮没过就直接取消。

### 第一轮：技术面
recruiter 提前发了准备文档，说明每轮分三块，不同面试官风格会不一样：
1. 项目讨论：围绕简历上的项目，问模型为什么这么选、数据怎么来、效果怎么评估，中间穿插 ML 基础题。

   ML 基础问得比较细，重点是 attention 机制：self-attention 的公式，Q、K、V 每一步的维度，为什么要除以 √d_k，multi-head 有什么用，以及 attention 的计算复杂度和序列长度的关系。还问了样本不平衡怎么处理，这种情况下为什么看 precision、recall 和 AUC，而不是 accuracy。
2. Coding：一道 LeetCode medium（难度参考：[347. 前 K 个高频元素 Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)，用哈希表计数，再用堆或者桶排序取前 K 个），再加一些 CS 基础。
3. 工作经历：过去的项目和背景是否匹配，也会聊到一些 system design。

面完两天收到拒信，第二轮取消，没有具体反馈。

## 一些建议
- Attention 要能从头写出公式，讲清楚每一步矩阵的维度，常见的追问（缩放、multi-head、复杂度）提前想好怎么答。
- Coding 是 medium 左右，哈希表、堆、排序这类常见题要写得熟，写完自己跑一下例子。
- 项目要能讲清楚每个选择背后的原因，被追问时能接到 ML 基础上。
- 两轮虽然一起排好，但第一轮没过第二轮就取消，所以第一轮之前就要把所有内容准备好。
