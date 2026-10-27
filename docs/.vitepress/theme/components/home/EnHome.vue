<script setup lang="ts">
/**
 * 英文首页（docs/en/index.md，layout: page）。
 * 首屏和公司网格共用搜索词；数字全部来自构建时的 siteStats.data.ts。页脚由主题的 layout-bottom 插槽统一挂载。
 * 分段共用的版式在 home-page.scss，中文首页 ZhHome.vue 也用它。
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
  <div class="home-page">
    <HomeHero v-model="query" :stats="stats" @browse="showCompanies" />
    <HomeCompanyGrid :companies="stats.companies" :query="query" />
    <HomeStats :stats="stats" />
    <HomeSections :stats="stats" />
    <HomeProcess />
    <HomeTeam :members="employees" />
    <HomeOperator />
  </div>
</template>

<style lang="scss" src="./home-page.scss"></style>
