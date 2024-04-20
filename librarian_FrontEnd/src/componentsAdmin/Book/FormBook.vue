<script>
    import * as yup from "yup";
    import {Form, Field, ErrorMessage} from 'vee-validate';

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props:{
            Book: {type: Object, required: true},
        },
        emits: ['submit:book', 'delete:book'],
        data(){
            const bookFormSchema = yup.object().shape({
                tenSach: yup 
                    .string()
                    .required('Vui lòng nhập tên sách'),
                MoTa: yup 
                    .string()
                    .required('Vui lòng nhập mô tả sách'),
                namXuatban: yup 
                    .string()
                    .required('Vui lòng nhập năm xuất bản sách'),
                phi: yup 
                    .number()
                    .required('Vui lòng nhập phí sách'),
                idTheLoai:yup 
                    .number()
                    .required('Vui lòng nhập mã thể loại cho sách'),
                idNXB: yup
                    .number()
                    .required('Vui lòng nhập mã nhà xuất bản cho sách'),
                IDtacgia: yup
                    .number()
                    .required('Vui lòng nhập mã tác giả cho sách'),
                hinh:yup
                    .string(),
            });
            return{
                bookLocal: this.Book,
                bookFormSchema,
            };
        },
        methods:{
            submitBook(){
                this.$emit('submit:book', this.bookLocal);
            },
            deleteBook(){
                this.$emit('delete:book', this.bookLocal.id)
            }
        }
    }
</script>

<template>
    <Form
        @submit="submitBook"
        :validation-schema="bookFormSchema"
    >
        <div class="form-group">
            <label for="tenSach" class="TieuDeONhap">Tên sách</label>
            <Field name="tenSach" type="text" class="form-control" v-model="bookLocal.tenSach" />
            <ErrorMessage name="tenSach" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="MoTa" class="TieuDeONhap">Mô tả</label>
            <Field name="MoTa" type="text" class="form-control" v-model="bookLocal.MoTa" />
            <ErrorMessage name="MoTa" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="namXuatban" class="TieuDeONhap">Năm xuất bản</label>
            <Field name="namXuatban" type="text" class="form-control" v-model="bookLocal.namXuatban" />
            <ErrorMessage name="namXuatban" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="phi" class="TieuDeONhap">Giá sách</label>
            <Field name="phi" type="text" class="form-control" v-model="bookLocal.phi" />
            <ErrorMessage name="phi" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="idNXB" class="TieuDeONhap">Mã thể nhà xuất bản</label>
            <Field name="idNXB" type="text" class="form-control" v-model="bookLocal.idNXB" />
            <ErrorMessage name="idNXB" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="idTheLoai" class="TieuDeONhap">Mã thể loại sách</label>
            <Field name="idTheLoai" type="text" class="form-control" v-model="bookLocal.idTheLoai" />
            <ErrorMessage name="idTheLoai" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="IDtacgia" class="TieuDeONhap">Mã thể tác giả</label>
            <Field name="IDtacgia" type="text" class="form-control" v-model="bookLocal.IDtacgia" />
            <ErrorMessage name="IDtacgia" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="hinh" class="TieuDeONhap">Hình ảnh</label>
            <Field name="hinh" type="text" class="form-control" v-model="bookLocal.hinh" />
            <ErrorMessage name="hinh" class="error-feedback"/>
        </div>
        <div class="form-group">
            <button 
                type="submit" 
                class="btn btn-primary NutBamTronPhanDangKy"
            >
                Thêm
            </button>
            <button v-if="bookLocal.idSach" type="button"
                class="ml-2 btn btn-danger" @click="deleteBook"
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