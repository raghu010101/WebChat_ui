<template>
    <v-dialog v-model="dialogcontrol" max-width="500px" :persistent="true">
      <v-card>
        <v-card-title class="headline d-flex">Create Group
  
          <v-spacer></v-spacer>
          <span v-if="memberflag" class="text-body-1  text-error ">Group Already Exist. Can't create.</span>
  
        </v-card-title>
  
        <v-divider></v-divider>

        <v-row class="d-flex justify-center mt-3">
            <v-col md="8">
                <v-text-field placeholder="Enter Group Name" variant="outlined" density="compact" v-model="Groupname"></v-text-field>
            </v-col>
            <v-col md="2">
                <v-btn class="text-capitalize pa-2" variant="tonal" color="success" @click="CreateGrp()">Submit</v-btn>
            </v-col>
        </v-row>

        <v-divider></v-divider>

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
        memberflag: false,

        Groupname:""
      };
    },
    props: {
      pdfUrl: String,
      dialog: Boolean,
    },
    watch: {
      dialog() {
        this.dialogcontrol = this.dialog
      }
    },
    methods: {
    CreateGrp(user) {
        var Senreq = {
          groupname: this.Groupname,
          ftccode: this.UserId
        }
        EventService.CreateGroup(Senreq).then((resp) => {
          console.log("hjasdhksd", resp.data);
          if (resp.data.status == "S") {
            this.CancelUpload()
          } else {
  
            if (resp.data.msg == "Exist") {
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
     
      CancelUpload() {
        this.$emit("closecreatedialog")
        this.dialogcontrol = false;
        this.memberflag = false
        this.Groupname = ""
      }
    },
    mounted() {
        this.UserId = localStorage.getItem("ftcode")
    }
  };
  </script>
  
  <style>
  .selected {
    background-color: #b8b2b2;
    /* Selected user background color */
  }
  </style>