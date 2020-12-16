<template>
  <BeachEventSideButtons
    class="event-page__side-buttons"
    :dont-show-pave="true"
    :data="{telegram, email, pos}"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    BeachEventSideButtons: () => import('./BeachEventSideButtons'),
  },
  computed: {
    ...mapGetters('event', {
      email: 'getEmail',
      telegram: 'getTelegram',
      pos: 'getPosition',
    }),
  },
};
</script>
