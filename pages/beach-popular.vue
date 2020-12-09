<template>
  <Catalog
    :type="'beach'"
    :data-grid="getPopularBeaches"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Catalog from '~/components/global/Catalog.vue';

export default {
  components: {
    Catalog,
  },
  async fetch({ store, query }) {
    const { page, count } = query;
    await store.dispatch('catalog/setPopularBeaches', {
      page,
      count,
    });
  },

  computed: {
    ...mapGetters('catalog', [
      'getPopularBeaches',
      'getPage',
    ]),
  },
  watchQuery: ['page', 'count'],

  beforeDestroy() {
    this.setPage(1);
  },
  methods: {
    ...mapActions('catalog', [
      'setPage',
    ]),
  },
};
</script>
