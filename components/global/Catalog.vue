<template>
  <div v-if="dataGrid" class="catalog-page custom-page">
    <div class="catalog-page__title-area custom-container">
      <h3 class="custom-page__title catalog-page__title">
        {{ dataGrid.title }}
      </h3>
      <div v-if="dataGrid && type === 'beach'" class="search-page__title-area__buttons">
        <button
          class="search-page__title-area__button"
          :class="{ active: !showCardsOrMap }"
          @click="showCardsOrMap = false"
        >
          <img
            v-show="!showCardsOrMap"
            src="~/static/pics/search/cards_orange.svg"
            alt="Вид: Карточки"
          >
          <img
            v-show="showCardsOrMap"
            src="~/static/pics/search/cards_gray.svg"
            alt="Вид: Карточки"
          >
        </button>
        <button
          class="search-page__title-area__button"
          :class="{ active: showCardsOrMap }"
          @click="showMap()"
        >
          <img
            v-show="showCardsOrMap"
            src="~/static/pics/search/map_orange.svg"
            alt="Вид: Карта"
          >
          <img
            v-show="!showCardsOrMap"
            src="~/static/pics/search/map_gray.svg"
            alt="Вид: Карта"
          >
        </button>
      </div>
    </div>
    <CardGrid
      v-if="dataGrid && dataGrid.list.length"
      v-show="!showCardsOrMap"
      :per-page="perPage"
      :data="dataGrid"
    />
    <!-- <SearchMapArea
      v-show="showCardsOrMap"
      v-if="data.grid && data.grid.length > 0 && type === 'beach'"
      :data="data.grid"
    /> -->
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { mapMutations, mapActions, mapGetters } from 'vuex';
import CardGrid from '~/components/global/CardGrid';
import SearchMapArea from '~/components/pages/search/SearchMapArea';
import { COUNT_ELEMENTS_ON_PAGE } from '../../const/const';

export default {
  components: {
    CardGrid,
    SearchMapArea,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    dataGrid: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showCardsOrMap: false, // cards: false, map: true
      mapShownForTheFirstTime: false,
      meta: {},
      COUNT_ELEMENTS_ON_PAGE,
    };
  },
  head() {
    const stable = 'ПЛЯЖИ.РУ';
    return {
      title: this.meta.title || stable,
      meta: [
        {
          hid: 'description-beach',
          name: 'description',
          content: this.meta.description || stable,
        },
        { hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable },
      ],
    };
  },
  computed: {
    ...mapGetters('catalog', {
      perPage: 'getPerPage',
    }),
  },

  async created() {
    await this.$axios.$get(`seo/meta?url=${this.$route.fullPath}`).then((res) => {
      this.meta = res.data;
    });
    this.setType(this.type);
    this.setQuery(this.$router.currentRoute.query);
  },

  methods: {
    ...mapMutations('catalog', [
      'setType',
      'setQuery',
    ]),
    ...mapActions('catalog', [
      'setPopularBeaches',
    ]),

    showMap() {
      this.showCardsOrMap = true;
      if (!this.mapShownForTheFirstTime) {
        this.mapShownForTheFirstTime = true;
        this.$bus.$emit('updateScrollbar');
      }
    },
  },
};
</script>
