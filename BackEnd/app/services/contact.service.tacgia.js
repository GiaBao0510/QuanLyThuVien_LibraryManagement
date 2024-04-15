const { ObjectId } = require('mongodb');

class ContactServiceTacGia{
    constructor(client){ 
        this.Contact = client.db().collection('TacGia'); //Kết nối đến bảng nhân viên
    }

    //Kiểm tra IDcó tồn tại hay chưa [Nhân viên]
    
    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [Nhân viên]
    async newID_TacGia(){
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm nhân viên. Khi Tạo thông tin nhân viên
    async themTacGia(payload){
        const input = {
            IDtacgia: await this.newID_TacGia(),
            hoTen: payload.hoTen,
            gioiTinh: payload.gioiTinh,
            ngaySinh: payload.ngaySinh,
            DiaChi: payload.DiaChi
        };
        const result = await this.Contact.insertOne(input);
        return result.value;
    }

    //2.Tìm thông tin nhân viên dựa trên ID
    async TimThongTinTacGia(ID){
        const result = await this.Contact.findOne({IDtacgia: Number(ID)});
        return result;
    }

    //3. Xóa thông tin nhân viên dựa trên ID
    async XoaTacGiaID(ID){
        return await this.Contact.deleteOne({IDtacgia:Number(ID)});
    }

    //4. Cập nhật thông tin nhân viên dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {IDtacgia:Number(ID)},
            {$set: DauVao},
            {returnDocument: "after"}
        );
        return response;
    }

    //5. Danh sách nhân viên
    async DanhSachTacGia(){
        const response = await this.Contact.find({});
        const result = await response.toArray();
        return result;
    }

    //6. Xóa tất cả nhân viên
    async XoaHetTacGia(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

    //7. Tìm tác giả thông qua tên
    async TimTenTacGia(Name){
        return await this.Contact.findOne({hoTen:Name}); 
    }

    //8. Lấy số lượng tác giả
    async TongSoLuongTacgia(){
        let getSoluong = await this.Contact.find({});
        getSoluong = await getSoluong.toArray();
        return getSoluong.length;
    }
}
module.exports = ContactServiceTacGia;