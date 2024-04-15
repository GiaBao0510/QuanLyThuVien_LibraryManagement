<script>
    import { watch } from 'vue';
    import { DataTable } from 'datatables.net-vue3';
    import axios  from 'axios';
    import DataTableLib from 'datatables.net-bs5';
    import Buttons from 'datatables.net-buttons-bs5';
    import ButttonsHTML5 from 'datatables.net-buttons/js/buttons.html5';
    import print from 'datatables.net-buttons/js/buttons.print';
    import pdfmake from 'pdfmake';
    import pdffonts from 'pdfmake/build/vfs_fonts';
    import 'datatables.net-responsive-bs5';
    import JSZip from 'jszip';
    import userService from '@/services/user.service';
    import Swal from 'sweetalert2';
    window.JSZip = JSZip;
    DataTable.use(DataTableLib);
    DataTable.use(pdfmake);
    DataTable.use(ButttonsHTML5);

    export default {
        components:{
            DataTable,
        },
        props:{
            books: {type: Array, default: []},
            kiemtraTaiKhoan:{type: Number, default: -1},
            activeIndex: {type: Number, default: -1},
        },
        emits:["borrow:activeIndex"],
        data(){
            return {
                sach: [],
                soLuongSach: {},
                columns: [
                    { 
                        data: 'tenSach', render: (data, type, row) => { 
                        return `<img src="${row.hinh}" alt="" class="resizeImage">
                                <p class="TenSach">${data}</p>`;
                        }
                    },
                    { 
                        data: 'MoTa', render: (data, type, row) => {
                        return `<p >${data}</p>
                                <p>Giá: ${row.phi} VNĐ.</p>`;
                    }},
                    { 
                        data: 'idSach',
                        render: (data, type, row) => {
                            return `<p>${this.soLuongSach[data]} <-> ${data}</p>`;
                        },
                    }, 
                    {
                        data: 'idSach', 
                        render: async (data, type, row)  => {
                            return `<button class="btn btn-primary" @click="KiemTraChoMuonSach(${data})">Mượn</button>`;
                        }
                    },
                ]
            };
        },
        methods:{
            borrowActiveIndex(index){
                this.$emit("borrow:activeIndex", index);
            }, 
            async LaySoLuongSach(){
                for( const b of this.sach){
                    const sl = await userService.NumberOfBooks( b.idSach );
                    this.soLuongSach[ b.idSach ] = sl.toString();
                    //console.log( b.idSach ,"-", sl, '-', this.soLuongSach[ b.idSach ])
                } 
            },
            async KiemTraChoMuonSach(id) {
                let LaySoLuongSach = await userService.NumberOfBooks( id );
                //Nếu chưa có tài khoản thì không cho mượn
                if(this.kiemtraTaiKhoan < 0){
                    Swal.fire({
                        title: "Bạn chưa có tài khoản?",
                        text: "Vui lòng đăng ký, để được mượn sách",
                        icon: "question"
                    });
                }
                //Nếu số lượng sách < 1 thí không cho mượn
                else if( LaySoLuongSach < 1){
                    Swal.fire({
                        title: "Không thể mượn sách",
                        text: "Vì không đủ số lượng",
                        icon: "error"
                    });
                }
                //Thực hiện cho mượn sách 
                else{
                    await userService.BorrowBook( id.toString(), sessionStorage.getItem('id').toString());
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Mượn sách thành công",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }, 
        created(){
            this.sach = [...this.books]; 
            this.LaySoLuongSach();
        },

    };
</script>

<template>
    <div class="KhungDanhSachSach">
        <div class="BangDanhSachSach">
            <div class="table-responsive BangConDanhSach">
                <DataTable :data="sach" :columns="columns" class="table table-bordered table-striped display table-hover"
                :options="{responsive:true, autoWidth:false, dom:'Bfrtip', language:{search: 'Tìm kiếm'} }" >
                    <thead class="TieuDe">
                        <tr>
                            <th>Tên sách</th>
                            <th>Mô tả</th>
                            <th>Số lượng</th>
                            <th>Mượn sách</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style>
    .resizeImage{
        width: 12vw;
        height: 30vh;
    }
    .TieuDe{
        background-color: rgb(19, 31, 41);
        font-family: Arial;
        font-size: 1.25em;
    }
    .TieuDe th{
        color: aliceblue;
        font-weight: 550;
    }
    .TenSach{
        font-size: 1.25em;
        text-align: center;
        margin: 2vh  0 2vh 0;
    }
    .KhungDanhSachSach{
        padding: 5vh 0 5vh 0;
        background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .BangDanhSachSach{
        width: 95vw;
    }
    .BangConDanhSach{
        background-color: aliceblue;
        border: 2px solid rgb(185, 185, 185);
        border-radius:5px ;
        padding: 2vh;
    }
</style>