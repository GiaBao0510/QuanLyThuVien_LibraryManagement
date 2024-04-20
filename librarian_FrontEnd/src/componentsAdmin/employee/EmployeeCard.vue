<script> 
    import adminService from '../../services/admin.service';

    export default {
        data(){
            return{
                ID: "",
            };
        },
        props:{
            employees: {type: Object, required: true},
        },
        methods:{
            GanID(){
                this.ID = this.employees.idNhanVien.toString();
            }
        },
        mounted(){
            this.GanID();
        },
        created(){
            this.GanID();
        }
    };
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="p-1">
                    <strong>Mã nhâm viên:</strong>
                    {{ ID }}
                </div>
                <div class="p-1">
                    <strong>Họ tên:</strong>
                    {{ employees.hoTen }}
                </div>
                <div class="p-1">
                    <strong>Ngày sinh:</strong>
                    {{ employees.ngaySinh }}
                </div>
                <div class="p-1">
                    <strong>Email:</strong>
                    {{ employees.Email }}
                </div>
            </div>
            <div class="col">
                <div class="p-1">
                    <strong>Giới tính:</strong>
                    {{ employees.gioiTinh }}
                </div>
                <div class="p-1">
                    <strong>Số điện thoại:</strong>
                    {{ employees.SDT }}
                </div>
                <div class="p-1">
                    <strong>Địa chỉ:</strong>
                    {{ employees.DiaChi }}
                </div>
            </div>
        </div>
    </div>
    <router-link
        :to="{
            name: 'editemployee',
            params: { id: ID },
        }"
    >
        <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i>
            Hiệu chỉnh
        </span>
    </router-link>
</template>

<style>
    .ResizeImg{
        width: 20svw;
        height: 40vh;
    }
</style>