<!--&lt;!&ndash;必须使用YouTube或B站的嵌入式视频，即有iframe标签才可以&ndash;&gt;-->
<!--&lt;!&ndash;在代码中提取url作为参数传入组件&ndash;&gt;-->
<!--<script setup lang="ts">-->
<!--  defineProps({-->
<!--    videoUrl: {-->
<!--      type: String,-->
<!--      required: true-->
<!--    },-->
<!--    // 可以自定义卡片标题-->
<!--    title: {-->
<!--      type: String,-->
<!--      default: '在YouTube上观看'-->
<!--    }-->
<!--  })-->
<!--</script>-->

<!--<template>-->
<!--  <el-card shadow="hover" class="video-card">-->
<!--    <template #header>-->
<!--      <div class="card-header">-->
<!--        <span>{{ title }}</span>-->
<!--      </div>-->
<!--    </template>-->
<!--    <div class="video-container">-->
<!--      <iframe-->
<!--        :src="`${videoUrl}`"-->
<!--        frameborder="0"-->
<!--        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"-->
<!--        allowfullscreen-->
<!--      ></iframe>-->
<!--    </div>-->
<!--  </el-card>-->
<!--</template>-->

<!--<style scoped>-->
<!--.video-container {-->
<!--  position: relative;-->
<!--  padding-bottom: 56.25%; /* 16:9 宽高比 */-->
<!--  height: 0;-->
<!--  overflow: hidden;-->
<!--  max-width: 100%;-->
<!--  background: #000;-->
<!--}-->
<!--.video-container iframe {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--.card-header {-->
<!--  font-size: 18px;-->
<!--  font-weight: 600;-->
<!--}-->
<!--.video-card {-->
<!--  margin: 20px 0;-->
<!--}-->
<!--</style>-->