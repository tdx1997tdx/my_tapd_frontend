import HomeView from "@/views/HomeView.vue";
import Login from "@/components/Login.vue";
import Regist from "@/components/Regist.vue";
import LoginView from "@/views/LoginView.vue";
import WriteNoteView from "@/views/WriteNoteView.vue";
import UpdateNoteView from "@/views/UpdateNoteView.vue";
import NoteView from "@/views/NoteView.vue";
import SeeNoteView from "@/views/SeeNoteView.vue";
import NoteCommunityView from "@/views/NoteCommunityView.vue";
import RecycleBinView from "@/views/RecycleBinView.vue";
import UserView from "@/views/UserView.vue";

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/seeNote",
        name: "seeNote",
        component: SeeNoteView
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
                component: NoteCommunityView
            },
            {
                title: "日记管理",
                icon: "platform",
                path: "note",
                component: NoteView
            },
            {
                title: "发表日记",
                icon: "list",
                path: "article",
                component: WriteNoteView
            },
            {
                title: "修改日记",
                icon: "list",
                path: "updateArticle",
                hidden: true,
                component: UpdateNoteView
            },
            {
                title: "用户管理",
                icon: "list",
                path: "user",
                hidden: true,
                component: UserView
            },
            {
                title: "回收站",
                icon: "list",
                path: "recycleBin",
                component: RecycleBinView
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