<template>
  <BeachType
    v-if="getChooseToYourWishes"
    :data="getChooseToYourWishes"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BeachType: () => import('./BeachType.vue'),
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
