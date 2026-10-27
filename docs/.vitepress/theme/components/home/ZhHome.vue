<script setup lang="ts">
/**
 * 中文首页（docs/zhHans/index.md，layout: page），以搜索为主：首屏搜索框和公司网格共用搜索词，
 * 也认「亚麻」「狗家」这类叫法（constants/companyNames.ts 的 COMPANY_ALIASES）。
 * 数字和最新面经全部来自构建时的 siteStats.data.ts。首屏、公司网格、流程和统计跟英文首页共用组件，传 locale="zh"；
 * 分段共用的版式在 home-page.scss。
 */
import { ref } from 'vue'
import { data as stats } from '../../data/siteStats.data'
import HomeHero from './HomeHero.vue'
import HomeCompanyGrid from './HomeCompanyGrid.vue'
import HomeLatestReports from './HomeLatestReports.vue'
import HomeJourney from './HomeJourney.vue'
import HomeProcess from './HomeProcess.vue'
import HomeFaq from './HomeFaq.vue'
import HomeStats from './HomeStats.vue'

const query = ref('')

const showCompanies = () => {
  document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="home-page">
    <HomeHero v-model="query" :stats="stats" locale="zh" @browse="showCompanies" />
    <!-- 没有搜索词时只列面经最多的 12 家，手机上不至于一屏屏翻公司卡 -->
    <HomeCompanyGrid :companies="stats.companies" :query="query" locale="zh" :limit="12" />
    <HomeLatestReports :reports="stats.latestReports" :total="stats.interviewReports" :build-year="stats.buildYear" />
    <HomeJourney :stats="stats" />
    <HomeProcess :stats="stats" locale="zh" />
    <HomeFaq />
    <HomeStats :stats="stats" locale="zh" />
  </div>
</template>

<style lang="scss" src="./home-page.scss"></style>
