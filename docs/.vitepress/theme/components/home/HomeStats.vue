<script setup lang="ts">
import type { SiteStats } from '../../data/siteStats.data'
import { BUSUANZI_SITE_PV_ID, BUSUANZI_SITE_UV_ID, useBusuanziSiteStats } from '@ao-composables/useBusuanziSiteStats'

const props = defineProps<{ stats: SiteStats }>()
const { pageViews, visitors, ready } = useBusuanziSiteStats()

const format = (value: number) => value.toLocaleString('en-US')

const { stats } = props
const tiles = [
  { value: stats.interviewReports, label: 'Interview reports', detail: `across ${stats.companies.length} companies` },
  { value: stats.companyProfiles, label: 'Company profiles', detail: 'U.S. employers' },
  // 活跃度来自 git 历史，构建环境拿不到时整组不显示
  ...(stats.git
    ? [
        { value: stats.git.pullRequestsMerged30d, label: 'Pull requests merged', detail: 'in the last 30 days' },
        { value: stats.git.activeContributors90d, label: 'Active contributors', detail: 'in the last 90 days' },
      ]
    : []),
]
</script>

<template>
  <section class="stats">
    <div class="home-container">
      <div class="tiles">
        <div v-for="tile in tiles" :key="tile.label" class="tile">
          <div class="value">{{ format(tile.value) }}</div>
          <div class="label">{{ tile.label }}</div>
          <div class="detail">{{ tile.detail }}</div>
        </div>
      </div>
      <!-- busuanzi 的数字只在浏览器里出现；加载失败或超时整行不显示，不会显示 0 -->
      <p v-if="ready" class="readership" title="Live count across all pages of the site">
        <span class="dot" aria-hidden="true" />
        <strong>Readership to date</strong>
        <span>{{ format(pageViews) }} page views</span>
        <span aria-hidden="true">·</span>
        <span>{{ format(visitors) }} unique visitors</span>
      </p>
      <span :id="BUSUANZI_SITE_PV_ID" hidden />
      <span :id="BUSUANZI_SITE_UV_ID" hidden />
      <p class="caption">
        Counts are computed from the
        <a class="home-link" href="https://github.com/atomeocean/job-compass" target="_blank" rel="noopener">public GitHub repository</a>
        each time the site is built<template v-if="stats.git"> · {{ format(stats.git.commits) }} commits since {{ stats.git.since }}</template>.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats {
  padding: 44px 0 30px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.tile {
  padding: 0 28px;
  border-left: 1px solid var(--vp-c-divider);

  &:first-child {
    padding-left: 0;
    border-left: 0;
  }
}

.value {
  font-size: 42px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.label {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.readership {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin: 28px 0 0;
  padding-top: 18px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);

  strong {
    font-weight: 600;
    color: var(--vp-c-text-1);
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.22);
}

.caption {
  margin: 18px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-3);

  .home-link {
    font-size: inherit;
  }
}

@media (max-width: 960px) {
  .tiles {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 28px;
  }

  .tile:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }
}

@media (max-width: 640px) {
  .tile {
    padding: 0 16px;
  }

  .value {
    font-size: 34px;
  }
}
</style>
