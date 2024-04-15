//Nhúng thêm các lớp khác
const ApiError = require('../api-error');
const ContactServiceTacGia = require('../services/contact.service.tacgia');
const MongoDB = require('../utils/mongoDB.util');

    //Xử lý yêu cầu HTTP POST
//1. Thêm tác giả
exports.addAuthor = async(req, res, next) =>{
    //Kiểm tra xem thuộc tính hoTen từ phía máy khách gửi lên có rỗng hay không. Nếu rỗng thì báo lỗi từ phía khách
    if(!req.body?.hoTen){
        return next( new ApiError(400, "Ho ten khong duoc de trong"));
    }
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const document = await CSTacGia.themTacGia(req.body);
        return res.send(document);  //Trả về thông tin từ phía máy khách đã gửi
    }catch(error){
        return next( new ApiError(500, "Mot loi xuat hien khi dang them thong tin tac gia") );
    }
};

    //Xử lý yêu cầu HTTP GET
//1. Lấy danh sách tác giả
exports.listAuthor = async(req, res, next) =>{
    let documents = [];
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        documents = await CSTacGia.DanhSachTacGia();
    }catch(error){
        return next(new ApiError( 500, "Co mot loi xuat hien .Khi nhan mot danh sach tac gia."));
    }
    return res.send(documents);
};

//2. Lấy thông tin tác giả trên ID
exports.AuthorIdentity = async(req, res, next) =>{
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const document = await CSTacGia.TimThongTinTacGia(req.params.id);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"ID tac gia khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID tac gia"));
    }
};

//3. Lấy thông tin tác giả trên tên tác giả
exports.AuthorName = async(req, res, next) =>{
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const document = await CSTacGia.TimTenTacGia(req.params.name);
        //Nếu ten không tồn tại
        if(!document){
            return next(new ApiError(400,"Ten tac gia khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID tac gia"));
    }
};

//4. Lấy tổng số lượng tác giả
exports.NumberOfAuthors = async(req, res, next) =>{
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const soLuong = await CSTacGia.TongSoLuongTacgia();
        return res.json(soLuong);
    }catch(error){
        return next(new ApiError( 500, "Loi lay so luong tác gia"));
    }
}

    //Xử lý yêu cầu HTTP PUT 
//1. Cập nhật thông tin tác giả dựa trên ID
exports.updateAuthorInformation = async(req, res, next) => {
    //Nếu phần thân rỗng thì báo lỗi
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400,"Du lieu cap nhat khong duoc rong"))
    }
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const document = await CSTacGia.CapNhatThongTin(req.params.id, req.body);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID tac gia'));
        }
        return res.send({message: "Thong tin tac gia da cap nhat thanh cong"})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang cap nhat thong tin tac gia'));
    }
}

    //Xử lý yêu cầu HTTP DELETE
//1. xóa thông tin tác giả dựa trên ID
exports.deleteAuthor = async (req, res, next) => {
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const document = await CSTacGia.XoaTacGiaID(req.params.id);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID tac gia'));
        }
        return res.send({message: `Da xoa tac gia thanh cong`})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa thong tin tac gia'));
    }
}

//2. Xóa tất cả tac gia
exports.deleteAllAuthor = async (req, res, next) => {
    try{
        const CSTacGia = new ContactServiceTacGia(MongoDB.client);
        const document = await CSTacGia.XoaHetTacGia();
        return res.send({message: `${document} So luong tac gia da xoa`});
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa tat ca tac gia'));
    }
}