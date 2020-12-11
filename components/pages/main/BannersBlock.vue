<template>
  <div>
    <Banner
      v-if="getBanners"
      :index="0"
      class="banner-2"
    />

    <GetBeachType />

    <Banner
      v-if="getBanners"
      :index="1"
      :last-word-yellow="true"
      class="banner-3"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Banner: () => import('./Banner'),
    GetBeachType: () => import('./GetBeachType.vue'),
  },

  async fetch() {
    if (!this.getBanners) {
      this.setBanners();
    }
  },

  computed: {
    ...mapGetters('main', [
      'getBanners',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setBanners',
    ]),
  },
};
</script>
