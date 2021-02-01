<template>
  <section
    id="reviews"
    class="beach-event__reviews two-part-layout__card"
  >
    <!-- :class="{ empty: data && !data.length }" -->
    <h2 class="two-part-layout__card__title beach-event__reviews__title">
      Отзывы гостей ({{ data ? data.length : 0 }})
    </h2>
    <div v-if="data" class="beach-event__reviews__desktop">
      <BeachEventReview
        v-for="(review, i) in data.slice((page-1)*perPage, Math.min(page*perPage, data.length))"
        v-show="i < 6"
        :key="i"
        :data="review"
        :lines="4"
        @openModal="openPhotosModal(i)"
      />
      <div
        v-if="data.length > perPage"
        class="pagination-num-wrapper beach-event__reviews__pagination custom-container"
      >
        <Pagination
          v-model="page"
          :per-page="perPage"
          :total-elems="data.length"
          scroll-id="reviews"
        />
      </div>
    </div>
    <div
      v-if="data"
      class="beach-event__reviews__mobile"
    >
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            v-for="(review, i) in data"
            :key="review.name + review.date"
            class="swiper-slide"
          >
            <BeachEventReview :data="review" :lines="0" />
          </div>
        </div>
      </div>
      <div class="pagination-wrapper">
        <div class="custom-pagination">
          <button
            v-for="(b,i) in Math.min(Math.max(data.length, 1), max)"
            :key="b"
            class="custom-pagination-bullet"
            :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!data.length"
      class="text"
    >
      Пока нет отзывов о пляже. Вы можете быть первым!
    </div>
    <BeachEventLeaveReview :type-id="typeId" :type="type" />
    <div
      v-body-scroll-lock="photoOpen"
      class="slider-beach-event__modal"
      :class="{ active: photoOpen }"
    >
      <button
        class="slider-beach-event__modal__close-button"
        @click="closePhotoModal">
        <img src="~/static/pics/global/svg/cross_blue.svg">
      </button>
      <div class="slider-beach-event__modal__inner">
        <div class="slider-beach-event__modal__sides">
          <div class="slider-beach-event__modal__left">
            <div
              v-if="data.length"
              v-swiper:mySwiperModalPhoto="swiperOption_double"
            >
              <div
                v-if="activeReviewIndex >= 0"
                class="swiper-wrapper"
              >
                <div
                  v-for="(pic, i) in data[activeReviewIndex].photos"
                  :key="i + 'review'"
                  class="swiper-slide"
                  style="max-height: 600px"
                >
                  <div class="position-relative">
                    <img v-lazy-load :data-src="pic">
                  </div>
                </div>
              </div>
            </div>
            <button
              class="slider__arrow-left"
              :style="{ display: showLeft ? '' : 'none' }"
              @click="mySwiperModalPhoto.slidePrev()"
            >
              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
            </button>
            <button
              class="slider__arrow-right"
              :style="{ display: showRight ? '' : 'none' }"
              @click="mySwiperModalPhoto.slideNext();"
            >
              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
            </button>
          </div>
          <div class="slider-beach-event__modal__right">
            <div
              v-if="data.length"
              v-swiper:mySwiperModalSmallPhoto="swiperModalSmallOption"
            >
              <div
                v-if="data.length && activeReviewIndex >=0"
                class="swiper-wrapper"
              >
                <div
                  v-for="(pic, i) in data[activeReviewIndex].photos"
                  :key="i"
                  class="swiper-slide"
                  :class="{ active: activeIndexPhotosSlider == i }"
                  @click="mySwiperModalPhoto.slideTo(i)"
                >
                  <img v-lazy-load :data-src="pic">
                </div>
              </div>
            </div>

            <button
              class="slider__arrow-left"
              :style="{ display: showLeft ? '' : 'none' }"
              @click="mySwiperModalPhoto.slidePrev()"
            >
              <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
            </button>
            <button
              class="slider__arrow-right"
              :style="{ display: showRight ? '' : 'none' }"
              @click="mySwiperModalPhoto.slideNext();"
            >
              <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BeachEventReview from '~/components/pages/beach-event/BeachEventReview';
import BeachEventLeaveReview from '~/components/pages/beach-event/BeachEventLeaveReview';
import Pagination from '~/components/global/Pagination';

export default {

  components: {
    BeachEventReview,
    BeachEventLeaveReview,
    Pagination,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    typeId: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      swiperOption: {
        autoHeight: true,
        spaceBetween: 70,
        slidesPerView: 1,
        init: false,
      },
      swiperOption_double: {
        spaceBetween: 20,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        init: false,
        breakpoints: {
          550: {
            spaceBetween: 10,
          },
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
      },
      showLeft: false,
      showRight: true,
      activeIndex: 0,
      activeIndexPhotos: 0,
      activeIndexPhotosSlider: 0,
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
            spaceBetween: 10,
          },
        },
      },
    };
  },

  mounted() {
    if (this.data.length) {
      this.initSwiper();
      this.mySwiper.on('slideNextTransitionEnd', () => {
        if (this.activeIndex < 8) this.activeIndex++;
      });

      this.mySwiper.on('slidePrevTransitionEnd', () => {
        if (this.activeIndex > 1) this.activeIndex--;
      });

      this.mySwiper.on('reachEnd', () => {
        this.activeIndex = this.max - 1;
      });

      this.mySwiper.on('reachBeginning', () => {
        this.activeIndex = 0;
      });

      setTimeout(() => { this.mySwiper.init(this.swiperOption); }, 1);
    }
  },
  beforeDestroy() {
    try {
      this.mySwiper && this.mySwiper.destroy && this.mySwiper.destroy(false, false);
      this.mySwiperModalPhoto && this.mySwiperModalPhoto.destroy && this.mySwiperModalPhoto.destroy(false, false);
      this.mySwiperModalSmallPhoto && this.mySwiperModalSmallPhoto.destroy && this.mySwiperModalSmallPhoto.destroy(false, false);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    initSwiper() {
      this.mySwiperModalPhoto.on('slideChange', () => {
        // this.mySwiperModalPhoto.slideTo(this.mySwiperModalPhoto.activeIndexPhotos);
        this.mySwiperModalSmallPhoto.slideTo(this.mySwiper.activeIndexPhotosSlider);
        this.updateArrows();
        this.activeIndexPhotosSlider = this.mySwiperModalPhoto.activeIndex;
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
      this.photoOpen = true;
      this.activeReviewIndex = val;
    },
    closePhotoModal() {
      this.photoOpen = false;
    },
  },
};
</script>
