<script>
import adminService from '../../services/admin.service';

    export default {
        data(){
            return{
                danhsachsach:[],
                soLuongSach: [],//Lưu trữ sách
                soLuongSachChuaMuon: [],
            };
        },
        computed: {
            DanhSachSach() {
                return this.danhsachsach;
            },
        },
        props:{
            books: {type: Array, defalt: []},
            activeIndex: {type: Number, defalt: []},
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
                  this.danhsachsach = await adminService.AllBook();
                  await this.laySoLuongSachChoTungQuyenSach();
                  await this.laySoLuongSachChuaMuonChoTungQuyenSach();
                } catch (err) {
                  console.log(err);
                }
            },
            //Lấy số lượng sách dựa trên ID sách
            async LaySoLuongSach(id) {
                let sl = 0;
                try {
                  sl = await adminService.NumberOfBooks(id);
                } catch (err) {
                console.log(err);
                }
                return sl;
            },

            //lấy số lượng sách chưa mượn
            async LaySoLuongSachChuaMuon(id) {
                let sl = 0;
                try {
                  sl = await adminService.TotalNumberOfBooksNotYetBorrowed(id);
                } catch (err) {
                console.log(err);
                }
                return sl;
            },

            //Lấy số lượng sách cho từng quyển rồi luu vào mảng soLuongSAch
            async laySoLuongSachChoTungQuyenSach() {
                this.soLuongSach = await Promise.all(
                  this.danhsachsach.map(async book => await this.LaySoLuongSach(book.idSach))
                );
            },

            //Lấy số lượng quyển sách chưa mượn cho từng quyển sách
            async laySoLuongSachChuaMuonChoTungQuyenSach(){
              this.soLuongSachChuaMuon = await Promise.all(
                this.danhsachsach.map(async book => await this.LaySoLuongSachChuaMuon(book.idSach))
              );
            },

             //Làm mới danh sách sách
            refreshLisstBook() {
                this.LayDanhSachSach();
            },
        },
        mounted() {
            this.refreshLisstBook();
        },
    };
</script>

<template>
    <div class="BangLietKeSach overflow-auto">
    <table class="table table-light table-hover caption-top">
      <thead class="table-dark">
        <tr class="DinhDangTieuDe">
          <th scope="col">Mã sách</th>
          <th scope="col">Tên sách</th>
          <th scope="col">Số lượng sách</th>
          <th scope="col">Số lượng sách chưa mượn</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            class="PhanHang"
            v-for="(book, index) in books" 
            :key="book.idSach" 
            :class="{active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
          <th  scope="row">
            {{ book.idSach }}
          </th>
          <td>
            <div class="TenCot">
              {{ book.Sach }}
            </div>
          </td>
          <td>{{ soLuongSach[index] }}</td>
          <td>{{ soLuongSachChuaMuon[index] }}</td>
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