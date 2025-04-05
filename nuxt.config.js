// nuxt.config.js

export default defineNuxtConfig({
  devtools: { enabled: true },
  target: 'server',
  server: {
    host: '192.168.2.133', // Default: localhost
    port: 3000       // Default: 3000
  },
  app: {
    loadingIndicator: false
  },
  // runtimeConfig: {
  //   public: {
  //     wsServerUrl: process.env.WS_SERVER_URL
  //   }
  // },
  css: [
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.css",
    "@/assets/styles.scss"
  ],

  build: {
    transpile: ["vuetify"]
  },

  plugins: [
    // { src: '~/plugins/socket.io.js', mode: 'client' } // Include your socket.io plugin
  ],

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    customVariables: ['~/assets/styles.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  },

  compatibilityDate: '2024-07-19'
})