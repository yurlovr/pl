<template>
  <div>
    <div
      v-if="!getCitiesTop"
      class="empty"
    />
    <Cities
      v-else
      :data="getCitiesTop"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Cities: () => import('./Cities'),
  },
  async fetch() {
    if (!this.getCitiesTop) {
      await this.setCities();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getCitiesTop',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setCities',
    ]),
  },
};
</script>
<style lang="scss" scoped>
  .empty {
    min-height: 500px;
  }
</style>
