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

</script>

<template>
  <el-descriptions title="公司信息" border :column="1">
    <el-descriptions-item v-for="(value, key) in staffingCompanyInfo" :key="key" :label="key">
      {{ value || "暂无信息" }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
  .el-descriptions {
    margin: 20px 0;
  }
</style>