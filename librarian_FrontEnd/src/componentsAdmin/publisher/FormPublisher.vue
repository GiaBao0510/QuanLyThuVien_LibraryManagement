<script>
    import * as yup from "yup";
    import {Form, Field, ErrorMessage} from 'vee-validate';

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props:{
            publisher: {type: Object, required: true},
        },
        emits: ['submit:publisher', 'delete:publisher'],
        data(){
            const publisherFormSchema = yup.object().shape({
                tenNXB: yup 
                    .string()
                    .required('Vui lòng nhập tên nhà xuất bản'),
                SDT: yup 
                    .number()
                    .required('Vui lòng điền số điện thoại'),
                Email: yup 
                    .string()
                    .required('Vui lòng nhập email'),
                DiaChi: yup
                    .string()
                    .required('Vui lòng nhập địa chỉ'),
            });
            return{
                publisherLocal: this.publisher,
                publisherFormSchema,
            };
        },
        methods:{
            submitpublisher(){
                this.$emit('submit:publisher', this.publisherLocal);
            },
            deletepublisher(){
                this.$emit('delete:publisher', this.publisherLocal.id)
            }
        }
    }
</script>

<template>
    <Form
        @submit="submitpublisher"
        :validation-schema="publisherFormSchema"
    >
        <div class="form-group">
            <label for="tenNXB" class="TieuDeONhap">Tên nhà xuất bản</label>
            <Field name="tenNXB" type="text" class="form-control" v-model="publisherLocal.tenNXB" />
            <ErrorMessage name="tenNXB" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="SDT" class="TieuDeONhap">Số điện thoại</label>
            <Field name="SDT" type="tel" class="form-control" v-model="publisherLocal.SDT" />
            <ErrorMessage name="SDT" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="Email" class="TieuDeONhap">Email</label>
            <Field name="Email" type="email" class="form-control" v-model="publisherLocal.Email" />
            <ErrorMessage name="Email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="DiaChi" class="TieuDeONhap">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control" v-model="publisherLocal.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback"/>
        </div>
        <div class="form-group">
            <button 
                type="submit" 
                class="btn btn-primary NutBamTronPhanDangKy"
            >
                Thêm
            </button>
            <button v-if="publisherLocal.idNhanVien" type="button"
                class="ml-2 btn btn-danger" @click="deletepublisher"
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