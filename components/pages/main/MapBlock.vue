<template>
  <div>
    <BlockPlug
      v-if="!mapLoaded"
      :height="559"
      :text="PLUG_TITLE.MAP"
      :class-name="'main-page__map'"
      :show-loader="true"
      :map="true"
    />
    <MapArea
      v-if="map"
      v-show="mapLoaded"
      :data="map"
      @map-loaded="mapIsLoaded"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    MapArea: () => import('~/components/pages/main/MapArea'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  data() {
    return {
      PLUG_TITLE,
      mapLoaded: false,
    };
  },
  async fetch() {
    if (!this.map) {
      await this.setMap();
    }
  },
  computed: {
    ...mapGetters('main', {
      map: 'getMap',
    }),
  },
  methods: {
    ...mapActions('main', [
      'setMap',
    ]),
    mapIsLoaded() {
      this.mapLoaded = true;
    },
  },
};
</script>
