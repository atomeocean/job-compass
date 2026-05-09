import type { Contributor } from '../types';
import { wechatIconSvg } from '../assets/svg/icon-svg';

// 配置常量
const CONFIG = {
  defaultAvatarUrl: 'https://github.com/atomeocean.png',
  defaultOrg: 'Atomeocean',
  defaultOrgLink: 'https://github.com/atomeocean',
  defaultTitle: {
    contributor: 'Contributor',
  }
} as const;

// 获取GitHub头像的工具函数
const createGitHubAvatarUrl = (username: string): string =>
  `https://github.com/${username}.png`

// 抽取社交链接的重复部分
const SOCIAL_LINKS = {
  github: (username: string) => `https://github.com/${username}`,
  linkedin: (profile: string) => `https://www.linkedin.com/in/${profile}/`,
} as const;

// 获取头像URL的统一函数
const getAvatarUrl = (contributor: Contributor): string => {
  const { avatar, username } = contributor;
  if (avatar && /^https?:\/\//.test(avatar)) return avatar;
  if (username) return createGitHubAvatarUrl(username);
  return CONFIG.defaultAvatarUrl;
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
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('bojianwangny') },
    ],
  },
  {
    name: 'Jack',
    username: 'k90zz',
    mapByNameAliases: ['atomeocean jack6', 'jack6'],
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
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('sarahsalad') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('siheng-yu-5607a2138') },
    ],
  },
  {
    name: 'Yining',
    username: 'yining1215',
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
    title: 'Developer',
    desc: 'work in Texas',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('DongHuang7') },
    ],
  },
  {
    name: 'Hanyu',
    links: [
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('hanyu-wang-89206b21b') },
    ],
  },
  {
    name: 'Icho',
    username: 'icho2021',
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
    title: 'Developer',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('KyrieYin') },
      { type: 'linkedin', icon: 'linkedin', link: SOCIAL_LINKS.linkedin('kairuiyin') },
    ],
  },
  {
    name: 'Nora',
    username: 'NoraRen0523',
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
    title: 'Developer',
    desc: 'Fight On!',
    links: [
      { type: 'github', icon: 'github', link: SOCIAL_LINKS.github('jiaqima1110') },
    ],
  },
  {
    name: 'Vicky',
    title: 'Data analyst',
    desc: 'North Carolina',
    links: [
      { type: 'linkedin', icon: 'linkedin', link: 'https://www.linkedin.com/in/jiaqi-vicky-zhang/' },
    ],
  },
  {
    name: 'Matthew Ma',
    username: 'matthewmavp',
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
