<template>
  <section
    v-if="getActiveRest"
    class="main-page__dynamic-slider-area custom-container"
  >
    <h3 class="main-page__section-title mb">
      {{ getActiveRest.title }}
    </h3>
    <span class="main-page__section-subtitle">
      {{ getActiveRest.description }}
    </span>
    <SliderDynamic :data="getActiveRest.cards" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SliderDynamic from '~/components/pages/main/sliders/SliderDynamic';

export default {

  components: {
    SliderDynamic,
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
