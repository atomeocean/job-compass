<script setup lang="ts">
import { ref, onMounted } from "vue";
import { countTransK, formatDate } from "../../utils/util";
import { useData } from "vitepress";

const PAGE_VIEW_ID = "busuanzi_value_page_pv";

const pv = ref('加载中...')
const  { page } = useData()

const DEFAULT_DATE = "2021-08-21"

// 从 frontmatter 读取创建日期
const createdDateRaw = page.value.frontmatter?.createdDate
const createdDate = createdDateRaw ? formatDate(new Date(createdDateRaw)) : DEFAULT_DATE

// 从 frontmatter 读取最后更新日期
const lastUpdatedRaw = page.value.frontmatter?.lastUpdated
const lastUpdatedDate = lastUpdatedRaw ? formatDate(new Date(lastUpdatedRaw)) : createdDate

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
      <div class="created-time">
        <el-icon><Calendar /></el-icon>
        <span>发表于 {{ createdDate }}</span>
      </div>
      <div class="updated-time">
        <el-icon><Clock /></el-icon>
        <span>更新于 {{ lastUpdatedDate }}</span>
      </div>
      <div class="reader">
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

.tags {
  display: flex;           /* 让子元素横向排列 */
  align-items: center;     /* 垂直居中对齐 */
  gap: 20px;               /* 子元素之间间距 */
}

.tags > div {
  display: flex;           /* 每个子元素内部也用 flex */
  align-items: center;     /* 图标和文字垂直居中 */
  gap: 5px;                /* 图标和文字间距 */
}
</style>