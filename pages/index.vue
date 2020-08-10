<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.jpg" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" labelId="1" />
    <BeachSliderArea class="main-page__popular-beaches" :data="mainData.beachesTop" v-if="mainData.beachesTop" />
    <Cities :data="mainData.citiesTop" v-if="mainData.citiesTop" />
    <MapArea :data="mainData.map" :mapData="mapEntity" v-if="mainData.map" />
    <Banner :data="mainData.banners[2]" v-if="mainData.banners && mainData.banners[2]" class="banner-1" />
    <div class="main-page__white-wrapper" v-if="mainData.familyRest">
      <BeachSliderArea :data="mainData.familyRest" class="main-page__family-rest" />
    </div>
    <BeachSliderArea class="main-page__beach-events" :data="mainData.events" v-if="mainData.events" />
    <ChooseBeach :data="mainData.chooseYourBeach" v-if="mainData.chooseYourBeach" />
    <DynamicSliderArea :data="mainData.activeRest" v-if="mainData.activeRest" />
    <div class="main-page__white-wrapper">
      <WeatherSliderArea :data="mainData.weather" v-if="mainData.weather" />
    </div>
    <div class="main-page__white-wrapper" v-if="mainData.another_places && mainData.another_places.length > 0">
      <BeachSliderArea :data="mainData.another_places" class="main-page__family-rest" outlink="https://nash.travel/hotel" />
    </div>
    <Banner :data="mainData.banners[0]" v-if="mainData.banners && mainData.banners[0]" class="banner-2" />
    <BeachType :data="mainData.chooseToYourWishes" v-if="mainData.chooseToYourWishes" />
    <Banner :data="mainData.banners[1]" :lastWordYellow="true" v-if="mainData.banners && mainData.banners[1]" class="banner-3" />
    <MobileSettingsModal v-if="open_app && mainData.mobile_settings && mainData.mobile_settings.length > 0"
                         :data="mainData.mobile_settings" @closeModal="(v) => {this.open_app = v}"/>
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
    this.mainData.map_entity = this.mapEntity;
    this.setGeoLocating(this.$cookies.get('geo_locating'));
    this.getMainPageData(() => {
      this.$bus.$emit('mainPageReady');
      this.$bus.$emit('hidePageTransitioner');
    });
  },

  head(){
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
    ...mapGetters('main', ['mainData']),
    ...mapGetters(['mapEntity']),
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
