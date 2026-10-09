<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useData } from 'vitepress'
import { getInterviewData, type InterviewData, type InterviewRound } from '../utils/interviewData'

const { page, frontmatter } = useData()
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

/** 结果为空或 unknown 时不显示结果标签 */
const showResultTag = computed(() => {
    const result = (info.value?.interview?.result ?? '').trim().toLowerCase()
    return result !== '' && result !== 'unknown'
})

/** 来源标签：sourceType 来自面经 JSON，由 config.ts 的 transformPageData 在构建时写入 frontmatter */
const sourceTag = computed(() => {
    switch (frontmatter.value.sourceType) {
        case 'original':
            return { label: '原创分享', type: 'primary' as const }
        case 'repost':
            return { label: '转载', type: 'info' as const }
        default:
            return null
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
        return [{ roundType: interview.roundType ?? '', rate: interview.rate ?? null }]
    }

    return []
})
</script>

<template>
  <div v-if="info" class="interview-detail-container">
    <div class="header-row">
      <span class="company-title">
        {{ info.company }}<template v-if="info.position?.title"> - {{ info.position.title }}</template>
      </span>
      <el-space :size="8">
        <el-tag v-if="sourceTag" :type="sourceTag.type" effect="plain" size="small">
          {{ sourceTag.label }}
        </el-tag>
        <el-tag v-if="showResultTag" :type="resultTagType" effect="dark" size="small" class="result-tag">
          {{ info.interview?.result?.toUpperCase() }}
        </el-tag>
      </el-space>
    </div>
    
    <el-descriptions :column="2" border size="small">
      <!-- 早期面经补写的 JSON 常有空字段，空值不占格子 -->
      <el-descriptions-item label="Level" v-if="info.position?.level">{{ info.position?.level }}</el-descriptions-item>
      <el-descriptions-item label="Job Type" v-if="info.position?.jobType">{{ info.position?.jobType }}</el-descriptions-item>
      <el-descriptions-item label="Date" v-if="info.interview?.date">{{ info.interview?.date }}</el-descriptions-item>
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
              v-if="round.rate != null"
              :model-value="round.rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
          />
          <el-text v-else type="info" size="small">未提及难度</el-text>
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
