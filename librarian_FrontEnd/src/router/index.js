import { createWebHashHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import home from "@/views/home.vue";
import login from "@/views/login.vue";
import rigister from "@/views/rigister.vue";

const routes = [
    //Home
    {
        path: "/",
        name: "Home",
        component: home,
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
    }

];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;