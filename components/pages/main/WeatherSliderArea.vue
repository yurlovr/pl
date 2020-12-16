<template>
  <div class="main-page__white-wrapper">
    <section
      class="main-page__weather-slider-area custom-container"
    >
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
        <div
          class="slider-weather__parts"
        >
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
          <div
            class="slider-weather__part-right"
          >
            <SliderWeather
              :active-month="activeMonth"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MONTHS } from '~/const/const';

export default {

  components: {
    SliderWeather: () => import('~/components/pages/main/sliders/SliderWeather'),
  },

  data() {
    return {
      // mobileMonthSlider: false,
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
      activeMonth: new Date().getMonth(),
    };
  },

  mounted() {
    this.mySwiper.init(this.swiperOption);
  },

  methods: {
    ...mapActions('main', [
      'setWeather',
    ]),
  },
};
</script>
