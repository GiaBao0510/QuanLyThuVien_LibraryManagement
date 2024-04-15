<script>
    import FormDangKy from "../components/FormDangKy.vue";
    import UserRights from "../services/user.service";
    import Swal from "sweetalert2";

    export default {
        components:{
            FormDangKy,
        },
        data(){
            return{
                account:{
                    hoTen:"",
                    gioiTinh: "",
                    ngaySinh: "",
                    SDT: "",
                    Email: "",
                    DiaChi: "",
                    password: ""
                },
            };
        },
        methods:{
            //Thêm thông tin đọc giả
            async CreateAccount(account){
                try{
                    await UserRights.Register(account);
                    Swal.fire({
                        title: "Tạo tài khoản thành công",
                        icon: "success"
                    });
                    location.reload();
                }catch(err){
                    console.log(err);
                }
            }
        },
    };
</script>

<template>
    <div v-if="account" class="">
        <FormDangKy
            :account="account"
            @submit:account="CreateAccount"
        />
    </div>
</template>