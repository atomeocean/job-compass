/**
 * 面经文章页的导航数据：面包屑和「本公司面经」抽屉用。
 * 构建时由 config.ts 的 transformPageData（见 docs/.vitepress/interviewNav.ts）写入 frontmatter.interviewNav，
 * 所以 SSR 时就能渲染，SPA 切换页面时随 frontmatter 一起更新。
 */
export interface InterviewNavItem {
  /** 站内路由，例如 /interview-experience/google/8nmi24 */
  href: string
  /** Markdown frontmatter 的 title，缺失时用 slug */
  title: string
  /** 以下字段原样取自面经 JSON，展示前由 interviewFormat.ts 转成中文 */
  level: string
  result: string
  /** 面试轮数，JSON 没写时为 0 */
  rounds: number
  date: string
}

export interface InterviewNav {
  company: {
    /** 公司目录名，例如 google */
    slug: string
    /** 公司 index.md 的 frontmatter title，例如 Google */
    title: string
    /** 公司目录页，例如 /interview-experience/google/ */
    href: string
  }
  /** 同公司目录下的全部面经，包括当前页 */
  items: InterviewNavItem[]
  /** 当前页 JSON 在 GitHub 上的编辑链接，「帮忙补充亮点」入口用 */
  jsonEditUrl: string
}
