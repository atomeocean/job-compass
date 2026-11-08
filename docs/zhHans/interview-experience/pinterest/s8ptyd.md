---
title: Sr. MLE onsite挂经
description: Pinterest Senior Machine Learning Engineer Onsite面试经验
outline: deep
createdDate: 2026-11-07
lastUpdated: 2026-11-07
---
# Pinterest Senior Machine Learning Engineer Onsite面试经验

<InterviewDetail />

## 面试详情

大家好，我上个月参加了 Pinterest Sr. MLE 职位的 onsite loop。我没有拿到 offer，但我还是想在这里分享我的经历，这样可以帮到其他人。

### Timeline

Screening round - 8 月最后一周 - 1 小时单轮

Onsite round - 分两天 - 9 月中旬

- Day 1 - Coding
  - 2 轮
- Day 2
  - HM interview - behavioral
  - ML practitioner
  - ML system design

拒信 - 最后一轮 onsite 一周后

### Screening：Coding

问了 project explainer，10 分钟，
3 个 ML 问题，10 分钟（快问快答），
然后是 2 道互相关联的 coding 题 + 加分 coding 题（也是相关的）

- DFS 题（分 2 部分）
- 可选的 Bonus question - 一个有 DP 解法的 follow-up（只讨论了思路，没要求写代码）

### Onsite

#### Coding #1

- 我被要求实现一个我知道但之前没练过的数据结构（不在 Pinterest 或 Meta 的近期题目列表里）
- 我在这一轮很挣扎，不是因为我不知道需要做什么，而是因为这是我的第一次 onsite，我因为紧张搞砸了

#### Coding #2

- 另一家公司（Meta）的一道 top-100 题目的简单变形。即使你之前没见过这道题也很容易做。数组类题目。
- 我这轮做得很好。还解出并写完了一个可选的 follow-up

#### HM interview

- HM 很资深，所以他没有直接把发言权交给我、让我复述练好的关于我经历的独白。我觉得我表现还行，但比我在其他 HM 面试里显得没那么出彩。
- 总体来说，重点包括常规的 senior 内容，即 cross functional communication、mentoring、一个 technical depth 类的故事、conflict resolution。但我注意到，和大型科技公司不同，Pinterest 似乎也在意工程相关的细节。比如，有一次我被问到我的 tech stack 是什么——这个我没有准备，但我还是给出了一些回答——他看起来对我说的不太满意。

#### ML practitioner

- 这一轮让我很意外。我原本以为这会是另一轮 design。可能是 recruiter 和我之间有些沟通误会，但就被问到的内容而言，我是毫无准备地进了这一轮。这是一个分 2 部分的面试。
- 在第一部分，面试官想讨论我的某篇研究论文。我已经在业界工作 5 年了，我的大部分论文是 5 年多前读研时写的。我跟他们说了这一点，想表达讨论 5 年多前的东西和我的业界经验有点不相关。但他们似乎还是想讨论，我觉得这有点奇怪，不过我挑了一篇他们似乎喜欢的论文，带他们过了一遍解决方案的主要思路/架构。他们似乎能跟上，并对回答感到满意。
- 他们想知道问题定义、解决方案的直觉、模型架构，以及研究中实现的 baseline 方法的一些细节。
- 在面试的第二部分，他们问了我 ML 话题的细节。有些问题比 ML 课程里会讨论的更具体。
- 例如，我被要求解释 transformer 架构，这在现在是标准的。但我也被要求解释 contrastive loss，这个我知道，但我认为不算标准。然后还有关于 learning to rank 算法的问题，这个我只知道表层细节。
- 总的来说，我觉得我在这一轮表现高于平均，但我在 ML 话题上错过了 1-2 个问题。

#### ML system design

这是一道标准的 ML system design 题。我推荐大家做一套标准的这类题目，包括其中的所有细节。我跟的是这个 - https://bytebytego.com/intro/machine-learning-system-design-interview

与其做更多的 case study，我推荐把所有 case study 都理解到足够的深度。你在设计中说的每一个细节，你都应该了解它周边的细节。例如，我在做 ML design 资料里的 similarity search 类 case study 之前并不知道 contrastive learning。

## 面试体验

总的来说，我发现 Pinterest 面试官的深度比我参加的另外 2 个 onsite（一个 FAANG，另一个是给 FAANG 级薪资的中型公司）更高。

manager 和其他面试官也都很好相处，所以我猜这是个工作的好地方。

祝大家好运！我希望这能帮助大家准备面试！

## 面试结果反馈

我没有收到明确的反馈，但我认为第一轮 coding 搞砸了我的机会。

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
