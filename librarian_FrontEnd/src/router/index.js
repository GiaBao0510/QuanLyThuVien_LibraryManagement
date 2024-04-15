import { createWebHashHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import home from "@/views/home.vue";
import login from "@/views/login.vue";
import rigister from "@/views/rigister.vue";
import DangKy from "@/views/DangKy.vue";
import homeAdmin from "@/viewsAdmin/home.vue";

const routes = [
    //-----------------------------------------------------
        //User
    //Home
    {
        path: "/",
        name: "Home",
        component: home,
        alias: '/trangchu'
    },

    //Đường dẫn không hợp lệ
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: NotFound,
    },
    
    //Đăng nhập
    {
        path:"/login",
        name:"Longin",
        component: login,
    },

    //Đăng ký tài khoản
    {
        path:"/register",
        name:"Register",
        component: rigister,
    },

    //Đăng ký tài khoản
    {
        path:"/dangky",
        name:"dangky",
        component: DangKy,
    },

    //-----------------------------------------------------
        //Admin
    {
        path:"/adminhome",
        name:"AdminHome",
        component: homeAdmin,
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;