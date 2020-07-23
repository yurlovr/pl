<template>
  <section class="custom-grid-container">
          <search-list-card
            :data="item"
            v-for="(item, key) in data.slice((page-1)*perPage, Math.min(page*perPage, data.length))" :key="key + 'list-card'"/>
    <h4 v-show="data.length == 0" class="favorites-page__empty favorites-page__empty--card-grid">{{ emptyText ? emptyText : 'Пусто'}}</h4>
    <div class="pagination-num-wrapper custom-container" v-if="data.length > perPage">
      <Pagination :perPage="perPage" :totalElems="data.length" v-model="page" />
    </div>
  </section>
</template>

<script>
  import SearchListCard from "./SearchListCard";
  import Pagination from '~/components/global/Pagination';
  export default {
    name: "SearchHorizontalView",
    components: {SearchListCard, Pagination},
    props: ['data', 'perPage', 'emptyText'],

    data() {
      return {
        page: 1
      }
    },

    mounted() {
      this.$bus.$on('pageChanged', i => {
        setTimeout(() => {
          this.$bus.$emit('updateFavorite')
        }, 1);
      });
    },
  }
</script>

