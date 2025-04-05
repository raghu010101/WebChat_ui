<template>
    <v-dialog v-model="source.dialog" persistent max-width="800" max-height="800" scrollable>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="ImgClose">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title> {{ source.Title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <div class="mt-4">
                    <div class="ma-0 pa-0" ref="ImageParent" v-show="!cropit" style="height:500px; overflow: hidden;"
                        id="pimgcon">
                        <img ref="Image" id="praentImg" @load="coper" :src="imageurl">
                    </div>

                    <div class="ma-0 text-center" v-show="cropit"
                        style="max-height: 560px; overflow: hidden; margin: 0px auto !important;.">
                        <img id="croppedImg" :src="destination"
                            style="margin: 0 auto; max-width: 100%; max-height: 100%;" />
                    </div>
                </div>

            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <div v-if="saveEnable">
                <v-btn  dark class="ma-2 primary" @click="isEnable"><span
                    class="font-weight-bold text-Uppercase">
                    <!-- <v-icon size="14">mdi-pencil</v-icon>  -->
                    Edit</span></v-btn>
                    <v-btn  dark class="ma-2 success" @click="sendImage"><span
                    class="font-weight-bold text-Uppercase">Send</span></v-btn>
                </div>
                <div v-if="cropEnable">
                    <v-tooltip top v-if="cropit == false"> <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="back">
                                <v-icon>mdi-arrow-left</v-icon></v-btn> </template><span>Back</span>
                    </v-tooltip>
                    <v-tooltip top v-if="cropit == false"> <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="ResetCrop">
                                <v-icon>mdi-restore</v-icon></v-btn> </template><span>Reset</span>
                    </v-tooltip>
                    <v-tooltip top v-if="cropit == false"> <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="Rotateminus">
                                <v-icon>mdi-rotate-left</v-icon></v-btn> </template><span>Rotate
                            Anti-Clockwise</span>
                    </v-tooltip>
                    <v-tooltip top v-if="cropit == false"> <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="Rotateplus">
                                <v-icon>mdi-rotate-right</v-icon></v-btn> </template><span>Rotate
                            Clockwise</span>
                    </v-tooltip>
                    <v-tooltip top v-if="cropit == false"> <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="cropit = true">
                                <v-icon>mdi-crop</v-icon></v-btn> </template><span>Crop</span>
                    </v-tooltip>
                </div>
                <v-tooltip top v-if="cropit == true"> <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="cropit = false">
                            <v-icon>mdi-undo-variant</v-icon></v-btn> </template><span>Undo</span>
                </v-tooltip>
                <v-tooltip top v-if="cropit == true"> <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 primary" @click="DownloadImg">
                            <v-icon>mdi-download</v-icon></v-btn> </template><span>Download</span>
                </v-tooltip>
                <v-tooltip top v-if="cropit == true"> <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" small fab dark class="ma-2 success" @click="sendImage">
                            <v-icon>mdi-send</v-icon></v-btn> </template><span>Send</span>
                </v-tooltip>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Cropper from "cropperjs"
import { PDFDocument } from "pdf-lib";
export default {
    name: "ImageCropperComp",
    props: {
        source: {},
    },
    data() {
        return {
            crop: {},
            destination: {},
            image: {},
            imageurl: null,
            cropit: false,
            croppedImageWidth: 0, // Initialize to 0
            croppedImageHeight: 0,
            cropData: { fileName: "", file: null, dialog: false, Title: "" ,PgCount:0},
            cropEnable : false,
            saveEnable : true

        }
    },
    methods: {
        back(){
            this.cropEnable = false
            this.saveEnable = true 
        },
        isEnable(){
            this.cropEnable = true
            this.saveEnable = false
        },
        ImgClose() { //destroying a cropper instance and close the image cropper dialog box
            this.cropEnable = false
            this.saveEnable = true

            if (this.crop && typeof this.crop.destroy === 'function') {
                this.crop.destroy();
            }
            if (this.destination && typeof this.destination.destroy === 'function') {
                this.destination.destroy();
            }
            if (this.image && typeof this.image.destroy === 'function') {
                this.image.destroy();
            }
            this.cropit = false
            this.cropData.fileName = this.source.fileName
            this.cropData.file = null
            this.cropData.dialog = false
            this.imageurl = null
            this.$emit("close", this.cropData)
        },
        DownloadImg() { // this method is used to download cropped image 
            const link = document.createElement("a");
            link.setAttribute("href", this.destination);
            var type = this.source.file.type.split("/")[1]
            link.setAttribute("download", this.source.fileName + "_" + new Date().getTime + "." + type);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        sendImage() {

            // this.urlToFile(this.destination)
            //     .then(file => {
            //         this.cropEnable = false
            //         this.saveEnable = true
            //         this.cropData.fileName = this.source.fileName
            //         this.cropData.file = file
            //         this.cropData.dialog = false
            //         this.cropData.PgCount=1
            //         this.imageurl = null
            //         if (this.crop && typeof this.crop.destroy === 'function') {
            //             this.crop.destroy();
            //         }
            //         if (this.destination && typeof this.destination.destroy === 'function') {
            //             this.destination.destroy();
            //         }
            //         if (this.image && typeof this.image.destroy === 'function') {
            //             this.image.destroy();
            //         }
            //         this.cropit = false
            //         this.destination = {}
            //         this.$emit("close", this.cropData)
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });


            this.cropEnable = false
                    this.saveEnable = true
                    this.cropData.fileName = this.source.fileName
                    // this.cropData.file = file
                    this.cropData.dialog = false
                    this.cropData.PgCount=1

                    this.cropit = false
                    this.destination = {}
                    this.$emit("close", this.cropData)

        },
        async urlToFile(url) {
            try {
                // Fetch the resource at the given URL
                const response = await fetch(url);

                // Check if the fetch was successful (status code 200)
                if (!response.ok) {
                    throw new Error(`Failed to fetch URL: ${response.status} - ${response.statusText}`);
                }

                // Get the response data as an ArrayBuffer
                const arrayBuffer = await response.arrayBuffer();

                // Create a Blob from the ArrayBuffer
                const blob = new Blob([arrayBuffer]);
                var type = this.source.file.type.split("/")[1]
                const fileName = this.source.fileName + "." + type;
                const file = new File([blob], fileName, { type: blob.type });

                return file;
            } catch (error) {
                console.error('Error converting URL to Blob:', error);
                throw error;
            }
        },
        ResetCrop() { //reset a cropped
            this.crop.reset();
        },
        Rotateminus() { //rotate a image  in -90 degree
            this.crop.rotate(-90);
        },
        Rotateplus() { //rotate a image  in 90 degree
            this.crop.rotate(90);
        },
        coper() {
            this.image = {}
            this.image = this.$refs.Image;

            // Destroy the previous Cropper instance if it exists
            if (this.crop && typeof this.crop.destroy === 'function') {
                this.crop.destroy();
            }
            // creating a cropper instance and setting up the cropper options
            this.crop = new Cropper(this.image, {
                zoomable: true,
                scalable: true,
                aspectRatio: 0,
                background: false,
                viewMode: 1,
                cropBoxResizable: true,
                cropBoxMovable: true,
                autoCropArea: 1,
                dragMode: 'move',
                zoomOnTouch: true,
                zoomOnWheel: true,
                minContainerWidth: 0,
                minContainerHeight: 0,
                minCanvasWidth: 350,
                minCanvasHeight: 400,
                responsive: true,
                crop: () => { // to get a cropped image 
                    var canvas = this.crop.getCroppedCanvas({
                        imageSmoothingEnabled: true,
                        // maxHeight: 100,
                    });
                    this.destination = canvas.toDataURL("image/png")
                    var canvasWidth = canvas.width;
                    var canvasHeight = canvas.height;

          // Set these values to reactive data properties
          this.croppedImageWidth = canvasWidth;
          this.croppedImageHeight = canvasHeight;
        },
      });
    },
    GenerateImgURL(file) {
      // this method is used to create a src for <img> and open a image cropper dialog
      if (file != null && file != "") {
        const Image = file;
        var fileread = new FileReader();
        fileread.onload = () => {
          var imgblob = new Blob([fileread.result], { type: Image.type });
          this.imageurl = URL.createObjectURL(imgblob);
        };
        fileread.readAsArrayBuffer(Image);
      } else {
        console.error("No img selected");
      }
    },
    async handleFileRead(event) {
      const contents = event.target.result;
      const pdfBytes = new Uint8Array(contents);
      await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
        .then((pdfDoc) => {
          if (pdfDoc.isEncrypted) {
            this.MessageBar("E", "The PDF file is password protected.");
            this.cropData.fileName = this.source.fileName;
            this.cropData.file = null;
            this.cropData.dialog = false;
          } else {
            this.cropData.fileName = this.source.fileName;
            this.cropData.file = this.source.file;
            this.cropData.PgCount = pdfDoc.getPageCount();
            this.cropData.dialog = false;
          }
        })
        .catch((error) => {
          console.error("Error loading PDF document:", error);
        });
      this.$emit("close", this.cropData);
  },
    FilePDF() {
    //   var type = this.source.file.type.split("/")[1];
    //   if (type == "pdf") {
    //     const reader = new FileReader();
    //     reader.onload = this.handleFileRead;
    //     reader.readAsArrayBuffer(this.source.file);

    //     return false;
    //   }
      return true;
    },
  },
  watch: {
    source: {
      handler() {
        if (
          this.source.dialog &&
          this.source.file != null &&
          this.source.file != ""
        ) {
          if (this.FilePDF()) {
            this.GenerateImgURL(this.source.file);
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
#pimgcon {
    height: 100%;
    width: 100%;
}

#dy {
    max-width: 350;
}
</style>