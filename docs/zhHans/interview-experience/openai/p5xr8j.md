---
title: Open AI 店面
description: OpenAI Software Engineer 技术电面面试经验
outline: deep
---
# Open AI 店面

<InterviewDetail />

## 面试详情

我的店面一开始是一个 system design、一个 coding，后来 coding 还要加面一轮。

### System Design

System design 是 design 那个 IoT system。 题目的要求跟地理描述的差不多。 最后的时候，还专门问了real time dashboard

**SD**:

Design a system that monitors power demand across connected devices such as EV chargers, refrigerators, air conditioners, and hospital equipment. When demand approaches the grid’s capacity, the system reduces or delays flexible loads while keeping critical equipment powered.

Core requirements
- Monitor total power demand and compare it with the grid’s current capacity.
- Coordinate power use across connected devices when demand approaches or exceeds that capacity.
- Prioritize critical equipment, such as hospital devices. Reduce or defer flexible loads, such as EV charging, first.

Additional requirements to clarify in the interview
- Device constraints. Respect each device’s limits, such as an EV’s charging deadline or a refrigerator’s safe temperature range.
- Response time. Define how quickly the system must detect an overload and reduce demand.
- Failure handling. Handle missing readings, offline devices, and control commands that go unacknowledged.
- Recovery. Restore deferred loads gradually once capacity is available, so devices restarting together don’t trigger another overload.

### 第一个 Coding：Poker Game OOD

第一个 coding 一个poker game的OOD，类似monster battle，定义player， card，game，需要实现deal card， compare card根据定义的规则。最后的输出是events，game开始，player手里有什么牌，最后谁赢了，题目里有example cases

我只做了第一问，不知道第二问是什么.

### 加面 Coding：Infection

第二个 coding 是那个infection 的题。 但是它不是按地理面经那个从简单到难一个一个展开的，上来就是 实现 D-day recovery。  而且它的感染方向是八个。 我当时自以为是，题都没读完就开始写。 一定要好好听面试官给你描述这个题。他给你描述的时候，其实思路都已经在里面了。

<ReferenceSource
:sources="[
{
title: 'Open AI 店面',
link: 'https://www.1point3acres.com/bbs/thread-1197030-1-1.html',
site: '一亩三分地',
author: '匿名用户-F79PC',
date: '2026-11-14',
category: '海外面经'
}
]"
/>
