const MongoDB = require('../utils/mongoDB.util');
const ApiError = require('../api-error');
const { Object } = require('mongodb');
const collection = MongoDB.client.db().collection('DocGia');

//0.Lấy ID người đọc cuối
async function newID_DocGia(){
    /*
        Giải thích:
            - find({},{id:1, _id:0}):
                + tham số thứ 1 {}: là truy vấn tất cả document trong collection
                + tham số thứ 2 {id:1, _id:0}: id là chỉ hiển thị 1 thuộc tính idDocGia, _id:0 là không hiển thị thuộc tính _id
            - sort({id:-1}): với tham số {id:-1}. Có nghĩa là tìm từ dưới lên. Nếu là 1 thì ngược lại
            - limit(1): hàm này dùng để giới hạn hiển thị dựa trên tham số.
    */
    let response = await collection.countDocuments({});
    return kq + 1; 
} 

//1. Thêm người đọc
const addReader = async(req, res) => {
    let idDocGia = newID_DocGia();
    const { username,password,name,position,phone    } = req.body;
}