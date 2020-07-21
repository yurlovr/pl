<template>
  <section class="custom-grid-container">
          <search-list-card
            :data="item"
            v-for="(item, key) in data.slice((page-1)*perPage, Math.min(page*perPage, data.length))" :key="key + 'list-card'"/>
  </section>
</template>

<script>
  import SearchListCard from "./SearchListCard";
  export default {
    name: "SearchHorizontalView",
    components: {SearchListCard},
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

