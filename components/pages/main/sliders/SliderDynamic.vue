<template>
  <div class="slider-dynamic">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper slider-dynamic__wrapper">
        <div
          v-for="slide in data"
          :key="slide.id"
          class="swiper-slide slider-dynamic__slide"
        >
          <DynamicSlide :slide="slide" />
        </div>
        <div class="swiper-slide slider-dynamic__slide" />
      </div>
    </div>
    <div class="pagination-wrapper">
      <div class="custom-pagination">
        <div
          v-for="(b,i) in data"
          :key="i"
          class="custom-pagination-bullet"
          :class="{ 'custom-pagination-bullet-active' : i === activeIndex }"
        />
      </div>
    </div>
    <button
      class="slider__arrow-left"
      :style="{ transform: 'translate(-50%, -50%)', display: showLeft && showArrows ? '' : 'none' }"
      @click="mySwiper.slidePrev()"
    >
      <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
    </button>
    <button
      class="slider__arrow-right"
      :style="{ transform: 'translate(50%, -50%)', display: showRight && showArrows ? '' : 'none' }"
      @click="mySwiper.slideNext();"
    >
      <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
    </button>
  </div>
</template>

<script>
import DynamicSlide from '~/components/pages/main/DynamicSlide';

export default {

  components: {
    DynamicSlide,
  },
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
        slidesPerView: 4,
        init: false,
        breakpoints: {
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          600: {
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

  beforeDestroy() {
    this.$bus.$off('mainPageReady');
  },

  mounted() {
    this.mySwiper.on('imagesReady', () => {
      window.addEventListener('resize', this.onResize, false);
      this.onResize();
      this.$bus.$on('mainPageReady', () => {
        this.updateActiveSlide();
      });
    });

    this.mySwiper.on('slideChange', () => {
      this.updateArrows();
      this.updateActiveSlide();
      this.activeIndex = this.mySwiper.activeIndex;
    });

    this.mySwiper.init(this.swiperOption);
    this.updateArrows();
  },

  methods: {
    onResize() {
      if (!document.querySelector('.slider-dynamic')) window.removeEventListener('resize', this.onResize, false);

      this.updateActiveSlide();

      if (window.innerWidth <= 1000) {
        this.showArrows = false;
      } else {
        this.showArrows = true;
      }
    },

    updateArrows() {
      this.showLeft = !this.mySwiper.isBeginning;
      this.showRight = !this.mySwiper.isEnd;
    },

    updateActiveSlide() {
      if (window.innerWidth > 1000) {
        setTimeout(() => {
          const slides = this.$el.querySelectorAll('.swiper-slide');
          const slideWidth = (this.$el.querySelector('.swiper-wrapper').offsetWidth - this.swiperOption.spaceBetween * (this.swiperOption.slidesPerView - 1)) / 4;
          for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = `${slideWidth}px`;
          }
          if (this.$el.querySelector('.swiper-slide-next')) this.$el.querySelector('.swiper-slide-next').style.width = `${Math.floor(this.$el.querySelector('.swiper-wrapper').offsetWidth - slideWidth * 2 - this.swiperOption.spaceBetween * 2)}px`;
        });
      }
    },
  },
};
</script>
