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
  computed: {
    ...mapGetters('main', [
      'getChooseToYourWishes',
    ]),
  },
  mounted() {
    if (!this.getChooseToYourWishes) {
      this.setChooseToYourWishes();
    }
  },
  methods: {
    ...mapActions('main', [
      'setChooseToYourWishes',
    ]),
  },
};
</script>
