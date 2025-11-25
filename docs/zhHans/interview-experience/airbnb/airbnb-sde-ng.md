# Airbnb 面试经验（New Grad · VO1 + VO2 全流程）

## 1. 基本信息

- **面试国家：** 美国
- **公司名称：** Airbnb
- **面试日期：** 2025 年（VO1 周二，VO2 周三）
- **面试职位：** New Grad Software Engineer
- **候选人背景：** CS/CE专业硕士，0–1 年经验
- **面试结果：** VO 通过 → 周五通知进入 Team Match

 

## 2. 面试详情

### 2.1 面试流程概览

- OA（若有）
- **VO1（Virtual Onsite Coding）**
- **VO2（Virtual Onsite Coding + Follow-up）**
- Team Match

Airbnb 技术面明确要求：

**代码必须完整实现 + 可编译 + 可运行 + run test 全通过 + follow-up 回答完。**  
只讲思路基本不过（除非是连连看那类超大题）。

 

## 2.2 各轮面试内容与细节

 

# 第一轮：VO1（Coding）

## 题目：带截止时间的任务调度（贪心）

每个任务包含：

- id  
- deadline（天）  
- reward  

每个任务耗时一天。

### **目标**

安排任务，使总奖励最大且任务能在 deadline 前完成。  
输出任务执行顺序 + 最大奖励。


## 思路（贪心）

1. 按 reward 降序排序  
2. 对每个任务，从其 deadline 往前找可用槽位  
3. 若能放则放；否则跳过  
4. 最终从 slots 中取出任务作为 schedule  


## 实现细节

- 用 `slots[]` 表示每天是否已经被占用  
- 长度 = max(deadline)  
- 时间复杂度：O(N log N + N·D)  
- 空间复杂度：O(N + D)

 

## 面试中犯的错误

一开始写成从前往后扫描 → 贪心无效。  
改回从 deadline 往前扫描后，20 分钟完成并 run test 全通过。

 

# 第二轮：VO2（Coding + 多轮 Follow-up）

## **题目：房源组合优化（近似 Hard 难度）**

给你一堆 Airbnb 房源，每个房源有：

- id  
- neighborhood  
- capacity  
- amenities（可选）

要求：

在指定社区中，选择若干房源，使：

1. **总容量 ≥ groupSize**  
2. **优先最小化房间数量**  
3. **次要目标是最小化总容量（避免浪费）**

返回所选房源的 id 列表。  
无解则返回空列表。

属于典型 **二维优化 / 带权子集和**，Hard 难度。


## 思路（DP）

### 1. **筛社区 & 必须 amenities**

过滤：

```
p.neighborhood == target_neighborhood
required_amenities ⊆ p.amenities
```

### 2. **DP 状态**

```
dp[s] = (k, ids)
```

表示：

- 达到容量 s  
- 使用 k 间最少  
- 具体房源组合 ids  

初始化：

```
dp[0] = (0, [])
```

### 3. **转移**

对每个房源 p：

```
dp[s + p.capacity] = min(
    dp[s + p.capacity],
    (dp[s].k + 1, dp[s].ids + [p.id])
)
```

比较规则：

1. 先比 k（房源数量）  
2. 再比容量 s（越小越好）

### 4. **取结果**

遍历所有 s ≥ groupSize，找最优解。


## 时空复杂度

- 时间：O(n·S)  
- 空间：O(S)  
其中 S = 所有候选房源 capacity 总和。

15 分钟写完主体代码。


# VO2 Follow-up 1：  
**为什么要 Fast-pass 检查「是否存在单房源即可满足 groupSize」？**

解释：

- DP 会覆盖一切情况，但提前 fast-pass 可以在 groupSize 很小、单房源很大的情况下减少 DP 花销  
- 小优化，但非必要  
- Airbnb 面试官主要看你是否知道这是「剪枝」


# VO2 Follow-up 2：  
**时间 & 空间复杂度解释**

标准 DP：

- 时间 O(n·S)  
- 空间 O(S)

完全正确。


# VO2 Follow-up 3（重点考察）：  
**如果 S 非常大怎么办？（例如百万级）**

他们要的是：

## 👉 Meet-in-the-middle（中分法）

- 把 n 个房源分成两半  
- 对每半做子集枚举（2^(n/2)）  
- 每半生成列表 A、B  
- 对 A 的每个组合，在 B 里二分查找满足 groupSize 的最优解  

复杂度：

- 时间：**O(2^(n/2))**  
- 空间：**O(2^(n/2))**

远优于 DP 的 O(n·S)。

这是 VO2 最有含金量的一问。


# VO2 Follow-up 4：  
**加入 amenities 的参数该怎么处理？**

回答：

- 不进入 DP  
- 在 **筛社区阶段** 直接过滤  
- 条件：`required_amenities ⊆ p.amenities`  
- DP 保持不变  
- 复杂度不受影响


## 3. 解决方法与思考步骤（总结）

- 先过滤房源（社区 + 必需设施）  
- DP 做二维最优（数量最少 → 容量最小）  
- 大数据量用 Meet-in-the-middle  
- Fast-pass 属于剪枝优化  


## 4. 面试结果反馈

- VO1：通过  
- VO2：面试官满意  
- 周五通知进入 Team Match


## 5. 总结与建议

Airbnb 重视：

- 代码可运行  
- 思路清晰  
- Follow-up 的推理能力  
- Trade-off 分析深度  

题型偏：

- Greedy  
- DP  
- Subset Optimization  
- Meet-in-the-middle  
- Interval / Schedule  
- Implementation 必须完整可运行

