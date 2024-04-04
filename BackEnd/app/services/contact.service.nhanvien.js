const { ObjectId } = require('mongodb');

class ContactServiceNhanVien{
    constructor(client){
        this.Contact = client.db().collection('NhanVien'); //Kết nối đến bảng nhân viên
    }

    //Kiểm tra IDcó tồn tại hay chưa [Nhân viên]
    

    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [Nhân viên]
    async newID_nhanvien(){
        //Đếm số document rồi dựa trên số lượng trên để
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm nhân viên. Khi Tạo thông tin nhân viên
    async themNhanVien(payload){
        const newID =  await this.newID_nhanvien()
        const input = {
            idNhanVien: newID,
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

    //2.Tìm thông tin nhân viên dựa trên ID
    async TimThongTinNhanVien(ID){
        const result = await this.Contact.findOne({ idNhanVien: Number(ID) });
        return result;
    }

    //3. Xóa thông tin nhân viên dựa trên ID
    async XoaNhanVienID(ID){
        return await this.Contact.deleteOne({idNhanVien:Number(ID)});
    }

    //4. Cập nhật thông tin nhân viên dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {idNhanVien:Number(ID)},
            {$set: DauVao},
            {returnDocument: "after"}
        );
        return response;
    }

    //5. Danh sách nhân viên
    async DanhSachNhanVien(){
        return  await this.Contact.find({}).toArray();
    }

    //6. Xóa tất cả nhân viên
    async XoaHetNhanVien(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

    //7. Tìm nhân viên thông qua tên
    async TimThongTinHoTenNhanVien(name){
        const result = await this.Contact.findOne({hoTen:name});
        return result;
    }
}

module.exports = ContactServiceNhanVien;