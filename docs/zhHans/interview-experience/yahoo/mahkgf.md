---
title: Mail Senior MLE Phone Screen + 5 Round Panel Interview
description: Yahoo Mail Senior Machine Learning Engineer Phone Screen + Panel Interview 面试经验
outline: deep
createdDate: 2026-11-18
lastUpdated: 2026-11-19
---
# Yahoo Mail Senior Machine Learning Engineer Phone Screen + Panel Interview 面试经验

<InterviewDetail />

## 面试详情

- **团队**：Yahoo Mail

一轮 Phone Screen, 五轮 Panel Interview，Phone screen 面完一周才发邮件说 move forward 到 panel interview，然后 Panel Interview 其实是可以一天面试结束；面试官全部都是印度人，但是面试体验出奇的好，也可能我在某个 toxic 的厂待久了，看到正常人都感觉眉清目秀

### Phone Screen

手写 logistic regression 二分类, 用 numpy

ML Fundamentals, 问的是 Transformer 模型结构，用 coderpad 的白板给面试官画了一下 transformer 模型结构

### Panel Interview - Project Deep Dive

讲了一个用大模型做分类的项目，因为项目本身蒸馏有两层 teacher，感觉这块和面试官讲得很费劲，我在想下次是不是不能讲这么复杂的项目了

面试过程中追问了一些项目的 detailed metrics

### Panel Interview - PM Interview

Give a brief intro: what you do now, and your motivation for applying to Yahoo.

Tell me about a project where the ask from the product team was vague and not well defined. How did you turn it into a scope?

Did you define success criteria for the work?

Did you build a plan, and how did you communicate it to the different teams?

How did you converge on success criteria with the team and align with product and non-ML folks on the bar to launch? How was that decision made?

Tell me about a time you traded model quality for latency or cost (or other functional vs non-functional metrics).

How did you explain the trade-off to product or leadership, and who made the call?

Your model wins offline, but online testing or a partner team's validation on production data shows a quality regression against the product's success criteria (e.g. precision or recall). Launch is very near.

As a senior ML engineer, what would you do, how would you communicate it, and what is your plan of action?

Without going into deep detail: how do you use AI tools day to day, and how do they improve the quality of your work?

How you build agents with AI to automate work. The interviewer suggested showing agent workflows in the AI-assisted coding round.

### Panel Interview - ML System Design

设计一个类似于 Youtube 的推荐系统

### Panel Interview - AI Coding

给一个 Project，里面挺多文件的，用于计算 Yahoo Mail 每个用户的一个邮箱整体的 report，有个详细的 readme 描述这个 report 需要长啥样，但是代码有 bug，需要用 AI 修复这些 bug

可以自己选择用什么模型，可以用 Claude Code, Opus 5.5 可以用

### Panel Interview - Hiring Manager

这一轮太离谱了，面到这一轮才发现这个岗位是纯 engineering 相关的岗位，这个团队主要负责和 research 团队提供数据，和帮 research 团队部署模型以及模型服务的 scale up

面试官人倒是挺好的，听我讲完简历，问我对 research 感兴趣还是 engineering 感兴趣，因为他们这个团队主要是做 engineering 相关的，模型选择和训练都是另外一个 research group 做的，然后我说我是做模型训练的，然后 20min 结束本轮面试, lol

## 面试体验

评论区补充：我准备了一段时间面试之后，发现这些题还都是比较标准的，尤其是推荐系统这种，简直是 ml **system design** 典中典，面到这种题只能说面试官一点也不想为难我

面试准备其实和刷题类似，刷多了就发现题型就那么一些，回答的框架也比较固定，所以刷到一定程度就会发现这些题还好

## 面试结果反馈

评论区补充：面试的时候就明确说了我对 pure engineering 的岗位不感兴趣，平时做 modeling 比较多一些

后面也就没有后续消息了

<ReferenceSource
:sources="[
{
title: 'Yahoo Mail Senior MLE Phone Screen + 5 Round Panel Interview',
link: 'https://www.1point3acres.com/bbs/thread-1197330-1-1.html',
site: '一亩三分地',
author: '匿名用户-WLVLS',
date: '2026-11-16',
category: '海外面经'
}
]"
/>
