<script> 
    import adminService from '../../services/admin.service';

    export default {
        data(){
            return{
                ID: "",
            };
        },
        props:{
            users: {type: Object, required: true},
        },
        methods:{
            GanID(){
                this.ID = this.users.idDocGia.toString();
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
                    <strong>ID:</strong>
                    {{ ID }}
                </div>
                <div class="p-1">
                    <strong>Họ tên:</strong>
                    {{ users.hoTen }}
                </div>
                <div class="p-1">
                    <strong>Ngày sinh:</strong>
                    {{ users.ngaySinh }}
                </div>
                <div class="p-1">
                    <strong>Email:</strong>
                    {{ users.Email }}
                </div>
            </div>
            <div class="col">
                <div class="p-1">
                    <strong>Giới tính:</strong>
                    {{ users.gioiTinh }}
                </div>
                <div class="p-1">
                    <strong>Số điện thoại:</strong>
                    {{ users.SDT }}
                </div>
                <div class="p-1">
                    <strong>Địa chỉ:</strong>
                    {{ users.DiaChi }}
                </div>
            </div>
        </div>
    </div>
    <router-link
        :to="{
            name: 'edituser',
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