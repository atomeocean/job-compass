---
title: Senior AS 店面
description: Amazon Senior Applied Scientist Phone Screen面试经验
outline: deep
---
# Amazon Senior Applied Scientist Phone Screen面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Senior Applied Scientist（Senior），FinTelligence
- **面试形式**：Phone Screen（技术电面）
- **申请渠道**：猎头
- **候选人背景**：博士，在职跳槽

## 面试详情

### 自我介绍 & BQ

先自我介绍，然后没有咋deepdive，就问ownership的principal，让举个例子。

### ML 八股文

然后ml 八股文：

- bias vs 方差
- linear regression vs neural net 哪个bias大，哪个方差大，是在train还是在test？
- self attention定义
- self attention vs cross attention
- 为啥要position encoding？
- decoding时候有什么方法

### Coding

**coding**：

a streaming of （consider_id, labels), at most k distinct labels。 implement add(label), longest()搞了半天我没听懂问题

给了个例子

比如（1，（toxic，ok））， （2， （toxic，ok， spam））

k=2 output： （toxic， ok），k=3， output  （toxic，ok， spam）

听懂这里都已经超时了，我说brutal force就是搞个counter然后找。 他说有啥优化的吗，我一时想不出

## 面试体验

印度小哥，声音太小了，嘟囔的我都听不清问题lol

<ReferenceSource
:sources="[
{
title: '香蕉厂senior as 店面',
link: 'https://www.1point3acres.com/bbs/thread-1191099-1-1.html',
site: '一亩三分地',
author: '匿名用户-Z4YPD',
date: '2026-09-28',
category: '海外面经'
}
]"
/>
