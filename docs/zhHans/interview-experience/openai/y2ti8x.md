---
title: MachineLearningEng 挂经
description: Open AI MachineLearningEng技术电面
createdDate: 2026-05-08
lastUpdated: 2026-05-08
outline: deep
authors:
  - name: Sung
---
# Open AI公司 Machine Learning Eng技术电面经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **面试岗位**：Machine Learning Engineer
- **学历背景**：博士
- **工作类型**：全职
- **投递方式**：内推
- **面试形式**：技术电面
- **当前状态**：在职跳槽

## 面试详情

### 第一题

题目背景给定一个`M × N`的二维矩阵，代表一个区域的初始状态。矩阵包含两种状态：
- `X`：已被感染（Active Virus）
- `*`：易感人群（Susceptible / Empty）

**基础规则：** 对于任意状态为 `*` 的格子，如果其 8 个方向邻居中，状态为 `X` 的邻居数量大于等于 `K`，则该格子在下一天变为 `X`。

**终止条件：** 当矩阵状态不再发生变化，即没有新的格子被感染时，模拟停止。

**要求：** 计算需要经过多少天，模拟才会停止。

### Follow Up

在基础规则上加入恢复和免疫机制。规则包括：
- 一个格子变为 `X` 后，必须持续感染状态 `D` 天；
- 在感染满 `D` 天后的次日，状态变为 `I（Immune）`；
- `I` 状态永久免疫，不会再次被感染；
- `I` 状态不具备传染性，计算邻居感染数量时不计入 `X`。

要求：计算经过多少天，矩阵中不再存在任何状态为 `X`，即达到群体免疫。

## 面试结果反馈

- **最终结果**：未通过

后面还有很多，但是我没做到时间到了。不出所料挂了。

<ReferenceSource
:sources="[
{
title: 'OpenAI挂经',
link: 'https://www.1point3acres.com/bbs/thread-1175440-1-1.html',
site: '一亩三分地',
author: 'frankmu88',
date: '2026-05-03',
category: '海外面经'
}
]"
/>