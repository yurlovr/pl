<template>
  <div>
    <p v-if="$fetchState.pending">
    <!-- Fetching data -->
    </p>
    <p v-else-if="$fetchState.error">
    <!-- error message here -->
    </p>
    <div v-else class="main-page">
      <img
        src="~/static/pics/main/bg.jpg"
        class="main-page__welcome__background"
        alt="Добро пожаловать"
      >
      <div class="main-page__welcome__gradient" />
      <Welcome />

      <!-- <Search
        v-show="!(bgAndBarShown || tempBgAndBarShown)"
        class="main-page__welcome__search"
        label-id="1"
      /> -->

      <BeachSliderAreaMoment
        v-if="getBeachesTop"
        class="main-page__popular-beaches"
        :data="getBeachesTop"
      />
      <Cities
        v-if="getCitiesTop"
        :data="getCitiesTop"
      />

      <LazyHydrate when-visible>
        <div>
          <!-- <MapArea
            v-if="getMap"
            :data="getMap"
            :map-data="mapEntity"
          /> -->

          <Banner :index="2" class="banner-1" />
<!--
          <div v-if="getFamilyRest" class="main-page__white-wrapper">
            <BeachSliderArea :data="getFamilyRest" class="main-page__family-rest" />
          </div> -->

          <BeachSliderArea
            v-if="getEvents"
            class="main-page__beach-events"
            :data="getEvents"
          />

          <!-- <ChooseBeach
            v-if="getChooseYourBeach"
            :data="getChooseYourBeach"
          /> -->

          <!-- <DynamicSliderArea
            v-if="getActiveRest"
            :data="getActiveRest"
          /> -->

          <div class="main-page__white-wrapper">
            <WeatherSliderArea
              v-if="getWeather"
              :data="getWeather"
            />
          </div>
<!--
          <div
            v-if="getAnotherPlaces && getAnotherPlaces.beachNumber > 0"
            class="main-page__white-wrapper"
          >
            <BeachSliderArea
              :data="getAnotherPlaces"
              class="main-page__family-rest"
              outlink="https://nash.travel/hotel"
            />
          </div> -->

          <Banner
            :index="0"
            class="banner-2"
          />

          <!-- <BeachType
            v-if="getChooseToYourWishes"
            :data="getChooseToYourWishes"
          /> -->

          <Banner
            :index="1"
            :last-word-yellow="true"
            class="banner-3"
          />
        </div>
      </LazyHydrate>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import LazyHydrate from 'vue-lazy-hydration';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import BeachSliderAreaMoment from '~/components/global/BeachSliderArea';
import Cities from '~/components/pages/main/Cities';
// import Banner from '~/components/pages/main/Banner';
// import ChooseBeach from '~/components/pages/main/ChooseBeach';
// import BeachType from '~/components/pages/main/BeachType';
// import WeatherSliderArea from '~/components/pages/main/WeatherSliderArea';
// import DynamicSliderArea from '~/components/pages/main/DynamicSliderArea';
// import MapArea from '~/components/pages/main/MapArea';

export default {
  components: {
    Welcome,
    Search,
    BeachSliderAreaMoment,
    Cities,
    // MapArea: () => import('~/components/pages/main/MapArea'),
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    Banner: () => import('~/components/pages/main/Banner'),
    ChooseBeach: () => import('~/components/pages/main/ChooseBeach'),
    BeachType: () => import('~/components/pages/main/BeachType'),
    WeatherSliderArea: () => import('~/components/pages/main/WeatherSliderArea'),
    DynamicSliderArea: () => import('~/components/pages/main/DynamicSliderArea'),
    LazyHydrate,
  },

  // async asyncData({ $axios, route }) {
  //   // console.log('1 hook asyncData')
  // },

  data() {
    // console.log('2 hook data')
    return {
      meta: null,
      bgAndBarShown: false,
      tempBgAndBarShown: false,
    };
  },

  async fetch() {
    const [meta] = await Promise.all([
      this.$axios.$get(`seo/meta?url=${this.$route.fullPath}`),
      !this.getBeachesTop && this.getMainPageData(),
    ]);
    this.setGeoLocating(this.$cookies.get('geo_locating'));
    this.meta = meta.data;
  },

  head() {
    // console.log('5 hook head')
    const meta = this.meta || {};
    const stable = 'ПЛЯЖИ.РУ';
    return {
      title: meta.title || stable,
      meta: [
        { hid: 'description-beach', name: 'description', content: meta.description || stable },
        { hid: 'keywords-beach', name: 'keywords', content: meta.keywords || stable },
      ],
    };
  },

  computed: {
    ...mapGetters('main', [
      'getBeachesTop',
      'getCitiesTop',
      'getEvents',
      'getWeather',
    ]),
    // ...mapGetters('main', [
    //   'getBeachesTop',
    //   'getCitiesTop',
    //   'getMap',
    //   'getBanners',
    //   'getFamilyRest',
    //   'getAnotherPlaces',
    //   'getEvents',
    //   'getChooseYourBeach',
    //   'getActiveRest',
    //   'getChooseToYourWishes',
    //   'getWeather',
    // ]),
    ...mapGetters(['mapEntity']),
  },

  async created() {
    // console.log('3 hook created')
  },

  beforeMount() {
    // TODO Вынести куданибудь в одно место
    // выдывать надо как только process.browser станет тру
    if (process.browser) {
      require('swiper/dist/css/swiper.css');
      const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
      Vue.use(VueAwesomeSwiper);
    }
  },

  mounted() {
    this.$bus.$emit('mainPageReady');
    this.$bus.$emit('hidePageTransitioner');
    this.$bus.$emit('dontShowSearch');

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);

    this.onScroll();
    this.onResize();

    this.$bus.$on('hideHeaderBgAndBar', () => {
      this.bgAndBarShown = false;
    });

    this.$bus.$on('tempHideHeaderBgAndBar', () => {
      this.tempBgAndBarShown = false;
    });

    this.$bus.$on('showHeaderBgAndBar', () => {
      this.bgAndBarShown = true;
    });

    this.$bus.$on('tempShowHeaderBgAndBar', () => {
      this.tempBgAndBarShown = true;
    });
  },

  methods: {
    ...mapActions('main', ['getMainPageData']),
    ...mapMutations('main', ['setGeoLocating']),

    onScroll() {
      // if (document.querySelector('main-page')) {
      //   window.removeEventListener('scroll', this.onScroll, false);
      //   return;
      // }

      const scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
      console.log(scrollTop)

      // show or hide the search background and the bar depending on the scroll
      if (window.innerWidth > 900 && scrollTop >= 346 || window.innerWidth <= 900 && window.innerWidth > 800 && scrollTop >= 230 || window.innerWidth <= 800 && window.innerWidth > 650 && scrollTop >= 245 || window.innerWidth <= 650 && scrollTop >= 20) {
        this.$bus.$emit('showHeaderBgAndBar');
      } else {
        this.$bus.$emit('hideHeaderBgAndBar');
      }
    },

    onResize() {
      // correct the text for the mobile
      if (window.innerWidth <= 650) {
        this.$bus.$emit('showCorrectSelectText');
      } else {
        this.$bus.$emit('dontShowCorrectSelectText');
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
    this.$bus.$emit('showHeaderBgAndBar');
    next();
  },
};
</script>
