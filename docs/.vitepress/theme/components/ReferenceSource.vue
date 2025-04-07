<!--在文章中显示内容引用来源-->
<script setup>
import { defineProps } from 'vue'
import { ElCard, ElButton, ElTag } from 'element-plus'
import { Link as ElIconLink } from '@element-plus/icons-vue'

const props = defineProps({
  sources: {
    type: Array,
    required: true
  }
})

const openLink = (url) => {
  window.open(url, '_blank') // 在新标签页打开链接
}

</script>

<template>
  <div class="reference-container">
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
      <p v-if="source.author"><strong>👤 作者：</strong>{{ source.author }}</p>
      <p v-if="source.date"><strong>📅 发布时间：</strong>{{ source.date }}</p>

      <el-button v-if="source.link" type="primary" @click="openLink(source.link)">
        <el-icon-link class="icon-link" /> 查看原文
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
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