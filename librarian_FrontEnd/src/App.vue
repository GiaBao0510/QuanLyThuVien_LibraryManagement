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
    <AppHeader/>

    <!--Main-->
    <main>
      <router-view/>
    </main>

    <!--Footer-->
    <AppFooter/>
    
  </div>
  
</template>

<style>

</style>
