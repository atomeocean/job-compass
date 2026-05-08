import type { Contributor } from '../types';
import { wechatIconSvg } from '../assets/svg/icon-svg';

// 配置常量
const CONFIG = {
  baseAvatarUrl: 'https://atomeocean.cn/contributor-avatar/',
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

// 抽取社交链接的重复部分
const SOCIAL_LINKS = {
  github: (username: string) => `https://github.com/${username}`,
  linkedin: (profile: string) => `https://www.linkedin.com/in/${profile}/`,
} as const;

// 头像映射 - 按类型分组
const AVATARS = {
  // 自定义头像
  custom: {
    bojian: createTransparentImageUrl('1733688898896OWxCKG.webp'),
    colton: createTransparentImageUrl('2024%2012%2010HejwgY.webp'),
    dong: createTransparentImageUrl('2024%2012%2010xjZznz.webp'),
    hanyu: createTransparentImageUrl('2024%2012%2011gEwzwU.webp'),
    kan: createTransparentImageUrl('2024%2012%2011O63nGE.webp'),
    kairui: createTransparentImageUrl('2024%2012%2011nl0IIB.webp'),
    sarah: createTransparentImageUrl('1733689178757gY5XCe.webp'),
  },
  // 标准头像文件
  standard: {
    icho: 'icho-c-1718674796891.jpeg',
    jack: 'atomeocean-jack-avatar.webp',
    jiaqiM: 'jiaqi-m-1643255934632.webp',
    junming: 'junming-w-1669263049522.jpeg',
    mark: 'yunqiao-c-1680409444439.jpeg',
    matthewMa: 'matthew-ma-avatar-162120241.webp',
    meimei: 'meimei-z-1716062173318.jpeg',
    nora: 'nora-r-1676860785162.jpeg',
    patricia: 'yunhe-l-1681166636013.jpeg',
    vicky: 'jiaqi-z-1690831788315.jpeg',
    xiongchang: 'xiongchang-l-1729988926497.jpeg',
    xucheng: 'xucheng-w-avatar-12051205.webp',
    yining: 'yining-w-8564254687616545.webp',
    zheng: 'zheng-f-1720891325466.jpeg',
    zijian: 'zijian-x-1664983914608.jpeg',
    zuchuan: 'zuchuan-l-1730162058954.jpeg',
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
    if (/^https?:\/\//.test(avatar)) {
      return avatar;
    }
    // 处理自定义头像
    if (AVATARS.custom[avatar as keyof typeof AVATARS.custom]) {
      return AVATARS.custom[avatar as keyof typeof AVATARS.custom];
    }
    // 拼接标准头像URL
    if (AVATARS.standard[avatar as keyof typeof AVATARS.standard]) {
      return createAvatarUrl(AVATARS.standard[avatar as keyof typeof AVATARS.standard]);
    }
    return createAvatarUrl(avatar);
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
    avatar: 'bojian',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('bojianwangny') },
    ],
  },
  {
    name: 'Jack',
    username: 'k90zz',
    mapByNameAliases: ['atomeocean jack6', 'jack6'],
    avatar: 'jack',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('k90zz') },
    ],
  },
  {
    name: 'Bella',
    username: 'BellaZ0317',
    title: 'Software Engineer',
    desc: 'work in PA',
    mapByNameAliases: ['Bella Zhong'],
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('BellaZ0317') },
    ],
  },
  {
    name: 'Colton',
    username: 'tengtianxiang',
    mapByNameAliases: ['Colton Teng'],
    avatar: 'colton',
    title: 'Product Manager',
    desc: 'work in nyc',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('tengtianxiang') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('colton-teng-916419265') },
      { type: 'wechat', icon: { svg: wechatIconSvg }, link: 'https://logbook.atomeocean.com/about-us/contact.html#colton' },
    ],
  },
  {
    name: 'Han',
    username: 'MHeartSutra',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('MHeartSutra') },
    ],
  },
  {
    name: 'Mark',
    username: 'nepalter',
    avatar: 'mark',
    title: 'Developer',
    desc: 'work in Oregon',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('nepalter') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('yunqiao-cai-51b4bb135') },
    ],
  },
  {
    name: 'Sung',
    username: 'Zzzsbbb',
    title: 'Software Engineer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('Zzzsbbb') },
    ],
  },
  {
    name: 'Sarah',
    username: 'sarahsalad',
    avatar: 'sarah',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('sarahsalad') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('siheng-yu-5607a2138') },
    ],
  },
  {
    name: 'Yining',
    username: 'yining1215',
    avatar: 'yining',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('yining1215') },
    ],
  },
  {
    name: 'Shuangshuang',
    username: 'sxiao23',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('sxiao23') },
    ],
  },
  {
    name: 'Oliver',
    username: 'olivertang40',
    title: 'Developer',
    desc: 'work in Texas',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('olivertang40') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('oliver40') },
    ],
  },
  {
    name: 'Haoyu',
    username: 'vacantfury',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('vacantfury') },
    ],
  },
  {
    name: 'Kan',
    username: 'KanZhou0412',
    avatar: 'kan',
    title: 'Developer',
    desc: '工作地点：新泽西',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('KanZhou0412') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('kan-karen-zhou') },
    ],
  },
  {
    name: 'Leo',
    username: 'orochileo',
    avatar: 'zuchuan',
    title: 'Developer',
    desc: 'work in California',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('orochileo') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('zuchuan-liao') },
    ],
  },
  {
    name: 'Xiongchang',
    username: 'liu-xiongchang',
    avatar: 'xiongchang',
    title: 'Developer',
    desc: 'work in Maryland',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('liu-xiongchang') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('xiongchang-liu-825238252') },
    ],
  },
  {
    name: 'Xucheng(Shawn)',
    username: 'fakeple',
    avatar: 'xucheng',
    title: 'Developer',
    desc: 'work in Washington',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('fakeple') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('xucheng-wang-732a97262') },
    ],
  },
  {
    name: 'Dong',
    username: 'DongHuang7',
    avatar: 'dong',
    title: 'Developer',
    desc: 'work in Texas',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('DongHuang7') },
    ],
  },
  {
    name: 'Hanyu',
    avatar: 'hanyu',
    links: [
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('hanyu-wang-89206b21b') },
    ],
  },
  {
    name: 'Icho',
    avatar: 'icho',
    title: 'Data analyst',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('icho2021') },
      { type: 'linkedin', icon: 'linkedin', link: 'https://www.linkedin.com/in/ichochoi/' },
    ],
  },
  {
    name: 'Dr Travis',
    username: 'ckc035',
    avatar: 'https://www.github.com/ckc035.png',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('ckc035') },
    ],
  },
  {
    name: 'Kairui Yin',
    username: 'KyrieYin',
    avatar: 'kairui',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('KyrieYin') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('kairuiyin') },
    ],
  },
  {
    name: 'Nora',
    username: 'NoraRen0523',
    avatar: 'nora',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('NoraRen0523') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('xue-r-05286a1b5') },
    ],
  },
  {
    name: 'Patricia',
    username: 'Patricia011004',
    avatar: 'https://www.github.com/Patricia011004.png',
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('Patricia011004') },
    ],
  },
  {
    name: 'Junming',
    username: 'junwu168',
    avatar: 'junming',
    title: 'Developer',
    org: 'UIUC',
    orgLink: 'https://illinois.edu/',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('junwu168') },
    ],
  },
  {
    name: 'Jiaqi',
    username: 'jiaqima1110',
    avatar: 'jiaqiM',
    title: 'Developer',
    desc: 'Fight On!',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('jiaqima1110') },
    ],
  },
  {
    name: 'Vicky',
    avatar: 'vicky',
    title: 'Data analyst',
    desc: 'North Carolina',
    links: [
      { type: 'linkedin', icon: 'linkedin', link: 'https://www.linkedin.com/in/jiaqi-vicky-zhang/' },
    ],
  },
  {
    name: 'Matthew Ma',
    username: 'matthewmavp',
    avatar: 'matthewMa',
    desc: '这是一段难忘的旅程',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('matthewmavp') },
    ],
  },
  {
    name: 'Xuanwei',
    username: 'winkywong1998',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('winkywong1998') },
    ],
  },
  {
    name: 'copilot',
    username: 'Copilot',
    links: [
      { type: 'github', icon: 'github', link: CONFIG.defaultOrgLink }
    ]
  },
].map((contributor: Contributor) => ({
  ...contributor,
  avatar: getAvatarUrl(contributor),
  title: contributor.title || CONFIG.defaultTitle.contributor,
  org: contributor.org || CONFIG.defaultOrg,
  orgLink: contributor.orgLink || CONFIG.defaultOrgLink,
}));
