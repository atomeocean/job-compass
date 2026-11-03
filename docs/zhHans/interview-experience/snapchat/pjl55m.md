---
title: MLE L4 Onsite 过经
description: Snapchat Machine Learning Engineer L4 Onsite 面试经验
outline: deep
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

楼主在回复中补充：calibration 这块，楼主提到其实用 logistic regression 就可以，面试官说实际上就是这样做的，效果比 isotonic regression 还要好。

### 第二轮：Coding

数组的前一部分严格单调递增，后一部分单调递减，用 binary search 找到数组的峰值。

难度参考：[LeetCode 852. Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/)

Follow-up：如果数组不是严格单调（有相等的元素），还能用 binary search 吗？楼主的回答是不能。

楼主在回复中补充：这一轮可以用 AI 辅助 coding，但题目很简单，基本不需要用 AI。

### 第三轮：System Design

设计一个视频推荐系统，问到：

- 数据流是什么样的
- two tower 模型多久更新一次
- 如何从 data log 里拿到 label 和 feature
- serving 是什么样的

### 第四轮：Applied ML

同样是设计一个视频推荐系统，问到 MMOE（target 和 loss 是什么样的），以及 offline evaluation metrics。

### 第五轮（加面）：System Design

设计一个有害内容识别（harmful content identification）系统。楼主在回复中补充，这一轮问到：

- 如何拿到 label
- latency（大约 1 分钟）
- human annotation
- model 如何 serving
- feature 是什么样的

关于 content safety 的 precision 和 recall，面试官提到可以做线下 annotation。不能把所有内容都 label 成坏的，那样广告就不赚钱了。所以结论是 recall 很重要，可以先保证 recall，再通过线下 annotation 提升 precision。但这里有 tradeoff，不能太 aggressive，以至于大部分广告都不能赚钱。

数据流楼主按两路讲：app 的 streaming data 经过 Kafka 之后，一路由 Flink 处理，生成 online feature；另一路由 Spark 生成按小时分区的 batch data。

## 面试结果反馈

debrief 之后先加面一轮 system design（第五轮），加面之后进入 team match 阶段。

## 知识点补充

以下是整理者针对上面各轮考点补充的准备要点，不是原帖内容。

### ML Fundamentals

- **Optimizer**：SGD、Momentum、Adagrad、RMSProp、Adam、AdamW（把 weight decay 和梯度更新解耦）。推荐和广告模型里的稀疏特征，常用 Adagrad 或 FTRL 这类按维度调整学习率的方法。
- **Normalized Entropy**：平均 log loss 除以背景正例率的熵，即 NE = [-(1/N) Σ (y·log p + (1-y)·log(1-p))] / [-(p̄·log p̄ + (1-p̄)·log(1-p̄))]，p̄ 是样本的平均正例率。NE 越小越好；它去掉了正例率本身对 log loss 的影响，方便跨数据集比较。出处是 Facebook 2014 年的论文 *Practical Lessons from Predicting Clicks on Ads at Facebook*。
- **Confusion matrix**：TP（预测正，实际正）、FP（预测正，实际负）、FN（预测负，实际正）、TN（预测负，实际负）。precision = TP/(TP+FP)，recall = TP/(TP+FN)。
- **Calibration**：常见做法是 Platt scaling（在模型输出上再拟合一个 logistic regression）和 isotonic regression。可以用 reliability diagram 或 ECE 检查；广告场景常看预测点击总数和实际点击总数的比值。训练时如果对负样本做了降采样（采样率 w），预测值要校正回 q = p / (p + (1-p)/w)，同样出自上面那篇 Facebook 论文。
- **Over-fit**：L1/L2 正则、dropout、early stopping、增加数据、降低模型容量或减少特征。推荐场景里验证集按时间切分，避免用未来的数据评估。

### Coding

- 严格单调时，比较 arr[mid] 和 arr[mid+1]：arr[mid] < arr[mid+1] 说明峰值在右边，否则峰值在左边（包含 mid），时间复杂度 O(log n)。
- 有相等元素时，arr[mid] == arr[mid+1] 无法判断峰值在哪一侧，例如 [1, 1, 1, 2, 1, 1, 1]，最坏情况只能 O(n) 扫描。

### 视频推荐 System Design

- **Two tower**：user tower 和 item tower 分别得到 embedding，用内积打分；item embedding 离线算好放进 ANN 索引，用于召回。训练常用 in-batch negatives，并做 sampling bias 校正（Google 2019 年的论文 *Sampling-Bias-Corrected Neural Modeling for Large Corpus Item Recommendations*）。
- **更新频率**：模型按天或按小时增量训练，item embedding 和索引定期刷新，新视频需要冷启动方案；user 侧特征实时更新。
- **Label 和 feature**：label 来自曝光日志和行为日志的 join（点击、观看时长、完播、点赞、分享）。feature 要用曝光当时的值，避免 label leakage 和 training-serving skew。
- **Serving**：多路召回（包括 two tower），然后粗排、精排（多目标模型），最后重排（多样性和业务规则）。

### MMOE

- **结构**：多个共享的 expert 网络，每个任务一个 gate（对 expert 输出做 softmax 加权），每个任务再接自己的 tower。出处是 Google 2018 年的 KDD 论文 *Modeling Task Relationships in Multi-task Learning with Multi-gate Mixture-of-Experts*。
- **Target**：视频推荐里常见的任务有点击、观看时长或完播、点赞、分享、关注。
- **Loss**：各任务 loss 的加权和。二分类任务用 binary cross-entropy；观看时长可以用回归 loss，或者 YouTube 2016 年论文 *Deep Neural Networks for YouTube Recommendations* 里的 weighted logistic regression。
- **Offline metrics**：每个任务分别看 AUC 和 NE，排序效果看 recall@K、NDCG。

### 有害内容识别 System Design

- **Label 来源**：用户举报、审核员的处理结果、政策规则命中，再加上主动抽样送标（active learning）。
- **Feature**：多模态内容特征（视频帧和图片 embedding、ASR 转写文本、OCR 文字、标题和描述）、发布者历史、传播和互动信号。
- **架构**：先用轻量的高 recall 模型过滤，再用较重的多模态模型，不确定的样本进人工审核队列；阈值按违规的严重程度分别设定。

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
