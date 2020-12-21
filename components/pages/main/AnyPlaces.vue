<template>
  <div
    class="main-page__white-wrapper"
  >
    <BlockPlug
      v-if="!getAnotherPlaces"
      :height="649"
      :text="PLUG_TITLE.ANY_PLACES"
      :class-name="'main-page__beach-slider-area custom-container main-page__family-rest'"
      :show-loader="true"
    />
    <BeachSliderArea
      v-else
      :data="getAnotherPlaces"
      :outlink="OUT_LINKS_HOTEL"
      class="main-page__family-rest"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { OUT_LINKS_HOTEL, PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  data() {
    return {
      OUT_LINKS_HOTEL,
      PLUG_TITLE,
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
