const express = require('express');
const nhanvien = require('../controllers/contact.controller.nhanvien');
const docgia = require('../controllers/contact.controller.docgia');
const sach = require('../controllers/contact.controller.sach');
const tacgia = require('../controllers/contact.controller.tacgia');
const nhaxuatban = require('../controllers/contact.controller.nhaxuatban');
 
const router = express.Router();

//Cập nhật thông tin
router.route('/edit/nhanvien/:id').put(nhanvien.updateEmployeeInformation);

    // --------- List ------------
//Danh sách sách
router.route('/books').get(sach.listBook);

//Danh sách đọc giả
router.route('/Readers').get(docgia.listReader);

//Danh sách tác giả
router.route('/Authors').get(tacgia.listAuthor);

//Danh sách nhà xuất bản
router.route('/Publishers').get(nhaxuatban.listPublishingCompany);

    // --------- ID ------------
//Tìm ID sách
router.route('/book/:id').get(sach.BookIdentity);

//Tìm ID đọc giả
router.route('/Reader/:id').get(docgia.readerIdentity);

//ID nhà xuất bản
router.route('/Publisher/:id').get(nhaxuatban.PublishingCompanyIdentity);

    // --------- Name ------------
//Tìm tên sách
router.route('/book/:tensach').get(sach.BookName);

//Tìm tên tác giả
router.route('/author/hoTen/:name').get(tacgia.AuthorName);

//Tìm tên tác giả
router.route('/author/:id').get(tacgia.AuthorIdentity);

//Tên nhà xuất bản
router.route('/Publisher/tenNXB/:name').get(nhaxuatban.PublishingCompanyName);

    //Truy vấn
//1. Tổng số lượng sách dựa trên ID sach
router.route('/NumberOfBooks/:id').get(sach.TotalNumberOfBook);

//2. Cập nhật theo dõi sách dựa trên STT bản
router.route('/updatestatebook/:stt').put(sach.UpdateStateBook);

//3. Lấy số lượng bản sách dựa trên tình trạng
router.route("/numberofbookstates/:stt").get(sach.CountTheNumberOfBookStates)

//4.Liệt kê các đọc giả chưa trả sách
router.route('/informationaboutborrowed/').get(sach.ListInformationAboutBorrowedBooks);

//5. Lấy số lượng sách
router.route('/totalnumberofbooks/').get(sach.NumberOfBook);

//6. Lấy số lượng đọc giả
router.route('/totalnumberofreaders/').get(docgia.NumberOfReader);

//7. Lấy tổng số lượng sách
router.route('/entirenumberofbooksinthelibrary/').get(sach.TheEntireNumberOfBooksInTheLibrary);

//8. Lấy số lượng nhà xuât bản
router.route('/totalnumberofpublisher/').get(nhaxuatban.NumberOfpublishers);

//9. Lấy số lượng tác giả
router.route('/totalnumberofauthor/').get(tacgia.NumberOfAuthors);

//Liệt kê đọc giả mượn sách quá hạn
//Liệt kê đọc giả chưa trả sách
//Duyệt cho mượn sách
//Duyệt trả sách


module.exports = router;