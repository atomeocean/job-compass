---
title: 目录概述
description: 本页介绍当前目录下的所有Markdown文件及其简要说明。
lastUpdated: 2026-07-10
---
<script setup>
const overviewItems = [
  {
    "title": "amazon",
    "description": "该文件主要介绍 amazon 的相关内容。",
    "href": "./amazon/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Ansys",
    "description": "该文件主要介绍 Ansys 的相关内容。",
    "href": "./ansys/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "apple",
    "description": "该文件主要介绍 apple 的相关内容。",
    "href": "./apple/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Bank of America",
    "description": "该文件主要介绍 Bank of America 的相关内容。",
    "href": "./bank-of-america/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "bloomberg",
    "description": "该文件主要介绍 bloomberg 的相关内容。",
    "href": "./bloomberg/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Boston Consulting Group",
    "description": "该文件主要介绍 Boston Consulting Group 的相关内容。",
    "href": "./boston-consulting-group/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "bumble",
    "description": "该文件主要介绍 bumble 的相关内容。",
    "href": "./bumble/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "bungie",
    "description": "该文件主要介绍 bungie 的相关内容。",
    "href": "./bungie/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "capital-one",
    "description": "该文件主要介绍 capital-one 的相关内容。",
    "href": "./capital-one/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "cargurus",
    "description": "该文件主要介绍 cargurus 的相关内容。",
    "href": "./cargurus/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "CDPR Project Red",
    "description": "该文件主要介绍 CDPR Project Red 的相关内容。",
    "href": "./cdpr-project-red/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "coreweave",
    "description": "该文件主要介绍 coreweave 的相关内容。",
    "href": "./coreweave/index.md",
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
    "title": "Deloitte",
    "description": "该文件主要介绍 Deloitte 的相关内容。",
    "href": "./deloitte/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Discover",
    "description": "该文件主要介绍 Discover 的相关内容。",
    "href": "./discover/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Domo",
    "description": "该文件主要介绍 Domo 的相关内容。",
    "href": "./domo/index.md",
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
    "title": "Duolingo",
    "description": "该文件主要介绍 Duolingo 的相关内容。",
    "href": "./duolingo/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "eBay",
    "description": "该文件主要介绍 eBay 的相关内容。",
    "href": "./ebay/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Elastic",
    "description": "该文件主要介绍 Elastic 的相关内容。",
    "href": "./elastic/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "epam",
    "description": "该文件主要介绍 epam 的相关内容。",
    "href": "./epam/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "epic",
    "description": "该文件主要介绍 epic 的相关内容。",
    "href": "./epic/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Ernst & Young",
    "description": "该文件主要介绍 Ernst & Young 的相关内容。",
    "href": "./ernst-young/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Etsy",
    "description": "该文件主要介绍 Etsy 的相关内容。",
    "href": "./etsy/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "f5",
    "description": "该文件主要介绍 f5 的相关内容。",
    "href": "./f5/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Genies",
    "description": "该文件主要介绍 Genies 的相关内容。",
    "href": "./genies/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "genpact",
    "description": "该文件主要介绍 genpact 的相关内容。",
    "href": "./genpact/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Goldman Sachs",
    "description": "该文件主要介绍 Goldman Sachs 的相关内容。",
    "href": "./goldman-sachs/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "google",
    "description": "该文件主要介绍 google 的相关内容。",
    "href": "./google/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "intel",
    "description": "该文件主要介绍 intel 的相关内容。",
    "href": "./intel/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "JPMorgan Chase",
    "description": "该文件主要介绍 JPMorgan Chase 的相关内容。",
    "href": "./jpmorgan-chase/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Kaseya",
    "description": "该文件主要介绍 Kaseya 的相关内容。",
    "href": "./kaseya/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "KPMG",
    "description": "该文件主要介绍 KPMG 的相关内容。",
    "href": "./kpmg/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Lyft",
    "description": "该文件主要介绍 Lyft 的相关内容。",
    "href": "./lyft/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "mapbox",
    "description": "该文件主要介绍 mapbox 的相关内容。",
    "href": "./mapbox/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Mastercard",
    "description": "该文件主要介绍 Mastercard 的相关内容。",
    "href": "./mastercard/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "McKinsey",
    "description": "该文件主要介绍 McKinsey 的相关内容。",
    "href": "./mckinsey/index.md",
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
    "title": "MongoDB",
    "description": "该文件主要介绍 MongoDB 的相关内容。",
    "href": "./mongodb/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Morgan Stanley",
    "description": "该文件主要介绍 Morgan Stanley 的相关内容。",
    "href": "./morgan-stanley/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "motorola-solutions",
    "description": "该文件主要介绍 motorola-solutions 的相关内容。",
    "href": "./motorola-solutions/index.md",
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
    "title": "Oracle",
    "description": "该文件主要介绍 Oracle 的相关内容。",
    "href": "./oracle/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "oversight-systems",
    "description": "该文件主要介绍 oversight-systems 的相关内容。",
    "href": "./oversight-systems/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "PayPal",
    "description": "该文件主要介绍 PayPal 的相关内容。",
    "href": "./paypal/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "ptc",
    "description": "该文件主要介绍 ptc 的相关内容。",
    "href": "./ptc/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "PwC",
    "description": "该文件主要介绍 PwC 的相关内容。",
    "href": "./pwc/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Reddit",
    "description": "Reddit招聘信息",
    "href": "./reddit/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Replit",
    "description": "该文件主要介绍 Replit 的相关内容。",
    "href": "./replit/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "riot-games",
    "description": "该文件主要介绍 riot-games 的相关内容。",
    "href": "./riot-games/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Roblox",
    "description": "该文件主要介绍 Roblox 的相关内容。",
    "href": "./roblox/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "rockstar",
    "description": "该文件主要介绍 rockstar 的相关内容。",
    "href": "./rockstar/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "sanzaru-games",
    "description": "该文件主要介绍 sanzaru-games 的相关内容。",
    "href": "./sanzaru-games/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Skillz",
    "description": "该文件主要介绍 Skillz 的相关内容。",
    "href": "./skillz/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Spotify",
    "description": "该文件主要介绍 Spotify 的相关内容。",
    "href": "./spotify/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "TD Bank",
    "description": "该文件主要介绍 TD Bank 的相关内容。",
    "href": "./td-bank/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Tenable",
    "description": "该文件主要介绍 Tenable 的相关内容。",
    "href": "./tenable/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "twitch",
    "description": "该文件主要介绍 twitch 的相关内容。",
    "href": "./twitch/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Uber",
    "description": "该文件主要介绍 Uber 的相关内容。",
    "href": "./uber/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "unity",
    "description": "该文件主要介绍 unity 的相关内容。",
    "href": "./unity/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Visa",
    "description": "该文件主要介绍 Visa 的相关内容。",
    "href": "./visa/index.md",
    "order": 0,
    "kind": "folder"
  },
  {
    "title": "Warner Bros. Discovery",
    "description": "该文件主要介绍 Warner Bros. Discovery 的相关内容。",
    "href": "./warner-bros-discovery/index.md",
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
