<script setup lang="ts">
  import { NolebaseGitContributors } from "@nolebase/vitepress-plugin-git-changelog/client";
  import { computed } from "vue";
  import { useData } from "vitepress";

  const { page } = useData()

  // 使用页面路径作为 key，确保每次路由切换都重新渲染组件
  const componentKey = computed(() => page.value.relativePath)
</script>

<template>
  <div class="contributor-container">
    <NolebaseGitContributors :key="componentKey"/>
  </div>
</template>

<style scoped>
  .contributor-container {
    margin-bottom: 1.5rem;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #555;
  }
</style>


