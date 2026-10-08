---
title: 3+年经验 Loop挂经
description: Microsoft Mid-level Software Engineer Loop面试经验
outline: deep
createdDate: 2026-10-07
lastUpdated: 2026-10-07
---
# Microsoft Mid-level Software Engineer Loop面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer
- **面试形式**：Loop（3 轮：HR + Hiring Manager + System Design、Object-Oriented Design、Data Structures & Algorithms）
- **面试结果**：Rejected

## 面试详情

分享一下我在 Microsoft 面试一个要求 3+ 年经验的岗位的经历。整个 loop 包括三场面试，涵盖了我的背景、system design、object-oriented design 和 coding。

### 第一轮：HR + Hiring Manager + System Design

面试一开始大约用了 40 分钟讨论我的 CV、之前的项目、职责和技术经验。

然后我们进入了一个 25 分钟的 system design 练习。我从一个简单的单客户端设计开始，然后通过讨论 load balancing、horizontal scaling 和 sharding 来扩展它。

反馈是我的理论理解很扎实，但对于目标级别，他们希望看到更多实践层面的 system design 深度。

### 第二轮：Object-Oriented Design

这场面试主要有两个部分。

#### Part 1：Class design

我被要求为一个 attack-path 系统建模。我的设计包括：

- **Node**：ID、name 和 criticality。
- **VirtualMachine**：一个带有 internet-connectivity 属性的 node。
- **Database**：一个表示是否包含敏感数据的 node。
- **Edge**：source node 和 target node 之间的连接，带有它自己的 criticality。
- **AttackPath**：一组 node 和 edge，外加 severity。

面试官解释说没有唯一正确的解法，并认为我的设计不错。

#### Part 2：Path validation / construction

后续是实现一个函数，根据给定的 node 和 edge 来验证或构造一条 attack path。

我用一个例子解释了我的算法，并实现了部分逻辑，但我没能在可用时间内完成这个函数。

**LeetCode 对应**：我还没有找到完全对应的题；这看起来是一道自定义的 OOD 题。

### 第三轮：Data Structures & Algorithms

这是一场一小时的面试，有三道 coding 题。

#### 1. Maximum consecutive ones with up to K flips

给定一个二进制数组，求在最多可以翻转 K 个 0 的情况下，连续 1 的最大个数。

**LeetCode 对应**：[1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) — Medium。这是完全一样的题。

**我的做法**：用双指针的 Sliding window，记录窗口中 0 的个数。

**复杂度**：O(n) 时间，O(1) 额外空间。

#### 2. Minimum time to burn a binary tree

给定一个目标节点，计算火通过相邻节点蔓延到整棵树所需的时间。

**LeetCode 对应**：[2385. Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) — Medium。底层是同一个问题，只是把火换成了感染。

**我的做法**：先找到目标节点，然后使用 left、right 和 parent 指针跑 BFS，同时记录已访问的节点。每一层 BFS 代表一个时间单位。

在我的面试中，节点结构包含 parent 指针。在 LeetCode 版本中，你需要自己建立这些关系。

**复杂度**：O(n) 时间，O(n) 额外空间。

我完成了解法，面试官确认是正确的，没有要求修改。

#### 3. Message filtering within a K-second window

给定时间戳、消息和一个窗口 K，返回一个 boolean vector，表示每条消息应该被接受还是被抑制。

**最接近的 LeetCode 对应**：[359. Logger Rate Limiter](https://leetcode.com/problems/logger-rate-limiter/) — Premium。标准题目使用固定的 10 秒窗口；我面试的版本用的是 K，并返回一个 boolean vector。

**我的做法**：用一个 hash map 存储每条消息最后一次被接受的时间戳。

一个值得澄清的细节是，被抑制的消息是否应该更新时间戳。我的实现只在消息被接受时才更新它。如果要追踪一条消息是否在之前 K 秒内出现过，就需要在它每次出现时都更新。

**复杂度**：O(n) 期望时间，O(m) 额外空间，其中 m 是不同消息的数量。

我在规定时间内轻松完成了全部三道 coding 题。

## 面试体验

我最大的收获是要准备好过去项目中设计决策的详细例子：约束、备选方案、trade-offs、生产环境中遇到的挑战，以及学到的经验教训。

对于收到过类似反馈的人：你们是怎么积累实践层面的 system design 深度，并在之后的面试中展示出来的？

## 面试结果反馈

- **最终结果**：Rejected

正面反馈强调了扎实的理论知识、清晰的推理和扎实的 DSA 能力。

主要的顾虑是，我展示出来的实践经验——尤其是在更大规模系统的 system design 方面——对于他们在目标级别上的期望来说不够深入。他们觉得我有基础和潜力，但需要更多真实世界的 system design 经验。

<ReferenceSource
:sources="[
{
title: 'Microsoft Interview Experience | 3+ Years Experience | System Design, OOD & DSA | Rejected',
link: 'https://leetcode.com/discuss/post/8551527/microsoft-interview-experience-3-years-e-emxk/',
site: 'LeetCode',
author: 'Anonymous User',
date: '2026-10-02',
category: '海外面经'
}
]"
/>
