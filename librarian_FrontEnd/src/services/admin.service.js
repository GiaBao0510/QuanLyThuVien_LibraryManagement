import createApiClient from './api.service';

//Quyền admin -- [Còn dang dở]
class AdminRights{

    //0. Mặc định
    constructor(baseURL = "/admin"){
        this.api = createApiClient(baseURL);
    }

        //Add
    //1.1 Thêm nhân viên
    async AddEmployee(data){
        return (await this.api.post('/add/staff/',data)).data;
    }

    //1.2 Thêm sách
    async AddBook(data){
        return ( await this.api.post('/add/book/',data) ).data;
    }

    //1.3 Thêm tác giả
    async AddBook(data){
        return ( await this.api.post('/add/author/',data) ).data;
    }

    //1.4 Thêm nhà xuất bản
    async AddBook(data){
        return ( await this.api.post('/add/publisher/',data) ).data;
    }

    //1.5 Thêm đọc giả
    async AddBook(data){
        return ( await this.api.post('/add/reader/',data) ).data;
    }

        //Liệt kê
    //2.1 Danh sách sách
    async AllBook(){
        return (await this.api.get('/books')).data;
    }

    //2.2 Danh sách đọc giả
    async AllReader(){
        return (await this.api.get('/Readers')).data;
    }

    //2.3 Danh sách tác giả
    async AllAuthor(){
        return (await this.api.get('/Authors')).data;
    }

    //2.4 Danh sách nhà xuất bản
    async AllPublisher(){
        return (await this.api.get('/Publishers')).data;
    }

    //2.5 Danh sách nhân viên
    async AllEmployee(){
        return (await this.api.get('/Employees')).data;
    }

        //Tìm đối tượng dựa trên ID
    //3.1 Sách
    async getBook(id){
        return (await this.api.get(`/book/${id}`)).data;
    }
    async deleteBook(id){
        return (await this.api.delete(`/book/${id}`)).data;
    }
    async updateBook(id, data){
        return (await this.api.put(`/book/${id}`,data)).data;
    }

    //3.2 Đọc giả
    async getReader(id){
        return (await this.api.get(`/Reader/${id}`)).data;
    }
    async deleteReader(id){
        return (await this.api.delete(`/Reader/${id}`)).data;
    }
    async updateReader(id, data){
        return (await this.api.put(`/Reader/${id}`,data)).data;
    }

    //3.3 Nhân viên
    async getEmployee(id){
        return (await this.api.get(`/Employee/${id}`)).data;
    }
    async deleteEmployee(id){
        return (await this.api.delete(`/Employee/${id}`)).data;
    }
    async updateEmployee(id, data){
        return (await this.api.put(`/Employee/${id}`,data)).data;
    }

    //3.4 Nhà xuất bản
    async getPublisher(id){
        return (await this.api.get(`/Publisher/${id}`)).data;
    }
    async deletePublisher(id){
        return (await this.api.delete(`/Publisher/${id}`)).data;
    }
    async updatePublisher(id, data){
        return (await this.api.put(`/Publisher/${id}`,data)).data;
    }

    //3.4 tác giả
    async getAuthor(id){
        return (await this.api.get(`/Author/${id}`)).data;
    }
    async deleteAuthor(id){
        return (await this.api.delete(`/Author/${id}`)).data;
    }
    async updateAuthor(id, data){
        return (await this.api.put(`/Author/${id}`,data)).data;
    }

        //Xóa tất cả
    //4.1 xóa hết sách
    async DeleteAllBook(){
        return (await this.api.delete('/deleteAllBook')).data;
    }

    //4.2 xóa hết nhân viên
    async DeleteAllEmployee(){
        return (await this.api.delete('/deleteAllEmployee')).data;
    }

    //4.3 xóa hết đọc giả
    async DeleteAllReader(){
        return (await this.api.delete('/deleteAllReader')).data;
    }

    //4.4 xóa hết nhà xuất bản
    async DeleteAllPublisher(){
        return (await this.api.delete('/deleteAllPublisher')).data;
    }

    //4.5 xóa hết tác giả
    async DeleteAllAuthor(){
        return (await this.api.delete('/deleteAllAuthor')).data;
    }

        //5. Truy vấn
    //5.1  Tổng số lượng sách dựa trên ID sach
    async NumberOfBooks(id){
        return (await this.api.get(`/NumberOfBooks/${id}`)).data;
    }

    //5.2 Cập nhật theo dõi sách dựa trên STT bản
    async UpdateStateBook(stt, data){
        return (await this.api.put(`/updatestatebook/${stt}`, data)).data;
    }

    //5.3 Lấy số lượng bản sách dựa trên tình trạng
    async NumberOfBookStates(stt){
        return (await this.api.get(`/numberofbookstates/${stt}`)).data;
    }

    //5.4 Thêm số lượng sách dựa trên ID sách
    async AbbNumberOfBooks(id, number){
        return (await this.api.get(`/book/${id}/quantity/${number}`)).data;
    }
}

export default new AdminRights();