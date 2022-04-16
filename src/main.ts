import "./plugins/axios";
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/axios.js";
import installElementPlus from "./plugins/element";

const app = createApp(App);
app.use(store);
app.use(router);
installElementPlus(app);
app.mount("#app");