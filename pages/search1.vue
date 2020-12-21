<template>
  <div class="search-page custom-page">
    <div class="search-page__title-area custom-container">
      <h3 class="main-page__section-title">
        Результаты поиска
      </h3>
      <div
        v-if="getSearch"
        class="search-page__title-area__buttons"
      >
        <button
          class="search-page__title-area__button"
          :class="{ active: modeOption === 'list' }"
          @click="showHorizontal()"
        >
          <img
            v-show="modeOption === 'list'"
            src="~/static/pics/search/list_orange.svg"
            alt="Вид: Горизонтальные карточки"
          >

          <img
            v-show="modeOption !== 'list'"
            src="~/static/pics/search/list_grey.svg"
            alt="Вид: Горизонтальные карточки"
          >
        </button>
        <button
          class="search-page__title-area__button"
          :class="{ active: modeOption === 'card' }"
          @click="showCards()"
        >
          <img
            v-show="modeOption === 'card'"
            src="~/static/pics/search/cards_orange.svg"
            alt="Вид: Карточки"
          >
          <img
            v-show="modeOption !== 'card'"
            src="~/static/pics/search/cards_gray.svg"
            alt="Вид: Карточки"
          >
        </button>
        <!-- <button
          v-if="showBeachesOrEvents === false"
          class="search-page__title-area__button"
          :class="{ active: modeOption === 'map' }"
          @click="showMap()"
        >
          <img
            v-show="modeOption === 'map'"
            src="~/static/pics/search/map_orange.svg"
            alt="Вид: Карта"
          >
          <img
            v-show="modeOption !== 'map'"
            src="~/static/pics/search/map_gray.svg"
            alt="Вид: Карта"
          >
        </button> -->
      </div>
    </div>
    <SearchTags />
    <!-- <div
      v-show="searchPageResultEventBackup.data && searchPageResultEventBackup.data.list.length > 0"
      class="favorites-page__favorites-types custom-container"
    >
      <button
        class="favorites-page__favorites-type"
        :class="{ active: !showBeachesOrEvents }"
        @click="showOnlyBeaches()"
      >
        Пляжи
      </button>
      <button
        class="favorites-page__favorites-type"
        :class="{ active: showBeachesOrEvents }"
        @click="showOnlyEvents()"
      >
        Мероприятия
      </button>
    </div> -->
    <div
      v-if="!getSearch"
      class="custom-container search-page__empty"
    >
      <NoSearchResult />
    </div>
    <CardGrid
      v-show="modeOption === 'card'"
      v-if="getSearch"
      :per-page="COUNT_ELEMENTS_BEACH"
      :data="getSearch"
    />
    <search-horizontal-view
      v-show="modeOption === 'list'"
      v-if="getSearch"
      :per-page="COUNT_ELEMENTS_BEACH"
      :data="getSearch"
    />
    <!-- <SearchMapArea
      v-show="mode_option == 'map'"
      v-if="getSearchResult && getSearchResult.length > 1"
      :data="getSearchResult.slice(0, -1)"
      :map-data="mapEntity"
    /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchTags from '~/components/pages/search/SearchTags';
import SearchMapArea from '~/components/pages/search/SearchMapArea';
import CardGrid from '~/components/global/CardGrid';
import NoSearchResult from '~/components/global/NoSearchResult';
import SearchHorizontalView from '~/components/pages/search/SearchHorizontalView';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  components: {
    SearchHorizontalView,
    SearchTags,
    CardGrid,
    SearchMapArea,
    NoSearchResult,
  },

  beforeRouteLeave(to, from, next) {
    this.setSeach(null);
    this.setTags(null);
    next();
  },

  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(`seo/meta?url=${route.fullPath}`);
    return {
      meta: data,
    };
  },

  data() {
    return {
      showHorizontalView: true,
      showCardsOrMap: false, // cards: false, map: true
      mapShownForTheFirstTime: false,
      wait: false,
      showBeachesOrEvents: false, // beaches: false, events: true,
      last_coordinates: this.$cookies.get('last_coordinates') || {},
      geo_locating: this.$cookies.get('geo_locating') || -1,
      COUNT_ELEMENTS_BEACH,
    };
  },

  async fetch({ store, route }) {
    const { query } = route;
    if (!store.getters['search/getSearch']
      || (store.getters['search/getSearch']
        && store.getters['search/getSearch'].pagination.page !== +query.page)) {
      await store.dispatch('search/setSeach', query);
      store.dispatch('search/setTags', { ...query });
    }
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
    ...mapGetters('search', {
      getSearch: 'getSearch',
      getRadiusIfCityExists: 'getRadiusIfCityExists',
      tags: 'getTags',
    }),
    ...mapGetters([
      'getTypeDisplay',
    ]),
    // ...mapState('search', [
    //   'searchParams',
    //   'searchPageResultEventBackup',
    //   'query',
    //   'f_loaded',
    // ]),

    modeOption: {
      get() {
        return this.getTypeDisplay;
      },
      set(value) {
        this.setTypeDisplay(value);
      },
    },

    radius() {
      return this.$route.query && this.$route.query.diameter ? this.$route.query.diameter : null;
    },
  },

  watchQuery: ['typeBeach', 'page', 'count'],

  // watch: {
  //   query(n, o) {
  //     if (n != o && !this.wait) {
  //       this.updateTags(n);
  //       this.$bus.$emit('updateMap');
  //     }
  //   },

  //   getSearchResult(n, o) {
  //     this.$bus.$emit('updateMap', n);
  //   },
  // },

  // created() {
  //   if (this.updateQuery()) return;

  //   this.wait = true;
  //   this.updateTags();

  //   if (this.tags.length > 0) {
  //     this.search([this.last_coordinates, this.geo_locating]);
  //   }
  //   setTimeout(() => {
  //     this.wait = false;
  //   }, 10);
  // },

  methods: {
    // ...mapMutations('search', ['updateSearchParam', 'updateInput', 'showBeaches', 'showEvents']),
    ...mapActions('search', [
      'search',
      'searchQuery',
      'setSeach',
      'setTags',
    ]),
    ...mapActions([
      'setTypeDisplay'
    ]),
    showHorizontal() {
      this.modeOption = 'list';
    },
    showCards() {
      this.modeOption = 'card';
    },

    // showMap() {
    //   this.mode_option = 'map';
    //   if (!this.mapShownForTheFirstTime) {
    //     this.mapShownForTheFirstTime = true;
    //     this.$bus.$emit('updateScrollbar');
    //   }
    // },

    showOnlyBeaches() {
      console.log('showOnlyBeaches');
      // this.showBeachesOrEvents = false;
      // this.showBeaches();
    },

    showOnlyEvents() {
      console.log('showOnlyEvents');
      // this.mode_option = 'card';
      // this.showBeachesOrEvents = true;
      // this.showEvents();
    },

    // updateQuery() {
    //   this.updateInput(this.$route.query.q || '');
    //   this.searchQuery([this.last_coordinates, this.geo_locating]);
    // },
  },
};
</script>
