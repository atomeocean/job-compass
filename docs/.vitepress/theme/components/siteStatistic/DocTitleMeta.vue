<script setup lang="ts">
import { ref, onMounted } from "vue";
import { countTransK, formatDate } from "../../utils/util";
import { useData } from "vitepress";

const PAGE_VIEW_ID = "busuanzi_value_page_pv";

const  { page, localeIndex } = useData()

// vitepress-i18n 把中文的 localeIndex 映射成 'root'，英文页是 'en'
const isEn = localeIndex.value === 'en'
const LABELS = isEn
  ? { created: 'Published', updated: 'Updated', views: 'Views', loading: 'Loading…' }
  : { created: '发表于', updated: '更新于', views: '阅读量', loading: '加载中...' }

const pv = ref(LABELS.loading)
// busuanzi 无响应时「加载中」会一直挂着；英文页等拿到数字再显示阅读量，中文页保持原样
const pvLoaded = ref(false)

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
    pvLoaded.value = true;
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
        <span>{{ LABELS.created }} {{ createdDate }}</span>
      </div>
      <div class="updated-time">
        <el-icon><Clock /></el-icon>
        <span>{{ LABELS.updated }} {{ lastUpdatedDate }}</span>
      </div>
      <div v-if="!isEn || pvLoaded" class="reader">
        <el-icon><Avatar /></el-icon>
        <span>{{ LABELS.views }} {{ pv }}</span>
      </div>
      <!-- busuanzi 往这里写数字，必须一直渲染，不能放进上面的 v-if -->
      <span :id="PAGE_VIEW_ID" style="display: none" />
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