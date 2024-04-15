<script>

</script>

<template>
        <div class="gocPhai">
            <nav>
                <router-link to="/dangky" class="NutCoiTaiKhoan">
                    Đăng ký
                </router-link>
                <span>/</span>
                <router-link to="/Login" class="NutCoiTaiKhoan">
                    Đăng nhập 
                </router-link>
                <router-link to=" /Login" class="NutCoiTaiKhoan">
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
                <div class="nutUser_header">
                    <p class="iconUser">
                        <i class="fa-solid fa-user"></i>
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
    }
</style>