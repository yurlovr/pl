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

    <NoBlock
      v-else
      :id="'events'"
      :title="PLUG_TITLE.EVENT.title"
      :description="'В настоящее время на пляже нет мероприятий.'"
      :white="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachEvents: () => import('~/components/pages/beach/BeachEvents'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    NoBlock: () => import('~/components/pages/beach/NoBlock'),
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
