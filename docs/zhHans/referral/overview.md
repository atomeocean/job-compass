---
title: 目录概述
description: 本页介绍当前目录下的所有Markdown文件及其简要说明。
lastUpdated: 2026-06-19
---
<script setup>
const overviewItems = [
  {
    "title": "Airbnb",
    "description": "该文件主要介绍 Airbnb 的相关内容。",
    "href": "./airbnb.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "Coco Robotics",
    "description": "该文件主要介绍 Coco Robotics 的相关内容。",
    "href": "./coco-robotics.md",
    "order": 0,
    "kind": "article"
  },
  {
    "title": "Meta",
    "description": "Meta previous Facebook",
    "href": "./meta.md",
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
