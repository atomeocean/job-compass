---
title: 目录概述
description: 本页介绍当前目录下的所有Markdown文件及其简要说明。
lastUpdated: 2026-07-12
---
<script setup>
const overviewItems = [
  {
    "title": "Amazon",
    "description": "Amazon 面试经验分享",
    "href": "./amazon/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Apple",
    "description": "Apple 面试经验分享",
    "href": "./apple/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Bethesda Game Studios",
    "description": "该文件主要介绍 Bethesda Game Studios 的相关内容。",
    "href": "./bethesda-game-studios/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Bloomberg",
    "description": "该文件主要介绍 Bloomberg 的相关内容。",
    "href": "./bloomberg/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "ByteDance",
    "description": "该文件主要介绍 ByteDance 的相关内容。",
    "href": "./bytedance/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Capital One",
    "description": "该文件主要介绍 Capital One 的相关内容。",
    "href": "./capital-one/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Coinbase",
    "description": "Coinbase 面试经验分享",
    "href": "./coinbase/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Databricks",
    "description": "该文件主要介绍 Databricks 的相关内容。",
    "href": "./databricks/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "DoorDash",
    "description": "该文件主要介绍 DoorDash 的相关内容。",
    "href": "./doordash/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Fortinet",
    "description": "该文件主要介绍 Fortinet 的相关内容。",
    "href": "./fortinet/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "GEICO",
    "description": "该文件主要介绍 GEICO 的相关内容。",
    "href": "./geico/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Google",
    "description": "该文件主要介绍 Google 的相关内容。",
    "href": "./google/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "ICBC",
    "description": "该文件主要介绍 ICBC 的相关内容。",
    "href": "./icbc/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Meta",
    "description": "该文件主要介绍 Meta 的相关内容。",
    "href": "./meta/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Netflix",
    "description": "该文件主要介绍 Netflix 的相关内容。",
    "href": "./netflix/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Nomura",
    "description": "该文件主要介绍 Nomura 的相关内容。",
    "href": "./nomura/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Notion",
    "description": "该文件主要介绍 Notion 的相关内容。",
    "href": "./notion/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Nvidia",
    "description": "该文件主要介绍 Nvidia 的相关内容。",
    "href": "./nvidia/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Open AI",
    "description": "该文件主要介绍 Open AI 的相关内容。",
    "href": "./openai/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Oracle",
    "description": "该文件主要介绍 Oracle 的相关内容。",
    "href": "./oracle/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Rednote",
    "description": "该文件主要介绍 Rednote 的相关内容。",
    "href": "./rednote/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "SMBC",
    "description": "该文件主要介绍 SMBC 的相关内容。",
    "href": "./smbc/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Snap",
    "description": "该文件主要介绍 Snap 的相关内容。",
    "href": "./snapchat/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Snowflake",
    "description": "该文件主要介绍 Snowflake 的相关内容。",
    "href": "./snowflake/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "TikTok",
    "description": "该文件主要介绍 TikTok 的相关内容。",
    "href": "./tiktok/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Walmart labs",
    "description": "该文件主要介绍 Walmart labs 的相关内容。",
    "href": "./walmart/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Whatnot",
    "description": "该文件主要介绍 Whatnot 的相关内容。",
    "href": "./whatnot/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "被折叠",
    "description": "该文件主要介绍 被折叠 的相关内容。",
    "href": "./folded-entry/index.md",
    "order": 0,
    "kind": "folder"
  }
]
</script>

# 目录概述

以下为该目录下所有的Markdown文件及子目录的介绍：

<DirectoryOverview :items="overviewItems" />

> [!NOTE] 请通过Script生成此文件
> 本文件只能通过 generate_folder_overview Script 构建，不能直接修改
