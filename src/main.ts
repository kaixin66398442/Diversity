import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// svg插件需要配置代码
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

// 全局样式
import '@/styles/index.scss'

// 获取app实例对象
const app = createApp(App);

// 将SvgIcon组成为全局组件
app.component("SvgIcon", SvgIcon);

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
