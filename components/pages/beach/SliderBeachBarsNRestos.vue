<template>
  <div class="slider__beach-bars-n-restos">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="(pic, i) in data"
          :key="i"
          class="swiper-slide"
        >
          <img
            v-lazy-load
            :data-src="pic"
            :alt="title"
          >
          <div class="slide-placeholder slide-placeholder--beach-bars-n-restos">
            <span class="slide-placeholder__text">загрузка изображения</span>
          </div>
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
      :style="{ transform: 'translate(-50%, -50%)', top: arrowY + 'px', display: showLeft ? '' : 'none' }"
      @click="mySwiper.slidePrev()"
    >
      <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
    </button>
    <button
      class="slider__arrow-right"
      :style="{ transform: 'translate(50%, -50%)', top: arrowY + 'px', display: showRight ? '' : 'none' }"
      @click="mySwiper.slideNext();"
    >
      <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
    </button>
  </div>
</template>

<script>

export default {
  props: ['data', 'title'],

  data() {
    return {
      swiperOption: {
        spaceBetween: 25,
        slidesPerView: 4,
        observer: true,
        observeParent: true,
        init: false,
        breakpoints: {
          700: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
          500: {
            spaceBetween: 10,
            slidesPerView: 2,
          },
        },
      },
      showLeft: false,
      showRight: false,
      activeIndex: 0,
      arrowY: 125,
    };
  },

  mounted() {
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
  },

  methods: {
    updateArrows() {
      this.showLeft = !this.mySwiper.isBeginning;
      this.showRight = !this.mySwiper.isEnd;
    },

    onResize() {
      if (this.mySwiper) setTimeout(() => { this.mySwiper.update(); }, 1);
    },
  },
};
</script>
