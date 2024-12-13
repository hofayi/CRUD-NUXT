// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@pinia/nuxt',
    // '@sidebase/nuxt-auth'
  ],
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI
  }
})
