// 作者主页统一放在 logbook 站点（docs/zhHans/guide/author-list/<slug>.md），job-compass 本身没有作者主页。
export const LOGBOOK_AUTHOR_PAGE_BASE = 'https://logbook.atomeocean.com/guide/author-list/'

// GitHub username（小写）→ logbook 作者主页 slug，对应 logbook docs/_data/contributors.ts 里的 authorPageSlug。
// logbook 新增作者主页后，在这里补一行，作者栏的头像和名字就会跳转过去。
export const logbookAuthorPageSlugs: Record<string, string> = {
  tengtianxiang: 'colton-t-0821',
  k90zz: 'jack',
  bojianwangny: 'bojian',
  orochileo: 'leo-l-0710',
  nepalter: 'mark',
  bellaz0317: 'bella',
}
