<!--描述组件用于展示求职中介公司信息-->
<!-- Table component for displaying staffing company information -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  staffingCompanyJsonPath: {
    type: String, // 传入 JSON 文件路径
    required: true,
  },
})

const staffingCompanyInfo = ref({})

// 使用 import.meta.glob 懒加载 / 动态加载所有 JSON 文件
// 这里 glob 匹配 /assets/json/*.json
const jsonModules = import.meta.glob("/assets/json/staffing-company/*.json");

// 在组件挂载时，根据传入的 staffingCompanyJsonPath 加载指定 JSON
onMounted(async() => {
  // 假设 props.staffingCompanyJsonPath 传入时包含文件名，如 "staffingCompanyInfo.json"
  // 如果仅传入 "staffingCompanyInfo"，可以自行在这里拼接 ".json"
  const normalizedPath = props.staffingCompanyJsonPath.endsWith(".json")
      ? props.staffingCompanyJsonPath
      : `${props.staffingCompanyJsonPath}.json`;

  // 拼出完整的文件路径（需与 import.meta.glob 中的匹配模式一致）
  const fileKey = `/assets/json/staffing-company/${normalizedPath}`;

  if (jsonModules[fileKey]) {
    // 调用该函数懒加载对应 JSON 模块
    const module = await jsonModules[fileKey]();
    // module.default 即为导出的 JSON 对象
    staffingCompanyInfo.value = module.default.basicInformation;
  } else {
    console.warn(`[StaffingCompanyInfo] 未找到对应 JSON 文件: ${fileKey}`);
  }
});

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