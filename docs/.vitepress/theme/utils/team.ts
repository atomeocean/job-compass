import type { Contributor } from '../../../types'
import { currentContributors } from '../../../_data/contributors'
import { EMPLOYEE_GITHUB_USERNAMES } from '@ao-constants/teamMembers'

/** 英文页只保留 GitHub 和 LinkedIn：wechat 指向中文联系页 */
const ENGLISH_LINK_TYPES = new Set(['github', 'linkedin'])

/**
 * 员工名单 → VPTeamMembers 用的成员资料，按名单顺序。
 * 名单里的人在 contributors.ts 找不到时跳过并告警，多半是 GitHub 用户名改了。
 */
export const getEmployees = (): Contributor[] =>
  EMPLOYEE_GITHUB_USERNAMES.flatMap((username) => {
    const member = currentContributors.find((contributor) => contributor.username?.toLowerCase() === username)
    if (!member) {
      console.warn(`[team] ${username} 在 constants/teamMembers.ts 里，但 contributors.ts 的 currentContributors 里没有`)
      return []
    }
    // desc 是中文鸣谢页上的随手备注（work in nyc 之类），英文页不显示
    return [{ ...member, desc: undefined, links: member.links?.filter((link) => ENGLISH_LINK_TYPES.has(link.type ?? '')) }]
  })
