import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** busuanzi.pure.js 把数字写进这些 id 的元素；主题在 index.ts 里引入它，每次路由切换后重新请求 */
export const BUSUANZI_IDS = {
  sitePv: 'busuanzi_value_site_pv',
  siteUv: 'busuanzi_value_site_uv',
  pagePv: 'busuanzi_value_page_pv',
} as const

export type BusuanziKey = keyof typeof BUSUANZI_IDS

/** 超过这个时间还没拿到数字就放弃，调用方保持隐藏 */
const TIMEOUT_MS = 10_000

/**
 * 读取 busuanzi 写进占位元素的数字，首页的全站访问量和文章页的阅读量共用。
 *
 * 调用方必须渲染 BUSUANZI_IDS 里对应 id 的空元素，而且 SSR 里就要有：busuanzi 的回调可能先于挂载完成，
 * 写进去的数字会留在元素里。数字只在浏览器里出现，所以界面以 ready 决定是否显示——busuanzi 服务无响应、
 * 被拦截或超时都保持 false，不会显示 0 或一直「加载中」。busuanzi 恢复后不用改代码。
 */
export function useBusuanziCounts<K extends BusuanziKey>(keys: readonly K[]) {
  const counts = ref(Object.fromEntries(keys.map((key) => [key, 0]))) as Ref<Record<K, number>>
  const ready = ref(false)
  let observer: MutationObserver | undefined
  let timer: ReturnType<typeof setTimeout> | undefined

  const stop = () => {
    observer?.disconnect()
    clearTimeout(timer)
  }

  const read = (key: K) => Number.parseInt(document.getElementById(BUSUANZI_IDS[key])?.textContent ?? '', 10)

  const check = () => {
    const values = keys.map(read)
    if (values.every((value) => value > 0)) {
      counts.value = Object.fromEntries(keys.map((key, index) => [key, values[index]])) as Record<K, number>
      ready.value = true
      stop()
    }
  }

  onMounted(() => {
    check()
    if (ready.value) return
    observer = new MutationObserver(check)
    for (const key of keys) {
      const element = document.getElementById(BUSUANZI_IDS[key])
      if (element) observer.observe(element, { childList: true, characterData: true, subtree: true })
    }
    timer = setTimeout(stop, TIMEOUT_MS)
  })

  onBeforeUnmount(stop)

  return { counts, ready }
}
