<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useData } from 'vitepress'
import { getInterviewData, type InterviewData } from '../utils/interviewData'

const { page } = useData()
const info = ref<InterviewData | null>(null)
const loading = ref(true)

const loadData = async () => {
    loading.value = true
    info.value = null
    
    if (page.value && page.value.relativePath) {
        const data = await getInterviewData(page.value.relativePath)
        if (data) {
            info.value = data
        }
    }
    loading.value = false
}

onMounted(() => {
    loadData()
})

watch(() => page.value.relativePath, () => {
    loadData()
})

const resultTagType = computed(() => {
    const result = info.value?.interview?.result?.toLowerCase()
    switch (result) {
        case 'pass':
        case 'offer':
            return 'success'
        case 'reject':
        case 'fail':
            return 'danger'
        case 'pending':
        case 'waiting':
            return 'warning'
        default:
            return 'info'
    }
})
</script>

<template>
  <div v-if="info" class="interview-detail-container">
    <div class="header-row">
      <span class="company-title">{{ info.company }} - {{ info.position?.title }}</span>
      <el-tag :type="resultTagType" effect="dark" size="small" class="result-tag">
        {{ info.interview?.result?.toUpperCase() }}
      </el-tag>
    </div>
    
    <el-descriptions :column="2" border size="small">
      <el-descriptions-item label="Level">{{ info.position?.level }}</el-descriptions-item>
      <el-descriptions-item label="Job Type">{{ info.position?.jobType }}</el-descriptions-item>
      <el-descriptions-item label="Date">{{ info.interview?.date }}</el-descriptions-item>
      <el-descriptions-item label="Round Type">{{ info.interview?.roundType }}</el-descriptions-item>
      <el-descriptions-item label="Education" v-if="info.candidate?.education">
        {{ info.candidate?.education }}
      </el-descriptions-item>
      <el-descriptions-item label="Experience" v-if="info.candidate?.yearsOfExperience !== undefined">
        {{ info.candidate?.yearsOfExperience }} Years
      </el-descriptions-item>
      
      <el-descriptions-item label="Rating" :span="2">
          <el-rate
              v-model="info.interview.rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
          />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">
.interview-detail-container {
  margin: 1.5rem 0;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem; // Spacing between header and table

    .company-title {
      font-weight: 600;
      font-size: 1.25em; // Slightly larger for title
    }
    
    .result-tag {
        font-weight: bold;
    }
  }

  // Ensure descriptions table takes full width
  :deep(.el-descriptions__body) {
    width: 100%;
  }
  
  :deep(.el-descriptions__table) {
    width: 100%;
  }
}
</style>
