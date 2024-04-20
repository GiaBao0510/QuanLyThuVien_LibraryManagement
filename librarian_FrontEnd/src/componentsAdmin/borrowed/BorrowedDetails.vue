<script> 
    import { string } from 'yup';
    import adminService from '../../services/admin.service';
    import Swal from 'sweetalert2';

    export default {
        data(){
            return{
                soBan: "",
            };
        },
        props:{
            borrows: {type: Object, required: true},
            idNew: {type: String, required: true},
        },
        methods:{
            GanID(){
                this.soBan = this.borrows.Ban.toString();
            },
            async ThucHienXacNhanTraSach(){
                try{
                    await adminService.ConfirmTheBookReturned(this.soBan);
                    Swal.fire({
                        title: "Xác nhận người dùng đã trả sách thành công!",
                        text: "Vui lòng load lại trang!",
                        icon: "success"
                    });
                }catch(err){
                    console.log(err);
                }
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
                    <strong>Mã đọc giả:</strong>
                    {{ borrows.idDocGia }}
                </div>
                <div class="p-1">
                    <strong>Họ tên đọc giả:</strong>
                    {{ borrows.hoTen }}
                </div>
                <div class="p-1">
                    <strong>Mã sách:</strong>
                    {{ borrows.idSach }}
                </div>
                <div class="p-1">
                    <strong>Sách:</strong>
                    {{ borrows.Sach }}
                </div>
                <div class="p-1">
                    <strong>Số bản:</strong>
                    {{ soBan }}
                </div>
                <div class="p-1">
                    <strong>Ngày mượn:</strong>
                    {{ borrows.ngayMuon }}
                </div>
                <div class="p-1">
                    <strong>Ngày trả:</strong>
                    {{ borrows.ngayTra }}
                </div>
            </div>
        </div>
    </div>
    <button @click="ThucHienXacNhanTraSach" type="button">
        <span class="btn btn-primary position-relative">
            <i class="fa-solid fa-check"></i>
            Xác nhận đã trả sách
        </span>
    </button>
</template>

<style>
    .ResizeImg{
        width: 20svw;
        height: 40vh;
    }
</style>