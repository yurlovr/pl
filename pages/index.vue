<template>
  <div>
    <p v-if="$fetchState.pending">
    <!-- Fetching data -->
    </p>
    <!-- <p v-else-if="$fetchState.error"> -->
    <!-- error message here -->
    <!-- </p> -->
    <div

      class="main-page"
    >
      <img
        src="~/static/pics/main/bg.jpg"
        class="main-page__welcome__background"
        alt="Добро пожаловать"
      >
      <div class="main-page__welcome__gradient" />
      <Welcome />
      <Search
        v-show="!(bgAndBarShown || tempBgAndBarShown)"
        class="main-page__welcome__search"
        label-id="1"
      />
      <BeachSliderAreaMoment />
      <GetCities />
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.MAP"
            :map="true"
          />
        </template>
        <MapBlock />
      </LazyComponent>
      <!-- <Banner :index="2" class="banner-1" /> -->
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.FAMILY_REST"
          />
        </template>
        <FamilyRest />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.EVENTS"
          />
        </template>
        <Events
          class="main-page__beach-events"
        />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.CHOOSE_BEACH"
            :height="209"
          />
        </template>
        <ChooseBeach />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.ACTIVE_REST"
          />
        </template>
        <DynamicSliderArea />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.WEATHER"
          />
        </template>
        <WeatherSliderArea />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.ANY_PLACES"
          />
        </template>
        <AnyPlaces />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.BANNERS"
            :height="1513"
          />
        </template>
        <BannersBlock />
      </LazyComponent>
    </div>
  </div>
</template>

<script>
// import LazyHydrate from 'vue-lazy-hydration';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import { PLUG_TITLE } from '~/const/const';
import { head } from '~/mixins/head';

export default {
  components: {
    Welcome,
    Search,
    WeatherSliderArea: () => import('~/components/pages/main/WeatherSliderArea'),
    DynamicSliderArea: () => import('~/components/pages/main/DynamicSliderArea'),
    BannersBlock: () => import('~/components/pages/main/BannersBlock'),
    Events: () => import('~/components/pages/main/Events'),
    FamilyRest: () => import('~/components/pages/main/FamilyRest'),
    GetCities: () => import('~/components/pages/main/GetCities'),
    AnyPlaces: () => import('~/components/pages/main/AnyPlaces'),
    LazyComponent: () => import('~/components/global/LazyComponent'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    ChooseBeach: () => import('~/components/pages/main/ChooseBeach'),
    BeachSliderAreaMoment: () => import('~/components/pages/main/BeachSliderAreaMoment'),
    MapBlock: () => import('~/components/pages/main/MapBlock'),
  },
  mixins: [head],
  data() {
    return {
      meta: null,
      bgAndBarShown: false,
      tempBgAndBarShown: false,
      PLUG_TITLE,
    };
  },

  async fetch() {
    this.setGeoLocating(this.$cookies.get('geo_locating'));
  },

  computed: {
    ...mapGetters(['mapEntity']),
  },

  mounted() {
    this.$bus.$emit('mainPageReady');
    this.$bus.$emit('hidePageTransitioner');
    this.$bus.$emit('dontShowSearch');

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);

    // this.onScroll();
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
    ...mapActions('loading', ['setLoading']),
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
