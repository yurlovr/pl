<template>
  <Catalog
    :type="'getAllBeaches'"
    :data-grid="getAllBeaches"
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
    if (!store.getters['catalog/getPage']) {
      store.dispatch('catalog/setPage', page);
    }
    await store.dispatch('catalog/setAllBeaches', {
      page,
      count,
    });
  },

  computed: {
    ...mapGetters('catalog', [
      'getAllBeaches',
      'getPage',
    ]),
  },
  watchQuery: ['page', 'count'],

  beforeDestroy() {
    this.setPage(null);
  },
  methods: {
    ...mapActions('catalog', [
      'setPage',
    ]),
  },
};
</script>
