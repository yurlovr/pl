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
        <AnyPlaces
          :page="'main'"
          :white="true"
        />
      </LazyComponent>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.EXCURSIONS_BEACH"
            :height="649"
          />
        </template>
        <Excursions
          :page="'main'"
        />
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
import { mapActions, mapMutations } from 'vuex';
import { PLUG_TITLE } from '~/const/const';
import { head } from '~/mixins/head';

export default {
  components: {
    Welcome: () => import('~/components/pages/main/Welcome'),
    Search: () => import('~/components/global/Search'),
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
    Excursions: () => import('~/components/global/Excursions'),
  },
  mixins: [head],

  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
    this.$bus.$emit('showHeaderBgAndBar');
    next();
  },

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

  mounted() {
    this.$bus.$emit('mainPageReady');
    this.$bus.$emit('hidePageTransitioner');
    this.$bus.$emit('dontShowSearch');

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);

    // this.onScroll();
    this.onResize();
  },

  methods: {
    ...mapActions('main', ['getMainPageData']),
    ...mapMutations('main', ['setGeoLocating']),

    onScroll() {
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
};
</script>
