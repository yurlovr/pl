<template>
  <div v-if="getCitiesTop">
    <Cities
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
      this.setCities();
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
