<script>

    let Email = sessionStorage.getItem('email');
    let Role= sessionStorage.getItem('role');
    let ID = sessionStorage.getItem('id');
    let CheckLogin =0;
    //Kiểm tra đăng nhập 
    if(Email && Role && ID){
        console.log("Role:",Role,"ID: ",ID,"Email: ",Email);
        CheckLogin = 1;
    }

    //-----
    export default {
        computed(){
            
        },
        methods:{
            //Thực hiện đăng xuất
            ThucHienDangXuat(){
                sessionStorage.clear();
                console.log("Role:",Role,"ID: ",ID,"Email: ",Email);
                this.$router.push('/');
            },
            ThucHienDangNhap(){
                sessionStorage.clear();
                console.log("Role:",Role,"ID: ",ID,"Email: ",Email);
                this.$router.push('/Login');
            },
            ThucHienDangKy(){
                sessionStorage.clear();
                console.log("Role:",Role,"ID: ",ID,"Email: ",Email);
                this.$router.push('/dangky');
            },
            XacDinhDangNhap(){
                if(CheckLogin > 0 && Role == 0){
                    this.$router.push('/adminhome');
                }else if(CheckLogin > 0 && Role != 0){
                    this.$router.push('/');
                }else{
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<template>
        <div class="gocPhai">
            <button class="btn btn-outline-success" type="button" @click="ThucHienDangKy">Đăng ký</button>
            <button class="btn btn-outline-primary" type="button" @click="ThucHienDangNhap">Đăng nhập</button>
            <button class="btn btn-outline-danger" type="button" @click="ThucHienDangXuat">Đăng xuất</button>
        </div>
        <div class="PhanDau">
            <div class="header">
                <div class="TieuDe_header">
                    <h1>
                        <button @click="XacDinhDangNhap" class=" DinhDangMauNutHome">Library</button>
                    </h1>
                </div>
                <div class="nutUser_header">
                    <p class="iconUser">
                        <i class="fa-solid fa-user"></i> <p> {{ Email }}</p>
                    </p>
                </div>
            </div>
        </div>
</template>



<style>
    .PhanDau{
        background-color: rgb(19, 31, 41);
        width: 100vw;
        height: 12vh;
        align-content: center;
        justify-content: center;
    }
    .header{
        display: grid;
        grid-template-areas: 
        "tieude tieude  nutKiemtra";
    }
    .TieuDe_header{
        margin-left: 5vh;
        grid: "tieude";
        text-align: left;
        font-size: 1.15em;
        font-weight: 700;
        font-family: Arial ;
        color: rgb(20, 56, 218);
    }
    .nutUser_header{
        grid: "nutKiemtra";
        margin-left: 5vh;
        text-align: end;
    }
    .iconUser{
        color: azure;
        font-size: 1.5em;
    }
    .fa-user{
        padding: 8px;
    }
    .fa-user:hover{
        background-color: rgb(32, 29, 214);
        padding: 8px;
        border-radius: 100%;
        cursor: pointer;
    }
    .NutCoiTaiKhoan{
        font-family: arial ;
        font-size: 18px;
        cursor: pointer;
    }
    .NutCoiTaiKhoan:hover{
        color: aliceblue;
    }
    .gocPhai{
        display: block;
        width: 100vw;
        text-align: end;
        margin-bottom: 1vh;
    }
    .gocPhai button{
        margin-left: 2vh;
    }
    .DinhDangMauNutHome{
        font-family: Arial;
        font-weight: 600;
        border: 1px solid rgb(38, 38, 228);
        color: rgb(32, 32, 175);
        background-color: rgba(16, 85, 124, 0.13);
        padding: 0vh 2vh 0vh 2vh;
        border-radius: 3px;
    }
    .DinhDangMauNutHome:hover{
        color: rgb(12, 12, 199);
        background-color: rgba(7, 82, 126, 0.13);
    }
</style>