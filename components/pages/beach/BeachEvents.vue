<template>
  <section id="events" class="beach-page__events">
    <div class="main-page__section-subtitle-area beach-page__events__title-area">
      <h3 class="two-part-layout__card__title beach-page__events__title">
        Ближайшие мероприятия на пляже
      </h3>
      <a
        :href="link"
        class="main-page__section__subtitle-area__see-all beach-page__events__see-all"
        @click.prevent="$bus.goTo(link, $router)"
      >
        <span>Смотреть все ({{ data.count }})</span>
      </a>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <Card
          v-for="(slide, i) in data.cardData"
          :key="i"
          :data="slide"
          :show-temp="showTemp"
          class="swiper-slide"
        />
      </div>
    </div>
    <div v-if="data.cardData.length > 1" class="pagination-wrapper">
      <div class="custom-pagination">
        <button
          v-for="(b,i) in data.cardData.length - 1"
          class="custom-pagination-bullet"
          :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"
          @click="mySwiper.slideTo(i)"
        />
      </div>
    </div>
    <div class="main-page__section-subtitle-area beach-page__events__see-all-bottom">
      <a :href="link" @click.prevent="$bus.goTo(link, $router)">
        <span class="span-color-overload">Смотреть все ({{ data.count }})</span>
      </a>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import Card from '~/components/global/Card';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {

  // beforeMount () {
  // 	if (process.browser) {
  // 		require('swiper/dist/css/swiper.css');
  // 		const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
  // 		Vue.use(VueAwesomeSwiper);
  // 	}
  // },

  components: {
	  		Card,
  },
  props: ['data', 'showTemp'],

  data() {
    return {
      swiperOption: {
        spaceBetween: 24,
        slidesPerView: 'auto',
        init: false,
        breakpoints: {
          1200: {
            spaceBetween: 20,
          },
          520: {
            spaceBetween: 10,
          },
        },
      },
      activeIndex: 0,
    };
  },
  computed: {
    link() {
      return `${this.data.link}&count=${COUNT_ELEMENTS_BEACH}&page=1`;
    },
  },

  mounted() {
    // this.mySwiper.on('imagesReady', () => {
    // window.addEventListener('resize', this.onResize);
    // this.onResize();
    // });

    this.mySwiper.on('slideChange', () => {
      this.activeIndex = this.mySwiper.activeIndex;
    });

    this.mySwiper.init(this.swiperOption);
  },
};
</script>
