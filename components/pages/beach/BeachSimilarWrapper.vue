<template>
  <div id="similar-beaches">
    <BlockPlug
      v-if="!getSimilarBeaches"
      :height="365"
      :text="PLUG_TITLE.SIMILAR"
      :show-loader="true"
    />
    <BeachSliderArea
      v-else-if="getSimilarBeaches && getSimilarBeaches.beachSliderData"
      class="beach-event__similar-beaches"
      :data="getSimilarBeaches"
      :pagination="true"
    />
    <NoSimilar v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    NoSimilar: () => import('~/components/pages/beach/NoSimilar'),
  },
  props: {
    cityId: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
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
    await this.setSimilarBeaches({
      cityId: this.cityId,
      tags: this.tags,
      beachId: this.beachId,
    });
  },
  computed: {
    ...mapGetters('similar', [
      'getSimilarBeaches',
    ]),
  },
  beforeDestroy() {
    this.setSimilarDefault();
  },
  methods: {
    ...mapActions('similar', [
      'setSimilarBeaches',
      'setSimilarDefault',
    ]),
  },
};
</script>
