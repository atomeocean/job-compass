<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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

// Support navigating between pages without full reload
watch(() => page.value.relativePath, () => {
    loadData()
})
</script>

<template>
  <div v-if="info" class="interview-detail">
    <div class="header-row">
      <h2 class="company-title">{{ info.company }} - {{ info.position?.title }}</h2>
      <span class="tag result-tag" :class="info.interview?.result">{{ info.interview?.result }}</span>
    </div>

    <div class="info-grid">
      <div class="info-item">
        <div class="label">Level</div>
        <div class="value">{{ info.position?.level }}</div>
      </div>
      <div class="info-item">
        <div class="label">Job Type</div>
        <div class="value">{{ info.position?.jobType }}</div>
      </div>
      <div class="info-item">
        <div class="label">Date</div>
        <div class="value">{{ info.interview?.date }}</div>
      </div>
      <div class="info-item">
        <div class="label">Round</div>
        <div class="value">{{ info.interview?.roundType }}</div>
      </div>
       <div class="info-item">
        <div class="label">Rating</div>
        <div class="value">{{ info.interview?.rate }} / 5</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interview-detail {
  margin: 1.5rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.company-title {
  margin: 0 !important;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  padding: 0;
}

.tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

.tag.pass {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.tag.offer {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.tag.reject {
  background-color: var(--vp-c-red-soft);
  color: var(--vp-c-red-1);
}

.tag.pending {
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-1);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}
</style>
