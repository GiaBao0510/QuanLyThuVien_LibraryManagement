const { ObjectId } = require('mongodb');

class ContactServiceSach{
    constructor(client) {
        this.Contact = client.db().collection('Sach');
        this.ChiTietSach = client.db().collection('ChiTietSach'); // Khai báo ChiTietSach là thuộc tính của class
        this.TheoDoiMuonSach = client.db().collection('TheoDoiMuonSach');
        this.DocGia = client.db().collection('DocGia');
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
        const response = await this.Contact.find({});
        const result = await response.toArray();
        return result;
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
    async CapNhatMuonSach( IDdocgia, Ban){
        //Chuyển đổi về dạng số nguyên
        IDdocgia = parseInt(IDdocgia);
        Ban = parseInt(Ban);

        //ĐK: Tìm xem đọc giả và bản sách mượn có tồn tại không
        let timDocGia = await this.DocGia.findOne({idDocGia: IDdocgia});
        let timBanSach = await this.ChiTietSach.findOne({Ban: Ban});
        
        if(!timDocGia|| !timBanSach){
            return false;
        }

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
            {Ban: Ban},
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

        //ĐK đầu vào
        if(!input || Object.keys(input).length === 0){
            return false;
        }

        const response = await this.TheoDoiMuonSach.findOneAndUpdate(
            {Ban: Ban },
            {$set: input},
            {returnDocument: "after"}
        );
        return true;
    }

    //8. Lấy tổng số lượng sách dựa trên Tên sách
    //9. Lấy tổng sơ lượng sách dựa trên ID tình trạng
    //9. Lấy tổng sơ lượng sách dựa trên Tên tình trạng
}

module.exports = ContactServiceSach;