<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="drawer-custom"
      :mini-variant="!isLargeScreen"
    > -->
      <!-- Drawer content -->
    <!-- </v-navigation-drawer>

      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" ></v-app-bar-nav-icon> -->

      <mainpage/>

    <!-- <v-main>
      <NuxtPage />
    </v-main> -->
  </v-app>
</template>
<script >
import { useMediaQuery } from '@vueuse/core'
import mainpage from "./pages/main.vue";
export default{
 data(){
  return{
    drawer :false,
    isLargeScreen : true
  }
 },
beforeCreate(){
  this.isLargeScreen=useMediaQuery('(min-width: 960px)')
},
components:{
  mainpage
}
}
</script>
<style scoped lang="scss">
@import "@/assets/styles.scss";

.drawer-custom {
  width: 250px; /* Adjust drawer width for mobile */
}

/* Adjust styles for large screens */
@media (min-width: 960px) {
  .drawer-custom {
    width: 300px; /* Increase width for larger screens */
  }
}
</style>
