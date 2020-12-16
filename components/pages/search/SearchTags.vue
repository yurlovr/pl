<template>
  <div class="search-page__tags">
    <div class="search-page__desktop-tablet custom-container">
      <SearchTag
        v-for="(tag, i) in getTags"
        :key="i"
        :tag="tag"
      />
    </div>
    <div class="search-page__mobile custom-container">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <SearchTag
            v-for="(tag, i) in getTags"
            :key="i"
            class="swiper-slide"
            :tag="tag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchTag from '~/components/pages/search/SearchTag';

export default {
  components: {
    SearchTag,
  },
  // props: {
  //   tags: {
  //     type: Array,
  //     required: true,
  //   },
  // },

  data() {
    return {
      swiperOption: {
        init: false,
        freeMode: true,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
      },
    };
  },

  computed: {
    ...mapGetters('search', [
      'getTags',
    ]),
  },

  watch: {
    getTags(v) {
      if (!v.length) {
        this.$router.push('/');
      }
    },
  },

  mounted() {
    this.mySwiper.init(this.swiperOption);

    // this.$bus.$on('updateSearchTagsSlider', () => { if (this.mySwiper) this.mySwiper.update(); });
  },
  // beforeDestroy() {
  //   this.$bus.$off('updateSearchTagsSlider');
  // },
};
</script>
