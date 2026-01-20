---
title: New Grad SDE
description: Amazon NG面试经验
createdDate: 2025-11-21
lastUpdated: 2025-11-21
outline: deep
---
# 亚马逊 SDE new grad 挂经（第一人称版）

## 1. 基本信息

- 投递时间：5.17  
- 面试国家：美国  
- 职位：Amazon SDE New Grad  
- 结果：挂  
- 过程跨度：3 个月

## 2. 面试流程时间线

### 5.17  
我投递了 Amazon 新人岗。

### 6.26  
收到了 OA，大概三天做完。  
题目是：

- regex matching  
- number of idle robots  

做完我感觉还行，至少不是卡住那种。

### 8.7  
收到了三轮 VO 的面试邀请。

### 8.21 三轮 VO 正式开始  
我一直以为 Amazon 的面试难点是 coding，结果真正把我干碎的是 BQ + 技术混问 和 随机给的题目难度。

## 3. 详细面试过程（我的真实灾难记录）

### 第一轮：白人女面试官  
风格非常 non-tech。  
她完全没问 coding，而是疯狂问我一堆背景问题：

- failure  
- unclear responsibilities  
- simple solution  
- 我在团队里的角色  
- 我的责任范围  

全是 behavioral。  
因为我没准备项目深挖，她问我项目细节的时候我有点乱。

我本来以为 Amazon 会问 coding，结果第一轮居然一题都没有。  
这反而让我更紧张。

### 第二轮：外国女面试官  
这一轮进去就是 Customer Obsession + Mentoring 的 BQ。  
我刚答完，她直接开始问技术。

coding 题是：

> 自己建一个 graph，求最短路径（Dijkstra）

我写完之后，她给了我两个例子让我手动 run 一遍。  
然后要我分析：

- 时间复杂度  
- 空间复杂度  
- 是否能优化  
- 为什么这样设计  

我当时感觉压力很大，但算是硬写完了。

### 第三轮：黑人女士面试官  
这轮完全没有 BQ。  
一开始我以为是好事，结果是噩梦。

第 1 题：Word Ladder  
写完以后她问我：

> “你会怎么优化？”

我甚至没时间稳定情绪，直接硬着头皮讲了两点思路。

第 2 题：双指针找 string 里重复的字母数量  
这题简单，但我已经累到脑子发干。

面完我就知道我凶多吉少。

## 4. 最终结果

那天我收到了 rejection email，内容非常标准：

Thank you for interviewing…  
After careful consideration, we've decided not to progress with your application.  
We’d like to keep in touch…

看到 email 的瞬间其实没太意外，三轮里我明显有两轮没有发挥好。

## 5. 我为什么挂（我自己的复盘）

### 1. BQ 和项目深挖准备不足  
Amazon 不光问 LP，还会连带项目底层实现、困难点全部挖出来。  
第一轮我被问懵，就是因为我以为“不问技术”。

### 2. Coding 难度随机，完全不可控  
别人第一轮就遇到 Dijkstra。  
我第二轮遇到 graph，第三轮又是 Word Ladder。  
我没有稳定住。

### 3. Amazon 的平台不能 run  
只能凭脑子推，debug 成本很高。  
我不太适应这种模式。

### 4. 情绪被打乱  
第一轮突然全 BQ → 第二轮突然 graph → 第三轮又来 hard-ish + follow-up  
到最后我整个人都是浮的。

## 6. 我从这次挂经学到的事情

- Amazon 的 BQ 必须准备得非常扎实  
- 任何你在 BQ 中说出口的技术词都可能被拷问到底  
- Coding 题要练习在“不能 run”的环境里写  
- Graph + BFS/DFS + Word Ladder 必须熟到不能再熟  
- LP 的回答要结构化、稳定、有逻辑  

最重要的一条：

**Amazon VO 的难度不固定，你必须准备最坏情况。**

