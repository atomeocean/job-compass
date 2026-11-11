---
title: 十一实验室V1 V2挂经
description: ElevenLabs Full-Stack Engineer Onsite面试经验
outline: deep
---
# ElevenLabs Full-Stack Engineer Onsite面试经验

<InterviewDetail />

## 面试详情

ElevenLabs的onsite是4轮：

- V1: Live coding
- V2: Product decomposition
- HM
- CTO

### V1：Live coding

V1的问题套了个AI的壳，就是LLM生成的text是want_to_speak，agent说的是spoken_text，want_to_speak永远是对的，spoken_text有可能有repeated characters, words or word phrases，要求返回最长的prefix of want_to_speak

比如：

```text
want_to_speak: I can help you book an air ticket
spoken_text: I can can help you book
expected output: I can help you book
```

#### 第一部分

第一部分是让你review一个junior dev的代码，他用的LCS，先建一个DP matrix，达到LCS length，然后从右到左重建LCS

他的错误一个是他的DP matrix index out of range，还一个是下面这个情况并不work：

```text
want_to_speak: I can help you book an air ticket
spoken_text: I can can
output: I can an
expected output: I can
```

#### 第二部分

第二部分让你去实现这个function_v2。审题很重要，我也是到快结束才回过味儿来，spoken_text只会出现重复，不会漏词也不会替换词，其实就是两个pointer从左到右，遇到不一样的就只移动spoken_text的pointer就好了

### V2：Product decomposition

V2就真的很开放，比如footlocker的网站，设计一个voice chat system，非常开放，我经常问面试官你觉得这个要怎么样吗？他会回你觉得应该怎么样，不知道是不是挂点，反馈是we felt there were gaps in AI fluency and product design skills that are critical for this role

<ReferenceSource
:sources="[
{
title: '十一实验室V1 (live coding) and V2(product decomposition)挂经',
link: 'https://www.1point3acres.com/bbs/thread-1196436-1-1.html',
site: '一亩三分地',
author: 'wangch079',
date: '2026-11-10',
category: '海外面经'
}
]"
/>
