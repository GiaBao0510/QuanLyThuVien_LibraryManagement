const { ObjectId } = require('mongodb');
var bcrypt = require('bcrypt');
class ContactServiceDocGia{
    constructor(client){
        this.Contact = client.db().collection('DocGia'); //Kết nối đến bảng đọc giả
        this.TaiKhoan = client.db().collection('TaiKhoan');
        this.DocGia = client.db().collection('DocGia');
        this.NhanVien = client.db().collection('NhanVien');
    }

    //Kiểm tra IDcó tồn tại hay chưa [đọc giả]
    
    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [đọc giả]
    async newID_DocGia(){
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm đọc giả. Khi Tạo thông tin đọc giả
    async themDocGia(payload){
        //Tìm thử email Trên DocGia Và nhân viên có tồn tại hay chưa nếu tồn tại thì tạo ngược lại thì không thể tạo
        let TimEmailUser =  await this.DocGia.findOne({Email: payload.Email});
        let TimEmailStaff = await this.NhanVien.findOne({Email: payload.Email});

        //Đã tồn tại tài khoản
        if(TimEmailUser || TimEmailStaff){
            return false;
        }

        //Ngược lại thì tạo
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

        //Băm mật khẩu
        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);    //Việc sử dụng salt khi băm mật khẩu giúp tăng cường bảo mật. Salt là một chuỗi ký tự ngẫu nhiên được thêm vào mật khẩu trước khi băm.
        let PW = await bcrypt.hash(payload.password, salt);

        const account = {
            account: payload.Email,
            password: PW,
            role: 2
        }
        await this.Contact.insertOne(input);
        await this.TaiKhoan.insertOne(account);
        return true;
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

    //8.Đăng nhập
    async DangNhap(input){
        const checkAcc = await this.TaiKhoan.findOne({account: input.account});
        //Không tìm thấy tài khoản
        if(!checkAcc){
            return false;
        }
        
            //So sánh 2 mật khẩu
        const isMatch = await bcrypt.compare(input.password, checkAcc.password);
        //không timg thấy mật khẩu
        if(!isMatch){
            return false;
        }
    
        //Nếu tìm được mật khẩu thì trả về vai trò người dùng
        return checkAcc.role;
    }

    //9. Lấy số lượng đọc giả
    async SoLuongDocGia(){
        let laySoluong = await this.Contact.find({});
        laySoluong = await laySoluong.toArray();
        return laySoluong.length;
    }

}

module.exports = ContactServiceDocGia;