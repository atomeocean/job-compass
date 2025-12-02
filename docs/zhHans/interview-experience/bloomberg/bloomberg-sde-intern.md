---
createdDate: 2025-11-21
lastUpdated: 2025-12-01
---
# Bloomberg SDE New Grad 2026 面试挂经（第一人称 · 全流程）

## 1. 基本信息

- 面试国家：美国  
- 公司名称：Bloomberg  
- 面试日期：2024–2025 秋季  
- 面试职位：SDE New Grad 2026  
- 候选人背景：新毕业生（refer 内推）  
- 结果：挂  

## 2. 面试流程概览

- Virtual 面（项目 + BQ + Coding）  
- On-campus Round 1（BQ + 两道 Coding）  
- On-campus Round 2（BQ + 两道 Coding）  
- EM 面（项目 Deep Dive）  
- HR 面（BQ + 签证 & 毕业时间）  

## 3. Timeline

### 9.23  
refer 后提交申请。

### 10.1  
收到面试通知。

### 10.3 Virtual  
流程是简单自我介绍、讲一个项目、why Bloomberg。  
Coding 是一道 medium–hard 之间的题，从来没见过。  
上午面完，下午就收到 on-campus 邀请。

### 10.7 On-campus Round 1  
15 分钟 BQ + 简历深挖。  
两个 SDE 轮流问，一人出一道题：

- Merge k Sorted Lists（简化版）  
- Binary Tree 每层连起来（connect level pointers）

面完直接问我“明天有没有空”。

### 10.8 On-campus Round 2  
和前一天相同流程、同一地点。

Coding 题：

- Magic Dictionary 的变形  
- 一个用两个 map 就能做的题

### 10.10  
收到下一轮一个半小时 interview。

### 10.16 EM + HR  
EM 面一小时，HR 半小时。

EM：

- 项目 deep dive  
- database sharding  
- shard 掉了怎么办  
- 我回答 duplicate，被要求给更好的方案  
- 正确方向是 overlapping shards，我隐约有印象但答不上来  
- routing：如何知道去哪个 database？  
- backend 做好还是 load balancer 做好？  
- 整轮基本都围绕 sharding，节奏被带跑

HR：

- 全是 BQ  
- sponsor 相关问题  
- 毕业时间确认  

### 10.20  
据信。

## 4. 详细面试过程（我的真实翻车点）

### 4.1 Virtual 面  
项目 + BQ 顺利，Coding 难但写完了。

### 4.2 On-campus 两轮  
每天都是相同流程：BQ + 两题 Coding，问得紧凑，节奏快。

我感觉 Bloomberg 很重视：

- code clarity  
- follow-up 优化  
- 解释 reasoning 的能力  

### 4.3 EM 面（最大挂点）

我误以为 EM 会问 high-level 的架构，结果完全不是。

问的全是实现层面的细节：

- sharding 的方式  
- failure recovery  
- shard overlap  
- routing metadata 放哪里  
- backend vs load balancer routing 的取舍  
- shard lookup 的完整路径  

我很多都只停留在概念层，没有到 implementation 级别，于是彻底暴露。

尤其是 overlap & routing，这两块是我最不熟的，被连续追问。

## 5. 我为什么挂（复盘）

### 1. 项目准备太 high-level  
EM 问的是实现细节，我只准备到宏观层面。

### 2. Sharding 理解不足  
包括 failure、overlap、routing，都不到位。

### 3. 节奏完全被 EM 带着走  
没有把对话引导到我熟悉的方向。

### 4. Bloomberg 的 EM 面比预期更偏 infra  
深度比普通 system design 更底层。

## 6. Takeaways（经验教训）

- 讲项目时要主动主导话题方向  
- Database & sharding 必须准备到能画出 read/write path 的程度  
- Bloomberg 的追问方式是“不断挖到你不会为止”  
- On-campus 的节奏快，要提前进行 mock 适应  
- Coding follow-up 一定会问优化  
