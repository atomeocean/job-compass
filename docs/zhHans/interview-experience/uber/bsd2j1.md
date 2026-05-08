---
title: Software Engineer
description: Uber Software Engineer面试经验
createdDate: 2026-05-08
lastUpdated: 2026-05-08
outline: deep
authors:
  - name: Sung
---
# Uber公司Software Engineer面试经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **面试岗位**：Software Engineer（后端，growth相关）
- **学历背景**：硕士
- **工作类型**：全职
- **投递方式**：网上海投
- **职位类型**：Onsite
- **当前状态**：在职跳槽

## 面试详情

### 第一轮 BQ

一直在深挖自己的项目，需要说明data的streaming还有项目里的设计的各种rules

### 第二轮 coding

lc 56

### 第三轮 coding

给定一个整数数组`nums`和一个二维数组`queries`，其中：

- `queries[i] = [li, ri, vali]`

每个操作表示：
- 可以将区间 `[li, ri]` 内的每个元素最多减少`vali`；
- 每个位置减少的数值可以独立选择。

**定义：** 如果数组所有元素都为 `0`，则为 Zero Array。

**要求：** 判断是否可以按顺序执行所有操作后，将数组变为 Zero Array。

示例：
```
Input: nums = [2,0,2]
queries = [[0,2,1],[0,2,1],[1,1,3]]
Output: true
```

做题过程：一开始只想到了O(n2)暴力解法，后来意识到是差分数组，但是差分数组掌握的不行，基本的左边界加val，右边界外减val就没掌握好。

### 第四轮 System Design

设计 Uber Eats Shopping Cart

## 面试结果反馈

- **最终结果**：未通过
- **反馈时间**：一周后收到拒信

<ReferenceSource
:sources="[
{
title: '黑车VO挂经',
link: 'https://www.1point3acres.com/bbs/thread-1175418-1-1.html',
site: '一亩三分地',
author: 'mchzh',
date: '2026-05-03',
category: '海外面经'
}
]"
/>