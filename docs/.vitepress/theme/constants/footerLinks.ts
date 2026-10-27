/**
 * 英文页脚（SiteFooter.vue）的链接。版式移植自 logbook 的 SiteFooter，链接换成 Job Compass 的。
 *
 * 站点未开启 cleanUrls，站内链接写运行时形态：目录页 `/dir/`，普通页 `/x.html`。
 * 写成 `/x` 时左键点击会被 VitePress router 修正，但新标签页打开是一次真实请求。
 * Product 一列指向中文栏目，英文镜像还没有这些内容。
 */

export interface FooterLink {
  text: string
  href: string
  /** 站外链接：新标签页打开 */
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

/** 品牌区下方的 Atomeocean 其他站点 */
export const FOOTER_PLATFORMS: readonly FooterLink[] = [
  { text: 'Atomeocean.com', href: 'https://atomeocean.com', external: true },
  { text: 'Logbook', href: 'https://logbook.atomeocean.com/en/', external: true },
]

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { text: 'Interview reports', href: '/interview-experience/' },
      { text: 'Interview prep', href: '/interview-prepare/' },
      { text: 'Company profiles', href: '/direct-hire-company/' },
      { text: 'Job postings', href: '/job-postings/' },
      { text: 'Career guides', href: '/career-guide/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About Job Compass', href: '/en/guide/about.html' },
      { text: 'Team', href: '/en/guide/team.html' },
      { text: 'About Atomeocean', href: 'https://logbook.atomeocean.com/en/about-us/', external: true },
      { text: 'Credentials', href: 'https://logbook.atomeocean.com/en/about-us/legal-credentials/', external: true },
      { text: 'Careers', href: 'https://logbook.atomeocean.com/en/careers/job-post/overview.html', external: true },
    ],
  },
  {
    title: 'Contact',
    links: [
      { text: 'customer@atomeocean.com', href: 'mailto:customer@atomeocean.com' },
      { text: 'GitHub', href: 'https://github.com/atomeocean/job-compass', external: true },
      { text: 'YouTube', href: 'https://www.youtube.com/@atomeocean', external: true },
      { text: 'X', href: 'https://x.com/atomeocean', external: true },
    ],
  },
]

/** 基座行的法务链接 */
export const FOOTER_LEGAL: readonly FooterLink[] = [
  { text: 'Privacy Policy', href: '/en/guide/privacy-policy.html' },
  { text: 'Terms of Use', href: '/en/guide/terms-of-use.html' },
  {
    text: 'Anti-fraud statement',
    href: 'https://logbook.atomeocean.com/en/about-us/legal-credentials/anti-visa-fraud-statement.html',
    external: true,
  },
]

/**
 * 只有英文版、没有中文对应页的路径（不带 .html）。页脚的「中文」在这些页面上回中文首页，
 * 其余英文页去掉 /en 前缀就是中文对应页。
 */
export const EN_ONLY_PATHS: ReadonlySet<string> = new Set([
  '/en/guide/about',
  '/en/guide/privacy-policy',
  '/en/guide/terms-of-use',
])
