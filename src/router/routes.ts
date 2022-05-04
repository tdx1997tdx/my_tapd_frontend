import HomeView from "@/views/HomeView.vue";
import Login from "@/components/Login.vue";
import Regist from "@/components/Regist.vue";
import LoginView from "@/views/LoginView.vue";
import NoteView from "@/views/NoteView.vue";

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        component: HomeView,
        redirect: "/home/note",
        children: [
            {
                title: "日记社区",
                icon: "platform",
                path: "community",
                component: NoteView
            },
            {
                title: "我的日记管理",
                icon: "platform",
                path: "note",
                component: NoteView
            },
            {
                title: "发表日记",
                icon: "list",
                path: "article",
                component: NoteView
            }
        ]
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

export default routes;