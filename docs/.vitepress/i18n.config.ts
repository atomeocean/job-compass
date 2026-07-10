import {VitePressI18nOptions} from "vitepress-i18n/types";

// 默认语言为简体中文
const defaultLocale: string = 'zhHans';
const supportLocales: string[] = [defaultLocale, 'en'];

export const vitePressI18nOptions : VitePressI18nOptions = {
  locales: supportLocales, // support locales
  rootLocale: defaultLocale, // default locale
  label: {
    default: '中文',
    en: 'English',
  },
  searchProvider: 'local',
  themeConfig: {
    // 根据不同语言配置不同的导航栏
    en: {
      nav: [
        {
          text: 'Atomeocean Products',
          items: [
            { text: 'Atomeocean', link: 'https://atomeocean.com' },
            { text: 'Cruise', link: 'https://cruise.atomeocean.com'}
          ]
        },
        {
          text: 'Resource',
          items: [
            { text: 'Meet our team', link: '/team-information/team.md' },
          ]
        }
      ],
      editLink: {
        pattern: 'https://github.com/atomeocean/job-compass/edit/main/docs/:path',
        text: 'Propose a Change'
      },
      // https://vitepress.dev/reference/default-theme-config#lastupdated
      lastUpdated: {
        text: 'Updated at',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'short'
        }
      },
    },
    zhHans: {
      nav: [
        {
          text: '指南',
          items: [
            { text: '整体指南', link: '/guide/overview.md' },
            { text: '项目开发参与指南', link: '/guide/participation-guide.md' },
            { text: '任务指南', link: '/guide/task-guide.md' },
            { text: '贡献指南', link: '/guide/contribution-guide/index.md' },
            { text: '面试经验贡献指南', link: '/guide/interview-experience-utils/contributing.md' },
            { text: 'GitHub网页发布PR指南', link: '/guide/github-pull-request-guide.md' },
          ]
        },
        {
          text: '资源',
          items: [
            { text: '鸣谢', link: '/guide/team.md' },
            { text: '主站', link: 'https://atomeocean.com' },
            { text: 'Cruise', link: 'https://cruise.atomeocean.com'}
          ]
        }
      ],
      editLink: {
        pattern: 'https://github.com/atomeocean/job-compass/edit/main/docs/:path',
        text: '提出问题或修改建议'
      },
      // https://vitepress.dev/reference/default-theme-config#lastupdated
      lastUpdated: {
        text: '更新于',
        formatOptions: {
          dateStyle: 'short',
          timeStyle: 'short'
        }
      },
    },
  }
};