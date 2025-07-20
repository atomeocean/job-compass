<!-- 展示招聘信息的组件 -->
<script setup>
import { onMounted, ref } from "vue";
import { Link } from "@element-plus/icons-vue";

// 定义 props
const props = defineProps({
  jobPostingJsonPath: {
    type: String,
    required: true,
  },
});

// 用于存储招聘信息数据
const jobPostingInfo = ref({});

// 动态加载 JSON 文件
const jsonModules = import.meta.glob("/zhHans/job-postings/*/data/*.json");

onMounted(async () => {
  const normalizedPath = props.jobPostingJsonPath.endsWith(".json")
      ? props.jobPostingJsonPath
      : `${props.jobPostingJsonPath}.json`;

  const fileKey = `/zhHans/job-postings/${normalizedPath}`;

  if (jsonModules[fileKey]) {
    const module = await jsonModules[fileKey]();
    jobPostingInfo.value = module.default;
  } else {
    console.warn(`[JobPostingTable] 未找到对应 JSON 文件: ${fileKey}`);
  }
});
</script>

<template>
  <div class="job-posting">
    <!-- 基本信息 -->
    <el-descriptions title="职位基本信息" :column="2" border class="section-card">
      <el-descriptions-item label="公司名称">
        {{ jobPostingInfo.companyName || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="职位名称">
        {{ jobPostingInfo.jobTitle || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="职位类型">
        {{ jobPostingInfo.jobType || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="工作地点">
        <ul v-if="jobPostingInfo.jobLocation?.length">
          <li v-for="(item, index) in jobPostingInfo.jobLocation" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 职责信息 -->
    <el-descriptions title="职责要求" :column="1" border class="section-card">
      <el-descriptions-item label="工作职责">
        <ul v-if="jobPostingInfo.jobResponsibilities?.length">
          <li v-for="(item, index) in jobPostingInfo.jobResponsibilities" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 候选人资格 -->
    <el-descriptions title="候选人资格" :column="1" border class="section-card">
      <el-descriptions-item label="基本条件">
        <ul v-if="jobPostingInfo.candidateQualifications?.basicQualifications?.length">
          <li v-for="(item, index) in jobPostingInfo.candidateQualifications.basicQualifications" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
      <el-descriptions-item label="优先条件">
        <ul v-if="jobPostingInfo.candidateQualifications?.preferredQualifications?.length">
          <li v-for="(item, index) in jobPostingInfo.candidateQualifications.preferredQualifications" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 薪资与福利 -->
    <el-descriptions title="薪资与福利" :column="1" border class="section-card">
      <el-descriptions-item label="薪资范围">
        <ul v-if="jobPostingInfo.salary?.length">
          <li v-for="(item, index) in jobPostingInfo.salary" :key="index">{{ item }}</li>
        </ul>
        <span v-else>薪资信息暂未提供</span>
      </el-descriptions-item>
      <el-descriptions-item label="福利待遇">
        <ul v-if="jobPostingInfo.benefits?.length">
          <li v-for="(item, index) in jobPostingInfo.benefits" :key="index">{{ item }}</li>
        </ul>
        <span v-else>具体福利详情未提供，请参考公司标准福利政策（如健康保险、401(k)、带薪休假等）</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 招聘链接 -->
    <el-descriptions title="其他信息" :column="1" border class="section-card">
      <el-descriptions-item label="备注信息">
        {{ jobPostingInfo.notes || "N/A" }}
      </el-descriptions-item>
      <el-descriptions-item label="申请方式">
        <span v-if="jobPostingInfo.jobLink">
          <el-icon><Link /></el-icon>
          <a :href="jobPostingInfo.jobLink" target="_blank" rel="noopener noreferrer" class="apply-link">
            点击申请
          </a>
        </span>
        <span v-else>N/A</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.job-posting {
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

/* 按钮样式（招聘链接） */
.el-button {
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
}

.el-button:hover {
  background-color: #66b1ff;
}

/* N/A 样式 */
span:where([v-else]) {
  color: #999;
  font-style: italic;
}
</style>