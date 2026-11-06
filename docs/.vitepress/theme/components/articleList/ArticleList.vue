<!-- 公司新闻列表：渲染 <section>/news/<company>/ 下的文章，移植自 logbook 的 ArticleList。
     标题由 Markdown 的 ## 小节提供（这样会出现在右侧大纲里），组件本身不带标题 -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { NewsSection } from '@ao-types/articleListTypes'
import { data as newsByCompany } from './articleListMeta.data'
import ArticleRow from './ArticleRow.vue'

const props = withDefaults(
  defineProps<{
    // news/ 下的公司目录名，如 amazon；直招公司与 interview-experience/ 下的目录同名，中介公司与公司页文件名同名
    company: string
    // 新闻所在栏目，即 <section>/news/<company>/
    section?: NewsSection
  }>(),
  { section: 'direct-hire-company' },
)

const PAGE_SIZE = 10

const key = computed(() => `${props.section}/${props.company}`)

// 构建期 loader 已按新闻日期倒序排好
const articles = computed(() => newsByCompany[key.value] ?? [])

const shownCount = ref(PAGE_SIZE)
const visibleArticles = computed(() => articles.value.slice(0, shownCount.value))
const remainingCount = computed(() => articles.value.length - visibleArticles.value.length)

watch(
  key,
  () => {
    shownCount.value = PAGE_SIZE
    if (!newsByCompany[key.value])
      console.warn(`[ArticleList] 未找到公司新闻：/${props.section}/news/${props.company}/`)
  },
  { immediate: true },
)
</script>

<template>
  <div class="article-list">
    <el-empty v-if="articles.length === 0" description="暂无相关新闻" :image-size="80" />
    <template v-else>
      <ul class="article-list__list">
        <ArticleRow v-for="article in visibleArticles" :key="article.href" :article="article" />
      </ul>
      <footer v-if="remainingCount > 0" class="article-list__foot">
        <el-button round @click="shownCount += PAGE_SIZE">
          加载更多（还有 {{ remainingCount }} 篇）
        </el-button>
      </footer>
    </template>
  </div>
</template>

<style scoped>
.article-list {
  margin: 16px 0;
}

/* 覆盖 .vp-doc ul 的缩进、圆点与外边距 */
.article-list__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.article-list__foot {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
</style>
