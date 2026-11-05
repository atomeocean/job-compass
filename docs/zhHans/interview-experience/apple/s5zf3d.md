---
title: ASE两轮电面
description: Apple Software Engineer 技术电面面试经验
outline: deep
createdDate: 2026-11-05
lastUpdated: 2026-11-05
---
# Apple Software Engineer 技术电面面试经验

<InterviewDetail />

## 面试详情

- **团队 / 职位**：ASE

### 第一轮：技术电面

常规bq, 题目是[酒吧](https://leetcode.com/problems/validate-binary-search-tree/)，不过要求node.val不确定类型，然后假装有一个比较node.val大小的函数可以调用，用iterative dfs秒了。（这轮用的python, 不过跟对面聊天发现他们工作用java和c++, 下一轮自己决定切换了java，结果大概率gg了）

### 第二轮：技术电面

面试完之后查了一下，题目本质上是[散舅舅](https://leetcode.com/problems/evaluate-division/)，第一用java面试，有些hashMap调用方法不太熟悉，再加上这道题之前没准备过，45分钟勉勉强强写完，用的方法跟LC上面的不太一样，我是先用DFS来pre-compute每一个节点的所有children, 然后做O(1) query.

不过问了下GPT我的code有两个问题：一是没做DFS的cycle检查（一开始没想到会用cycle，假设了输入是有效的，最后对面问了一下这个问题，我临时给了个方案不过不太对），二是for loop里面更新hashMap的值会有问题。

应该是没了，写下来给大家做个参考。

<ReferenceSource
:sources="[
{
title: '苹果ASE两轮电面（大概率挂经）',
link: 'https://www.1point3acres.com/bbs/thread-1195691-1-1.html',
site: '一亩三分地',
author: '匿名用户-WJ17X',
date: '2026-11-05',
category: '海外面经'
}
]"
/>
