<template>
  <div>
    <p v-if="$fetchState.pending">
    <!-- Fetching data -->
      ЗАПРОС
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
      <LazyHydrate
        when-visible
      >
        <div>
          <GetCities />
          <!-- <MapArea
            v-if="getMap"
            :data="getMap"
            :map-data="mapEntity"
          /> -->

          <!-- <Banner :index="2" class="banner-1" /> -->
          <FamilyRest />

          <Events
            class="main-page__beach-events"
          />
          <ChooseBeach />
          <DynamicSliderArea />
          <WeatherSliderArea />
          <AnyPlaces />
          <BannersBlock />
        </div>
      </LazyHydrate>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import BeachSliderAreaMoment from '~/components/global/BeachSliderArea';

export default {
  components: {
    Welcome,
    Search,
    BeachSliderAreaMoment,
    // Cities,
    // MapArea: () => import('~/components/pages/main/MapArea'),
    // BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    // Banner: () => import('~/components/pages/main/Banner.vue'),
    ChooseBeach: () => import('~/components/pages/main/ChooseBeach'),
    WeatherSliderArea: () => import('~/components/pages/main/WeatherSliderArea'),
    DynamicSliderArea: () => import('~/components/pages/main/DynamicSliderArea'),
    BannersBlock: () => import('~/components/pages/main/BannersBlock'),
    Events: () => import('~/components/pages/main/Events'),
    FamilyRest: () => import('~/components/pages/main/FamilyRest'),
    GetCities: () => import('~/components/pages/main/GetCities'),
    AnyPlaces: () => import('~/components/pages/main/AnyPlaces'),
    LazyHydrate,
  },

  data() {
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
    ]),
    ...mapGetters(['mapEntity']),
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
