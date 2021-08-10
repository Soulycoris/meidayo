import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import "element-plus/packages/theme-chalk/src/base.scss";

import { ElButton, ElSelect, ElOption, ElForm, ElFormItem, ElInput } from "element-plus";

const components = [ElButton, ElSelect, ElOption, ElForm, ElFormItem, ElInput];

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router);
app.mount("#app");
