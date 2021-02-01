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
      v-else-if="data && data.length"
      class="beach-page__cardless-area"
      :data="data"
      :title="title"
    />
    <NoBlock
      v-else
      :id="'barsNRestos'"
      :title="PLUG_TITLE.BARS.title"
      :description="'На пляже очень много доступных ресторанов.'"
      :white="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  name: 'BeachBarsWrapper',
  components: {
    BlockPlug: () => import('~/components/global/BlockPlug'),
    BeachBarsNRestos: () => import('~/components/pages/beach/BeachBarsNRestos'),
    NoBlock: () => import('~/components/pages/beach/NoBlock'),
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
