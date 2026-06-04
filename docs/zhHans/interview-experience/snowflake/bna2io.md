---
title: Senior Software Engineer
description: Snowflake Senior Software Engineer技术电面经验
createdDate: 2026-06-04
lastUpdated: 2026-06-04
outline: deep
---
# Snowflake Senior Software Engineer技术电面经验

<InterviewDetail />

## 基本信息

- **面试日期**：近期
- **岗位**：Senior Software Engineer
- **面试形式**：技术电面
- **申请渠道**：网上海投
- **候选人背景**：硕士，8年工作经验，在职跳槽
- **面试结果**：Fail（两周后仍未收到后续消息）

## 面试详情

### 第一部分：Coding

#### Coding 1

题目类似 LeetCode 2265（Count Nodes Equal to Average of Subtree）。

区别在于需要判断：
```text
Root Node 是否等于所有 Subtree 的 Average。
```

完成后很快进入下一题。

#### Coding 2

题目类似 LeetCode 981（Time Based Key-Value Store）。

Follow Up：原题通常假设输入时间戳按照递增顺序给出。

面试官进一步追问：
```text
如果输入不再保证按照 increasing order 排列怎么办？
```

回答使用 TreeMap 存储时间戳并进行查询，并简单写了一部分代码，没有实际运行测试。

### 第二部分：System Design

这轮设计题比较特别，不是常见的 Backend System Design。

题目背景：
- 控制一个 Client；
- Client 会定期向 Third-Party Service 获取 Token；
- 再使用 Token 访问公司 Backend；
- Backend 视为 Black Box，不允许修改；
- 只能从 Client 侧进行优化。

问题：
```text
如何设计，使整个系统因为 Token 获取失败、
第三方服务异常等原因导致的 Offline 时间尽可能短？
```

整个讨论过程中：
- Backend 完全不参与设计；
- 只能围绕 Client 行为进行优化；
- 涉及 Token 获取、缓存、刷新策略等方向。

面试官提到，这道题来源于 Snowflake 过去发生过的一次真实 Incident，因此被改编成了面试题。

## 面试体验

Coding 部分整体难度中等。

System Design 题比较出乎意料，不是常见的服务设计、存储设计或者分布式系统设计，而是一个偏客户端可靠性和故障恢复场景的问题。

讨论过程中聊了很多方案，但一直没太看出来面试官最想考察的点是什么。

## 面试结果反馈

- **最终结果**：Fail
- **后续情况**：两周多未收到反馈，基本视为挂掉

<ReferenceSource
:sources="[
{
title: 'Snowflake第一轮挂经',
link: 'https://www.1point3acres.com/bbs/thread-1178546-1-1.html',
site: '一亩三分地',
author: '匿名用户-KZSND',
date: '2026-05-30',
category: '海外面经'
}
]"
/>