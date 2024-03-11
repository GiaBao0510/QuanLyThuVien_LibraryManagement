const {MongoClient} = require('mongodb');

class MongoDB{
    //Biến này dùng để kết nối đến MongoDB thông qua uri. Truyền vào
    static connect = async (uri)=>{
        if(this.client) return this.client;
        this.client  = await MongoClient.connect(uri);
        return this.client;
    }
}

module.exports = MongoDB;
