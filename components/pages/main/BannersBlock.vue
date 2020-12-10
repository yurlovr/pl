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

  computed: {
    ...mapGetters('main', [
      'getBanners',
    ]),
  },
  mounted() {
    if (!this.getBanners) {
      this.setBanners();
    }
  },
  methods: {
    ...mapActions('main', [
      'setBanners',
    ]),
  },
};
</script>
