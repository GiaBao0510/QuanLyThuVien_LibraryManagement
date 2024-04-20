<script>
import search from "../componentsAdmin/author/searchAuthor.vue";
import Card from "../componentsAdmin/author/AuthorCard.vue";
import List from "../componentsAdmin/author/AuthorList.vue";
import adminService from "../services/admin.service";

export default {
    components:{
        search, Card, List
    },
    data(){
        return{
            authors: [],
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
        authorString(){
            return this.authors.map((author) => {
                const {idDocGia, hoTen, SDT, Email} = author;
                return [idDocGia, hoTen, SDT, Email].join("");
            });
        },
        //Lọc thông tin cần tìm
        filteredauthors(){
            if(!this.searchText) return this.authors;
            return this.authors.filter( (_author, index) => this.authorString[index].includes(this.searchText)); 
        },
        activeauthor(){
            if(this.activeIndex < 0) return null;
            return this.filteredauthors[this.activeIndex];
        },
        filterauthorCount(){
            return this.filteredauthors.length;
        }
    },
    methods:{
        //Lấy tất cả thông tin sách
        async retriveauthors(){
            try{
                this.authors = await adminService.AllAuthor();
            }catch(err){
                console.log(err);
            }
        },

        //Làm mới
        refreshList(){
            this.retriveauthors();
            this.activeIndex = -1;
        },

        //Xóa tất cả
        async removeAllauthor(){
            if(confirm("Bạn muốn xóa hết sách?")){
                try{
                    await adminService.DeleteAllAuthor();
                    this.refreshList();
                }catch(err){
                    console.log(err);
                }
            }
        },

        //Thêm sách mới
        goToAddauthor(){
            this.$router.push({name: "addauthor"});
        }
    },
    mounted(){
        this.refreshList();
    }
}
</script>

<template>
    <div class="BangLietKe">
        <h4 class="TieuDeQuangLy">Quản lý tác giả</h4>
        <div class="QuanLyPhanDau">
            <search v-model="searchText" class="PhanTimKiem"/>
            <div class="KhungCongCu">
                <button class="btn btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-warning" @click="goToAddauthor">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-danger" @click="removeAllauthor">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="">
            <div class="BangLietKe">
                <List 
                    class="BangLietKeSach"
                    v-if="filterauthorCount > 0"
                    :authors="authors"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else> Không có nhân viên nào</p>
            </div>
            <div>
                <div v-if="activeauthor" class="KhungChiTiet">
                    <div class="TieuDeQuangLy container">
                        <div class="row">
                            <div class="col-10">
                                <p>Chi tiết tác giả</p>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger" @click="refreshList()">x</button>
                            </div>
                        </div>
                    </div>
                    <Card :authors="activeauthor"/>
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