import axios from 'axios';
import {url_api} from './.env.js';

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: "width=device-width, initial-scale=1, user-scalable=no"
    }, {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  router: {
    base: '/',

    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: [{
    src: '~/assets/scss/app.scss',
    lang: 'scss'
  }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/bus', {
      src: '~/plugins/scroll-lock',
      ssr: false
    }, {
      src: '~/plugins/custom-scroll',
      ssr: false
    },
    {
      src: '~/plugins/youtube',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],

  generate: {
    async routes() {
      let beachAsync = await axios.get(url_api+'beach/list?count=9999'),
        beachRoutes = beachAsync.data.data.list.map((b) => {
          return {
            route: `/beach/${b.ID}`
          }
        });

      let eventAsync = await axios.get(url_api+'event/list?count=9999'),
        eventRoutes = eventAsync.data.data.list.map((e) => {
          return {
            route: `/event/${e.ID}`
          }
        });

      let infoPagesAsync = await axios.get(url_api+'page/list?count=9999'),
        infoPages = infoPagesAsync.data.data.list.map((e) => {
          return {
            route: `/${e.CODE}`
          }
        });

      return [
        ...beachRoutes, ...eventRoutes, ...infoPages
      ];
    },

    fallback: '/404/index.html'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    'cookie-universal-nuxt'
  ],
  axios: {
    baseURL: url_api
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ["vue-clamp", "resize-detector"],
    extend(config, ctx) {
    }
  }
}
