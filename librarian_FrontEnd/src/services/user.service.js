import createApiClient from './api.service';

//Quyền người dùng -- [Còn dang dở]
class UserRights{

    //0.Mặc định thông tin này là vào phần người dùng có thể chưa đăng ký hoặc đăng nhập
    constructor(baseURL = "http://localhost:3001/user"){
        this.api = createApiClient(baseURL);
    }
    //1.Lấy tất cả sách 
    async AllBooks(){
        return (await this.api.get('/books')).data;
    }

    //2.Lấy sách dựa trên id sách
    async getBook(id){
        return (await this.api.get(`/book/${id}`)).data;
    }

    //3.Tạo tài khoản
    async Register(data){
        return (await this.api.post('/register/',data)).data;
    }
    //4.Chỉnh sửa thông tin cá nhân
    async CustomizeÌnomation(id, data){
        return (await this.api.put(`/edit/docgia/${id}`,data)).data;
    }
    
    //5.Đăng ký mượn sách
    async BorrowBook(idsach,iddocgia){
        return (await this.api.put(`/borrowBook/${idsach}/reader/${iddocgia}`)).data;
    }

    //6. Lấy số lượng sách dựa trên ID sách
    async TotalNumberOfBooks(){
        return (await this.api.get('/totalnumberofbooks/')).data;
    }

    //7. Lấy tổng tất cả số lượng sách
    async EntireNumberOfBooksinTheLibrary(){
        return (await this.api.get('/entirenumberofbooksinthelibrary/')).data;
    }

    //8.Lấy số lượng nhà xuất bản
    async TotalNumberOfPublisher(){
        return (await this.api.get('/totalnumberofpublisher/')).data;
    }

    //9.Lấy số lượng tác giả
    async TotalNumberOfAuthor(){
        return (await this.api.get('/totalnumberofpublisher/')).data;
    }

    //10.Lấy số lượng sách dựa trên ID
    async NumberOfBooks(id){
        return (await this.api.get(`/NumberOfBooks/${id}`)).data;
    }

    //11. Lấy nhưng loại sách mà người dùng đã mượn
    async TheUserBorrowedTheBooks(id){
        return (await this.api.get(`/theuserborrowedthebook/${id}`)).data;
    }
}

export default new UserRights();