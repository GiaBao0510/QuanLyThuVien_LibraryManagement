<template>
    <div class="notFound">
        <h1 class="Error404"> :(( 404</h1>
        <h3 class="TieuDeLoi">Oops! Page not found</h3>
        <h4>Sorry ,but the page you are looking for not found. Please, make sure you have typed the current URL.</h4>
        <router-link to="/"></router-link>
    </div>
</template>
<style>
    .notFound{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    .Error404{
        color: rgb(12, 40, 197);
        font-size: 7em;
        font-weight: 700;
    }
    .TieuDeLoi{
        color: gray;
        font-size: 2.4em;
        font-weight: 550;
    }
</style>