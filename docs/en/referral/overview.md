---
title: Directory Overview
description: This page introduces all Markdown files in the current directory with brief descriptions.
lastUpdated: 2026-06-14
---
<script setup>
const overviewItems = [
  {
    "title": "Airbnb",
    "description": "This file mainly introduces content related to Airbnb.",
    "href": "./airbnb.md",
    "order": 0,
    "kind": "article"
  }
]
</script>

# Directory Overview

Below is an introduction to all Markdown files and subdirectories in this directory:

<DirectoryOverview :items="overviewItems" />

> [!NOTE] Please generate this file via the script
> This file can only be built via the generate_folder_overview script and must not be edited directly.
