<script>
import adminService from '../../services/admin.service';

    export default {
        data(){
            return{
                danhsachsach:[],
            };
        },
        computed: {
            DanhSachSach() {
                return this.danhsachsach;
            },
        },
        props:{
            users: {type: Array, defalt: []},
            activeIndex: {type: Number, defalt: -1},
        },
        emits:['update:activeIndex'],
        methods:{
            //Cập nhật chỉ số
            updateActiveIndex(index){
                this.$emit('update:activeIndex',index)
            },

            //Lấy danh sách sách
            async LayDanhSachSach() {
                try {
                this.danhsachsach = await adminService.AllReader();
                } catch (err) {
                console.log(err);
                }
            },
             
            //Làm mới danh sách sách
            refreshLisstuser() {
                this.LayDanhSachSach();
            },
        },
        mounted() {
            this.refreshLisstuser();
        },
    };
</script>

<template>
    <div class="BangLietKeSach overflow-auto">
    <table class="table table-light table-hover caption-top">
      <thead class="table-dark">
        <tr class="DinhDangTieuDe">
          <th scope="col">Mã đọc giả</th>
          <th scope="col">Họ tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            class="PhanHang"
            v-for="(user, index) in users" 
            :key="user.idDocGia" 
            :class="{active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
          <th  scope="row">
            {{ user.idDocGia }}
          </th>
          <td>
            <div class="TenCot">
              {{ user.hoTen }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ user.SDT }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ user.Email }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
    .DinhDangTieuDe{
      color: aliceblue;
      font-family: Arial;
      font-size: 1.25em;
      font-weight: 550;
      text-align: center;
    }
    .DinhDangTieuDe th{
      border: 1px solid aliceblue;
    }
    .PhanHang th, .PhanHang td{
      border: 1px solid gray;
    }
    .TenCot{
      text-align: center;
    }
</style>