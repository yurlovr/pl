<template>
  <BeachEventSections
    class="beach-page-sections event-page-sections"
    :sections="sections"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachEventSections: () => import('./BeachEventSections'),
  },
  computed: {
    ...mapGetters('event', {
      sections: 'getSections',
    }),
  },
};
</script>
