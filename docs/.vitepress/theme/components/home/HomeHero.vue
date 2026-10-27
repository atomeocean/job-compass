<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import type { SiteStats } from '../../data/siteStats.data'

const props = defineProps<{ stats: SiteStats }>()
// 搜索词：只筛选下方的公司网格，全文搜索仍走导航栏的站内搜索
const query = defineModel<string>({ required: true })
const emit = defineEmits<{ browse: [] }>()

/** 搜索框下方的快捷入口：面经最多的 6 家 */
const popular = props.stats.companies.slice(0, 6)

const pick = (name: string) => {
  query.value = name
  emit('browse')
}
</script>

<template>
  <section class="hero">
    <div class="home-container hero-inner">
      <a class="badge" href="https://logbook.atomeocean.com/en/about-us/" target="_blank" rel="noopener">
        <img src="/logo-dark.svg" alt="" width="22" height="16" />
        Built by Atomeocean · New York, NY
      </a>
      <h1 class="headline">Know the interview before you walk in.</h1>
      <p class="intro">
        {{ stats.interviewReports }} structured interview reports from {{ stats.companies.length }} companies, each
        recorded by role, level and interview round, plus company profiles, job postings and career guides.
      </p>
      <form class="search" role="search" @submit.prevent="emit('browse')">
        <el-icon class="search-icon" :size="22"><Search /></el-icon>
        <input
          v-model="query"
          class="search-input"
          type="search"
          placeholder="Find a company, e.g. Amazon or Snowflake"
          aria-label="Find a company"
          autocomplete="off"
        />
      </form>
      <div class="popular">
        <span>Most reports:</span>
        <button v-for="company in popular" :key="company.slug" class="chip" type="button" @click="pick(company.name)">
          {{ company.name }}<b>{{ company.reports }}</b>
        </button>
      </div>
      <p class="trust">
        <template v-if="stats.git">
          <span class="dot" aria-hidden="true" />
          <span>Updated {{ stats.git.lastUpdated }}</span>
          <span class="sep" aria-hidden="true">·</span>
          <span>{{ stats.git.pullRequestsMerged30d }} pull requests merged in the last 30 days</span>
          <span class="sep" aria-hidden="true">·</span>
        </template>
        <a href="https://github.com/atomeocean/job-compass" target="_blank" rel="noopener">Open source on GitHub ↗</a>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* 首屏在明暗两种主题下都是同一块深色板，只在暗色主题里压暗一档 */
.hero {
  position: relative;
  overflow: hidden;
  padding: 84px 0 76px;
  color: #e8f0fb;
  background:
    radial-gradient(900px 420px at 82% 0%, rgba(33, 124, 255, 0.38), transparent 62%),
    linear-gradient(180deg, #0a1730 0%, #0b2a5e 100%);

  /* 网格纹理，向四周淡出 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse at 70% 30%, #000 20%, transparent 72%);
  }
}

.dark .hero {
  background:
    radial-gradient(900px 420px at 82% 0%, rgba(33, 124, 255, 0.28), transparent 62%),
    linear-gradient(180deg, #08111f 0%, #0a2049 100%);
}

.hero-inner {
  position: relative;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px 5px 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 13px;
  font-weight: 500;
  color: #cfe0f7;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }

  img {
    width: auto;
    height: 16px;
  }
}

.headline {
  max-width: 13em;
  margin: 24px 0 16px;
  font-size: 58px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.032em;
  color: #fff;
}

.intro {
  max-width: 36em;
  margin: 0;
  font-size: 19px;
  line-height: 1.65;
  color: #b9cbe4;
}

.search {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 660px;
  height: 62px;
  margin-top: 34px;
  padding: 0 20px;
  border-radius: 14px;
  background: #fff;
  color: #6b7280;
  box-shadow: 0 24px 60px -24px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: box-shadow 0.2s;

  &:focus-within {
    box-shadow: 0 24px 60px -24px rgba(0, 0, 0, 0.7), 0 0 0 3px rgba(101, 181, 244, 0.65);
  }
}

.dark .search {
  background: #12151b;
  color: #9ca3af;
}

.search-icon {
  flex: none;
}

.search-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  color: #111827;

  &::placeholder {
    color: #6b7280;
  }
}

.dark .search-input {
  color: #f3f4f6;

  &::placeholder {
    color: #9ca3af;
  }
}

.popular {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 500;
  color: #9fb4d3;
}

.chip {
  padding: 4px 11px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 13px;
  font-weight: 500;
  color: #e8f0fb;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }

  b {
    margin-left: 5px;
    font-weight: 600;
    color: #9fc5ff;
  }
}

.trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 30px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: #9fb4d3;

  a {
    font-weight: 600;
    color: #9fc5ff;
  }
}

.dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.22);
}

@media (max-width: 640px) {
  .hero {
    padding: 56px 0 52px;
  }

  .headline {
    font-size: 38px;
  }

  .intro {
    font-size: 17px;
  }

  .search {
    height: 54px;
    padding: 0 16px;
  }

  /* 窄屏上这一行会折成三行，行尾的分隔点去掉 */
  .trust .sep {
    display: none;
  }

  .trust {
    column-gap: 14px;
  }
}
</style>
