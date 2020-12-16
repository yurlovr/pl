<template>
  <BeachEventParkingsTransport
    id="pt"
    :map-data="mapData"
    :data="parkings"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachEventParkingsTransport: () => import('./BeachEventParkingsTransport'),
  },
  computed: {
    ...mapGetters('event', {
      parkings: 'getParkings',
      mapData: 'getMapEntity',
    }),
  },
};
</script>
