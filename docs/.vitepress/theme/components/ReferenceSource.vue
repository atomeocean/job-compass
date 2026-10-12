<!--在文章中显示内容引用来源；original 模式下显示原创声明-->
<script setup lang="ts">
import { ElCard, ElButton, ElTag } from 'element-plus'
import { Link as ElIconLink } from '@element-plus/icons-vue'
import type { ReferenceSourceItem } from '@ao-types/referenceSourceTypes'

withDefaults(defineProps<{
  sources?: ReferenceSourceItem[]
  original?: boolean
  author?: string
}>(), {
  sources: () => [],
  original: false,
  author: ''
})

const openLink = (url: string): void => {
  if (!url) return
  window.open(url, '_blank', 'noopener') // 在新标签页打开链接
}

</script>

<template>
  <div v-if="original" class="reference-container">
    <h2>原创声明</h2>

    <el-card class="reference-card">
      <p>本文为作者亲身面试经历的原创分享，首发于 Job Compass。如需转载，请注明出处并附上本页链接。</p>
      <p v-if="author"><strong>作者：</strong>{{ author }}</p>
    </el-card>
  </div>

  <div v-else class="reference-container">
    <h2>引用来源</h2>

    <el-card v-for="(source, index) in sources" :key="index" class="reference-card">
      <template #header>
        <div class="card-header">
          <strong class="source-title">{{ source.title || '未提供标题' }}</strong>
          <el-tag v-if="source.category" type="info">{{ source.category }}</el-tag>
        </div>
      </template>

      <p v-if="source.description">{{ source.description }}</p>
      <p><strong>来源：</strong>{{ source.site || '未知来源' }}</p>
      <p v-if="source.author"><strong>作者：</strong>{{ source.author }}</p>
      <p v-if="source.date"><strong>发布时间：</strong>{{ source.date }}</p>

      <el-button v-if="source.link" type="primary" @click="openLink(source.link)">
        <el-icon-link class="icon-link" /> 查看原文
      </el-button>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
  .reference-container {
    margin-top: 20px;
  }

  .reference-title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }

  .reference-card {
    margin-bottom: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .source-title {
    flex-grow: 1;
  }

  .icon-link {
    margin-right: 5px;
  }
</style>
