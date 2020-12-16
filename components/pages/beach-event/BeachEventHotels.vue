<template>
  <div
    v-if="hotels"
    class="main-page__white-wrapper"
  >
    <BeachSliderArea
      :data="hotels"
      class="main-page__family-rest"
      outlink="https://nash.travel/hotel"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
  },
  async fetch() {
    this.setHotels();
  },
  computed: {
    ...mapGetters('event', {
      hotels: 'getHotels',
    }),
  },
  methods: {
    ...mapActions('event', [
      'setHotels',
    ]),
  },
};
</script>
