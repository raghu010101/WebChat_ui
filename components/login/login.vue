<template>
    <v-container fluid class="pa-0 ma-0">
      <Background background-image="/images/background.webp">
        <v-container class="mb-6 position_fixed" fluid v-if="!loggedIn">
          <v-row justify="center" align="center" style="height:80vh;" no-gutters>
            <v-col cols="12" md="4">
              <v-card class="rounded-xl ma-auto mx-auto pa-6" height="auto" elevation="18"
                :class="$vuetify.display.smAndDown ? 'bgTransparent elevation-0' : ''">
                <v-card-title>
                 <span class="font-weight-bold"> Login</span>
                </v-card-title>
                <v-card-text :class="$vuetify.display.xs ? 'pa-4 px-0' : 'pa-8'">
                  <v-form ref="loginform" class="custom-form">
                    <v-text-field
                      ref="email"
                      v-model="form.clientid"
                      label="STCode"
                      :error-messages="errorMessages"
                      required
                      :rules="[() => !!form.clientid || 'This field is required']"
                      :density="$vuetify.display.smAndDown ? 'compact' : 'comfortable'"
                      variant="outlined"
                      class="custom-input mb-6"
                    ></v-text-field>
                    <v-text-field
                      ref="password"
                      v-model="form.password"
                      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :bg-color="$vuetify.display.smAndDown ? 'D0E2FF' : ''"
                      :type="visible ? 'text' : 'password'"
                      :error-messages="errorMessages"
                      :density="$vuetify.display.smAndDown ? 'compact' : 'comfortable'"
                      placeholder="Password"
                      prepend-inner-icon="mdi-lock-outline"
                      :rules="[() => !!form.password || 'This field is required']"
                      variant="outlined"
                      @click:append-inner="visible = !visible"
                    ></v-text-field>
                    <v-row justify="center">
                      <v-col cols="auto">
                        <v-btn @click="login" color="primary" class="custom-btn ">Login</v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="auto">
                        <span>Don't have an account? </span>
                        <v-btn class="text-decoration-underline mx-0 px-0" variant="text" @click="$router.push('/register')" color="pink" >
                           Register
                        </v-btn>
                      </v-col>
                      <div class="text-center mt-4" v-if="InvalidUser">
                   <span class="text-body-2 text-error">Invalid User Credential.</span>
                  </div>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </Background>
      <v-container v-if="loggedIn" fluid>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="auto">
            <div ref="lottieContainer" style="width: 320px; height: 320px;"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  
  <script>
  import lottie from 'lottie-web';
  import animationData from '~/assets/lottie/msg.json'; // Replace with your animation JSON file path
  import EventService from "../../services/EventService";
  export default {
    data() {
      return {
        form: {
          clientid: '',
          password: ''
        },
        visible: false,
        errorMessages: '',
        loggedIn: false,
  
        InvalidUser:false
      };
    },
    methods: {
     async login() {
  
        var Validflag
       await this.$refs.loginform.validate().then(async(resp)=>{
         Validflag = resp.valid
        //   console.log("sdfsdf",Validflag);
        }).catch((err)=>{
          console.warn(err);
        })
  
    if ( Validflag ) {
      EventService.Login(this.form).then((resp)=>{
          if (resp.data.status == "S") {
            localStorage.setItem("ftcode",this.form.clientid)
            this.$router.push('/ftcchat');
          }else{
            if (resp.data.msg == "Invalid Credential.") {
                 this.InvalidUser = true
                //  this.MessageBar("E","sdhfgjds")
            }
            console.log("Invalid Credential ",resp.data);
          }
        }).catch((err)=>{
          console.log(err);
        })
    }else{
      this.MessageBar("E","Field should not be empty ")
    }
      },
      loadAnimation() {
        lottie.loadAnimation({
          container: this.$refs.lottieContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData
        });
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  @import '../assets/styles.scss';
  
  .Background {
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .custom-input {
    border-radius: 18px;
    border-width: 1px;
    background-color: transparent !important; /* Ensure transparent background */
  }
  
  .custom-btn {
    border-radius: 18px;
  }
  
  
  .fill-height {
    height: 100vh; /* Ensure the row fills the entire viewport height */
  }
  </style>