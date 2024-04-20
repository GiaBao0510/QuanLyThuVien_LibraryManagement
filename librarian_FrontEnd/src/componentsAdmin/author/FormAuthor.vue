<script>
    import * as yup from "yup";
    import {Form, Field, ErrorMessage} from 'vee-validate';

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props:{
            author: {type: Object, required: true},
        },
        emits: ['submit:author', 'delete:author'],
        data(){
            const authorFormSchema = yup.object().shape({
                hoTen: yup 
                    .string()
                    .required('Vui lòng nhập họ tên cho tác giả'),
                gioiTinh: yup 
                    .number()
                    .required('Vui lòng điền giới tính'),
                ngaySinh: yup 
                    .date()
                    .required('Vui lòng nhập ngày sinh'),
                DiaChi: yup
                    .string()
                    .required('Vui lòng nhập địa chỉ'),
            });
            return{
                authorLocal: this.author,
                authorFormSchema,
            };
        },
        methods:{
            submitauthor(){
                this.$emit('submit:author', this.authorLocal);
            },
            deleteauthor(){
                this.$emit('delete:author', this.authorLocal.id)
            }
        }
    }
</script>

<template>
    <Form
        @submit="submitauthor"
        :validation-schema="authorFormSchema"
    >
        <div class="form-group">
            <label for="hoTen" class="TieuDeONhap">Họ tên</label>
            <Field name="hoTen" type="text" class="form-control" v-model="authorLocal.hoTen" />
            <ErrorMessage name="hoTen" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="gioiTinh" class="TieuDeONhap">Giới tính</label>
            <div class="form-check">
                <label class="form-check-label">
                    <Field class="form-check-input" name="gioiTinh" type="radio" value="1"  v-model="authorLocal.gioiTinh" /> Nam
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <Field class="form-check-input" name="gioiTinh" type="radio" value="0"  v-model="authorLocal.gioiTinh" /> Nữ
                </label>
            </div>
            <ErrorMessage name="gioiTinh" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="ngaySinh" class="TieuDeONhap">Ngày sinh</label>
            <Field name="ngaySinh" type="date" class="form-control" v-model="authorLocal.ngaySinh" />
            <ErrorMessage name="ngaySinh" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="DiaChi" class="TieuDeONhap">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control" v-model="authorLocal.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback"/>
        </div>
        <div class="form-group">
            <button 
                type="submit" 
                class="btn btn-primary NutBamTronPhanDangKy"
            >
                Thêm
            </button>
            <button v-if="authorLocal.idNhanVien" type="button"
                class="ml-2 btn btn-danger" @click="deleteauthor"
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