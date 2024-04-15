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
        if(document == true){
            return res.status(200).send({message: "Tạo tài khoản thành công"});
        }
        return res.status(401).send({message: "Email đã tồn tại hoặc lỗi"});
    }catch(error){
        return next( new ApiError(500, "Mot loi xuat hien khi dang them thong tin doc gia") );
    }
};

//2. Đăng nhập
exports.Login = async (req, res, next) => {
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const role = await CSDocGia.DangNhap(req.body);
        if(role === false){
            return res.status(401).send({message: "Mật khẩu sai hoặc tài khoản không tồn tại"});
        }
        return res.status(200).json({role: role});
    }catch(error){
        return next( new ApiError(500, `Mot loi xuat hien khi dang nhap xuat hien ben server - ${error.message}`) );
    }
}

    //Xử lý yêu cầu HTTP GET
//1. Lấy danh sách đọc giả
exports.listReader = async(req, res, next) =>{
    let documents = [];
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        documents = await CSDocGia.DanhSachDocGia();
        if( documents.length < 1){
            return next(new ApiError( 500, "Danh sach nha xuat ban rong."));
        }
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
            return next(new ApiError(400,`ID doc gia số ${req.params.id} khong ton tai`));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID doc gia"));
    }
};

//3. Lấy thông tin đọc giả bằng tên
exports.readerName = async(req, res, next) =>{
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const document = await CSDocGia.TimThongTinHoTenDocGia(req.params.name);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"Ho ten doc gia khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ho ten doc gia"));
    }
};

//4. Lấy số lượng đọc giả
exports.NumberOfReader = async(req, res, next) =>{
    try{
        const CSDocGia = new ContactServiceDocGia(MongoDB.client);
        const soLuong = await CSDocGia.SoLuongDocGia();
        return res.json(soLuong);
    }catch(error){
        return next(new ApiError( 500, "Loi lay so luong doc gia"));
    }
}

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
            return next(new ApiError(400, `Khong tin thay ID doc gia ${req.params.id}`));
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
        return res.send({message:`Da xoa doc gia thanh cong co ID: ${req.params.id} - ${document}`});
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