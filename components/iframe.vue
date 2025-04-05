<template>
        <v-dialog v-model="dialogcontrol" max-width="650px" :persistent="true">
          <v-card>
            <v-card-title class="headline">PDF Preview</v-card-title>
            <v-card-text>
              <iframe v-if="pdfUrl" :src="pdfUrl" width="600px" height="600px"></iframe>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1 text-capitalize" text @click="CancelUpload()">Cancel</v-btn>
              <v-btn color="blue darken-1 text-capitalize font-weight-medium" text @click="uploadFile" >Upload</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </template>
<script>
export default {
  data() {
    return {
      selectedFile: null,
      dialogcontrol:false
    };
  },
  props:{
    pdfUrl: String,
    dialog: Boolean,
  },
  watch:{
    dialog(){
        this.dialogcontrol = this.dialog
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.selectedFile = file;
        this.pdfUrl = URL.createObjectURL(file);
        this.dialog = true;
      } else {
        this.selectedFile = null;
        this.pdfUrl = null;
        // alert('Please select a valid PDF file');
      }
    },
     uploadFile() {
        this.$emit("upload")
    },
    CancelUpload(){
      this.$emit("closedialog")
      this.dialogcontrol = false;
    }
  },
};
</script>