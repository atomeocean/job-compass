<!--求职时间线：网申、收到回复、安排面试……每一步的日期和间隔。和正文里面试当天的内容是两块，由 InterviewDocFooter 放在正文之后-->
<script setup lang="ts">
import { computed } from 'vue'
import type { InterviewTimelineEvent } from '@ao-utils/interviewData'
import { buildTimelineView, type ResultTone } from '@ao-utils/interviewFormat'

const props = withDefaults(defineProps<{
  events: InterviewTimelineEvent[]
  /** 面试结果的色调，用来给 type 为 result 的节点上色 */
  resultTone?: ResultTone
}>(), {
  resultTone: 'none'
})

const view = computed(() => buildTimelineView(props.events))

const subtitleOf = (event: InterviewTimelineEvent): string =>
  [event.note?.trim(), event.rounds?.length ? `第 ${event.rounds.join('、')} 轮` : '']
    .filter(Boolean)
    .join(' · ')

const dotClassOf = (event: InterviewTimelineEvent): string => {
  if (event.type === 'interview') return 'is-interview'
  if (event.type === 'result') return `is-result is-${props.resultTone}`
  return ''
}
</script>

<template>
  <div class="timeline">
    <p v-if="view.summary" class="timeline__summary">{{ view.summary }}</p>
    <ol class="timeline__list">
      <template v-for="(row, index) in view.rows" :key="index">
        <li v-if="row.kind === 'gap'" class="timeline__row timeline__row--gap" aria-hidden="true">
          <span />
          <span class="timeline__rail" />
          <span class="timeline__gap" :class="{ 'is-longest': row.longest }">
            {{ row.days === 0 ? '当天' : `${row.days} 天` }}<template v-if="row.longest"> · 等得最久</template>
          </span>
        </li>
        <li v-else class="timeline__row" :class="dotClassOf(row.event)">
          <span class="timeline__date" :class="{ 'is-unknown': !row.hasDate }">{{ row.dateLabel }}</span>
          <span class="timeline__rail"><span class="timeline__dot" /></span>
          <span class="timeline__body">
            <strong>{{ row.event.event }}</strong>
            <span v-if="subtitleOf(row.event)">{{ subtitleOf(row.event) }}</span>
          </span>
        </li>
      </template>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  padding: 16px 20px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;

  /* .vp-doc 的段落和列表样式在这里不适用 */
  &__summary {
    margin: 0 0 14px;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__row {
    display: grid;
    grid-template-columns: 76px 20px minmax(0, 1fr);
    column-gap: 12px;
    margin: 0;

    &:first-child .timeline__rail::before { top: 11px; }
    &:last-child .timeline__rail::before { bottom: auto; height: 11px; }
  }

  &__date {
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    font-variant-numeric: tabular-nums;

    &.is-unknown {
      font-size: 12px;
      font-weight: 500;
      color: var(--vp-c-text-3);
    }
  }

  &__rail {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 9px;
      width: 2px;
      background: var(--vp-c-divider);
    }
  }

  &__dot {
    position: absolute;
    top: 6px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--vp-c-text-3);
    box-shadow: 0 0 0 3px var(--vp-c-bg);
  }

  .is-interview .timeline__dot {
    top: 4px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: var(--vp-c-brand-1);
  }

  .is-result.is-ok .timeline__dot { background: var(--vp-c-green-1); }
  .is-result.is-bad .timeline__dot { background: var(--vp-c-red-1); }
  .is-result.is-wait .timeline__dot { background: var(--vp-c-yellow-1); }

  &__body {
    display: grid;
    padding-bottom: 6px;
    min-width: 0;

    strong {
      font-size: 14.5px;
      font-weight: 600;
      line-height: 22px;
    }

    span {
      font-size: 13px;
      line-height: 1.6;
      color: var(--vp-c-text-2);
    }
  }

  &__gap {
    justify-self: start;
    margin: 4px 0 10px;
    padding: 0 9px;
    border-radius: 999px;
    background: var(--vp-c-default-soft);
    font-size: 12px;
    line-height: 22px;
    color: var(--vp-c-text-2);
    font-variant-numeric: tabular-nums;

    &.is-longest {
      background: var(--vp-c-yellow-soft);
      color: var(--vp-c-yellow-1);
      font-weight: 600;
    }
  }
}

@media (max-width: 640px) {
  .timeline {
    padding: 14px;

    &__row {
      grid-template-columns: 64px 20px minmax(0, 1fr);
      column-gap: 10px;
    }
  }
}
</style>
