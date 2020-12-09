<template>
  <Catalog
    :type="'event'"
    :data-grid="getEvents"
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
    await store.dispatch('catalog/setEvents', {
      page,
      count,
    });
  },

  computed: {
    ...mapGetters('catalog', [
      'getEvents',
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
