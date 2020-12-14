<template>
  <div
    v-if="getAnotherPlaces"
    class="main-page__white-wrapper"
  >
    <BeachSliderArea
      :data="getAnotherPlaces"
      :outlink="OUT_LINKS_HOTEL"
      class="main-page__family-rest"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { OUT_LINKS_HOTEL } from '~/const/const';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
  },
  data() {
    return {
      OUT_LINKS_HOTEL,
    };
  },

  async fetch() {
    if (!this.getAnotherPlaces) {
      await this.setAnyPlaces();
    }
  },

  computed: {
    ...mapGetters('main', [
      'getAnotherPlaces',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setAnyPlaces',
    ]),
  },
};
</script>
