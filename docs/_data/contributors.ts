import type { Contributor } from '../types';

// 配置常量
const CONFIG = {
  baseAvatarUrl: 'https://atomeocean.cn/contributor-avatar/',
  defaultAvatarUrl: 'default-contributor-avatar.webp',
  transparentImageBase: 'https://jpqae.atomeocean.com/transparent-image/',
  defaultOrg: 'Atomeocean',
  defaultOrgLink: 'https://github.com/atomeocean',
  defaultTitle: {
    contributor: 'Contributor',
  }
} as const;

// 获取头像工具函数
const createAvatarUrl = (filename: string): string =>
  `${CONFIG.baseAvatarUrl}${filename}`;

// 获取自定义的头像
const createTransparentImageUrl = (filename: string): string =>
  `${CONFIG.transparentImageBase}${filename}`;

// 获取GitHub头像的工具函数
const createGitHubAvatarUrl = (username: string): string =>
  `https://github.com/${username}.png`

// 头像映射 - 按类型分组
const AVATARS = {
  // 自定义头像
  custom: {
    colton: createTransparentImageUrl('2024%2012%2010HejwgY.webp'),
  },
  // 标准头像文件
  standard: {
    jack: 'atomeocean-jack-avatar.webp',
  },
  // Atomeocean默认头像
  default: 'default-contributor-avatar.webp'
} as const;

// 获取头像URL的统一函数
const getAvatarUrl = (contributor: Contributor): string => {
  const { avatar, username } = contributor;
  if (!avatar) {
    // 如果没有avatar属性，使用GitHub头像
    if (username) {
      return createGitHubAvatarUrl(username);
    }
    else {
      // 如果没有username，返回默认头像
      return createAvatarUrl(AVATARS.default);
    }
  }
  else {
    // 处理自定义头像
    if (AVATARS.custom[avatar as keyof typeof AVATARS.custom]) {
      return AVATARS.custom[avatar as keyof typeof AVATARS.custom];
    }
    // 拼接标准头像URL
    if (AVATARS.standard[avatar as keyof typeof AVATARS.standard]) {
      return createAvatarUrl(AVATARS.standard[avatar as keyof typeof AVATARS.standard]);
    }
    return createAvatarUrl(AVATARS.default);
  }
};

/**
 * name：在页面中展示的作者名称
 * username：相关联的github用户名
 * mapByNameAliases：使用的git名称列表，可对列表中的名称一一匹配
 * avatar：头像链接
 * links：profile跳转链接（可添加多个跳转链接，但贡献者列表只会默认选择第一个链接进行跳转）
 */
export const contributors : Contributor[] = [
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
    name: 'Bella',
    username: 'BellaZ0317',
    title: 'Software Engineer',
    desc: 'work in PA',
    mapByNameAliases: ['Bella Zhong'],
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

  // Ai助手
  {
    name: 'copilot',
    username: 'Copilot',
    avatar: 'https://atomeocean.cn/contributor-avatar/default-contributor-avatar.webp',
    links: [
      { type: '', icon: 'github', link: 'https://github.com/atomeocean' }
    ]
  },
].map((contributor: Contributor) => ({
  ...contributor,
  avatar: getAvatarUrl(contributor),
  title: contributor.title || CONFIG.defaultTitle.contributor,
  org: contributor.org || CONFIG.defaultOrg,
  orgLink: contributor.orgLink || CONFIG.defaultOrgLink,
}));