<script setup lang="ts">
import { ref } from "vue";
import { useTransition, useIntersectionObserver } from '@vueuse/core'

const pv = ref(0);
const uv = ref(0);
// 设置平滑过渡的动态效果
const outputPV = useTransition(pv, { duration: 1800 })
const outputUV = useTransition(uv, { duration: 1800 })

const statisticRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// 定义busuanzi插件请求id
const SITE_VIEW_ID = "busuanzi_value_site_pv";
const UNIQUE_VIEWER_ID = "busuanzi_value_site_uv";

// 请求站点总访问数
const getSV = () => {
  // 由于是id选择器，因此需要在id前加上'#'字符
  const el = document.querySelector(`#${SITE_VIEW_ID}`);
  const text = el?.innerHTML;
  if (text) {
    pv.value = parseInt(text);
  } else {
    setTimeout(getSV, 500);
  }
};

// 请求访客数量
const getUV = () => {
  const el = document.querySelector(`#${UNIQUE_VIEWER_ID}`);
  const text = el?.innerHTML;
  if (text) {
    uv.value = parseInt(text);
  } else {
    setTimeout(getUV, 500);
  }
};

// 监听统计DOM元素，当这个元素进入窗口的可视区域时再加载数据
useIntersectionObserver(
    // 绑定监听的元素
    statisticRef,
    ([entry]) => {
      // 当进入可视区域加载数据
      if (entry.isIntersecting) {
        getSV()
        getUV()
      }
    },
    { threshold: 0.3 } // 元素进入 30% 可见时触发
)
</script>

<template>
  <div ref="statisticRef" class="page-view-statistic">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="6" class="text-center mb-4">
        <el-statistic :value="outputPV" group-separator=",">-->
          <template #title>
            <div style="font-size: 12pt; display: inline-flex; align-items: center">
              总访问量
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" class="text-center mb-4">
        <el-statistic :value="outputUV" group-separator=",">
          <template #title>
            <div style="font-size: 12pt; display: inline-flex; align-items: center">
              独立访客数
            </div>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
    <!-- 必须加这两个span占位符，busuanzi脚本会向对应id的DOM中写入数据 -->
    <span :id="SITE_VIEW_ID" style="display:none"></span>
    <span :id="UNIQUE_VIEWER_ID" style="display:none"></span>
  </div>
</template>

<style scoped>
.page-view-statistic {
  margin: 40px 0;
}
</style>

