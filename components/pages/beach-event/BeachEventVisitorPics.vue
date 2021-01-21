<template>
  <div
    id="visitor-pics"
    class="beach-event__visitor-pics custom-container"
    :class="{ empty: data && data.length === 0 }"
  >
    <h3 class="beach-event__visitor-pics__title">
      Фото посетителей
    </h3>
    <div class="beach-event__visitor-pics__slider">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div v-if="data && data.length === 0" class="swiper-slide" />
          <div
            v-for="(review, i) in data"
            :key="i + review.name"
            class="swiper-slide"
          >
            <div class="beach-event__visitor-pics__user-area">
              <img
                v-lazy-load
                :data-src="review.avatar"
              >

              <div class="beach-event__visitor-pics__user-area__nickname-wrapper">
                <span>{{ review.name }}</span>
              </div>
            </div>
            <div class="beach-event__visitor-pics__pic-area">
              <img
                v-lazy-load
                :data-src="review.pic"
                :alt="`отзыв о ${title}`"
                class="visitor-photo"
              >
              <div class="slide-placeholder">
                <span class="slide-placeholder__text">
                  загрузка изображения
                </span>
              </div>
            </div>

            <div class="beach-event__visitor-pics__comment-area">
              <span v-html="review.comment" />
            </div>
            <div v-if="review.tags" class="beach-event__visitor-pics__tag-area">
              <span
                v-for="(tag, ind) in review.tags"
                :key="ind + tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrapper">
        <div class="custom-pagination">
          <button
            v-for="(b,i) in Math.max(data.length - 1, 0)"
            :key="b"
            class="custom-pagination-bullet"
            :class="{ 'custom-pagination-bullet-active' : i === activeIndex }"
          />
        </div>
      </div>
      <button
        class="slider__arrow-left"
        :style="{ transform: 'translate(-50%, -50%)', display: showLeft ? '' : 'none' }"
        @click="mySwiper.slidePrev()"
      >
        <img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
      </button>
      <button
        class="slider__arrow-right"
        :style="{ transform: 'translate(50%, -50%)', display: showRight ? '' : 'none' }"
        @click="mySwiper.slideNext();"
      >
        <img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
      </button>
    </div>
    <div class="beach-event__visitor-pics__add-button-area">
      <button class="banner__card__info-area__button" @click="modalOpen = true">
        <span>Добавить фотографию</span>
      </button>
    </div>
    <div
      v-show="modalOpen"
      v-body-scroll-lock="modalOpen"
      class="beach-event__visitor-pics__modal"
    >
      <div class="beach-event__visitor-pics__modal__bg" @click="modalOpen = false" />
      <div class="beach-event__visitor-pics__modal__card">
        <h3 class="beach-event__visitor-pics__modal__title">
          Добавить фотографию
        </h3>
        <span class="beach-event__visitor-pics__modal__info">
          Пожалуйста вставьте ссылку на пост Instagram
        </span>
        <input
          v-model="link"
          class="beach-event__visitor-pics__modal__link-area"
          placeholder="Вставьте ссылку"
        >
        <button
          class="banner__card__info-area__button"
          :disabled="error == false || loading"
          :class="{'pointer-events-none': loading}"
          @click="sendPic()"
        >
          <span v-show="!error">Добавить фотографию</span>
          <span v-show="error == true">Попробовать снова</span>
        </button>
        <span
          v-show="errorMsg && errorMsg.length > 0"
          class="beach-event__visitor-pics__modal__error"
          :style="{color: sent ? 'green' : ''}"
        >{{ errorMsg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  // TODO Почему это здесь??
  beforeRouteLeave(to, from, next) {
    this.mySwiper && this.mySwiper.destroy && this.mySwiper.destroy(false, false);
    next();
  },
  props: ['data', 'type', 'typeId', 'title'],

  // beforeMount() {
  //   if (process.browser) {
  //     require('swiper/dist/css/swiper.css');
  //     const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
  //     Vue.use(VueAwesomeSwiper);
  //   }
  // },

  data() {
    return {
      swiperOption: {
        spaceBetween: 24,
        slidesPerView: 4,
        init: false,
        breakpoints: {
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      },
      showLeft: false,
      showRight: false,
      activeIndex: 0,
      link: '',
      modalOpen: false,
      error: null,
      errorMsg: '',
      sent: false,
      loading: false,
    };
  },

  mounted() {
    this.mySwiper.on('imagesReady', () => {
      window.addEventListener('resize', this.onResize, false);
      this.onResize();
      this.updateArrows();
    });

    this.mySwiper.on('slideChange', () => {
      this.updateArrows();
      this.activeIndex = this.mySwiper.activeIndex;
    });

    this.mySwiper.init(this.swiperOption);
  },

  methods: {
    updateArrows() {
      this.showLeft = !this.mySwiper.isBeginning;
      this.showRight = !this.mySwiper.isEnd;
    },

    onResize() {
      if (!this.$el.querySelector('.beach-event__visitor-pics')) {
        window.removeEventListener('resize', this.onResize, false);
      }

      if (this.mySwiper) this.mySwiper.update();
    },

    async sendPic() {
      this.loading = true;
      if (this.link.replace(/\s/g, '') === '') {
        this.errorMsg = 'Пожалуйста введите ссылку';
        this.error = true;
        this.loading = false;
        return;
      }
      this.errorMsg = '';
      this.error = null;

      const data = new FormData();
      data.set(`${this.type}Id`, this.typeId);
      data.set('link', this.link);
      await this.$axios({
        method: 'post',
        url: `/socialPhoto/${this.type}Add`,
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        this.error = !res.status;
        if (this.error) this.errorMsg = res.error;
        else {
          this.errorMsg = 'Пост успешно отправлен';
          this.sent = true;
          setTimeout(() => {
            this.modalOpen = false;
            this.error = null;
            this.errorMsg = '';
            this.link = '';
          }, 1000);
        }
      }).catch((e) => {
        console.error(e);
        this.error = !e.status;
        if (this.error) this.errorMsg = 'Не получилось отправить пост';
        else this.errorMsg = '';
      })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
