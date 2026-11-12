---
title: 领英Sr Staff on-site
description: LinkedIn Sr Staff Software Engineer Onsite面试经验
outline: deep
createdDate: 2026-11-11
lastUpdated: 2026-11-11
---
# LinkedIn Sr Staff Software Engineer Onsite面试经验

<InterviewDetail />

## 面试详情

五轮，分两天完成：一轮coding，两轮design，两轮behavior。

### Coding

Coding可以用AI写，我就选了GPT 6.1 Sol来帮我写。那个AI可以改代码，所以我不需要复制粘贴。

**Part 1**：

给出一个grid，上面用0表示消防站，-2表示湖，-1表示居民区。grid中有多个消防站，求每个居民区到最近的消防站的曼哈顿距离。消防车不能从湖中穿过。

我先跟面试官说我的思路：用BFS计算出每个消防站到每个居民区的距离，然后从中取最小。他问复杂度是多少。我说如果消防站的数量不变，那么就是 O(N)，Ｎ是grid的大小。如果消防站的数量也变，那就是O(M*N)，Ｍ是消防站数量。他没说什么，然后我就把我的思路告诉AI，问有什么更好的解法，然后AI说可以用多源BFS，把所有消防站一起加进queue里，距离全为０，然后开始BFS，这样只要 O(N)。我说好，就实现这个。AI就帮我实现了。我把AI生成的代码一行行检查一遍，面试官就给出Part 2:

政府要为消防车到居民区的距离买单，有一个base cost，距离为０在base的基出上打多少折，距离为１打多少折，距离为２好像就是base，距离为３要多收某个%的钱，依此类推，最后有个cap。要算出消防车到每个居民区的开销。

也是同样跟AI brainstorm，然后让AI 实现。最后面试官说这个实现的空间复杂度是多少？我说是O(N)，因为它只是把居民区一直往queue里加，但它没有去pop，而只是移指针，最终把整个grid加进了queue。可以把它改成pop的方式省空间。我还告诉AI说可以每次visit完一个就`queue = queue[1:]`给它pop出来（我是用Go语言实现的）。AI就照改了。

我看还有一个Part 3，但是时间不多了，就没让我继续做。

### Design 1

Design 1，由他们部门的Distinguished engineer面试。需要设计一套机制，去知道一个PR需要谁去stamp。既要画图，又要用伪代码实现关键逻辑。

我预先假设是一个大monorepo，所以做了个大概设计用半Go半Python写了伪代码，然后他问，要是commit rate 很高呢，而且你没问我是不是monorepo，要是很多repo，有大有小呢？怎么保证这个系统的性能。所以我又补充，persistent cache directory啊，pre-warming for big repos啊。到最后他觉得可以。这个DE是从谷歌过来的，在谷歌也是DE。

### Design 2

**Design 2**: 设计一个CI scheduling system。要求能从Github那边trigger，找到合适的worker (CPU/GPU），然后如果在高峰期worker不够怎么办。

我就大概按buildkite的设计来。这块其实我不太懂，就按hello interview的步骤一步步来，免得出差错。从头到尾他就冷冷地听着。

最后让我问问题，我问，听说这几年LinkedIn文化在变坏，你有这种感觉吗？他说他觉得是前几年LinkedIn太闲了，这几年没那么闲了，所以大家就抱怨，但这个工作量也只是谷歌的常态（他也是从谷歌过来的）

### Behavior

两轮behavior有一轮跟hm聊。这hm是一个director。这哥们除了问我做过的项目，还没完没了地跟我谈技术，把一小时的面试活生生地拖成一个半小时。大部分时间都是他在说。我几乎每说到一个项目他就要插嘴说他也遇到这个问题。

## 面试体验

地里大家都说LinkedIn文化不行了，但我看这个DE和director还是懂技术的。在这种部门会不会好些？

## 面试结果反馈

最后不出所料Design 2挂了，但director跟我聊得太好，还是决定给我发offer。

<ReferenceSource
:sources="[
{
title: '领英Sr Staff on-site',
link: 'https://www.1point3acres.com/bbs/thread-1196568-1-1.html',
site: '一亩三分地',
author: '匿名用户-OLOJP',
date: '2026-11-11',
category: '海外面经'
}
]"
/>
