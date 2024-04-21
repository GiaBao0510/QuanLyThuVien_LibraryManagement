<script>
    import userService from "@/services/user.service";

    export default {
        props:{
            ID: {type: String, default: -1},
        },
        data(){
            return{
                DanhSachSachDaMuon: [],
            };
        },
        methods:{
            async LayDanhSachDaMuon(){
                try{
                    this.DanhSachSachDaMuon = await userService.TheUserBorrowedTheBooks(this.ID);
                }catch(err){
                    console.log(err);
                }
            }
        },
        created(){
            this.LayDanhSachDaMuon();
        }
    }
</script>


<template>
    <table class="table table-striped table-hover table-bordered">
        <thead class="table-dark">
            <tr>
                <th>Sách</th>
                <th>Số Bản</th>
                <th>Ngày mượn</th>
                <th>Ngày trả</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(book,index) in DanhSachSachDaMuon">
                <th>
                    {{ book.Sach }}
                </th>
                <td>
                    {{ book.Ban }}
                </td>
                <td>
                    {{ book.ngayMuon }}
                </td>
                <td>
                    {{ book.ngayTra }}
                </td>
            </tr>
        </tbody>
    </table>
</template>