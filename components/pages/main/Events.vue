<template>
  <BeachSliderArea
    v-if="getEvents"
    class="main-page__beach-events"
    :data="getEvents"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
  },
  async fetch() {
    if (!this.getEvents) {
      this.setEvents();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getEvents',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setEvents',
    ]),
  },
};
</script>
