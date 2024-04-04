const { ObjectId } = require('mongodb');
class ContactServiceDocGia{
    constructor(client){
        this.Contact = client.db().collection('DocGia'); //Kết nối đến bảng đọc giả
    }

    //Kiểm tra IDcó tồn tại hay chưa [đọc giả]
    
    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [đọc giả]
    async newID_DocGia(){
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm đọc giả. Khi Tạo thông tin đọc giả
    async themDocGia(payload){
        const newID = await this.newID_DocGia();
        const input = {
            idDocGia: newID,
            hoTen: payload.hoTen,
            gioiTinh: payload.gioiTinh,
            ngaySinh: payload.ngaySinh,
            SDT: payload.SDT,
            Email: payload.Email,
            DiaChi: payload.DiaChi
        };

        const result = await this.Contact.insertOne(input);
        return result.value;
    }

    //2.Tìm thông tin đọc giả dựa trên ID
    async TimThongTinDocGia(ID){
        return await this.Contact.findOne({ idDocGia: Number(ID) });
    }
 
    //3. Xóa thông tin đọc giả dựa trên ID
    async XoaDocGiaID(ID){
        return await this.Contact.deleteOne({idDocGia: Number(ID)});
    }

    //4. Cập nhật thông tin đọc giả dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {idDocGia: Number(ID) },
            {$set: DauVao},
            {returnDocument: "after"}
        );
        return response;
    }

    //5. Danh sách đọc giả
    async DanhSachDocGia(){
        const response = await this.Contact.find({});
        const result = await response.toArray();
        return result;
    }

    //6. Xóa tất cả đọc giả
    async XoaHetDocGia(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

    //7.Tìm thông tin đọc giả dựa trên name
    async TimThongTinHoTenDocGia(name){
        const result = await this.Contact.findOne({hoTen:name});
        return result;
    }
}

module.exports = ContactServiceDocGia;