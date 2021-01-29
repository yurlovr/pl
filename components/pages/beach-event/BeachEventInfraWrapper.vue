<template>
  <section
    id="infra"
    class="two-part-layout__card beach-page__quick-data-wrapper"
  >
    <BeachQuickData
      v-if="infra.length"
      :title="'Инфраструктура'"
      :data="infra"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachQuickData: () => import('~/components/pages/beach/BeachQuickData'),
  },
  computed: {
    ...mapGetters('event', {
      infra: 'getInfra',
    }),
  },
};
</script>
