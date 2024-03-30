const {MongoClient} = require('mongodb');
require('mongodb').MongoClient;

const Bang = "QuanLyThuVien";
const duongdan = `mongodb://localhost:27017/${Bang}`;

let client = null,
    db = null,
    collection = null;

async function main(){
    client = await MongoClient.connect(duongdan);
    db = await client.db();
    collection = await db.collection('Sach');

    // let ds = [1,"35", "50"];
    // console.log(await IDCuoi());
    //ThemChiTietSach();
    //collection.deleteMany();

    //1-N
    await SoLuongSach_ID("Số đỏ");
}

async function IDCuoi(){
    const response = await collection.find();
    // const ds = [];
    // while(await response.hasNext()){
    //     ds.push( await response.next());
    // }
    return response.toArray();

}

async function ThemChiTietSach(){

    let dem = 0
    for(let soLuong = 0 ; soLuong<25; soLuong++){
        const DuLieu = {
            "Ban": dem,
            "idSach": 1
        };
        const result = await collection.insertOne(DuLieu);
        dem+=1;
    }
    for(let soLuong = 0 ; soLuong<30; soLuong++){
        const DuLieu = {
            "Ban": dem,
            "idSach": 2
        };
        const result = await collection.insertOne(DuLieu);
        dem+=1;
    }
    for(let soLuong = 0 ; soLuong<50; soLuong++){
        const DuLieu = {
            "Ban": dem,
            "idSach": 3
        };
        const result = await collection.insertOne(DuLieu);
        dem+=1;
    }
}

async function SoLuongSach_ID(name){
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
                tenSach: name,
            }
        },
        {
            $project:{
                tenSach: 1, // Chỉ cần ghi tên trường
                Ban: "$KetQua.Ban",
                _id: 0
            }
        }  
       
    ]);

    // In kết quả ra console
    for await (const doc of JoinData) {
        console.log(doc);
    }

    //return JoinData.length;
}

//===========
main();