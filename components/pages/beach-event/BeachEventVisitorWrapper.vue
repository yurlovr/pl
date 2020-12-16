<template>
  <div
    v-if="visitorPics && eventId"
    class="main-page__white-wrapper beach-event__visitor-pics-wrapper"
  >
    <BeachEventVisitorPics
      :data="visitorPics"
      :type="'event'"
      :type-id="eventId"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BeachEventVisitorPics: () => import('./BeachEventVisitorPics'),
  },
  async fetch() {
    await this.setVisitorPics(this.eventId);
  },
  computed: {
    ...mapGetters('event', {
      eventId: 'getEventId',
      visitorPics: 'getVisitorPics',
    }),
  },
  methods: {
    ...mapActions('event', [
      'setVisitorPics',
    ]),
  },
};
</script>
