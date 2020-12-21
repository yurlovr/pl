<template>
  <div>
    <BlockPlug
      v-if="!getBanners"
      :height="541"
      :text="PLUG_TITLE.BANNERS"
      :class-name="'banner custom-container'"
      :show-loader="true"
    />
    <Banner
      v-else
      :index="0"
      class="banner-2"
    />

    <GetBeachType />

    <BlockPlug
      v-if="!getBanners"
      :height="543"
      :text="PLUG_TITLE.BANNERS"
      :class-name="'banner custom-container'"
      :show-loader="true"
    />
    <Banner
      v-else
      :index="1"
      :last-word-yellow="true"
      class="banner-3"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    Banner: () => import('./Banner'),
    GetBeachType: () => import('./GetBeachType.vue'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  data() {
    return {
      PLUG_TITLE,
    };
  },

  async fetch() {
    if (!this.getBanners) {
      await this.setBanners();
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
