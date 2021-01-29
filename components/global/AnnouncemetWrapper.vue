<template>
  <AnnouncementCard
    v-if="data"
    :data="data"
    :class="className"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    AnnouncementCard: () => import('~/components/global/AnnouncementCard'),
  },
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  async fetch() {
    const page = this.$route.path.split('/')[1];
    await this.setAnnouncement(page);
  },
  computed: {
    ...mapGetters('announcement', {
      data: 'getAnnouncement',
    }),
  },
  beforeDestroy() {
    this.setAnnouncement(null);
  },
  methods: {
    ...mapActions('announcement', [
      'setAnnouncement',
    ]),
  },
};
</script>
