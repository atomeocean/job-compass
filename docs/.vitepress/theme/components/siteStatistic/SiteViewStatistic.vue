<script setup lang="ts">
import { ref, watch } from "vue";
import { useTransition, useIntersectionObserver } from '@vueuse/core'
import { BUSUANZI_IDS, useBusuanziCounts } from '@ao-composables/useBusuanzi'

// busuanzi 拿不到数字（服务无响应、被拦截、超时）时 ready 保持 false，整块不显示，不显示 0
const { counts, ready } = useBusuanziCounts(['sitePv', 'siteUv'])

const pv = ref(0);
const uv = ref(0);
// 设置平滑过渡的动态效果
const outputPV = useTransition(pv, { duration: 1800 })
const outputUV = useTransition(uv, { duration: 1800 })

const statisticRef = ref<HTMLElement | null>(null)
const visible = ref(false)

// 监听统计DOM元素，进入窗口可视区域后才播放数字滚动
useIntersectionObserver(
    statisticRef,
    ([entry]) => {
      if (entry.isIntersecting) visible.value = true
    },
    { threshold: 0.3 } // 元素进入 30% 可见时触发
)

// 数字到了、而且已经滚到可视区域时再开始滚动
watch([ready, visible], ([isReady, isVisible]) => {
  if (isReady && isVisible) {
    pv.value = counts.value.sitePv
    uv.value = counts.value.siteUv
  }
})
</script>

<template>
  <div ref="statisticRef" class="page-view-statistic" :class="{ 'is-ready': ready }">
    <el-row v-if="ready" :gutter="16">
      <el-col :xs="24" :sm="12" :md="6" class="text-center mb-4">
        <el-statistic :value="outputPV" group-separator=",">
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
    <!-- 必须加这两个span占位符，busuanzi脚本会向对应id的DOM中写入数据；不能放进上面的 v-if -->
    <span :id="BUSUANZI_IDS.sitePv" style="display:none"></span>
    <span :id="BUSUANZI_IDS.siteUv" style="display:none"></span>
  </div>
</template>

<style scoped lang="scss">
/* 没拿到数字时整块不占位，拿到后再留出上下间距 */
.page-view-statistic.is-ready {
  margin: 40px 0;
}
</style>
