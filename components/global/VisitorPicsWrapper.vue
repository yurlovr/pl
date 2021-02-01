<template>
  <div
    class="two-part-layout__card"
  >
    <BeachEventVisitorPics
      v-if="visitorPics && id"
      :data="visitorPics"
      :type="type"
      :type-id="id"
      :title="title"
    />
    <BlockPlug
      v-else
      class="main-page__family-rest"
      :height="672"
      :text="PLUG_TITLE.VISITOR_PICS"
      :class-name="'main-page__beach-slider-area custom-container'"
      :show-loader="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from  '~/const/const';

export default {
  components: {
    BeachEventVisitorPics: () => import('~/components/pages/beach-event/BeachEventVisitorPics'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      type: null,
      PLUG_TITLE,

    };
  },
  async fetch() {
    this.type = this.$route.path.split('/')[1];
    await this.setVisitorPics(this.id);
  },
  computed: {
    ...mapGetters('visitors', {
      visitorPics: 'getVisitorPics',
    }),
  },
  beforeDestroy() {
    this.setVisitorPics(null);
  },
  methods: {
    ...mapActions('visitors', [
      'setVisitorPics',
    ]),
  },
};
</script>
