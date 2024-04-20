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
            borrows: {type: Array, defalt: []},
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
                this.danhsachsach = await adminService.AllUnpaidBooks();
                } catch (err) {
                console.log(err);
                }
            },
             
            //Làm mới danh sách sách
            refreshLisstborrowed() {
                this.LayDanhSachSach();
            },
        },
        mounted() {
            this.refreshLisstborrowed();
        },
    };
</script>

<template>
    <div class="BangLietKeSach overflow-auto">
    <table class="table table-light table-hover caption-top">
      <thead class="table-dark">
        <tr class="DinhDangTieuDe">
          <th scope="col">Mã đọc giả</th>
          <th scope="col">Tên đọc giả</th>
          <th scope="col">ID sách</th>
          <th scope="col">Tên sách</th>
          <th scope="col">Số bản</th>
          <th scope="col">Ngày mượn</th>
          <th scope="col">Ngày trả</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            class="PhanHang"
            v-for="(borrowed, index) in borrows" 
            :key="borrowed.idSach" 
            :class="{active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
          <th  scope="row">
            {{ borrowed.idDocGia }}
          </th>
          <td>
            <div class="TenCot">
              {{ borrowed.hoTen }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ borrowed.idSach }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ borrowed.Sach }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ borrowed.Ban }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ borrowed.ngayMuon }}
            </div>
          </td>
          <td>
            <div class="TenCot">
              {{ borrowed.ngayTra }}
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