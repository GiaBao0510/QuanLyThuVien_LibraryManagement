//Nhúng thêm các lớp khác
const ApiError = require('../api-error');
const ContactServiceSach = require('../services/contact.service.sach');
const MongoDB = require('../utils/mongoDB.util');

    //Xử lý yêu cầu HTTP POST
//1. Thêm sách
exports.addBook = async(req, res, next) =>{
    //Kiểm tra xem thuộc tính hoTen từ phía máy khách gửi lên có rỗng hay không. Nếu rỗng thì báo lỗi từ phía khách
    if(!req.body?.tenSach){
        return next( new ApiError(400, "Ten sach khong duoc de trong"));
    }
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.themSach(req.body);
        return res.send(document);  //Trả về thông tin từ phía máy khách đã gửi
    }catch(error){
        return next( new ApiError(500, "Mot loi xuat hien khi dang them thong tin sach") );
    }
};

//2. Thêm số lượng sách dựa trên ID sách
exports.addNumberOfBook = async (req, res, next) => {
    let result;
    try {
        const CSSach = new ContactServiceSach(MongoDB.client);
        const num = parseInt(req.params.num);
        const id = parseInt(req.params.id);
        result = await CSSach.ThemSoLuongBanSach_ID(num, id);
        if (result == true) {
            return res.send({ message: "Đã thêm số lượng sách thành công" });
        }
        return res.send({ message: `Lỗi không tìm thấy ID sách: ${req.params.id}` });
    } catch (error) {
        return next(new ApiError(500, `Mot loi xuat hien khi dang them so luong cho quyen sach duoc chon. ${error.message} - ${result}`));
    }
};

    //Xử lý yêu cầu HTTP GET
//1. Lấy danh sách sách
exports.listBook = async(req, res, next) =>{
    let documents = [];
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        documents = await CSSach.DanhSachSach();
    }catch(error){
        return next(new ApiError( 500, "Co mot loi xuat hien .Khi nhan mot danh sach sach."));
    }
    return res.send(documents);
};

//2. Lấy thông tin sách trên ID
exports.BookIdentity = async(req, res, next) =>{
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.TimThongTinSach(req.params.id);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"ID sach khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim ID sach"));
    }
};

//3. Lấy thông tin sách trên tên sách
exports.BookName = async(req, res, next) =>{
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.TimThongTinSach(req.params.name);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"Name sach khong ton tai"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "Loi .Khi tim Name sach"));
    }
};

//5. Lấy Tổng số lượng sách dựa trên ID
exports.TotalNumberOfBook = async(req, res, next) =>{
    try{
        const id = req.params.id;
        //Kiểm tra ID có hợp lệ không
        if(isNaN(id)){
            return next(new ApiError(400,"ID khong hop le"));
        }

        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.TongSoLuongSach_ID(req.params.id);
        //Nếu ID không tồn tại
        if(!document){
            return next(new ApiError(400,"ID sach khong ton tai"));
        }
        if(document){
            return res.json(document);
        }else{
            return res.sendStatus(404);
        }
    }catch(error){
        return next(new ApiError(500, `Loi .Khi tim ID sach: ${req.params.id} - ${error.message}`));
    }
};

    //Xử lý yêu cầu HTTP PUT 
//1. Cập nhật thông tin sách dựa trên ID
exports.updateBookInformation = async(req, res, next) => {
    //Nếu phần thân rỗng thì báo lỗi
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400,"Du lieu cap nhat khong duoc rong"))
    }
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.CapNhatThongTin(req.params.id, req.body);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID sach'));
        }
        return res.send({message: "Thong tin sach da cap nhat thanh cong"})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang cap nhat thong tin sach'));
    }
}

//2. Cập nhật mượn sách
exports.UpdateBororredBook = async(req, res, next) =>{
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.CapNhatMuonSach(req.params.idreader, req.params.stt);
        
        if(document == false){
            return next(new ApiError(400, `Khong tin thay STT ban sach hoac ID doc gia ${req.params.idreader} - ${req.params.stt}`));
        }
        
        return res.send({message: "Muon sach thanh cong"});
    }catch(error){
        return next(new ApiError(500, `Loi. Khi dang thuc hien cho muon sach ${error.message}`));
    }
};

//3. Cập nhật tình trạng sách
exports.UpdateStateBook = async(req, res, next) =>{
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.CapNhatTinhTrangSach(req.params.stt, req.body);
        
        if(document == false){
            return next(new ApiError(400, `Khong tin thay STT ban sach - ${req.params.stt} - ${req.body}`));
        }
        
        return res.send({message: "Cap nhat tinh trang sach thanh cong"});
    }catch(error){
        return next(new ApiError(500, `Loi. Khi dang thuc hien cho muon sach ${error.message}`));
    }
};

    //Xử lý yêu cầu HTTP DELETE
//1. xóa thông tin sách dựa trên ID
exports.deleteBook = async (req, res, next) => {
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.XoaSachID(req.params.id);
        //Nếu ID không tồn tại thì báo lỗi
        if(!document){
            return next(new ApiError(400, 'Khong tin thay ID sach'));
        }
        return res.send({message: `Da xoa sach thanh cong`})
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa thong tin sach'));
    }
}

//2. Xóa tất cả sách
exports.deleteAllBook = async (req, res, next) => {
    try{
        const CSSach = new ContactServiceSach(MongoDB.client);
        const document = await CSSach.XoaHetSach();
        return res.send({message: `${document} So luong sach da xoa`});
    }catch(error){
        return next(new ApiError(500, 'Loi. Khi dang xoa tat ca sach'));
    }
}

