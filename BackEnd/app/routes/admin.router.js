const express = require('express');
const nhanvien = require('../controllers/contact.controller.nhanvien');
const docgia = require('../controllers/contact.controller.docgia');
const sach = require('../controllers/contact.controller.sach');
const tacgia = require('../controllers/contact.controller.tacgia');
const nhaxuatban = require('../controllers/contact.controller.nhaxuatban');

const router = express.Router();

    //Update
//1.Cập nhật thông tin nhân viên
router.route('/edit/nhanvien/:id')
    .put(nhanvien.updateEmployeeInformation);

//2.Cập nhật thông tin đọc giả
router.route('/edit/docgia/:id')
    .put(docgia.updateReaderInformation);

//3.Cập nhật thông tin sách
router.route('/edit/sach/:id')
    .put(sach.updateBookInformation);

//4.Cập nhật thông nhà xuất bản
router.route('/edit/nhaxuatban/:id')
    .put(nhaxuatban.updatePublishingCompanyInformation);
    // --------- List ------------
//Danh sách sách
router.route('/books')
    .get(sach.listBook);

//Danh sách đọc giả
router.route('/Readers')
    .get(docgia.listReader);

//Danh sách tác giả
router.route('/Authors')
    .get(tacgia.listAuthor);

//Danh sách nhà xuất bản
router.route('/Publishers')
    .get(nhaxuatban.listPublishingCompany);

//Danh sách nhân viên
router.route('/Employees')
    .get(nhanvien.listStaff);
    // --------- ID ------------
//Tìm ID sách
router.route('/book/:id')
    .get(sach.BookIdentity)
    .delete(sach.deleteBook);

//Tìm ID đọc giả
router.route('/Reader/:id')
    .get(docgia.readerIdentity)
    .delete(docgia.deleteReader);

//ID nhà xuất bản
router.route('/Publisher/:id')
    .get(nhaxuatban.PublishingCompanyIdentity)
    .delete(nhaxuatban.deletePublishingCompany);

//ID nhân viên
router.route('/Employee/:id')
    .get(nhanvien.employeeIdentity)
    .delete(nhanvien.deleteStaff);
    // --------- Name ------------
//Tìm tên sách
router.route('/book/:tensach')
    .get(sach.BookName);

//Tìm tên đọc giả
router.route('/author/tenDocGia/:name')
    .get(docgia.readerName);

//Tìm tên tác giả
router.route('/author/tenTacGia/:name')
    .get(tacgia.AuthorName);

//Tên nhà xuất bản
router.route('/Publisher/tenNXB/:name')
    .get(nhaxuatban.PublishingCompanyName);

    //--------- Delate All ------------
//1. Xóa hết sách
router.route('/deleteAllBook')
    .delete(sach.deleteAllBook);

//2. Xóa hết nhân viên
router.route('/deleteAllEmployee')
    .delete(nhanvien.deleteAllStaff);

//3. Xóa hết đọc giả
router.route('/deleteAllReader')
    .delete(docgia.deleteAllReader);

//4. Xóa hết nhà xuất bản
router.route('/deleteAllPublisher')
    .delete(nhaxuatban.deleteAllPublishingCompany);

//5. Xóa hết tác giả
router.route('/deleteAllAuthor')
    .delete(tacgia.deleteAllAuthor);


    //Liệt kê các đọc giả chưa trả sách
    //Liệt kê các đọc giả mượn sách quá hạn
module.exports = router;