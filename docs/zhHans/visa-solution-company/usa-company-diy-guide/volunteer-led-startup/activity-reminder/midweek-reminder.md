---
title: 周中提醒
description: 提醒轻量组员工完成工作量
outline: deep
lastUpdated: 2025-06-29
order: 1
---
# 周中提醒

## 概述
这是一个用于提醒工作量为0的员工及时完成工作量要求的标准化流程。该流程采用渐进式自动化方案，从手动操作逐步过渡到全自动系统通知。

## 计划演进流程

实现计划是如下流程
1. 通过手动发送邮件和微信私信
2. 使用脚本读取json自动化发送
3. admin后端根据logbook定时任务检查，并自动发送

### 发送内容

以下文本可以直接复制。


## 邮件通知

> [!CAUTION] 邮件必需
>  必须要有邮件通知，因为邮件可作为工作证据留存。在邮件中包含pr链接，并使用英文作为内容

抄送邮件给supervisor
```text
Supervisor邮箱
```

邮件主题
```text
Atomeocean Lightweight Team Midweek Reminder [Action Required]
```


邮件内容
```text
Hi [Recipient_Name],

This is a friendly reminder regarding your work progress in the lightweight team this week. 
Our records show your current task completion status requires attention.

Please:
1. Update your task progress in the GitHub system
2. Ensure all work logs are properly recorded. https://logbook.atomeocean.com/team-information/light-weight-team-information/light-weight-team-contributions.html
3. Reference related PR: [PR_LINK_HERE]

Let me know if you need any support to complete your tasks.

Best regards,

```

## 微信通知

企微私信
```text
[轻量组工作提醒] 哈喽：

系统检测到您本周的工作量尚未达标，请及时处理：
1. 查看提醒邮件（主题：Atomeocean Lightweight Team Midweek Reminder）
2. 如有特殊情况请告知主管

（本消息由系统自动发送）
```

## Discord通知


### 私信

```text
哈喽，公司需要你把这个pr review一下保证轻量组工作量
pr链接：[PR_LINK_HERE]
```

> 挑战是github和discord难以对应到具体的staff