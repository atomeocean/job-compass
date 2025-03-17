<script setup lang="ts">
import { ref } from 'vue'
import { ElTree } from 'element-plus'

// 定义目录树结构的接口
interface TreeNode {
  path: string;      // 完整路径（如 'docs/zhHans/招聘信息'）
  name?: string;      // 显示名称（如 '招聘信息'）
  children?: TreeNode[];
}

// 目录结构数据
const directoryData = ref<TreeNode[]>([
  {
    path: 'docs', // vitepress内容根目录
    children: [
      {
        path: 'docs/zhHans', // 中文文档目录
        children: [
          {
            path: 'docs/zhHans/job-postings', // 招聘信息目录
            name: 'Job Postings',
            children: [
              {
                name: '谷歌',
                path: 'docs/zhHans/job-postings/google',
                children: [
                    {
                      path: 'docs/zhHans/job-postings/google/software-engineer',
                      name: 'software engineer'
                    },
                  {
                    path: 'docs/en/job-postings/google/data', // 保存json数据的文件
                  }
                ]
              },
              {
                name: '微软',
                path: 'docs/zhHans/job-postings/microsoft',
                children: [
                    {
                      path: 'docs/zhHans/job-postings/microsoft/software-development-manager',
                      name: 'software development manager',
                    },
                  {
                    path: 'docs/en/job-postings/microsoft/data', // 保存json数据的文件
                  }
                ]
              }
            ]
          },
          {
            path: 'docs/zhHans/interview-prepare',
            name: '面试准备'
          },
          {
            path: 'docs/zhHans/staffing-company',
            name: '上船'
          }
        ]
      },
      {
        path: 'docs/en', // 英文文档目录
        children: [
          {
            path: 'docs/en/job-postings', // 招聘信息目录
            name: 'Job Postings', // 显示侧边栏的名称
            children: [
              {
                name: 'Google',
                path: 'docs/en/job-postings/google',
                children: [
                  {
                    path: 'docs/en/job-postings/google/software-engineer',
                    name: 'software engineer'
                  },
                  {
                    path: 'docs/en/job-postings/google/data', // 保存json数据的文件
                  }
                ]
              },
              {
                name: 'Microsoft',
                path: 'docs/en/job-postings/microsoft',
                children: [
                  {
                    path: 'docs/en/job-postings/microsoft/software-development-manager',
                    name: 'software development manager',
                  },
                  {
                    path: 'docs/en/job-postings/microsoft/data', // 保存json数据的文件
                  }
                ]
              }
            ]
          },
          {
            path: 'docs/en/interview-prepare',
            name: 'Interview Prepare'
          },
          {
            path: 'docs/en/staffing-company',
            name: 'Staffing Company'
          }
        ]
      },
    ]
  }
])
</script>

<template>
  <div class="directory-container">
    <h2 class="directory-title">📂 文件目录结构</h2>
    <el-divider></el-divider>
    <el-tree :data="directoryData" default-expand-all node-key="name" />
  </div>
</template>

<style scoped>
.directory-container {
  max-width: 100%;
  margin: 20px auto;
  padding: 20px;
}

.directory-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>