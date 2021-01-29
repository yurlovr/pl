<template>
  <section
    id="barsNRestos"
    class="beach-page__barsNrestos"
  >
    <div class="swiper-bar-display_mobile">
      <h2 class="two-part-layout__card__title beach-page__barsNrestos__title">
        Бары и рестораны
      </h2>
      <!--<a
          href="/online-service"
          @click.prevent="$bus.goTo('/online-service', $router)"
          class="beach-page__barsNrestos__online-service"
      >
          <img src="~/static/pics/beach/online_service.svg">
          <span>Онлайн обслуживание</span>
      </a>-->
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="(item, i) in data"
          :key="i+'slider-bar-restor'"
          class="swiper-slide"
        >
          <div class="beach-page__barsNrestos__subtitle-area">
            <h3 class="beach-page__barsNrestos__subtitle">
              {{ item.title }}<span
                v-if="getDistance(item.coordinates)"
                class="bar-distance"
              >
                <br>{{ getDistance(item.coordinates).toString().replace(/\./, ',') }} км</span>
            </h3>
            <div v-if="data.length != 1" class="beach-page__barsNrestos__arrow-controls swiper-bar-display">
              <button @click="mySwiper.slidePrev()">
                <img
                  src="~/static/pics/beach/arrow_left_orange.svg"
                  alt="Налево"
                >
              </button>
              <span class="beach-page__barsNrestos__arrow-controls__text"><span class="orange">{{ i+1 }}</span>/{{ data.length }}</span>
              <button @click="mySwiper.slideNext()">
                <img
                  src="~/static/pics/beach/arrow_right_orange.svg"
                  alt="Направо"
                >
              </button>
            </div>
          </div>
          <p class="beach-page__barsNrestos__description">
            {{ item.description }}
          </p>
          <a
            v-if="item.contact && item.contact.TYPE"
            :href="item.contact.LINK"
            target="_blank"
            class="beach-page__barsNrestos__online-service swiper-bar-display"
          >
            <span>Начать чат с рестораном</span>
            <img v-if="item.contact.TYPE === 'telegram'" src="~/static/pics/global/messengers/telegramIcon.png">
            <img v-else-if="item.contact.TYPE === 'viber'" src="~/static/pics/global/messengers/viberIcon.png">
            <img v-else src="~/static/pics/global/messengers/whatsappIcon.png">
          </a>
          <SliderBeachBarsNRestos
            :data="item.pics"
            :title="`${item.description.split(' ')[0]} ${item.title} у ${title}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SliderBeachBarsNRestos from '~/components/pages/beach/SliderBeachBarsNRestos';
import { getDistanceFromLatLonInKm } from '../../../assets/calcDistance';

export default {

  components: {
    SliderBeachBarsNRestos,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 70,
        simulateTouch: false,
        allowTouchMove: false,
        slidesPerView: 1,
        init: false,
      },
    };
  },
  computed: {
    last_coordinates() {
      const cookie_coords = this.$cookies.get('last_coordinates') || {};
      const route_coords = this.$route.params && this.$route.params.coordinates ? this.$route.params.coordinates : {};
      if (Object.values(cookie_coords).length) {
        return cookie_coords;
      }
      return route_coords ? (() => {
        const obj = Object.values(route_coords);
        return obj.length == 2 ? { lat: obj[0], lng: obj[1] } : {};
      })() : {};
    },
  },

  mounted() {
    this.mySwiper.init(this.swiperOption);
  },
  methods: {
    getDistance(d = []) {
      if (d.length) {
        if (d && d.length == 2 && Object.keys(this.last_coordinates).length) {
          const lat2 = d[0]; const lng2 = d[1];
          const { lat, lng } = this.last_coordinates;
          return Number(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)).toFixed(1)).toString().replace(/\./, ',');
        }
      }
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
  .swiper-bar-display {
    display: block;

    &_mobile a {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .swiper-bar-display {
      &_mobile {
        display: flex;
        justify-content: space-between;

        a {
          display: flex;
          margin: 0;
        }

        h2 {
          margin: 10px 0;
        }
      }
    }
  }

  @media (max-width: 680px) {
    .swiper-bar-display {
      &_mobile {
        display: block;

        a {
          display: flex;
          margin: 15px 0;
        }
      }
    }
  }
</style>
