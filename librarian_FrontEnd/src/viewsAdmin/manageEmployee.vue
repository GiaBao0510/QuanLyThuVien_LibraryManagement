<script>
import search from "../componentsAdmin/employee/searchEmployee.vue";
import Card from "../componentsAdmin/employee/EmployeeCard.vue";
import List from "../componentsAdmin/employee/EmployeeList.vue";
import adminService from "../services/admin.service";

export default {
    components:{
        search, Card, List
    },
    data(){
        return{
            employees: [],
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
        employeeString(){
            return this.employees.map((employee) => {
                const {idNhanVien, hoTen, SDT, Email} = employee;
                return [idNhanVien, hoTen, SDT, Email].join("");
            });
        },
        //Lọc thông tin cần tìm
        filteredemployees(){
            if(!this.searchText) return this.employees;
            return this.employees.filter( (_employee, index) => this.employeeString[index].includes(this.searchText)); 
        },
        activeemployee(){
            if(this.activeIndex < 0) return null;
            return this.filteredemployees[this.activeIndex];
        },
        filteremployeeCount(){
            return this.filteredemployees.length;
        }
    },
    methods:{
        //Lấy tất cả thông tin sách
        async retriveemployees(){
            try{
                this.employees = await adminService.AllEmployee();
            }catch(err){
                console.log(err);
            }
        },

        //Làm mới
        refreshList(){
            this.retriveemployees();
            this.activeIndex = -1;
        },

        //Xóa tất cả
        async removeAllemployee(){
            if(confirm("Bạn muốn xóa hết sách?")){
                try{
                    await adminService.DeleteAllEmployee();
                    this.refreshList();
                }catch(err){
                    console.log(err);
                }
            }
        },

        //Thêm sách mới
        goToAddemployee(){
            this.$router.push({name: "addemployee"});
        }
    },
    mounted(){
        this.refreshList();
    }
}
</script>

<template>
    <div class="BangLietKe">
        <h4 class="TieuDeQuangLy">Quản lý nhân viên</h4>
        <div class="QuanLyPhanDau">
            <search v-model="searchText" class="PhanTimKiem"/>
            <div class="KhungCongCu">
                <button class="btn btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-warning" @click="goToAddemployee">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-danger" @click="removeAllemployee">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="">
            <div class="BangLietKe">
                <List 
                    class="BangLietKeSach"
                    v-if="filteremployeeCount > 0"
                    :employees="employees"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else> Không có nhân viên nào</p>
            </div>
            <div>
                <div v-if="activeemployee" class="KhungChiTiet">
                    <div class="TieuDeQuangLy container">
                        <div class="row">
                            <div class="col-10">
                                <p>Chi tiết nhân viên</p>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger" @click="refreshList()">x</button>
                            </div>
                        </div>
                    </div>
                    <Card :employees="activeemployee"/>
                    
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