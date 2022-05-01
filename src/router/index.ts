import {createRouter, createWebHashHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import Regist from "../components/Regist.vue";
import Login from "../components/Login.vue";


const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        component: HomeView
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
        redirect: "/login/loginItem",
        children: [
            {
                title: "登录组件",
                path: "loginItem",
                component: Login
            },
            {
                title: "注册组件",
                path: "registItem",
                component: Regist
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
