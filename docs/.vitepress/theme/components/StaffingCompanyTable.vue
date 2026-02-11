<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {formatAddress} from "../utils/util.ts";

// 定义 props，只接收文件名
const props = defineProps({
  companyJsonFileName: {
    type: String,
    required: true
  }
});

// 用于存储公司信息数据
const company = ref({});

// 动态加载 JSON 文件
const jsonModules = import.meta.glob('/zhHans/staffing-company/data/*.json');

// 计算完整的文件路径
const filePath = computed(() => {
  const normalizedPath = props.companyJsonFileName.endsWith('.json')
      ? props.companyJsonFileName
      : `${props.companyJsonFileName}.json`;
  return `/zhHans/staffing-company/data/${normalizedPath}`;
});

// 计算公司地址
const fullAddress = computed(() => formatAddress(company.value.companyInfo?.location));

onMounted(async () => {
  const fileKey = filePath.value;
  if (jsonModules[fileKey]) {
    const module = await jsonModules[fileKey]();
    company.value = module.default || module;
  } else {
    console.warn(`[StaffingCompanyTable] 未找到对应 JSON 文件: ${fileKey}`);
  }
});
</script>

<template>
  <div class="staffing-company">
    <!-- 公司基本信息 -->
    <el-descriptions title="公司基本信息" :column="2" border class="section-card">
      <el-descriptions-item label="公司名称">
        {{ company.companyInfo?.companyName || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="成立年份">
        {{ company.companyInfo?.foundedYear || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="公司地址">
        {{ fullAddress }}
      </el-descriptions-item>
      <el-descriptions-item label="行业类别">
        <ul v-if="company.companyInfo?.industry?.length">
          <li v-for="(item, index) in company.companyInfo.industry" :key="index">{{ item }}</li>
        </ul>
        <span v-else>N/A</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 联系信息 -->
    <el-descriptions title="联系信息" :column="1" border class="section-card">
      <el-descriptions-item label="电话">
        {{ company.companyInfo?.contact?.phone || '暂未提供' }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        {{ company.companyInfo?.contact?.email || '暂未提供' }}
      </el-descriptions-item>
      <el-descriptions-item label="官网">
        <a
            v-if="company.companyInfo?.contact?.website"
            :href="company.companyInfo.contact.website"
            target="_blank"
            rel="noopener noreferrer"
            class="apply-link"
        >
          {{ company.companyInfo.contact.website }}
        </a>
        <span v-else>暂未提供</span>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 岗位信息 -->
    <el-descriptions title="岗位信息" :column="1" border class="section-card">
      <el-descriptions-item label="岗位类型">
        {{ company.staffingAgencyPosition?.jobType || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="在美身份支持">
        {{ company.staffingAgencyPosition?.usIdentitySupport || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="工资单支持">
        {{ company.staffingAgencyPosition?.payStubSupport || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="招聘流程">
        {{ company.staffingAgencyPosition?.recruitmentProcess || 'N/A' }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- HR信息 -->
    <el-descriptions title="人力资源专员 Recruiter" :column="1" border class="section-card">
      <el-descriptions-item label="">
        <table class="recruiter-table">
          <thead>
          <tr>
            <th>姓名</th>
            <th>Email</th>
            <th>微信</th>
            <th>LinkedIn</th>
            <th>小红书</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, index) in company.recruiterInformation" :key="index">
            <td>{{ row.name || 'N/A' }}</td>
            <td>{{ row.email || '暂未提供' }}</td>
            <td>{{ row.wechat || '暂未提供' }}</td>
            <td>
              <a
                  v-if="row.linkedin"
                  :href="row.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="apply-link"
              >
                {{ row.linkedin }}
              </a>
              <span v-else>暂未提供</span>
            </td>
            <td>{{ row.xiaohongshu || '暂未提供' }}</td>
          </tr>
          </tbody>
        </table>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 培训信息 -->
    <el-descriptions title="上船待遇 - training 阶段" :column="1" border class="section-card">
      <el-descriptions-item label="培训内容">
        {{ company.training?.content || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="时长">
        {{ company.training?.duration || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="费用">
        {{ company.training?.cost || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="是否远程">
        {{ company.training?.remoteAllowed || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="培训地址">
        {{ formatAddress(company.training?.location) }}
      </el-descriptions-item>
      <el-descriptions-item label="违约金">
        {{ company.training?.penaltyForTermination || 'N/A' }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 营销信息 -->
    <el-descriptions title="上船待遇 - marketing 阶段" :column="1" border class="section-card">
      <el-descriptions-item label="时长">
        {{ company.marketing?.duration || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="准备工作">
        {{ company.marketing?.preparation || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="费用">
        {{ company.marketing?.cost || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="是否远程">
        {{ company.marketing?.remoteAllowed || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="marketing 地址">
        {{ formatAddress(company.marketing?.location) }}
      </el-descriptions-item>
      <el-descriptions-item label="违约金">
        {{ company.marketing?.penaltyForTermination || 'N/A' }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 元数据 -->
    <el-descriptions title="其他信息" :column="1" border class="section-card">
      <el-descriptions-item label="最后更新">
        {{ company.metadata?.lastUpdated || 'N/A' }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.staffing-company {
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

/* 招聘人员表格样式 */
.recruiter-table {
  width: 100%;
  border-collapse: collapse;
}

.recruiter-table th {
  background: #f4f7fa;
  color: #34495e;
  font-weight: 500;
  padding: 8px 12px;
  border: 1px solid #e8ecef;
  text-align: left;
}

.recruiter-table td {
  padding: 8px 12px;
  border: 1px solid #e8ecef;
  color: #555;
}

.recruiter-table tr {
  height: 40px;
}

/* 隐藏空的 label */
:deep(.el-descriptions__label:empty) {
  display: none;
}

/* 调整内容区域的内边距 */
:deep(.el-descriptions__content) {
  padding: 0;
}
</style>