<script>
import searchBook from "../componentsAdmin/Book/searchBook.vue";
import BookCard from "../componentsAdmin/Book/BookCard.vue";
import BookList from "../componentsAdmin/Book/BookList.vue";
import adminService from "../services/admin.service";

export default {
    components:{
        searchBook, BookCard, BookList
    },
    data(){
        return{
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch:{
        searchText(){
            this.activeIndex = -1;
        },
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
        //Lấy tất cả thông tin sách
        async retriveBooks(){
            try{
                this.books = await adminService.AllBook();
            }catch(err){
                console.log(err);
            }
        },

        //Làm mới
        refreshList(){
            this.retriveBooks();
            this.activeIndex = -1;
        },

        //Xóa tất cả
        async removeAllBook(){
            if(confirm("Bạn muốn xóa hết sách?")){
                try{
                    await adminService.DeleteAllBook();
                    this.refreshList();
                }catch(err){
                    console.log(err);
                }
            }
        },

        //Thêm sách mới
        goToAddBook(){
            this.$router.push({name: "addbook"});
        }
    },
    mounted(){
        this.refreshList();
    }
}
</script>

<template>
    <div class="BangLietKe">
        <h4 class="TieuDeQuangLy">Quản lý sách</h4>
        <div class="QuanLyPhanDau">
            <searchBook v-model="searchText"  class="PhanTimKiem"/>
            <div class="KhungCongCu">
                <button class="btn btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-warning" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-danger" @click="removeAllBook">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="">
            <div class="BangLietKe">
                <BookList 
                    class="BangLietKeSach"
                    v-if="filterBookCount > 0"
                    :books="books"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else> Không có quyển sách nào</p>
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
                    <BookCard :books="activeBook"/>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .BangLietKe{
        display: block;
        width: 70vw;
        height: 80vh;
        position: absolute;
    }
    .BangLietKeSach{
        overflow: scroll;
        width: 72vw;
        height: 89vh;
    }
    .TieuDeQuangLy{
        font-size: 2.5em;
        font-family: Arial;
        font-weight: bold;
    }
    .KhungChiTiet{
        display: block;
        position: relative;
        border: 1px solid gray;
        background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
        padding: 2vh;
        width: 72vw;
        height: 85vh;
        overflow: scroll;
        border-radius: 5px;
    }
    .KhungCongCu{
        display: flex;
        position: relative;
    }
    .KhungCongCu button{
        margin-left: 2vh;
    }
    .PhanTimKiem{
        width: 45vw;
    }
    .QuanLyPhanDau{
        display: flex;
        margin-bottom: 3vh;
    }
</style>