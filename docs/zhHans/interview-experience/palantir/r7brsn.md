---
title: SWE
description: Palantir Software Engineer 技术电面，包含项目深挖和 Session Manager 编程题
createdDate: 2026-09-24
lastUpdated: 2026-09-24
outline: deep
---
# Palantir Software Engineer 电面经验

## 面试基本信息

- 公司信息：[Palantir](https://www.palantir.com/careers/)
- 岗位：Software Engineer
- 面试时间：2026 年 5 月
- 面试轮次：第一轮技术电面，约 1 小时

<InterviewDetail />

## 面试过程

### 项目经历深挖（约 15 分钟）

面试官让我从简历中选一个项目介绍，然后根据介绍追问。大部分追问并不偏技术细节，更多是在问我做项目时采用了什么方法，以及如何做决定。

### 编程题（约 40 分钟）

面试官给出一个模板类，要求实现 Session Manager，其中有两个方法：`start_session(session_id: str) -> None` 和 `get_allocation() -> Dict[str, Set[str]]`。

题目要求把 session 分配到服务器，并保持每台服务器的 session 数量平衡。例如有 `s1`、`s2`、`s3` 三台服务器时，数量可以是 `[8, 8, 8]` 或 `[8, 8, 7]`；任意两台服务器的数量差不能超过 1。

我的思路是用最小堆保存 `(session 数量, server_id)`。每次启动新 session，就取出当前 session 最少的服务器，把 session 分配给它，再更新堆。

还需要处理重复的 `session_id`：同一个 ID 如果已经启动，就不能再次分配。我另外用一个集合记录已经出现过的 ID。最后测试用例也要自己写，覆盖正常分配和重复 ID 等边界情况。

## 个人感受

整体感觉还不错。面试官给我的个人印象，让我想起以前在大学校队中与白人男性队友相处的日子；我也联想到投行团队的氛围。这只是我对这一场面试的主观感受。
