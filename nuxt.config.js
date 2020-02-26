import axios from 'axios';

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

    extendRoutes (routes, resolve) {
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
  loading: {
    color: '#FCAB2D'
  },
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
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],

  generate: {
    async routes () {
      let beachAsync = await axios.get('https://crimea.air-dev.agency/api/app/beach/list'),
          beachRoutes = beachAsync.data.data.list.map((b) => {
        return {
          route: `/beach/${b.ID}`
        }
      });

      let eventAsync = await axios.get('https://crimea.air-dev.agency/api/app/event/list'),
        eventRoutes = eventAsync.data.data.list.map((e) => {
        return {
          route: `/event/${e.ID}`
        }
      });

      return [...beachRoutes, ...eventRoutes];
    }

    // routes: ["/event/43"]
    // babel: {
    //     presets: function({ isServer }, [preset, options]) {
    //         const r = [
    //             [
    //                 preset,
    //                 {
    //                     buildTarget: isServer ? "server" : "client",
    //                     ...options
    //                 }
    //             ]
    //             // [ Other presets ]
    //         ];

    //         r[0][1].targets = {
    //             browsers: ["> 1%", "last 2 versions"],
    //             ie: 11
    //         };

    //         r[0][1].polyfills = [
    //             "es6.array.iterator",
    //             "es6.promise",
    //             "es6.object.assign",
    //             "es7.promise.finally",
    //             "es6.symbol",
    //             "es6.array.find",
    //             "es6.array.from"
    //         ];

    //         return r;
    //     },
    //     plugins: ["@babel/plugin-transform-runtime"]
    // }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios"
  ],
  axios: {
    baseURL: "https://crimea.air-dev.agency/api/app"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ["vue-clamp", "resize-detector"],
    extend(config, ctx) {}

    // babel: {
    //     presets: function({ isServer }, [preset, options]) {
    //         const r = [
    //             [
    //                 preset,
    //                 {
    //                     buildTarget: isServer ? "server" : "client",
    //                     ...options
    //                 }
    //             ]
    //             // [ Other presets ]
    //         ];

    //         r[0][1].targets = {
    //             browsers: ["> 1%", "last 2 versions"],
    //             ie: 11
    //         };

    //         r[0][1].polyfills = [
    //             "es6.array.iterator",
    //             "es6.promise",
    //             "es6.object.assign",
    //             "es7.promise.finally",
    //             "es6.symbol",
    //             "es6.array.find",
    //             "es6.array.from"
    //         ];

    //         return r;
    //     },
    //     plugins: ["@babel/plugin-transform-runtime"]
    // }
  }
}
