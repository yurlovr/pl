<template>
  <div class="map-popup map-popup-custom">
    <BlockPlug
      v-if="!beachFromMap"
      :height="300"
      :show-loader="true"
    />
    <div v-else>
      <PopupMap
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PopupMap from './PopupMap.vue';
import BlockPlug from '~/components/global/BlockPlug.vue';

export default {
  name: 'PopupMapWrapper',
  components: {
    PopupMap,
    BlockPlug,
  },
  computed: {
    ...mapGetters('main', {
      beachFromMap: 'getBeachFromMap',
    }),
  },
};
</script>
