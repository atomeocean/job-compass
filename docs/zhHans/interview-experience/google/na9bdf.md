---
title: L5 Cloud SDE
description: Google Cloud SDE L5 面试经验
createdDate: 2026-05-29
lastUpdated: 2026-05-29
outline: deep
---
# Google Cloud SDE 面试经验

<InterviewDetail />

## 基本信息

- **面试日期**：2026-05-21
- **工作类型**：全职
- **面试形式**：Phone Coding + Onsite（Coding + System Design）
- **职位等级**：L5
- **候选人背景**：硕士，在职跳槽

## 面试详情

### Phone Coding 轮

题目：**Quick Select**  
面试官主要讨论不同的实现方法，以及 pivot 的选择策略。最后让任选一种方法进行实现。

面试反馈：讨论环节比较充分，implement 过程相对顺利。

### Coding 第一轮

题目：给定两个 Tree 的 edges 和两个 node，要求计算这两个 node 之间的距离。  
候选人提问澄清点：
- Tree edges 是否有重复？
- Edges 是否一定能构成一棵树？
- 输入的 node 是否一定存在？是否可能是同一个 node？

面试反馈：通过提前澄清问题，避免了很多潜在坑。

### Coding 第二轮

题目：输入 `string` 和 `target`，求有多少个以 `target` 为 prefix 的 substring。  
**Follow-up**：求最小包含 `target` 的 substring 长度。

候选人提问澄清点：
- String 是否一定比 target 长？
- 如果比 target 短，应该返回 -1、0、null 还是 empty？

面试反馈：澄清问题后思路清晰，题目本身难度适中。

### System Design 轮

题目：**设计 Google Calendar 的 Event Setting**  
重点考察：如何处理 **User Event Conflicts**（用户事件冲突）。

面试反馈：面试官主要围绕冲突检测和处理机制进行提问。

## 面试结果反馈

- **最终结果**：未知（等待中）
- **整体难度**：Average
- **个人感受**：题目有一定深度，但整体在可控范围内，澄清问题环节比较重要。

<ReferenceSource
:sources="[
{
title: 'Google Cloud SDE',
link: 'https://www.1point3acres.com/bbs/thread-1177488-1-1.html',
site: '一亩三分地',
author: 'firemanysome',
date: '2026-05-21',
category: '海外面经'
}
]"
/>