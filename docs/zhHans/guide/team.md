---
title: 团队信息
layout: page
sidebar: false
createdDate: 2025-07-26
lastUpdated: 2025-09-03
---
<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';
import {currentContributors, legacyContributors} from '/_data/contributors';


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
    :members="currentContributors"
  />

  <VPTeamPageSection>
    <template #title>历史贡献者</template>
    <template #lead>
      致敬那些曾在Job Compass留下独特印记的人们。他们为项目奠定了坚实的基础，贡献虽然属于过去，影响却持续至今。
    </template>
    <template #members>
      <VPTeamMembers
        size="small"
        :members="legacyContributors"
      />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
