import { createContentLoader } from 'vitepress'
import type { ArticleListItem, NewsSection } from '@ao-types/articleListTypes'

// 构建期解析各栏目新闻页的 frontmatter，按「栏目/公司」分组，供 ArticleList 渲染。
// 移植自 logbook：logbook 扫描全站并靠人工维护的清单 JSON 挑文章；
// 这里只扫描新闻目录、按目录自动收集，新增一篇新闻只需新建一个 Markdown 文件。
// loader 由 VitePress 独立打包，运行时导入不走 vite alias（type import 编译后擦除，不受影响），
// 所以作者字段只带原值，交给 ArticleRow 用 @ao-utils/contributors 解析。
// key 为 `${section}/${company}`，如 direct-hire-company/amazon
declare const data: Record<string, ArticleListItem[]>
export { data }

// 新闻放在 <section>/news/<company>/<slug>.md；新增栏目时在这里和 NewsSection 类型里各加一项
const NEWS_SECTIONS: NewsSection[] = ['direct-hire-company', 'staffing-company']

// 审阅意见与被审阅的新闻放在同一目录，文件名加 .review：foo.md ↔ foo.review.md。
// 审阅页不进新闻列表，只给对应新闻行挂一个「审阅意见」链接
const REVIEW_SUFFIX = '.review'

// 目录落地页与生成的概述页不是新闻
const NON_ARTICLE_PAGES = new Set(['index', 'overview'])

// frontmatter 中不带引号的日期会被 YAML 解析成 Date，带引号则是字符串，统一转成 YYYY-MM-DD
const toDateString = (value: unknown): string | undefined => {
  const parsed =
    value instanceof Date
      ? value
      : typeof value === 'string' && value.trim()
        ? new Date(value.trim())
        : null
  return parsed && !Number.isNaN(parsed.getTime())
    ? parsed.toISOString().slice(0, 10)
    : undefined
}

const nonEmptyString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined

// loader 不应用 rewrites，page.url 形如 /zhHans/direct-hire-company/news/amazon/foo.html，
// index.md 为 /zhHans/direct-hire-company/news/amazon/
const NEWS_URL_RE = /^\/zhHans\/([^/]+)\/news\/([^/]+)\/([^/]*)$/

// 去掉 /zhHans 前缀即为站内链接。保留 .html：组件里的链接不经过 Markdown 的链接补全，
// 而 foo.review 这种带点的路径在静态托管上不一定能自动补成 foo.review.html
const toHref = (url: string) => url.replace(/^\/zhHans/, '')

const sortDate = (item: ArticleListItem) =>
  item.newsDate ?? item.createdDate ?? item.lastUpdated ?? ''

export default createContentLoader(
  NEWS_SECTIONS.map((section) => `/zhHans/${section}/news/*/*.md`),
  {
    transform(rawData) {
      const reviews = new Map<string, string>() // `${section}/${company}/${slug}` -> 审阅页链接
      const newsPages: { key: string; slug: string; page: (typeof rawData)[number] }[] = []

      for (const page of rawData) {
        const match = page.url.match(NEWS_URL_RE)
        if (!match) continue
        const [, section, company, file] = match
        const slug = file.replace(/\.html$/, '') || 'index'
        if (NON_ARTICLE_PAGES.has(slug)) continue

        const key = `${section}/${company}`
        if (slug.endsWith(REVIEW_SUFFIX))
          reviews.set(`${key}/${slug.slice(0, -REVIEW_SUFFIX.length)}`, toHref(page.url))
        else newsPages.push({ key, slug, page })
      }

      const byCompany: Record<string, ArticleListItem[]> = {}
      const matchedReviews = new Set<string>()

      for (const { key, slug, page } of newsPages) {
        const { frontmatter } = page
        const title = nonEmptyString(frontmatter.title)
        if (!title) continue

        const description = nonEmptyString(frontmatter.description)
        const thumbnail = nonEmptyString(frontmatter.thumbnail)
        const newsDate = toDateString(frontmatter.newsDate)
        const createdDate = toDateString(frontmatter.createdDate)
        const lastUpdated = toDateString(frontmatter.lastUpdated)
        const authors = [frontmatter.authors, frontmatter.author, frontmatter.contributors].filter(
          Boolean,
        )
        const reviewHref = reviews.get(`${key}/${slug}`)
        if (reviewHref) matchedReviews.add(`${key}/${slug}`)

        ;(byCompany[key] ??= []).push({
          href: toHref(page.url),
          title,
          ...(description ? { description } : {}),
          ...(thumbnail ? { thumbnail } : {}),
          ...(newsDate ? { newsDate } : {}),
          ...(createdDate ? { createdDate } : {}),
          ...(lastUpdated ? { lastUpdated } : {}),
          ...(authors.length ? { authors } : {}),
          ...(reviewHref ? { reviewHref } : {}),
        })
      }

      // 审阅意见挂不上新闻时，构建日志里的提示是作者唯一能看到的信号
      for (const [reviewKey, href] of reviews)
        if (!matchedReviews.has(reviewKey))
          console.warn(
            `[ArticleList] 审阅意见没有同名新闻：${href}（同目录下应有 ${reviewKey.split('/').pop()}.md，且带 title）`,
          )

      // 按新闻日期倒序，没填时退回收录日期；同一天按标题排，保证每次构建顺序一致
      for (const list of Object.values(byCompany))
        list.sort(
          (a, b) => sortDate(b).localeCompare(sortDate(a)) || a.title.localeCompare(b.title),
        )

      return byCompany
    },
  },
)
