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
            <div v-swiper:mySwiperModal="swiperOption">
              <div class="swiper-wrapper" v-if="activeReviewIndex >=0">
                <div class="swiper-slide" v-for="(pic, i) in data[activeReviewIndex].photos" :key="i + 'review'">
                  <div class="position-relative">
                    <img v-lazy-load :data-src="pic">
                  </div>
                </div>
              </div>
            </div>
<!--            <button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }"-->
<!--                    @click="mySwiperModal.slidePrev()">-->
<!--              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">-->
<!--            </button>-->
<!--            <button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }"-->
<!--                    @click="mySwiperModal.slideNext();">-->
<!--              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">-->
<!--            </button>-->
          </div>
<!--          <div class="slider-beach-event__modal__right">-->
<!--            <div v-swiper:mySwiperModalSmall="swiperModalSmallOption">-->
<!--              <div class="swiper-wrapper">-->
<!--                <div class="swiper-slide" v-for="(pic, i) in data.pics" :key="i" :class="{ active: activeIndex == i }"-->
<!--                     @click="mySwiperModal.slideTo(i)">-->
<!--                  <img v-lazy-load :data-src="pic" v-if="!pic.includes('youtube')">-->
<!--                  &lt;!&ndash;                  modal true&ndash;&gt;-->
<!--                  <div v-else class="w-100 h-100">-->
<!--                    <div class="slider-beach-event__right__item__inner" @click="openModal(i)">-->
<!--                      <div class="w-100 h-100 overflow-hidden position-relative">-->
<!--                        <div-->
<!--                          class="my-flex justify-content-center align-items-center w-100 h-100 position-absolute z-index-preview">-->
<!--                          <img style="width: 48px; height: 48px; opacity: .9"-->
<!--                               src="~/static/pics/global/pics/play.png"-->
<!--                               alt="play"-->
<!--                          />-->
<!--                        </div>-->
<!--                        <img v-lazy-load :data-src="`https://img.youtube.com/vi/${transformUrl(pic)}/0.jpg`"-->
<!--                             alt="Youtube is failed">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

<!--            <button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }"-->
<!--                    @click="mySwiperModal.slidePrev()">-->
<!--              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">-->
<!--            </button>-->
<!--            <button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }"-->
<!--                    @click="mySwiperModal.slideNext();">-->
<!--              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">-->
<!--            </button>-->
<!--          </div>-->
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
			Pagination
		},

		data() {
			return {
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
				max: 10,
				page: 1,
				perPage: 5,
        photoOpen: false,
        activeReviewIndex: -1,
			}
		},

		mounted() {
			// if (this.data) {
      //   this.mySwiper.on('slideChange', () => {
      //     if (!this.modalOpen)
      //       this.mySwiperModal.slideTo(this.mySwiper.activeIndex);
      //     // this.mySwiperModalSmall.slideTo(this.mySwiper.activeIndex);
      //     this.updateArrows();
      //     this.activeIndex = this.mySwiper.activeIndex;
      //   });
      //
      //   this.mySwiperModal.on('slideChange', () => {
      //     if (this.modalOpen)
      //       this.mySwiper.slideTo(this.mySwiperModal.activeIndex);
      //   });
      //
      //   this.mySwiper.init(this.swiperOption);
      //   this.mySwiperModal.init(this.swiperOption);
      //   // this.mySwiperModalSmall.init(this.swiperOption);
      //
      //   this.updateArrows();
      //
			// 	// setTimeout(()=> { this.mySwiper.init(this.swiperOption) }, 1);
			// }
		},
    methods: {
      // updateArrows() {
      //   this.showLeft = !this.mySwiper.isBeginning;
      //   this.showRight = !this.mySwiper.isEnd;
      // },
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
