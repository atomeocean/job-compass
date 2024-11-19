import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withMermaid } from "vitepress-plugin-mermaid";
import { bilibiliIconSvg } from '../assets/svg/icon-svg'

// https://vitepress.dev/reference/site-config
export default withMermaid(
    defineConfig({
      base: '/',
      title: 'Atomeocean open source template',
      description: 'atomeocean开源项目仓库模板',
      head: [
        // 添加谷歌广告 https://juejin.cn/post/7363078360786370599
        ['script', {
          async: 'async',
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5598390904013681',
          crossorigin: 'anonymous',
        }]
      ],
      themeConfig: {
        logo: '/favicon.ico',
        siteTitle: false,
        search: {
          provider: 'local',
        },
        nav: [
          {
            text: 'Websites',
            items: [
              { text: '主站', link: 'https://atomeocean.com' },
              { text: 'Cruise', link: 'https://cruise.atomeocean.com'}
            ]
          },
        ],

        // https://github.com/jooy2/vitepress-sidebar
        sidebar: generateSidebar({
          documentRootPath: '/docs',
          capitalizeFirst: true, // 用文件命做菜单名字 首字母大写
          collapsed: false,
          collapseDepth: 1, // 初始情况下 只把根目录的文件夹展开
          // 这个配置决定侧边栏是否用文件标题命名
          // useTitleFromFileHeading: true,
        }),
        socialLinks: [
          { icon: 'github', link: 'https://github.com/atomeocean' },
          { icon: 'youtube', link: 'https://www.youtube.com/@atomeocean' },
          { icon: 'x', link: 'https://x.com/atomeocean' },
          { icon:
            {
              svg: bilibiliIconSvg
            },
            link: 'https://space.bilibili.com/12071489'
          }
        ],
      },
      mermaid:{
        //mermaidConfig !theme here works for light mode since dark theme is forced in dark mode
      },
      ignoreDeadLinks: true
    })
);
