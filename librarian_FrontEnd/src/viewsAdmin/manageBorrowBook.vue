<script>
import search from "../componentsAdmin/borrowed/searchBorrowed.vue";
import Card from "../componentsAdmin/borrowed/BorrowedDetails.vue";
import List from "../componentsAdmin/borrowed/BorrowedList.vue";
import adminService from "../services/admin.service";

export default {
    components:{
        search, Card, List
    },
    data(){
        return{
            borrows: [],
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
        borrowString(){
            return this.borrows.map((borrow) => {
                const {Sach, hoTen, Ban, idDocGia, idSach} = borrow;
                return [Sach, hoTen, Ban, idDocGia, idSach].join("");
            });
        },
        //Lọc thông tin cần tìm
        filteredborrows(){
            if(!this.searchText) return this.borrows;
            return this.borrows.filter( (_borrow, index) => this.borrowString[index].includes(this.searchText)); 
        },
        activeborrow(){
            if(this.activeIndex < 0) return null;
            return this.filteredborrows[this.activeIndex];
        },
        filterborrowCount(){
            return this.filteredborrows.length;
        }
    },
    methods:{
        //Lấy tất cả thông tin sách
        async retriveborrows(){
            try{
                this.borrows = await adminService.AllUnpaidBooks();
            }catch(err){
                console.log(err);
            }
        },
        //Làm mới
        refreshList(){
            this.retriveborrows();
            this.activeIndex = -1;
        },
    },
    mounted(){
        this.refreshList();
    }
}
</script>

<template>
    <div class="BangLietKe">
        <h4 class="TieuDeQuangLy">Thông tin sách chưa trả</h4>
        <div class="QuanLyPhanDau">
            <search v-model="searchText" class="PhanTimKiem"/>
            <div class="KhungCongCu">
                <button class="btn btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>
        <div class="">
            <div class="BangLietKe">
                <List 
                    class="BangLietKeSach"
                    v-if="filterborrowCount > 0"
                    :borrows="borrows"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else> Không có sách nào được mượn</p>
            </div>
            <div>
                <div v-if="activeborrow" class="KhungChiTiet">
                    <div class="TieuDeQuangLy container">
                        <div class="row">
                            <div class="col-10">
                                <p>Chi tiết thông tin mượn sách</p>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger" @click="refreshList()">x</button>
                            </div>
                        </div>
                    </div>
                    <Card :borrows="activeborrow" />
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