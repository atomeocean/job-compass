<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  staffingCompanyRecruiters: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <el-table :data="staffingCompanyRecruiters" border>
    <el-table-column prop="name" label="名字"></el-table-column>
    <el-table-column prop="wechatId" label="微信号"></el-table-column>
    <el-table-column prop="redNote" label="小红书"></el-table-column>
  </el-table>
</template>

<style scoped>

</style>