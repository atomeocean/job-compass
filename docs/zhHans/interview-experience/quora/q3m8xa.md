---
title: NG SWE OA + 1轮技术电面
description: Quora New Grad SWE OA + 技术电面面试经验
outline: deep
createdDate: 2026-11-12
lastUpdated: 2026-11-12
---
# Quora New Grad SWE OA + 技术电面面试经验

<InterviewDetail />

## 面试详情

### OA（CodeSignal，4 题）

- 前两题很简单，记不清了。建议做题顺序：一 → 二 → 四 → 三。
- **第三题**：矩阵斜线反弹，只能往右上和左下两个方向走，碰到边界就换斜线、反向。起点可以是左上角，也可以是最左列的任意一格。类似[蠡口 死久八](https://leetcode.com/problems/diagonal-traverse/)。
- **第四题**：路灯覆盖，求被最多盏灯照到的坐标，并列时取最小。类似[蠡口 尔零尔幺](https://leetcode.com/problems/brightest-position-on-street/)。

### 技术面（1 小时，Zoom + CodeSignal）

面试官人很好。

- **第一题**：Meeting Scheduler，给一组会议的开始和结束时间，问某个时刻有多少个会议同时在进行。follow-up 是会议时间可以修改，class 怎么设计。类似[蠡口 尔尔武幺](https://leetcode.com/problems/number-of-flowers-in-full-bloom/)。
- **第二题**：枚举二进制串。按"先短后长、同长度按字典序"排列所有 0/1 串（空串、0、1、00、01、11、000...），求第 n 个。

<ReferenceSource
:sources="[
{
title: 'Quora NG SWE：OA + 1轮技术电面',
link: 'https://www.1point3acres.com/bbs/thread-1196482-1-1.html',
site: '一亩三分地',
author: '可爱的大葱',
date: '2026-11-10',
category: '海外面经'
}
]"
/>