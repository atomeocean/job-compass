import {DefaultTheme, defineConfig, UserConfig} from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withMermaid } from "vitepress-plugin-mermaid";
import { bilibiliIconSvg } from '../assets/svg/icon-svg'
import {VitePressI18nOptions} from "vitepress-i18n/types";
import {withI18n} from "vitepress-i18n";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite';

// 默认语言为简体中文
const defaultLocale: string = 'zhHans';
const supportLocales: string[] = [defaultLocale, 'en'];

/**
 * sidebar公共配置
 * [vitepress-sidebar](https://github.com/jooy2/vitepress-sidebar)
 */
const commonSidebarConfig =  {
  debugPrint: true,
  collapsed: false,
  collapseDepth: 1, // 初始情况下 只把根目录的文件夹展开
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
};

const vitePressSidebarOptions = [
  ...supportLocales.map((lang) => {
    return {
      ...commonSidebarConfig,
      documentRootPath: `/docs/${lang}`,
      resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
      ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
    };
  })
];

const vitePressI18nOptions : VitePressI18nOptions = {
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
          text: '产品',
          items: [
            { text: '主站', link: 'https://atomeocean.com' },
            { text: 'Cruise', link: 'https://cruise.atomeocean.com'}
          ]
        },
        {
          text: '资源',
          items: [
            { text: '鸣谢', link: '/team-information/team.md' },
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

// https://vitepress.dev/reference/site-config
const vitePressConfig: UserConfig = {
  title: 'Atomeocean Job Compass',
  description: 'Atomeocean找工作指南',
  head: [
    // google ads
    ['script', {
      async: 'async',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5598390904013681',
      crossorigin: 'anonymous',
    }],
    // Google Analytics job compass
    [
      'script', {
      async: '',
      src: `https://www.googletagmanager.com/gtag/js?id=G-SRCPQ5ZNN8`
    }
    ],
    [
      'script',
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SRCPQ5ZNN8');
      `
    ],
    // Cloudflare Web Analytics
    ['script', {
      defer: 'defer',
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      'data-cf-beacon': '{"token": "dabc2b0ba1a348199ab321006fdcb406"}'
    }]
  ],
  rewrites: {
    'zhHans/:rest*': ':rest*'
  },
  themeConfig: {
    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config#lastupdated
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // https://github.com/jooy2/vitepress-sidebar
    sidebar: generateSidebar(vitePressSidebarOptions),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/atomeocean/job-compass' },
      { icon: 'youtube', link: 'https://www.youtube.com/@atomeocean' },
      { icon: 'x', link: 'https://x.com/atomeocean' },
      { icon:
          {
            svg: bilibiliIconSvg
          },
        link: 'https://space.bilibili.com/12071489'
      }
    ],
    sitemap: {
      hostname: 'https://jobcompass.atomeocean.com/'
    }
  },
  // https://github.com/emersonbottero/vitepress-plugin-mermaid
  mermaid:{
    //mermaidConfig !theme here works for light mode since dark theme is forced in dark mode
  },
  ignoreDeadLinks: true
};

export default defineConfig(
  withI18n(
    withMermaid(vitePressConfig),
    vitePressI18nOptions
  ),
);
