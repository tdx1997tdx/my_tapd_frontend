import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus"; // 引入element-plus
import "element-plus/lib/theme-chalk/index.css"; // 引入element-plus的样式


const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");