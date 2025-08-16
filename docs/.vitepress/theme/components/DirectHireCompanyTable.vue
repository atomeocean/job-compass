<!-- 展示美国公司静态信息的组件 -->
<script setup>
import { onMounted, ref, computed } from "vue";
import {formatAddress} from "../utils/util.ts";

// 定义 props
const props = defineProps({
  companyJsonFileName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

// 用于存储公司信息数据
const companyInfo = ref({});

// 动态构建 JSON 文件路径
const jsonModules = import.meta.glob("/zhHans/direct-hire-company/**/*.json");

// 计算完整的文件路径
const filePath = computed(() => {
  const normalizedPath = props.companyJsonFileName.endsWith(".json")
      ? props.companyJsonFileName
      : `${props.companyJsonFileName}.json`;
  return `/zhHans/direct-hire-company/${props.state}/${props.city}/data/${normalizedPath}`;
});

// 计算公司地址
const fullAddress = computed(() => formatAddress(companyInfo.value.companyInfo?.location));

onMounted(async () => {
  const fileKey = filePath.value;

  if (jsonModules[fileKey]) {
    const module = await jsonModules[fileKey]();
    companyInfo.value = module.default;
  } else {
    console.warn(`[CompanyInfoTable] 未找到对应 JSON 文件: ${fileKey}`);
  }
});
</script>

<template>
  <div class="company-info">
    <!-- 基本信息 -->
    <el-descriptions title="公司基本信息" :column="2" border class="section-card">
      <el-descriptions-item label="公司名称">
        {{ companyInfo.companyInfo?.companyName || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="成立年份">
        {{ companyInfo.companyInfo?.foundedYear || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="公司地址">
        {{ fullAddress }}
      </el-descriptions-item>
      <el-descriptions-item label="公司规模">
        {{ companyInfo.companyInfo?.companySize || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="公司简介">
        {{ companyInfo.companyInfo?.description || "N/A" }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 联系信息 -->
    <el-descriptions title="联系信息" :column="1" border class="section-card">
      <el-descriptions-item label="电话">
        {{ companyInfo.companyInfo?.contact?.phone || "暂未提供" }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        {{ companyInfo.companyInfo?.contact?.email || "暂未提供" }}
      </el-descriptions-item>
      <el-descriptions-item label="官网">
        <a
            v-if="companyInfo.companyInfo?.contact?.website"
            :href="companyInfo.companyInfo.contact.website"
            target="_blank"
            rel="noopener noreferrer"
            class="apply-link"
        >
          {{ companyInfo.companyInfo.contact.website }}
        </a>
        <span v-else>暂未提供</span>
      </el-descriptions-item>
      <el-descriptions-item label="LinkedIn">
        <a
            v-if="companyInfo.companyInfo?.contact?.linkedin"
            :href="companyInfo.companyInfo.contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="apply-link"
        >
          {{ companyInfo.companyInfo.contact.linkedin }}
        </a>
        <span v-else>暂未提供</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 公司详情 -->
    <el-descriptions title="公司详情" :column="1" border class="section-card">
      <el-descriptions-item label="行业类别">
        <ul v-if="companyInfo.companyInfo?.industry?.length">
          <li v-for="(item, index) in companyInfo.companyInfo.industry" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
      <el-descriptions-item label="主要产品或服务">
        <ul v-if="companyInfo.companyInfo?.mainProductsOrServices?.length">
          <li v-for="(item, index) in companyInfo.companyInfo.mainProductsOrServices" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 元数据 -->
    <el-descriptions title="其他信息" :column="1" border class="section-card">
      <el-descriptions-item label="最后更新">
        {{ companyInfo.metadata?.lastUpdated || "N/A" }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.company-info {
  max-width: 1000px;
  margin: 20px auto;
  background: #f9fafc;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* 卡片样式 */
.section-card {
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

/* 描述表格样式 */
.el-descriptions {
  --el-descriptions-table-border: 1px solid #e8ecef;
}

/* 标题样式 */
:deep(.el-descriptions__title) {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  padding: 12px 16px;
  background: linear-gradient(90deg, #eef2f6, #ffffff);
}

/* 标签样式 */
:deep(.el-descriptions__label) {
  background: #f4f7fa;
  color: #34495e;
  font-weight: 500;
  padding: 10px 14px;
}

/* 内容样式 */
:deep(.el-descriptions__content) {
  padding: 10px 14px;
  color: #555;
}

/* 列表样式 */
ul {
  margin: 0;
  padding-left: 18px;
  list-style-type: disc;
}

li {
  line-height: 1.6;
  margin-bottom: 6px;
  color: #666;
}

/* 链接样式 */
.apply-link {
  color: #409eff;
  text-decoration: none;
}

.apply-link:hover {
  text-decoration: underline;
}

/* N/A 样式 */
span:where([v-else]) {
  color: #999;
  font-style: italic;
}
</style>