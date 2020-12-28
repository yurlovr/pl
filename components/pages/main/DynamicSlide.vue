<template>
  <nuxt-link
    :to="{path: '/search1', query: {['addTags[]']: getLink,
                                    page: 1,
                                    count: COUNT_ELEMENTS_BEACH}
    }"
  >
    <img
      v-lazy-load
      :data-src="slide.pic"
      class="slider-dynamic__slide__pic"
    >
    <div class="slide-placeholder">
      <span class="slide-placeholder__text">загрузка изображения</span>
    </div>
    <h3 class="slider-dynamic__slide__title">
      {{ slide.title }}
    </h3>
    <div class="slider-dynamic__slide__beach-number-area">
      <span class="slider-dynamic__slide__beach-number">{{ slide.beachNumber }}</span>
      <span class="slider-dynamic__slide__beach">
        {{ plural(slide.beachNumber, 'пляж', 'пляжа', 'пляжей') }}
      </span>
    </div>
  </nuxt-link>
</template>

<script>
import { plural } from '~/helpers';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      COUNT_ELEMENTS_BEACH,
    };
  },

  computed: {
    getLink() {
      return this.slide.filter.map((item) => item.id).join(',');
    },
  },

  methods: {
    plural,
    goToSearch() {
      this.$bus.$emit('emptySearchParams');
      for (let i = 0; i < this.slide.filter.length; i++) {
        this.$bus.$emit('updateSearchParam', this.slide.filter[i]);
      }
      // this.$bus.goTo(this.getLink, this.$router);
      this.$router.push(this.getLink);
    },
  },
};
</script>
