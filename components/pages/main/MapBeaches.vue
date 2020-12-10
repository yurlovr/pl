<template>
  <div class="map-beaches-main">
    <client-only>
      <perfect-scrollbar class="scroll-area" :options="options">
        <div
          v-for="(beach, i) in getBeaches"
          :id="`smc-${i}`"
          class="map-beaches-main__card"
          :class="{ active : activeCard == i}"
        >
          <div class="map-beaches-main__card__pic-area">
            <a :href="`/beach/${beach.humanLink || beach.beachId}`" @click.prevent="$bus.goTo(`/beach/${beach.humanLink || beach.beachId}`, $router)">
              <img
                v-if="beach.pics && beach.pics.length"
                v-lazy-load
                :data-src="beach.pics[0]"
              >
              <img v-else src="~/static/pics/global/pics/slider_beh_placeholder.png">

            </a>
            <AddToFavorites :data="beach" />
          </div>
          <div class="map-beaches-main__card__info-area">
            <div class="map-beaches-main__card__rating-area">
              <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
              <span>{{ beach.rating.toFixed(1) }}</span>
            </div>
            <a :href="`/beach/${beach.humanLink || beach.beachId}`" @click.prevent="$bus.goTo(`/beach/${beach.humanLink || beach.beachId}`, $router)">
              <h3 class="map-beaches-main__card__title" v-html="beach.title" />
            </a>
            <a :href="`/search?city=${beach.locationId}`" @click.prevent="searchCity(beach)">
              <h5 class="map-beaches-main__card__location">{{ beach.location }}</h5>
            </a>
          </div>
        </div>
      </perfect-scrollbar>
    </client-only>
    <div class="map-beaches-main__slider">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            v-for="(beach, i) in getBeaches"
            class="swiper-slide map-beaches-main__slide"
            :class="{ active : activeCard == i}"
          >
            <div class="map-beaches-main__card__pic-area">
              <a href="/" @click.prevent="$bus.goTo('/', $router)">
                <img
                  v-if="beach.pics && beach.pics.length"
                  v-lazy-load
                  :data-src="beach.pics[0]"
                >
                <img v-else src="~/static/pics/global/pics/slider_beh_placeholder.png">
              </a>
              <AddToFavorites :data="beach" />
            </div>
            <div class="map-beaches-main__card__info-area">
              <div class="map-beaches-main__card__rating-area">
                <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
                <span>{{ beach.rating.toFixed(1) }}</span>
              </div>
              <a href="/" @click.prevent="$bus.goTo('/', $router)">
                <h3 class="map-beaches-main__card__title" v-html="beach.title" />
              </a>
              <a :href="`/search?city=${beach.locationId}`" @click.prevent="searchCity(beach)">
                <h5 class="map-beaches-main__card__location">{{ beach.location }}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrapper">
        <div class="custom-pagination">
          <button
            v-for="(b,i) in Math.max(getBeachesNumber - minus, 0)"
            class="custom-pagination-bullet"
            :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"
            @click="mySwiper.slideTo(i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import AddToFavorites from '~/components/global/AddToFavorites';

export default {

  components: {
    AddToFavorites,
  },
  props: ['data'],

  data() {
    return {
      options: {
        swipeEasing: true,
      },
      swiperOption: {
        spaceBetween: 20,
        slidesPerView: 2,
        observer: true,
        observeParent: true,
        init: false,
        breakpoints: {
          400: {
            slidesPerView: 1,
          },
        },
      },
      arrowY: 0,
      activeIndex: 0,
      activeCard: -1,
      minus: 1,
    };
  },

  computed: {
    getBeachesNumber() {
      let sum = 0;
      if (this.data) this.data.forEach((chunk) => { sum += chunk.beaches.length; });
      return sum;
    },

    getBeaches() {
      const allBeaches = [];
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[i].beaches.length; j++) allBeaches.push(this.data[i].beaches[j]);
      }
      return allBeaches;
    },
  },

  beforeMount() {
    if (process.browser) {
      require('swiper/dist/css/swiper.css');
      const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
      Vue.use(VueAwesomeSwiper);
    }
  },
  beforeDestroy() {
    this.$bus.$off('goToCard');

    this.$bus.$off('changeStep');

    this.$bus.$off('releaseSelection');
  },

  mounted() {
    this.mySwiper.on('imagesReady', () => {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    });

    this.mySwiper.on('slideChange', () => {
      this.activeIndex = this.mySwiper.activeIndex;
    });

    this.$bus.$on('goToCard', (i) => {
      this.activeCard = i;
      if (window.innerWidth > 800) this.scrollToCard(i);
      else this.slideToCard(i);
    });

    this.$bus.$on('changeStep', () => {
      if (this.mySwiper) {
        this.mySwiper.slideNext();
        this.mySwiper.slidePrev();
      }
    });

    this.$bus.$on('releaseSelection', () => {
      this.activeCard = -1;
    });

    this.mySwiper.init(this.swiperOption);
  },

  methods: {
    onResize() {
      this.arrowY = this.$el.querySelector('.map-beaches-main__card__pic-area').offsetHeight / 2;

      if (window.innerWidth > 400) this.minus = 1;
      else this.minus = 0;
    },

    scrollToCard(i) {
      if (this.$el.querySelector('.scroll-area') && this.$el.querySelector(`#smc-${i}`) && this.$el.querySelector('.scroll-area')) this.$el.querySelector('.scroll-area').scrollTop = this.$el.querySelector(`#smc-${i}`).offsetTop - this.$el.querySelector('.scroll-area').offsetTop;
    },

    slideToCard(i) {
      if (this.mySwiper) this.mySwiper.slideTo(i);
    },

    searchCity(data) {
		      this.$bus.$emit('emptySearchParams');
		      this.$bus.$emit('updateSearchParam', { param: 'cities', value: { title: data.location, id: data.locationId } });
		      setTimeout(() => { this.$bus.$emit('search'); }, 1);
		    },
  },
};
</script>
