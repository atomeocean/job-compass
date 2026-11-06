/**
 * 文章列表组件 ArticleList 的数据结构，移植自 logbook
 * 由 components/articleList/articleListMeta.data.ts 在构建期从页面 frontmatter 解析
 */

// 有新闻目录的栏目：新闻放在 <section>/news/<company>/<slug>.md
export type NewsSection = 'direct-hire-company' | 'staffing-company'

export interface ArticleListItem {
  href: string // 站内链接：根路径、带 .html（本站关闭了 cleanUrls，与 VitePress 自己生成的链接一致）
  title: string
  description?: string
  thumbnail?: string // 封面图 URL（图床外链），列表行右侧缩略图
  newsDate?: string // 新闻本身的日期（事件或报道日），frontmatter 手填；列表优先按它排序和显示
  createdDate?: string // YYYY-MM-DD，收录进本站的日期，CI 注入
  lastUpdated?: string // YYYY-MM-DD
  // frontmatter 中 authors / author / contributors 的原值，由 ArticleRow 经 normalizeAuthorValue 解析
  authors?: unknown[]
  // 同目录同名审阅页（<slug>.review.md）的链接，没有审阅意见时不存在
  reviewHref?: string
}
