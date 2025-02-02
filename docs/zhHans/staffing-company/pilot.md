---
title: Pilot ICC
---
<script setup>
import pilotInformation from './pilot.json';
import { ref } from 'vue';

const pilotDescription = ref(pilotInformation);


</script>

# Pilot ICC

### 公司信息

<StaffingCompanyInformation :staffingCompanyInfo="pilotDescription.basicInformation"/>

### 人力资源专员 Recruiter/HR

<StaffingCompanyRecruiterTable :staffingCompanyRecruiters="pilotDescription.recruiters" />

### 上船待遇

#### 人员培训 training

| 信息类别     | 具体内容 |
|----------|------|
| **培训内容** |      |
| **时长**   |      |
| **收费情况** |      |
| **可以远程** |      |

#### 外包谈判 marketing


| 信息类别     | 具体内容 |
|----------|------|
| **持续时长** |      |
| **预期准备** |      |
| **收费情况** |      |
| **可以远程** |      |

### 下船待遇

#### 上岸

#### 主动退出

#### 被动退出

### 航海日志

#### 2024年12月

在微信群发布了招聘信息

【招聘】
1. 有经验的Java developer，或在mkting的
2. Android Trainer（part time fully remote）
3. 1月Java batch开放面试（可抽签）
   感兴趣加微信：pilot-hr

#### 2022年12月

一共一轮电面包含三部分开始会让你自我介绍然后说下简历上的工作经验（项目没问）然后问了Java的一些基本概念和两道coding概念：什么是OOPsetVScollectionabstractionVSinheritanceoverloadingVSoverridingconstructorVSmethod什么是interface说一下HashMap什么是Map常用什么编辑器说一下现在Java到什么版本了Coding部分利口217利口876

一轮电面面试流程（包含三部分）

📌 1. 自我介绍 & 工作经验
	•	先进行 自我介绍。
	•	介绍 简历上的工作经验（但未涉及项目相关问题）。

📌 2. Java 基础概念问答

面试官提问了一些 Java 基础概念，包括：
	•	面向对象编程（OOP）
	•	Set vs Collection
	•	Abstraction vs Inheritance
	•	Overloading vs Overriding
	•	Constructor vs Method
	•	什么是 Interface
	•	HashMap 相关概念
	•	什么是 Map
	•	常用的 Java 编辑器
	•	当前 Java 最新版本

📌 3. Coding 题目（LeetCode）

两道算法题：
	1.	LeetCode 217 - 存在重复元素（Contains Duplicate）
	2.	LeetCode 876 - 链表的中间节点（Middle of the Linked List）

总结：
	•	面试内容以 Java 基础 + Coding 为主，未涉及项目细节。
	•	建议准备 Java OOP 相关概念、集合框架（Set/Map）、常见编辑器使用，以及 Java 版本的更新情况。
	•	LeetCode 题目主要涉及数据结构（数组 & 链表）。 🚀
