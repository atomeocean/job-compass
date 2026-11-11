import DefaultTheme from 'vitepress/theme';
import ImageWrapper from './components/ImageWrapper.vue';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'
import './style/brand-colors.css'
import TimelineComponent from "./components/TimelineComponent.vue";
import StaffingCompanyInformation from "./components/StaffingCompanyInformation.vue";
import StaffingCompanyRecruiterTable from "./components/StaffingCompanyRecruiterTable.vue";
import StaffingCompanyTable from "./components/StaffingCompanyTable.vue";
import DirectoryTree from "./components/DirectoryTree.vue";
import DirectoryOverview from "./components/DirectoryOverview.vue";
import VideoLinks from "./components/VideoLinks.vue";
import JobPostingTable from "./components/JobPostingTable.vue";
import DirectHireCompanyTable from "./components/DirectHireCompanyTable.vue";
import JobRecruiterInformation from "./components/JobRecruiterInformation.vue";
import ReferenceSource from "./components/ReferenceSource.vue";
import SiteViewStatistic from "./components/siteStatistic/SiteViewStatistic.vue";
import DocTitleMeta from "./components/siteStatistic/DocTitleMeta.vue";
import Giscus from "@ao-components/Giscus";
import InterviewDetail from "./components/InterviewDetail.vue";
import InterviewExperienceList from "./components/InterviewExperienceList.vue";
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
    // 注册全局组件
    app.component('ImageWrapper', ImageWrapper);
    app.component('StaffingCompanyInformation', StaffingCompanyInformation);
    app.component("TimelineComponent", TimelineComponent);
    app.component("StaffingCompanyRecruiterTable", StaffingCompanyRecruiterTable);
    app.component("DirectoryTree", DirectoryTree);
    app.component("DirectoryOverview", DirectoryOverview);
    app.component("VideoLinks", VideoLinks);
    app.component("JobPostingTable", JobPostingTable);
    app.component("DirectHireCompanyTable", DirectHireCompanyTable);
    app.component("StaffingCompanyTable", StaffingCompanyTable);
    app.component("JobRecruiterInformation", JobRecruiterInformation);
    app.component("ReferenceSource", ReferenceSource);
    app.component("SiteViewStatistic", SiteViewStatistic);
    app.component("DocTitleMeta", DocTitleMeta);
    app.component("InterviewDetail", InterviewDetail);
    app.component("InterviewExperienceList", InterviewExperienceList);
    app.use(NolebaseGitChangelogPlugin);

    // 隐藏贡献者标题
    app.provide(InjectionKey, {
      hideContributorsHeader: true
    });

    // 注册 ElementPlus
    app.use(ElementPlus);

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
