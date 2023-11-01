import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// svg插件需要配置代码
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

// 引入element-plus组件与样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 配置ElementPlus国际化
// @ts-ignore ts忽略检查
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import VueResizeObserver from "vue-resize-observer";

// 全局样式
import "@/styles/index.scss";

// 获取app实例对象
const app = createApp(App);

// 安装ElementPlus插件
app.use(ElementPlus, {
  locale: zhCn,
});

// 将SvgIcon组成为全局组件
app.component("SvgIcon", SvgIcon);

const pinia = createPinia();

createApp(App).use(ElementPlus).use(pinia).use(router).use(VueResizeObserver).mount("#app");
