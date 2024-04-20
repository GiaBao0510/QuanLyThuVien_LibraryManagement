<script>
import adminService from "../../services/admin.service";
import FormEmployee from "../employee/FormEmployee.vue";
import Swal from "sweetalert2";

export default {
    components: {
        FormEmployee
    },
    data(){
        return{
            employee:{
                hoTen:"",
                gioiTinh: "",
                ngaySinh: "",
                SDT: "",
                Email:"",
                DiaChi: "",
                password: "",
            },
        };
    },
    methods:{
        //Thêm sách mới
        async Createemployee(employee){
            try{
                await adminService.AddEmployee(employee);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Thêm nhân viên thành công",
                    showConfirmButton: false,
                    timer: 1500
                });
            }catch(err){
                console.log(err);
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Lỗi khi thêm nhân viên",
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
        <div v-if="employee" class="page">
            <h1 class="TieuDeBieuMau">Nhập thông tin sách cần thêm</h1>
            <FormEmployee
                :employee="employee"
                @submit:employee="Createemployee"
                @delete:employee="Deleteemployee"
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