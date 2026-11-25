import DefaultTheme from 'vitepress/theme';
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'
import './style/brand-colors.css'
import StaffingCompanyTable from "./components/StaffingCompanyTable.vue";
import DirectoryOverview from "./components/DirectoryOverview.vue";
import JobPostingTable from "./components/JobPostingTable.vue";
import DirectHireCompanyTable from "./components/DirectHireCompanyTable.vue";
import ReferenceSource from "./components/ReferenceSource.vue";
import DocTitleMeta from "./components/siteStatistic/DocTitleMeta.vue";
import Giscus from "@ao-components/Giscus";
import InterviewDetail from "./components/InterviewDetail.vue";
import { h } from 'vue';
import {
  InjectionKey,
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import ContributorWrapper from "./components/ContributorWrapper.vue";
import {
  NolebaseInlineLinkPreviewPlugin
} from "@nolebase/vitepress-plugin-inline-link-preview/client";
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css';
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import RelatedArticles from "@ao-components/RelatedArticles.vue";
import OriginalStatement from "@ao-components/OriginalStatement.vue";
import InterviewBreadcrumb from "@ao-components/InterviewBreadcrumb.vue";
import InterviewAsideCard from "@ao-components/InterviewAsideCard.vue";
import InterviewDocFooter from "@ao-components/InterviewDocFooter.vue";
import SiteFooter from "@ao-components/SiteFooter.vue";
import TranslatePageNotice from "@ao-components/i18n/TranslatePageNotice.vue";
import { useRoute } from 'vitepress'
import { parseMissingTranslation } from "@ao-utils/translatePath";

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件：只放大量页面都在用的组件。只有少数页面用的组件（ImageWrapper、VideoLinks、
    // DirectoryTree、JobRecruiterInformation、InterviewExperienceList 等）由页面自己的 <script setup> 引入，不进主题包
    app.component("DirectoryOverview", DirectoryOverview);
    app.component("JobPostingTable", JobPostingTable);
    app.component("DirectHireCompanyTable", DirectHireCompanyTable);
    app.component("StaffingCompanyTable", StaffingCompanyTable);
    app.component("ReferenceSource", ReferenceSource);
    app.component("DocTitleMeta", DocTitleMeta);
    app.component("InterviewDetail", InterviewDetail);
    app.use(NolebaseGitChangelogPlugin);

    // 隐藏贡献者标题
    app.provide(InjectionKey, {
      hideContributorsHeader: true
    });

    // 注册 ElementPlus
    app.use(ElementPlus);
    // SSR 时 Element Plus 要求注入 id 生成器，否则服务端和客户端生成的 id 不一致，hydration 会对不上。
    // VitePress 每渲染一个页面都会重新调用 enhanceApp，所以计数器在每页都从 0 开始，和浏览器端一致
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 });

    app.use(NolebaseInlineLinkPreviewPlugin);
    // 注册所有图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    // 在项目路由切换后，向busuanzi后台发送请求，增加访问计数
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
  Layout: () => {
    const route = useRoute()
    return h(DefaultTheme.Layout, null, {
      // /en/、/es/、/fr/ 下缺页时显示「本页尚未翻译」并引导提交译文；其他 404 返回 null，回落到默认 NotFound。
      // route.path 在插槽函数里读取，路由变化时只重渲染 VPContent
      'not-found': () => parseMissingTranslation(route.path) ? h(TranslatePageNotice) : null,
      // 面经相关的三个组件只在面经文章页渲染，其他页面输出为空
      'doc-before': () => [h(InterviewBreadcrumb), h(ContributorWrapper)],
      'aside-top': () => h(InterviewAsideCard),
      'doc-footer-before': () => [h(InterviewDocFooter), h(OriginalStatement), h(RelatedArticles)],
      'doc-after': () => h(Giscus),
      // 英文页脚，中文页不渲染
      'layout-bottom': () => h(SiteFooter)
    })
  },
};
