---
title: MLE L4 Onsite 过经
description: Snapchat Machine Learning Engineer L4 Onsite 面试经验
outline: deep
createdDate: 2026-11-03
lastUpdated: 2026-11-03
---
# Snapchat Machine Learning Engineer L4 Onsite 面试经验

<InterviewDetail />

## 面试详情

- **每轮时长**：1 小时，其中 10 到 15 分钟是 behavioral case
- **加面**：debrief 之后加了一轮 system design

### 第一轮：ML Fundamentals

- 列举你知道的 optimizer
- offline evaluation metrics：Snapchat 用的是 Normalized Entropy（NE）
- confusion matrix：每个格子分别叫什么（true positive、true negative 等）
- model calibration
- 如何解决 model over-fit

评论区补充：calibration 这块，我其实用 logistic regression 就可以，面试官说实际上就是这样做的，效果比 isotonic regression 还要好。

### 第二轮：Coding

数组的前一部分严格单调递增，后一部分单调递减，用 binary search 找到数组的峰值。

Follow-up：如果数组不是严格单调（有相等的元素），还能用 binary search 吗？我的回答是不能。

评论区补充：这一轮可以用 AI 辅助 coding，但题目很简单，基本不需要用 AI。

### 第三轮：System Design

设计一个视频推荐系统，问到：

- 数据流是什么样的
- two tower 模型多久更新一次
- 如何从 data log 里拿到 label 和 feature
- serving 是什么样的

### 第四轮：Applied ML

同样是设计一个视频推荐系统，问到 MMOE（target 和 loss 是什么样的），以及 offline evaluation metrics。

### 第五轮（加面）：System Design

设计一个有害内容识别（harmful content identification）系统。

下方评论区补充：

每轮1小时，行为案例10-15分钟。有害内容检测设计轮询问了如何获取标签、延迟（约1分钟）、人工标注、模型部署方式以及特征呈现方式等问题。

关于 content safety 的 precision 和 recall，面试官提到可以做线下 annotation。不能把所有内容都 label 成坏的，那样广告就不赚钱了。所以结论是 recall 很重要，可以先保证 recall，再通过线下 annotation 提升 precision。但这里有 tradeoff，不能太 aggressive，以至于大部分广告都不能赚钱。

数据流我按照两路讲：app 的 streaming data 经过 Kafka 之后，一路由 Flink 处理，生成 online feature；另一路由 Spark 生成按小时分区的 batch data。

## 面试结果反馈

debrief 之后先加面一轮 system design（第五轮），加面之后通过，进入 team match 阶段。

<ReferenceSource
:sources="[
{
title: 'snapchat MLE L4 onsite 过经',
link: 'https://www.1point3acres.com/bbs/thread-1195213-1-1.html',
site: '一亩三分地',
author: '匿名用户-EEFHZ',
date: '2026-10-30',
category: '海外面经'
}
]"
/>
