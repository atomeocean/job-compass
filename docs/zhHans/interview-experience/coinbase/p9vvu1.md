---
title: SWE Onsite
description: Coinbase软件工程师Onsite面试经验，系统设计题考察Ring Buffer
outline: deep
---
# Coinbase公司软件工程师Onsite面试经验

<InterviewDetail />

## 基本信息

- **面试岗位**：Software Engineer（码农类General）
- **学历背景**：硕士
- **工作类型**：全职
- **投递方式**：网上海投
- **面试形式**：Onsite
- **当前状态**：在职跳槽

## 面试详情

### 系统设计：Design Ring Buffer

面试考察的是一道系统设计题，要求设计一个 Ring Buffer（环形缓冲区）。

主要讨论点包括：

- **Consumer / Producer 模型**：如何实现生产者和消费者之间的数据传递
- **Backpressure 机制**：当消费者处理速度跟不上生产者时，如何进行背压控制
- **注册多个 Consumer**：支持多个消费者同时消费数据的设计

作者表示这是一道之前没有在面经中见到过的新题。

### 面试体验

面试官非常 picky，要求考虑 real production 环境下的各种细节，涉及到很多边界情况和实际生产中的注意事项。整体感觉面试官对细节的要求很高。

## 面试结果反馈

- **最终结果**：Other

<ReferenceSource
:sources="[
{
title: 'coinbase 新题',
link: 'https://www.1point3acres.com/bbs/thread-1180298-1-1.html',
site: '一亩三分地',
author: '匿名用户-CKM5U',
date: '2026-06-15',
category: '海外面经'
}
]"
/>
