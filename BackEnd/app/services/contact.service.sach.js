const { ObjectId } = require('mongodb');

class ContactServiceSach{
    constructor(client) {
        this.Contact = client.db().collection('Sach');
        this.ChiTietSach = client.db().collection('ChiTietSach'); // Khai báo ChiTietSach là thuộc tính của class
        this.TheoDoiMuonSach = client.db().collection('TheoDoiMuonSach');
        this.DocGia = client.db().collection('DocGia');
        this.TinhTrang = client.db().collection('TinhTrang');
        this.TheLoai = client.db().collection('TheLoai');
    }

    //Kiểm tra IDcó tồn tại hay chưa [Nhân viên]
    
    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [Nhân viên]
    async newID_Sach(){
        const response = await this.Contact.countDocuments({});
        return response+1; 
    }

    //1.Thêm nhân viên. Khi Tạo thông tin nhân viên
    async themSach(payload){
        const input = {
            idSach: await this.newID_Sach(),
            tenSach: payload.tenSach,
            MoTa: payload.MoTa,
            namXuatban: payload.namXuatban,
            phi: payload.phi,
            idTheLoai: payload.idTheLoai,
            idNXB: payload.idNXB,
            IDtacgia: payload.IDtacgia
        };
        const result = await this.Contact.insertOne( input);
        return result.value;
    }

    //2.Tìm thông tin nhân viên dựa trên ID
    async TimThongTinSach(ID){
        const result = await this.Contact.findOne({idSach: Number(ID)});
        return result;
    }

    //3. Xóa thông tin nhân viên dựa trên ID
    async XoaSachID(ID){
        return await this.Contact.deleteOne({idSach:Number(ID)});
    }

    //4. Cập nhật thông tin nhân viên dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {idSach:Number(ID)},
            {$set: DauVao},
            {returnDocument: "after"}
        );
        return response;
    }

    //5. Danh sách nhân viên
    async DanhSachSach(){
        let BoSach = await this.Contact.aggregate([
            {
                $lookup:{
                    from:"TheLoai",
                    localField: "idTheLoai",
                    foreignField:"idTheLoai",
                    as:"TheLoaiSach"
                }
            },{
                $unwind: "$TheLoaiSach"
            },
            {
                $lookup:{
                    from:"NhaXuatBan",
                    localField: "idNXB",
                    foreignField:"idNXB",
                    as:"NhaXuatBanSach"
                }
            },{
                $unwind: "$NhaXuatBanSach"
            },
            {
                $lookup:{
                    from:"TacGia",
                    localField: "IDtacgia",
                    foreignField:"IDtacgia",
                    as:"TacGiaSach"
                }
            },{
                $unwind: "$TacGiaSach"
            },
            {
                $project:{
                    _id:0,
                    idSach: "$idSach",
                    Sach: "$tenSach",
                    MoTa: "$MoTa",
                    namXuatBan: "$namXuatBan" ,
                    phi: "$phi",
                    idTheLoai: "$idTheLoai",
                    idNXB: "$idNXB",
                    IDtacgia: "$IDtacgia",
                    hinh: "$hinh",
                    TheLoai: "$TheLoaiSach.tenTheLoai",
                    NhaXuatBan: "$NhaXuatBanSach.tenNXB",
                    TacGia: "$TacGiaSach.hoTen"
                }
            }
        ]).toArray();
        return BoSach;
    }

    //6. Xóa tất cả nhân viên
    async XoaHetSach(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    };

    //7. Tìm sách dựa trên tên sách
    async TimTenSach(TenSach){
        return await this.Contact.findOne({tenSach:TenSach});
    };

    //8. Lấy tổng số lượng sách dựa trên ID sách
    async TongSoLuongSach_ID(ID){

        const JoinData = await this.Contact.aggregate([
            {
                $lookup: {
                    from: "ChiTietSach",
                    localField: "idSach",
                    foreignField: "idSach",
                    as: "KetQua",
                },
            },
            {
                $unwind: "$KetQua",
            },
            {
                $match: {
                    idSach: Number(ID),
                }
            },
            {
                $project:{
                    tenSach: 1, // Chỉ cần ghi tên trường
                    Ban: "$KetQua.Ban",
                    _id: 0
                }
            }     
        ]).toArray();
        return JoinData.length ;
    };

    //9. Cập nhật tình trạng mượn sách
    async CapNhatMuonSach( IDdocgia, IDSach){

        //Chuyển đổi về dạng số nguyên
        IDdocgia = parseInt(IDdocgia);
        IDSach = parseInt(IDSach);

        //ĐK: Tìm xem đọc giả và bản sách mượn có tồn tại không
        let timDocGia = await this.DocGia.findOne({idDocGia: IDdocgia});
        let timSach = await this.Contact.findOne({idSach: IDSach});
        
        if(!timDocGia|| !timSach){
            return false;
        }

        //1.Lấy Bản sách dựa trên sách xem có người mượn hay không
            //1.1Tìm bản sách dựa trên IDsach trong bảng ChiTietSach
        let timBanSach = await this.ChiTietSach.find({idSach: IDSach}, {_id:0, Ban:1, idSach:0} ).toArray();
        timBanSach = await timBanSach.map(item => item.Ban);

        let BanChuaMuon = -1;
        for (let i =0; i < timBanSach.length; i++){
            //TÌm kiếm só thứ tự sách chưa mượn đầu tiên
            const timBanChuaMuon = await this.TheoDoiMuonSach.findOne({Ban:timBanSach[i], STT:0});
            if(timBanChuaMuon != null){
                BanChuaMuon = parseInt(timBanSach[i]);
                break;
            }
        }

            //1.2Nếu không tìm thấy
        if(BanChuaMuon < 0){
            return -1;
        }

        //2.Định dạng ngày
        let today = new Date();
        let limitDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        let currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        //Chuyển ngày về chuỗi
        currentDay = currentDay.toLocaleDateString();
        limitDay = limitDay.toLocaleDateString();
        
        const input = {
            STT: 1,
            idDocGia: IDdocgia,
            ngayMuon: currentDay,
            ngayTra: limitDay
        };
        await this.TheoDoiMuonSach.findOneAndUpdate(
            {Ban: BanChuaMuon},
            {$set:input},
            {returnDocument: "after"}
        ).value;

        return true;
    };

    //10. Thêm số lượng bản sách dựa trên ID sách Với cập nhập thêm tình trạng sách này chưa được mượn
    async ThemSoLuongBanSach_ID(number, ID) {
        let dem = 0, soLuong = Number(number);
        while(dem < soLuong){
            let DoDai = await this.ChiTietSach.find({});
            DoDai = await DoDai.toArray();

            //Nếu độ dài == 0 thì tự động thêm
            if( Number( DoDai.length) == 0){
                const input = {
                    Ban: 0,
                    idSach: Number(ID)
                };
                const ChuaMuon = {
                    Ban: 0,
                    STT: 0,
                    ngayMuon: null,
                    ngayTra: null,
                    phi: 2000,
                    idDocGia: null  
                };
                await this.ChiTietSach.insertOne(input);
                await this.TheoDoiMuonSach.insertOne(ChuaMuon);
            }else{
                let LayIDcuoi = await this.ChiTietSach.find({}, { Ban: 1, _id: 0 }).sort({ Ban: -1 }).limit(1);
                let [{ Ban }] = await LayIDcuoi.toArray();
                const input = {
                    Ban: Number(Ban) + 1,
                    idSach: Number(ID)
                };
                const ChuaMuon = {
                    Ban: Number(Ban) + 1,
                    STT: 0,
                    ngayMuon: null,
                    ngayTra: null,
                    phi: 2000,
                    idDocGia: null 
                };
                await this.ChiTietSach.insertOne(input);
                await this.TheoDoiMuonSach.insertOne(ChuaMuon);
            }
            dem++;
        }
        if(dem == soLuong){
            return true;
        }
        return false;
    };
    
    //11. Cập nhật tình trạng sách
    async CapNhatTinhTrangSach(Ban , input){
        Ban = parseInt(Ban);
        //ĐK: tìm bản sách xem có tồn tại hay không
        let timBanSach = await this.TheoDoiMuonSach.findOne({Ban: Ban});
        if(!timBanSach){
            return false;
        }

        //ĐK1: Kiểm tra bản sách đã tồn tại hay chưa
        if(!input || Object.keys(input).length === 0){
            return false;
        }

        //DDk: Kiểm tra bản sách đó có người mượn hay chưa
        //let kiemTraMuonBanSach = await this

        const response = await this.TheoDoiMuonSach.findOneAndUpdate(
            {Ban: Ban },
            {$set: input},
            {returnDocument: "after"}
        );
        return true;
    };

    //12. Lấy số lượng sách dựa trên Tình trạng
    async DemSoLuongSachDuaTrenTinhTrang(STT){
        STT = parseInt(STT);
        //ĐK: Tìm tình trạng này có tồn tại không
        let timTinhTrang = await this.TinhTrang.findOne({STT: STT});
        if(!timTinhTrang){
            return false;
        }

        let response = await this.TheoDoiMuonSach.find({STT: STT});
        response = await response.toArray();
        return response.length;
    }

    //13. Liệt kê thông tin những quyển sách đã mượn và thông tin người mượn
    async LietKeThongTinSachDaMuon(){
        let Ifor = await this.TheoDoiMuonSach.aggregate([
            {
                $lookup:{
                    from: "DocGia",
                    localField: "idDocGia",
                    foreignField: "idDocGia",
                    as:"TheoDoiDocGia",
                }
            },
            {
                $unwind: "$TheoDoiDocGia",
            },
            {
                $lookup:{
                    from:"ChiTietSach",
                    localField: "Ban",
                    foreignField: "Ban",
                    as:"TheoDoiChiTietSach",
                }
            },
            {
                $unwind:"$TheoDoiChiTietSach",
            },
            {
                $lookup:{
                    from: "Sach",
                    localField: "TheoDoiChiTietSach.idSach",
                    foreignField: "idSach",
                    as:"TheoDoiSach",
                }
            },
            {
                $unwind:"$TheoDoiSach",
            },
            {
                $project:{
                    Sach: "$TheoDoiSach.tenSach",
                    Ban: "$TheoDoiChiTietSach.Ban",
                    hoTen: "$TheoDoiDocGia.hoTen",
                    idDocGia: "$TheoDoiDocGia.idDocGia",
                    ngayMuon: "$ngayMuon",
                    ngayTra: "$ngayTra",
                    idSach: "$TheoDoiSach.idSach",
                    
                    _id:0,
                }
            }
    
        ]).toArray();
        
        return Ifor;
    }

    //14. Số lượng sách
    async SoLuongSach(){
        let laySoluong = await this.Contact.find({});
        laySoluong = await laySoluong.toArray();
        return laySoluong.length;
    }

    //15. Tổng Số lượng sách trong thư viện
    async ToanBoSoLuongSachTrongThuVien(){
        let getSoluong = await this.ChiTietSach.find({});
        getSoluong = await getSoluong.toArray();
        return getSoluong.length;
    }

    //16. Lấy danh sách thể loại sách
    async DanhSachTheLoaiSach(){
        const response = await this.TheLoai.find({});
        const result = await response.toArray();
        return result;
    }

    //17. kiểm tra xem sách này có bản nào đã mượn hay chưa dựa trên  ID sách
    async KiemTraSachNayDaCoBanNaoMuonChua(id){
        id = parseInt(id);
        let checkBorrow = await this.ChiTietSach.aggregate([
            {
                $lookup:{
                    from:"TheoDoiMuonSach",
                    localField: "Ban",
                    foreignField:"Ban",
                    as:"TheoDoiChiTietSach"
                }
            },{
                $unwind: "$TheoDoiChiTietSach",
            },
            {
                $match: {
                    idSach: id,
                    "TheoDoiChiTietSach.STT":1
                }
            },
            {
                $project:{
                    _id:0,
                    idSach:id,
                    Ban: "$TheoDoiChiTietSach.Ban"
                }
            }
        ]).toArray();
        return (checkBorrow.length > 0) ? true:false;
    }

    //18. xác nhận trả sách
    async CapNhatTraSach(soBan){
        let LaysoBan = parseInt(soBan);
        const input={
            STT: 0,
            ngayMuon: null,
            ngayTra: null,
            idDocGia:null
        };

        //Kiểm tra ban sách có tồn tại không
        let TimSoBanSach = await this.TheoDoiMuonSach.findOne({Ban: LaysoBan});
        if(!TimSoBanSach){
            return false; 
        }

        //Thục hiện trả
        await this.TheoDoiMuonSach.findOneAndUpdate(
            {Ban: LaysoBan},
            {$set: input},
            {returnDocument: "after"}
        );
        return true; 
    }

    //19. Lấy thông tin sách mượn của người dùng
    async NhungQuyenSachDaMuonNguoiDung(id) {
        id = parseInt(id);
        let ketQua = await this.TheoDoiMuonSach.aggregate([
          {
            $match: {
              idDocGia: id,
            },
          },
          {
            $lookup: {
              from: "ChiTietSach",
              localField: "Ban",
              foreignField: "Ban",
              as: "TheoDoiChiTietSach",
            },
          },
          {
            $unwind: "$TheoDoiChiTietSach",
          },
          {
            $lookup: {
              from: "Sach",
              localField: "TheoDoiChiTietSach.idSach",
              foreignField: "idSach",
              as: "TheoDoiSach",
            },
          },
          {
            $unwind: "$TheoDoiSach",
          },
          {
            $project: {
              _id: 0,
              idDocGia: id,
              Sach: "$TheoDoiSach.tenSach",
              Ban: "$Ban",
              ngayMuon: "$ngayMuon",
              ngayTra: "$ngayTra",
            },
          },
        ]);
      
        ketQua = await ketQua.toArray();
        return ketQua;
      }
    //8. Lấy tổng số lượng sách dựa trên Tên sách
    //9. Lấy tổng sơ lượng sách dựa trên ID tình trạng
    //9. Lấy tổng sơ lượng sách dựa trên Tên tình trạng
}

module.exports = ContactServiceSach;