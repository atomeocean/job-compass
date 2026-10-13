<!--面经页标题上方的面包屑和「本公司面经」按钮，通过 doc-before 插槽挂载；数据由构建时写入的 frontmatter.interviewNav 提供，非面经文章页不渲染-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import type { InterviewNav } from '@ao-types/interviewNavTypes'
import InterviewCompanyDrawer from '@ao-components/InterviewCompanyDrawer.vue'

const { page, frontmatter } = useData()

const nav = computed(() => frontmatter.value.interviewNav as InterviewNav | undefined)
const pageTitle = computed(() => frontmatter.value.title || page.value.title)
/** relativePath 是 rewrites 之后的路径，和 interviewNav.items[].href 同一格式 */
const currentHref = computed(() => `/${page.value.relativePath.replace(/\.md$/, '')}`)

const drawerOpen = ref(false)

// 在抽屉里点开另一篇面经后关掉抽屉
watch(() => page.value.relativePath, () => {
  drawerOpen.value = false
})
</script>

<template>
  <div v-if="nav" :key="page.relativePath" class="interview-crumbs">
    <nav class="interview-crumbs__trail" aria-label="面包屑">
      <a href="/interview-experience/">面试经验</a>
      <span aria-hidden="true">/</span>
      <a :href="nav.company.href">{{ nav.company.title }}</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{{ pageTitle }}</span>
    </nav>

    <button
      v-if="nav.items.length > 1"
      type="button"
      class="interview-crumbs__drawer-btn"
      aria-haspopup="dialog"
      :aria-expanded="drawerOpen"
      @click="drawerOpen = true"
    >
      <el-icon><List /></el-icon>
      {{ nav.company.title }} 面经
      <em>{{ nav.items.length }}</em>
    </button>

    <ClientOnly>
      <InterviewCompanyDrawer v-model="drawerOpen" :nav="nav" :current-href="currentHref" />
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.interview-crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin-bottom: 16px;

  &__trail {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 6px;
    min-width: 0;
    font-size: 13px;
    color: var(--vp-c-text-2);

    a {
      color: var(--vp-c-text-2);
      text-decoration: none;

      &:hover {
        color: var(--vp-c-brand-1);
      }
    }

    span[aria-hidden='true'] {
      color: var(--vp-c-text-3);
    }
  }

  &__drawer-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 0 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    white-space: nowrap;
    transition: border-color 0.2s, color 0.2s;

    em {
      font-style: normal;
      color: var(--vp-c-text-2);
    }

    &:hover {
      border-color: var(--vp-c-brand-1);
      color: var(--vp-c-brand-1);
    }
  }
}
</style>
