<!--原创面经的文末声明，通过 doc-footer-before 插槽自动挂载，作者无需在 Markdown 中手写-->
<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import ReferenceSource from '@ao-components/ReferenceSource.vue'

const { page, frontmatter } = useData()

// sourceType 由 config.ts 的 transformPageData 推断：文中没有 <ReferenceSource> 的面经即为 original
const isOriginal = computed(() => frontmatter.value.sourceType === 'original')
</script>

<template>
  <!-- vp-doc 让标题和段落沿用正文样式，与写在正文里的「引用来源」卡片保持一致 -->
  <div v-if="isOriginal" :key="page.relativePath" class="vp-doc">
    <ReferenceSource original :author="frontmatter.originalAuthor" />
  </div>
</template>
