<!--面经信息卡：公司、岗位、结果、关键字段和每轮难度。宽屏放在右侧栏（InterviewAsideCard），窄屏放在正文里（InterviewDetail）-->
<script setup lang="ts">
import { computed } from 'vue'
import type { InterviewData } from '@ao-utils/interviewData'
import {
  cleanValue,
  formatBackground,
  formatChannel,
  formatDifficulty,
  formatJobType,
  formatLevel,
  formatResult,
  formatRoundType,
  getRounds,
} from '@ao-utils/interviewFormat'

const props = withDefaults(defineProps<{
  data: InterviewData
  companyTitle: string
  /** frontmatter.sourceType，由 transformPageData 从 JSON 写入 */
  sourceType?: string
  variant?: 'aside' | 'inline'
}>(), {
  sourceType: '',
  variant: 'aside'
})

const initial = computed(() => (Array.from(props.companyTitle)[0] ?? '?').toUpperCase())
const positionTitle = computed(() => cleanValue(props.data.position?.title))
const result = computed(() => formatResult(props.data.interview?.result))

/** 空值不占行，早期补写的 JSON 常有空字段 */
const facts = computed(() => {
  const { position, applicationSource, candidate, interview } = props.data
  return [
    { label: '级别', value: formatLevel(position?.level) },
    { label: '岗位类型', value: formatJobType(position?.jobType) },
    { label: '面试日期', value: cleanValue(interview?.date) },
    { label: '投递方式', value: formatChannel(applicationSource?.channel) },
    { label: '背景', value: formatBackground(candidate) }
  ].filter((fact) => fact.value)
})

const rounds = computed(() =>
  getRounds(props.data.interview).map((round, index) => ({
    key: `${round.roundType}-${index}`,
    name: `${index + 1} · ${formatRoundType(round.roundType)}`,
    difficulty: formatDifficulty(round.rate)
  }))
)

const sourceLabel = computed(() => {
  if (props.sourceType === 'repost') return '转载内容，来源见文末'
  if (props.sourceType === 'original') return '作者原创分享'
  return ''
})
</script>

<template>
  <div class="info-card" :class="`info-card--${variant}`">
    <div class="info-card__head">
      <span class="info-card__logo" aria-hidden="true">{{ initial }}</span>
      <div class="info-card__who">
        <!-- 结果标签跟在公司名后面，右侧栏只有 224px，放在最右会把岗位名挤成两行 -->
        <div class="info-card__name">
          <strong>{{ companyTitle }}</strong>
          <span v-if="result" class="info-card__result" :class="`is-${result.tone}`">{{ result.label }}</span>
        </div>
        <span v-if="positionTitle" class="info-card__position">{{ positionTitle }}</span>
      </div>
    </div>

    <dl v-if="facts.length" class="info-card__facts">
      <template v-for="fact in facts" :key="fact.label">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </template>
    </dl>

    <div v-if="rounds.length" class="info-card__rounds">
      <div class="info-card__rounds-label">面试轮次 · {{ rounds.length }} 轮</div>
      <div v-for="round in rounds" :key="round.key" class="info-card__round">
        <span>{{ round.name }}</span>
        <span
          v-if="round.difficulty"
          class="meter"
          :class="`meter--${round.difficulty.tone}`"
          role="img"
          :aria-label="`难度 ${round.difficulty.rate}/5，${round.difficulty.label}`"
        >
          <i v-for="n in 5" :key="n" :class="{ on: n <= round.difficulty.rate }" />
          <b>{{ round.difficulty.label }}</b>
        </span>
        <span v-else class="info-card__muted">未提及难度</span>
      </div>
    </div>

    <div v-if="sourceLabel" class="info-card__source">{{ sourceLabel }}</div>
  </div>
</template>

<style scoped lang="scss">
.info-card {
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-1);

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__logo {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
    font-size: 16px;
    font-weight: 700;
  }

  &__who {
    display: grid;
    min-width: 0;
  }

  &__name {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px 8px;

    strong {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.35;
    }
  }

  &__position {
    font-size: 12.5px;
    color: var(--vp-c-text-2);
    overflow-wrap: anywhere;
  }

  &__result {
    padding: 0 7px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;

    &.is-ok { background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }
    &.is-bad { background: var(--vp-c-red-soft); color: var(--vp-c-red-1); }
    &.is-wait { background: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); }
    &.is-none { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }
  }

  &__facts {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 7px 12px;
    margin: 0;

    dt { color: var(--vp-c-text-2); }

    dd {
      margin: 0;
      text-align: right;
      font-weight: 500;
      overflow-wrap: anywhere;
    }
  }

  &__rounds {
    display: grid;
    gap: 7px;
    padding-top: 12px;
    border-top: 1px solid var(--vp-c-divider);
  }

  &__rounds-label {
    font-size: 12px;
    color: var(--vp-c-text-2);
  }

  &__round {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2px 8px;
  }

  &__muted {
    font-size: 12px;
    color: var(--vp-c-text-3);
  }

  &__source {
    padding-top: 10px;
    border-top: 1px dashed var(--vp-c-divider);
    font-size: 12px;
    color: var(--vp-c-text-3);
  }
}

/* 难度条沿用 LeetCode Easy / Medium / Hard 的配色 */
.meter {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;

  i {
    width: 10px;
    height: 5px;
    border-radius: 2px;
    background: var(--vp-c-default-soft);
  }

  b {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
  }

  &--easy { i.on { background: #2bb3a0; } b { color: var(--vp-c-green-1); } }
  &--mid { i.on { background: #f2a72a; } b { color: var(--vp-c-yellow-1); } }
  &--hard { i.on { background: #ec5a73; } b { color: var(--vp-c-red-1); } }
}

/* 正文里的版本：够宽时字段和轮次左右并排 */
@media (min-width: 640px) {
  .info-card--inline {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 28px;
    align-items: start;

    .info-card__head,
    .info-card__source {
      grid-column: 1 / -1;
    }

    .info-card__rounds {
      padding-top: 0;
      border-top: 0;
    }
  }
}
</style>
