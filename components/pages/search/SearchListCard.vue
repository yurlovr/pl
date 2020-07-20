<template>
    <div class="search-card-list">
      <div class="img_area">
        <img v-lazy-load :data-src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic"
             @load="picLoaded = true">
        <img v-show="!this.picLoaded" class="custom-card__pic"
             src="~/static/pics/global/pics/slider_beh_placeholder.png">
        <img :src="data.pic" :alt="data.title">
      </div>
    </div>
</template>

<script>
    export default {
        name: "SearchListCard",
      props: ['data'],
    }
</script>

<style scoped>

</style>
