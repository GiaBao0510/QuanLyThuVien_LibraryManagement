// add module
const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');

var bodyParser = require('body-parser');

const staff = require('./app/routes/nhanvien.router');
const user = require('./app/routes/docgia.router');
const admin = require('./app/routes/admin.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/staff', staff);
app.use('/user', user);
app.use('/admin', admin);

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