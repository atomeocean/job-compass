---
createdDate: 2025-11-21
lastUpdated: 2025-11-21
---
# Amazon Applied Scientist 面试经验（Phone Screen + VO 全流程）

## 1. 基本信息

- **面试国家：** 美国
- **公司名称：** Amazon
- **面试日期：** 2025 年
- **面试职位：** Applied Scientist（AS）
- **候选人背景：** 博士，应届毕业生
- **面试渠道：** LinkedIn reach out / 网上海投

---

## 2. 面试详情

### 2.1 面试流程概览

- Phone Screen（ML + Project Deep Dive）
- VO 第一轮：Project Presentation
- VO 后续五轮：Stats / ML / Coding / LP（每轮 1 小时）
- 每轮均含 ~20 分钟 Leadership Principles

---

## 2.2 各轮面试内容与细节

### **第一轮：Phone Screen**

面试官让我快速自我介绍，然后围绕两个部分深挖：

#### **(1) ML 知识（以项目为核心）**

所有问题都基于我的项目展开，并不断 follow-up：

- RAG 如何 evaluation？  
  → 回答：使用 **ragas**  
- ragas 的 ground truth 从哪里来？  
  → 回答：没有专家标注，用另一 LLM 做 evaluator

面试官还会追问：
- evaluator bias 如何控制  
- retrieval vs generation 的独立评估  
- metric 如何解释

#### **(2) Coding（本轮未考）**

面试官本人不喜欢考 LeetCode，但强调后面可能会考。  
难度接近 ML coding：“知道思路即可”。

#### **结果**

- 周三面试  
- 周五结果：**通过**  
- 约两周后进行 onsite（VO）

---

## **VO Full-round（6 轮）**

- 1 轮 Project Presentation  
- 5 轮技术 + LP  
- 每轮约 60 分钟

---

### **第二轮：Stats Application（统计题 · 难点）**

以为是 ML Design，结果完全不是，是 **纯统计**。

#### **题目：**

给定：
- 30 男性样本  
- 30 女性样本  
- feature：age、score、height 等  

**问：如何判断两个群体的分布是否存在显著差异？**

我尝试：
- KL divergence  
- t-test  

但都不是面试官要的方向。

#### ✅ **期望答案（推测）：Kolmogorov–Smirnov Test（KS Test）**

KS Test 特点：
- 非参数检验（不需要假设数据服从正态）
- 用于判断两组样本是否来自同一分布
- 能比较分布整体形状，而不仅仅是均值
- 输出 D-statistic 与 p-value

在此题中：
- 样本数量小  
- feature 多  
- 分布未知  
→ KS test 是最合理的答案。

#### **LP：Bias for Action, Deliver Results**

---

## 3. 技术重点与思考方式（非完整解答）

### **RAG Evaluation**

- ragas metric 原理  
- evaluator LLM 的偏差与局限  
- 如何分离 retrieval/generation 评估  
- 是否需要 human gold set  

### **统计应用（VO）**

关键点：
- 明确 H0 / H1  
- KS test / t-test / Mann–Whitney U 的适用场景  
- p-value 解读  
- 多 feature → multiple testing 问题  

**KS 是最通用的答案。**

---

## 4. 面试结果反馈

- Stats Application 表现不佳 → 高概率挂点  
- 其余 ML / LP 表现正常  
- 整体偏学术 rigor，难度高  

---

## 5. 总结与建议

- Amazon AS 比一般 ML/DS 面试更强调 **统计基础**  
- KS test、non-parametric tests 必须熟悉  
- LP 占比极高，每轮都有  
- RAG evaluation 虽非重点，但会深入问  
- Coding 并非重难点，但不可忽略  

---

## 6. 小结

AS 面试侧重：

- 统计 rigor  
- 模型解释能力  
- 实验设计能力  
- 业务连接能力  
- LP（尤其 Bias for Action / Deliver Results）

Stats 那轮最容易翻车，建议面试前务必补齐 KS test 与两样本检验的知识。
