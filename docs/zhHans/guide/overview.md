---
title: 目录概述
description: 本页介绍当前目录下的所有Markdown文件及其简要说明。
lastUpdated: 2026-07-10
---

<script setup>
const overviewItems = [
  {
    "title": "劳务派遣公司信息辅助文档",
    "description": "该文件主要介绍 劳务派遣公司信息辅助文档 的相关内容。",
    "href": "./staffing-company-utils/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "招聘信息辅助文档",
    "description": "该文件主要介绍 招聘信息辅助文档 的相关内容。",
    "href": "./job-postings-utils/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "直招公司信息辅助文档",
    "description": "该文件主要介绍 直招公司信息辅助文档 的相关内容。",
    "href": "./direct-hire-company-utils/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "船长笔记",
    "description": "该文件主要介绍 船长笔记 的相关内容。",
    "href": "./captain-notes/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "贡献指南",
    "description": "如何参与贡献 Job Compass 项目，包括内容提交、代码修改、问题反馈等完整流程",
    "href": "./contribution-guide/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "面经投稿手册",
    "description": "该文件主要介绍 面经投稿手册 的相关内容。",
    "href": "./interview-experience-utils/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "CC许可证",
    "description": "该文件主要介绍 CC许可证 的相关内容。",
    "href": "./creative-commons.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "GitHub注册与本地配置指南",
    "description": "本指南将详细介绍如何注册 GitHub 账号，并在本地配置 Git 环境，以便能够使用 GitHub 进行代码管理。指南包括 macOS 和 Windows 两种操作系统的配置步骤。",
    "href": "./github-setup-guide.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "GitHub网页发布PR指南",
    "description": "本指南详细介绍如何在GitHub网页端发布Pull Request，包括提交修改、设置 Reviewer 和 Assignees 等步骤。",
    "href": "./github-pull-request-guide.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "Json语法指南",
    "description": "Json语法指南",
    "href": "./json-cheatsheet.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "Markdown基础语法",
    "description": "Markdown 基础语法指南",
    "href": "./markdown-cheatsheet.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "Markdown进阶语法",
    "description": "Markdown 基础语法指南",
    "href": "./markdown-advanced-cheatsheet.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "任务指南",
    "description": "任务的指南",
    "href": "./task-guide.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "作者信息模块文档",
    "description": "该文件主要介绍 作者信息模块文档 的相关内容。",
    "href": "./author-info.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "团队信息",
    "description": "该文件主要介绍 团队信息 的相关内容。",
    "href": "./team.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "目录结构",
    "description": "该文件主要介绍 目录结构 的相关内容。",
    "href": "./directory-structure.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "第一性原理",
    "description": "该文件主要介绍 第一性原理 的相关内容。",
    "href": "./first-principles.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "项目开发参与指南",
    "description": "如何参与到Job Compass开源项目的开发",
    "href": "./participation-guide.md",
    "order": 0,
    "kind": "article"
  }
]
</script>

# 目录概述

以下为该目录下所有的Markdown文件及子目录的介绍：

<DirectoryOverview :items="overviewItems" />

> [!NOTE] 请通过Script生成此文件
> 本文件只能通过 generate_folder_overview Script 构建，不能直接修改
