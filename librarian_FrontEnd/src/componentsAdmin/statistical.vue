<script>
    import AdminService from '../services/admin.service';

    export default {
        
        data(){
            return{
                slNhanVien:0,
                slNguoiDung:0,
                slSach:0,
                slNhaXuatBan:0,
                slSachMuon:0,
                slTacGia:0,
                TongSoLuongSach:0,
            };
        },
        methods:{
            async CapNhatSoLuong(){
                this.slNhanVien = await AdminService.TotalNumberofEmployees();
                this.slNguoiDung = await AdminService.TotalNumberOfReaders();
                this.slSach = await AdminService.TotalNumberOfBooks();
                this.slNhaXuatBan = await AdminService.TotalNumberOfPublisher();
                this.slSachMuon = await AdminService.NumberOfBooksBorrowed();
                this.slTacGia = await AdminService.TotalNumberofAuthor();
                this.TongSoLuongSach = await AdminService.EntireNumberOfBooksInTheLibrary();
            }
        },
        mounted(){
            this.CapNhatSoLuong();
        }
    };
</script>

<template>
    <div class="KhungChuaThongKe">
        <div>
            <div class="row HangThongKe">
                <div class="col OThongKe1 ">
                    <p>Số lượng nhân viên: {{ slNhanVien }} </p> 
                </div>
                <div class="col OThongKe2">
                    <p>Số lượng người dùng: {{ slNguoiDung }} </p> 
                </div>
                <div class="col OThongKe3">
                    <p>Số lượng sách: {{ slSach }} </p> 
                </div>
                <div class="col OThongKe4">
                    <p>Số lượng nhà xuất bản: {{ slNhaXuatBan }} </p> 
                </div>
            </div>
            <div class="row HangThongKe">
                <div class="col OThongKe5">
                    <p>Số lượng sách đã mượn: {{ slSachMuon }} </p> 
                </div>
                <div class="col OThongKe6">
                    <p>Số lượng tác giả: {{ slTacGia }} </p> 
                </div>
                <div class="col OThongKe7">
                    <p>Tổng số lượng Sách: {{ TongSoLuongSach }} </p> 
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .OThongKe1,.OThongKe2 ,.OThongKe3 ,.OThongKe4, 
    .OThongKe5, .OThongKe6, .OThongKe7{
        border-radius: 5px ;
        display: block;
        margin-right: 3vw;
        color: aliceblue;
        font-size: 1.25em;
        font-weight: 550;
    }
    .OThongKe1{
        background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    }
    .OThongKe2{
        background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    }
    .OThongKe3{
        background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
    }
    .OThongKe4{
        background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    }
    .OThongKe5{
        background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
    }
    .OThongKe1{
        background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
    }
    .OThongKe6{
        background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .OThongKe7{
        background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    }
    .HangThongKe{
        margin-top: 5vh;
    }
    .KhungChuaThongKe{
        display: block;
        width: 100%;
        height: 100%;
    }

</style>