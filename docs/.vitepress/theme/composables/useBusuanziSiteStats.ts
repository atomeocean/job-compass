import { onBeforeUnmount, onMounted, ref } from 'vue'

/** busuanzi.pure.js 把全站数字写进这两个 id 的元素；主题在 index.ts 里引入它，每次路由切换后重新请求 */
export const BUSUANZI_SITE_PV_ID = 'busuanzi_value_site_pv'
export const BUSUANZI_SITE_UV_ID = 'busuanzi_value_site_uv'

/** 超过这个时间还没拿到数字就放弃，调用方保持隐藏 */
const TIMEOUT_MS = 10_000

/**
 * 读取 busuanzi 写进占位元素的全站浏览量和访客数。
 *
 * 调用方必须渲染 id 为上面两个常量的空元素（SSR 里就要有，busuanzi 的回调可能先于挂载完成）。
 * 数字只在浏览器里出现，所以界面以 ready 决定是否显示：脚本被拦截、请求失败、超时都保持 false，
 * 不会显示 0。和 SiteViewStatistic 不同，这里用 MutationObserver 等待写入，不轮询。
 */
export function useBusuanziSiteStats() {
  const pageViews = ref(0)
  const visitors = ref(0)
  const ready = ref(false)
  let observer: MutationObserver | undefined
  let timer: ReturnType<typeof setTimeout> | undefined

  const stop = () => {
    observer?.disconnect()
    clearTimeout(timer)
  }

  const read = (id: string) => Number.parseInt(document.getElementById(id)?.textContent ?? '', 10)

  const check = () => {
    const pv = read(BUSUANZI_SITE_PV_ID)
    const uv = read(BUSUANZI_SITE_UV_ID)
    if (pv > 0 && uv > 0) {
      pageViews.value = pv
      visitors.value = uv
      ready.value = true
      stop()
    }
  }

  onMounted(() => {
    check()
    if (ready.value) return
    observer = new MutationObserver(check)
    for (const id of [BUSUANZI_SITE_PV_ID, BUSUANZI_SITE_UV_ID]) {
      const element = document.getElementById(id)
      if (element) observer.observe(element, { childList: true, characterData: true, subtree: true })
    }
    timer = setTimeout(stop, TIMEOUT_MS)
  })

  onBeforeUnmount(stop)

  return { pageViews, visitors, ready }
}
