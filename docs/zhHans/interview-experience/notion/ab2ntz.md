---
title: Software Engineer全套
description: Notion Software Engineer全流程面试经验
createdDate: 2026-06-05
lastUpdated: 2026-07-01
outline: deep
---
# Notion Software Engineer全流程面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer
- **面试形式**：Phone Screen + Onsite
- **申请渠道**：网上海投
- **候选人背景**：硕士，在职跳槽
- **面试结果**：Fail

## 面试流程

### Phone Screen

#### OOD

设计一个 ToDo List 系统。

主要考察面向对象设计能力，包括：
- Task 设计
- Task 状态管理
- 数据结构选择
- API 设计
- 可扩展性考虑

## Onsite

### System Design

设计 Google Calendar。

讨论内容包括：
- 日历事件管理
- 重复事件
- 日程查询
- 时间冲突处理
- 数据存储与同步

属于比较经典的中等规模 System Design 题目。

### AI Coding

给定一个 JSON 文件。

JSON 中记录了一段时间内大量 Request 的 Response 信息，其中包含：
- Timestamp
- Error 类型
- 其他请求信息

要求编写程序统计指定时间范围内出现次数最多的 Error。

需要支持：
- 时间窗口过滤
- Error 分类统计
- Top K Error 查询

面试过程中使用 AI 辅助完成代码编写。

需要特别注意时间边界问题：

```text
startTime 是否包含
endTime 是否包含
```

也就是时间区间到底是：

[startTime, endTime]

还是：

[startTime, endTime)

需要在实现前与面试官确认。

### Behavioral Interview

共进行了两轮 BQ。

整体问题比较常规，没有特别有记忆点的问题。

## 面试体验

整体沟通体验不错。

- Phone Screen 为经典 OOD 题；
- System Design 是 Google Calendar；
- AI Coding 更偏向真实业务场景的数据分析题。

面试过程中交流都比较顺畅，没有明显卡顿或者沟通问题。

最终还是收到了拒信。

## 面试结果反馈

- **最终结果**：Fail

<ReferenceSource
:sources="[
{
title: 'Notion全套',
link: 'https://www.1point3acres.com/bbs/thread-1179295-1-1.html',
site: '一亩三分地',
author: 'joakcnaoueqa',
date: '2026-06-05',
category: '海外面经'
}
]"
/>