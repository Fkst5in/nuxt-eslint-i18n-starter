// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // target: 'static',
  // ssr: false,
  modules: ['@pinia/nuxt'],
  alias: {
    store: '/store',
    locales: '/locales'
  }
})
