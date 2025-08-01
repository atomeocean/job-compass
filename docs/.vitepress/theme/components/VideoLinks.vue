<script lang="ts" setup>

import { defineProps, withDefaults } from 'vue'
import { ElMessage } from 'element-plus'

//  用于展示多个平台的视频链接
const props = withDefaults(defineProps<{
  title?: string
  bilibili: string // Bilibili 视频链接
  youtube: string // YouTube 视频链接
  douyin: string // 抖音视频口令
}>(), {
  title: '🎬 观看视频：'
})

function openLink(url: string) {
  window.open(url, '_blank')
}

/**
 * 复制抖音链接并提示用户在抖音 App 中粘贴打开
 */
function showDouyinInstruction() {
  const link = props.douyin
  if (!link) {
    ElMessage.warning('本视频暂无抖音链接')
    return
  }
  navigator.clipboard.writeText(link)
      .then(() => {
        ElMessage.success('抖音链接已复制，请在抖音App中粘贴打开')
      })
      .catch(() => {
        ElMessage.info(`请手动复制以下链接并在抖音App中打开：\n${link}`)
      })
}
</script>

<template>
  <el-card class="video-card">
    <div class="video-title">{{ props.title }}</div>
    <div class="button-container">
      <el-button type="primary" @click="openLink(props.bilibili)">
        📺 Bilibili 视频
      </el-button>
      <el-button type="danger" plain @click="openLink(props.youtube)">
        ▶️ YouTube 视频
      </el-button>
      <el-button type="warning" @click="showDouyinInstruction">
        🎵 抖音
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.video-card {
  max-width: 480px;
  margin: 20px auto;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.video-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 600px) {
  .button-container {
    flex-direction: row;
    justify-content: center;
  }
}
</style>

