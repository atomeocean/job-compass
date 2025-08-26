import DefaultTheme from 'vitepress/theme';
import ImageWrapper from './components/ImageWrapper.vue';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'
import TimelineComponent from "./components/TimelineComponent.vue";
import StaffingCompanyInformation from "./components/StaffingCompanyInformation.vue";
import StaffingCompanyRecruiterTable from "./components/StaffingCompanyRecruiterTable.vue";
import StaffingCompanyTable from "./components/StaffingCompanyTable.vue";
import DirectoryTree from "./components/DirectoryTree.vue";
import VideoLinks from "./components/VideoLinks.vue";
import JobPostingTable from "./components/JobPostingTable.vue";
import DirectHireCompanyTable from "./components/DirectHireCompanyTable.vue";
import JobRecruiterInformation from "./components/JobRecruiterInformation.vue";
import ReferenceSource from "./components/ReferenceSource.vue";
import PageViewStatistic from "./components/PageViewStatistic.vue";
import Giscus from "./components/Giscus";
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

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('ImageWrapper', ImageWrapper);
    app.component('StaffingCompanyInformation', StaffingCompanyInformation);
    app.component("TimelineComponent", TimelineComponent);
    app.component("StaffingCompanyRecruiterTable", StaffingCompanyRecruiterTable);
    app.component("DirectoryTree", DirectoryTree);
    app.component("VideoLinks", VideoLinks);
    app.component("JobPostingTable", JobPostingTable);
    app.component("DirectHireCompanyTable", DirectHireCompanyTable);
    app.component("StaffingCompanyTable", StaffingCompanyTable);
    app.component("JobRecruiterInformation", JobRecruiterInformation);
    app.component("ReferenceSource", ReferenceSource);
    app.component("PageViewStatistic", PageViewStatistic);
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
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ContributorWrapper),
      'doc-after': () => h(Giscus)
    })
  },
};