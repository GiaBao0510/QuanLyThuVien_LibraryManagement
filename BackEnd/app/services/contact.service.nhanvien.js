const { ObjectId } = require('mongodb');
var bcrypt = require('bcrypt');
class ContactServiceNhanVien{
    constructor(client){
        this.Contact = client.db().collection('NhanVien'); //Kết nối đến bảng nhân viên
        this.TaiKhoan = client.db().collection('TaiKhoan');
        this.DocGia = client.db().collection('DocGia');
    }

    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [Nhân viên]
    async newID_nhanvien(){
        //Đếm số document rồi dựa trên số lượng trên để
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm nhân viên. Khi Tạo thông tin nhân viên
    async themNhanVien(payload){
        //Tìm thử email Trên DocGia Và nhân viên có tồn tại hay chưa nếu tồn tại thì tạo ngược lại thì không thể tạo
        let TimEmailUser =  await this.DocGia.findOne({Email: payload.Email});
        let TimEmailStaff = await this.Contact.findOne({Email: payload.Email});

        //Đã tồn tại tài khoản
        if(TimEmailUser || TimEmailStaff){
            return false;
        }

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

        //Băm mật khẩu
        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);    //Việc sử dụng salt khi băm mật khẩu giúp tăng cường bảo mật. Salt là một chuỗi ký tự ngẫu nhiên được thêm vào mật khẩu trước khi băm.
        let PW = await bcrypt.hash(payload.password, salt);

        const account = {
            account: payload.Email,
            password: PW,
            role: 1
        }

        await this.Contact.insertOne(input);
        await this.TaiKhoan.insertOne(account);
        return true;
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

    //8.Lấy số lượng nhân viên
    async SoLuongNhanVien(){
        let laySoluong = await this.Contact.find({});
        laySoluong = await laySoluong.toArray();
        return laySoluong.length;
    }
}

module.exports = ContactServiceNhanVien;