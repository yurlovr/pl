<template>
  <div
    class="main-page__popular-beaches"
  >
    <div
      v-if="!getBeachesTop"
      class="empty"
    />
    <BeachSliderArea
      v-else
      :data="getBeachesTop"
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
    if (!this.getBeachesTop) {
      await this.getMainPageData();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getBeachesTop',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'getMainPageData',
    ]),
  },
};
</script>
<style lang="scss" scoped>
  .empty {
    min-height: 500px;
  }
</style>
