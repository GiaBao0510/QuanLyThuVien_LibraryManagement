<script>
import search from "../componentsAdmin/user/searchReader.vue";
import Card from "../componentsAdmin/user/ReaderCard.vue";
import List from "../componentsAdmin/user/ReaderList.vue";
import adminService from "../services/admin.service";

export default {
    components:{
        search, Card, List
    },
    data(){
        return{
            users: [],
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
        userString(){
            return this.users.map((user) => {
                const {idDocGia, hoTen, SDT, Email} = user;
                return [idDocGia, hoTen, SDT, Email].join("");
            });
        },
        //Lọc thông tin cần tìm
        filteredusers(){
            if(!this.searchText) return this.users;
            return this.users.filter( (_user, index) => this.userString[index].includes(this.searchText)); 
        },
        activeuser(){
            if(this.activeIndex < 0) return null;
            return this.filteredusers[this.activeIndex];
        },
        filteruserCount(){
            return this.filteredusers.length;
        }
    },
    methods:{
        //Lấy tất cả thông tin sách
        async retriveusers(){
            try{
                this.users = await adminService.AllReader();
            }catch(err){
                console.log(err);
            }
        },

        //Làm mới
        refreshList(){
            this.retriveusers();
            this.activeIndex = -1;
        },

        //Xóa tất cả
        async removeAlluser(){
            if(confirm("Bạn muốn xóa hết sách?")){
                try{
                    await adminService.DeleteAllReader();
                    this.refreshList();
                }catch(err){
                    console.log(err);
                }
            }
        },

        //Thêm sách mới
        goToAdduser(){
            this.$router.push({name: "adduser"});
        }
    },
    mounted(){
        this.refreshList();
    }
}
</script>

<template>
    <div class="BangLietKe">
        <h4 class="TieuDeQuangLy">Quản lý người dùng</h4>
        <div class="QuanLyPhanDau">
            <search v-model="searchText" class="PhanTimKiem"/>
            <div class="KhungCongCu">
                <button class="btn btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-warning" @click="goToAdduser">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-danger" @click="removeAlluser">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="">
            <div class="BangLietKe">
                <List 
                    class="BangLietKeSach"
                    v-if="filteruserCount > 0"
                    :users="users"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else> Không có nhân viên nào</p>
            </div>
            <div>
                <div v-if="activeuser" class="KhungChiTiet">
                    <div class="TieuDeQuangLy container">
                        <div class="row">
                            <div class="col-10">
                                <p>Chi tiết người dùng</p>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger" @click="refreshList()">x</button>
                            </div>
                        </div>
                    </div>
                    <Card :users="activeuser"/>
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