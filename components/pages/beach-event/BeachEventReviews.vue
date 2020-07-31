<template>
	<section class="beach-event__reviews" :class="{ empty: data && data.length == 0 }">
		<h2 class="two-part-layout__card__title beach-event__reviews__title">Отзывы гостей ({{ data ? data.length : 0 }})</h2>
		<div class="beach-event__reviews__desktop" v-if="data">
			<BeachEventReview @openModal="openPhotosModal(i)" :data="review" v-for="(review, i) in data.slice((page-1)*perPage, Math.min(page*perPage, data.length))" :key="i" v-show="i < 6" :lines="4" />
			<div class="pagination-num-wrapper beach-event__reviews__pagination custom-container" v-if="data.length > perPage">
				<Pagination :perPage="perPage" :totalElems="data.length" v-model="page" scrollId="reviews"/>
			</div>
		</div>
		<div class="beach-event__reviews__mobile" v-if="data">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(review, i) in data">
						<BeachEventReview :data="review" :lines="0" />
					</div>
				</div>
			</div>
			<div class="pagination-wrapper">
				<div class="custom-pagination">
					<button class="custom-pagination-bullet" v-for="(b,i) in Math.min(Math.max(data.length, 1), max)" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
				</div>
			</div>
		</div>
		<BeachEventLeaveReview :typeId="typeId" :type="type" />
    <div class="slider-beach-event__modal" v-body-scroll-lock="photoOpen" :class="{ active: photoOpen }">
      <button class="slider-beach-event__modal__close-button" @click="closePhotoModal">
        <img src="~/static/pics/global/svg/cross_blue.svg">
      </button>
      <div class="slider-beach-event__modal__inner">
        <div class="slider-beach-event__modal__sides">
          <div class="slider-beach-event__modal__left">
            <div v-swiper:mySwiperModalPhoto="swiperOption_double">
              <div class="swiper-wrapper" v-if="activeReviewIndex >=0">
                <div class="swiper-slide" style="max-height: 600px" v-for="(pic, i) in data[activeReviewIndex].photos" :key="i + 'review'">
                  <div class="position-relative">
                    {{pic}}
                    <img v-lazy-load :data-src="pic">
                  </div>
                </div>
              </div>
            </div>
            <button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }"
                    @click="mySwiperModalPhoto.slidePrev()">
              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
            </button>
            <button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }"
                    @click="mySwiperModalPhoto.slideNext();">
              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
            </button>
          </div>
          <div class="slider-beach-event__modal__right">
            <div v-swiper:mySwiperModalSmallPhoto="swiperModalSmallOption">
              <div class="swiper-wrapper" v-if="activeReviewIndex >=0">
                <div class="swiper-slide" v-for="(pic, i) in data[activeReviewIndex].photos" :key="i" :class="{ active: activeIndexPhotos == i }"
                     @click="mySwiperModalPhoto.slideTo(i)">
                  <img v-lazy-load :data-src="pic">
                </div>
              </div>
            </div>

                <button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }"
                        @click="mySwiperModalPhoto.slidePrev()">
                  <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
                </button>
                <button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }"
                        @click="mySwiperModalPhoto.slideNext();">
                  <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
                </button>
              </div>
            </div>

          </div>
        </div>
	</section>
</template>

<script>
	import Vue from 'vue';
	import BeachEventReview from '~/components/pages/beach-event/BeachEventReview';
	import BeachEventLeaveReview from '~/components/pages/beach-event/BeachEventLeaveReview';
	import Pagination from '~/components/global/Pagination';

	export default {
		props: ['data', 'typeId', 'type'],

		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		components: {
			BeachEventReview,
			BeachEventLeaveReview,
			Pagination,
		},

		data() {
			return {
        swiperOption: {
          autoHeight: true,
          spaceBetween: 70,
          slidesPerView: 1,
          init: false
        },
        swiperOption_double: {
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
				activeIndexPhotos: 0,
				max: 10,
				page: 1,
				perPage: 5,
        photoOpen: false,
        activeReviewIndex: 0,
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

		mounted() {
      this.initSwiper()
      if (this.data) {
        console.warn(this.mySwiper, 'this.mySwiper')
        this.mySwiper.on('slideNextTransitionEnd', () => {
          if (this.activeIndex < 8)
            this.activeIndex++;
        });

        this.mySwiper.on('slidePrevTransitionEnd', () => {
          if (this.activeIndex > 1)
            this.activeIndex--;
        });

        this.mySwiper.on('reachEnd', () => {
          this.activeIndex = this.max - 1;
        });

        this.mySwiper.on('reachBeginning', () => {
          this.activeIndex = 0;
        });

        setTimeout(()=> { this.mySwiper.init(this.swiperOption) }, 1);
      }

		},
    methods: {
		  initSwiper(){
          this.mySwiperModalPhoto.on('slideChange', () => {
              // this.mySwiperModalPhoto.slideTo(this.mySwiperModalPhoto.activeIndexPhotos);
            this.mySwiperModalSmallPhoto.slideTo(this.mySwiper.activeIndex);
              this.updateArrows();
          });

          this.mySwiperModalPhoto.init(this.swiperOption_double);
          this.mySwiperModalSmallPhoto.init(this.swiperOption_double);

          // this.updateArrows();

          // setTimeout(()=> { this.mySwiper.init(this.swiperOption) }, 1);
      },
      updateArrows() {
        this.showLeft = !this.mySwiperModalPhoto.isBeginning;
        this.showRight = !this.mySwiperModalPhoto.isEnd;
      },
      openPhotosModal(val) {
        this.photoOpen = true
        this.activeReviewIndex = val
      },
      closePhotoModal() {
        this.photoOpen = false
      },
    }
	}
</script>
