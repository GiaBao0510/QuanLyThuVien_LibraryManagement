const express = require('express');
const docgia = require('../controllers/contact.controller.docgia');
const sach = require('../controllers/contact.controller.sach');
const tacgia = require('../controllers/contact.controller.tacgia');

//Tạo 1 router để quản lý tuyến đường
const router = express.Router();

//Đăng nhập

//Đăng ký tài khoản
router.route('/register/').post(docgia.addReader);

//Liệt kê sách
router.route('/books').get(sach.listBook);

//Tìm sách dựa trên ID
router.route('/book/:id').get(sach.BookIdentity);

//Tìm tác giả
router.route('/author/hoTen/:name').get(tacgia.AuthorName);

//Chỉnh sửa thông tin cá nhân
router.route('/edit/docgia/:id').put(docgia.updateReaderInformation);

//Đăng ký mượn sách
router.route('/borrowBook/:stt/reader/:idreader').put(sach.UpdateBororredBook);

//Báo cáo tình trạng sách

module.exports = router;