/**
 * 「本页尚未翻译」页用到的路径换算。路由 → 源文件：
 *   /es/guide/about      → docs/es/guide/about.md
 *   /es/guide/           → docs/es/guide/index.md
 *   /guide/about（根语言） → docs/zhHans/guide/about.md（config.ts 的 rewrites 去掉了 zhHans 前缀）
 */

/** 有自己 URL 前缀的语言；根语言没有前缀 */
export const PREFIXED_LOCALES = ['en', 'es', 'fr'] as const
export type PrefixedLocale = typeof PREFIXED_LOCALES[number]

export const REPO_URL = 'https://github.com/atomeocean/job-compass'

export interface MissingTranslation {
  locale: PrefixedLocale
  /** 去掉语言前缀、.html 和首尾斜杠后的路径，目录页补成 index，如 "guide/about"、"guide/index" */
  rest: string
}

/**
 * 判断 404 的路径是不是「某个语言版本缺了这一页」。
 * 只认 /en/、/es/、/fr/ 下的非首页路径；根语言路径和语言首页本身返回 null，交给默认 404。
 */
export const parseMissingTranslation = (path: string): MissingTranslation | null => {
  const match = decodeURI(path).match(/^\/(en|es|fr)\/(.+)$/)
  if (!match) return null
  let rest = match[2].replace(/\.html$/, '')
  if (rest.endsWith('/')) rest += 'index'
  rest = rest.replace(/^\/+/, '')
  if (!rest || rest === 'index') return null
  return { locale: match[1] as PrefixedLocale, rest }
}

/**
 * 该路径在某个语言下有没有页面。数据来自 VitePress 构建时写进每个页面的 __VP_HASH_MAP__
 * （键是「路由_用下划线连接.md」，小写），所以只在生产构建的浏览器里可用；dev 下返回 undefined 表示「不知道」。
 * @param prefix - 语言前缀，根语言传空字符串
 * @returns 存在时返回对应的 Markdown 相对路径（如 "guide/about.md"），不存在返回 null
 */
export const findPageFile = (prefix: string, rest: string): string | null | undefined => {
  const hashMap = typeof window === 'undefined' ? undefined : (window as any).__VP_HASH_MAP__
  if (!hashMap) return undefined
  const candidates = rest.endsWith('/index') || rest === 'index' ? [`${rest}.md`] : [`${rest}.md`, `${rest}/index.md`]
  for (const file of candidates) {
    const key = `${prefix ? `${prefix}/` : ''}${file}`.replace(/\//g, '_').toLowerCase()
    if (key in hashMap) return file
  }
  return null
}

/** GitHub 上查看英文源文件的链接，供翻译到其他语言时对照 */
export const enSourceUrl = (file: string): string => `${REPO_URL}/blob/main/docs/en/${file}`

/** 英文版的 GitHub 网页 PR 指南 */
export const PR_GUIDE_PATH = '/en/guide/github-pull-request-guide'

/** GitHub 网页上在 docs/<locale>/ 下新建同名文件的链接，提交后 GitHub 会引导开 PR */
export const newFileUrl = (locale: PrefixedLocale, file: string): string => {
  const slash = file.lastIndexOf('/')
  const dir = slash === -1 ? '' : `/${file.slice(0, slash)}`
  const name = file.slice(slash + 1)
  return `${REPO_URL}/new/main/docs/${locale}${dir}?filename=${encodeURIComponent(name)}`
}
