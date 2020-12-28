<template>
  <div class="slider-cities">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper slider-cities__wrapper">
        <div
          v-for="slide in data"
          :key="slide.id"
          class="swiper-slide slider-cities__slide"
        >
          <nuxt-link
            :to="{path: '/search-city',
                  query: {city: slide.cityId, page: 1, count: COUNT_ELEMENTS_BEACH}
            }"
            class="slider__slide__link"
          >
            <div class="slider-cities__slide__pic-area">
              <img
                v-if="!slide.pic"
                src="~/static/pics/global/pics/slider_cities_placeholder.png"
                class="no_image"
              >
              <img
                v-if="slide.pic"
                v-lazy-load
                :data-src="slide.pic"
                class="slider-cities__slide__pic"
              >
              <h4 class="slider-cities__slide__title">
                {{ slide.city }}
              </h4>
            </div>
            <div class="slider-cities__slide__info-area">
              <span class="slider-cities__slide__beach-number">
                {{ slide.beachNumber }}
              </span>
              <span class="slider-cities__slide__beach">
                {{ plural(slide.beachNumber, 'пляж', 'пляжа', 'пляжей') }}
              </span>
            </div>
          </nuxt-link>
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
import { plural } from '~/helpers'
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },

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
      COUNT_ELEMENTS_BEACH,
    };
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
    plural,
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
  },
};
</script>
<style lang="scss" scoped>
.no_image {
  border-radius: 12px 12px 0 0;
}
</style>
