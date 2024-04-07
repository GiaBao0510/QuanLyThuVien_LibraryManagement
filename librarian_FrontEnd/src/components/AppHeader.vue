<template>
    <header>
        <div class="gocPhai">
            <nav>
                <router-link :to="{ name: 'Register'}" class="NutCoiTaiKhoan">
                    Đăng ký
                </router-link>
                <span>/</span>
                <router-link :to="{ name: 'Longin'}" class="NutCoiTaiKhoan">
                    Đăng nhập 
                </router-link>
                <router-link :to=" {name: 'Register' }" class="NutCoiTaiKhoan">
                    Đăng xuất
                </router-link>
            </nav>
        </div>
        <div class="PhanDau">
            <div class="header">
                <div class="TieuDe_header">
                    <h1>
                        <a href="/"> Library</a>
                    </h1>
                </div>
                <div class="search_header">
                    <input type="text" placeholder="Nhập tên sách cần tìm" class="ThanhTimKiem"/>
                    <button class="nutSearch ">
                        <i class="fa-solid fa-magnifying-glass "></i>
                    </button>
                </div>
                <div class="nutUser_header">
                    <p class="iconUser">
                        <i class="fa-solid fa-user"></i>
                    </p>
                </div>
            </div>
        </div>
    </header>
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
        "tieude search search nutKiemtra";
    }
    .TieuDe_header{
        margin-left: 5vh;
        grid: "tieude";
        text-align: left;
        font-size: 1.15em;
        font-weight: 700;
        font-family: Arial ;
        color: rgb(14, 155, 14);
    }
    .search_header{
        grid: "search";
        margin-left: 5vh;
    }
    .nutUser_header{
        grid: "nutKiemtra";
        margin-left: 5vh;
        text-align: left;
    }
    .iconUser{
        color: azure;
        font-size: 1.5em;
    }
    .fa-user{
        padding: 8px;
    }
    .fa-user:hover{
        background-color: rgb(14, 155, 14);
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
    }
    .nutSearch{
        color: aliceblue;
        background-color: limegreen;
        width: 6.5vh;
        height: 5vh;
        text-align: center;
        justify-content: center;
        margin: 1vh;
    }
    .nutSearch:hover{
        background-color: rgb(14, 155, 14);
    }
    .ThanhTimKiem{
        width: 30vw;
        height: 5vh;
        border: 2px solid rgb(66, 190, 66);
        border-radius: 5px;
    }
</style>