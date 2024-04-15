const {MongoClient} = require('mongodb');
require('mongodb').MongoClient;
let moment = require('moment');
let bcrypt = require('bcrypt');

const Bang = "QuanLyThuVien";
const duongdan = `mongodb://localhost:27017/${Bang}`;

let client = null,
    db = null,
    collection = null;

async function main(){
    client = await MongoClient.connect(duongdan);
    db = await client.db();
    collection = await db.collection('DocGia');
    TaiKhoan = await db.collection('TaiKhoan');

    TheoDoiMuonSach = await db.collection('TheoDoiMuonSach');
    Sach = await db.collection('Sach');
    ChiTietSach = await db.collection('ChiTietSach');
    // let ds = [1,"35", "50"];
    // console.log(await IDCuoi());
    //ThemChiTietSach();
    //collection.deleteMany();

    //1-N
    //await SoLuongSach_ID("Số đỏ");
    
    //await DSchitiet();
   //console.log(await SoLuongSach_ID(2));
   //await SoLuongSach_ID(1);
   //console.log(await DoDai());
   
   let today = new Date();
   let limitDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 32);
    let currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // console.log(limitDay)
    // console.log(currentDay )
    // console.log((limitDay- currentDay)/(1000*3600*24) );
    // console.log(String( limitDay))
    // console.log(String( currentDay))
    // console.log(Date.parse(String( limitDay)))
    // console.log(Date.parse(String( currentDay)))
    // console.log( Date( Date.parse(String( limitDay))))
    // console.log( Date( Date.parse(String( currentDay))))
   
    // console.log('--------------------')
    // console.log( limitDay.toLocaleDateString());
    // console.log( currentDay.toLocaleDateString());
    // console.log( Date.parse(limitDay.toLocaleDateString()));
    // console.log( Date.parse(currentDay.toLocaleDateString()));
    // console.log( moment(Date.parse(limitDay.toLocaleDateString())).format("DD/MM/YYYY"))

   console.log(await MuonSach("BaoOk",1) );

   
}

//Cộng ngày


async function SoLuongSach_ID(ID){
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
                "idSach": ID,
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

    return JoinData;
}

//Lấy ID cuối cùng của collection
async function newID_ban(){
    const response = await collection.find({},{Ban:1,_id:0}).sort({Ban:-1}).limit(1);
    const [{Ban}] = await response.toArray();
    return Number(Ban);
}

//Cập nhật tất cả
async function DSchitiet(){
    const response = await collection.find({});
    const result = await response.toArray();

    values= result.map(i => i.Ban);
    for( let i in values){
        const input={
            Ban: Number(i),
            STT: 0,
            ngayMuon: null,
            ngayTra: null,
            phi: 2000,
            idDocGia: null,
            idNhanVien: null
        };
        await TheoDoiMuonSach.insertOne(input);
        //console.log(i)
    }
}

async function DoDai(){
    let dodai =  await collection.find({});
    dodai = await dodai.toArray();
    return dodai.length;
}

async function LayThongTinNhungBanSachDaMuon(){
    let Ifor = await TheoDoiMuonSach.aggregate([
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
                idSach: "$TheoDoiSach.idSach",
                ngayMuon: "$TheoDoiSach.ngayMuon",
                ngayTra: "$TheoDoiSach.ngayTra",
                _id:0
            }
        }

    ]).toArray();
    
    return Ifor;
}



async function MuonSach(iddocgia, idsach){

    //Kiểm tra Id sách có tồn tại hay chua
    let BanChuaMuon = -1;
    let TimSach = await Sach.findOne({idSach: idsach});
    if(!TimSach){
        return false;
    }
    
    //Tìm bản sách dựa trên IDsach trong bảng ChiTietSach
    let timBanSach = await ChiTietSach.find({idSach: idsach}, {_id:0, Ban:1, idSach:0} ).toArray();
    timBanSach = await timBanSach.map(item => item.Ban);

    console.log(timBanSach);
    console.log("-----------------------");
    let find = 0;
    for (let i =0; i < timBanSach.length; i++){
        console.log(timBanSach[i]);
        //TÌm kiếm só thứ tự sách chưa mượn đầu tiên
        const timBanChuaMuon = await TheoDoiMuonSach.findOne({Ban:timBanSach[i], STT:0 });
        console.log(timBanChuaMuon);
        if(timBanChuaMuon != null){
            BanChuaMuon = timBanSach[i];
            break;
        }
    }
    console.log("-------------KQ----------");
    //Nếu không tìm thấy
    if(find == 0){
        return false;
    }
    return BanChuaMuon;
}



//===========
main();