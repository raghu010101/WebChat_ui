// plugins/global.js
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {

    const globalData = reactive({

        logged: false,
        msg: "",
        alertColor: "",
        alert: "",
        backgroundColor: "",
        IconColor: "",
        snackbar: false,
        links: [],
        subMenu: [],
        overlay: false,
        timeout: -1,
        host: "",
        appName: "",
        url: "",
        currentTime: "",
        fetchFileURL:"http://192.168.2.133:28595/api/showfileNew?id=",
        // fetchFileURL:"http://ft.onlinechat:28595/api/showfileNew?id=",

        // SocketUrl:"ws://ft.onlinechat:28595/api/socket",
        SocketUrl:"ws://192.168.2.133:28595/api/socket",



        CurrentPage:"",
    });

    nuxtApp.vueApp.config.globalProperties.MessageBar = (indicator, Msg) => {
        // alert("sdfhd")
        console.log("inside messagebar",indicator,Msg);
        globalData.msg = Msg;
        globalData.alert = true;
        globalData.snackbar = true;
        if (indicator == "S") {
            globalData.backgroundColor = "green-lighten-5";
            globalData.IconColor = "green-darken-2";
            globalData.Icon = "mdi-check-circle-outline";
            globalData.alerttitle = "Success";
            globalData.timeout = 3000;
        } else if (indicator == "E") {
            globalData.backgroundColor = "red-lighten-5";
            globalData.IconColor = "red-darken-2";
            globalData.Icon = "mdi-alert";
            globalData.alerttitle = "Error";
            globalData.timeout = 3000;
        }else if (indicator == "I"){
            globalData.backgroundColor = "yellow-lighten-5";
            globalData.IconColor = "yellow-darken-2";
            globalData.Icon = "mdi-alert";
            globalData.alerttitle = "Alert";
            globalData.timeout = 3000;
        }
    };

    nuxtApp.vueApp.config.globalProperties.closeAlert = () => {
        setTimeout(() => {
            globalData.alert = false;
            globalData.snackbar = false;
        }, 3000);
    },

        nuxtApp.vueApp.config.globalProperties.GetCurrentTime = () => {
            // console.log("Calling time function");
            const currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            let seconds = currentTime.getSeconds();
            hours = (hours < 10 ? "0" : "") + hours;
            minutes = (minutes < 10 ? "0" : "") + minutes;
            seconds = (seconds < 10 ? "0" : "") + seconds;
            //this.currentTime = `08:00:00`;

            globalData.currentTime = `${hours}:${minutes}:${seconds}`;
        };

    nuxtApp.vueApp.config.globalProperties.dateConvert = (value) => {
        const dateObject = new Date(value);

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
        const day = String(dateObject.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    nuxtApp.vueApp.config.globalProperties.formattedNumber = (value) => {
        return value.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },

    nuxtApp.vueApp.config.globalProperties.GetFile=(docid)=>{
        return this.$globalData.fetchFileURL + docid;
      },

        // // Expose the global data object to all components
        nuxtApp.vueApp.config.globalProperties.$globalData = globalData;
    // nuxtApp.vueApp.config.globalProperties.MessageBar = MessageBar;
});


// Vue.mixin({
//     data: function () {
//       return {};
//     },

//     methods: {
//         GetFile(docid) {
//             console.log("accessasdhsdbcvb");
//             return this.$globalData.fetchFileURL + docid;
//           },
//     }
// })


