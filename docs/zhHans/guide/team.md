---
title: 团队信息
layout: page
sidebar: false
createdDate: 2025-07-26
---
<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';
import {contributors} from '/_data/contributors';


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Job Compass贡献者列表
    </template>
    <template #lead>
      我们的成功源于这里每一位出色的贡献者。这个页面展示了那些通过不懈努力和卓越贡献，持续推动Job Compass向前发展的团队成员。他们的专业知识和热情确保了社区内容的持续创新与优化。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="contributors"
  />
</VPTeamPage>
