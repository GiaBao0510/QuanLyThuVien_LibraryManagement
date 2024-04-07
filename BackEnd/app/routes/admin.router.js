const express = require('express');
const nhanvien = require('../controllers/contact.controller.nhanvien');
const docgia = require('../controllers/contact.controller.docgia');
const sach = require('../controllers/contact.controller.sach');
const tacgia = require('../controllers/contact.controller.tacgia');
const nhaxuatban = require('../controllers/contact.controller.nhaxuatban');

const router = express.Router();

    //Add
//Thêm nhân viên
router.route('/add/staff/') .post(nhanvien.addStaff);

//Thêm sách
router.route('/add/book/').post(sach.addBook);

//Thêm tác giả
router.route('/add/author/').post(tacgia.addAuthor);

//Thêm nhà xuất bản
router.route('/add/publisher/').post(nhaxuatban.addPublishingCompany);

//Thêm đọc giả
router.route('/add/reader/').post(docgia.addReader);

//Thêm số lượng cho sách dựa trên id và số lượng

    // --------- List (Liệt kê thông tin)--------
//Danh sách sách
router.route('/books').get(sach.listBook);

//Danh sách đọc giả
router.route('/Readers').get(docgia.listReader);

//Danh sách tác giả
router.route('/Authors').get(tacgia.listAuthor);

//Danh sách nhà xuất bản
router.route('/Publishers').get(nhaxuatban.listPublishingCompany);

//Danh sách nhân viên
router.route('/Employees').get(nhanvien.listStaff);

    // --------- ID (Liệt kê, cập nhật và xóa thông tin cụ thể)------------
//Tìm ID sách
router.route('/book/:id')
    .get(sach.BookIdentity)
    .put(sach.updateBookInformation)
    .delete(sach.deleteBook);

//Tìm ID đọc giả
router.route('/Reader/:id')
    .get(docgia.readerIdentity)
    .put(docgia.updateReaderInformation)
    .delete(docgia.deleteReader);

//ID nhà xuất bản
router.route('/Publisher/:id')
    .get(nhaxuatban.PublishingCompanyIdentity)
    .put(nhaxuatban.updatePublishingCompanyInformation)
    .delete(nhaxuatban.deletePublishingCompany);

//ID nhân viên
router.route('/Employee/:id')
    .get(nhanvien.employeeIdentity)
    .put(nhanvien.updateEmployeeInformation)
    .delete(nhanvien.deleteStaff);

// ID tác giả
router.route('/Author/:id')
    .get(tacgia.AuthorIdentity)
    .put(tacgia.updateAuthorInformation)
    .delete(tacgia.deleteAuthor)

    // --------- Name (Liệt kê thông tin cụ thể)------------
//Tìm tên sách
router.route('/book/:tensach').get(sach.BookName);

//Tìm tên đọc giả
router.route('/author/tenDocGia/:name').get(docgia.readerName);

//Tìm tên tác giả
router.route('/author/tenTacGia/:name').get(tacgia.AuthorName);

//Tên nhà xuất bản
router.route('/Publisher/tenNXB/:name').get(nhaxuatban.PublishingCompanyName);

    //--------- Delate All (Xoát tất cả)------------
//1. Xóa hết sách
router.route('/deleteAllBook').delete(sach.deleteAllBook);

//2. Xóa hết nhân viên
router.route('/deleteAllEmployee').delete(nhanvien.deleteAllStaff);

//3. Xóa hết đọc giả
router.route('/deleteAllReader').delete(docgia.deleteAllReader);

//4. Xóa hết nhà xuất bản
router.route('/deleteAllPublisher').delete(nhaxuatban.deleteAllPublishingCompany);

//5. Xóa hết tác giả
router.route('/deleteAllAuthor').delete(tacgia.deleteAllAuthor);

    // ---- Truy vấn (admin , nhân viên)  ----
//1. Tổng số lượng sách dựa trên ID sach
router.route('/NumberOfBooks/:id').get(sach.TotalNumberOfBook);

//2. Cập nhật theo dõi sách dựa trên STT bản
router.route('/updatestatebook/:stt').put(sach.UpdateStateBook);

//3. Lấy số lượng bản sách dựa trên tình trạng
router.route("/numberofbookstates/:stt").get(sach.CountTheNumberOfBookStates)

    // ---- Truy vấn (admin)  ----
//1. Thêm số lượng sách dựa trên ID sách
router.route('/book/:id/quantity/:num').get(sach.addNumberOfBook);

    //Liệt kê các đọc giả chưa trả sách
    //Liệt kê các đọc giả mượn sách quá hạn
module.exports = router;