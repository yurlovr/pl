<template>
  <section class="main-page__map">
    <div class="custom-container">
      <h3 class="main-page__section-title">
        Карта пляжей Крыма
      </h3>
    </div>
    <div class="main-page__map-inner">
      <MapBeaches
        v-show="step === 2"
        :data="data.addressBeaches"
      />
      <Map
        :data="data"
        :map-data="[]"
        v-on="$listeners"
      />
      <!-- :map-data="mapData" -->
    </div>
  </section>
</template>

<script>
import MapBeaches from '~/components/pages/main/MapBeaches';
import Map from '~/components/pages/main/Map';

export default {

  components: {
    MapBeaches,
    Map,
  },
  props: ['data', 'mapData'],

  data() {
    return {
      step: 1,
    };
  },

  mounted() {
    this.$bus.$on('changeStep', (stepID) => {
      this.step = stepID;
    });
  },
  beforeDestroy() {
    this.$bus.$off('changeStep');
  },
};
</script>
