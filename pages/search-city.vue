<template>
  <div class="search-page custom-page">
    <div class="search-page__title-area custom-container">
      <h3 class="main-page__section-title">
        Результаты поиска
      </h3>
      <div
        v-if="getSearchResultCity"
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
        <button
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
        </button>
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
      v-if="!getSearchResultCity.list.length"
      class="custom-container search-page__empty"
    >
      <div class="favorites-page__visited-empty">
        К сожалению по Вашему запросу ничего не найдено.<br>Попробуйте изменить
        запрос, или начните
        <nuxt-link
          :to="'/'"
        >
          сначала
        </nuxt-link>
      </div>
    </div>
    <CardGrid
      v-show="modeOption === 'card'"
      v-if="getSearchResultCity"
      :per-page="COUNT_ELEMENTS_BEACH"
      :data="getSearchResultCity"
    />
    <search-horizontal-view
      v-show="modeOption === 'list'"
      v-if="getSearchResultCity"
      :per-page="COUNT_ELEMENTS_BEACH"
      :data="getSearchResultCity"
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
import {
  mapGetters, mapMutations, mapState, mapActions,
} from 'vuex';
import SearchTags from '~/components/pages/search/SearchTags';
import SearchMapArea from '~/components/pages/search/SearchMapArea';
import CardGrid from '~/components/global/CardGrid';

import SearchHorizontalView from '../components/pages/search/SearchHorizontalView';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  name: 'SearchCity',
  components: {
    SearchHorizontalView,
    SearchTags,
    CardGrid,
    SearchMapArea,
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
      modeOption: 'list',
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
    if (!store.getters['search/getSearchResultCity']
      || (store.getters['search/getSearchResultCity']
        && store.getters['search/getSearchResultCity'].pagination.page !== +query.page
      )
      || (store.getters['search/getSearchResultCity']
        && store.getters['search/getSearchResultCity'].list[0].locationId !== query.city
      )) {
      await store.dispatch('search/setSearchCityQuery', query);
      store.dispatch('search/setTags', { city: query.city });
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
    ...mapGetters('search', [
      'getSearchResultCity',
    ]),
  },

  watchQuery: ['city', 'page', 'count'],

  methods: {
    ...mapActions('search', [
      'setSearchCityQuery',
    ]),

    showHorizontal() {
      this.modeOption = 'list';
    },
    showCards() {
      this.modeOption = 'card';
    },
  },
};
</script>
