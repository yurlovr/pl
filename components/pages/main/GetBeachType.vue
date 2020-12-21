<template>
  <div>
    <BlockPlug
      v-if="!getChooseToYourWishes"
      :height="419"
      :text="PLUG_TITLE.YOUR_WISHES"
      :class-name="'main-page__beach-type custom-container'"
      :show-loader="true"
    />
    <BeachType
      v-else
      :data="getChooseToYourWishes"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachType: () => import('./BeachType.vue'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },

  data() {
    return {
      PLUG_TITLE,
    };
  },

  async fetch() {
    if (!this.getChooseToYourWishes) {
      await this.setChooseToYourWishes();
    }
  },

  computed: {
    ...mapGetters('main', [
      'getChooseToYourWishes',
    ]),
  },

  methods: {
    ...mapActions('main', [
      'setChooseToYourWishes',
    ]),
  },
};
</script>
