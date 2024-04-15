<script>
    import * as yup from 'yup';
    import { Form, Field,  ErrorMessage} from 'vee-validate';

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props:{
            account: {type: Object, required: true}
        },
        emits: ['submit:account'],
        data(){
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
                accountLocal: this.account,
                accountFormSchema,
            };
        },
        methods:{
            submitAccount(){
                this.$emit("submit:account", this.accountLocal);
            }
        }
    };
</script>

<template>
    <div class="MauNen">
        <div class="KhungChuaDangKy ">
            <div class="container p-3 my-3 border MauKhungBieumau">
                <h3>Tạo tài khoản</h3>
                <Form
                    @submit="submitAccount"
                    :validation-schema="accountFormSchema"
                >
                    <div class="form-group">
                        <label for="hoTen" class="TieuDeChuBM">Họ tên</label>
                        <Field name="hoTen" type="text" class="form-control"  v-model="accountLocal.hoTen"/>
                        <ErrorMessage name="hoTen" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <label for="gioiTinh" class="TieuDeChuBM">Giới tính</label>
                        <div class="form-check">
                            <label class="form-check-label">
                                <Field class="form-check-input" name="gioiTinh" type="radio" value="1"  v-model="accountLocal.gioiTinh" /> Nam
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <Field class="form-check-input" name="gioiTinh" type="radio" value="0"  v-model="accountLocal.gioiTinh" /> Nữ
                            </label>
                        </div>
                        <ErrorMessage name="hoTen" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <label for="ngaySinh" class="TieuDeChuBM">Ngày sinh</label>
                        <Field name="ngaySinh" type="date" class="form-control"  v-model="accountLocal.ngaySinh"/>
                        <ErrorMessage name="ngaySinh" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <label for="SDT" class="TieuDeChuBM">Số điện thoại</label>
                        <Field name="SDT" type="tel" class="form-control"  v-model="accountLocal.SDT"/>
                        <ErrorMessage name="SDT" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <label for="Email" class="TieuDeChuBM">Email</label>
                        <Field name="Email" type="email" class="form-control" v-model="accountLocal.Email"/>
                        <ErrorMessage name="Email" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <label for="DiaChi" class="TieuDeChuBM">Địa chỉ</label>
                        <Field name="DiaChi" type="text" class="form-control"  v-model="accountLocal.DiaChi"/>
                        <ErrorMessage name="DiaChi" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <label for="password" class="TieuDeChuBM">Mật khẩu</label>
                        <Field name="password" type="password" class="form-control"  v-model="accountLocal.password"/>
                        <ErrorMessage name="password" class="error-feedback"/>
                    </div>

                    <div class="form-group">
                        <button 
                            type="submit" 
                            class="btn btn-primary NutBamTronPhanDangKy"
                        >
                            Đăng ký
                        </button>
                        <button type="button" class="btn btn-secondary NutBamTronPhanDangKy">
                            <router-link to="/" class="VeTrangChu">
                                Về trang chủ
                            </router-link>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style>
    .NutBamTronPhanDangKy{
        margin: 3vw 2vw 0 0;
    }
    .VeTrangChu{
        font-weight: 550;
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
    .TieuDeChuBM{
        font-family: Arial;
        font-size: 1.15em;
        font-weight: 500;
    }
</style>