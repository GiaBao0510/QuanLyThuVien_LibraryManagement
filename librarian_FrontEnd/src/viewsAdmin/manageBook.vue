<script>
import adminService from '@/services/admin.service';
import BookList from '../componentsAdmin/Book/BookList.vue';

  // export default {
  //   data() {
  //     return {
  //       books: [],      //Lưu trữ sách
  //       soLuongSach: [],//Lưu trữ sách
  //     };
  //   },
  //   computed: {
  //     DanhSachSach() {
  //       return this.books;
  //     },
  //   },
  //   methods: {

  //     //Lấy danh sách sách
  //     async LayDanhSachSach() {
  //       try {
  //         this.books = await adminService.AllBook();
  //         await this.laySoLuongSachChoTungQuyenSach();
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },

  //     //Lấy số lượng sách dựa trên ID sách
  //     async LaySoLuongSach(id) {
  //       let sl = 0;
  //       try {
  //         sl = await adminService.NumberOfBooks(id);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //       return sl;
  //     },

  //     //Lấy số lượng sách cho từng quyển rồi luu vào mảng soLuongSAch
  //     async laySoLuongSachChoTungQuyenSach() {
  //       this.soLuongSach = await Promise.all(
  //         this.books.map(async book => await this.LaySoLuongSach(book.idSach))
  //       );
  //     },

  //     //Làm mới danh sách sách
  //     refreshLisstBook() {
  //       this.LayDanhSachSach();
  //     },

  //     //Đi đến trang thêm sách
  //     goToAddBook(){
  //       this.$router.push({name: "addbook"});
  //     }
  //   },
  //   mounted() {
  //     this.refreshLisstBook();
  //   },
  // };
  export default {
    components:{
      BookList,
    }
  };
</script>

<template>
  <!--Phầm tiềm kiếm và thêm để ở đây-->

  <!-- <div class="BangLietKeSach overflow-auto">
    <table class="table table-light table-hover caption-top">
      <thead class="table-dark">
        <tr class="DinhDangTieuDe">
          <th scope="col">Mã sách</th>
          <th scope="col">Tên sách</th>
          <th scope="col">Năm xuất bản</th>
          <th scope="col">Mô tả</th>
          <th scope="col">phí</th>
          <th scope="col">Số lượng sách</th>
          <th scope="col">Chỉnh sửa</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(book, index) in books" :key="book.idSach" class="PhanHang">
          <th  scope="row">
            {{ book.idSach }}
          </th>
          <td>
            <div class="TenCot">
              <div>
                <img :src="book.hinh" class="KichCoAnh">
              </div>
              {{ book.tenSach }}
            </div>
          </td>
          <td>{{ book.namXuatban }}</td>
          <td>{{ book.MoTa }}</td>
          <td>{{ book.phi }}</td>
          <td>{{ soLuongSach[index] }}</td>
          <td> 
            <router-link
              :to="{
                name: 'editbook',
                params: {id: book.idSach },
              }"
            >
              <i class="fa-solid fa-hammer"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <button type="button" @click="goToAddBook" class="btn btn-warning ButtomAdd">
      Thêm sách
    </button>
  </div> -->

</template>

<style>
    .BangLietKeSach{
        border: 1px solid gray;
        height: 100vh;
        position: relative;
        display: block;
        width: 72vw;
    }
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
    .ButtomAdd{
      margin-top: 2vh;
      color: rgb(20, 19, 19);
      font-size: 1.25em;
      font-weight: bold;
    }
    .KichCoAnh{
      width: 15vw;
      height: 30vh;
      margin-bottom: 2vh;
    }
    .TenCot{
      text-align: center;
    }
</style>