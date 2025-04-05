<template>
  <div   class="pa-0 ma-0">
    <v-row  class="pa-0 ma-0" style="height: 100vh;">
      <v-col :cols="$vuetify.display.smAndDown ? '12' : '4'" md="4" sm="12" class="pa-0 ma-0 "  v-if="selectedUser == null || !$vuetify.display.smAndDown">
    <!-- <Background background-image="/images/background.webp"> -->
        <!-- <FTCList :Groups="groups" :selectedUser="selectedUser" @select-user="selectedchat = $event" /> -->
        <v-card  flat class=" d-flex flex-column h-100" >
          <v-toolbar  class="fixed-title" color="#62B4F7" sticky>
            <v-toolbar-title>
              <!-- {{ selectedUser.groupname }}  --> 
                <span :class="$vuetify.display.smAndDown ? 'text-body-2' :'text-h6'">Groups and Chats</span>
            </v-toolbar-title>

            <v-spacer>
            </v-spacer>
            <v-btn :class="$vuetify.display.smAndDown ? 'd-inline' : 'd-none'">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list >
            <v-list-item v-for="user in groups" :key="user.id" @click="selectedchat(user)" 
              >
              <v-row class="my-1 " :class="{ 'selected': selectedUser && selectedUser.groupid === user.groupid }">
                <v-col cols="2" md="1" sm="2" class="mx-2">
                  <v-avatar size="37" color="info">
                    <v-icon small icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8" md="10" sm="10" class="d-flex align-center">
                  <v-list-item-title>{{ user.groupname }}</v-list-item-title>
                  <!-- <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle> -->
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-list-item>
          </v-list>


          <v-spacer></v-spacer>
        <div class="pa-2 d-flex align-center" >
          <v-icon class="" color="green">mdi-message-plus</v-icon>
            <v-btn variant="text" color="green" class="text-capitalize text-decoration-underline pa-0 font-weight-bold" @click="Creategroup()">  
              Create Group</v-btn>

              <v-spacer></v-spacer>

              <v-icon class="mr-1" color="green">mdi-message-plus</v-icon>
            <v-btn variant="text" color="green" class="text-capitalize text-decoration-underline pa-0 ma-0 font-weight-bold" @click="Showgrplist()">  
              Join Group</v-btn>
          </div>

        </v-card>

        <DisplayGrp :dialog="opendialog" @closegrpdialog="closegrpdialog"/>

        <CreateGrp :dialog="opencreatedialog" @closecreatedialog="closecreatedialog"/>  
        
      </v-col>
      <v-col cols="0" md="8" class="pa-0 ma-0 "
        v-if="selectedUser != null">
        <div >
          <FTCChat :selectedUser="selectedUser"/>
        </div>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import FTCList from '~/components/FTCChatList.vue'
import FTCChat from '~/components/FTCChat.vue'
import EventService from "../../services/EventService";
import DisplayGrp from '~/components/allgroups.vue';
import CreateGrp from '~/components/creategroup.vue';


export default {
  components: {
    FTCList,
    FTCChat,
    DisplayGrp,
    CreateGrp
  },
  data() {
    return {
      groups: [],
      selectedUser: null,
      // SocketConn: null,
      ConnUrl: "ws://localhost:28595/socket",
      User: "",
      opendialog:false,
      opencreatedialog:false
    }
  },
  watch: {
    // 'selectedUser.groupid': {
    //   handler(newvalue, oldvalue) {
    //     console.log(oldvalue, "watched ", newvalue);
    //     if (this.SocketConn != null) {
    //       var SendStr = {
    //         senderid: this.User,
    //         receiverid: "",
    //         msg: "",
    //         attachmentid: "",
    //         chatroomid: 5,
    //         msgtype: "Change_Group",
    //       }
    //       this.SocketConn.send(JSON.stringify(SendStr));
    //     } else {
    //       console.warn("WebSocket connection is not open.");
    //     }
    //   }
    // }



  },
  methods: {
    selectedchat(value) {
      // console.log("sdfjhdsf", value);
      this.selectedUser = value

    },
    Showgrplist(){
      this.opendialog=true  
    },
    Creategroup(){
      this.opencreatedialog =true
    },
    closegrpdialog(){
      this.opendialog=false
      this.GetAllGroupsData()
    },
    closecreatedialog(){
      this.opencreatedialog =false
      this.GetAllGroupsData()
    },
    GetAllGroupsData() {
    this.User = localStorage.getItem("ftcode")
      EventService.GetAllGroup(this.User).then((resp) => {
        console.log("sdhfsdfh,res", resp.data)
        this.groups = resp.data.groupinfo
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.GetAllGroupsData()
    var onlineGroup = JSON.parse(localStorage.getItem("selectedgrp"))
    if (onlineGroup != null || onlineGroup != undefined) {
      this.selectedUser = onlineGroup
    }
  }

}
</script>
<style scopped>
  .selected {
    background-color: #b8b2b2; /* Selected user background color */
  }
</style>