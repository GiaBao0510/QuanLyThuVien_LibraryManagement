<!-- <script>
    import userService from '@/services/user.service';
    import Swal from 'sweetalert2';

    export default {
        props:{
            books: {type: Array, default: []},
        },
        data(){
            return{
                danhsachsach:[],
                soLuongSach: [],//Lưu trữ sách
            };
        },
        computed: {
            DanhSachSach() {
                return this.danhsachsach;
            },
        },
        methods:{
            //Lấy danh sách sách
            async LayDanhSachSach() {
                try {
                    this.danhsachsach = await userService.AllBooks();
                    await this.laySoLuongSachChoTungQuyenSach();
                } 
                catch (err) {
                    console.log(err);
                }
            },
            //Lấy số lượng sách dựa trên ID sách
            async LaySoLuongSach(id) {
                let sl = 0;
                try {
                    sl = await userService.NumberOfBooks(id);
                } catch (err) {
                    console.log(err);
                }
                return sl;
            },

            //Lấy số lượng sách cho từng quyển rồi luu vào mảng soLuongSAch
            async laySoLuongSachChoTungQuyenSach() {
                this.soLuongSach = await Promise.all(
                    this.danhsachsach.map(async book => await this.LaySoLuongSach(book.idSach))
                );
            },

             //Làm mới danh sách sách
            refreshLisstBook() {
                this.LayDanhSachSach();
            },
        },
        mounted() {
            this.refreshLisstBook();
        },
       

    };
</script>

<template>
    <div class="KhungDanhSachSach">
        <div class="BangDanhSachSach">
            <div class="table-responsive BangConDanhSach">
                <table class="table table-bordered table-striped display table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Mượn sách</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(book, index) in danhsachsach"
                            :key="index"    
                        >
                            <th scope="row">
                                <div> <img :src='book.hinh' alt="" class="ResizeImage"> </div>
                                <div class="TenSach">{{ book.Sach }}</div>
                            </th>
                            <td>{{ book.MoTa }}</td>
                            <td>{{ soLuongSach[index] }}</td>
                            <td>null</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>


</style> -->