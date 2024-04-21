const express = require('express');
const docgia = require('../controllers/contact.controller.docgia');
const sach = require('../controllers/contact.controller.sach');
const tacgia = require('../controllers/contact.controller.tacgia');
const nhaxuatban = require('../controllers/contact.controller.nhaxuatban');

//Tạo 1 router để quản lý tuyến đường
const router = express.Router();

//0.Đăng ký tài khoản
router.route('/register/').post(docgia.addReader);

//1.Đăng nhập
router.route('/login/').post(docgia.Login);

//2.Liệt kê sách 
router.route('/books').get(sach.listBook);

//3.Tìm sách dựa trên ID
router.route('/book/:id').get(sach.BookIdentity);

//4.Tìm tác giả
router.route('/author/hoTen/:name').get(tacgia.AuthorName);

//5.Chỉnh sửa thông tin cá nhân
router.route('/edit/docgia/:id').put(docgia.updateReaderInformation);

//6.Đăng ký mượn sách
router.route('/borrowBook/:idsach/reader/:idreader').put(sach.UpdateBororredBook);

//7. Lấy số lượng sách
router.route('/totalnumberofbooks/').get(sach.NumberOfBook);

//8. Lấy tổng số lượng sách
router.route('/entirenumberofbooksinthelibrary/').get(sach.TheEntireNumberOfBooksInTheLibrary);

//9. Lấy số lượng nhà xuât bản
router.route('/totalnumberofpublisher/').get(nhaxuatban.NumberOfpublishers);

//10. Lấy số lượng tác giả
router.route('/totalnumberofauthor/').get(tacgia.NumberOfAuthors);

//11. Tổng số lượng sách dựa trên ID sach
router.route('/NumberOfBooks/:id').get(sach.TotalNumberOfBook);

//12. Liệt kê anh dách ngươi dùng đã mượn
router.route('/theuserborrowedthebook/:id').get(sach.TheUserBorrowedTheBooks);

module.exports = router;