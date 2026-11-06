---
title: MLE 电面面经
description: Stripe Machine Learning Engineer 技术电面面试经验
outline: deep
createdDate: 2026-11-06
lastUpdated: 2026-11-06
---
# Stripe Machine Learning Engineer 技术电面面试经验

<InterviewDetail />

## 面试详情

- **面试形式**：技术电面

最近面的 Stripe MLE，两轮电面都过了，等 onsite。这是我第一次面 MLE，对我来说也是个挑战。

### 第一轮：coding

题是给一堆 account，每个 account 有一些 metadata，找相似的 account。

前两问比较基础：遍历 list，两两比对 metadata，字段对上了（比如姓名等）就判定是同一个人的 account。

第三问是传递性：如果 A 和 B 相关，B 和 C 相关，那 A 和 C 也算相关的，就算 A 和 C 本身没有直接对上。这问就是标准的间接关联，BFS / Union-Find 找连通块的思路。

### 第二轮：ML Integration

地里这一轮说得比较少，但感觉题库应该就是那一个：给一个数据集，很像 Kaggle 竞赛那种，让你从头做一遍。

重点不在模型，模型本身随便用个 Random Forest 就够了，重点在数据处理：先做 EDA 和 preprocessing，检查数据有没有缺失、怎么做 imputing、异常值怎么处理。

面试官具体抠的点有两个：一是检查 DataFrame 在某一个 key 或者某两个 key 上有没有重复；二是类别特征怎么做 one-hot encoding，缺失值怎么处理。

做完模型之后追问了不少 model evaluation 的东西，包括 recall、precision、AUC，还详细问了 calibration，calibration 具体怎么做。

## 面试体验

两个面试官都特别好，是我面到感觉最好的，非常耐心，会给提示，还帮忙写了些 boilerplate code，帮我加快测试。

## 面试建议

给后面面的人一点建议：Integration 这轮把 Kaggle 那种题刷好就行。

<ReferenceSource
:sources="[
{
title: 'Stripe MLE 电面面经（两轮，过了，求米）',
link: 'https://www.1point3acres.com/bbs/thread-1195972-1-1.html',
site: '一亩三分地',
author: '匿名用户-YTI5A',
date: '2026-11-05',
category: '海外面经'
}
]"
/>