<script>
    import createApiClient from '../services/api.service';
    import Swal from 'sweetalert2';
    import FormDangNhap from '../components/FormDangNhap.vue';

    class DangNhap{
        constructor(baseURL = "http://localhost:3001"){
            this.api = createApiClient(baseURL);
        }
        async ThucHienDangNhap(data){
            return (await this.api.post('/login',data)).data;
        }
    };

    export default {
        components:{
            FormDangNhap,
        },
        data(){
            return{
                thongTinDangNhap:{
                    account:"",
                    password:"",
                },
            };
        },
        methods:{
            async LoginToAccount(thongTinDangNhap){
                try {
                    //Thực hiện đăng nhập
                    let nguoidung = await new DangNhap().ThucHienDangNhap(thongTinDangNhap);
                    console.log(nguoidung)

                    //Kiểm tra tính hợp lệ người dùng
                    if(nguoidung){
                        //Lưu thông tin đăng nhập
                        sessionStorage.setItem('id', parseInt(nguoidung.ID));
                        sessionStorage.setItem('email', toString(nguoidung.user));
                        sessionStorage.setItem('role', parseInt(nguoidung.role));

                        //Admin
                        if(nguoidung.role == "0"){
                            console.log('Tài khoản Admin');
                            console.log("cookie:", nguoidung.user )
                            console.log("email:",  sessionStorage.getItem('email') ) //Email
                            console.log("id:",  sessionStorage.getItem('id') )
                            console.log("role:",  sessionStorage.getItem('role') )
                            window.location.pathname='/adminhome';
                            this.$router.push('/adminhome');
                        
                        }
                        //Nhân viên
                        else if(nguoidung.role == "1"){
                            console.log('Tài khoản nhân viên');
                        }
                        // Người dùng
                        else if(nguoidung.role == "2"){
                            console.log('Tài khoản người dùng');
                            console.log("cookie:", nguoidung.user )
                            console.log("email:",  sessionStorage.getItem('email') ) //Email
                            console.log("id:",  sessionStorage.getItem('id') )
                            console.log("role:",  sessionStorage.getItem('role') )
                            window.location.pathname='/';
                            this.$router.push('/');
                        }
                    }else{
                        console.log(nguoidung)
                        Swal.fire({
                            title: "Đăng nhập thất bại",
                            text: "Hãy kiểm tra lại mật khẩu hoặc email đăng nhập",
                            icon: "error"
                        });
                    }
                }catch(err){
                    //Tài khoản không hợp lệ
                    console.log(err);
                    Swal.fire({
                        title: "Đăng nhập thất bại",
                        text: "Hãy kiểm tra lại mật khẩu hoặc email đăng nhập",
                        icon: "error"
                    });
                }
            }
        },
    };
</script>

<template>
    <div v-if="thongTinDangNhap">
        <FormDangNhap
            :loginInformarion="thongTinDangNhap"
            @submit:loginInformarion="LoginToAccount"
        />
    </div>
</template>