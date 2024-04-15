const { ObjectId } = require('mongodb');

class ContactServiceNhaXuatban{
    constructor(client){
        this.Contact = client.db().collection('NhaXuatBan'); //Kết nối đến bảng nhà xuất bản
    }

    //Kiểm tra IDcó tồn tại hay chưa [nhà xuất bản]
    

    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [nhà xuất bản]
    async newID_NhaXuatban(){
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm nhà xuất bản. Khi Tạo thông tin nhà xuất bản
    async themNhaXuatban(payload){
        const newID = await this.newID_NhaXuatban()
        const input = {
            idNXB: newID,
            tenNXB: payload.tenNXB,
            SDT: payload.SDT,
            Email: payload.Email,
            DiaChi: payload.DiaChi
        };
        const result = await this.Contact.insertOne(input);
        return result.value;
    }

    //2.Tìm thông tin nhà xuất bản dựa trên ID
    async TimThongTinNhaXuatban(ID){
        const result = await this.Contact.findOne({idNXB:Number(ID)});
        return result;
    }

    //3. Xóa thông tin nhà xuất bản dựa trên ID
    async XoaNhaXuatbanID(ID){
        return await this.Contact.deleteOne({idNXB:Number(ID)});
    }

    //4. Cập nhật thông tin nhà xuất bản dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {idNXB: Number(ID)},
            {$set: DauVao},
            {returnDocument: "after"}
        );
        return response;
    }

    //5. Danh sách nhà xuất bản
    async DanhSachNhaXuatban(){
        const response = await this.Contact.find({});
        const result = await response.toArray();
        return result;
    }

    //6. Xóa tất cả nhà xuất bản
    async XoaHetNhaXuatban(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

    //7. Tìm tên nhà xuất bản
    async TimTenNhaXuatban(TenNXB){
        return await this.Contact.findOne({tenNXB:TenNXB});
    }

    //8. Số lượng nhà xuất bản
    async SoLuongNhaXuatBan(){
        let getSoluong = await this.Contact.find({});
        getSoluong = await getSoluong.toArray();
        return getSoluong.length;
    }
}

module.exports = ContactServiceNhaXuatban;