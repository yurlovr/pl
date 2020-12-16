<template>
  <BeachEventAbout
    id="about"
    :data="data"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachEventAbout: () => import('./BeachEventAbout'),
  },
  computed: {
    ...mapGetters('event', {
      data: 'getAbout',
    }),
  },
};
</script>
