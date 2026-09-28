---
title: SWE III
description: Google SWE III面试经验
outline: deep
createdDate: 2026-09-25
lastUpdated: 2026-09-28
---
# Google SWE III面试经验

<InterviewDetail />

## 基本信息

- **岗位**：SWE III
- **工作经验**：2.5年
- **候选人背景**：硕士，2.5年工作经验，目前在Amazon从事Java Backend工作，在职跳槽
- **面试流程**：R1技术电面
- **R1时长**：90分钟
- **R1轮数**：2部分，Behavioral + Technical
- **最终结果**：未通过

## 面试详情

### 面试流程

* 5月7日：网申 SWE III
* 7月8日：xWF 联系候选人
* 8月5日：进行 R1 面试
* 8月7日左右：收到 xWF 未通过邮件

候选人提到，去年曾经参加过 GHA（Going Higher and Further）流程但最终简历挂掉，这次申请时直接跳过了相关流程。

### R1

R1 当天一共进行了约 90 分钟的面试：

1. Behavioral：45分钟
2. Technical / Coding：45分钟

#### Behavioral

Behavioral 部分首先要求候选人进行自我介绍，之后主要围绕过去的工作经历进行提问。

主要问题包括：

* Tell me about a time you had a conflict with a coworker.
* Tell me about a mistake you made and how you resolved it.
* Tell me about a time when a teammate left the team and you had to take over their project.
* Tell me about a time you took the initiative to fix a problem.

整体以具体经历为主，面试官会针对候选人的回答继续追问。

例如在 teammate departure 的问题中，候选人被问到如果团队成员突然离职，需要接手对方负责的项目，应该如何处理。

候选人回答会首先通过 handoff document 了解项目的 context、当前进展等信息。面试官随后进一步追问：

如果事情发生得非常突然，没有 handoff document，应该怎么办？

因此，Behavioral 不仅要求准备具体的工作经历，也需要能够针对具体情境进行进一步说明。

#### Coding

Coding 题目属于 String Parsing / Environment Variable Substitution 类型。

题目背景类似 Shell Environment Variable Substitution：

.zshrc 中设置 environment variable，例如：

export NAME = "Tom"

输入字符串：

Hello I'm %NAME%

要求实现一个 Class，用于存储 environment variables，并解析输入字符串，将 %KEY% 替换为对应的 value。

例如：

set("NAME", "Tom")
get("NAME")
parse("Hello I'm %NAME%")

最终输出：

Hello I'm Tom

候选人理解这道题主要是实现一个简单的 environment variable store + parser。

Coding 完成后，候选人直接告诉面试官已经完成。面试官随后提醒候选人继续进行几个 test case 和 edge case 的 dry run。

在重新检查过程中，候选人发现代码中存在一个小 bug，并进行了修复，之后才算完成题目。

从评论区来看，有其他用户指出这道题还可能涉及更多复杂情况，例如：

* 变量中嵌套变量；
* Lazy Update；
* Cycle Dependency 检测。

原帖作者随后表示，如果没有面试官提醒，自己当时并没有想到这些情况。

### 面试结果反馈

- **最终结果**：Failed

<ReferenceSource
:sources="[
{
title: '狗家R1 挂经',
link: 'https://www.1point3acres.com/bbs/thread-1190697-1-1.html',
site: '一亩三分地',
author: '匿名用户-YLM57',
category: '海外面经'
}
]"
/>
