<template>
  <div>
    <BlockPlug
      v-if="!data"
      :height="521"
      :text="PLUG_TITLE.BARS"
      class-name="beach-page__cardless-area no-padding"
      :show-loader="true"
    />
    <BeachBarsNRestos
      v-else
      class="beach-page__cardless-area"
      :data="data"
      :title="title"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BeachBarsNRestos from './BeachBarsNRestos.vue';
import BlockPlug from '~/components/global/BlockPlug.vue';
import { PLUG_TITLE } from '~/const/const';

export default {
  name: 'BeachBarsWrapper',
  components: {
    BlockPlug,
    BeachBarsNRestos,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    beachId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      PLUG_TITLE,
    };
  },
  async fetch() {
    await this.setBarnRestors(null);
    await this.setBarnRestors(this.beachId);
  },
  computed: {
    ...mapGetters('beach', {
      data: 'getBarNrestors',
    }),
  },
  methods: {
    ...mapActions('beach', [
      'setBarnRestors',
    ]),
  },
};
</script>
