<script setup lang="ts">
  // import { NolebaseGitContributors } from "@nolebase/vitepress-plugin-git-changelog/client";
  // import { computed } from "vue";
  // import { useData } from "vitepress";
  //
  // const { page } = useData()
  //
  // // 使用页面路径作为 key，确保每次路由切换都重新渲染组件
  // const componentKey = computed(() => page.value.relativePath)


  import { watch, onMounted } from 'vue'
  import { useRoute } from 'vitepress'
  import { useChangelog } from '@nolebase/vitepress-plugin-git-changelog/client'

  const { authors, useHmr } = useChangelog()
  const route = useRoute()

  // 打印贡献者到控制台
  const logContributors = () => {
    if (authors.value.length > 0) {
      console.log('Git Contributors:')
      authors.value.forEach((contributor, index) => {
        console.log(`${index + 1}. ${contributor.name}`)
      })
    }
  }

  watch(() => route.path, () => {
    useHmr() // 每次路由变动重新拉取 Git 数据
    logContributors()
  })

  onMounted(() => {
    useHmr()
    logContributors()
  })
</script>

<template>
  <div class="contributor-container">
<!--    <NolebaseGitContributors :key="componentKey"/>-->
    <NolebaseGitContributors />
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


