<template>
  <div class="search-page custom-page">
    <div class="search-page__title-area custom-container">
      <h3 class="main-page__section-title">
        Результаты поиска {{ radius ? `(в радиусе
        ${radius} км)`: '' }}
      </h3>
      <div v-if="getSearchResult && getSearchResult.length > 1" class="search-page__title-area__buttons">
        <button
          class="search-page__title-area__button"
          :class="{ active: mode_option == 'list' }"
          @click="showHorizontal()"
        >
          <img
            v-show="mode_option == 'list'"
            src="~/static/pics/search/list_orange.svg"
            alt="Вид: Горизонтальные карточки"
          >

          <img
            v-show="mode_option != 'list'"
            src="~/static/pics/search/list_grey.svg"
            alt="Вид: Горизонтальные карточки"
          >
        </button>
        <button
          class="search-page__title-area__button"
          :class="{ active: mode_option == 'card' }"
          @click="showCards()"
        >
          <img
            v-show="mode_option == 'card'"
            src="~/static/pics/search/cards_orange.svg"
            alt="Вид: Карточки"
          >
          <img
            v-show="mode_option != 'card'"
            src="~/static/pics/search/cards_gray.svg"
            alt="Вид: Карточки"
          >
        </button>
        <button
          v-if="showBeachesOrEvents == false"
          class="search-page__title-area__button"
          :class="{ active: mode_option == 'map' }"
          @click="showMap()"
        >
          <img
            v-show="mode_option == 'map'"
            src="~/static/pics/search/map_orange.svg"
            alt="Вид: Карта"
          >
          <img
            v-show="mode_option != 'map'"
            src="~/static/pics/search/map_gray.svg"
            alt="Вид: Карта"
          >
        </button>
      </div>
    </div>
    <SearchTags v-if=" tags && tags.length > 0" :tags="tags" />
    <div
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
    </div>
    <div v-if="!getSearchResult || getSearchResult.length <= 1" class="custom-container search-page__empty">
      <div v-show="f_loaded" class="favorites-page__visited-empty">
        К сожалению по Вашему запросу ничего не найдено.<br>Попробуйте изменить
        запрос, или начните <a href="/" @click.prevent="$bus.goTo('/', $router)">сначала</a>
      </div>
    </div>
    <CardGrid
      v-show="mode_option == 'card'"
      v-if="getSearchResult && getSearchResult.length > 1"
      :per-page="20"
      :data="getSearchResult.slice(0, -1)"
    />
    <search-horizontal-view
      v-show="mode_option == 'list'"
      v-if="getSearchResult && getSearchResult.length > 1"
      :per-page="20"
      :data="getSearchResult.slice(0, -1)"
    />
    <SearchMapArea
      v-show="mode_option == 'map'"
      v-if="getSearchResult && getSearchResult.length > 1"
      :data="getSearchResult.slice(0, -1)"
      :map-data="mapEntity"
    />
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

export default {
  name: 'MainSearch',
  components: {
    SearchHorizontalView,
    SearchTags,
    CardGrid,
    SearchMapArea,
  },

  computed: {
    ...mapGetters('search', ['getSearchResult', 'getRadiusIfCityExists']),
    ...mapState('search', ['searchParams', 'searchPageResultEventBackup', 'query', 'f_loaded']),
    ...mapGetters(['mapEntity']),

    radius() {
      return this.$route.query && this.$route.query.diameter ? this.$route.query.diameter : null;
    },
  },

  watch: {
    query(n, o) {
      if (n != o && !this.wait) {
        this.updateTags(n);
        this.$bus.$emit('updateMap');
      }
    },

    getSearchResult(n, o) {
      this.$bus.$emit('updateMap', n);
    },
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
      mode_option: 'list',
      showCardsOrMap: false, // cards: false, map: true
      mapShownForTheFirstTime: false,
      tags: [],
      wait: false,
      showBeachesOrEvents: false, // beaches: false, events: true,
      last_coordinates: this.$cookies.get('last_coordinates') || {},
      geo_locating: this.$cookies.get('geo_locating') || -1,
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

  created() {
    if (this.updateQuery()) return;

    this.wait = true;
    this.updateTags();

    if (this.tags.length > 0) {
      this.search([this.last_coordinates, this.geo_locating]);
    }
    setTimeout(() => {
      this.wait = false;
    }, 10);
  },

  methods: {
    ...mapMutations('search', ['updateSearchParam', 'updateInput', 'showBeaches', 'showEvents']),
    ...mapActions('search', ['search', 'searchQuery']),

    showHorizontal() {
      this.mode_option = 'list';
    },
    showCards() {
      this.mode_option = 'card';
    },

    showMap() {
      this.mode_option = 'map';
      if (!this.mapShownForTheFirstTime) {
        this.mapShownForTheFirstTime = true;
        this.$bus.$emit('updateScrollbar');
      }
    },

    showOnlyBeaches() {
      this.showBeachesOrEvents = false;
      this.showBeaches();
    },

    showOnlyEvents() {
      this.mode_option = 'card';
      this.showBeachesOrEvents = true;
      this.showEvents();
    },

    updateQuery() {
      this.updateInput(this.$route.query.q || '');
      this.searchQuery([this.last_coordinates, this.geo_locating]);
    },

    updateTags(path) {
      this.tags = [];
      const p = path == undefined ? this.$nuxt.$route.fullPath : path;
      const query = p.replace('/search', '').replace('/', '').replace('?', '').split('&'); let curQuery; let
        curValue;
      for (let i = 0; i < query.length; i++) {
        curQuery = query[i].replace('[]', '').replace('%5B%5D', '').split('=');
        if (curQuery[0] == 'city') {
          curValue = this.searchParams.selects.cities.options.find((v) => v.id === curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'cities',
            value: curValue,
            default: this.searchParams.selects.cities.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'cities', value: curValue });
        } else if (curQuery[0] == 'typeBeach') {
          curValue = this.searchParams.selects.beachTypes.options.find((v) => v.id === curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'beachTypes',
            value: curValue,
            default: this.searchParams.selects.beachTypes.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'beachTypes', value: curValue });
        } else if (curQuery[0] == 'mode') {
          curValue = this.searchParams.selects.modes.options.find((v) => v.id === curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'modes',
            value: curValue,
            default: this.searchParams.selects.modes.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'modes', value: curValue });
        } else if (curQuery[0] == 'price') {
          curValue = this.searchParams.selects.price.options.find((v) => v.id == curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'price',
            value: curValue,
            default: this.searchParams.selects.price.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'price', value: curValue });
        } else if (curQuery[0] == 'lengthFrom') {
          curValue = this.searchParams.selects.searchBeachLengthFrom.options.find((v) => v.id == curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'searchBeachLengthFrom',
            value: { title: `Протяженность линии от: ${curValue.title} м`, id: curValue.id },
            default: this.searchParams.selects.searchBeachLengthFrom.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'searchBeachLengthFrom', value: curValue });
        } else if (curQuery[0] == 'lengthTo') {
          curValue = this.searchParams.selects.searchBeachLengthTo.options.find((v) => v.id == curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'searchBeachLengthTo',
            value: { title: `Протяженность линии до: ${curValue.title} м`, id: curValue.id },
            default: this.searchParams.selects.searchBeachLengthTo.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'searchBeachLengthTo', value: curValue });
        } else if (curQuery[0] == 'tempFrom') {
          curValue = this.searchParams.selects.searchWaterTempFrom.options.find((v) => v.id == curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'searchWaterTempFrom',
            value: { title: `Температура воды от: ${curValue.title} °C`, id: curValue.id },
            default: this.searchParams.selects.searchWaterTempFrom.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'searchWaterTempFrom', value: curValue });
        } else if (curQuery[0] == 'tempTo') {
          curValue = this.searchParams.selects.searchWaterTempTo.options.find((v) => v.id == curQuery[1]);
          if (!curValue) continue;
          this.tags.push({
            param: 'searchWaterTempTo',
            value: { title: `Температура воды до: ${curValue.title} °C`, id: curValue.id },
            default: this.searchParams.selects.searchWaterTempTo.options[0],
            type: 'select',
          });
          if (path == undefined) this.updateSearchParam({ param: 'searchWaterTempTo', value: curValue });
        } else if (curQuery[0] == 'tags' || curQuery[0] == 'addTags' || curQuery[0] == 'services' || curQuery[0] == 'infrastructures') {
          if (curQuery[0] == 'tags') curValue = this.searchParams.checkboxes.tags[curQuery[1]];
          else if (curQuery[0] == 'addTags') curValue = this.searchParams.checkboxes.addTags[curQuery[1]];
          else if (curQuery[0] == 'services') curValue = this.searchParams.checkboxes.services[curQuery[1]];
          else if (curQuery[0] == 'infrastructures') curValue = this.searchParams.checkboxes.infrastructures[curQuery[0]];
          if (!curValue) continue;
          this.tags.push({
            id: curValue.id,
            value: {
              bool: curValue.value,
              title: curValue.title,
            },
            type: curValue.type,
          });
          if (path == undefined) this.updateSearchParam({ type: curValue.type, value: true, id: curValue.id });
        }
      }
    },
  },
};
</script>
