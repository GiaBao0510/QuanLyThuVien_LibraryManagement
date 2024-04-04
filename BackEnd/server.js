const app = require('./app');
const config = require('./app/config');
const MongoDB = require('./app/utils/mongoDB.util');

async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log(" Kết nối đến cơ sở dữ liệu thành công");
        
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch{
        console.log("Kết nối đến cơ sở dữ liệu thất bại", error);
        process.exit();
    }
}

startServer();