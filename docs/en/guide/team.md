---
title: Team
description: The Atomeocean team that builds and maintains Job Compass.
layout: page
sidebar: false
createdDate: 2026-10-27
lastUpdated: 2026-10-27
---
<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';
import { getEmployees } from '@ao-utils/team';

// 只列员工，名单在 theme/constants/teamMembers.ts；中文版鸣谢页（/guide/team）列的是全部贡献者
const employees = getEmployees();
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      The Job Compass team
    </template>
    <template #lead>
      Job Compass is built and maintained by the Atomeocean team, with contributions from the community.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="employees" />

  <VPTeamPageSection>
    <template #title>Community contributors</template>
    <template #lead>
      Many more people have contributed interview reports, guides and fixes through pull requests.
      <a href="https://github.com/atomeocean/job-compass/graphs/contributors" target="_blank" rel="noopener">See everyone on GitHub ↗</a>
    </template>
  </VPTeamPageSection>
</VPTeamPage>
