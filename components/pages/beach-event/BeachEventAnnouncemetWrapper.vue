<template>
  <AnnouncementCard
    v-if="data"
    :data="data"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    AnnouncementCard: () => import('~/components/global/AnnouncementCard'),
  },
  async fetch() {
    await this.setAnnouncement('event');
  },
  computed: {
    ...mapGetters('event', {
      data: 'getAnnouncement',
    }),
  },
  methods: {
    ...mapActions('event', [
      'setAnnouncement',
    ]),
  },
};
</script>
