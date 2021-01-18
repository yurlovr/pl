<template>
  <div>
    <span
      class="close"
      @click="$emit('close-popup')"
    />
    <div class="map-popup__pic-area">
      <div class="map-popup__slider">
        <div
          id="balloon-swiper"
          v-swiper:mySwiper="swiperOption"
          class="swiper-container"
        >
          <div class="swiper-wrapper">
            <div
              v-for="slide in beachFromMap.photos"
              :key="slide.id"
              class="swiper-slide"
            >
              <div class="swiper-slide map-popup__slide">
                <img
                  v-if="!slide.path"
                  src="~/static/pics/global/pics/slider_cities_placeholder.png"
                  class="no_image"
                >
                <img
                  v-else
                  v-lazy-load
                  :data-src="slide.path"
                  class="slider-cities__slide__pic"
                >
                <div class="custom-card__pic custom-card__pic-placeholder">
                  <img
                    class="custom-card__pic"
                    src="~/static/pics/global/pics/slider_height_placeholder.png"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pagination-wrapper">
          <div class="swiper-pagination" />
        </div>
        <button
          class="slider__arrow-left slider__arrow-left-balloon"
          @click="mySwiper.slidePrev()"
        >
          <img
            src="/pics/global/svg/arrow_next_map.svg"
            alt="Налево"
          >
        </button>
        <button
          class="slider__arrow-right slider__arrow-right-balloon"
          @click="mySwiper.slideNext()"
        >
          <img
            src="/pics/global/svg/arrow_next_map.svg"
            alt="Направо"
          >
        </button>
      </div>
    </div>
    <div
      v-if="beachFromMap.tempWater"
      class="custom-card__temp-area"
    >
      <img
        src="~/static/pics/global/svg/temper_big.svg"
        alt="Температура"
        class="big"
      >
      <img
        src="~/static/pics/global/svg/temper_small.svg"
        alt="Температура"
        class="small"
      >
      <span class="custom-card__temp">
        {{ `${beachFromMap.tempWater > 0 ? '+ ' : '- '} ${beachFromMap.tempWater}` }}
      </span>
      <span class="custom-card__temp-o">
        <span>o</span>
      </span>
      <span class="custom-card__temp-C">C</span>
    </div>
    <div class="map-popup__info-area">
      <span class="map-popup__rating">
        <img src="/pics/global/svg/star.svg" alt="Рейтинг">
        <span>{{ beachFromMap.rating.toFixed(1) }}</span>
      </span>
      <nuxt-link
        :to="{ path: beachFromMap.humanLink
          ? beachFromMap.humanLink
          : ( beachFromMap.mainLink ? beachFromMap.mainLink : '#')}"
        class="map-popup__title"
      >
        {{ beachFromMap.title }}
      </nuxt-link>
      <h5 class="map-popup__location">
        {{ beachFromMap.location }}
      </h5>
      <h5 class="map-popup__location map-popup__location-type">
        {{ beachFromMap.beachType }}
      </h5>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PopupMap',
  components: {
  },
  data() {
    return {
      swiperOption: {
        slidePerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters('main', {
      beachFromMap: 'getBeachFromMap',
    }),
  },
  mounted() {
    this.mySwiper.init(this.swiperOption);
  },
};
</script>

<style lang="scss">
.map-popup.map-popup-custom {
  position: absolute;
  top: 10px;
  left: 15px;
  z-index: 10;
  padding-top: 30px;
}

.close {
position: absolute;
right: 20px;
top: 10px;
width: 15px;
height: 15px;
opacity: 0.3;
}
.close:hover {
opacity: 1;
}
.close:before, .close:after {
position: absolute;
left: 15px;
content: ' ';
height: 15px;
width: 2px;
background-color: #333;
}
.close:before {
transform: rotate(45deg);
}
.close:after {
transform: rotate(-45deg);
}

.map-popup__slider {
  & .slider__arrow-left, .slider__arrow-right {
    top: 20px;
    height: 90%;
  }
}

.map-popup__location-type {
  text-transform: none;
}

</style>
