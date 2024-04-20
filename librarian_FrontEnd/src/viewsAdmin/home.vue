<script>
    import Statistical from '../componentsAdmin/statistical.vue';
    import adminService from '../services/admin.service';
    import manageAuthorVue from './manageAuthor.vue';
    import manageBook2Vue from './manageBook2.vue';
    import manageEmployeeVue from './manageEmployee.vue';
    import managePublisher from './managePublisher.vue';
    import manageReader from './manageReader.vue';
    import manageBorrowBook from './manageBorrowBook.vue';

    export default {
        components:{
            Statistical,
            manageBook2Vue,
            manageEmployeeVue,
            manageReader,
            manageAuthorVue,
            managePublisher,
            manageBorrowBook,
        },
        data(){
            return{
                mucHienThi:0,
            };
        },
        methods:{
            ChonMucHienThi(index){
                this.mucHienThi = index;
            },
        },
    };
</script>

<template>
    <div class="GiaoDienKhungChuaAdmin">
        <div class="row KhungChuaAdmin">
            <div class="col-sm-3 PhanBangQuanLy">
                <table class="table table-hover table-dark BangChon">
                    <tbody>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(0)">Thống kê</th>
                        </tr>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(1)">Sách</th>
                        </tr>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(2)">Nhân viên</th>
                        </tr>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(3)">Người dùng</th>
                        </tr>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(4)">Tác giả</th>
                        </tr>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(5)"> Nhà xuất bản</th>
                        </tr>
                        <tr class="PhanTuTrongMenu">
                            <th scope="row" @click="ChonMucHienThi(6)"> Sách đã mượn</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="col-sm-7">
                <div v-if="mucHienThi == 0">
                    <Statistical/>
                </div>
                <div v-if="mucHienThi == 1">
                    <manageBook2Vue/> 
                </div>
                <div v-if="mucHienThi == 2">
                    <manageEmployeeVue/>
                </div>
                <div v-if="mucHienThi == 3">
                    <manageReader/>
                </div>
                <div v-if="mucHienThi == 4">
                    <manageAuthorVue/>
                </div>
                <div v-if="mucHienThi == 5">
                    <managePublisher/>
                </div>
                <div v-if="mucHienThi == 6">
                    <manageBorrowBook/>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style>
    .PhanTuTrongMenu th{
        cursor: pointer;
    }
    .GiaoDienKhungChuaAdmin{
        display: flex;
        justify-content: center;
        width: 100vw;
        padding: 5vh 0 5vh 0;
        background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
    }
    .KhungChuaAdmin{
        width: 98vw;
        height: 110vh;
    }
    
    .BangChon{
        height: 100%;
        width: 100%;
    }
</style>