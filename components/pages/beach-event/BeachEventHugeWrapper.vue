<template>
  <SliderHugeBeachEventPage
    id="gallery"
    :data="data"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    SliderHugeBeachEventPage: () => import('./SliderHugeBeachEventPage'),
  },
  computed: {
    ...mapGetters('event', {
      data: 'getHugeSlider',
    }),
  },
};
</script>
