<template>
  <a :href="getLink" @click.prevent="goToSearch()">
    <img
      v-lazy-load
      :data-src="slide.pic"
      class="slider-dynamic__slide__pic"
    >
    <!--		<img  v-show="!picLoaded" src="~/static/pics/global/pics/dynamic_slide_placeholder.png" class="slider-dynamic__slide__pic">-->
    <div class="slide-placeholder">
      <span class="slide-placeholder__text">загрузка изображения</span>
    </div>
    <h3 class="slider-dynamic__slide__title">{{ slide.title }}</h3>
    <div class="slider-dynamic__slide__beach-number-area">
      <span class="slider-dynamic__slide__beach-number">{{ slide.beachNumber }}</span>
      <span class="slider-dynamic__slide__beach">{{ getBeachText(slide.beachNumber) }}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ['slide'],

  data() {
    return {
      picLoaded: false,
    };
  },

  computed: {
    getLink() {
      let link = '/search?';
      for (let i = 0; i < this.slide.filter.length; i++) {
        link += `${this.slide.filter[i].type}[]=${this.slide.filter[i].id}&`;
      }
      return link.slice(0, -1);
    },
  },

  methods: {
    goToSearch() {
      this.$bus.$emit('emptySearchParams');
      for (let i = 0; i < this.slide.filter.length; i++) {
        this.$bus.$emit('updateSearchParam', this.slide.filter[i]);
      }
      // this.$bus.goTo(this.getLink, this.$router);
      this.$router.push(this.getLink);
    },

    getBeachText(i) {
      let num = i % 100;
      if (num >= 5 && num % 100 <= 20) return 'пляжей';
      num %= 10;
      if (num % 10 === 1) return 'пляж';
      if (num >= 2 && num <= 4) return 'пляжа';
      return 'пляжей';
    },
  },
};
</script>
