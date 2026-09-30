---
title: Amazon OA
description: Amazon Software Engineer Online Assessment面试经验
createdDate: 2026-09-30
lastUpdated: 2026-09-30
outline: deep
---
# Amazon OA面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer
- **学历**：硕士
- **候选人背景**：在职跳槽
- **面试流程**：Coding + Django Debug + Work Style Assessment + Personality Assessment
- **面试结果**：未知

## 面试详情

### Coding

第一部分是 40 分钟 Coding。

候选人表示这部分难度比较高，解题思路主要涉及：

- Greedy
- Bit Manipulation

### Django Debug

第二部分是 60 分钟 Debugging。

这部分不是要求从零开始编写 Django 项目，而是提供一个已经存在的 Django Project，候选人需要根据 failing tests 定位并修复问题。

候选人推荐按照从测试到响应的顺序逐层排查（见下方流程）。

不要看到某个 test fail 就直接进入某个函数随意修改，而应该先根据失败的测试进行分类，判断多个 test 是否实际上来自同一个 root cause。

#### Debug 重点

首先可以检查 URL routing：

- `urls.py` 是否 route 到正确的 handler；
- endpoint 是否对应正确的 view。

然后检查 View：

- 获取 query parameter 的方式是否正确；
- filter 条件是否完整；
- 不带 query、只有 filter 的情况下是否仍然能够正常工作。

接下来检查 ORM 和 Model：

- ORM Query 是否与 Model Field 匹配；
- filter 条件是否正确；
- `rating`、`year` 等字段的边界条件如何处理；
- `genre`、`director`、`writer` 等字段如何进行 filter。

如果返回结果数量已经正确，还需要进一步检查：

- sorting 是否正确；
- tie-breaker 是否正确；
- 最终结果应该按照什么顺序返回。

如果出现 HTTP 500，则可以直接沿着 traceback 查看具体是哪一层出现问题。

整体 Debug 思路可以概括为：

```text
Failing Test
    ↓
Endpoint / URL
    ↓
View
    ↓
QuerySet / Model
    ↓
Response
```

重点不是盲目修改代码，而是通过 failing tests 和 traceback 一层层定位 root cause。

### Work Style Assessment

第三部分是 Work Style Assessment。

候选人建议可以参考 Amazon 的 Leadership Principles（LP）进行作答。

这部分没有特别复杂的技术内容，主要是根据 Amazon LP 的方向完成测试。

### Personality Assessment

最后是一个大约 5 分钟的测试。

候选人认为这部分主要保持回答与自己的实际性格一致即可，没有明显的标准正确答案。

<ReferenceSource
:sources="[
{
title: 'Amazon OA 面经｜Coding + Django Debug',
link: 'https://www.1point3acres.com/bbs/thread-1191311-1-1.html',
site: '一亩三分地',
author: 'Sundriyanting',
date: '2026-09-29',
category: '海外面经'
}
]"
/>
