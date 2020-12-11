<template>
  <section class="main-page__weather-slider-area custom-container">
    <h3 class="main-page__section-title" style="margin-bottom: 50px;">
      Погода в курортных городах Крыма
    </h3>
    <div class="slider-weather">
      <div class="slider-weather__months">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div
              v-for="(month, i) in MONTHS"
              :key="i"
              class="swiper-slide"
            >
              <button
                class="slider-weather__month capitalize"
                :class="{ active : i === activeMonth }"
                @click="activeMonth = i"
              >
                <span>{{ month }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-weather__parts">
        <div class="slider-weather__part-left">
          <div class="slider-weather__part__info slider-weather__part__temperature-text">
            <img src="~/static/pics/global/svg/temp_air.svg">
            <span>Температура воздуха</span>
          </div>
          <div class="slider-weather__part__info slider-weather__part__temperature-text">
            <img src="~/static/pics/global/svg/temp_water.svg">
            <span>Температура воды</span>
          </div>
          <div class="slider-weather__part-left__cover" />
        </div>
        <div class="slider-weather__part-right">
          <client-only>
            <SliderWeather
              v-if="slideData"
              :slide-data="slideData"
            />
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SliderWeather from '~/components/pages/main/sliders/SliderWeather';
import { MONTHS } from '~/const/const';

export default {

  components: {
    SliderWeather,
  },

  data() {
    return {
      // mobileMonthSlider: false,
      activeMonth: -1,
      MONTHS,
      swiperOption: {
        freeMode: true,
        spaceBetween: 0,
        slidesPerView: 12,
        init: false,
        breakpoints: {
          1301: {
            slidesPerView: 'auto',
          },
        },
      },
    };
  },

  async fetch() {
    if (!this.getWeather) {
      await this.setWeather();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getWeather',
    ]),
    slideData() {
      return this.getWeather ? this.getWeather[this.activeMonth] : [];
    },
  },

  mounted() {
    this.activeMonth = new Date().getMonth();
    this.mySwiper.init(this.swiperOption);
  },

  methods: {
    ...mapActions('main', [
      'setWeather',
    ]),
  },
};
</script>
