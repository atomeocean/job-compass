import { computed, onMounted, shallowRef, watch, type ComputedRef, type ShallowRef } from 'vue'
import { useData } from 'vitepress'
import { getInterviewData, parseInterviewPath, type InterviewData } from '@ao-utils/interviewData'
import type { InterviewNav } from '@ao-types/interviewNavTypes'

export interface UseInterviewDataReturn {
  /** 当前面经页的 JSON；非面经文章页、加载中或 JSON 缺失时为 null */
  data: ShallowRef<InterviewData | null>
  /** 构建时写入 frontmatter 的面包屑 / 抽屉数据，见 docs/.vitepress/interviewNav.ts */
  nav: ComputedRef<InterviewNav | undefined>
  /** 用作子树的 :key，路由切换时强制重建 */
  pageKey: ComputedRef<string>
}

/**
 * 面经页正文、右侧信息卡、文末时间线共用的数据加载。
 * 挂在布局插槽里的组件每一页都会渲染，所以先判断是不是面经文章页，其他页面不去找 JSON。
 * 按 theme/CLAUDE.md 的要求，挂载时和路由切换时都重新加载。
 */
export function useInterviewData(): UseInterviewDataReturn {
  const { page, frontmatter } = useData()
  const data = shallowRef<InterviewData | null>(null)
  const pageKey = computed(() => page.value.relativePath)
  const nav = computed(() => frontmatter.value.interviewNav as InterviewNav | undefined)

  const load = async (): Promise<void> => {
    const path = pageKey.value
    data.value = null
    if (!parseInterviewPath(path)) return
    const result = await getInterviewData(path)
    // 快速连续切换页面时，丢弃已经过期的结果
    if (pageKey.value === path) data.value = result
  }

  onMounted(load)
  watch(pageKey, load)

  return { data, nav, pageKey }
}
