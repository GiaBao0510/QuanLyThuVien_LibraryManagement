<script>
    import userService from "@/services/user.service";
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import axios from 'axios';

    export default {
        components:{
            Form,
            Field, 
            ErrorMessage,
        },
        props:{
            acccountUser: {type: Object,required: true}
        },
        emits: ['submit:acccountUser'],
        data(){
            //Ràng buộc đầu vào
            const accountFormSchema = yup.object().shape({
                hoTen: yup
                    .string()
                    .required("Vui lòng điền tên.")
                    .min(3,"Tên ít nhất 3 ký tự")
                    .max(50,"Tên không quá 50 ký tự"),
                gioiTinh: yup
                    .number()
                    .required("Yêu cầu điền giới tính"),
                ngaySinh: yup
                    .date()
                    .required("Vui lòng điền ngày tháng năm sinh"),
                SDT: yup
                    .string()
                    .matches( /((09|03|07|08|05)+([0-9]{8})\b)/g ,"Số điện thoại không hợp lệ"),
                Email: yup
                    .string()
                    .matches( /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ,"Email không hợp lệ"),
                DiaChi:yup
                    .string()
                    .min(5,"Địa chỉ ít nhất phải 10 ký tự"),
                password: yup
                    .string()
                    .required("Vui lòng điền mật khẩu")
                    .min(8, "Mật khẩu ít nhất 8 ký tự")
                    .matches( /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*-+<>?;:])[A-Za-z0-9!@#$%^&*-+<>?;:]{8,}$/ ,"Mật khẩu ít nhất phải 12 ký tự và trong đó có ít nhất có chữ cái hoa, chữ số và ký tự đặt biệt."),
            });
            return{
                accountLocal: this.acccountUser,
                accountFormSchema,
                
            };
        },
        methods:{
            submitAccount(){
                this.$emit("submit:acccountUser", this.accountLocal);
            },
            DangKyTaiKhoan(){
                axios.post('http://localhost:3000/user/register/', this.accountFormSchema)
                    .then(res => {
                        if(res.status === 200){
                            window.alert("Tạo tài khoản thành công")
                            window.location.reload()
                        }else if(res.status === 401){
                            window.alert("Thông tin nhập đã tồn tại")
                            window.location.reload()
                        }else{
                            window.alert("500, Đăng ký thất bại")
                        }
                    })
                    .catch(err => console.log(err))
            }
        },
    };
</script>

<template>
    <div class="MauNen">
        <div class="KhungChuaDangKy ">
            <div class="container p-3 my-3 border MauKhungBieumau">
                <form method="post" @submit.prevent="submitAccount">
                    <h1 class="TieuDeDangKy">Tạo tài khoản</h1>
                    <div class="form-group">
                        <label for="name">Họ tên:</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Nhập họ tên" 
                            id="name"
                            v-model="accountFormSchema.hoTen"
                        />
                    </div>
                    <div class="form-group">Giới tính:</div>
                    <div class="form-check-inline form-group">
                        <label class="form-check-label">
                            <input 
                                type="radio" 
                                class="form-check-input" 
                                name="gender"
                                value="0"
                                v-model="accountFormSchema.gioiTinh"
                            />Nam
                        </label>
                        </div>
                        <div class="form-check-inline">
                        <label class="form-check-label">
                            <input 
                                type="radio" 
                                class="form-check-input" 
                                name="gender"
                                value="0"
                                v-model="accountFormSchema.gioiTinh"
                            >Nữ
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="dateofbirth">Ngày sinh:</label>
                        <input 
                            type="date" 
                            class="form-control" 
                            placeholder="Điền ngày sinh" 
                            id="dateofbirth"
                            v-model="accountFormSchema.ngaySinh"
                        >
                    </div>
                    <div class="form-group">
                        <label for="phone">Số điện thoại:</label>
                        <input 
                            type="tel" 
                            class="form-control" 
                            placeholder="Điền số điện thoại" 
                            id="phone"
                            v-model="accountFormSchema.SDT"
                        >
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            placeholder="Điền email" 
                            id="email"
                            v-model="accountFormSchema.Email"
                        >
                    </div>
                    <div class="form-group">
                        <label for="address">Địa chỉ:</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Điền địa chỉ" 
                            id="address"
                            v-model="accountFormSchema.DiaChi"
                        >
                    </div>
                    <div class="form-group">
                        <label for="pwd">Mật khẩu:</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            placeholder="Điền mật khẩu" 
                            id="pwd"
                            v-model="accountFormSchema.password"
                        >
                    </div>
                    
                    <button 
                        type="submit" 
                        class="btn btn-primary NutBamTronPhanDangKy"
                    >
                        Đăng ký
                    </button>
                    <button type="button" class="btn btn-secondary NutBamTronPhanDangKy">
                        <router-link :to="{name:'Home'}" class="VeTrangChu">
                            Về trang chủ
                        </router-link>
                    </button>
                </form> 
            </div>
        </div>
    </div>
    
</template>

<style>
    .NutBamTronPhanDangKy{
        margin: 3vw 2vw 0 0;
    }
    .VeTrangChu{
        color: white;
    }
    .VeTrangChu:hover{
        color: white;
        background: space;
        text-decoration: none;

    }
    .TieuDeDangKy{
        text-align: center;
    }
    .KhungChuaDangKy{
        margin-top: 5vw;
        display: contents;
        width: 60vw;
        border: 2px solid gray;
        padding: 2vh;
        margin: 4vh 0 4vh 0 ;
        border-radius: 10px;
    }
    .MauKhungBieumau{
        background-image: linear-gradient(135deg, #f5f7fa 0%, #e3e7ee 100%);
    }
    .MauNen{
        padding: 2vh 0 0 0;
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        width: 100vw;
        z-index: 0;
        height: 110vw;
        display: block;
    }
</style>