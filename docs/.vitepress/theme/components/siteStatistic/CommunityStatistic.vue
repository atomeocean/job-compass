<script setup lang="ts">
import { ref } from "vue";
import { useTransition, useIntersectionObserver } from "@vueuse/core";
import { Briefcase, OfficeBuilding, Ship } from "@element-plus/icons-vue";

const props = defineProps({
  jobPostings: { type: Number, required: true },
  directHireCompanies: { type: Number, required: true },
  staffingCompanies: { type: Number, required: true },
});

const jobPostingsValue = ref(0);
const directHireValue = ref(0);
const staffingValue = ref(0);

const outputJobPostings = useTransition(jobPostingsValue, { duration: 1500 });
const outputDirectHire = useTransition(directHireValue, { duration: 1500 });
const outputStaffing = useTransition(staffingValue, { duration: 1500 });

const statisticRef = ref<HTMLElement | null>(null);

useIntersectionObserver(
  statisticRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      jobPostingsValue.value = props.jobPostings;
      directHireValue.value = props.directHireCompanies;
      staffingValue.value = props.staffingCompanies;
    }
  },
  { threshold: 0.3 }
);
</script>

<template>
  <div ref="statisticRef" class="community-statistic">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="8">
        <div class="statistic-card">
          <el-statistic :value="outputJobPostings" group-separator=",">
            <template #title>
              <div class="statistic-title">
                <el-icon><Briefcase /></el-icon>
                招聘信息
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>覆盖各大公司官网与招聘网站</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8">
        <div class="statistic-card">
          <el-statistic :value="outputDirectHire" group-separator=",">
            <template #title>
              <div class="statistic-title">
                <el-icon><OfficeBuilding /></el-icon>
                直招公司
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>无需中介，一步到位</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8">
        <div class="statistic-card">
          <el-statistic :value="outputStaffing" group-separator=",">
            <template #title>
              <div class="statistic-title">
                <el-icon><Ship /></el-icon>
                中介公司
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>过渡跳板，再寻直招机会</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.community-statistic {
  margin: 32px 0;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
  margin-bottom: 16px;
}

.statistic-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
