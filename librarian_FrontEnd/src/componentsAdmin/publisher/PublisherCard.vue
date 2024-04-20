<script> 
    import adminService from '../../services/admin.service';

    export default {
        data(){
            return{
                ID: "",
            };
        },
        props:{
            publishers: {type: Object, required: true},
        },
        methods:{
            GanID(){
                this.ID = this.publishers.idNXB.toString();
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
                    <strong>Tên nhà xuất bản:</strong>
                    {{ publishers.tenNXB }}
                </div>
                <div class="p-1">
                    <strong>Số điện thoại:</strong>
                    {{ publishers.SDT }}
                </div>
                <div class="p-1">
                    <strong>Email:</strong>
                    {{ publishers.Email }}
                </div>
                <div class="p-1">
                    <strong>Địa chỉ:</strong>
                    {{ publishers.DiaChi }}
                </div>
                
            </div>
        </div>
    </div>
    <router-link
        :to="{
            name: 'editpublisher',
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