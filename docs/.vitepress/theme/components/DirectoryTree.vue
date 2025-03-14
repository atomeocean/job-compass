<script setup lang="ts">
import { ref } from 'vue'
import { ElTree } from 'element-plus'

// 定义 Tree 结构的接口
interface TreeNode {
  label: string
  children?: TreeNode[]
}

// 目录结构数据
const directoryData = ref<TreeNode[]>([
  {
    label: 'docs', // vitepress内容根目录
    children: [
      {
        label: 'zhHans', // 中文文档目录
        children: [
          {
            label: 'job-postings',
            children: [
              {
                label: 'google',
                children: [{ label: 'software engineer' }]
              },
              {
                label: 'microsoft',
                children: [{ label: 'software development manager' }]
              }
            ]
          },
          { label: 'interview-prepare' },
          { label: 'staffing-company' }
        ]
      }
    ]
  }
])
</script>

<template>
  <div class="directory-container">
    <h2 class="directory-title">📂 文件目录结构</h2>
    <el-divider></el-divider>
    <el-tree :data="directoryData" default-expand-all node-key="label" />
  </div>
</template>

<style scoped>
.directory-container {
  max-width: 100%;
  margin: 20px auto;
  padding: 20px;
  //border-radius: 8px;
  //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.directory-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>