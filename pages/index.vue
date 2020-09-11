<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.jpg" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" labelId="1" />
    <BeachSliderArea class="main-page__popular-beaches" :data="getBeachesTop" v-if="getBeachesTop" />

    <Cities :data="getCitiesTop" v-if="getCitiesTop" />

    <MapArea :data="getMap" :mapData="mapEntity" v-if="getMap" />

    <Banner :data="getBanners[2]" v-if="getBanners && getBanners[2]" class="banner-1" />

    <div class="main-page__white-wrapper" v-if="getFamilyRest">
      <BeachSliderArea :data="getFamilyRest" class="main-page__family-rest" />
    </div>

    <BeachSliderArea class="main-page__beach-events" :data="getEvents" v-if="getEvents" />

    <ChooseBeach :data="getChooseYourBeach" v-if="getChooseYourBeach" />
    <DynamicSliderArea :data="getActiveRest" v-if="getActiveRest" />

    <div class="main-page__white-wrapper">
      <WeatherSliderArea :data="getWeather" v-if="getWeather" />
    </div>
    <div class="main-page__white-wrapper" v-if="getAnotherPlaces && getAnotherPlaces.beachNumber > 0">
      <BeachSliderArea :data="getAnotherPlaces" class="main-page__family-rest" outlink="https://nash.travel/hotel" />
    </div>

    <Banner
      :data="getBanners[0]"
      v-if="getBanners && getBanners[0]"
      class="banner-2"
    />

    <BeachType :data="getChooseToYourWishes" v-if="getChooseToYourWishes" />

    <Banner
      :data="getBanners[1]"
      :lastWordYellow="true"
      v-if="getBanners && getBanners[1]"
      class="banner-3"
    />

    <MobileSettingsModal v-if="open_app && getMobileSettings && getMobileSettings.length > 0"
                         :data="getMobileSettings" @closeModal="(v) => {this.open_app = v}"/>
  </div>
</template>

<script>
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import BeachSliderArea from '~/components/global/BeachSliderArea';
import Cities from '~/components/pages/main/Cities';
import Banner from '~/components/pages/main/Banner';
import ChooseBeach from '~/components/pages/main/ChooseBeach';
import BeachType from '~/components/pages/main/BeachType';
import WeatherSliderArea from '~/components/pages/main/WeatherSliderArea';
import DynamicSliderArea from '~/components/pages/main/DynamicSliderArea';
import MapArea from '~/components/pages/main/MapArea';
import MobileSettingsModal from '~/components/global/MobileSettingsModal';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    Search,
    Welcome,
    BeachSliderArea,
    Cities,
    MapArea,
    ChooseBeach,
    BeachType,
    WeatherSliderArea,
    DynamicSliderArea,
    Banner,
    MobileSettingsModal
  },
  data (){
    return{
      open_app: false
    }
  },

  async asyncData( {$axios, route}){
    const {data} = await $axios.$get('seo/meta?url=' + route.fullPath)
    return {
      meta: data
    }
  },

  mounted() {
    this.$bus.$emit('dontShowSearch');

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);
    this.onScroll();
    this.onResize();
  },

 async created() {
    // this.mainData.map_entity = this.mapEntity;
    this.setGeoLocating(this.$cookies.get('geo_locating'));
    this.getMainPageData(() => {
      this.$bus.$emit('mainPageReady');
      this.$bus.$emit('hidePageTransitioner');
    });
  },

  head() {
    const stable = 'ПЛЯЖИ.РУ'
    return {
      title: this.meta.title || stable,
      meta: [
        {
          hid: 'description-beach',
          name: 'description',
          content: this.meta.description || stable
        },
        {hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable},
      ]
    }
  },

  computed: {
    ...mapGetters('main', [
      'getBeachesTop',
      'getCitiesTop',
      'getMap',
      'getBanners',
      'getFamilyRest',
      'getAnotherPlaces',
      'getEvents',
      'getChooseYourBeach',
      'getActiveRest',
      'getChooseToYourWishes',
      'getWeather',
      'getMobileSettings',

    ]),
    ...mapGetters(['mapEntity']),
    mainData() {
      return this.$store.getters["main/mainData"]
    }
  },

  methods: {
    ...mapActions('main', ['getMainPageData']),
    ...mapMutations('main', ['setGeoLocating']),

    onScroll() {
      if (document.querySelector('main-page')) {
        window.removeEventListener('scroll', this.onScroll, false);
        return;
      }

      let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;

      // show or hide the search background and the bar depending on the scroll
      if (window.innerWidth > 900 && scrollTop >= 346 || window.innerWidth <= 900 && window.innerWidth > 800 && scrollTop >= 230 || window.innerWidth <= 800 && window.innerWidth > 650 && scrollTop >= 245 || window.innerWidth <= 650 && scrollTop >= 20) {
        this.$bus.$emit("showHeaderBgAndBar");
      } else {
        this.$bus.$emit("hideHeaderBgAndBar");
      }
    },

    onResize() {
      // correct the text for the mobile
      if (window.innerWidth <= 650) {
        this.open_app = true;
        this.$bus.$emit('showCorrectSelectText');
      } else {
        this.open_app = false;
        this.$bus.$emit('dontShowCorrectSelectText');
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
    this.$bus.$emit("showHeaderBgAndBar");
    next();
  }
}
</script>
