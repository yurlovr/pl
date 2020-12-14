<template>
  <section class="card-grid custom-grid-container">
    <Card
      v-for="(card, i) in data.list"
      :key="card.id || card.eventId || card.beachId || i"
      :data="card"
      class="card-grid__card"
    />
    <h4
      v-show="data.list.length === 0"
      class="favorites-page__empty favorites-page__empty--card-grid"
    >
      {{ emptyText ? emptyText : '' }}
    </h4>
    <div
      v-show="data.pagination.countElements > perPage"
      class="pagination-num-wrapper custom-container"
    >
      <Pagination
        :per-page="perPage"
        :total-elems="data.pagination.countElements"
        @changePage="onChangePage"
      />
    </div>
  </section>
</template>

<script>
import Card from '~/components/global/Card';
import Pagination from '~/components/global/Pagination';

export default {

  components: {
    Card,
    Pagination,

  },
  props: ['data', 'perPage', 'emptyText'],

  computed: {
  },
  beforeDestroy() {
    this.$bus.$off('pageChanged');
  },

  mounted() {
    this.$bus.$on('pageChanged', (i) => {
      setTimeout(() => { this.$bus.$emit('updateFavorite'); });
    });
  },

  methods: {
    onChangePage(pageNum) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pageNum,
          count: this.perPage,
        },
      });
    },
  },
};
</script>
