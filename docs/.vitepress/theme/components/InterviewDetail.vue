<!--
  面经页正文顶部：本篇亮点 + 窄屏时的信息卡。写在 Markdown 的 H1 下面，不接收 props，
  数据来自与 Markdown 路径对应的 JSON（见 utils/interviewData.ts）。
  宽屏（≥1280px）时信息卡改由右侧栏的 InterviewAsideCard 显示，这里隐藏。
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useInterviewData } from '@ao-composables/useInterviewData'
import { parseInterviewPath } from '@ao-utils/interviewData'
import { cleanValue, formatCompanyTitle } from '@ao-utils/interviewFormat'
import InterviewInfoCard from '@ao-components/InterviewInfoCard.vue'

const { frontmatter } = useData()
const { data, nav, pageKey } = useInterviewData()

/** 亮点由编辑手写，默认为空数组；为空时整块不显示 */
const highlights = computed(() =>
  (data.value?.highlights ?? []).filter((item) => cleanValue(item?.title))
)

const companyTitle = computed(() =>
  formatCompanyTitle(nav.value?.company.title, data.value?.company, parseInterviewPath(pageKey.value)?.company)
)

/** 页面关掉了右侧栏时，宽屏也要在正文里显示信息卡 */
const asideOff = computed(() => frontmatter.value.aside === false)
</script>

<template>
  <div v-if="data" :key="pageKey" class="interview-detail">
    <section v-if="highlights.length" class="interview-highlights" aria-label="本篇亮点">
      <div class="interview-highlights__title">
        <el-icon><Opportunity /></el-icon>本篇亮点
      </div>
      <ul class="interview-highlights__list">
        <li v-for="(item, index) in highlights" :key="index">
          <a v-if="item.anchor" :href="item.anchor" class="interview-highlights__name">{{ item.title }}</a>
          <strong v-else class="interview-highlights__name">{{ item.title }}</strong>
          <span v-if="item.detail" class="interview-highlights__detail">{{ item.detail }}</span>
        </li>
      </ul>
    </section>

    <InterviewInfoCard
      class="interview-detail__card"
      :class="{ 'is-aside-off': asideOff }"
      :data="data"
      :company-title="companyTitle"
      :source-type="frontmatter.sourceType"
      variant="inline"
    />
  </div>
</template>

<style scoped lang="scss">
/* 间距放在子元素上：亮点为空且宽屏隐藏信息卡时，这里不留空白 */
.interview-highlights {
  margin: 24px 0 8px;
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);

  &__title {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    color: var(--vp-c-brand-1);
  }

  /* 覆盖 .vp-doc 的列表样式 */
  &__list {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      margin: 0;
      padding-left: 16px;
      line-height: 1.7;
      color: var(--vp-c-text-2);

      &::before {
        content: '';
        position: absolute;
        top: 0.72em;
        left: 2px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--vp-c-brand-1);
      }
    }
  }

  &__name {
    margin-right: 8px;
    font-weight: 600;
    color: var(--vp-c-text-1);
  }

  a.interview-highlights__name {
    color: var(--vp-c-brand-1);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.interview-detail__card {
  margin: 20px 0 8px;
}

/* 右侧栏可见时（VitePress 在 ≥1280px 显示 aside），信息卡只在右侧栏出现一次 */
@media (min-width: 1280px) {
  .interview-detail__card:not(.is-aside-off) {
    display: none;
  }
}
</style>
