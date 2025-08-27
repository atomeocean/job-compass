<script setup lang="ts">
import { ref, onMounted } from "vue";
import { countTransK } from "../../utils/util";

const PAGE_VIEW_ID = "busuanzi_value_page_pv";

const pv = ref('加载中...')

const getPV = () => {
  // 读取busuanzi服务器返回的浏览量
  const el = document.querySelector(`#${PAGE_VIEW_ID}`);
  const text = el?.innerHTML;
  if (text) {
    // 将浏览量千分位进行转换
    pv.value = countTransK(parseInt(text));
  } else {
    setTimeout(getPV, 500);
  }
}

onMounted(() => {
  getPV()
})
</script>

<template>
  <div class="title-statistic">
    <div class="tags">
      <div class="reader" title="阅读量">
        <el-icon><Avatar /></el-icon>
        <span>阅读量 {{ pv }}
          <span :id="PAGE_VIEW_ID" style="display: none" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-statistic {
  margin: 20px 0;
  color: #5c5b5b;
}
.reader {
  display: inline-flex; /* 使用 flex 对齐 */
  align-items: center; /* 垂直居中 */
  gap: 5px; /* 图标和文字之间留点间距 */
}
</style>