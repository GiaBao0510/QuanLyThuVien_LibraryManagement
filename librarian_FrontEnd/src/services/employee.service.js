import createApiClient from './api.service';

//Quyền nhân viên -- [Còn dang dở]
class EmployeeRights{   
    
    //0. Hàm khởi tạo
    constructor(baseURL = "/staff"){
        this.api = createApiClient(baseURL);
    }

    //1.Danh sách sách
    async AllBooks(){
        return (await this.api.get('/books')).data;
    }

    //2. Danh sách đọc giả
    async AllReaders(){
        return (await this.api.get('/Readers')).data;
    }

    //3. Danh sách tác giả
    async AllAuthors(){
        return (await this.api.get('/Authors')).data;
    }

    //4. Danh sách nhà xuất bản
    async AllPublishers(){
        return (await this.api.get('/Publishers')).data;
    }

    //5. tìm ID sách
    async getBook(id){
        return (await this.api.get(`/book/${id}`)).data;
    }

    //6. tìm ID nhà xuất bản
    async getPublishers(id){
        return (await this.api.get(`/Publishers/${id}`)).data;
    }

    //7. tìm ID đọc giả
    async getReader(id){
        return (await this.api.get(`/Reader/${id}`)).data;
    }

    //8. Cập nhập thông tin cá nhân
    async CustomizeÌnomation(id, data){
        return (await this.api.put(`/edit/nhanvien/${id}`,data)).data;
    }
}

export default new EmployeeRights();