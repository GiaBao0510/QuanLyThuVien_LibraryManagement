const { ObjectId } = require('mongodb');

class ContactServiceSach{
    constructor(client){
        this.Contact = client.db().collection('Sach'); //Kết nối đến bảng nhân viên
    }

    //Kiểm tra IDcó tồn tại hay chưa [Nhân viên]
    
    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [Nhân viên]
    async newID_Sach(){
        /*
            Giải thích:
                - find({},{id:1, _id:0}):
                    + tham số thứ 1 {}: là truy vấn tất cả document trong collection
                    + tham số thứ 2 {id:1, _id:0}: id là chỉ hiển thị 1 thuộc tính id, _id:0 là không hiển thị thuộc tính _id
                - sort({id:-1}): với tham số {id:-1}. Có nghĩa là tìm từ dưới lên. Nếu là 1 thì ngược lại
                - limit(1): hàm này dùng để giới hạn hiển thị dựa trên tham số.
        */
        const response = await this.Contact.find({},{id:1,_id:0}).sort({id:-1}).limit(1);
        while( await response.hasNext()){
            var result = await response.next();
        }
        const kq = result.id + 1;
        return kq; 
    }

    //1.Thêm nhân viên. Khi Tạo thông tin nhân viên
    async themSach(payload){
        const contact = {
            idSach: await this.newID_Sach(),
            tenSach: payload.tenSach,
            MoTa: payload.MoTa,
            TieuDe: payload.TieuDe,
            namXuatban: payload.namXuatban,
            phi: payload.phi
        };
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    //2.Tìm thông tin nhân viên dựa trên ID
    async TimThongTinSach(ID){
        const result = await this.Contact.findOne({idSach:ID});
        return result;
    }

    //3. Xóa thông tin nhân viên dựa trên ID
    async XoaSachID(ID){
        return await this.Contact.deleteOne({idSach:ID});
    }

    //4. Cập nhật thông tin nhân viên dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {idSach:ID},
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
    }

    //7. Tìm sách dựa trên tên sách
    async TimTenSach(TenSach){
        return await this.Contact.findOne({tenSach:TenSach});
    }

    //8. Lấy tổng số lượng sách dựa trên ID sách
    async TongSoLuongSach_ID(id){
        const JoinData = await collection.aggregate([
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
                    "KetQua.idSach": id,
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
    
        return JoinData.length;
    }
    

    //8. Lấy tổng số lượng sách dựa trên Tên sách
    //9. Lấy tổng sơ lượng sách dựa trên ID tình trạng
    //9. Lấy tổng sơ lượng sách dựa trên Tên tình trạng
}

module.exports = ContactServiceSach;