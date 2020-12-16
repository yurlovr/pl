<template>
  <BeachEventReviews
    v-if="reviews"
    class="beach-page__cardless-area"
    :type="'event'"
    :type-id="typeId"
    :data="reviews"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BeachEventReviews: () => import('~/components/pages/beach-event/BeachEventReviews'),
  },
  async fetch() {
    await this.setReviews(this.eventId);
  },
  computed: {
    ...mapGetters('event', {
      eventId: 'getEventId',
      reviews: 'getReviews',
      mainData: 'getMainInfo',
    }),
    typeId() {
      return this.mainData?.eventId;
    },
  },
  methods: {
    ...mapActions('event', [
      'setReviews',
    ]),
  },
};
</script>
