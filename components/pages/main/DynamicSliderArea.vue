<template>
  <div>
    <BlockPlug
      v-if="!getActiveRest"
      :height="493"
      :text="PLUG_TITLE.ACTIVE_REST"
      :class-name="'main-page__dynamic-slider-area custom-container'"
      :show-loader="true"
    />
    <section
      v-else
      class="main-page__dynamic-slider-area custom-container"
    >
      <h3 class="main-page__section-title mb">
        {{ getActiveRest.title }}
      </h3>
      <span class="main-page__section-subtitle">
        {{ getActiveRest.description }}
      </span>
      <SliderDynamic
        :data="getActiveRest.cards"
      />
    </section>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {

  components: {
    BlockPlug: () => import('~/components/global/BlockPlug'),
    SliderDynamic: () => import('~/components/pages/main/sliders/SliderDynamic'),
  },
  data() {
    return {
      PLUG_TITLE,
    };
  },

  async fetch() {
    if (!this.getActiveRest) {
      await this.setActiveRest();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getActiveRest',
    ]),
  },

  methods: {
    ...mapActions('main', [
      'setActiveRest',
    ]),
  },
};
</script>
<style lang="scss" scoped>
  .mb {
    margin-bottom: 10px;
  }
</style>
