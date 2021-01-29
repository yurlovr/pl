<template>
  <div>
    <BlockPlug
      v-if="!getBeachEvents"
      :height="374"
      :text="PLUG_TITLE.EVENT"
      :show-loader="true"
    />
    <BeachEvents
      v-else-if="getBeachEvents.count"
      :show-temp="false"
      :data="getBeachEvents"
      class="beach-page__cardless-area"
    />
    <NoEvents v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachEvents: () => import('~/components/pages/beach/BeachEvents'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    NoEvents: () => import('~/components/pages/beach/NoEvents'),
  },
  props: {
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
    await this.setBeachEvents(this.beachId);
  },
  computed: {
    ...mapGetters('beachEvents', [
      'getBeachEvents',
    ]),
  },
  beforeDestroy() {
    this.setBeachEventsDefault();
  },
  methods: {
    ...mapActions('beachEvents', [
      'setBeachEvents',
      'setBeachEventsDefault',
    ]),
  },
};
</script>
