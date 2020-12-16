<template>
  <div
    v-if="anyPlaces"
    class="main-page__white-wrapper"
  >
    <BeachSliderArea
      :data="anyPlaces"
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
    await this.setAnyPlaces();
  },
  computed: {
    ...mapGetters('event', {
      anyPlaces: 'getAnyPlaces',
    }),
  },
  methods: {
    ...mapActions('event', [
      'setAnyPlaces',
    ]),
  },
};
</script>
