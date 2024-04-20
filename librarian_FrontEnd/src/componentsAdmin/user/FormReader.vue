<script>
    import * as yup from "yup";
    import {Form, Field, ErrorMessage} from 'vee-validate';

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props:{
            user: {type: Object, required: true},
        },
        emits: ['submit:user', 'delete:user'],
        data(){
            const userFormSchema = yup.object().shape({
                hoTen: yup 
                    .string()
                    .required('Vui lòng nhập họ tên cho đọc giả'),
                gioiTinh: yup 
                    .number()
                    .required('Vui lòng điền giới tính'),
                ngaySinh: yup 
                    .date()
                    .required('Vui lòng nhập ngày sinh'),
                SDT: yup 
                    .number()
                    .required('Vui lòng nhập số điện thoại'),
                Email:yup 
                    .string()
                    .required('Vui lòng nhập email'),
                DiaChi: yup
                    .string()
                    .required('Vui lòng nhập địa chỉ'),
                password: yup
                    .string()
                    .required('Vui lòng nhập mật khẩu cho đọc giả'),
            });
            return{
                userLocal: this.user,
                userFormSchema,
            };
        },
        methods:{
            submituser(){
                this.$emit('submit:user', this.userLocal);
            },
            deleteuser(){
                this.$emit('delete:user', this.userLocal.id)
            }
        }
    }
</script>

<template>
    <Form
        @submit="submituser"
        :validation-schema="userFormSchema"
    >
        <div class="form-group">
            <label for="hoTen" class="TieuDeONhap">Họ tên</label>
            <Field name="hoTen" type="text" class="form-control" v-model="userLocal.hoTen" />
            <ErrorMessage name="hoTen" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="gioiTinh" class="TieuDeONhap">Giới tính</label>
            <div class="form-check">
                <label class="form-check-label">
                    <Field class="form-check-input" name="gioiTinh" type="radio" value="1"  v-model="userLocal.gioiTinh" /> Nam
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <Field class="form-check-input" name="gioiTinh" type="radio" value="0"  v-model="userLocal.gioiTinh" /> Nữ
                </label>
            </div>
            <ErrorMessage name="gioiTinh" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="ngaySinh" class="TieuDeONhap">Ngày sinh</label>
            <Field name="ngaySinh" type="date" class="form-control" v-model="userLocal.ngaySinh" />
            <ErrorMessage name="ngaySinh" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="SDT" class="TieuDeONhap">Số điện thoại</label>
            <Field name="SDT" type="tel" class="form-control" v-model="userLocal.SDT" />
            <ErrorMessage name="SDT" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="Email" class="TieuDeONhap">Email</label>
            <Field name="Email" type="text" class="form-control" v-model="userLocal.Email" />
            <ErrorMessage name="Email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="DiaChi" class="TieuDeONhap">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control" v-model="userLocal.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="password" class="TieuDeONhap">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
            <button 
                type="submit" 
                class="btn btn-primary NutBamTronPhanDangKy"
            >
                Thêm
            </button>
            <button v-if="userLocal.idNhanVien" type="button"
                class="ml-2 btn btn-danger" @click="deleteuser"
            >
                Xóa
            </button>
            <button type="button" class="btn btn-secondary NutBamTronPhanDangKy">
                <router-link to="/adminhome" class="VeTrangChu">
                    Về trang chủ
                </router-link>
            </button>
        </div>
    </Form>
</template>

<style>
    .TieuDeONhap{
        font-size: 1.25em;
        font-weight: bold;
    }
</style>