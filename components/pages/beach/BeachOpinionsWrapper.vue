<template>
  <div>
    <BlockPlug
      v-if="!getOpinions"
      :height="668"
      :text="PLUG_TITLE.OPINIONS"
      :show-loader="true"
    />
    <BeachOpinions
      v-else
      id="opinions"
      :data="getOpinions"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachOpinions: () => import('~/components/pages/beach/BeachOpinions'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
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
    await this.setOpinions(this.beachId);
  },
  computed: {
    ...mapGetters('opinions', [
      'getOpinions',
    ]),
  },
  beforeDestroy() {
    this.setOpinionsDefault();
  },
  methods: {
    ...mapActions('opinions', [
      'setOpinions',
      'setOpinionsDefault',
    ]),
  },
};
</script>
