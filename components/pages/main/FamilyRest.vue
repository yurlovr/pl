<template>
  <div
    class="main-page__white-wrapper"
  >
    <BlockPlug
      v-if="!getFamilyRest"
      class="main-page__family-rest"
      :height="621"
      :text="PLUG_TITLE.FAMILY_REST"
      :class-name="'main-page__beach-slider-area custom-container'"
      :show-loader="true"
    />
    <BeachSliderArea
      v-else
      :data="getFamilyRest"
      class="main-page__family-rest"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  data() {
    return {
      PLUG_TITLE,
    };
  },
  async fetch() {
    if (!this.getFamilyRest) {
      this.setFamilyRest();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getFamilyRest',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setFamilyRest',
    ]),
  },
};
</script>
