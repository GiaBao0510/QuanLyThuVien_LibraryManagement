<script>
import adminService from '@/services/admin.service';
import FormUser from '../user/FormReader.vue';

export default { 
    components:{
        FormUser,
    },
    props:{
        id: {type: String, required: true},
    },
    data(){
        return{
            user: null,
            message:""
        };
    },
    methods:{
        //Lấy thông tin sách dựa trên ID
        async getuser(id){
            try{
                this.user = await adminService.getReader(id);
                if(!this.user){
                    console.log(this.user);
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
        async updateuser(data){
            try{
                await adminService.updateReader(this.user.idDocGia, data);
                this.message='Cập nhật sách thành công';
            }
            catch(err){
                console.log(err);
            }
        },

        //Xóa thông tin sách
        async deleteuser(){
            if(confirm("Bạn muốn xóa?")){
                try{
                    await adminService.deleteReader(this.user.idDocGia);
                    this.message="Xáo sách này thành công";
                    
                }catch(err){
                    console.log(err);
                }
            }
        },
    },
    created(){
        this.getuser(this.id);
        this.message="";
    }
}
</script>
<template>
<div class="GiaoDien">
    <div class="KhungBieuMau shadow p-3 mb-5 bg-white rounded">
        <div v-if="user" class="page">
            <h1 class="TieuDeBieuMau">Chỉnh sửa thông tin</h1>
            <FormUser
                :user="user"
                @submit:user="updateuser"
                @delete:user="deleteuser"
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