<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useData } from 'vitepress'
import { getInterviewData, type InterviewData, type InterviewRound } from '../utils/interviewData'

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
    const result = (info.value?.interview?.result ?? '').trim().toLowerCase()

    // 「未通过」必须先于「通过」判断，否则会被前缀匹配吞掉
    if (result.startsWith('未通过')) return 'danger'
    if (result.startsWith('通过')) return 'success'

    switch (result) {
        case 'pass':
        case 'passed':
        case 'offer':
        case 'accepted':
        case 'positive':
            return 'success'
        case 'reject':
        case 'rejected':
        case 'fail':
        case 'failed':
            return 'danger'
        case 'pending':
        case 'waiting':
        case 'waitlist':
            return 'warning'
        default:
            return 'info'
    }
})

/** 首字母大写；OA / HM / VO1 这类缩写保持全大写 */
const ROUND_TYPE_ACRONYMS = new Set(['oa', 'hm', 'vo', 'vo1', 'vo2'])

const formatRoundType = (roundType?: string): string => {
    const raw = (roundType ?? '').trim()
    if (!raw) return 'Round'

    return raw
        .split(/[-_\s]+/)
        .map((word) => {
            if (ROUND_TYPE_ACRONYMS.has(word.toLowerCase())) return word.toUpperCase()
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}

/**
 * 绝大多数面经 JSON 用 interview.rounds 逐轮记录；
 * 少数早期文件仍是 interview.roundType / interview.rate 的扁平写法，这里做兼容。
 */
const rounds = computed<InterviewRound[]>(() => {
    const interview = info.value?.interview
    if (!interview) return []

    if (Array.isArray(interview.rounds) && interview.rounds.length > 0) {
        return interview.rounds
    }

    if (interview.roundType || interview.rate != null) {
        return [{ roundType: interview.roundType ?? '', rate: interview.rate ?? 0 }]
    }

    return []
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
      <el-descriptions-item label="Education" v-if="info.candidate?.education">
        {{ info.candidate?.education }}
      </el-descriptions-item>
      <el-descriptions-item label="Experience" v-if="info.candidate?.yearsOfExperience != null">
        {{ info.candidate?.yearsOfExperience }} Years
      </el-descriptions-item>

      <el-descriptions-item
          v-for="(round, index) in rounds"
          :key="`${round.roundType}-${index}`"
          :label="formatRoundType(round.roundType)"
          :span="2"
      >
          <el-rate
              :model-value="round.rate ?? 0"
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
