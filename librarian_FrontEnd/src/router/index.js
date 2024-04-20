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
    //0. Trang chủ
    {
        path:"/adminhome",
        name:"AdminHome",
        component: homeAdmin,
    },
        // >> 1.Sách
    //1.1Thêm sách
    {
        path:'/book/add',
        name:"addbook",
        component: () => import('../componentsAdmin/Book/AddBook.vue'),
        props: true,
    },
    //1.2 Sửa thông tin sách
    {
        path:'/book/edit',
        name:"editbook",
        component: () => import('../componentsAdmin/Book/EditBook.vue'),
        props: true,
    },
    //1.3 Chi tiết sách
    {
        path:'/book/details',
        name:"bookdetails",
        component: () => import('../componentsAdmin/Book/BookCard.vue'),
        props: true,
    },
        // >> 2.Nhân viên
    //2.1Thêm nhân viên
    {
        path:'/employee/add',
        name:"addemployee",
        component: () => import('../componentsAdmin/employee/AddEmployee.vue'),
        props: true,
    },
    //2.2 Sửa thông tin nhân viên
    {
        path:'/employee/edit',
        name:"editemployee",
        component: () => import('../componentsAdmin/employee/EditEmployyee.vue'),
        props: true,
    },
    //2.3 Chi tiết nhân viên
    {
        path:'/employee/details',
        name:"employeedetails",
        component: () => import('../componentsAdmin/employee/EmployeeCard.vue'),
        props: true,
    },
            // >> 3.người dùng
    //3.1Thêm người dùng
    {
        path:'/user/add',
        name:"adduser",
        component: () => import('../componentsAdmin/user/AddReader.vue'),
        props: true,
    },
    //3.2 Sửa thông tin người dùng
    {
        path:'/user/edit',
        name:"edituser",
        component: () => import('../componentsAdmin/user/EditReader.vue'),
        props: true,
    },
    //3.3 Chi tiết người dùng
    {
        path:'/user/details',
        name:"userdetails",
        component: () => import('../componentsAdmin/user/ReaderCard.vue'),
        props: true,
    },
        // >> 4.tác giả
    //4.1Thêm người dùng
    {
        path:'/author/add',
        name:"addauthor",
        component: () => import('../componentsAdmin/author/AddAuthor.vue'),
        props: true,
    },
    //4.2 Sửa thông tin tác giả
    {
        path:'/author/edit',
        name:"editauthor",
        component: () => import('../componentsAdmin/author/EditAuthor.vue'),
        props: true,
    },
    //4.3 Chi tiết tác giả
    {
        path:'/author/details',
        name:"authordetails",
        component: () => import('../componentsAdmin/author/AuthorCard.vue'),
        props: true,
    },
        // >> 5. nhà xuất bản
    //5.1Thêm nhà xuất bản
    {
        path:'/publisher/add',
        name:"addpublisher",
        component: () => import('../componentsAdmin/publisher/AddPublisher.vue'),
        props: true,
    },
    //5.2 Sửa thông tin nhà xuất bản
    {
        path:'/publisher/edit',
        name:"editpublisher",
        component: () => import('../componentsAdmin/publisher/EditPublisher.vue'),
        props: true,
    },
    //5.3 Chi tiết nhà xuất bản
    {
        path:'/publisher/details',
        name:"publisherdetails",
        component: () => import('../componentsAdmin/publisher/PublisherCard.vue'),
        props: true,
    }, 
        // >> 6. Mượn sách
    {
        path:'/borrowed/details',
        name:"borroweddetails",
        component: () => import('../componentsAdmin/borrowed/BorrowedDetails.vue'),
        props: true,
    }, 
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;