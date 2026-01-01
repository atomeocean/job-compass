---
createdDate: 2025-12-31
lastUpdated: 2025-12-31
---
# DoorDash 面试经验（NV Logistics 团队 · Bay Area）

## 1. 基本信息

- **公司名称：** DoorDash
- **Job Compass 公司链接：** DoorDash
- **面试日期：** 2025 年 4–6 月
- **面试职位：** Software Engineer, IC
- **职位链接：** https://careersatdoordash.com/jobs/engineering-manager-logistics-platform/7376391/
- **候选人背景：** 1–3 年工作经验，硕士学历，在职跳槽


## 2. 面试详情

### 2.1 面试流程概览

- OA（在线测评）
- 技术一面（Coding + 项目）
- 技术二面（System Design）
- HM / Manager 面
- HR 面（薪资沟通）


## 2.2 各轮面试内容与细节

### **第一轮：OA**

- 难度偏高，与社区常见 DoorDash 高频题一致。  
- 建议重点复习 Array、Graph、DP、Sliding Window 等题型。


### **第二轮：技术一面（Coding + 项目）**

#### 项目部分
面试官深入问了我过去写过的分布式系统项目，包括：

- concurrency（并发处理）如何保证  
- data consistency（数据一致性）策略  
- 在高流量场景下如何处理资源竞争  

#### Coding 题
- 实现 **LRU Cache**
- Follow-up：扩展为 **LFU**，重点解释如何调整数据结构以兼容频次更新

#### 行为问题（BQ）
- “如果和队友意见不合，你会如何处理？”
- 结合实际经历说明如何收集信息、讨论 trade-offs、达成折中方案。

#### 面试官背景
- 来自核心工程团队，技术追问深入但态度友好。


### **第三轮：技术二面（System Design）**

#### 题目：Delivery ETA 系统（外卖预计送达时间）

需要说明的内容包括：

- **输入数据来源：**
  - traffic（交通）
  - distance（距离）
  - restaurant prep time（餐厅出餐时长）

- **ETA 的估算方式：**
  - 算法公式
  - 模型更新

- **如何扩展到百万级订单：**
  - caching
  - async pipeline
  - load shedding
  - 分布式计算框架
  - 数据更新频率 + 最终/强一致性取舍

#### 设计重点
- trade-offs 讲得越清楚越好  
- 说明如何保证实时性 & 稳定性  
- 面试官会根据回答继续追问扩展性


### **第四轮：HM / Manager 面**

内容包括：

- 介绍 NV 相关团队：logistics、consumer、merchant、dasher  
- 职业路径、未来发展方向  
- 是否对物流系统或支付系统感兴趣  
- 询问我对团队的偏好（team preference）并说明理由  

整体气氛轻松，是双向了解的过程。


### **第五轮：HR 面（薪资 & 地点沟通）**

HR 提到的重点：

- base、equity、sign-on 的薪资范围  
- 可选办公地点：SF / NYC / Seattle  
- 最终数字尚未确认，会根据 team match 进一步沟通


## 3. 解决方法与思考步骤（非完整解答）

### **Coding 题（LRU → LFU）**

- 解释为何选择 HashMap + Doubly Linked List  
- LRU 扩展为 LFU 需要维护 **frequency list**  
- 核心是降低更新频率的复杂度


### **System Design（ETA 系统）**

整体思路：

- 明确输入 → 数据清洗 → 特征提取 → 估算模型  
- 不需要代码，但需要清楚说明：

  - 数据流结构  
  - queue / event pipeline  
  - 缓存策略  
  - 负载扩展手段  

- 提前准备 scalability 常用模式（sharding、fallback、ranking）


## 4. 面试结果反馈

- **最终结果：Pass**  
- HM 面后收到口头 offer，但薪资数字未公布  
- 面试官普遍友好，氛围合作，不是压力面


## 5. 总结与建议

- OA 难度偏高，强烈建议先刷 DoorDash 高频题  
- System Design 是流程中权重最大的部分，需要准备 scalability & trade-offs  
- 行为题无需夸张，但必须清晰、有结构（STAR）  
- NV Logistics 团队问题偏实战，尤其是并发、数据一致性、调度算法
