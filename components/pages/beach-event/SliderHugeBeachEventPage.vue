<style scoped>
.z-index-preview {
  z-index: 2;
}
</style>
<template>
  <div class="slider-beach-event">
    <div class="slider-beach-event__left">
      <div class="slider-beach-event__left__inner">
        <div class="position-absolute d-flex icon-group">
          <div class="orange-cont bem-is-a-dead-methodology" v-if="!isEvent">
            <img src="~/static/pics/global/svg/sert_beach.svg" alt="">
            <div class="right-tooltip text-center">
              <span>Аккредитация</span>
            </div>
          </div>
          <div class="orange-cont bem-is-a-dead-methodology" v-if="data.beautySunrise">
            <img src="~/static/pics/global/svg/sunrise-icon.svg" alt="">
            <div class="right-tooltip text-center">
              <span>Красивый рассвет</span>
            </div>
          </div>
          <div class="orange-cont bem-is-a-dead-methodology" v-if="data.beautySunset">
            <img src="~/static/pics/global/svg/sunset-icon.svg" alt="">
            <div class="right-tooltip text-center">
              <span>Красивый закат</span>
            </div>
          </div>
        </div>
        <div class="slider-beach-event__blue">
          <div class="cursor-pointer bem-is-a-dead-methodology">
            <img src="~/static/pics/global/svg/blueMedal.svg" v-if="data.blueMedal"
                 @click.stop="openCamera(data.blueMedal)"/>
            <div class="right-tooltip">
              <span>Панорама</span>
            </div>
          </div>
          <div class="cursor-pointer bem-is-a-dead-methodology" v-if="data.panorama"
               :style="{'margin-top': data.blueMedal ? '5px': 0}">
            <img src="~/static/pics/global/svg/3d.png" alt="" @click.stop="$emit('call-modal')"/>
            <div class="right-tooltip">
              <span>Обзор 360</span>
            </div>
          </div>
        </div>
        <div class="slider-beach-event__beach-closed" v-if="data.isBeachClosed">
          <div class="slider-beach-event__beach-closed__inner">
            <div class="slider-beach-event__beach-closed__tooltip" v-if="data.beachClosedTooltip">
              <span>{{ data.beachClosedTooltip }}</span>
            </div>
          </div>
          <span :style="{ color: data.beachClosedColor }">
						{{ data.beachClosedText }}
					</span>
        </div>
        <button class="slider-beach-event__zoom-button" @click="bigModalOpen">
          <img src="~/static/pics/global/svg/zoom.svg">
        </button>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(pic, i) in data.medium_pics" :key="i">
              <img v-lazy-load :data-src="pic" v-if="!pic.includes('youtube')">
              <div v-else class="w-100 h-100">
                <no-ssr>
                  <!--                  desktop logic-->
                  <video-youtube v-if="mobile > 768" :key="i+'gui'" :url="pic" :reference="'v'+i"/>
                  <!--                  mobile-logic-->
                  <div v-else class="slider-beach-event__right__item__inner" @click="openModal(i, true, 'model')">
                    <div class="w-100 h-100 overflow-hidden position-relative">
                      <div
                        class="my-flex justify-content-center align-items-center w-100 h-100 position-absolute z-index-preview">
                        <img style="width: 48px; height: 48px; opacity: .9"
                             src="~/static/pics/global/pics/play.png"
                             alt="play"
                        />
                      </div>
                      <img v-lazy-load :data-src="`https://img.youtube.com/vi/${transformUrl(pic)}/0.jpg`"
                           alt="Youtube is failed">
                    </div>
                  </div>
                </no-ssr>
                <!--                </client-only>-->
              </div>
            </div>
          </div>
        </div>
        <div class="pagination-wrapper" v-if="data.medium_pics.length > 1">
          <div class="custom-pagination">
            <button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet"
                    v-for="(b,i) in data.medium_pics.length"
                    :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
          </div>
        </div>
        <button class="slider__arrow-left"
                :style="{ transform: 'translate(-50%, -50%)', display: showLeft ? '' : 'none' }"
                @click="mySwiper.slidePrev()">
          <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
        </button>
        <button class="slider__arrow-right"
                :style="{ transform: 'translate(50%, -50%)', display: showRight ? '' : 'none' }"
                @click="mySwiper.slideNext();">
          <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
        </button>
      </div>
    </div>
    <div class="slider-beach-event__right">
      <div class="slider-beach-event__right__item" v-for="(pic, i) in data.medium_pics" :key="i" v-if="i != 0 && i <= 6"
           :style="{ height: getRightPicsHeight }">
        <div class="slider-beach-event__right__item__inner" @click="openModal(i)" v-if="!pic.includes('youtube')">
          <img v-lazy-load :data-src="pic">
          <span v-if="i == 6 && data.medium_pics.length - 7 > 0">+{{ data.medium_pics.length - 7 }}</span>
        </div>
        <!--        page-->
        <div v-else class="slider-beach-event__right__item__inner" @click="openModal(i, true, 'model')">
          <div class="w-100 h-100 overflow-hidden position-relative">
            <div
              class="my-flex justify-content-center align-items-center w-100 h-100 position-absolute z-index-preview">
              <img style="width: 48px; height: 48px; opacity: .9"
                   src="~/static/pics/global/pics/play.png" alt="play"
              />
            </div>
            <img v-lazy-load :data-src="`https://img.youtube.com/vi/${transformUrl(pic)}/0.jpg`"
                 alt="Youtube is failed">
          </div>
        </div>
      </div>
    </div>
    <div class="slider-beach-event__modal" v-body-scroll-lock="modalOpen" :class="{ active: modalOpen }">
      <button class="slider-beach-event__modal__close-button" @click="modalOpen = !modalOpen">
        <img src="~/static/pics/global/svg/cross_blue.svg">
      </button>
      <div class="slider-beach-event__modal__inner">
        <div class="slider-beach-event__modal__title-area">
          <h2 class="slider-beach-event__modal__title" v-html="data.title"></h2>
          <span class="slider-beach-event__modal__count"><span class="orange">{{
              activeIndex + 1
            }}</span>/{{ data.pics.length }}</span>
        </div>
        <div class="slider-beach-event__modal__sides big-big-big">
          <!--          <CoolLightBox-->
          <!--            :items="data.pics"-->
          <!--            :index="index"-->
          <!--            @close="index = null">-->
          <!--          </CoolLightBox>-->
          <div class="slider-beach-event__modal__left big-modal">

            <div v-swiper:mySwiperModal="swiperOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(pic, i) in data.pics" :key="i">
                  <div class="position-relative h-100">
                        <span v-if="!pic.includes('youtube')" class="zoom-img"
                              @click="$refs.beachZoomModal.showZoomModal(pic)" v-show="zoom_plus_show">
                             <img src="~/static/pics/search/loop_plus.svg">
                        </span>
                    <div v-if="!pic.includes('youtube')" class="h-100">
                      <div class="size-stamp" v-if="data.sizes && data.sizes.length">
                        <img src="~/static/pics/beach/size.png">
                        <div class="stamp-text-size">
                          <span>ОРИГИНАЛ</span>
                          <b>{{ (data.sizes[i] / 1024 / 1024).toFixed(1) }} МБ</b>
                        </div>
                      </div>
                      <img v-lazy-load :data-src="pic" class="object-contain">
                    </div>
                    <div v-else class="w-100 h-100 y-block">
                      <!--                    active in modal-->
                      <no-ssr>
                        <video-youtube :key="i+'gui-modal'" :url="pic" :reference="'model'+i" :modal="true"/>
                      </no-ssr>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }"
                    @click=" () => { mySwiperModal.slidePrev(); }">
              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
            </button>
            <button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }"
                    @click="() => { mySwiperModal.slideNext(); }">
              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
            </button>
            <div class="pagination-wrapper" v-if="data.medium_pics.length > 1">
              <div class="custom-pagination">
                <button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.medium_pics.length"
                        :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
              </div>
            </div>
          </div>
          <div class="slider-beach-event__modal__right big-modal-right">
            <div v-swiper:mySwiperModalSmall="swiperModalSmallOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(pic, i) in data.pics" :key="i" :class="{ active: activeIndex == i }"
                     @click="() => { mySwiperModal.slideTo(i); }">
                  <img v-lazy-load :data-src="pic" v-if="!pic.includes('youtube')">
                  <!--                  modal true-->
                  <div v-else class="w-100 h-100">
                    <div class="slider-beach-event__right__item__inner" @click="openModal(i)">
                      <div class="w-100 h-100 overflow-hidden position-relative">
                        <div
                          class="my-flex justify-content-center align-items-center w-100 h-100 position-absolute z-index-preview">
                          <img style="width: 48px; height: 48px; opacity: .9"
                               src="~/static/pics/global/pics/play.png"
                               alt="play"
                          />
                        </div>
                        <img v-lazy-load :data-src="`https://img.youtube.com/vi/${transformUrl(pic)}/0.jpg`"
                             alt="Youtube is failed">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }"
                    @click="mySwiperModal.slidePrev()">
              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
            </button>
            <button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }"
                    @click="mySwiperModal.slideNext();">
              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
            </button>
          </div>
        </div>

      </div>
    </div>
    <beach-zoom-image ref="beachZoomModal"/>
  </div>
</template>

<script>
import Vue from 'vue';
import VideoYoutube from '../beach/video-tube'
import {getIdFromUrl} from 'vue-youtube';
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import VueZoomer from 'vue-zoomer'
import BeachZoomImage from "./BeachZoomImage";


export default {
  props: ['data'],
  components: {
    BeachZoomImage,
    VideoYoutube,
    CoolLightBox,
  },

  beforeMount() {
    if (process.browser) {
      require('swiper/dist/css/swiper.css');
      const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
      Vue.use(VueAwesomeSwiper);
      Vue.use(VueZoomer);
    }
  },

  computed: {
    getRightPicsHeight() {
      if (Math.min(this.data.pics.length - 1, 6) % 2 == 0)
        return `${(100 / (Math.min(this.data.pics.length - 1, 6) / 2)).toFixed(2)}%`;
      else return `${(100 / (Math.min(this.data.pics.length, 6) / 2)).toFixed(2)}%`;
    },
    player() {
      return this.$refs['youtube'].player
    },
    isEvent() {
      return this.$route.path.includes('event')
    }
  },

  data() {
    return {
      zoom_plus_show: true,
      interval_show: 0,
      interval_plus: null,
      index: null,
      mobile: 1024,
      swiperOption: {
        spaceBetween: 20,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        init: false,
        breakpoints: {
          550: {
            spaceBetween: 10
          }
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        }
      },
      showLeft: false,
      showRight: true,
      activeIndex: 0,
      modalOpen: false,
      swiperModalSmallOption: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        direction: 'vertical',
        mousewheel: true,
        init: false,
        breakpoints: {
          600: {
            direction: 'horizontal',
            spaceBetween: 10
          }
        }
      }
    }
  },
  created() {
    if (process.browser) {
      this.mobile = window.innerWidth
      window.onresize = () => {
        this.mobile = window.innerWidth
      }
    }
  },

  mounted() {
    this.mySwiper.on('slideChange', () => {
      if (!this.modalOpen)
        this.mySwiperModal.slideTo(this.mySwiper.activeIndex);
      this.mySwiperModalSmall.slideTo(this.mySwiper.activeIndex);
      this.updateArrows();
      this.activeIndex = this.mySwiper.activeIndex;
    });

    this.mySwiperModal.on('slideChange', () => {
      if (this.modalOpen) {
        this.interval_show = 0;
        clearInterval(this.interval_plus);
        this.mySwiper.slideTo(this.mySwiperModal.activeIndex);
        this.zoom_plus_show = true;
        this.zoomController();
      }
    });

    this.mySwiper.init(this.swiperOption);
    this.mySwiperModal.init(this.swiperOption);
    this.mySwiperModalSmall.init(this.swiperOption);

    // this.updateArrows();
  },

  methods: {
    zoomController() {
      console.warn('zoom controller')
      this.interval_plus = setInterval(() => {
        this.interval_show++;
        if (this.interval_show >= 2) {
          this.zoom_plus_show = false;
          clearInterval(this.interval_plus)
        }
      }, 1000)
    },
    bigModalOpen() {
      this.modalOpen = !this.modalOpen;
      this.zoomController();
    },
    showPhotoSwipe(index) {
      this.isOpen = true
      this.$set(this.optionsGallery, 'index', index)
    },
    hidePhotoSwipe() {
      this.isOpen = false
    },
    openCamera(url) {
      window.open(url, '_blank');
    },
    transformUrl(s) {
      return getIdFromUrl(s)
    },
    async playVideo(e) {
      await this.player.playVideo()
    },
    updateArrows() {
      this.showLeft = !this.mySwiper.isBeginning;
      this.showRight = !this.mySwiper.isEnd;
    },

    openModal(i, video = false, pos = 'main-') {
      this.mySwiper.slideTo(i);
      /*if (video && i <= 4) {
        setTimeout(() => {
          document.getElementById('v1').click();
        }, 200)
      }*/
      if (i > 5 || video) {
        this.modalOpen = true;
        if (video) {
          setTimeout(() => {
            console.log(pos + i, 'pos + i')
            document.getElementById(pos + i).click();
          }, 200)
        }
      }
    }
  }
}
</script>
