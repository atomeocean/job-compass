<!--表格组件用于展示求职中介公司信息-->
<!-- Table component for displaying staffing company information -->
<script setup>
import { ElTable, ElTableColumn } from 'element-plus';

const props = defineProps({
  staffingCompanyInfo: {
    type: Array,
    required: true,
  },
})

</script>

<template>
  <template>
    <el-table :data="staffingCompanyInfo" style="width: 100%">
      <el-table-column prop="companyName" label="公司名称" width="180"/>
      <el-table-column prop="foundDate" label="成立时间" width="180"/>
      <el-table-column prop="officialWebsite" label="公司官网"/>
    </el-table>
  </template>
</template>

<style scoped>

</style>