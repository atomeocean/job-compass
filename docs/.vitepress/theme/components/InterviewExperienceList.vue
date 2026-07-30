<script setup lang="ts">
/**
 * InterviewExperienceList — 面试经验公司列表
 *
 * 用于 layout: page 的 interview-experience/index.md。
 * 数据由 generate_folder_overview 脚本生成，详见
 * @ao-types/interviewExperienceListTypes。
 */
import { ref, computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import type { InterviewExperienceItem } from '@ao-types/interviewExperienceListTypes'

const props = withDefaults(defineProps<{
  items: InterviewExperienceItem[]
  /** 最近 N 天内有更新则显示 NEW 标签 */
  freshWindowDays?: number
}>(), {
  freshWindowDays: 30,
})

const normalizeHref = (href: string) => href.replace(/\.md$/, '')

const isNew = (item: InterviewExperienceItem) => {
  const age = (Date.now() - new Date(item.lastUpdated).getTime()) / 86400000
  return age <= props.freshWindowDays
}

type FilterKey = 'all' | 'new' | 'many'
const filter = ref<FilterKey>('all')

const filteredItems = computed(() => {
  if (filter.value === 'new') return props.items.filter(isNew)
  if (filter.value === 'many') return props.items.filter((i) => i.articleCount >= 3)
  return props.items
})

const totalArticles = computed(() =>
  props.items.reduce((sum, i) => sum + i.articleCount, 0)
)
</script>

<template>
  <div class="iel">
    <div class="iel__toolbar">
      <el-radio-group v-model="filter">
        <el-radio-button value="all">全部</el-radio-button>
        <el-radio-button value="new">近期有更新</el-radio-button>
        <el-radio-button value="many">面经 ≥ 3 篇</el-radio-button>
      </el-radio-group>
      <span class="iel__count">{{ filteredItems.length }} 家公司 · 共 {{ totalArticles }} 篇</span>
    </div>

    <el-table
      :data="filteredItems"
      :default-sort="{ prop: 'lastUpdated', order: 'descending' }"
      class="iel__table"
      empty-text="暂无面经"
      stripe
    >
      <el-table-column label="公司" min-width="340" prop="title" sortable>
        <template #default="{ row }">
          <div class="iel__company">
            <span class="iel__company-title">
              <a :href="normalizeHref(row.href)" class="iel__link">{{ row.title }}</a>
              <el-tag v-if="isNew(row)" effect="plain" size="small" type="success">NEW</el-tag>
            </span>
            <span class="iel__desc">{{ row.description }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="left" label="面经数" prop="articleCount" sortable width="110">
        <template #default="{ row }">
          <el-tag effect="plain" size="small" type="info">{{ row.articleCount }} 篇</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="最近更新" prop="lastUpdated" sortable width="150">
        <template #default="{ row }">
          <span class="iel__date">{{ row.lastUpdated }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收录时间" prop="createdDate" sortable width="150">
        <template #default="{ row }">
          <span class="iel__date iel__date--muted">{{ row.createdDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="right" label="入口" width="130">
        <template #default="{ row }">
          <a :href="normalizeHref(row.href)" class="iel__enter">
            查看面经
            <el-icon><ArrowRight /></el-icon>
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.iel {
  margin: 20px 0 28px;

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  &__count {
    margin-left: auto;
    font-size: 13px;
    color: var(--vp-c-text-3);
  }

  &__company {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 4px 0;
  }

  &__company-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__link {
    color: var(--vp-c-brand-1);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: var(--vp-c-brand-2);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  &__desc {
    font-size: 12.5px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date {
    color: var(--vp-c-text-2);
    font-variant-numeric: tabular-nums;

    &--muted {
      color: var(--vp-c-text-3);
    }
  }

  &__enter {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 13px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    text-decoration: none;

    &:hover {
      color: var(--vp-c-brand-2);
    }
  }
}

:deep(.el-table th.el-table__cell) {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

:deep(.el-table .cell) {
  line-height: 1.5;
}
</style>
