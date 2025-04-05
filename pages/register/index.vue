<template>
  <v-container fluid class="pa-0 ma-0">
    <!-- Background image for mobile view -->
    <Background background-image="/images/background.webp">
      <!-- Form for mobile view (hidden on medium screens and above) -->
      <v-container     class=" mb-6  position_fixed" fluid >
        <v-row justify="center" align="center" 
        style="height:80vh;"
        no-gutters>
          <v-col cols="12" md="4">
            <v-card  class="rounded-xl ma-auto mx-auto pa-6"  height="auto"  elevation="18"
            :class="$vuetify.display.smAndDown ? 'bgTransparent elevation-0' : ''">
              <v-card-title>
                <v-icon size="20" class="mr-2 mt-n1" style="cursor: pointer;" @click="this.$router.push('/')">mdi-arrow-left</v-icon>
                <span class="font-weight-bold">Register</span>
              </v-card-title>
              <v-card-text :class="$vuetify.display.xs ? 'pa-4 px-0' : 'pa-8'">
                <v-form ref="registerform" class="custom-form" @submit.prevent>
                  <v-text-field
                    v-model="form.clientid"
                       :error-messages="errorMessages"
                    label="STCode"
                    required
                     :rules="[() => !!form.clientid || 'This field is required']"
                    :density="$vuetify.display.smAndDown ? 'compact' : 'comfortable'"
                    variant="outlined"
                    class="custom-input mb-2"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.username"
                       :error-messages="errorMessages"
                    label="Username"
                    required
                     :rules="[() => !!form.username || 'This field is required']"
                    :density="$vuetify.display.smAndDown ? 'compact' : 'comfortable'"
                    variant="outlined"
                    class="custom-input mb-2"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                       :error-messages="errorMessages"
                    required
                     :rules="[() => !!form.email|| 'This field is required']"
                    :density="$vuetify.display.smAndDown ? 'compact' : 'comfortable'"
                    variant="outlined"
                    class="custom-input mb-2"
                  ></v-text-field>
                  <v-text-field
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
                    class="mb-2"
                  ></v-text-field>
                <div class="text-center">
                  <v-btn @click="register" color="primary" class="custom-btn ">Register</v-btn>
                </div>

                <div class="text-center mt-4" v-if="ExistingUser">
                 <span class="text-body-2 text-error">User Already Exists for this STCode/Email.</span>
                </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </Background>
  </v-container>
</template>

<script>
import EventService from "../../services/EventService";
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        clientid:'',
      },
      visible: false,
      ExistingUser : false,
      errorMessages: '',
    };
  },
  watch:{
    name () {
        this.errorMessages = ''
      },
  },
  methods: {
   async register() {
     var Validflag
     await this.$refs.registerform.validate().then(async(resp)=>{
       Validflag = resp.valid
        console.log("sdfsdf",Validflag);
      }).catch((err)=>{
        console.warn(err);
      })

      console.log("this.$refs.registerform.validate()",Validflag)
      if ( Validflag ) {
      // console.log('User registered:', this.form);

        EventService.RegisterUser(this.form).then((resp)=>{
          // console.log("sdfsdfd",resp.data);

          if (resp.data.status == "S") {
            // this.MessageBar("S",resp.data.errmsg)
            this.$router.push('/')
          } else {
            if (resp.data.msg == "Exist") {
              this.ExistingUser = true
            }else{
              console.warn(resp.data.msg);
            }
            //
            // this.MessageBar("E",resp.data.msg)
          }
        }).catch((err)=>{
          console.log(err);
        })

      }else{
        this.MessageBar("E","Field should not be empty ")
      }
    //  
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles.scss';

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

@media only screen and (max-width: 600px) {
  .Background {
    background-color: #f0f0f0; /* Fallback color for small screens */
  }
}
</style>
