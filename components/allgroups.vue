<template>
  <v-dialog v-model="dialogcontrol" max-width="650px" :persistent="true">
    <v-card>
      <v-card-title class="headline d-flex">Chats

        <v-spacer></v-spacer>
        <span v-if="memberflag" class="text-body-1  text-error ">Already a Member.</span>

      </v-card-title>

      <v-list>
        <v-list-item v-for="user in groups" :key="user.id"
          :class="{ 'selected': selectedUser && selectedUser.id === user.id }">
          <v-row class="my-1 ">
            <v-col cols="2" md="1" sm="2" class="mx-2">
              <v-avatar size="37" color="info">
                <v-icon small icon="mdi-account-circle"></v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="10" md="10" sm="10" class="d-flex align-center">
              <v-list-item-title>{{ user.groupname }}</v-list-item-title> <v-spacer></v-spacer>
              <v-btn variant="outlined" density="compact" color="blue darken-1 text-capitalize font-weight-medium" text
                @click="JoinGroup(user)">Join</v-btn>

              <!-- <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle> -->
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1 text-capitalize" text @click="CancelUpload()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import EventService from "../../../services/EventService";
export default {
  data() {
    return {
      selectedgrp: null,
      dialogcontrol: false,
      groups: null,
      selectedUser: null,
      UserId: null,
      memberflag: false
    };
  },
  props: {
    pdfUrl: String,
    dialog: Boolean,
  },
  watch: {
    dialog() {
      this.dialogcontrol = this.dialog
      if (this.dialog) {
        this.Fetchallgrp()
        this.UserId = localStorage.getItem("ftcode")
      }
    }
  },
  methods: {
    JoinGroup(user) {
      var Senreq = {
        groupname: user.groupname,
        groupid: user.groupid,
        ftcode: this.UserId
      }
      EventService.Joingroup(Senreq).then((resp) => {
        console.log("hjasdhksd", resp.data);
        if (resp.data.status == "S") {
          this.CancelUpload()
        } else {

          if (resp.data.msg == "already member") {
            this.memberflag = true
            setInterval(() => {
              this.memberflag = false
            }, 2000);
          }
        }
      }).catch((err) => {
        console.log(err);
      })

    },
    Fetchallgrp() {
      EventService.GetGroupList().then((resp) => {
        if (resp.data.status == "S" && resp.data.groupinfo != null) {
          this.groups = resp.data.groupinfo
        }else{
          console.log("GetGroupList ",resp.data);
        }
      }).catch((err) => {
        console.log(err);
      })

    },
    uploadFile() {
      this.$emit("Joingrp")
    },
    CancelUpload() {
      this.$emit("closegrpdialog")
      this.dialogcontrol = false;
      this.memberflag = false
    }
  },
  mounted() {
  }
};
</script>

<style>
.selected {
  background-color: #b8b2b2;
  /* Selected user background color */
}
</style>