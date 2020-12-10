<template>
  <nuxt-link
    :to="{ path: '/search', query: { typeBeach: item.id}}"
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
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
  .main-page__choose-beach__cards img {
    margin-right: 0;
  }
</style>
