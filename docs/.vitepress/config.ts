import { defineConfig, UserConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withMermaid } from "vitepress-plugin-mermaid";
import { bilibiliIconSvg } from '../assets/svg/icon-svg'
import { vitePressI18nOptions } from './i18n.config';
import { withI18n } from "vitepress-i18n";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite';
import { allContributors } from "../_data/contributors";
import {
  InlineLinkPreviewElementTransform
} from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import {alias} from "./alias.ts";
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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
  // 代理指令文件，不是站点内容
  excludePattern: ['CLAUDE.md'],
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


const INTERVIEW_SOURCE_TYPES = ['original', 'repost', 'unknown']

/**
 * 读取面经页面的来源类型，供 InterviewDetail 标签和 OriginalStatement 卡片使用。
 * 面经 JSON 的 sourceType 是唯一来源；JSON 缺失、字段缺失或取值不合法都按 unknown 处理（不显示标签和声明）
 * @param filePath - 相对 srcDir 的源文件路径，如 "zhHans/interview-experience/google/12ab56.md"
 * @returns 非面经文章页返回 undefined
 */
const readInterviewSourceType = (srcDir: string, filePath: string): string | undefined => {
  const match = filePath.match(/^zhHans\/interview-experience\/(.+)\.md$/)
  if (!match || /(^|\/)(index|overview)$/.test(match[1])) return undefined

  const jsonPath = join(srcDir, 'assets/json/interview-experience', `${match[1]}.json`)
  if (!existsSync(jsonPath)) {
    console.warn(`[sourceType] ${filePath} 缺少对应的面经 JSON：${jsonPath}`)
    return 'unknown'
  }
  try {
    const { sourceType } = JSON.parse(readFileSync(jsonPath, 'utf-8'))
    return INTERVIEW_SOURCE_TYPES.includes(sourceType) ? sourceType : 'unknown'
  } catch (error) {
    console.warn(`[sourceType] 无法解析 ${jsonPath}：${error}`)
    return 'unknown'
  }
}

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
    }],
    ['script', {
      defer: 'defer',
      src: 'https://cloud.umami.is/script.js',
      'data-website-id': 'f96064e8-353c-4979-9ad0-ad33ffa0060c'
    }]
  ],
  // CLAUDE.md 是给编码代理看的目录级说明，不参与站点构建
  srcExclude: ['**/CLAUDE.md'],
  rewrites: {
    'zhHans/:rest*': ':rest*'
  },
  vite: {
    resolve: {
      alias, // 引入路径别名
    },
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-inline-link-preview/client',
        'vitepress'
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-inline-link-preview',
      ],
    },
    plugins: [
      // 集成git记录插件
      GitChangelog({
        repoURL: () => 'https://github.com/atomeocean/job-compass',
        mapAuthors: allContributors
      }),
      GitChangelogMarkdownSection({
        sections: {
          // 隐藏git历史修改记录和贡献者列表，只在文章上方展示贡献者列表
          disableChangelog: true,
          disableContributors: true,
        },
      }),
    ],
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
  markdown: {
    config: (md) => {
      md.use(InlineLinkPreviewElementTransform)
      // 创建 markdown-it 插件
      md.use((md) => {
        // 在markdown文档渲染时，将页面统计组件拼接到h1标题下
        md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options)
          if (tokens[idx].tag === 'h1') htmlResult += `<DocTitleMeta />`
          return htmlResult
        }
      })
    }
  },
  ignoreDeadLinks: true,
  transformPageData(pageData, { siteConfig }) {
    const sourceType = readInterviewSourceType(siteConfig.srcDir, pageData.filePath)
    if (!sourceType) return
    // 只是把 JSON 的值带进页面数据，方便组件在 SSR 时读取；md frontmatter 里手写的 sourceType 会被覆盖
    pageData.frontmatter.sourceType = sourceType

    const hasReferenceSource = readFileSync(join(siteConfig.srcDir, pageData.filePath), 'utf-8')
      .includes('<ReferenceSource')
    if (sourceType === 'repost' && !hasReferenceSource) {
      console.warn(`[sourceType] ${pageData.filePath} 标为 repost，但正文没有 <ReferenceSource>`)
    }
    if (sourceType === 'original' && hasReferenceSource) {
      console.warn(`[sourceType] ${pageData.filePath} 标为 original，但正文写了 <ReferenceSource>`)
    }
  }
};

export default defineConfig(
  withI18n(
    withMermaid(vitePressConfig),
    vitePressI18nOptions
  ),
);
