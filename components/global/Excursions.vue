<template>
  <div
    class="excursions"
  >
    <BlockPlug
      v-if="!dataForRender && !getNoExcursions"
      :height="649"
      :text="title"
      :class-name="'main-page__beach-slider-area custom-container main-page__family-rest'"
      :show-loader="true"
    />
    <BeachSliderArea
      v-else-if="dataForRender"
      :data="dataForRender"
      :outlink="OUT_LINKS_EXCURSIONS"
      class="main-page__family-rest"
    />
    <NoBlock
      v-else
      :title="PLUG_TITLE.EXCURSIONS.title"
      :description="'Пока мы не нашли ничего похожего. Возможно это самый лучший пляж!'"
      white="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { OUT_LINKS_EXCURSIONS, PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    NoBlock: () => import('~/components/pages/beach/NoBlock'),
  },
  props: {
    page: {
      type: String,
      required: true,
    },
    excursionsIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      OUT_LINKS_EXCURSIONS,
      PLUG_TITLE,
    };
  },

  async fetch() {
    await this.setExcursions({
      page: this.page,
      excursionsIds: this.excursionsIds,
    });
  },

  computed: {
    ...mapGetters('excursions', [
      'getExcursions',
      'getNoExcursions',
    ]),
    dataForRender() {
      if (this.page === 'main') {
        return this.getExcursions.main;
      }
      return this.getExcursions.page;
    },
    title() {
      return this.page === 'main'
        ? PLUG_TITLE.EXCURSIONS
        : PLUG_TITLE.EXCURSIONS_BEACH;
    },
  },
  beforeDestroy() {
    this.setExcursions({
      page: null,
    });
  },
  methods: {
    ...mapActions('excursions', [
      'setExcursions',
      // 'setNoExcursions',
    ]),
  },
};
</script>
<style lang="scss">
.excursions {
  margin-bottom: 15px;
}
</style>
