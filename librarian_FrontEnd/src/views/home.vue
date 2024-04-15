<template>
    <div>
        <div>
            <ListBook 
                :books="DanhSachSach"
                :borrow="kiemtraTaiKhoan"
            />
        </div> 
        <div >
            {{ kiemtraTaiKhoan }}
        </div>
    </div>
</template>

<script>
    import userService from '@/services/user.service';
    import ListBook from "@/components/ListBook.vue";

    // const user = sessionStorage.getItem('user');
    // const role = sessionStorage.getItem('role');
    // if(!user || !role){
    //     alert('Chưa có tài khoản')
    // }else{
    //     alert('Có tài khoản')
    // }

    export default {
        components:{
            ListBook
        },
        data(){
            return{
                books: [],          //Hiển thị những cuốn sách
                kiemtraTaiKhoan:-1,
            };
        },
        watch:{
            CheckLoggedin(){
                this.KiemTraDangNhap();
            }
        },

        computed:{
            //Danh sách thông tin sách
            DanhSachSach(){
                return this.books;
            },

        },
        methods:{
            async LayTatCaSach(){
                try{
                    this.books = await userService.AllBooks();
                }catch(error){
                    console.log(error);
                }
            },

            //Làm mới danh sách sách
            LamMoiThuVienSach(){
                this.LayTatCaSach();
            },

            //Kiểm tra đang nhập
            KiemTraDangNhap(){
                const user = sessionStorage.getItem('email');
                const role = sessionStorage.getItem('role');
                if(!user || !role){
                    this.kiemtraTaiKhoan=0;
                    console.log(user)
                    console.log(role)
                }else{
                    this.kiemtraTaiKhoan=1;
                    console.log(user)
                    console.log(role)
                }
            }
        },
        mounted(){
            this.LamMoiThuVienSach();
            this.KiemTraDangNhap();
        },
        created(){
            this.LamMoiThuVienSach();
            this.KiemTraDangNhap();
        }
    };
</script>
