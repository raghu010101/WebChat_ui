import axios from "axios";
const baseApiClient = axios.create(
  {
    // baseURL: process.env.VUE_APP_Base_URL,  process.env.
    baseURL: "http://localhost:28595",
    // baseURL: "http://192.168.2.133:28595",
    // baseURL: "http://ft.onlinechat:28595",


    // baseURL:process.env.SERVER_URL,


    withCredentials: false,
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json"
    },
  });

export default {

  RegisterUser(body) {
    // console.log("Inside Api");
    return baseApiClient.put("/api/signup", body);

  },
  Login(body) {
    return baseApiClient.put("/api/login", body);
  },

  CreateGroup(body) {
    return baseApiClient.put("/api/creategroup", body);
  },

  Joingroup(body) {
    return baseApiClient.put("/api/joingroup", body);
  },

  GetAllGroup(ftcode) {
    const hdr = {
      headers: {
        FTcode: ftcode
      },
    };
    return baseApiClient.get("/api/groupsin", hdr);
  },


  // MANUAL ENTRY
  multiuploadFile(body, fileArr) {
    const hdr = {
      headers: {
        "content-type": "multipart/form-data",
        FileStruct: JSON.stringify(fileArr),
      },
    };
    return baseApiClient.post("/api/proofUploads", body, hdr);
  },


  GetGroupList() {
    return baseApiClient.get("/api/allgroups");
  },

  Getpath(input) {
    return baseApiClient.get("/api/downloadFile?id=" + input);
  },

}