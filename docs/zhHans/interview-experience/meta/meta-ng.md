# Meta New Grad 面试挂经

## 1. 基本信息

- 面试国家：美国  
- 公司：Meta  
- 职位：New Grad Software Engineer  
- 面试类型：2 Tech + 1 Behavioral（当天下午 back-to-back）  
- 背景：应届、提前投递  
- 结果：Fail（Onsite 后收到拒信）  

## 2. 面试流程概览

- Recruiter 电话约面  
- 三轮 Onsite：Tech → Tech → Behavioral  
- 无反馈，直接拒  

整体节奏非常快，follow-up 一轮接一轮。  
Meta NG 的面试整体感觉不算难，但临场反应要求特别高。

## 3. Tech 轮（第一轮）

面试官简单寒暄结束后，让我一句话自我介绍，然后直接开始做题。

### 第一题：Subarray Sum Equals K

我先讲 prefix sum 的思路。  
面试官听完让我写代码。  
代码写完后，他开始追问：

> “If there are negative numbers, does your approach still work?”

我解释了为什么 brute force 会爆，prefix sum + hashmap 是最优。  
他点头继续追问 edge cases。  
我逐条回答，感觉还算稳。

### 第二题：Matrix Shortest Path（BFS）

我说 BFS 是最直接的写法。  
实现完后面试官立刻问：

> “What if the path must go through position (a, b)?”

我解释可以拆成两次 BFS，把距离拼起来。  
整体问得挺深，但我觉得这一轮我撑住了。

## 4. Tech 轮（第二轮）

节奏和第一轮几乎一样，面试官更快、更直接。

### 第一题：Minimum Remove to Make Valid Parentheses

我讲了基本思路。  
写完后面试官突然问：

> “Can you do it with O(1) extra space?”

我说可以两次遍历实现。  
他让我讲得更细，我补了一些实现细节。

### 第二题：Longest Increasing Subsequence（LIS）

我先写了 O(n²) DP。  
面试官立刻问：

> “Can you optimize it to O(n log n)?”

我讲了 patience sorting 的核心思想。  
他继续问我每一步为什么这样做，我尽量把 intuition 讲清楚。

结束时我感觉时间有点紧，但没有明显错误。

## 5. Behavioral（第三轮）

这一轮全是常规 BQ，没有奇怪问题。

主要问：

1. 我遇到冲突、如何解决  
2. deadline 很紧的交付经历  
3. 我面对最大挑战时的处理方式  
4. 我的团队协作经验  
5. 我最自豪的项目经历  

我用 STAR 格式把事情讲清楚了。  
面试官态度很温和，但我不知道这轮对结果有没有加分。

## 6. 最终结果

与 Recruiter 通话后一周左右，我收到了拒信。  
没有任何 feedback。  
猜测应该是 Tech 轮表现不够强，或者 follow-up 的解释不够深入。

## 7. Recruiter 的关键提醒（与我面试感受一致）

Recruiter 在 prep call 就说过：

> “Meta’s coding bar is the same for all levels.  
>  If you don’t meet the coding bar, nothing else matters.”

也就是说：

**coding 一旦不过，后面的 Behavioral 再好也救不回来。**

所以我基本确定我是挂在 Tech 轮。

## 8. 我的复盘

### 1. follow-up 反应不够快  
Meta Tech 轮会疯狂追问，我有几次讲得不够精炼。

### 2. 没有提前准备 worst-case 的解释  
尤其是 LIS 和 Valid Parentheses，那些优化点需要讲得更扎实。

### 3. 时间分配不够好  
Meta 的两轮 Tech 时间都很紧。  
写得太慢就会被认为 coding 不够 strong。

### 4. BQ 不能救 coding  
这一点 Recruiter 讲过，但到了现场我还是有点侥幸。

## 9. Takeaways（经验教训）

- Tech 轮最重要的是 follow-up  
- 每道题都要主动讲 time/space complexity  
- 讲清楚 worst-case 和优化  
- Meta 的 Tech 问题不难，但深度问得狠  
- 第一题不能拖时间，一拖后面整个节奏乱掉  

## 10. 小结

这一轮 Meta NG 对我的最大提醒就是：  
**你以为自己准备好了，但 follow-up 暴露真实水平。**

虽然挂了，但这是一次非常好的训练。  
之后我会更系统地准备每道题的变形、worst-case 和 follow-up。
