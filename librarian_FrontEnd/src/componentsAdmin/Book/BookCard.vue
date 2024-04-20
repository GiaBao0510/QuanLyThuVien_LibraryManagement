<script> 
    import adminService from '../../services/admin.service';

    let CoTheMuon = 0;
    //Kiểm tra tài khoản 
    if(sessionStorage.getItem('email') && sessionStorage.getItem('id') && sessionStorage.getItem('role')){
        console.log("Email: ",sessionStorage.getItem('email'), "ID:", sessionStorage.getItem('email'),"role: ",sessionStorage.getItem('role'))
        CoTheMuon=1;
    }else{
        console.log("Email: ",sessionStorage.getItem('email'), "ID:", sessionStorage.getItem('email'),"role: ",sessionStorage.getItem('role'))
    }

    export default {
        data(){
            return{
                ID: "",
                sl: 0,
            };
        },
        props:{
            books: {type: Object, required: true},
        },
        methods:{
            GanID(){
                this.ID = this.books.idSach.toString();
            },
            goToEdit(){
                this.$router.push({name: 'editbook' , params: {id: this.ID}});
            },
            async LaySoLuong(){
                try{
                    this.sl = await adminService.NumberOfBooks(this.ID);
                }
                catch(err){
                    console.log(err)
                }
            }
        },
        mounted(){
            this.GanID();
            this.LaySoLuong();
        },
        created(){
            this.GanID();
        }
    };
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-7">
                <div class="p-1">
                    <strong>Mã sách:</strong>
                    {{ ID }}
                </div>
                <div class="p-1">
                    <strong>Tên sách:</strong>
                    {{ books.Sach }}
                </div>
                <div class="p-1">
                    <strong>Năm xuất bản:</strong>
                    {{ books.namXuatBan }}
                </div>
                <div class="p-1">
                    <strong>Giá:</strong>
                    {{ books.phi }}
                </div>
                <div class="p-1">
                    <strong>Thể loại:</strong>
                    {{ books.TheLoai }}
                </div>
                <div class="p-1">
                    <strong>Nhà xuất bản:</strong>
                    {{ books.NhaXuatBan }}
                </div>
                <div class="p-1">
                    <strong>Tác giả:</strong>
                    {{ books.TacGia }}
                </div>
                <div class="p-1">
                    <strong>Số lượng:</strong>
                    {{ sl }}
                </div>
            </div>
            <div class="col-1">
                <img :src="books.hinh" alt="" class="ResizeImg">
            </div>
        </div>
    </div>
    <div  class="row">
        <div class="col">
            <div class="p-1">
                <strong>Mô tả:</strong>
                {{ books.MoTa }}
            </div>
        </div>
    </div>
    <button @click="goToEdit" type="button">
        <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i>
            Hiệu chỉnh
        </span>
    </button>
</template>

<style>
    .ResizeImg{
        width: 20svw;
        height: 40vh;
    }
</style>