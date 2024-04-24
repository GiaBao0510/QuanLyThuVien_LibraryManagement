<script>
    import userService from '@/services/user.service';
    import Swal from 'sweetalert2';

    //Kiêm tra da đang nhạp hay chua
    let Email = sessionStorage.getItem('email'), 
        Role = sessionStorage.getItem('role'),
        ID = sessionStorage.getItem('id');
    
    let checkLogin =0;
    if(Email && Role && ID){
        checkLogin = 1;
    }

    console.log('Email: ',Email, 'Role: ',Role, 'ID: ',ID);

    //-------------
    export default {
        data(){
            return{
                danhsachsach:[],
                soLuongSach:[],
            }
        },
        props:{
            books: {type: Array, default: []},
            activeIndex: { type: Number, default: -1},
        },
        emits: ["update:activeIndex"],
        methods:{
            updateActiveIndex(index){
                this.$emit("update:activeIndex",index);
            },

            //Lấy số lượng sách dựa trên ID sách
            async LaySoLuongSach(id) {
                let sl = 0;
                try {
                sl = await userService.TotalNumberOfBooksNotYetBorrowed(id);
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
            
            //Mượn sách
            async MuonSach(MaSach){
                if(checkLogin == 0){
                    Swal.fire({
                        title: "Hãy đăng nhập để đăng ký mượn sách",
                        icon: "error"
                    });
                }else{
                    try{
                        await userService.BorrowBook(MaSach, ID);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Đăng ký mượn sách thành công",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }catch(err){
                        console.log(err);
                    }
                }
            }
        },
        created(){
            this.danhsachsach = [...this.books];
            this.laySoLuongSachChoTungQuyenSach();
        },
    }
</script>

<template>
    <table class="table table-striped table-hover table-bordered">
        <thead class="table-dark">
            <tr> 
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Số lượng</th>
                <th>Mượn sách</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(book,index) in danhsachsach"
                :key="book.idSach"
                :class="{active: index === activeIndex}"
                @click="updateActiveIndex(index)"
            >
                <th>{{ book.idSach }}</th>
                <td class="KhungChuaTieuDeSachDocGia">
                    <div>
                        <div>
                            <img :src="book.hinh" alt="" class="ThayDoiKichCoAnh">
                        </div>
                        <p class="TieuDeCuonSach">{{ book.Sach }}</p>
                    </div>
                </td>
                <td>{{ book.TacGia }}</td>
                <td>{{ soLuongSach[index] }}</td>
                <td>
                    <button 
                        type="button" 
                        class="btn btn-primary" 
                        @click="MuonSach(book.idSach )"
                    >Mượn sách</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
    .ThayDoiKichCoAnh{
        width: 15vw;
        height: 35vh;
    }
    .TieuDeCuonSach{
        font-family: Gill Sans, Verdana;
        font-size: 1em;
        text-transform: uppercase;
        font-weight: bold;
        text-align: center;
        margin-top: 2vh;
    }
    .KhungChuaTieuDeSachDocGia{
        display: flex;
        justify-content: center;
    }
</style>