<script> 
    import adminService from '../../services/admin.service';

    export default {
        data(){
            return{
                ID: "",
            };
        },
        props:{
            authors: {type: Object, required: true},
        },
        methods:{
            GanID(){
                this.ID = this.authors.IDtacgia.toString();
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
                    {{ authors.hoTen }}
                </div>
                <div class="p-1">
                    <strong>Giới tính:</strong>
                    {{ authors.gioiTinh }}
                </div>
                <div class="p-1">
                    <strong>Ngày sinh:</strong>
                    {{ authors.ngaySinh }}
                </div>
                <div class="p-1">
                    <strong>Địa chỉ:</strong>
                    {{ authors.DiaChi }}
                </div>
                
            </div>
        </div>
    </div>
    <router-link
        :to="{
            name: 'editauthor',
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