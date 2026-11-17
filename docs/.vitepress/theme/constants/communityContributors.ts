import type { Contributor } from '../../../types/contributors'

// 社区贡献者：不是团队成员，所以不在 CI 同步的 docs/_data/contributors.ts 里，也不进团队页。
// 不登记的话，作者栏只能拿 git 邮箱去查 gravatar，查不到就显示默认头像。
// name 写 git 提交用的名字；git 名字和 GitHub 用户名不一样时，把 git 名字写进 mapByNameAliases。
const communityContributor = (username: string, extra: Partial<Contributor> = {}): Contributor => ({
  name: username,
  username,
  avatar: `https://github.com/${username}.png`,
  links: [{ type: 'github', icon: 'github', link: `https://github.com/${username}` }],
  ...extra,
})

export const communityContributors: Contributor[] = [
  communityContributor('hsi-hung', { mapByEmailAliases: ['hsihung98@gmail.com'] }),
]
