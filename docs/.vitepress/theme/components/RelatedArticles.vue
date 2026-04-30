<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { ArrowRight } from '@element-plus/icons-vue'
import type { RelatedArticle } from '@ao-types/relatedArticlesTypes'

const { frontmatter } = useData()

const articles = computed<RelatedArticle[]>(() => frontmatter.value.relatedArticles ?? [])

// Strip .md extension so VitePress routes resolve correctly
const normalizeHref = (href: string) => href.replace(/\.md$/, '')

// Group by category; articles without a category go into a flat ungrouped list
const grouped = computed(() => {
  const map = new Map<string, RelatedArticle[]>()
  const ungrouped: RelatedArticle[] = []

  for (const article of articles.value) {
    if (article.category) {
      if (!map.has(article.category)) map.set(article.category, [])
      map.get(article.category)!.push(article)
    } else {
      ungrouped.push(article)
    }
  }

  const groups: { label: string | null; items: RelatedArticle[] }[] = []

  // Categories with only one item collapse into "其他"
  const singleItems: RelatedArticle[] = []
  for (const [label, items] of map.entries()) {
    if (items.length === 1) {
      singleItems.push(...items)
    } else {
      groups.push({ label, items })
    }
  }

  if (singleItems.length > 0 || ungrouped.length > 0) {
    const others = [...singleItems, ...ungrouped]
    groups.push({ label: groups.length > 0 ? '其他' : null, items: others })
  }

  return groups
})
</script>

<template>
  <div v-if="articles.length > 0" class="related-articles">
    <h2 class="related-articles__heading">相关文章</h2>
    <div
      v-for="group in grouped"
      :key="group.label ?? '__ungrouped'"
      class="related-articles__group"
    >
      <div v-if="group.label" class="related-articles__group-label">{{ group.label }}</div>
      <a
        v-for="article in group.items"
        :key="article.href"
        :href="normalizeHref(article.href)"
        class="related-articles__item"
      >
        <el-card shadow="never" class="related-articles__card">
          <span class="related-articles__item-title">{{ article.title }}</span>
          <el-icon class="related-articles__item-arrow"><ArrowRight /></el-icon>
        </el-card>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.related-articles {
  margin-top: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 32px;

  &__heading {
    font-size: 18px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 20px;
    border: none;
    padding: 0;
  }

  &__group {
    margin-bottom: 20px;
  }

  &__group-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--vp-c-text-3);
    margin-bottom: 8px;
  }

  &__item {
    display: block;
    margin-bottom: 6px;
    text-decoration: none;
    color: var(--vp-c-text-1);

    &:hover {
      .related-articles__card {
        border-color: var(--vp-c-brand-1);
        background-color: var(--vp-c-bg-soft);
      }

      .related-articles__item-arrow {
        color: var(--vp-c-brand-1);
        transform: translateX(3px);
      }
    }
  }

  &__card {
    border-radius: 8px;
    transition: border-color 0.2s, background-color 0.2s;

    :deep(.el-card__body) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
    }
  }

  &__item-title {
    font-size: 14px;
  }

  &__item-arrow {
    color: var(--vp-c-text-3);
    transition: color 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
}
</style>
