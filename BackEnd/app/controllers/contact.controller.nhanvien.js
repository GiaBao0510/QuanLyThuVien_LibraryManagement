//Nhúng thêm các lớp khác
const ApiError = require('../api-error');
const ContactServiceNhanVien = require('../services/contact.service.nhanvien');
const MongoDB = require('../utils/mongoDB.util');

    //Xử lý yêu cầu HTTP POST
//1. Thêm nhân viên
exports.addStaff = async(req, res, next) =>{
    //Kiểm tra xem thuộc tính hoTen từ phía máy khách gửi lên có rỗng hay không. Nếu rỗng thì báo lỗi từ phía khách
    if(!req.body?.hoTen){
        return next( new ApiError(400, "Ho ten khong duoc de trong"));
    }
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const document = await CSnhanvien.themNhanVien(req.body);
        if(document == true){
            return res.send({message: "Tạo tài khoản thành công"});
        }
        return res.send({message: "Email đã tồn tại hoặc lỗi"});
    }catch(error){
        return next( new ApiError(500, "Mot loi xuat hien khi dang them thong tin nhan vien") );
    }
};

    //Xử lý yêu cầu HTTP GET
//1. Lấy danh sách nhân viên
exports.listStaff = async(req, res, next) =>{
    let documents = [];
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        documents = await CSnhanvien.DanhSachNhanVien();
    }catch(error){
        return next(new ApiError( 500, "Co mot loi xuat hien .Khi nhan mot danh sach nhan vien."));
    }
    return res.send(documents);
};

//2. Lấy thông tin nhân viên trên ID
exports.employeeIdentity = async(req, res, next) =>{
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const document = await CSnhanvien.TimThongTinNhanVien(req.params.id);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"ID nhan vien khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID nhan vien"));
    }
};

//3. Lấy thông tin nhân viên dựa trên họ tên
exports.employeeName = async(req, res, next) =>{
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const document = await CSnhanvien.TimThongTinHoTenNhanVien(req.params.name);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"Ho ten nhan vien khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ho ten nhan vien"));
    }
};

//4.Lấy số lượng nhân viên
exports.NumberOfEmployee = async(req, res, next) =>{
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const soLuong = await CSnhanvien.SoLuongNhanVien();
        return res.json(soLuong);
    }catch(error){
        return next(new ApiError( 500, "Loi lay so luong nhan vien"));
    }
}

    //Xử lý yêu cầu HTTP PUT 
//1. Cập nhật thông tin nhân viên dựa trên ID
exports.updateEmployeeInformation = async(req, res, next) => {
    //Nếu phần thân rỗng thì báo lỗi
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400,"Du lieu cap nhat khong duoc rong"))
    }
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const document = await CSnhanvien.CapNhatThongTin(req.params.id, req.body);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID nhan vien'));
        }
        return res.send({message: "Thong tin nhan vien da cap nhat thanh cong"})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang cap nhat thong tin nhan vien'));
    }
}

    //Xử lý yêu cầu HTTP DELETE
//1. xóa thông tin nhân viên dựa trên ID
exports.deleteStaff = async (req, res, next) => {
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const document = await CSnhanvien.XoaNhanVienID(req.params.id);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID nhan vien'));
        }
        return res.send({message: `Da xoa nhan vien thanh cong`})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa thong tin nhan vien'));
    }
}

//2. Xóa tất cả nhan viên
exports.deleteAllStaff = async (req, res, next) => {
    try{
        const CSnhanvien = new ContactServiceNhanVien(MongoDB.client);
        const document = await CSnhanvien.XoaHetNhanVien();
        return res.send({message: `${document} So luong nhan vien da xoa`});
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa tat ca nhan vien'));
    }
}