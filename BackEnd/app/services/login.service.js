const {ObjectId} = require('mongodb');
var bcrypt = require('bcrypt');
const { checkout } = require('../routes/admin.router');

class DangNhap{
    constructor(client){
        this.TaiKhoan = client.db().collection('TaiKhoan');
        this.DocGia = client.db().collection('DocGia');
        this.NhanVien = client.db().collection('NhanVien');
    }

    //8.Đăng nhập
    async DangNhapVaoTaiKhoan(input){
        let ID = -1;
        const checkAcc = await this.TaiKhoan.findOne({account: input.account});
        //Không tìm thấy tài khoản
        if(!checkAcc){
            return -1;
        }
        
            //So sánh 2 mật khẩu
        const isMatch = await bcrypt.compare(input.password, checkAcc.password);
        //không timg thấy mật khẩu
        if(!isMatch){
            return false;
        }
    
        //Lấy ID người dùng
        if( checkAcc.role == 2){
            ID =  await this.DocGia.findOne({Email: checkAcc.account});
            ID = ID.idDocGia;
        }

        //Lấy ID nhân viên
        if( checkAcc.role == 1){
            ID =  await this.NhanVien.findOne({Email: checkAcc.account});
            ID = ID.idNhanVien;
        }

        //Nếu tìm được mật khẩu thì trả về vai trò người dùng
        return {
            "role":checkAcc.role,
            "id": ID
        };
    }
}

module.exports = DangNhap;