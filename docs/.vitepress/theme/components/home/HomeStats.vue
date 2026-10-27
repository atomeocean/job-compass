<script setup lang="ts">
import type { HomeLocale } from '@ao-types/homeTypes'
import type { GitActivity, SiteStats } from '../../data/siteStats.data'
import { BUSUANZI_SITE_PV_ID, BUSUANZI_SITE_UV_ID, useBusuanziSiteStats } from '@ao-composables/useBusuanziSiteStats'

const props = withDefaults(defineProps<{ stats: SiteStats; locale?: HomeLocale }>(), { locale: 'en' })
const { pageViews, visitors, ready } = useBusuanziSiteStats()

const format = (value: number) => value.toLocaleString('en-US')

interface Tile {
  value: number
  label: string
  detail: string
}

interface StatsCopy {
  tiles: (stats: SiteStats, git: GitActivity | null) => Tile[]
  readershipTitle: string
  readership: string
  pageViews: (count: string) => string
  visitors: (count: string) => string
  /** 说明数字来源的一句话，中间夹一个 GitHub 仓库的链接 */
  captionBefore: string
  captionLink: string
  captionAfter: string
  commits: (git: GitActivity) => string
  end: string
}

const COPY: Record<HomeLocale, StatsCopy> = {
  en: {
    tiles: (stats, git) => [
      { value: stats.interviewReports, label: 'Interview reports', detail: `across ${stats.companies.length} companies` },
      { value: stats.companyProfiles, label: 'Company profiles', detail: 'U.S. employers' },
      ...(git
        ? [
            { value: git.pullRequestsMerged30d, label: 'Pull requests merged', detail: 'in the last 30 days' },
            { value: git.activeContributors90d, label: 'Active contributors', detail: 'in the last 90 days' },
          ]
        : []),
    ],
    readershipTitle: 'Live count across all pages of the site',
    readership: 'Readership to date',
    pageViews: (count) => `${count} page views`,
    visitors: (count) => `${count} unique visitors`,
    captionBefore: 'Counts are computed from the ',
    captionLink: 'public GitHub repository',
    captionAfter: ' each time the site is built',
    commits: (git) => ` · ${format(git.commits)} commits since ${git.since}`,
    end: '.',
  },
  zh: {
    tiles: (stats, git) => [
      { value: stats.interviewReports, label: '篇面经', detail: `覆盖 ${stats.companies.length} 家公司` },
      { value: stats.companyProfiles, label: '家公司资料', detail: '美国直招雇主' },
      ...(git
        ? [
            { value: git.pullRequestsMerged30d, label: '个 PR 已合并', detail: '近 30 天' },
            { value: git.activeContributors90d, label: '位活跃贡献者', detail: '近 90 天' },
          ]
        : []),
    ],
    readershipTitle: '全站所有页面的实时累计',
    readership: '累计阅读',
    pageViews: (count) => `${count} 次浏览`,
    visitors: (count) => `${count} 位访客`,
    captionBefore: '以上数字在每次构建网站时，从',
    captionLink: '公开的 GitHub 仓库',
    captionAfter: '统计',
    commits: (git) => {
      const [year, month] = git.firstCommitDate.split('-').map(Number)
      return ` · 自 ${year} 年 ${month} 月起共 ${format(git.commits)} 次提交`
    },
    end: '。',
  },
}

const { stats } = props
const copy = COPY[props.locale]
// 活跃度来自 git 历史，构建环境拿不到时整组不显示
const tiles = copy.tiles(stats, stats.git)
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
      <p v-if="ready" class="readership" :title="copy.readershipTitle">
        <span class="dot" aria-hidden="true" />
        <strong>{{ copy.readership }}</strong>
        <span>{{ copy.pageViews(format(pageViews)) }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ copy.visitors(format(visitors)) }}</span>
      </p>
      <span :id="BUSUANZI_SITE_PV_ID" hidden />
      <span :id="BUSUANZI_SITE_UV_ID" hidden />
      <p class="caption">
        {{ copy.captionBefore }}<a class="home-link" href="https://github.com/atomeocean/job-compass" target="_blank" rel="noopener">{{ copy.captionLink }}</a>{{ copy.captionAfter }}<template v-if="stats.git">{{ copy.commits(stats.git) }}</template>{{ copy.end }}
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
