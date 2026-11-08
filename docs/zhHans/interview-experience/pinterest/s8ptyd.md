---
title: Sr. MLE Onsite 挂经
description: Pinterest Senior Machine Learning Engineer 店面加两天 Onsite（Coding、HM、ML Practitioner、ML 系统设计）面经，最终未拿到 offer
outline: deep
---
# 美国Pinterest公司高级机器学习工程师面试经验

<InterviewDetail />

## 面试详情

- **面试形式**：店面 1 轮 + Onsite 5 轮（分两天）
- **候选人背景**：业界工作约 5 年，论文多发表于研究生阶段

### 面试流程

- **店面**：8 月最后一周，单轮 1 小时
- **Onsite**：9 月中旬，分两天进行
  - 第一天：Coding × 2
  - 第二天：HM 面（Behavioral）、ML Practitioner、ML System Design
- **结果**：最后一轮 Onsite 结束一周后收到拒信

### 面试过程的详细描述

#### 店面：Coding

- 先花 10 分钟介绍项目
- 接着 10 分钟快问快答 3 道 ML 问题
- 最后是 2 道互相关联的 Coding 题，外加 1 道（同样相关的）加分题：
  - 一道 DFS 题，分两问
  - 可选加分题是 follow-up，有 DP 解法，只讨论了思路，没要求写代码

#### Onsite 第一天 第 1 轮：Coding

- 要求实现一个数据结构。楼主知道这个数据结构，但之前没练过，它也不在 Pinterest 或 Meta 的近期题单上
- 楼主表示这轮发挥不好：并不是不知道该怎么做，而是第一次 Onsite 太紧张，没发挥出来

#### Onsite 第一天 第 2 轮：Coding

- 一道 Meta Top 100 高频题的简单变形，数组类题目；就算没见过原题也不难
- 楼主这轮发挥不错，还做完并写出了可选的 follow-up

#### Onsite 第二天：HM 面（Behavioral）

- HM 经验很丰富，不会让候选人照着准备好的稿子一直讲自己的经历。楼主自认表现还行，但不如自己在其他 HM 面里出彩
- 考察重点是常规的 senior 话题：跨团队沟通、带人（mentoring）、一个技术深度类故事、冲突处理
- 楼主注意到，和大厂不同，Pinterest 也很在意工程细节。比如被问到自己的技术栈是什么——楼主没准备这个问题，临场给了个回答，HM 看起来不太满意

#### Onsite 第二天：ML Practitioner

楼主原本以为这轮是另一场设计面，结果完全出乎意料，可能是和 recruiter 之间有沟通误会，没有针对性准备。这轮分两部分：

- **第一部分：聊自己的论文**
  - 面试官想讨论楼主发表过的研究论文。楼主已在业界工作 5 年，论文大多是 5 年多前读研时写的，楼主说明了这些和业界经历关系不大，但面试官仍想聊
  - 楼主挑了一篇面试官比较感兴趣的，讲了解决方案的核心思路和架构，面试官能跟上，也比较满意
  - 面试官关心：问题定义、解法的直觉、模型架构，以及论文中 baseline 方法的一些细节
- **第二部分：ML 知识细节**
  - 有些问题比一般 ML 课程讲得更细
  - 例如：解释 Transformer 架构（现在比较常规）；解释对比损失（contrastive loss），楼主会但觉得不算常规考点；还有 Learning to Rank 算法相关问题，楼主只了解表层
- 楼主自评这轮高于平均水平，但 ML 知识部分有 1–2 题没答上

#### Onsite 第二天：ML System Design

- 一道标准的 ML 系统设计题
- 楼主建议把一套标准题目及其中的所有细节都过一遍，楼主用的是 ByteByteGo 的 [Machine Learning System Design Interview](https://bytebytego.com/intro/machine-learning-system-design-interview)
- 与其多刷案例，不如把每个案例都吃透：设计中提到的每个细节，都要能展开讲。比如楼主就是在做相似度搜索类案例时才学到对比学习的

### 和面试官沟通细节

- 楼主觉得 Pinterest 面试官的深度，比自己同期参加的另外两场 Onsite（一家 FAANG、一家给 FAANG 级薪资的中型公司）都要高
- HM 和其他面试官都很好相处，楼主据此推测这是个不错的工作环境

### 面试结果反馈

- 最后一轮 Onsite 一周后收到拒信，没有得到明确反馈
- 楼主认为第一轮 Coding 是挂掉的主要原因

### 备考建议（楼主原文总结）

- ML System Design：系统性地准备一套标准题，重在深度而非数量
- ML Practitioner：提前和 recruiter 确认轮次内容；准备好讲自己的论文，并复习 Transformer、对比学习、Learning to Rank 等较细的 ML 知识点
- HM 面：除了常规 senior 行为题，也要准备好聊自己的技术栈等工程细节

<ReferenceSource
:sources="[
{
title: 'Pinterest Sr. MLE onsite round',
link: 'https://leetcode.com/discuss/post/5984259/',
site: 'LeetCode',
author: '匿名用户',
date: '2024-10-29',
category: '海外面经'
}
]"
/>
