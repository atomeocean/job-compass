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
  <el-card shadow="hover" style="margin: 20px auto; padding: 20px; text-align: center;">
    <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">
      🎬 观看视频教程：
    </div>
    <el-button-group>
      <el-button type="primary" @click="openLink(props.bilibili)">
        📺 Bilibili 视频
      </el-button>
      <el-button type="danger" plain @click="openLink(props.youtube)">
        ▶️ YouTube 视频
      </el-button>
    </el-button-group>
  </el-card>
</template>

