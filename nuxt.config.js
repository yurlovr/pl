import {url_api, prom_host, prom_port} from './.env.js';
import webpack from 'webpack';

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: 'ПЛЯЖИ.РУ',
    noscript: [{innerHTML: '<img src="https://vk.com/rtrg?p=VK-RTRG-505686-cbKtO" style="position:fixed; left:-999px;" alt=""/>'}],
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
    }],
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
    '~/plugins/gtm',
    '~/plugins/sentry',
    { src: '~/plugins/bus',             ssr: true  },
    { src: '~/plugins/cookie',          ssr: false },
    { src: '~/plugins/scroll-lock',     ssr: false },
    { src: '~/plugins/custom-scroll',   ssr: false },
    { src: '~/plugins/youtube',         ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   *
   */
  buildModules: [
    '@nuxtjs/gtm'
  ],

  gtm: {
    dev: true,

    id: 'GTM-T7SKSV7',
    layer: 'dataLayer',
    variables: {},

    pageTracking: false,
    pageViewEventName: 'nuxtRoute',

    autoInit: true,
    respectDoNotTrack: true,

    scriptId: 'gtm-script',
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',

    noscript: true,
    noscriptId: 'gtm-noscript',
    noscriptURL: 'https://www.googletagmanager.com/ns.html'
  },
  // render: {
  //   compression: {
  //
  //   }
  // },
  generate: {
    async routes({$axios}) {
      let beachAsync = await $axios.get(url_api + 'beach/list?count=9999'),
        beachRoutes = beachAsync.data.data.list.map((b) => {
          return {
            route: `/beach/${b.ID}`
          }
        });

      let eventAsync = await $axios.get(url_api + 'event/list?count=9999'),
        eventRoutes = eventAsync.data.data.list.map((e) => {
          return {
            route: `/event/${e.ID}`
          }
        });

      let infoPagesAsync = await $axios.get(url_api + 'page/list?count=9999'),
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
    'cookie-universal-nuxt',
    ["nuxt-compress", {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }],
    ['@nuxtjs/component-cache', {
        maxAge: 1000 * 60 * 60
      }],
    ['nuxt-lazy-load', {
      images: true,
      directiveOnly: true,
      defaultImage: '/pics/global/pics/slider_beh_placeholder.png'
    }],
    ['@qonfucius/nuxt-prometheus-module', {
        port: prom_port,
        host: prom_host,
        metrics: {
          collectDefault: true,
          requestDuration: false,
        },
     }],
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
    cache: true,
    // Uncomment for analyze code
    // analyze: {
    //   analyzerMode: 'static',
    //   analyzerMode: 'server'
    // },
    devtools: true,
    transpile: ["vue-clamp", "resize-detector"],
    extend(config, ctx) {
      // Этот код убирает ненужные локали из момента
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/))
      // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)),
    }
  }
}
