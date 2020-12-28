<template>
  <Catalog
    :type="'beach'"
    :data-grid="getFamilyBeaches"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Catalog from '~/components/global/Catalog.vue';
import { COUNT_ELEMENTS_ON_PAGE } from '../const/const';

export default {
  components: {
    Catalog,
  },
  async fetch({ store, query }) {
    const { page, count } = query;
    if (count !== COUNT_ELEMENTS_ON_PAGE) {
      store.dispatch('catalog/setPerPage', count);
    }
    if (!store.getters['catalog/getPage']) {
      store.dispatch('catalog/setPage', page);
    }
    await store.dispatch('catalog/setFamilyBeaches', {
      page,
      count,
    });
  },

  computed: {
    ...mapGetters('catalog', [
      'getFamilyBeaches',
      'getPage',
    ]),
  },

  watchQuery: ['page', 'count'],

  methods: {
    ...mapActions('catalog', [
      'setPage',
    ]),
  },
};
</script>
