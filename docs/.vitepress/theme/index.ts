import DefaultTheme from 'vitepress/theme';
import ImageWrapper from './components/ImageWrapper.vue';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'
import TimelineComponent from "./components/TimelineComponent.vue";
import StaffingCompanyInformation from "./components/StaffingCompanyInformation.vue";
import StaffingCompanyRecruiterTable from "./components/StaffingCompanyRecruiterTable.vue";
import YoutubeEmbedCard from "./components/YoutubeEmbedCard.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('ImageWrapper', ImageWrapper);
    app.component('StaffingCompanyInformation', StaffingCompanyInformation);
    app.component("TimelineComponent", TimelineComponent);
    app.component("StaffingCompanyRecruiterTable", StaffingCompanyRecruiterTable);
    // app.component("YoutubeEmbedCard", YoutubeEmbedCard);

    // 注册 ElementPlus
    app.use(ElementPlus);
    // 注册所有图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};