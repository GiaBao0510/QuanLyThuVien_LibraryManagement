<script>
import search from "../componentsAdmin/publisher/searchPublisher.vue";
import Card from "../componentsAdmin/publisher/PublisherCard.vue";
import List from "../componentsAdmin/publisher/PublisherList.vue";
import adminService from "../services/admin.service";

export default {
    components:{
        search, Card, List
    },
    data(){
        return{
            publishers: [],
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
        publisherString(){
            return this.publishers.map((publisher) => {
                const {idDocGia, hoTen, SDT, Email} = publisher;
                return [idDocGia, hoTen, SDT, Email].join("");
            });
        },
        //Lọc thông tin cần tìm
        filteredpublishers(){
            if(!this.searchText) return this.publishers;
            return this.publishers.filter( (_publisher, index) => this.publisherString[index].includes(this.searchText)); 
        },
        activepublisher(){
            if(this.activeIndex < 0) return null;
            return this.filteredpublishers[this.activeIndex];
        },
        filterpublisherCount(){
            return this.filteredpublishers.length;
        }
    },
    methods:{
        //Lấy tất cả thông tin sách
        async retrivepublishers(){
            try{
                this.publishers = await adminService.AllPublisher();
            }catch(err){
                console.log(err);
            }
        },

        //Làm mới
        refreshList(){
            this.retrivepublishers();
            this.activeIndex = -1;
        },

        //Xóa tất cả
        async removeAllpublisher(){
            if(confirm("Bạn muốn xóa hết nhà xuất bản?")){
                try{
                    await adminService.DeleteAllPublisher();
                    this.refreshList();
                }catch(err){
                    console.log(err);
                }
            }
        },

        //Thêm sách mới
        goToAddpublisher(){
            this.$router.push({name: "addpublisher"});
        }
    },
    mounted(){
        this.refreshList();
    }
}
</script>

<template>
    <div class="BangLietKe">
        <h4 class="TieuDeQuangLy">Quản lý nhà xuất bản</h4>
        <div class="QuanLyPhanDau">
            <search v-model="searchText" class="PhanTimKiem"/>
            <div class="KhungCongCu">
                <button class="btn btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-warning" @click="goToAddpublisher">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-danger" @click="removeAllpublisher">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="">
            <div class="BangLietKe">
                <List 
                    class="BangLietKeSach"
                    v-if="filterpublisherCount > 0"
                    :publishers="publishers"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else> Không có nhân viên nào</p>
            </div>
            <div>
                <div v-if="activepublisher" class="KhungChiTiet">
                    <div class="TieuDeQuangLy container">
                        <div class="row">
                            <div class="col-10">
                                <p>Chi tiết nhà xuất bản</p>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger" @click="refreshList()">x</button>
                            </div>
                        </div>
                    </div>
                    <Card :publishers="activepublisher"/>
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