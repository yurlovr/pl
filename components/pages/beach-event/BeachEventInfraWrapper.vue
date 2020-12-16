<template>
  <BeachQuickData
    v-if="infra.length"
    :title="'Инфраструктура'"
    :data="infra"
  />
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
