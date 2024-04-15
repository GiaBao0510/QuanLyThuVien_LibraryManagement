//Nhúng thêm các lớp khác
const ApiError = require('../api-error');
const ContactServiceNhaXuatban = require('../services/contact.service.nhaxuatban');
const MongoDB = require('../utils/mongoDB.util');

    //Xử lý yêu cầu HTTP POST 
//1. Thêm nhà xuất bản
exports.addPublishingCompany= async(req, res, next) =>{
    //Kiểm tra xem thuộc tính hoTen từ phía máy khách gửi lên có rỗng hay không. Nếu rỗng thì báo lỗi từ phía khách
    if(!req.body?.tenNXB){
        return next( new ApiError(400, "Ten khong duoc de trong"));
    }
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const document = await CSNhaXuatban.themNhaXuatban(req.body);
        return res.send({message: "Đã thêm nhà xuất bản thành công"});  //Trả về thông tin từ phía máy khách đã gửi
    }catch(error){
        return next( new ApiError(500, "Mot loi xuat hien khi dang them thong tin nha xuat ban") );
    }
};

    //Xử lý yêu cầu HTTP GET
//1. Lấy danh sách nhà xuất bản
exports.listPublishingCompany= async(req, res, next) =>{
    let documents = [];
    try{ 
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        documents = await CSNhaXuatban.DanhSachNhaXuatban();
    }catch(error){
        return next(new ApiError( 500, "Co mot loi xuat hien .Khi nhan mot danh sach nha xuat ban."));
    }
    return res.send(documents);
};

//2. Lấy thông tin nhà xuất bản trên ID
exports.PublishingCompanyIdentity = async(req, res, next) =>{
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const document = await CSNhaXuatban.TimThongTinNhaXuatban(req.params.id);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"ID nha xuat ban khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID nha xuat ban"));
    }
};

//3. Lấy thông tin nhà xuất bản trên tên nhà xuất bản
exports.PublishingCompanyName = async(req, res, next) =>{
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const document = await CSNhaXuatban.TimTenNhaXuatban(req.params.name);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"Ten nha xuat ban khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ten nha xuat ban"));
    }
};

//4. Tổng số nhà xuất bản
exports.NumberOfpublishers = async(req, res, next) =>{
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const soLuong = await CSNhaXuatban.SoLuongNhaXuatBan();
        return res.json(soLuong);
    }catch(error){
        return next(new ApiError( 500, "Loi lay so luong nha xuat ban"));
    }
}
    //Xử lý yêu cầu HTTP PUT 
//1. Cập nhật thông tin nhà xuất bản dựa trên ID
exports.updatePublishingCompanyInformation = async(req, res, next) => {
    //Nếu phần thân rỗng thì báo lỗi
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400,"Du lieu cap nhat khong duoc rong"))
    }
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const document = await CSNhaXuatban.CapNhatThongTin(req.params.id, req.body);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID nha xuat ban'));
        }
        return res.send({message: "Thong tin nha xuat ban da cap nhat thanh cong"})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang cap nhat thong tin nha xuat ban'));
    }
}

    //Xử lý yêu cầu HTTP DELETE
//1. xóa thông tin nhà xuất bản dựa trên ID
exports.deletePublishingCompany= async (req, res, next) => {
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const document = await CSNhaXuatban.XoaNhaXuatbanID(req.params.id);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID nha xuat ban'));
        }
        return res.send({message: `Da xoa nha xuat ban thanh cong`})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa thong tin nha xuat ban'));
    }
}

//2. Xóa tất cả nhan viên
exports.deleteAllPublishingCompany= async (req, res, next) => {
    try{
        const CSNhaXuatban = new ContactServiceNhaXuatban(MongoDB.client);
        const document = await CSNhaXuatban.XoaHetNhaXuatban();
        return res.send({message: `${document} So luong nha xuat ban da xoa`});
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa tat ca nha xuat ban'));
    }
}