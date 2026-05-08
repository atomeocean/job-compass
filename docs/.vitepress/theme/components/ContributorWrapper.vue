<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useContributors } from '@ao-composables/useContributors'

  const { displayAuthors, getDisplayName, getAvatarFallback, useHmr, pagePath } = useContributors()

  onMounted(() => {
    useHmr()
  })
</script>

<template>
  <el-space
    :key="pagePath"
    wrap
    :size="16"
    class="contributor-container vp-nolebase-git-changelog vp-nolebase-git-changelog-contributors vp-nolebase-git-changelog-contributors-container vp-nolebase-git-changelog-contributors-list"
  >
    <component
      :is="author.url ? 'el-link' : 'el-space'"
      v-for="author of displayAuthors"
      :key="author.name"
      v-bind="author.url
        ? { href: author.url, underline: false, class: 'contributor-link no-icon' }
        : { size: 8, class: 'contributor-item' }"
    >
      <el-avatar
        :size="32"
        :src="author.avatarUrl"
        :alt="`The avatar of contributor named as ${getDisplayName(author)}`"
      >
        {{ getAvatarFallback(author) }}
      </el-avatar>
      <el-text class="contributor-name">
        {{ getDisplayName(author) }}
      </el-text>
    </component>
  </el-space>
</template>

<style scoped>
  .contributor-container {
    margin-bottom: 1.5rem;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #555;
  }

  .contributor-link,
  .contributor-item {
    line-height: 1;
  }

  .contributor-link :deep(.el-link__inner) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .contributor-name {
    color: inherit;
  }
</style>
