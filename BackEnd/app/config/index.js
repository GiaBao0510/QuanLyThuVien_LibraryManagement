const config = {
    app:{
        port: 3000|| process.env.PORT,
    },
    db:{
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/QuanLyThuVien'
    }
};

module = config; //Xuất đối tượng vào module