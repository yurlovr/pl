<template>
  <div
    :class="white && 'main-page__white-wrapper'"
  >
    <BlockPlug
      v-if="!dataForRender"
      :height="649"
      :text="title"
      :class-name="'main-page__beach-slider-area custom-container main-page__family-rest'"
      :show-loader="true"
    />
    <BeachSliderArea
      v-else
      :data="dataForRender"
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
  props: {
    page: {
      type: String,
      required: true,
    },
    beachId: {
      type: String,
      default: '',
    },
    white: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      OUT_LINKS_HOTEL,
      PLUG_TITLE,
    };
  },

  async fetch() {
    await this.setHotels({
      page: this.page,
      beachId: this.beachId || null,
    });
  },

  computed: {
    ...mapGetters('hotels', [
      'getHotels',
    ]),
    dataForRender() {
      if (this.page === 'main') {
        return this.getHotels.main;
      }
      return this.getHotels.page;
    },
    title() {
      return this.page === 'main'
        ? PLUG_TITLE.ANY_PLACES
        : PLUG_TITLE.NEARBY_PLACES;
    },
  },
  beforeDestroy() {
    this.setHotels({
      page: null,
      beachId: null,
    });
  },
  methods: {
    ...mapActions('hotels', [
      'setHotels',
    ]),
  },
};
</script>
