<template>
  <section class="two-part-layout__card beach-page__opinions p-0">
    <h2 class="two-part-layout__card__title beach-page__opinions__title m-t-35 pt-4 ml-3">Мнения местных жителей</h2>
    <div class="beach-page__opinions__people m-side-opinion">
      <div v-swiper:mySwiperMain="swiperOptionMain">
        <div class="swiper-wrapper">
          <div v-for="(person, i) in data" :key="i"
               class="swiper-slide beach-page__opinions__people__slide opinion-mobile"
               :class="{ active: activeIndex == i }" @click="changeSlide(i)">
            <div class="beach-page__opinions__people__pic-area flex-shrink-1">
              <img v-lazy-load :data-src="person.pic" class="beach-page__opinions__people__pic">
              <a :href="person.social" target="_blank" class="beach-page__opinions__people__vk"
                 v-if="person.social"><img
                :src="require(`~/static/pics/beach/${person.icon}.svg`)"></a>
            </div>
            <span class="span-16-px cut-text flex-shrink-0"
                  v-html="person.name.length <=20 &&  person.name.includes(' ')?  person.name.replace(' ', '<br>') :
                  (person.name.slice(0,11)+'...').replace(' ', '<br>')"></span>
          </div>
        </div>
      </div>
      <button class="slider__arrow-left" :style="{ transform: 'translate(-50%, 0)', display: showLeft ? '' : 'none' }"
              @click="slideLeft()">
        <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
      </button>
      <button class="slider__arrow-right" :style="{ transform: 'translate(50%, 0)', display: showRight ? '' : 'none' }"
              @click="slideRight()">
        <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
      </button>
    </div>
    <div class="beach-page__opinions__opinion">
      <div class="beach-page__opinions__opinion__three-dots">
        <img src="~/static/pics/beach/three_dots.svg">
      </div>
      <div v-swiper:mySwiperOpinion="swiperOptionOpinion">
        <div class="swiper-wrapper">
          <div v-for="(person, i) in data" :key="i" class="swiper-slide beach-page__opinions__opinion__slide">
            <p v-html="person.opinion"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-wrapper">
      <div class="custom-pagination">
        <button @click="mySwiperMain.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.length"
                :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: ['data'],

    // beforeMount() {
    //   if (process.browser) {
    //     require('swiper/dist/css/swiper.css');
    //     const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
    //     Vue.use(VueAwesomeSwiper);
    //   }
    // },

    data() {
      return {
        swiperOptionMain: {
          slidesPerView: 5,
          spaceBetween: 42,
          init: false,
          breakpoints: {
            700: {
              slidesPerView: 4
            },
            600: {
              slidesPerView: 3
            },
            500: {
              loop: true,
              slidesPerView: 2
            },
            400: {
              loop: true,
              slidesPerView: 1
            }
          }
        },
        swiperOptionOpinion: {
          slidesPerView: 1,
          spaceBetween: 20,
          simulateTouch: false,
          allowTouchMove: false,
          init: false,
          breakpoints: {
            1200: {
              simulateTouch: true,
              allowTouchMove: true
            }
          }
        },
        showLeft: false,
        showRight: false,
        activeIndex: 0,
        plus: 4
      }
    },

    mounted() {
      console.log(this)
      this.mySwiperMain.on('imagesReady', () => {
        window.addEventListener('resize', this.onResize);
        this.onResize();
      });

      this.mySwiperMain.on('slideChange', () => {
        setTimeout(() => {
          if (this.activeIndex < this.mySwiperMain.activeIndex)
            this.activeIndex = this.mySwiperMain.activeIndex;
          else if (this.activeIndex > this.mySwiperMain.activeIndex + this.plus)
            this.activeIndex = this.mySwiperMain.activeIndex + this.plus;
          this.updateArrowsNopinion();
        }, 1)
      });

      this.mySwiperOpinion.on('slideChange', () => {
        if (window.innerWidth <= 1200) {
          this.activeIndex = this.mySwiperOpinion.activeIndex;
          if (this.activeIndex < this.mySwiperMain.activeIndex)
            this.mySwiperMain.slideTo(this.activeIndex);
          else if (this.activeIndex > this.mySwiperMain.activeIndex + this.plus)
            this.mySwiperMain.slideTo(this.activeIndex - this.plus);
          this.updateArrowsNopinion();
        }
      });

      this.mySwiperMain.init(this.swiperOptionMain);
      this.mySwiperOpinion.init(this.swiperOptionOpinion);
      this.updateArrowsNopinion();
    },

    methods: {
      slideLeft() {
        this.mySwiperMain.slidePrev();
        if (this.activeIndex != 0)
          this.activeIndex--;
        this.updateArrowsNopinion();
      },

      slideRight() {
        this.mySwiperMain.slideNext();
        if (this.activeIndex != this.data.length - 1)
          this.activeIndex++;
        this.updateArrowsNopinion();
      },

      updateArrowsNopinion() {
        this.showLeft  = !this.mySwiperMain.isBeginning;
        this.showRight = !this.mySwiperMain.isEnd;
        this.mySwiperOpinion.slideTo(this.activeIndex);
      },

      changeSlide(i) {
        this.activeIndex = i;
        this.updateArrowsNopinion();
      },

      onResize() {
        if (window.innerWidth > 700) {
          this.plus = 4;
        } else if (window.innerWidth <= 700 && window.innerWidth > 600) {
          this.plus = 3;
        } else if (window.innerWidth <= 600 && window.innerWidth > 500) {
          this.plus = 2;
        } else if (window.innerWidth <= 500 && window.innerWidth > 400) {
          this.plus = 1;
        } else if (window.innerWidth <= 400) {
          this.plus = 0;
        }
      }
    }
  }
</script>
