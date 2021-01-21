<template>
  <Catalog
    :type="'getAllBeaches'"
    :data-grid="getAllBeaches"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Catalog from '~/components/global/Catalog.vue';
import { COUNT_ELEMENTS_ON_PAGE } from '../const/const';
import { head } from '~/mixins/head';

export default {
  components: {
    Catalog,
  },
  mixins: [head],

  async fetch({ store, query }) {
    const { page, count } = query;
    if (count !== COUNT_ELEMENTS_ON_PAGE) {
      store.dispatch('catalog/setPerPage', count);
    }
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

  methods: {
    ...mapActions('catalog', [
      'setPage',
    ]),
  },
};
</script>
