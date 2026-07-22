---
title: New Grad SWE
createdDate: 2026-07-14
lastUpdated: 2026-07-16
outline: deep
---
# Uber New Grad SWE 面试经验

## 面试基本信息

- 公司信息：Uber（官网链接未提供，待补充）
- 面试时间：2026年5月

<InterviewDetail />

## 面试过程

### Phone Screen（电面，Coding 45分钟 + BQ 10分钟）

题目是实现一个函数，对一组「衣服尺寸」进行排序。面试官一开始没有给出输入格式，候选人主动询问输入是 vector 还是 string，面试官回复是 string，尺寸集合为 S/M/L。面试官全程没有提出额外约束或变体，后续的优化和扩展均为候选人主动完成。

候选人的解题过程：

1. 先给出通用解法：比较排序（comparison sort），将尺寸映射为 rank 后排序，时间复杂度 O(n log n)。
2. 注意到尺寸值域小且固定（仅 S/M/L），改用计数排序（counting sort），优化到 O(n)。
3. 主动将方案扩展为支持任意尺寸集合（如 XS/S/M/L/XL...），用 unordered map 实现计数排序。
4. 补充了错误处理逻辑（遇到未知尺寸时忽略）。
5. 最后加入了 validation，验证输出结果确实已排序。

候选人自评这道题完成得比较完整，覆盖了 clarify → 通用解 → 优化 → 主动扩展 + 排错 + 验证的完整流程。

BQ 部分约 10 分钟，主要围绕简历展开，候选人反馈聊得比较愉快。

## 结果反馈

最终结果为 Fail。

## 总结

一次 Uber New Grad SWE 电面的完整记录：单一 coding 题（衣服尺寸排序）从通用解法逐步优化到计数排序，并由候选人主动扩展和验证；BQ 环节氛围良好。尽管过程表现不差，最终结果仍为 Fail。

## 引用来源

<ReferenceSource
:sources="[
  {
    title: 'Uber New Grad 电面｜排序题做满还主动扩展，BQ 聊嗨（求米🙏）',
    link: 'https://www.1point3acres.com/interview/thread/1182751',
    site: '一亩三分地',
    author: '匿名用户',
    date: '2026-07-11',
    category: '面经',
    description: 'Uber New Grad SWE 电面单一候选人第一人称记录，含 coding 题目详细解题过程与 BQ 环节反馈，结果为 Fail。'
  }
]"
/>
