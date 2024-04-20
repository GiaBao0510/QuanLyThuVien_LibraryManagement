<script>
import adminService from '@/services/admin.service';
import FormEmployee from '../employee/FormEmployee.vue';

export default {
    components:{
        FormEmployee,
    },
    props:{
        id: {type: String, required: true},
    },
    data(){
        return{
            employee: null,
            message:""
        };
    },
    methods:{
        //Lấy thông tin sách dựa trên ID
        async getemployee(id){
            try{
                this.employee = await adminService.getEmployee(id);
                if(!this.employee){
                    console.log(this.employee);
                }
            }catch(err){
                console.log(err);
                //Chuyển sang notFound
                this.$router.push({
                    name:"notFound",
                    params:{
                        //sử dụng this.$route.path.split("/").slice(1) để lấy phần path của URL hiện tại, sau đó truyền vào params với key pathMatch.
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    /*
                         Sử dụng thuộc tính query và hash của this.$router.push để truyền query string 
                        và hash của URL hiện tại sang trang NotFound.
                    */
                    query: this.$route.query,
                    hash: this.$route.hash,
                })
            }
        },

        //Cập nhật thông tin dựa trên liên hệ có sẵn
        async updateemployee(data){
            try{
                await adminService.updateEmployee(this.employee.idNhanVien, data);
                this.message='Cập nhật sách thành công';
            }
            catch(err){
                console.log(err);
            }
        },

        //Xóa thông tin sách
        async deleteemployee(){
            if(confirm("Bạn muốn xóa?")){
                try{
                    await adminService.deleteEmployee(this.employee.idNhanVien);
                    this.message="Xáo sách này thành công";
                    
                }catch(err){
                    console.log(err);
                }
            }
        },
    },
    created(){
        this.getemployee(this.id);
        this.message="";
    }
}
</script>
<template>
<div class="GiaoDien">
    <div class="KhungBieuMau shadow p-3 mb-5 bg-white rounded">
        <div v-if="employee" class="page">
            <h1 class="TieuDeBieuMau">Chỉnh sửa thông tin</h1>
            <FormEmployee
                :employee="employee"
                @submit:employee="updateemployee"
                @delete:employee="deleteemployee"
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