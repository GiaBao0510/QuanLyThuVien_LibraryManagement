<script>
    export default {
        props:{
            searchValue: {type: String, default: ""},
        },
        emits:['submit', 'update:searchValue'],
        methods:{
            UpdateSearchValue(e){
                this.$emit('update:searchValue', e.target.value);
            },
            Submit(){
                this.$emit("submit");
            }
        },
    }
</script>

<template>
    <div>
        <button type="button" @click="Submit" class="NutBamTimKiem">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
        </button>
        <input type="text" placeholder="Nhập tên sách cần tìm..."
        :value="searchValue" @input="UpdateSearchValue" @keyup.enter="Submit"
        class="ThanhTimKiem"
        />
    </div>
</template>

<style>
    .ThanhTimKiem,.NutBamTimKiem{
        height: 6vh;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
    .NutBamTimKiem{
        border-radius: 3px;
        width: 20vw;
        font-size: 1em;
        padding: 1vh 0 1vh 0;
        background-color: rgb(5, 146, 5);        
        cursor: pointer;
    }
    .NutBamTimKiem:hover{
        background-color: rgb(26, 180, 26);
    }
    .ThanhTimKiem{
        width: 75vw;
        margin-left: 1.5vh;
    }
</style>