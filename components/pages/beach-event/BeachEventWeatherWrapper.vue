<template>
  <BeachEventMapWeather
    v-if="weather"
    :map-data="mapData"
    :data="{ pos: position, weather }"
    class="beach-event__map-weather__desktop"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachEventMapWeather: () => import('./BeachEventMapWeather'),
  },
  computed: {
    ...mapGetters('event', {
      weather: 'getWeatherData',
      mapData: 'getMapEntity',
      position: 'getPosition',
    }),
  },
};
</script>
