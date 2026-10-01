---
title: OA面经
description: Apple Software Engineer OA面试经验
outline: deep
createdDate: 2026-10-01
lastUpdated: 2026-10-01
---
# Apple Software Engineer OA面试经验

<InterviewDetail />

## 基本信息

- **岗位**：Software Engineer（码农类General）
- **面试形式**：OA（在线笔试）
- **申请渠道**：网上海投
- **候选人背景**：硕士，在职跳槽

## 面试详情

### Coding

给定两个 ASCII 字符串 str1 和 str2，编写程序来合并（factorize）两个字符串的边缘重叠部分，并返回拼接后的字符串。

具体规则如下：

1. 寻找前一个字符串的末尾与后一个字符串的开头之间最长的公共子串，并在拼接时进行合并（该公共部分仅保留一次）。
2. 拼接顺序可以为 str1 + str2，也可以为 str2 + str1。你需要比较两种顺序，选择能获得最长重叠部分（即最佳合并效果）的顺序进行拼接。
3. 如果两种拼接顺序得到的重叠部分长度相同，优先选择 str1 + str2 的顺序。

**示例**：

**输入**：str1 = "1234yyabc", str2 = "abcxxxx1234"

1. 若按 str1 + str2 顺序拼接，重叠部分为 "abc"，拼接结果为 "1234yyabcxxxx1234"
2. 若按 str2 + str1 顺序拼接，重叠部分为 "1234"，拼接结果为 "abcxxxx1234yyabc"
3. 比较重叠长度，"1234"（长度 4）优于 "abc"（长度 3），因此最终返回 "abcxxxx1234yyabc"

<ReferenceSource
:sources="[
{
title: 'Apple OA面经',
link: 'https://www.1point3acres.com/bbs/thread-1189580-1-1.html',
site: '一亩三分地',
author: '匿名用户-IJLR9',
date: '2026-09-15',
category: '海外面经'
}
]"
/>
