<template>
  <section class="custom-grid-container">
    <search-list-card
      v-for="(item, key) in data.list"
      :key="key + 'list-card'"
      :data="item"
    />
    <h4
      v-show="data.list.length === 0"
      class="favorites-page__empty favorites-page__empty--card-grid"
    >
      {{ emptyText ? emptyText : '' }}
    </h4>
    <div
      v-if="data.pagination.countElements > perPage"
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
import SearchListCard from './SearchListCard';
import Pagination from '~/components/global/Pagination';

export default {
  name: 'SearchHorizontalView',
  components: { SearchListCard, Pagination },
  props: ['data', 'perPage', 'emptyText'],

  data() {
    return {
      page: 1,
    };
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

  // mounted() {
  //   this.$bus.$on('pageChanged', (i) => {
  //     setTimeout(() => {
  //       this.$bus.$emit('updateFavorite');
  //     }, 1);
  //   });
  // },
};
</script>
