---
title: 极度无语的一次谷歌面试体验
description: Google Software Engineer Onsite 面试经验
outline: deep
createdDate: 2026-11-16
lastUpdated: 2026-11-16
---
# Google Software Engineer Onsite 面试经验

<InterviewDetail />

## 面试详情

- **Onsite 地点**：Mountain View

大概半年前通过朋友内推开始了这个流程，中间 recruiter 帮我换过一次职位，五六月份面了 R1。

### R1：Coding + BQ

第一道是 [Course Schedule](https://leetcode.com/problems/course-schedule/) 的变种，比较熟，所以做得很顺，follow-up 也答得不错，中间还和面试官讨论了各种 test case。第二轮是 BQ，聊得也很顺利。之后 recruiter 告诉我，面试表现是 “impressive”，可以进入下一轮 onsite。

### Onsite

结果后面又拖了两三个月。负责移民审核的人一直没搞清楚我的 nickname 和 legal name，我发过好几封邮件解释，也不知道有没有被看到。最后是另一位 recruiter 联系我，才把 onsite 安排下来，地点选在 Mountain View。

Onsite 的两位面试官都很 nice，交流也挺顺畅。不过我是从东岸飞过去的，连续两天没睡好，面试时整个人有点恍惚。

#### 第一轮：Coding

第一轮先聊了我的工作经历，以及做过的、自己觉得比较有意思的项目，大概聊了 10–15 分钟，然后开始做题。题目比较像 [Longest Continuous Subarray With Absolute Diff](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)。我先和面试官讨论了双指针加 sliding window 的思路，他说没问题，我就开始写。结果写着写着脑子有点乱，想到这题也可以用 deque，又往代码里加了一个 stack，把自己绕进去了，卡了两三分钟。

面试官这时候提醒了一句：“你没必要加 stack。”我才重新理清思路，把代码写完，后面的 follow-up coding 也做完了。

#### 第二轮：Coding

第二轮上来就直接做题，有点像 [Word Search II](https://leetcode.com/problems/word-search-ii/)，背景是手机键盘的滑动输入。比如手指滑过的字母是 "cxsasert"，要从里面找出词表里的单词。一开始面试官只是拿手机给我演示，没说具体输入是什么，我还以为要做个 tokenizer。后来他才给了一个例子：

str = "cxsasert"，word_list = ["cat", "sat", "you", "insert"]，这个例子要找出 "cat" 和 "sat"。

我想了一下，提了两个思路：用 trie 查找，或者用 BFS 扫描。面试官觉得 trie 不错，我就先把词表建成一棵 trie，每个节点存子节点，以及是不是一个单词的结尾。这样只用建一次，后面的查询可以复用。

接着我主动提了一个边界情况：比如输入是 "balloys"，但词表里没有 "ball"，光查前缀还不够，需要继续往下搜。所以我打算像 Word Search II 一样用 DFS，写了一个 find_word(node, word_idx, comb)，记录当前走到哪个 trie 节点、输入串读到哪里，以及目前拼出来的内容。写的时候有两个 typo，面试官指出来后我改了。

然后他追问，"gokgle" 怎么匹配到 "google"。我一开始想到正则，但讨论了一下没继续往这个方向走。后来在他的提示下，把搜索改成了每一步考虑两种情况：当前字符如果在子节点里，就沿着它继续找；也可以把它当成手指路过的多余字母，直接跳过。两种情况都会把输入串的下标往后移一位。

这个面试官很喜欢交流，这之间我每写几步他都要问我的想法。我其实挺喜欢这种面试style的，只是这样coding会花了很久时间，最后follow up也没时间做了，不过他说没关系，我只要说思路就好了。

我最初把结果放在 self.found_words 里，面试官指出这样在多线程下会有问题，我就改成让函数直接返回结果列表。最后他问这个做法有什么缺点。我以为他在问会不会匹配出不相关的词，但他想问的是：同一个词可能通过不同的跳过路径被找到多次，导致结果重复。我因为有些恍惚，问了他两三遍来澄清。用 set 去重。

## 面试结果反馈

面完我其实感觉不太妙，因为两轮 coding 都用了提示。不过一周后，recruiter 跟我说是 “positive feedback, move to next steps”，然后把我转给了下一位 recruiter。

我和新的 recruiter 通了电话，她说看过我的面试反馈，原话是：“Strong performance in code comprehension, data structures and algorithms on the coding rounds. BQ is also good.” 我听了还挺高兴的，还跟她double check了一下。随后她跟我要了一份更新后的简历，说要一起送到 Hiring Committee。

接下来就是等了将近四个星期。期间我发邮件问过几次进度，recruiter 也不太回。直到这两天终于联系上了，却告诉我没过，理由是 coding performance 是 mixed。我问能不能加面，或者考虑 downlevel，她说已经是 final decision，没有这些选项，冷却期是 12 个月。

我现在的感觉只有莫名其妙四个字。

<ReferenceSource
:sources="[
{
title: '极度无语的一次谷歌面试体验',
link: 'https://www.1point3acres.com/bbs/thread-1196957-1-1.html',
site: '一亩三分地',
author: 'llshan367',
date: '2026-11-13',
category: '海外面经'
}
]"
/>
