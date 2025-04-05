<template>
  <v-container fluid class="pa-0 ">
    <v-row class="full-height">
      <v-col cols="12" class=" full-height">
        <v-card flat height="100vh" class="d-flex flex-column chat-bg">
          <v-toolbar class="fixed-title pl-3" color="#62B4F7" sticky>
            <v-layout>
             <v-flex  v-if="Selectedgrp != null">
              <v-toolbar-title>
                <v-avatar size="37" color="info">
                  <v-icon small color="yellow" icon="mdi-account-circle"></v-icon>
                </v-avatar>
                {{ Selectedgrp.groupname }}
              </v-toolbar-title>
             </v-flex>
<v-spacer></v-spacer>
             <v-flex>
              <v-btn class=" text-capitalize font-weight-bold mr-3" @click="logout()" variant="text" color="white">
                Logout
              </v-btn>
             </v-flex>
            </v-layout>

           

          </v-toolbar>

          <v-divider></v-divider>
          <v-card-text class="flex-grow-1 overflow-auto ma-0 pa-0">
            <!-- Message list -->
            <v-list class="bgTransparent">
              <v-list-item v-for="message, idx in MessageArr" :key="idx"
                :class="{ 'outgoing': message.senderid == User, 'incoming': message.senderid != User }">

                <v-row :class="message.senderid === User ? 'd-flex justify-end' : 'd-flex justify-start'" class="w-100">

                  <v-col cols="6" class="d-flex flex column align-center"
                    :class="message.senderid === User ? ' justify-end' : ' justify-start'">

                    <v-avatar size="27" class="mr-3" color="red" v-if="message.senderid != User">
                      <span class="text-body-2">{{ message.senderinitial }}</span>
                    </v-avatar>

                    <template v-if="message.msg != ''">

                      <v-list-item-title class="message-item">
                        <div v-if="message.senderid != User" style="font-size: x-small;color: grey;"
                          class="text-end red--text">{{ message.sendername }}</div>
                        <div>{{ message.msg }}</div>
                        <div class="text-end" style="font-size: x-small;color: grey;"><span>{{ message.time }}</span></div>
                      </v-list-item-title>

                    </template>

                    <template v-else-if="message.attachmentid != ''">
                      <div v-if="message.senderid != User" style="font-size: x-small;color: grey;"
                        class="text-end red--text"></div>
                      <v-list-item-title class="message-item message-image-sender d-flex flex-column"
                        v-if="message.filetype == 'img'">
                        <div v-if="message.senderid != User" style="font-size: x-small;color: grey;"
                          class="text-end red--text">{{ message.sendername }}</div>
                        <img :src="GetFile(message.attachmentid)" width="200px">
                        <span class="ml-1 text-end ma-1 " style="cursor: pointer;"> <v-icon
                            @click="DownloadFile(message.attachmentid)">mdi-file-download</v-icon> </span>
                            <div class="text-end" style="font-size: x-small;color: grey;"><span>{{ message.time }}</span></div>
                      </v-list-item-title>
                      <v-list-item-title class="message-item" v-else-if="message.filetype == 'pdf'">
                        <div v-if="message.senderid != User" style="font-size: x-small;color: grey;"
                          class="text-end red--text">{{ message.sendername }}</div>
                        <div class="text-caption">{{ TruncateString(message.filename, message.filetype) }}
                          <span class="ml-1 " style="cursor: pointer;"> <v-icon
                              @click="DownloadFile(message.attachmentid)">mdi-file-download</v-icon> </span>
                              <div class="text-end pt-1" style="font-size: x-small;color: grey;"><span>{{ message.time }}</span></div>
                        </div>

                      </v-list-item-title>
                    </template>

                    <v-avatar size="26" class="ml-3" color="primary" v-if="message.senderid == User">
                      <span class="text-body-2">{{ message.senderinitial }}</span>
                    </v-avatar>

                  </v-col>

                </v-row>

              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions class="fixed-bottom mb-2">
            <!-- v-if="Selectedgrp && Selectedgrp.groupname" -->
            <v-row >
              <v-col cols="10" sm="10" md="11">
                <v-text-field v-model="newMessage" density="comfortable" label="Type your message" variant="solo"
                  hide-details single-line append-inner-icon="mdi-paperclip" @keydown.enter="sendTextMessage()"
                  @click:append-inner="selectFile"></v-text-field>

              </v-col>
              <v-col cols="2" sm="2" md="1" class="d-flex align-center justify-center">
                <v-btn color="success" style="background-color: white;" size="40" @click="sendTextMessage()">
                  <v-icon color="success" class="">mdi-send</v-icon>
                </v-btn>
              </v-col>
              <v-file-input :disabled="newMessage != ''" v-model="sharefile" type="file" class="d-none"
                @change="checkFileSize('sharefile', 'fileInput', '.pdf,.jpg,.png,.jpeg,.pdf')"
                ref="fileInput"></v-file-input>
            </v-row>

          </v-card-actions>

        </v-card>

        <imgCropper :source="cropData" @close="modifyImage" />
        <pdfframe :dialog="opendialog" :pdfUrl="pdflink" @closedialog="closebox" @upload="uploadfile" />

      </v-col>

    </v-row>

  </v-container>
</template>


<script>
// import io from 'socket.io-client';
import EventService from "../services/EventService";
import imgCropper from "../components/imgcropper.vue"
import pdfframe from "../components/iframe.vue"
export default {
  props: {
    selectedUser: Object // Currently selected user object
  },
  components: {
    imgCropper,
    pdfframe
  },




  data() {
    return {
      MessageArr: [], // Array of message objects { id, content, type, sender, filename } 
      newMessage: '', // New message input
      SocketConn: null,
      // ConnUrl: config.public.wsServerUrl,
      // apiKey: process.env.API_KEY,
      ConnUrl: this.$globalData.SocketUrl,
      // ConnUrl: "ws://localhost:28595/api/socket",
      // ConnUrl:this.config.wsServerUrl,
      User: "",
      Selectedgrp: null,
      sharefile: null,
      cropData: { fileName: "", file: null, dialog: false, Title: "" },
      fetchFileURL: this.$globalData.fetchFileURL,
      // fetchFileURL:process.env.FETCH_URL,
      pdflink: "",
      opendialog: false,
      pdfname: "",
      filetype: "",
    };
  },
  watch: {
    'selectedUser.groupid': {
      handler(newvalue,oldvalue) {
        console.log(oldvalue,newvalue);
        this.Selectedgrp = this.selectedUser
        // console.log("sdfd",this.Selectedgrp);
        if (this.SocketConn != null) {
          this.MessageArr = []
          var SendStr = {
            senderid: this.User,
            receiverid: "",
            msg: "",
            attachmentid: "",
            chatroomid: newvalue,
            msgtype: "Change_Group",
          }
         setTimeout(() => {
          this.SocketConn.send(JSON.stringify(SendStr));
         }, 500);
        } else {
          console.warn("WebSocket connection is not open.");
        }
      },deep : true,
      immediate : true
    }
  },
  methods: {

    DownloadFile(DocId) {
      EventService.Getpath(DocId)
        .then((response) => {
          if (response.data.status == "S") {
            const url = `data:${response.data.filetype};base64,${response.data.filebyte}`;
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute(
              "download",
              response.data.filename
            );
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        })
        .catch((error) => {
          // this.MessageBar("E", error);
          console.log(error);
        });
    },

    sendTextMessage() {
      if (this.newMessage.trim() === '') return;

      if (this.SocketConn != null) {
        var SendStr = {
          senderid: this.User,
          receiverid: "",
          msg: this.newMessage,
          attachmentid: "",
          chatroomid: this.Selectedgrp ? this.Selectedgrp.groupid : 0,
          msgtype: "Store",
          attachmentname: "",
          attachmenttype: ""
        }
        this.SocketConn.send(JSON.stringify(SendStr));
      }

      this.newMessage = '';
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.pdflink = URL.createObjectURL(file);
        this.opendialog = true;
      } else {
        this.selectedFile = null;
        this.pdflink = null;
      }
    },

    checkFileSize(fileModel, ref, acceptType) {
      const file = this[fileModel];
      if (file && file.size < 5) {
        this.$refs[ref].reset(); // Clear the selected file
      } else {
        this.GendrateCrop(fileModel === 'sharefile' ? 'sharefile' : 'address proof2', file, ref, acceptType); // Call GendrateCrop if file size is within limit
      }
    },

    // PROOF UPLOADED
    GendrateCrop(filename, file, RefName, acceptType) {
      if (file != null && file != "") {
        var type = file.type.split("/")[1];
        this.filetype = type;
        if (file && file.type === 'application/pdf') {
          this.pdflink = URL.createObjectURL(file);
          this.opendialog = true;
          this.pdfname = file.name
          // console.log("sdfsdfsdf",this.pdfname);
        } else {

          if (!acceptType.includes(type)) {
            if (type !== undefined) {
              this.$refs[RefName].reset();
            }
            return;
          }

          this.cropData.file = file;
          this.cropData.fileName = filename;
          this.cropData.dialog = true;
          this.cropData.Title = this.$refs[RefName].label;
        }
      } else {
        console.log("No img selected");
      }



    },

    GetDocId() {
      let formData = new FormData();
      let id = [];
      let key = [];
      let File = [this.sharefile];
      let docId = [];
      let fileModified = false;
      for (var i = 0; i < File.length; i++) {
        if (File[i] == null && docId[i] != "") {
          id.push(docId[i]);
        } else if (File[i]) {
          id.push("");
          key.push("file" + i);
          formData.append("file" + i, File[i]);
          fileModified = true;
        }
      }

      let prooftype = "addressProof";
      let idAdd = { id: id, key: key, prooftype: prooftype };
      if (fileModified) {
        this.callMultiuploadFile(formData, idAdd);
      }
    },

    modifyImage(datas) {
      // console.log("ASDFfasdas", datas);
      this.cropData = datas;
      if (datas.Title != undefined) {
        this.GetDocId()
        datas.file = null;
      }
    },

    callMultiuploadFile(formData, idAdd) {
      EventService.multiuploadFile(formData, idAdd)
        .then((response) => {
          // console.log("LLLLLLLLLLLLLLLLLLLL", response.data);
          if (response.data.status == "S") {
            // console.log("sdf",response.data.data[0]);
            let docid = response.data.data[0];

            let type = ""
            if (this.filetype == "pdf") {
              type = "pdf"
            } else {
              type = "img"
            }
            // this.insertData();
            // console.log(type, "this.pdfname", this.pdfname, "hgj", this.filetype);
            if (this.SocketConn != null) {
              var SendStr = {
                senderid: this.User,
                receiverid: "",
                msg: "",
                attachmentid: docid,
                chatroomid: this.Selectedgrp ? this.Selectedgrp.groupid : 0,
                msgtype: "Store",
                attachmentname: this.pdfname,
                attachmenttype: type
              }
              this.SocketConn.send(JSON.stringify(SendStr));
            }
            this.pdfname = ""
            this.sharefile = null
          } else {
            // this.$globalData.isOverlayVisible = false;
            // this.MessageBar("E", response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        })

    },

    GetFile(docid) {
      // console.log("accessasdhsdbcvb");
      return this.fetchFileURL + docid;
    },

    selectFile() {
      this.$refs.fileInput.setAttribute('accept', '*');
      this.$refs.fileInput.click();
    },
    uploadfile() {
      this.GetDocId()
      this.opendialog = false;
    },
    closebox() {
      this.opendialog = false;
      // console.log("emoyterf wprksddsbf");
    },

    TruncateString(str, type) {
      let maxLength = 10
      // console.log(str, "truncated file ,", "... ." + type);
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "... ." + type;
      } else {
        return str;
      }
    },
    logout() {
      localStorage.removeItem("ftcode")
      if (this.SocketConn) {
        this.SocketConn.close();
        console.log('WebSocket connection closed.');
      }
      this.$router.push("/")
    },
    updateMessages(newMessages) {
      for (let i = 0; i < newMessages.length; i++) {
        this.MessageArr[i] = newMessages[i];
      }
      if (newMessages.length < this.MessageArr.length) {
        this.MessageArr.splice(newMessages.length);
      }
    },
    ConnectSocket() {
      console.log("sdfhkdfjhij9n");
      this.SocketConn = new WebSocket(this.ConnUrl)

      this.SocketConn.onopen = (event) => {
        console.log("WebSocket connection opened.", event);
      };
      this.SocketConn.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      this.SocketConn.onclose = (event) => {
        console.log("WebSocket connection closed.", event);
        // Optional: Reconnect logic
      };

      this.SocketConn.onmessage = (event) => {

       // console.log(this.Selectedgrp.groupid, " <= event.data => ", event.data);
        const ParsedJson = JSON.parse(event.data);

        if (ParsedJson.messagearr != null) {
          if (ParsedJson.groupid && ParsedJson.groupid == this.Selectedgrp.groupid) {
            this.updateMessages(ParsedJson.messagearr);
          }
        }
      };
    },
  },
  beforeMount() {
    console.log('WebSocket URL:');
    // if (process.client) {
    this.Selectedgrp = JSON.parse(localStorage.getItem("selectedgrp"))
    // this.ConnUrl=process.env.WS_SERVER_URL
    this.User = localStorage.getItem("ftcode")
    // }
    this.ConnectSocket()
  },

  // Clean up WebSocket connection on component destruction
  beforeDestroy() {
    if (this.SocketConn) {
      this.SocketConn.disconnect();
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles.scss';

.full-height {
  height: 100vh;
}

.bgTransparent {
  background-color: transparent !important;
}

.outgoing .message-item {
  background-color: #dcf8c6;
  text-align: right;
  align-self: flex-end;
  border-radius: 10px 10px 0px 10px;

}

.incoming .message-item {
  background-color: #ffffff;
  text-align: left;
  align-self: flex-start;
}

.message-item {
  background-color: #dcf8c6;
  text-align: right;
  padding: 8px;
  margin: 4px 0;
  max-width: 80%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border-radius: 10px 10px 10px 0;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  // align-content: center;

}

.fixed-title {
  position: sticky;
  top: 0;
}

.message-image-sender {
  max-width: 100%;
  border-radius: 10px;
  margin: 4px 0;
  display: flex;
  justify-content: end;
}

.message-image-reciver {
  max-width: 100%;
  border-radius: 10px;
  margin: 4px 0;
  display: flex;
  justify-content: start;
}
</style>
