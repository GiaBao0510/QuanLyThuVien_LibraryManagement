<script>
import adminService from "../../services/admin.service";
import FormPublisher from "../publisher/FormPublisher.vue";
import Swal from "sweetalert2";

export default {
    components: {
        FormPublisher
    },
    data(){
        return{
            publisher:{
                tenNXB:"",
                SDT: "",
                Email: "",
                DiaChi: "",
            },
        };
    },
    methods:{
        //Thêm sách mới
        async Createpublisher(publisher){
            try{
                await adminService.AddPublisher(publisher);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Thêm nhà xuất bản thành công",
                    showConfirmButton: false,
                    timer: 1500
                });
            }catch(err){
                console.log(err);
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Lỗi khi thêm nhà xuất bản",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
    },
}
</script>


<template>
<div class="GiaoDien">
    <div class="KhungBieuMau shadow p-3 mb-5 bg-white rounded">
        <div v-if="publisher" class="page">
            <h1 class="TieuDeBieuMau">Nhập thông tin tác giả cần thêm</h1>
            <FormPublisher
                :publisher="publisher"
                @submit:publisher="Createpublisher"
                @delete:publisher="Deletepublisher"
            />
        </div>
    </div>
</div>


</template>

<style>
.KhungBieuMau{
    border: 2px solid rgb(206, 200, 200);
    border-radius: 5px;
    width: 85vw;
    padding: 2vh 5vh;
}
.GiaoDien{
    display: flex;
    justify-content: center;
    width: 100vw;
    padding: 3vh 0vh 3vh 0vh;
    background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}
.TieuDeBieuMau{
    font-weight: bold;
    font-family: Arial;
    margin-bottom: 5vh;
    color: #0b0c0f;
}
</style>