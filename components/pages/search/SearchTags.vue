<template>
  <div
    class="search-page__tags"
  >
    <div class="search-page__desktop-tablet custom-container">
      <SearchTag
        v-for="tag in renderTags"
        :key="tag.id"
        :tag="tag"
      />
    </div>
    <div class="search-page__mobile custom-container">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <SearchTag
            v-for="tag in renderTags"
            :key="tag.id"
            class="swiper-slide"
            :tag="tag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchTag from '~/components/pages/search/SearchTag';

export default {
  components: {
    SearchTag,
  },

  data() {
    return {
      swiperOption: {
        init: false,
        freeMode: true,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
      },
      renderTags: null,
    };
  },

  computed: {
    ...mapGetters('search', [
      'getTags',
      'getRenderTags',
    ]),
  },

  watch: {
    getRenderTags(value) {
      if (value) {
        this.renderTags = JSON.parse(JSON.stringify(this.getTags));
        // this.setRenderTags(0);
      }
    },
  },

  mounted() {
    this.renderTags = JSON.parse(JSON.stringify(this.getTags));
    this.mySwiper.init(this.swiperOption);

    // this.$bus.$on('updateSearchTagsSlider', () => { if (this.mySwiper) this.mySwiper.update(); });
  },
  methods: {
    ...mapActions('search', [
      'setRenderTags',
    ]),
  },
  // beforeDestroy() {
  //   this.$bus.$off('updateSearchTagsSlider');
  // },
};
</script>
