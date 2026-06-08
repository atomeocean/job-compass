---
title: 电面面经
description: Bloomberg Software Engineer技术电面经验
createdDate: 2026-06-06
lastUpdated: 2026-06-07
outline: deep
---
# Bloomberg Software Engineer技术电面经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **岗位**：Software Engineer
- **面试形式**：技术电面
- **申请渠道**：网上海投
- **候选人背景**：硕士，在职跳槽
- **面试结果**：Pass

## 面试详情

题目背景：

给定一个二维网格，其中包含三种状态：

```text
0 = 空单元格（Empty cell）
1 = 未爆炸气球（Inflated Balloon）
2 = 已爆炸气球（Popped Balloon）
```

规则： 如果一个气球（1）与已经爆炸的气球（2）上下左右相邻，那么它也会爆炸。

### 第一题：判断是否所有气球最终都会爆炸

给定初始网格，判断所有气球是否都能够最终爆炸。

示例：
```text
2 1 1
1 1 0
0 1 1
```

如果爆炸过程能够传播到所有气球，则返回`true`

否则返回`false`

#### 思路

这道题本质上与 LeetCode 994（Rotting Oranges）类似。

做法：

- 统计所有气球数量；
- 将所有初始状态为 `2` 的位置加入队列；
- 使用多源 BFS 进行扩散；
- 最终如果所有气球都被访问到，则返回 `true`；
- 否则返回 `false`。

### Follow Up 1：计算全部爆炸所需时间

假设：
```text
每个气球传播给相邻气球需要 1 分钟
```

要求返回所有气球全部爆炸所需的时间。

如果存在无法爆炸的气球，则返回`-1`

#### 思路

依然使用 BFS，按层遍历队列：
- 当前层表示当前分钟已经爆炸的气球；
- 下一层表示下一分钟会爆炸的气球；

每完成一层 BFS，时间加一。最终返回总分钟数。

### Follow Up 2：不同气球传播时间不同

进一步修改规则：
```text
有些气球传播需要 1 分钟
有些气球传播需要 5 分钟
有些气球传播需要其他时间
```

要求计算整个网格全部爆炸所需的总时间。

#### 思路

此时已经不是标准 BFS，由于边权不同，需要转化为加权图最短路径问题。

可以参考：LeetCode 743（Network Delay Time）

使用：
```text
Dijkstra + Priority Queue（最小堆）
```

维护：
```text
earliest_pop_time[row][col]
```

记录每个位置最早爆炸时间。不断从最小堆中取出当前最早爆炸的气球，并更新相邻节点。

最终：
- 如果所有气球都能被传播到，则返回最大爆炸时间；
- 如果存在无法爆炸的气球，则返回 `-1`。

## 面试体验

整体题目围绕同一个场景不断扩展。

难度递进比较明显：
1. 多源 BFS
2. 分层 BFS 统计时间
3. Dijkstra 求带权传播时间

属于比较典型的考察基础算法理解和 Follow Up 延展能力的面试题。

## 面试结果反馈

- **最终结果**：Pass

<ReferenceSource
:sources="[
{
title: 'Bloomberg 电面面经',
link: 'https://www.1point3acres.com/bbs/thread-1179191-1-1.html',
site: '一亩三分地',
author: 'CharlotteYue',
date: '2026-06-06',
category: '海外面经'
}
]"
/>