const { ObjectId } = require('mongodb');

class ContactServiceTacGia{
    constructor(client){ 
        this.Contact = client.db().collection('TacGia'); //Kết nối đến bảng nhân viên
    }

    //Kiểm tra IDcó tồn tại hay chưa [Nhân viên]
    
    //1.Lấy ID cuối cùng rồi tạo ra ID mới dựa trên ID gần nhất [Nhân viên]
    async newID_TacGia(){
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
    async themTacGia(payload){
        const contact = {
            idTacGia: await this.newID_TacGia(),
            hoTen: payload.hoTen,
            gioiTinh: payload.gioiTinh,
            ngaySinh: payload.ngaySinh,
            DiaChi: payload.DiaChi
        };
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    //2.Tìm thông tin nhân viên dựa trên ID
    async TimThongTinTacGia(ID){
        const result = await this.Contact.findOne({idTacGia:ID});
        return result;
    }

    //3. Xóa thông tin nhân viên dựa trên ID
    async XoaTacGiaID(ID){
        return await this.Contact.deleteOne({idTacGia:ID});
    }

    //4. Cập nhật thông tin nhân viên dựa trên ID
    async CapNhatThongTin(ID, DauVao){
        const response = await this.Contact.findOneAndUpdate(
            {idTacGia:ID},
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
}
module.exports = ContactServiceTacGia;