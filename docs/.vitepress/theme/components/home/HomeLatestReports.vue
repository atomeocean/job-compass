<script setup lang="ts">
/**
 * 中文首页的「最新面经」：按 createdDate 从新到旧，可按实习 / 应届 / 社招筛选。
 * 数据是 siteStats.data.ts 的 latestReports；级别和结果的文案跟面经页一样用 interviewFormat。
 */
import { computed, ref } from 'vue'
import { formatLevel, formatResult, levelGroup, type LevelGroup } from '@ao-utils/interviewFormat'
import type { LatestReport } from '../../data/siteStats.data'

const props = withDefaults(
  defineProps<{
    reports: LatestReport[]
    /** 面经总数，用在「查看全部」 */
    total: number
    /** 构建那一年的日期不写年份 */
    buildYear: number
    limit?: number
  }>(),
  { limit: 8 },
)

type Filter = 'all' | LevelGroup
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'intern', label: '实习' },
  { key: 'new-grad', label: '应届' },
  { key: 'experienced', label: '社招' },
]
const filter = ref<Filter>('all')

/** "2026-10-26" → "10 月 26 日"；日期在构建时就定了，不用 Date.now()，SSR 和浏览器渲染结果一致 */
const formatDay = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return `${year === props.buildYear ? '' : `${year} 年 `}${month} 月 ${day} 日`
}

const rows = computed(() =>
  props.reports
    .filter((report) => filter.value === 'all' || levelGroup(report.level) === filter.value)
    .slice(0, props.limit)
    .map((report) => ({
      ...report,
      levelLabel: formatLevel(report.level),
      outcome: formatResult(report.result),
      day: formatDay(report.date),
    })),
)
</script>

<template>
  <section class="home-section home-section--soft">
    <div class="home-container">
      <div class="home-head home-head--row">
        <div>
          <p class="home-kicker">最新面经</p>
          <h2 class="home-title">刚上线的面经</h2>
        </div>
        <div class="filters" role="group" aria-label="按级别筛选">
          <button
            v-for="item in FILTERS"
            :key="item.key"
            type="button"
            class="filter"
            :class="{ 'filter--active': filter === item.key }"
            :aria-pressed="filter === item.key"
            @click="filter = item.key"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
      <ul v-if="rows.length" class="rows">
        <li v-for="report in rows" :key="report.href">
          <a class="row" :href="report.href">
            <span class="company">{{ report.company }}</span>
            <span class="title">{{ report.title }}</span>
            <span class="tags">
              <span v-if="report.levelLabel" class="tag">{{ report.levelLabel }}</span>
              <span v-if="report.outcome" class="tag" :class="`tag--${report.outcome.tone}`">{{ report.outcome.label }}</span>
              <span v-if="report.sourceType === 'original'" class="tag tag--original">原创</span>
            </span>
            <time class="day" :datetime="report.date">{{ report.day }}</time>
          </a>
        </li>
      </ul>
      <p v-else class="empty">
        最近 {{ reports.length }} 篇里还没有这一类的面经，可以去<a class="home-link" href="/interview-experience/">面经目录</a>按公司找。
      </p>
      <a class="home-link more" href="/interview-experience/">查看全部 {{ total }} 篇面经 →</a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: var(--vp-c-default-soft);
}

.filter {
  min-height: 40px;
  padding: 0 16px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: var(--vp-c-text-1);
  }
}

.filter--active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: var(--home-shadow);
}

.rows {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--vp-c-divider);
}

.row {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr) auto 92px;
  align-items: center;
  gap: 8px 20px;
  padding: 16px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  transition: background 0.2s;

  &:hover {
    background: var(--vp-c-bg);
  }
}

.company {
  font-size: 15px;
  font-weight: 700;
}

.title {
  font-size: 15px;
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
}

.tag {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  white-space: nowrap;
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
}

.tag--ok {
  color: var(--home-accent);
  background: var(--home-accent-soft);
}

.tag--bad {
  color: #9a3412;
  background: color-mix(in srgb, #ea580c 12%, var(--vp-c-bg));
}

.dark .tag--bad {
  color: #fdba74;
  background: color-mix(in srgb, #ea580c 18%, var(--vp-c-bg));
}

.tag--original {
  color: var(--home-accent);
  background: transparent;
  box-shadow: inset 0 0 0 1px currentColor;
}

.day {
  font-size: 13px;
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.empty {
  margin: 0;
  padding: 24px 0;
  font-size: 15px;
  color: var(--vp-c-text-2);

  .home-link {
    font-size: inherit;
  }
}

.more {
  display: inline-block;
  margin-top: 24px;
}

/* 窄屏：第一行公司 + 日期，标题和标签各占一行 */
@media (max-width: 640px) {
  .filter {
    min-height: 44px;
  }

  .row {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "company day"
      "title title"
      "tags tags";
    padding: 14px 4px;
  }

  .company {
    grid-area: company;
  }

  .day {
    grid-area: day;
  }

  .title {
    grid-area: title;
  }

  .tags {
    grid-area: tags;
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .filter,
  .row {
    transition: none;
  }
}
</style>
