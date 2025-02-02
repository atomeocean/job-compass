<!--描述组件用于展示求职中介公司信息-->
<!-- Table component for displaying staffing company information -->
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  staffingCompanyInfo: {
    type: Array,
    required: true,
  },
})

//将 JSON key 转换为中文
const keyMap = {
  companyName: "公司名称",
  foundedDate: "成立时间",
  companyPhone: "公司电话",
  companyEmail: "公司邮箱",
  companyAddress: "公司地址",
  companyWebsite: "公司官网",
  location: "地址",
  jobType: "运输岗位",
  industry: "行业领域",
  usVisaSupport: "在美身份支持",
  payrollSupport: "工资单支持",
  recruitmentProcess: "招聘流程",
};

</script>

<template>
  <el-descriptions title="公司信息" border :column="1">
    <el-descriptions-item
        v-for="(value, key) in staffingCompanyInfo"
        :key="key"
        :label="keyMap[key] || key"
    >
      {{ value || "暂无信息" }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
  .el-descriptions {
    margin: 20px 0;
  }
</style>