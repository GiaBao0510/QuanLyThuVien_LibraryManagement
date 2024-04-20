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
            authors: {type: Array, defalt: []},
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
                this.danhsachsach = await adminService.AllAuthor();
                } catch (err) {
                console.log(err);
                }
            },
             
            //Làm mới danh sách sách
            refreshLisstauthor() {
                this.LayDanhSachSach();
            },
        },
        mounted() {
            this.refreshLisstauthor();
        },
    };
</script>

<template>
    <div class="BangLietKeSach overflow-auto">
    <table class="table table-light table-hover caption-top">
      <thead class="table-dark">
        <tr class="DinhDangTieuDe">
          <th scope="col">ID</th>
          <th scope="col">Họ tên</th>
          <th scope="col">Ngày sinh</th>
          <th scope="col">Nơi sinh</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            class="PhanHang"
            v-for="(author, index) in authors" 
            :key="author.IDtacgia" 
            :class="{active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
          <th  scope="row">
            {{ author.IDtacgia }}
          </th>
          <td>
            <div class="TenCot">
              {{ author.hoTen }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ author.ngaySinh }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ author.DiaChi }}
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