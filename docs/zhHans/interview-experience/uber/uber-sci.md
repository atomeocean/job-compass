---
createdDate: 2025-11-21
lastUpdated: 2025-11-21
---
# Uber Scientist 面试经验（Delivery Logistics 组 · Switchback + Guardrail 翻车案例）

## 1. 基本信息

- **面试国家：** 美国  
- **公司名称：** Uber  
- **面试日期：** 2025 年  
- **面试职位：** Applied Scientist / Scientist（Delivery Logistics）  
- **候选人背景：** Econ PhD  
- **面试形式：** 1 轮 Coding + Case，1 轮 BQ + Case  
- **结果：** 新鲜挂  



## 2. 面试详情

### 2.1 面试流程概览

- Round 1：Coding + Experiment Design  
- Round 2：BQ + Case（重点：Switchback、Guardrail、Metrics）  


## 2.2 各轮面试内容与细节

### 第一轮：Coding + Experiment Case

面试官背景是 Econ，聊天气氛算轻松。

#### (1) Coding：LC Easy（移动 0）

题目大概是：

> 把 list 中的所有 0 移到末尾，保持非 0 元素的相对顺序。

我先把两种思路说了，然后写完第一种，最后讲了下 time/space complexity。  
整体过关。

#### (2) Experiment Design：Randomization + Synthetic Control

我解释了为什么 randomization 做不了，接着提出 synthetic control。  
对方继续追问 donor pool、matching、bias 等，我都能答上来。  
第一轮算顺利结束。


### 第二轮：BQ + 深入 Case（Switchback + Guardrail，我的死亡现场）

这一轮面试官说话快得离谱，我几乎是一路狂奔着答。

#### (1) Surge Pricing 的 Causal 验证

我先讲 randomization 不可行，然后提出了 synthetic control 和 switchback。  
他听到 switchback 之后立刻说：“那很好，我们就深入这个。”

#### (2) Switchback 基础（这一段我还行）

- treatment/control 如何切  
- window 怎么选  
- washout 怎么设计  
- sample size 怎么定  

这些我都有准备，我以为我能稳住局面。


## 3. 我真正挂掉的地方：Guardrail Metrics（致命）

当我以为快结束的时候，他抛出关键一问：

> “我们讨论了 key metrics，你说还有 guardrail。你准备用哪些 guardrail？”

我当时脑子一抽，说了几个：

- satisfaction  
- total trips  

他立刻指出问题：

> “但我们是 switchback，全体都会轮换进 control 和 treatment。  
> long-term satisfaction 这种 metric 没法比较啊。那你怎么测？”

我一瞬间懵住了。

我尝试补救：

- “那在 washout period 看？”
- “或者实验后 vs 实验前？”

都被反驳：

> “如果你只看 before/after，那就没必要用 switchback 了。”

这一刻我知道我大概没救了。


## 4. 面试官真正想听的 Guardrail（我事后才发现）

后来我去翻社区讨论才知道：

Switchback 的 guardrail 必须是：

- **短期可测**  
- **在每个 window 里都能稳定算出来**  
- **不被轮换机制稀释**

例子：

- driver acceptance rate  
- rider cancellation rate  
- abandoned rider requests  
- fill rate  

也就是说：

- **绝对不能选长期 satisfaction**  
- **不能选跨周期 aggregate 指标**

我当场没有说出这些，就是直接致命。


## 5. 面试官反应与我的失败原因总结与建议

- 他追问 guardrail 的方式非常 aggressive  
- 我的 guardrail 框架本质是错的  
- switchback 会让长期指标全部失效，这点我没有意识到  

最致命的一点是：

> 我理解了 switchback，却没理解 guardrail 要“短周期可比较”。
