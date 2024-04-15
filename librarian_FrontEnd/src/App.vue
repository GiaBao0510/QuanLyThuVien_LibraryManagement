<script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "./components/AppFooter.vue";
  
  export default {
    components:{
      AppHeader,
      AppFooter,
    }
  }
</script>

<template>

    <!--Header-->
  <header>
    <AppHeader/>
  </header>
    
    <!--Main-->
  <main>
    <router-view/>
  </main>

    <!--Footer-->
  <footer>
    <AppFooter/>
  </footer>
</template>

<style>
  header{
    display: block;
  }
  main{
    display: block;
  }
  footer{
    display: block;
  }
</style>
