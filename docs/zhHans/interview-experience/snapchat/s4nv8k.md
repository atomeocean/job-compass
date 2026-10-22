---
title: SDE ML Infra Onsite
description: Snap SDE - ML Infra Onsite面试经验
outline: deep
---
# Snap SDE - ML Infra Onsite面试经验

<InterviewDetail />

## 面试详情

- **面试日期：** 2026年9月
- **面试组别：** sde-ml infra

### 电面

一道不太常规的题目，data stream process, 每一条数据可以存入一个stored cluster (根据数据本身判断属于已经有的cluster还是这是一个新的cluster的第一个数据)。另外需要实现一个function来读取每一个cluster的max value。followup做了不少读写优化，最后一个口述的followup是如果要查找每个cluster的median data应该怎么做。国人老哥人很好，当天就收到通过了的通知。

### Onsite 

#### 第一轮：System design

特别想吐槽的一轮，店面之后跟recruiter有一个prep meeting, 还有之间的prep邮件都强调了这一轮是要针对ml infra的sys design题目（类似于设计一个multi org share的distributed ML training platform, data pipeline for feature extraction and feature store, ML infra platform这些）， onsite前一个星期80%+的时间都花在学ML这些上面了。

结果最后考了我一个类似于control plane和data plane分离的CI/CD，需要做region level hosts distribution。由于那周完全没练传统题，做的一般不过应该可能算还行（不是很有把握）。

#### 第二轮：Coding

第一轮code是[1254](https://leetcode.com/problems/number-of-closed-islands/)，感谢国人老哥是给我放水了，不过可惜由于上一轮的原因我那一周刷题比较少。结果这道题有一个核心算法以外的逻辑bug，面试老哥好像把我的代码粘贴到后台用ai review了一下，然后给了两个会出错的测试案例。那天状态也一般花了20分钟没看出来哪里出问题了。 应该是挂了

#### 第三轮：Coding

雷达重合问题，给了每个雷达的坐标和半径，第一问是输出跟每个雷达有重合的雷达是哪些。然后第二个问题是说把所有雷达放在一个长方形墙里面，判断一个一个物体能不能在不被雷达发现的情况下从左边墙到达右边墙。

解法应该是用union find把所有雷达合并成一个个cluster,然后看每个cluster能覆盖的纵坐标范围，如果有任何一个cluster能覆盖整个长方形的纵坐标，就不能通过。这一部分代码没写完，不过主体union-find写完了，剩余的一点思路也交流了。

#### 第四轮：AI coding

这轮面试也很奇怪，按照prep meeting/邮件和面经内容来看，应该是要从零写一个小程序，主要考一些sys design和full cycle software development工作方式，结果面试官说他是第二次面，然后准备了一道有code base的题目，code base是go, 我说我没写过看不懂，prefer python, c++和java也可以。

然后他现场找了一道"python"的题目，但结果那道题后端是python但前端是js，并且通过ai帮助我理解整个架构，发现这个问题需要加的feature就是在前端改就好了，然后就跟claude code交互把feature实现就完事了。

## 面试体验

- **面试体验：** 一般
- **面试难度：** 中等

## 面试结果反馈

- **电面**：通过，当天收到通知
- **最终结果**：Onsite 未通过（Fail）

<ReferenceSource
:sources="[
{
title: 'Snap onsite挂经',
link: 'https://www.1point3acres.com/bbs/thread-1192328-1-1.html',
site: '一亩三分地',
author: '匿名用户-IAM0W',
date: '2026-10-08',
category: '海外面经'
}
]"
/>
