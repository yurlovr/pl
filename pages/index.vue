<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.png" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" labelId="1" />
    <BeachSliderArea class="main-page__popular-beaches" :data="popularBeachesData" v-if="popularBeachesData" />
    <Cities :data="citiesData" />
    <MapArea :data="mapData" />
    <Banner :data="bannersData[2]" :showInfoOnPic="true" v-if="bannersData" class="banner-1" />
    <div class="main-page__white-wrapper">
      <BeachSliderArea :data="familyData" class="main-page__family-rest" v-if="familyData" />
    </div>
    <BeachEvents :data="eventsData" v-if="eventsData" />
    <ChooseBeach />
    <DynamicSliderArea :data="activeRestData" />
    <div class="main-page__white-wrapper">
      <WeatherSliderArea :data="weatherData" />
    </div>
    <Banner :data="bannersData[0]" v-if="bannersData" class="banner-2" />
    <BeachType :data="beachTypeData" v-if="beachTypeData" />
    <Banner :data="bannersData[1]" :lastWordYellow="true" v-if="bannersData" class="banner-3" />
    <!-- <BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" v-if="false" /> -->
  </div>
</template>

<script>
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import BeachSliderArea from '~/components/global/BeachSliderArea';
import Cities from '~/components/pages/main/Cities';
import Banner from '~/components/global/Banner';
import BeachEvents from '~/components/global/BeachEvents';
import ChooseBeach from '~/components/pages/main/ChooseBeach';
import BeachType from '~/components/pages/main/BeachType';
import WeatherSliderArea from '~/components/pages/main/WeatherSliderArea';
import DynamicSliderArea from '~/components/pages/main/DynamicSliderArea';
import MapArea from '~/components/pages/main/MapArea';

import { mapGetters } from 'vuex';

export default {
  components: {
    Search,
    Welcome,
    BeachSliderArea,
    Cities,
    MapArea,
    BeachEvents,
    ChooseBeach,
    BeachType,
    WeatherSliderArea,
    DynamicSliderArea,
    Banner
  },

  mounted() {
    this.$bus.$emit('dontShowSearch');

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);
    this.onScroll();
    this.onResize();
  },

  async fetch({ store }) {
    await store.dispatch('main/getPopularBeaches');
    await store.dispatch('main/getCities');
    await store.dispatch('main/getEvents');
    await store.dispatch('main/getDynamicSlider');
    await store.dispatch('main/getWeather');
    await store.dispatch('main/getBeachTypes');
    await store.dispatch('main/getCollection');
    await store.dispatch('main/getCollectionList');
    await store.dispatch('main/getBanners');
    await store.dispatch('main/getMap');
  },

  methods: {
    onScroll() {
      let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;

      // show or hide the search background and the bar depending on the scroll
      if (window.innerWidth > 900 && scrollTop >= 346 || window.innerWidth <= 900 && window.innerWidth > 800 && scrollTop >= 230 || window.innerWidth <= 800 && window.innerWidth > 500 && scrollTop >= 75 || window.innerWidth <= 500 && scrollTop >= 20) {
        this.$bus.$emit("showHeaderBgAndBar");
      } else {
        this.$bus.$emit("hideHeaderBgAndBar");
      }
    },

    onResize() {
      // correct the text for the mobile
      if (window.innerWidth <= 650) {
        this.$bus.$emit('showCorrectSelectText');
      } else {
        this.$bus.$emit('dontShowCorrectSelectText');
      }
    }
  },

  computed: {
    ...mapGetters('main', ['popularBeachesData']),
    ...mapGetters('main', ['citiesData']),
    ...mapGetters('main', ['eventsData']),
    ...mapGetters('main', ['dynamicSliderData']),
    ...mapGetters('main', ['weatherData']),
    ...mapGetters('main', ['beachTypeData']),
    ...mapGetters('main', ['familyData']),
    ...mapGetters('main', ['activeRestData']),
    ...mapGetters('main', ['beachTypeData']),
    ...mapGetters('main', ['bannersData']),
    ...mapGetters('main', ['mapData'])
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
    this.$bus.$emit("showHeaderBgAndBar");
    next();
  }
}
</script>
