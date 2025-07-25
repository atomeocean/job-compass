/**
 * name：在页面中展示的作者名称
 * username：相关联的github用户名
 * mapByNameAliases：使用的git名称列表，可对列表中的名称一一匹配
 * avatar：头像链接
 * links：profile跳转链接（可添加多个跳转链接，但贡献者列表只会默认选择第一个链接进行跳转）
 */
export const contributors = [
  // Ai助手
  {
    name: 'Copilot',
    username: 'Copilot',
    avatar: 'https://atomeocean.cn/contributor-avatar/default-contributor-avatar.webp',
    links: [
      { type: '', icon: 'github', link: 'https://github.com/atomeocean' }
    ]
  },

  // 贡献者名单
  {
    name: 'Bojian',
    username: 'bojianwangny',
    mapByNameAliases: ['Bojian Wang'],
  },
  {
    name: 'Jack',
    username: 'k90zz',
    mapByNameAliases: ['atomeocean jack6', 'jack6'],
  },
  {
    name: 'Bella Zhong',
    username: 'BellaZ0317',
  },
  {
    name: 'Colton',
    username: 'tengtianxiang',
  },
  {
    name: 'Han',
    username: 'MHeartSutra',
  },
  {
    name: 'Mark',
    username: 'nepalter',
  },
]