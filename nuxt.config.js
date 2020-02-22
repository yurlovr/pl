export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: "width=device-width, initial-scale=1, user-scalable=no" },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    base: '/'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FCAB2D' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/app.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/bus',
    { src: '~/plugins/v-select', ssr: false },
    { src: '~/plugins/scroll-lock', ssr: false },
    { src: '~/plugins/custom-scroll', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  generate: {
    routes: [
      '/beach/1',
      '/event/1'
    ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://crimea.air-dev.agency/api/app'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ['vue-clamp', 'resize-detector', /(.+)(@company\\library\\src\\utils\\)(.+)(\.js)$/],
    extend (config, ctx) {
    }
  }
}
