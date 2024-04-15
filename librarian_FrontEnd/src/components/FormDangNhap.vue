<script>
    import * as yup from 'yup';
    import {Form, Field ,ErrorMessage} from 'vee-validate';

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props:{
            loginInformarion:{type: Object, required: true}
        },
        emits: ['submit:loginInformarion'],
        data(){
            const DinhDangPhanDangNhap = yup.object().shape({
                account: yup
                    .string().required('Vui lòng điền vào trường này'),
                password: yup
                    .string().required('Vui lòng điền mật khẩu'),
            });
            return{
                loginInformarionLocal: this.loginInformarion,
                DinhDangPhanDangNhap,
            };
        },
        methods:{
            submitLoginInformation(){
                this.$emit("submit:loginInformarion", this.loginInformarionLocal);
            }
        }
    };
</script>

<template>
    <div class="MauNenDangNhap">
        <div class=" bangDangNhap ">
            <div class="MauDangNhap">
                <h3>Đăng nhập</h3>
                <Form
                    @submit="submitLoginInformation"
                    :validation-schema="DinhDangPhanDangNhap"
                >
                    <div class="form-group">
                        <label for="account" class="TieuDeChuBM">Email</label>
                        <Field name="account" type="text" class="form-control"  v-model="loginInformarionLocal.account"/>
                        <ErrorMessage name="account" class="error-feedback"/>
                    </div>
                    <div class="form-group">
                        <label for="password" class="TieuDeChuBM">Mật khẩu</label>
                        <Field name="password" type="password" class="form-control"  v-model="loginInformarionLocal.password"/>
                        <ErrorMessage name="password" class="error-feedback"/>
                    </div>
                    <div class="form-group">
                        <button 
                            type="submit" 
                            class="btn btn-primary NutBamTronPhanDangKy"
                        >
                            Đăng nhập
                        </button>
                        <p >
                            Bạn chưa có tài khoản?
                            <router-link to="/dangky" class="">
                                Đăng ký
                            </router-link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style>
    .TieuDeChuBM{
        font-family: Arial;
        font-size: 1.15em;
        font-weight: 550;
    }
    .MauDangNhap{
        padding: 5vh 10vh 5vh 10vh;
        background-color: aliceblue;
        border: 1px solid rgb(177, 177, 177);
        border-radius: 5px;
    }
    .bangDangNhap{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .MauNenDangNhap{
        padding: 5vh 0vh 5vh 0vh;
        height: 100vh;
        display: block;
        width: 100vw;
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        z-index: 0;
    }
</style>