import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// svg插件需要配置代码
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

import 'element-plus/dist/index.css'



// 全局样式
import '@/styles/index.scss'

// 获取app实例对象
const app = createApp(App);

// 将SvgIcon组成为全局组件
app.component("SvgIcon", SvgIcon);

const pinia = createPinia();

//全局引入vue-ruler-tool
import VueRulerTool from 'vue-ruler-tool'
//全局注册
app.component('vue-ruler-tool', VueRulerTool)


createApp(App).use(pinia).use(router).mount("#app");
