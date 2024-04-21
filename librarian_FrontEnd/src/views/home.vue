<script>
    import BookList from './BookList.vue';
    import BookDetail from './BookCard.vue';
    import Search from './searchBook.vue';
    import userService from '@/services/user.service';
    import ListOfBooksToBorrow from './ListOfBooksToBorrow.vue';

    export default{
        components:{
            BookList,BookDetail,Search,ListOfBooksToBorrow
        },
        data(){
            return{
                books:[],
                activeIndex: - 1,   //Chỉ mục liên lạc mà người dùng đã chọn và hiển thị trên bookCard
                searchText: "",
                DangDangNhap:0,
                MucHienThi:0,
                ID:-1,
            };
        },
        watch:{
            //Giám sát các thay đổi của biến searchText. Bỏ phần tử đang chọn trong danh sách
            searchText(){
                this.activeIndex = -1;
            }
        },
        computed:{
            //Chuyển từng đối tượng thành chuỗi để tiện tìm
            bookString(){
                return this.books.map((book) => {
                    const {idSach, tenSach} = book;
                    return [idSach, tenSach].join("");
                });
            },
            //Lọc thông tin cần tìm
            filteredBooks(){
                if(!this.searchText) return this.books;
                return this.books.filter( (_book, index) => this.bookString[index].includes(this.searchText)); 
            },
            activeBook(){
                if(this.activeIndex < 0) return null;
                return this.filteredBooks[this.activeIndex];
            },
            filterBookCount(){
                return this.filteredBooks.length;
            },
            
        }, 
        methods:{
            async retriveBook(){
                try{
                    this.books = await userService.AllBooks();
                }catch(error){
                    console.log(error);
                }
            },
            //Làm mới danh sách liên hệ
            refreshList(){
                this.retriveBook();
                this.activeIndex = -1;
            },
            KiemTraDangNhap(){
                if(sessionStorage.getItem('role') && sessionStorage.getItem('email') && sessionStorage.getItem('id') ){
                    this.DangDangNhap = 1;
                    this.ID = sessionStorage.getItem('id');
                }else{
                    this.DangDangNhap = 0;
                }
            },
            ChonMucHienThi(index){
                this.MucHienThi = index;
            }
        },
        mounted(){
            this.refreshList();
            this.KiemTraDangNhap();
        }
    }
</script>

<template>
    <div class="GiaoDienNguoiDung">
        <div class="BoGocGiaoDien">
            <div>
                <button 
                    type="button" 
                    class="TieuDeThuVien" 
                    @click="refreshList, ChonMucHienThi(0)"
                > 
                    Thư viện 
                </button>
                <button 
                    @click="refreshList, ChonMucHienThi(1)"
                    v-if="DangDangNhap>0"
                    class="btn-primary shadow p-3 mb-5 rounded NutKiemTraDaMuonSach "
                >
                    <i class="fa-solid fa-book"></i>
                    Đã mượn
                </button>
            </div>
            <div class="PhanThongTinTimKiem">
                <Search v-model="searchText"/>
            </div>
            <div class="BangThongTinSach" v-if="MucHienThi == 0">
                <BookList
                    v-if="filterBookCount > 0"
                    :books="books"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có sách nào</p>
            </div>
            <div class="BangThongTinSach" v-if="MucHienThi == 1 && ID != -1">
                <ListOfBooksToBorrow
                    :ID="this.ID"
                />
            </div>
            <div>
                <div v-if="activeBook" class="KhungChiTietNguoiDung">
                    <div class="TieuDeQuangLy container">
                        <div class="row">
                            <div class="col-10">
                                <p>Chi tiết sách</p>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger" @click="refreshList()">x</button>
                            </div>
                        </div>
                    </div>
                    <BookDetail
                        :books="activeBook"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .GiaoDienNguoiDung{
        width: auto;
        height: auto;
        padding: 5vh 0vh 5vh 0vh;
        display: flex;
        justify-content: center;
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
    .TieuDeQuangLy{
        font-size: 2.5em;
        font-family: Arial;
        font-weight: bold;
    }
    .PhanThongTinTimKiem{
        margin: 5vh 0vh 5vh 0vh;
    }
    .BangThongTinSach{
        overflow: scroll;
        height: 90vh;
    }
    .BoGocGiaoDien{
        border-radius: 5px;
        padding: 3vh 2vh 5vh 2vh;
        width: 90vw;
        background-color: aliceblue;
        height: 120vh;
        overflow: hidden;
    }
    .KhungChiTietNguoiDung{
        display: block;
        position: relative;
        border: 1px solid gray;
        background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
        padding: 2vh;
        width: 80vw;
        height: 85vh;
        overflow: scroll;
        border-radius: 5px;
        bottom: 90vh;
        left: 5vw;
        z-index: 10;
    }
    .TieuDeThuVien{
        font-weight: bold;
        font-size: 2.5em;
    }
    .NutKiemTraDaMuonSach{
        margin-left: 5vw;
        font-size: 1.2em;
        font-family: Arial, Helvetica, sans-serif;
        padding: 2vh;
        border-radius: 5px;
    }
</style>