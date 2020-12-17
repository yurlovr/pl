<template>
  <div
    v-if="data.auto.length || data.bus.length"
    id="pt"
    class="beach-event__pt-wrapper"
  >
    <section class="two-part-layout__card">
      <div
        id="parks"
        class="beach-event__pt"
      >
        <h2 class="two-part-layout__card__title beach-event__pt__title">
          Парковки и общественный транспорт
        </h2>
        <div class="beach-event__pt__bottom">
          <div class="beach-event__pt__left">
            <button
              class="beach-event__pt__type"
              :class="{ active: active === 0 }"
              @click="showOnMap(0)"
            >
              <div class="beach-event__pt__type-inner">
                <img src="~/static/pics/beach/car.svg">
                <span>Автомобиль</span>
              </div>
              <div class="beach-event__pt__bottom-line" />
            </button>
            <button
              class="beach-event__pt__type"
              :class="{ active: active === 1 }"
              @click="showOnMap(1)"
            >
              <div class="beach-event__pt__type-inner">
                <img src="~/static/pics/beach/bus.svg">
                <span>Общественный транспорт</span>
              </div>
            </button>
          </div>
          <div class="beach-event__pt__right">
            <a
              v-if="data"
              :href="'https://yandex.ru/maps/' + yandexTransform(pos)"
              target="_blank"
              class="beach-event__pt__right__button banner__card__info-area__button"
            >
              <span>Проложить маршрут</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <BeachEventPtMap
        :data="data"
        :additional="additional"
        :map-data="mapData"
      />
    </client-only>

    <a
      v-if="data"
      :href="'https://yandex.ru/maps/' + yandexTransform(pos)"
      target="_blank"
      class="beach-event__pt__right__button banner__card__info-area__button bottom"
    >
      <span>Проложить маршрут</span>
    </a>
  </div>
</template>

<script>
import BeachEventPtMap from '~/components/pages/beach-event/BeachEventPtMap';

export default {

  components: {
    BeachEventPtMap,
  },
  props: ['data', 'additional', 'mapData'],

  data() {
    return {
      active: 0,
      userPos: {
        lat: 50,
        long: 50,
      },
      pos: [],
    };
  },

  computed: {
    lastCoordinates() {
      const cookieCoords = this.$cookies.get('last_coordinates') || {};
      const routeCoords = this.$route.params && this.$route.params.coordinates
        ? this.$route.params.coordinates
        : {};
      if (Object.values(cookieCoords).length) {
        return cookieCoords;
      }
      return routeCoords ? (() => {
        const obj = Object.values(routeCoords);
        return obj.length === 2 ? { lat: obj[0], lng: obj[1] } : {};
      })() : {};
    },
  },

  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setUserPos);
    } else {
      console.error("Cannot get user's position (ParkingsTransport)");
    }

    this.$bus.$on('routeCoords', (coords) => {
      this.pos = coords;
    });
  },
  beforeDestroy() {
    this.$bus.$off('routeCoords');
  },

  methods: {
    yandexTransform(pos) {
      const userPos = Object.values(this.lastCoordinates).join(',');
      const beachPos = pos.join(',');
      return `?rtext=${userPos}~${beachPos}&rtt=auto&z=12`;
    },
    setUserPos(pos) {
      this.userPos.lat = pos.coords.latitude;
      this.userPos.long = pos.coords.longitude;
      const { coords: { latitude, longitude } } = pos;
      const myCoords = {
        lat: latitude,
        lng: longitude,
      };
      console.log(myCoords, 'm');
      this.$cookies.set('last_coordinates', JSON.stringify(myCoords), {
        maxAge: 30 * 24 * 60 * 60, // one month
      });
    },

    showOnMap(i) { // 0 parkings, 1 transport
      this.active = i;
      this.$bus.$emit('showOnMap', i);
    },
  },
};
</script>
