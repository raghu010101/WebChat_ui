<template>
    <!-- <v-app> -->
  
      <!-- <v-overlay v-model="$globalData.overlay" color="white" persistent class="align-center justify-center ">
        <Loader />
      </v-overlay> -->

      <div class="pa-0" style="background-color: #f6f8fc;">
        <NuxtPage />
      </div>
  
      <!-- Snack bar appears top right -->
      <v-snackbar class="mt-15" rounded="0"   elevation="1" width="100px" location="top right" v-model="$globalData.snackbar" 
        :timeout="$globalData.timeout" :color="$globalData.backgroundColor">
        <v-row>
          <v-col class=" d-flex align-center justify-center" lg="1" cols="1" sm="1" xs="1" md="1" xl="1">
            <v-icon medium :color="$globalData.IconColor">{{
        $globalData.Icon
      }}</v-icon></v-col>
  
          <v-col cols= "10" lg="11" sm="11" xs="11" md="11" xl="11">
            <span class="black--text body-2 pl-2">{{
          $globalData.alerttitle
        }}</span> <br>
            <span class="text-caption blue--text body-2 pl-2">{{ $globalData.msg }}</span>
          </v-col>
        </v-row>
      </v-snackbar>
  
      <!-- hearder comes here
      <Header :clientId="person.Id" :hideId="allowApp" :ClientName="clientname" /> -->
  
  
   
  
     
    <!-- </v-app> -->
  </template>
  <script>
  // import NavMenu from "../components/Menu/NavMenu.vue";
  // import VerticalMenu from "../components/Menu/VerticalMenu.vue";
  // import EventService from "~/services/EventServices.js";
  // import Loader from "../components/customLoader/loader.vue";
  export default {
    name: "Main",
  
    data: () => ({
      person: {
        Id: "",
      },
      clientname: "",
      drawer: false,
      userSubMenus: [],
      CurrentPath: "",
      allowApp: true,
      FooterValue:null,
      RequestData:{
      key:"Footer"
      }
    }),
    components: {
      // Loader
    },
    methods: {
    //   GetDisclaimerDetails() {
    //     this.$globalData.overlay = true;
    //     EventService.MfDisclaimerData(this.RequestData)
    //       .then((response) => {
    //         // console.log(response.data.status,"response")
    //         if (response.data.status == "S") {
    //           this.FooterValue=response.data.mfdisclaimerkeydata.content
    //           this.$globalData.overlay = false;
    //         } else {
    //           this.MessageBar("E", response.data.errMsg);
    //           this.$globalData.overlay = false;
    //         }
    //       })
    //       .catch((error) => {
    //         this.MessageBar("E", error);
    //         this.$globalData.overlay = false;
    //       });
    //   },
    //   onClickOutsideStandard(event) {
    //     if (this.drawer && !event.target.closest(".v-navigation-drawer")) {
    //       this.closeDrawer()
    //     }
    //   },
    //   CloseMenu() {
    //     this.closeDrawer()
    //   },
    //   verify() {
    //     EventService.verifyClient()
    //       .then((response) => {
    //         if (response.data.status == "S") {
    //           this.$globalData.links = response.data.routerArr
  
    //           if (this.$globalData.links[0].path == "" || this.$globalData.links == null) {
  
    //             EventService.GetSubMenu(this.$globalData.links[0].routerId)
    //               .then((response) => {
    //                 if (response.data.subMenuArr == null) {
    //                   this.userSubMenus = []
    //                 } else {
    //                   this.userSubMenus = response.data.subMenuArr;
    //                 }
    //                 if (this.$route.path !== this.userSubMenus[0].path) {
    //                   this.$router.replace(this.userSubMenus[0].path)
    //                 }
  
    //               })
    //               .catch((error) => {
    //                 this.MessageBar('E', error.response)
    //               });
    //           }
    //         } else {
    //           this.$router.replace("/underConstruction")
    //         }
    //       })
    //       .catch((error) => {
    //         this.MessageBar('E', error)
    //       });
    //   },
  
    //   closeDrawer() {
    //     this.drawer = false;
    //   },
    //   getDirectory() {
    //     EventService.GetDirectory()
    //       .then((response) => {
    //         if (response.data.status == "S") {
    //           this.$store.commit('setStream', response.data.stream)
    //         }
    //       })
    //       .catch((error) => {
    //         this.MessageBar('E', error)
    //       });
    //   },
    //   getClientName() {
    //     EventService.GetClientName()
    //       .then((response) => {
    //         if (response.data.status == "S") {
    //           this.clientname = response.data.clientName;
    //         } else {
    //           this.MessageBar('E', response.data.errMsg)
    //         }
    //       })
    //       .catch((error) => {
    //         this.MessageBar('E', error)
    //       });
    //   },
  
    },
  }
  
  </script>
  
  <style scoped>
  ::v-deep.v-main {
    padding: 46px 0px 0px !important;
  }
  
  .footer {
    background: #f8f9fc;
    padding: 20px 0;
    position: relative;
    color: #666;
  }
  
  .v-footer {
    flex: unset;
  }
  
  .v-app-bar {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4.5px);
    -webkit-backdrop-filter: blur(4.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .text-size {
    font-size: 11px;
  }
  
  ::v-deep .v-list v-sheet theme--light {
    max-height: 63px;
  }
  
  ::v-deep .v-menu__content theme--light v-menu__content--fixed {
    max-height: 63px;
  }
  
  @media (max-width:600px) {
    .text-size {
      font-size: 8px;
    }
  }
  </style>