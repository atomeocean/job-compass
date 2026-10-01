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

40min Coding, 考的比较难，解题思路是贪心+位运算，感觉麻麻不想招人lol

### Django Debug

60min Debug，这个比较tricky，大概讲一下思路：

第二部分是一个现成的 Django project，需要根据 failing tests 去 debug，不是让你从零写 Django。 比较推荐的 debug 顺序是：`Test → URL → View → QuerySet / Model → Response`，不要看到 test fail 就直接在某个函数里面乱改。 我会先把失败按 endpoint 分类，看是不是多个 test 其实来自同一个 root cause。 比如优先检查：

- urls.py 有没有 route 到正确的 handler
- view 里拿 query parameter 的方式对不对
- filter 条件有没有遗漏
- ORM query 和 model field 是否匹配
- 返回结果数量对了以后，sorting / tie-breaker 是否正确
- 500 的话直接顺 traceback 看具体哪一层炸了
- 没有 query、只有 filter 时是不是也应该工作
- rating / year 等边界条件怎么处理
- genre / director / writer 这类字段怎么 filter
- 最后的结果按照什么顺序返回

### Work Style Assessment

打开amazon的LP对着做就好

### Personality Assessment

5minn的一个测试：和自己本人性格consistent就好，没有什么正确答案

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
