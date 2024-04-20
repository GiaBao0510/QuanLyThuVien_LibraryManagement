const config = {
    app:{
        port: 3001|| process.env.PORT,
    },
    db:{
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/QuanLyThuVien'
    }
};

module.exports = config; //Xuất đối tượng vào module