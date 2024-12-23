import DefaultTheme from 'vitepress/theme';
import ImageWrapper from './components/ImageWrapper.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('ImageWrapper', ImageWrapper);

    // 注册 ElementPlus
    app.use(ElementPlus);
  },
};