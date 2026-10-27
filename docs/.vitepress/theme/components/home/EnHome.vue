<script setup lang="ts">
/**
 * 英文首页（docs/en/index.md，layout: page）。
 * 首屏和公司网格共用搜索词；数字全部来自构建时的 siteStats.data.ts。页脚由主题的 layout-bottom 插槽统一挂载。
 */
import { ref } from 'vue'
import { getEmployees } from '@ao-utils/team'
import { data as stats } from '../../data/siteStats.data'
import HomeHero from './HomeHero.vue'
import HomeCompanyGrid from './HomeCompanyGrid.vue'
import HomeStats from './HomeStats.vue'
import HomeSections from './HomeSections.vue'
import HomeProcess from './HomeProcess.vue'
import HomeTeam from './HomeTeam.vue'
import HomeOperator from './HomeOperator.vue'

const query = ref('')
const employees = getEmployees()

const showCompanies = () => {
  document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="en-home">
    <HomeHero v-model="query" :stats="stats" @browse="showCompanies" />
    <HomeCompanyGrid :companies="stats.companies" :query="query" />
    <HomeStats :stats="stats" />
    <HomeSections :stats="stats" />
    <HomeProcess />
    <HomeTeam :members="employees" />
    <HomeOperator />
  </div>
</template>

<style lang="scss">
/* 各分段共用的版式，不加 scoped，子组件直接用这些类名；全部收在 .en-home 下，不影响其他页面。
   VitePress 的 base.css 把标题和段落的字号、外边距都清零了，这里要写全。 */
.en-home {
  /* 白底上只有 --ao-blue-deep 够得上 AA，暗色底换成 --ao-blue-light */
  --home-accent: var(--ao-blue-deep);
  --home-accent-soft: color-mix(in srgb, var(--ao-blue) 8%, var(--vp-c-bg));
  --home-shadow: 0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.08);
}

.dark .en-home {
  --home-accent: var(--ao-blue-light);
  --home-accent-soft: color-mix(in srgb, var(--ao-blue) 16%, var(--vp-c-bg));
  --home-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}

.en-home .home-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.en-home .home-section {
  padding: 88px 0;
}

.en-home .home-section--soft {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.en-home .home-head {
  max-width: 680px;
  margin-bottom: 40px;
}

.en-home .home-head--row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px 24px;
  max-width: none;
}

.en-home .home-kicker {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--home-accent);
}

.en-home .home-title {
  margin: 8px 0 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.en-home .home-lead {
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.en-home .home-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--home-accent);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

@media (max-width: 640px) {
  .en-home .home-container {
    padding: 0 16px;
  }

  .en-home .home-section {
    padding: 64px 0;
  }

  .en-home .home-title {
    font-size: 26px;
  }
}
</style>
