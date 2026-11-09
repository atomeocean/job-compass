<!--「本公司面经」抽屉：从左侧滑出，只列当前公司目录下的面经，按级别分组。面经页去掉了站点侧栏，回到同公司其他面经靠它-->
<script setup lang="ts">
import { computed } from 'vue'
import type { InterviewNav, InterviewNavItem } from '@ao-types/interviewNavTypes'
import { formatResult, groupNavItems, type ResultLabel } from '@ao-utils/interviewFormat'

const props = defineProps<{
  modelValue: boolean
  nav: InterviewNav
  /** 当前页路由，例如 /interview-experience/google/8nmi24 */
  currentHref: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const groups = computed(() => groupNavItems(props.nav.items))

const close = (): void => emit('update:modelValue', false)

const UNKNOWN_RESULT: ResultLabel = { label: '结果未知', tone: 'none' }
const resultOf = (item: InterviewNavItem): ResultLabel => formatResult(item.result) ?? UNKNOWN_RESULT

const metaOf = (item: InterviewNavItem): string =>
  [
    item.rounds > 0 ? `${item.rounds} 轮` : '',
    /^\d{4}-\d{2}-\d{2}$/.test(item.date) ? item.date : '',
    item.href === props.currentHref ? '正在阅读' : ''
  ]
    .filter(Boolean)
    .join(' · ')
</script>

<template>
  <el-drawer
    :model-value="modelValue"
    direction="ltr"
    size="360px"
    :with-header="false"
    append-to-body
    class="interview-company-drawer"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="drawer">
      <div class="drawer__head">
        <div class="drawer__title">
          <strong>{{ nav.company.title }} 面经</strong>
          <span>{{ nav.items.length }} 篇</span>
        </div>
        <button type="button" class="drawer__close" aria-label="关闭" @click="close">
          <el-icon><Close /></el-icon>
        </button>
      </div>

      <div class="drawer__body">
        <section v-for="group in groups" :key="group.label">
          <div class="drawer__group">{{ group.label }}</div>
          <ul class="drawer__list">
            <li v-for="item in group.items" :key="item.href">
              <a :href="item.href" :aria-current="item.href === currentHref ? 'page' : undefined">
                <span class="drawer__item-title">{{ item.title }}</span>
                <span class="drawer__item-meta">{{ metaOf(item) }}</span>
                <span class="drawer__pill" :class="`is-${resultOf(item).tone}`">{{ resultOf(item).label }}</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div class="drawer__foot">
        <a :href="nav.company.href">{{ nav.company.title }} 目录</a>
        <a href="/interview-experience/">所有公司面经</a>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 14px;
  color: var(--vp-c-text-1);

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 12px 14px 18px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  &__title {
    strong {
      font-size: 15px;
      font-weight: 600;
    }

    span {
      margin-left: 6px;
      font-size: 12.5px;
      color: var(--vp-c-text-2);
    }
  }

  &__close {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    color: var(--vp-c-text-2);

    &:hover {
      background: var(--vp-c-default-soft);
      color: var(--vp-c-text-1);
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 4px 10px 16px;
  }

  &__group {
    margin-top: 14px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--vp-c-text-2);
  }

  &__list {
    margin: 4px 0 0;
    padding: 0;
    list-style: none;

    a {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 1px 10px;
      padding: 8px;
      border-radius: 8px;
      color: inherit;
      text-decoration: none;

      &:hover {
        background: var(--vp-c-default-soft);
      }

      &[aria-current='page'] {
        background: var(--vp-c-brand-soft);

        .drawer__item-title {
          color: var(--vp-c-brand-1);
        }
      }
    }
  }

  &__item-title {
    font-weight: 500;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  &__item-meta {
    grid-column: 1;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }

  &__pill {
    grid-row: 1 / span 2;
    grid-column: 2;
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;

    &.is-ok { background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }
    &.is-bad { background: var(--vp-c-red-soft); color: var(--vp-c-red-1); }
    &.is-wait { background: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); }
    &.is-none { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }
  }

  &__foot {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 18px;
    padding: 12px 18px;
    border-top: 1px solid var(--vp-c-divider);
    font-size: 13.5px;

    a {
      font-weight: 500;
      color: var(--vp-c-brand-1);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

<!-- el-drawer 会挂到 body 下，面板本身的尺寸只能用非 scoped 样式改 -->
<style lang="scss">
.interview-company-drawer.el-drawer {
  --el-drawer-padding-primary: 0;
  max-width: 88vw;
  background: var(--vp-c-bg);

  .el-drawer__body {
    padding: 0;
  }
}
</style>
