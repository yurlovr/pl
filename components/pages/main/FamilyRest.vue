<template>
  <div
    v-if="getFamilyRest"
    class="main-page__white-wrapper"
  >
    <BeachSliderArea
      :data="getFamilyRest"
      class="main-page__family-rest"
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
    if (!this.getFamilyRest) {
      this.setFamilyRest();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getFamilyRest',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setFamilyRest',
    ]),
  },
};
</script>
