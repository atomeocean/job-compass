<script lang="ts" setup>
const props = defineProps<{
  bilibili: string
  youtube: string
}>()

function openLink(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <el-card class="video-card">
    <div class="video-title">🎬 观看视频教程：</div>
    <div class="button-container">
      <el-button type="primary" @click="openLink(props.bilibili)">
        📺 Bilibili 视频
      </el-button>
      <el-button type="danger" plain @click="openLink(props.youtube)">
        ▶️ YouTube 视频
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

