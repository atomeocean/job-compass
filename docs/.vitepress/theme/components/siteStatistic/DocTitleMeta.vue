<script setup lang="ts">
import { countTransK, formatDate } from "../../utils/util";
import { useData } from "vitepress";
import { BUSUANZI_IDS, useBusuanziCounts } from "@ao-composables/useBusuanzi";

const  { page, localeIndex } = useData()

// vitepress-i18n 把中文的 localeIndex 映射成 'root'，英文页是 'en'
const LABELS = localeIndex.value === 'en'
  ? { created: 'Published', updated: 'Updated', views: 'Views' }
  : { created: '发表于', updated: '更新于', views: '阅读量' }

// 阅读量等 busuanzi 返回数字后才显示；服务无响应时不显示，而不是一直「加载中」
const { counts, ready } = useBusuanziCounts(['pagePv'])

const DEFAULT_DATE = "2021-08-21"

// YAML 把 2026-10-27 解析成 UTC 零点，按本地时区格式化时美国读者会看到前一天，SSR 和浏览器渲染也对不上，
// 所以开头是完整日期时直接取这一段；其他写法（2026-6-9）照旧交给 Date
const toDay = (raw: any): string => formatDate(String(raw).match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? new Date(raw))

// 从 frontmatter 读取创建日期
const createdDateRaw = page.value.frontmatter?.createdDate
const createdDate = createdDateRaw ? toDay(createdDateRaw) : DEFAULT_DATE

// 从 frontmatter 读取最后更新日期
const lastUpdatedRaw = page.value.frontmatter?.lastUpdated
const lastUpdatedDate = lastUpdatedRaw ? toDay(lastUpdatedRaw) : createdDate
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
      <div v-if="ready" class="reader">
        <el-icon><Avatar /></el-icon>
        <!-- 将浏览量千分位进行转换 -->
        <span>{{ LABELS.views }} {{ countTransK(counts.pagePv) }}</span>
      </div>
      <!-- busuanzi 往这里写数字，必须一直渲染，不能放进上面的 v-if -->
      <span :id="BUSUANZI_IDS.pagePv" style="display: none" />
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