---
title: 目录概述
description: 本页介绍当前目录下的所有Markdown文件及其简要说明。
lastUpdated: 2026-08-18
---

<script setup>
const overviewItems = [
  {
    "title": "arizona",
    "description": "该文件主要介绍 arizona 的相关内容。",
    "href": "./arizona/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "california",
    "description": "该文件主要介绍 california 的相关内容。",
    "href": "./california/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "colorado",
    "description": "该文件主要介绍 colorado 的相关内容。",
    "href": "./colorado/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "district-of-columbia",
    "description": "该文件主要介绍 district-of-columbia 的相关内容。",
    "href": "./district-of-columbia/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "florida",
    "description": "该文件主要介绍 florida 的相关内容。",
    "href": "./florida/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "georgia",
    "description": "该文件主要介绍 georgia 的相关内容。",
    "href": "./georgia/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "illinois",
    "description": "该文件主要介绍 illinois 的相关内容。",
    "href": "./illinois/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "maryland",
    "description": "该文件主要介绍 maryland 的相关内容。",
    "href": "./maryland/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "massachusetts",
    "description": "该文件主要介绍 massachusetts 的相关内容。",
    "href": "./massachusetts/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "minnesota",
    "description": "该文件主要介绍 minnesota 的相关内容。",
    "href": "./minnesota/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Montana",
    "description": "该文件主要介绍 Montana 的相关内容。",
    "href": "./montana/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "new-jersey",
    "description": "该文件主要介绍 new-jersey 的相关内容。",
    "href": "./new-jersey/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "new-york",
    "description": "该文件主要介绍 new-york 的相关内容。",
    "href": "./new-york/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "North Carolina",
    "description": "该文件主要介绍 North Carolina 的相关内容。",
    "href": "./north-carolina/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Pennsylvania",
    "description": "该文件主要介绍 Pennsylvania 的相关内容。",
    "href": "./pennsylvania/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "texas",
    "description": "该文件主要介绍 texas 的相关内容。",
    "href": "./texas/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "utah",
    "description": "该文件主要介绍 utah 的相关内容。",
    "href": "./utah/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "virginia",
    "description": "该文件主要介绍 virginia 的相关内容。",
    "href": "./virginia/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "washington",
    "description": "该文件主要介绍 washington 的相关内容。",
    "href": "./washington/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "目录综述",
    "description": "直接雇佣公司",
    "href": "./general.md",
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
