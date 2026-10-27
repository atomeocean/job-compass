---
# 英文首页：整页由 theme/components/home/EnHome.vue 渲染，数字来自构建时的 theme/data/siteStats.data.ts
layout: page
sidebar: false
title: Job Compass — Interview experiences from the U.S. job market
titleTemplate: Atomeocean
description: Job Compass is a free, open-source library of structured interview reports from U.S. employers, with company profiles, job postings and career guides. Built and maintained by Atomeocean, a U.S. technology company based in New York.
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:site_name
      content: Job Compass
  - - meta
    - property: og:title
      content: Job Compass — Interview experiences from the U.S. job market
  - - meta
    - property: og:description
      content: Structured interview reports from U.S. employers, with company profiles, job postings and career guides. Built and maintained by Atomeocean.
  - - meta
    - property: og:url
      content: https://jobcompass.atomeocean.com/en/
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://atomeocean.com/#organization","name":"Atomeocean","url":"https://atomeocean.com","logo":"https://jobcompass.atomeocean.com/logo.svg","foundingDate":"2021","email":"customer@atomeocean.com","address":{"@type":"PostalAddress","addressLocality":"New York","addressRegion":"NY","addressCountry":"US"},"sameAs":["https://github.com/atomeocean","https://www.youtube.com/@atomeocean","https://x.com/atomeocean"]},{"@type":"WebSite","@id":"https://jobcompass.atomeocean.com/en/#website","name":"Job Compass","url":"https://jobcompass.atomeocean.com/en/","inLanguage":"en","publisher":{"@id":"https://atomeocean.com/#organization"}}]}'
createdDate: 2025-03-14
lastUpdated: 2025-09-03
---
<script setup>
import EnHome from '@ao-components/home/EnHome.vue'
</script>

<EnHome />
