//Nhúng thêm các lớp khác
const ApiError = require('../api-error');
const ContactServiceDocGia = require('../services/contact.service.docgia');
const MongoDB = require('../utils/mongoDB.util');

    //Xử lý yêu cầu HTTP POST
//1. Thêm đọc giả
exports.addReader = async(req, res, next) =>{
    //Kiểm tra xem thuộc tính hoTen từ phía máy khách gửi lên có rỗng hay không. Nếu rỗng thì báo lỗi từ phía khách
    if(!req.body?.hoTen){
        return next( new ApiError(400, "Ho ten khong duoc de trong"));
    }
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const document = await CSDocGia.themDocGia(req.body);
        return res.send(document);  //Trả về thông tin từ phía máy khách đã gửi
    }catch(error){
        return next( new ApiError(500, "Mot loi xuat hien khi dang them thong tin doc gia") );
    }
};

    //Xử lý yêu cầu HTTP GET
//1. Lấy danh sách đọc giả
exports.listReader = async(req, res, next) =>{
    let documents = [];
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        documents = await CSDocGia.DanhSachDocGia();
    }catch(error){
        return next(new ApiError( 500, "Co mot loi xuat hien .Khi nhan mot danh sach doc gia."));
    }
    return res.send(documents);
};

//2. Lấy thông tin đọc giả trên ID
exports.readerIdentity = async(req, res, next) =>{
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const document = await CSDocGia.TimThongTinDocGia(req.params.id);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"ID doc gia khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID doc gia"));
    }
};

    //Xử lý yêu cầu HTTP PUT 
//1. Cập nhật thông tin đọc giả dựa trên ID
exports.updateReaderInformation = async(req, res, next) => {
    //Nếu phần thân rỗng thì báo lỗi
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400,"Du lieu cap nhat khong duoc rong"))
    }
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const document = await CSDocGia.CapNhatThongTin(req.params.id, req.body);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID doc gia'));
        }
        return res.send({message: "Thong tin doc gia da cap nhat thanh cong"})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang cap nhat thong tin doc gia'));
    }
}

    //Xử lý yêu cầu HTTP DELETE
//1. xóa thông tin đọc giả dựa trên ID
exports.deleteReader = async (req, res, next) => {
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const document = await CSDocGia.XoaDocGiaID(req.params.id);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID doc gia'));
        }
        return res.send({message: `Da xoa doc gia thanh cong`})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa thong tin doc gia'));
    }
}

//2. Xóa tất cả doc gia
exports.deleteAllReader = async (req, res, next) => {
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const document = await CSDocGia.XoaHetDocGia();
        return res.send({message: `${document} So luong doc gia da xoa`});
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa tat ca doc gia'));
    }
}