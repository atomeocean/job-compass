---
createdDate: 2025-11-21
lastUpdated: 2025-11-21
---
# Snapchat L5 面试经验（FrontEnd · Seattle）

## 1. 基本信息

- **面试国家：** 美国
- **公司名称：** Snapchat
- **工作年份：** 2025
- **求职季节：** 1–3 月
- **工作来源：** Other
- **工作类别：** 全职
- **地区：** 大西雅图地区
- **职位类别：** FrontEnd Engineer
- **岗位类别：** IC（Individual Contributor 技术岗，不管人）
- **级别 / Title：** L5
- **候选人背景：** 本科，8 年工作经验（区间 5–10 年），在职跳槽

## 2. 面试详情

### 2.1 面试流程概览

- Recruiter LinkedIn 联系
- 第一轮 Coding
- 第二周车轮战：共 5 轮（拆成两天）
- Team match
- 薪资沟通

整体难度不高，偏 **前端工程实战型**。

## 2.2 各轮面试内容与细节

## 第一轮：Coding（初筛）

### Coding 题 1：简单 DP
难度不高，状态转移很直接。

### Coding 题 2：一维数组跳跃
- 每个格子带方向：L / R / LR
- 数字表示固定跳跃距离
- 问是否能从 index 0 跳到目标格子  
使用 **BFS + visited** 解决，结果通过。

## 第二周车轮战（两天共五轮）

# D1 — 三轮

### 1. FE Coding：Promise 并发控制器（Semaphore）
实现 async concurrency controller：  
- Promise queue  
- acquire / release  
- 控制并发数量  
- 考 JS 异步模型

### 2. Coffee Chat
轻松聊天，不涉及 hard 技术。

### 3. React Coding：GitHub Heat Map UI
- grid 渲染
- hover 状态
- 色阶映射
- React 状态管理  

主要考察前端工程能力。

# D2 — 两轮

### 1. System Design（偏前端体系）
内容包括：  
- 大表格（table）
- virtual list / virtualization
- 数据加载策略
- CSR vs SSR
- 性能 & 架构 trade-offs

强调扩展性、数据加载、组件结构拆分。

### 2. React Coding：图片预览 Slider
类似 macOS Preview：  
- 左右切图  
- 自动循环播放  
- 动画过渡  
- 状态同步  

考 UI 思维 + React 熟练度。

## 3. Offer 包结构（概述）

### Base
原本给 26（按地里习惯为 26w），谈过后略涨。

### RSU（Snapchat 两部分结构）

#### 1）Onboarding Grant
- 第一年约 15–20w
- 后续逐年递减
- 三年结束
- 入职当日股价锁定

#### 2）Yearly Performance-based Grant
- 每年固定 yearly target
- perf 会影响 grant 数量
- 数量依据季度股价动态调整

### Sign-on Bonus
第一年有，金额需解锁。

## 4. 思考步骤与解决方法

### FE Coding（Promise Concurrency）
- queue + semaphore  
- 解释 async/await 执行流程  

### React UI 实战题
- 组件拆分  
- 状态管理  
- 渲染优化  
- UI 行为逻辑  

### System Design（前端）
- virtualization  
- 数据流处理  
- caching  
- CSR / SSR 区别  
- scalability 取舍  

## 5. 面试结果反馈

- **最终结果：Pass（Offer）**
- Team match 快
- 面试官友好，偏实战技术讨论

## 6. 总结与建议

- Snap 前端面试重点：JS 异步、React UI、virtual list、CSR/SSR
- 不刷 LeetCode-heavy
- 准备可现场完成的 UI demo（heatmap / slider / explorer）
- System design 偏前端架构

