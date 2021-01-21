<template>
  <nuxt-link
    :to="{ path: '/search', query: { typeBeach: item.id, page: 1, count: COUNT_ELEMENTS_BEACH}}"
    class="main-page__choose-beach__card"
  >
    <img
      :src="require(`~/static/pics/main/${item.src}`)"
    >
    <h2 class="main-beach-h2-helper">
      {{ item.title }}
    </h2>
  </nuxt-link>
</template>

<script>
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      COUNT_ELEMENTS_BEACH,
    };
  },
};
</script>
<style lang="scss" scoped>
  .main-page__choose-beach__cards img {
    margin-right: 0;
  }
</style>
