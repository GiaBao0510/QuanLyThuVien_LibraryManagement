<script>
    import BookList from './BookList.vue';
    import BookDetail from './BookCard.vue';
    import Search from './searchBook.vue';
    import userService from '@/services/user.service';

    export default{
        components:{
            BookList,BookDetail,Search
        },
        data(){
            return{
                books:[],
                activeIndex: - 1,   //Chỉ mục liên lạc mà người dùng đã chọn và hiển thị trên bookCard
                searchText: "",
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
        }
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
        },
        mounted(){
            this.refreshList();
        }
    }
</script>

<template>
    <div class="GiaoDienNguoiDung">
        <div class="BoGocGiaoDien">
            <h4 class="TieuDeThuVien">
                Thư viện
            </h4>
            <div class="PhanThongTinTimKiem">
                <Search v-model="searchText"/>
            </div>
            <div class="BangThongTinSach">
                <BookList
                    v-if="filterBookCount > 0"
                    :books="books"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có sách nào</p>
            </div>
            <div>
                <div v-if="activeBook" class="KhungChiTiet">
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
        width: 100vw;
        height: 100vw;
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
    .KhungChiTiet{
        display: block;
        position: fixed;
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
</style>