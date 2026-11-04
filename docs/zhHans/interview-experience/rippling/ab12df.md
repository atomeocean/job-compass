---
title: staff 技术电面
description: Rippling Staff Software Engineer 技术电面面试经验
outline: deep
---
# Rippling Staff Software Engineer 技术电面面试经验

<InterviewDetail />

## 面试详情

面的staff 一轮system design 一轮HM chat

### 第一轮：System Design

system chat是原题 News Aggregator

系统定期从几万家news publisher的API pull news

假设有一个blackbox的classifier给每个news添加一个或多个topic

用户关注多个分类，可能几百个

**follow up问题：**

- 怎么分页
- 怎么去重
- 回答了缓存每一个topic最近的news id之后怎么进一步提高读的速度
- 对于一个假新闻如何快速从所有用户的feed中去掉

### 第二轮：HM Chat

HM chat 印度大哥人不错，不是按照BQ问题一个个问的 就是聊了一下motivation, 更想去0到1的组 还是成熟的组 以及proudest project

<ReferenceSource
:sources="[
{
title: '码农类General 硕士 全职@rippling - 内推 - 技术电面',
link: 'https://www.1point3acres.com/bbs/thread-1195734-1-1.html',
site: '一亩三分地',
author: 'Owenli20',
date: '2026-11-04',
category: '海外面经'
}
]"
/>