<template>
  <div class="slider-cities">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper slider-cities__wrapper">
        <div
          v-for="slide in data"
          :key="slide.id"
          class="swiper-slide slider-cities__slide">
          <a
            :href="`/search?city=${slide.cityId}`"
            class="slider__slide__link"
            @click.prevent="searchCity(slide)"
          >
            <div class="slider-cities__slide__pic-area">
              <img
                v-if="!slide.pic"
                src="~/static/pics/global/pics/slider_cities_placeholder.png"
              >
              <img
                v-if="slide.pic"
                v-lazy-load
                :data-src="slide.pic"
                class="slider-cities__slide__pic"
              >
              <div class="slide-placeholder">
                <span class="slide-placeholder__text">
                  загрузка изображения
                </span>
              </div>
              <h4 class="slider-cities__slide__title">
                {{ slide.city }}
              </h4>
            </div>
            <div class="slider-cities__slide__info-area">
              <span class="slider-cities__slide__beach-number">
                {{ slide.beachNumber }}
              </span>
              <span class="slider-cities__slide__beach">
                {{ getBeachText (slide.beachNumber) }}
              </span>
            </div>
          </a>
          <!-- <a v-else class="pointer-events-none slider__slide__link">
            <div class="slider-cities__slide__pic-area despondency" />
          </a> -->
        </div>
      </div>
    </div>
    <div class="pagination-wrapper">
      <div class="custom-pagination">
        <button
          v-for="(b,i) in data.length - 1"
          :key="i"
          class="custom-pagination-bullet"
          :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"
          @click="mySwiper.slideTo(i)"
        />
      </div>
    </div>
    <button
      class="slider__arrow-left"
      :style="{ transform: 'translate(-50%, -50%)', display: showLeft && showArrows ? '' : 'none' }"
      @click="mySwiper.slidePrev()"
    >
      <img
        src="~/static/pics/global/svg/slider_arrow_left.svg"
        alt="Налево"
      >
    </button>
    <button
      class="slider__arrow-right"
      :style="{ transform: 'translate(50%, -50%)', display: showRight && showArrows ? '' : 'none' }"
      @click="mySwiper.slideNext();"
    >
      <img
        src="~/static/pics/global/svg/slider_arrow_right.svg"
        alt="Направо"
      >
    </button>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['data'],

  data() {
    return {
      swiperOption: {
        spaceBetween: 24,
        slidesPerView: 6,
        init: false,
        breakpoints: {
          1350: {
            slidesPerView: 5,
          },
          1150: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          750: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          580: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      },
      showLeft: false,
      showRight: false,
      showArrows: true,
      activeIndex: 0,
    };
  },

  beforeMount() {
    if (process.browser) {
      require('swiper/dist/css/swiper.css');
      const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
      Vue.use(VueAwesomeSwiper);
    }
  },

  mounted() {
    if (this.data) {
      this.mySwiper.on('imagesReady', () => {
        window.addEventListener('resize', this.onResize);
        this.onResize();
      });

      this.mySwiper.on('slideChange', () => {
        this.updateArrows();
        this.activeIndex = this.mySwiper.activeIndex;
      });

      this.mySwiper.init(this.swiperOption);
      this.updateArrows();
    }
  },

  methods: {
    getBeachText(i) {
      let num = i % 100;
      if (num >= 5 && num % 100 <= 20) return 'пляжей';
      num %= 10;
      if (num % 10 === 1) return 'пляж';
      if (num >= 2 && num <= 4) return 'пляжа';
      return 'пляжей';
    },
    onResize() {
      if (window.innerWidth < 1150) {
        this.showArrows = false;
      } else {
        this.showArrows = true;
      }
    },

    updateArrows() {
      this.showLeft = !this.mySwiper.isBeginning;
      this.showRight = !this.mySwiper.isEnd;
    },

    searchCity(data) {
      this.$bus.$emit('emptySearchParams');
      this.$bus.$emit('updateSearchParam', { param: 'cities', value: { title: data.city, id: data.cityId } });
      setTimeout(() => { this.$bus.$emit('search'); }, 1);
    },
  },
};
</script>
