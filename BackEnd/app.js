// add module
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const ApiError = require('./app/api-error');
const MongoDB = require('./app/utils/mongoDB.util');
const ThucHienDangNhap = require('./app/services/login.service');

var bodyParser = require('body-parser');

const staff = require('./app/routes/nhanvien.router');
const user = require('./app/routes/docgia.router');
const admin = require('./app/routes/admin.router');

const app = express();

app.use(
    session({
        secret: "somescret",
        cookie: {maxAge: 60000},
        resave: true,
        saveUninitialized: false,
    })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/staff', staff);
app.use('/user', user);
app.use('/admin', admin);

//Đăng nhập
app.post('/login',
    async(req, res, next) => {
        try{
            const {account, password} = req.body;

            //Nếu người dùng nhập thiếu 1 trường cũng bão lỗi
            if( account && password ){
                //Nếu người dùng đã đăng nhập rồi
                if(req.session.authenticated){
                    return res.json(session);
                }else{
                    const DN = new ThucHienDangNhap(MongoDB.client);
                    const account = await DN.DangNhapVaoTaiKhoan(req.body);
                    if(account == -1){
                        return res.status(401).send({message: "Tài khoản không tồn tại"});
                    }account
                    if(account === false){
                        return res.status(401).send({message: "Mật khẩu sai"});
                    }
                    req.session.authenticated = true;
                    //req.session.id = 
                    req.session.user = account;
                    req.session.ID = account.id;
                    req.session.role = account.role;
                    req.session.code = "GOOD_REQUEST";
                    res.json(req.session);
                    return res.status(200).json({id: account.id, role: account.role});
                }
            }else{
                return res.status(403).json({msg: "Thiếu thông tin đăng nhập"})
            }
            
        }catch(error){
            return next( new ApiError(500, `Mot loi xuat hien khi dang nhap xuat hien ben server - ${error.message}`) );
        }
    }
);

//Thoát
app.get('/exit', function(req, res){
    req.session.destroy();
})

//Xử lý lỗi từ phía client
app.use(( req, res, next) => {
    return next( new ApiError(404, "Resource not found ^^"));
});

//Xử lý lloix phía server
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error",
    });
});

module.exports = app;