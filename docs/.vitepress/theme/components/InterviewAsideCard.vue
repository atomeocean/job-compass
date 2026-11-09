<!--面经页右侧栏的信息卡，通过 aside-top 插槽挂载；VitePress 只在 ≥1280px 显示右侧栏，窄屏由 InterviewDetail 在正文里显示同一张卡-->
<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useInterviewData } from '@ao-composables/useInterviewData'
import { parseInterviewPath } from '@ao-utils/interviewData'
import { formatCompanyTitle } from '@ao-utils/interviewFormat'
import InterviewInfoCard from '@ao-components/InterviewInfoCard.vue'

const { frontmatter } = useData()
const { data, nav, pageKey } = useInterviewData()

const companyTitle = computed(() =>
  formatCompanyTitle(nav.value?.company.title, data.value?.company, parseInterviewPath(pageKey.value)?.company)
)
</script>

<template>
  <InterviewInfoCard
    v-if="data"
    :key="pageKey"
    class="interview-aside-card"
    :data="data"
    :company-title="companyTitle"
    :source-type="frontmatter.sourceType"
    variant="aside"
  />
</template>

<style scoped>
.interview-aside-card {
  margin-bottom: 24px;
}
</style>
