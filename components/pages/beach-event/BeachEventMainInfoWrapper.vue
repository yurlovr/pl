<template>
  <BeachEventMainInfo
    class="event-page__main-info"
    :data="data"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachEventMainInfo: () => import('./BeachEventMainInfo'),
  },
  computed: {
    ...mapGetters('event', {
      data: 'getMainInfo',
    }),
  },
};
</script>
