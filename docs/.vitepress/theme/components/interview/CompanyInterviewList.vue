<!--
  公司面经列表，由 <company>/index.md 自己引入（没有全局注册），写在 H1 下面，不用传 props。
  数据是构建时写入的 frontmatter.interviewNav（见 docs/.vitepress/interviewNav.ts），已按收录时间排好序，SSR 时就有。
  看面经是这一页的目的，公司介绍只是列表上方的一个小链接，没有介绍页时不显示。
-->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import type { InterviewNav, InterviewNavItem } from '@ao-types/interviewNavTypes'
import { formatLevel, formatResult, formatRoundType, levelGroup, type LevelGroup } from '@ao-utils/interviewFormat'

const { page, frontmatter } = useData()

const nav = computed(() => frontmatter.value.interviewNav as InterviewNav | undefined)
const items = computed(() => nav.value?.items ?? [])

type Filter = 'all' | LevelGroup
const LEVELS: { key: LevelGroup; label: string }[] = [
  { key: 'intern', label: '实习' },
  { key: 'new-grad', label: '应届' },
  { key: 'experienced', label: '社招' },
]
const filter = ref<Filter>('all')

/** 只列有面经的级别；哪个级别都筛不掉任何一篇时，整组筛选都不显示 */
const filters = computed(() => {
  const total = items.value.length
  const levels = LEVELS
    .map((level) => ({ ...level, count: items.value.filter((item) => levelGroup(item.level) === level.key).length }))
    .filter((level) => level.count > 0)
  return levels.some((level) => level.count < total) ? [{ key: 'all' as Filter, label: '全部', count: total }, ...levels] : []
})

const rows = computed(() =>
  items.value.filter((item) => filter.value === 'all' || levelGroup(item.level) === filter.value),
)

// 筛选记在 URL 的 ?level= 里：读完一篇后退回来还是这个筛选。SSR 没有 location，所以挂载后才恢复
onMounted(() => {
  const level = new URLSearchParams(location.search).get('level')
  const saved = filters.value.find((item) => item.key === level)
  if (saved) filter.value = saved.key
})

watch(filter, (value) => {
  const url = new URL(location.href)
  if (value === 'all') url.searchParams.delete('level')
  else url.searchParams.set('level', value)
  // 保留 history.state，VitePress 后退时用它恢复滚动位置
  history.replaceState(history.state, '', url)
})

/** 级别、去重后的轮次类型和轮数，例如「应届 NG · OA · 电面 · 3 轮」；一眼看出这篇讲的是哪个阶段 */
const metaOf = (item: InterviewNavItem): string =>
  [formatLevel(item.level), ...new Set(item.roundTypes.map(formatRoundType)), item.rounds > 1 ? `${item.rounds} 轮` : '']
    .filter(Boolean)
    .join(' · ')
</script>

<template>
  <div v-if="nav" :key="page.relativePath" class="company-interview-list">
    <div class="company-interview-list__bar">
      <el-radio-group v-if="filters.length" v-model="filter" size="small" aria-label="按级别筛选">
        <el-radio-button v-for="item in filters" :key="item.key" :value="item.key">
          {{ item.label }} {{ item.count }}
        </el-radio-button>
      </el-radio-group>
      <a v-if="nav.company.introHref" class="company-interview-list__intro" :href="nav.company.introHref">
        {{ nav.company.title }} 公司介绍
        <el-icon><ArrowRight /></el-icon>
      </a>
    </div>

    <p class="company-interview-list__count">{{ rows.length }} 篇面经，按收录时间从新到旧</p>

    <ul class="company-interview-list__rows">
      <li v-for="item in rows" :key="item.href">
        <a class="company-interview-list__row" :href="item.href">
          <span class="company-interview-list__title">{{ item.title }}</span>
          <span
            v-if="formatResult(item.result)"
            class="company-interview-list__result"
            :class="`is-${formatResult(item.result)?.tone}`"
          >
            {{ formatResult(item.result)?.label }}
          </span>
          <span class="company-interview-list__meta">{{ metaOf(item) }}</span>
          <time v-if="item.createdDate" class="company-interview-list__date" :datetime="item.createdDate">{{ item.createdDate }}</time>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.company-interview-list {
  margin-top: 16px;

  &__bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 16px;
  }

  &__intro {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-left: auto;
    font-size: 13px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    text-decoration: none;

    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  &__count {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-3);
  }

  &__rows {
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--vp-c-divider);

    li,
    li + li {
      margin: 0;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 2px 12px;
    padding: 12px 8px;
    border-bottom: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: background 0.2s;

    &:hover {
      background: var(--vp-c-default-soft);
      color: var(--vp-c-text-1);
    }
  }

  &__title {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  &__result {
    grid-column: 2;
    justify-self: end;
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;

    &.is-ok { background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }
    &.is-bad { background: var(--vp-c-red-soft); color: var(--vp-c-red-1); }
    &.is-wait { background: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); }
    &.is-none { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }
  }

  &__meta {
    grid-column: 1;
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  &__date {
    grid-column: 2;
    justify-self: end;
    font-size: 12.5px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    color: var(--vp-c-text-3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .company-interview-list__row {
    transition: none;
  }
}
</style>
