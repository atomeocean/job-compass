<script setup lang="ts">
import { computed, ref } from 'vue'
import type { HomeLocale } from '@ao-types/homeTypes'
import { companyMatches } from '@ao-utils/companyMatch'
import type { CompanyStat } from '../../data/siteStats.data'

const props = withDefaults(
  defineProps<{
    companies: CompanyStat[]
    query: string
    locale?: HomeLocale
    /** 没有搜索词时只列前几家，其余点按钮展开；0 表示全部列出 */
    limit?: number
  }>(),
  { locale: 'en', limit: 0 },
)

interface GridCopy {
  kicker: string
  all: (total: number) => string
  matching: (count: number, query: string) => string
  note: string
  reports: (count: number) => string
  showAll: (total: number) => string
  /** 没有匹配时的提示，中间夹一个去面经目录的链接 */
  emptyBefore: string
  emptyLink: string
  emptyAfter: string
}

const COPY: Record<HomeLocale, GridCopy> = {
  en: {
    kicker: 'Browse by company',
    all: (total) => `${total} companies, sorted by number of reports`,
    matching: (count, query) => `${count} ${count === 1 ? 'company matches' : 'companies match'} “${query}”`,
    note: 'Reports are written in Simplified Chinese.',
    reports: (count) => `${count} ${count === 1 ? 'report' : 'reports'}`,
    showAll: (total) => `Show all ${total} companies`,
    emptyBefore: 'No company matches that name. Try the site search at the top of the page, or ',
    emptyLink: 'browse all interview reports',
    emptyAfter: '.',
  },
  zh: {
    kicker: '按公司找面经',
    all: (total) => `${total} 家公司，按面经数排序`,
    matching: (count, query) => `有 ${count} 家公司匹配「${query}」`,
    note: '',
    reports: (count) => `${count} 篇面经`,
    showAll: (total) => `展开全部 ${total} 家公司`,
    emptyBefore: '没有找到这家公司。可以用页面顶部的站内搜索，或者',
    emptyLink: '浏览全部面经',
    emptyAfter: '。',
  },
}

const copy = COPY[props.locale]

const term = computed(() => props.query.trim())
const matches = computed(() => props.companies.filter((company) => companyMatches(company, term.value)))
const expanded = ref(false)
// 有搜索词时总是列出全部匹配
const visible = computed(() =>
  term.value || !props.limit || expanded.value ? matches.value : matches.value.slice(0, props.limit),
)
const maxReports = Math.max(1, ...props.companies.map((company) => company.reports))

const heading = computed(() =>
  term.value ? copy.matching(visible.value.length, term.value) : copy.all(props.companies.length),
)

const barWidth = (reports: number) => `${Math.max(6, (reports / maxReports) * 100)}%`
</script>

<template>
  <section id="companies" class="home-section companies">
    <div class="home-container">
      <div class="home-head home-head--row">
        <div>
          <p class="home-kicker">{{ copy.kicker }}</p>
          <h2 class="home-title" aria-live="polite">{{ heading }}</h2>
        </div>
        <p v-if="copy.note" class="note">{{ copy.note }}</p>
      </div>
      <div v-if="visible.length" class="grid">
        <a v-for="company in visible" :key="company.slug" class="tile" :href="company.href">
          <span class="name">{{ company.name }}</span>
          <span class="count">{{ copy.reports(company.reports) }}</span>
          <span class="bar" aria-hidden="true"><i :style="{ width: barWidth(company.reports) }" /></span>
        </a>
      </div>
      <p v-else class="empty">
        {{ copy.emptyBefore }}<a class="home-link" href="/interview-experience/">{{ copy.emptyLink }}</a>{{ copy.emptyAfter }}
      </p>
      <button v-if="visible.length < matches.length" class="show-all" type="button" @click="expanded = true">
        {{ copy.showAll(companies.length) }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.companies {
  scroll-margin-top: var(--vp-nav-height);
}

.note {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
  gap: 10px;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--ao-blue);
    transform: translateY(-1px);
  }
}

.name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.count {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.bar {
  height: 4px;
  margin-top: 4px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--vp-c-default-soft);

  i {
    display: block;
    height: 100%;
    border-radius: 2px;
    background: var(--ao-blue);
  }
}

.empty {
  margin: 0;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

.show-all {
  display: block;
  margin: 20px auto 0;
  min-height: 44px;
  padding: 0 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  font-size: 14px;
  font-weight: 600;
  color: var(--home-accent);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--ao-blue);
  }
}

/* 手机上一列要排 39 张卡，改两列，长度减半 */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile,
  .show-all {
    transition: none;
  }
}
</style>
