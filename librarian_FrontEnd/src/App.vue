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
  <div>
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
  </div>

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
