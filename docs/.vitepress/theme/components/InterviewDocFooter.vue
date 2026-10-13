<!--
  面经页正文之后的内容，通过 doc-footer-before 插槽挂载，排在原创声明和相关文章之前：
  - JSON 有 timeline 时显示求职时间线
  - JSON 的 highlights 为空时，显示一个「帮忙补充亮点」的编辑入口
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useInterviewData } from '@ao-composables/useInterviewData'
import { cleanValue, formatResult } from '@ao-utils/interviewFormat'
import InterviewTimeline from '@ao-components/InterviewTimeline.vue'

const { data, nav, pageKey } = useInterviewData()

const timeline = computed(() => data.value?.timeline ?? [])
const resultTone = computed(() => formatResult(data.value?.interview?.result)?.tone ?? 'none')
const hasHighlights = computed(() => (data.value?.highlights ?? []).some((item) => cleanValue(item?.title)))
</script>

<template>
  <!-- vp-doc 让标题沿用正文样式，与 OriginalStatement 的做法一致 -->
  <div v-if="data" :key="pageKey" class="vp-doc interview-doc-footer">
    <section v-if="timeline.length" class="interview-doc-footer__timeline">
      <h2>求职时间线</h2>
      <InterviewTimeline :events="timeline" :result-tone="resultTone" />
    </section>

    <p v-if="!hasHighlights && nav" class="interview-doc-footer__prompt">
      <el-icon><Opportunity /></el-icon>
      这篇还没有「本篇亮点」。
      <a :href="nav.jsonEditUrl" target="_blank" rel="noopener noreferrer">帮忙补充</a>
    </p>
  </div>
</template>

<style scoped lang="scss">
.interview-doc-footer {
  &__timeline {
    margin-top: 48px;
  }

  &__prompt {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    margin: 32px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-3);

    a {
      font-weight: 500;
    }
  }
}
</style>
