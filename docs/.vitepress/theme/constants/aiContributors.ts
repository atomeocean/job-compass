import type { Contributor } from '../../../types/contributors'

// AI 协作者：只参与文章作者行的映射，不进团队页（团队页读 docs/_data/contributors.ts）。
// Claude 各版本的 Co-Authored-By 名字不同，但邮箱都是 noreply@anthropic.com，按邮箱归并成一个作者。
// 头像直接复用 logbook 站点上的同一张图，两边保持一致。
export const aiContributors: Contributor[] = [
  {
    avatar: 'https://logbook.atomeocean.com/assets/svg/author-avatar/claude.svg',
    name: 'Claude',
    username: 'Claude',
    mapByNameAliases: [],
    mapByEmailAliases: ['noreply@anthropic.com'],
    links: [
      { type: '', icon: 'github', link: 'https://claude.com/product/claude-code' },
    ],
  },
]
