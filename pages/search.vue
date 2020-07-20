<template>
  <div class="search-page custom-page">
    <div class="search-page__title-area custom-container">
      <h3 class="main-page__section-title">Результаты поиска {{radius ? `(в радиусе
        ${radius} км)`: ''}}</h3>
      <div class="search-page__title-area__buttons" v-if="getSearchResult && getSearchResult.length > 1">
        <button class="search-page__title-area__button" :class="{ active: !showCardsOrMap }"
                @click="showCardsOrMap = false">
          <img src="~/static/pics/search/cards_orange.svg" alt="Вид: Карточки" v-show="!showCardsOrMap">
          <img src="~/static/pics/search/cards_gray.svg" alt="Вид: Карточки" v-show="showCardsOrMap">
        </button>
        <button class="search-page__title-area__button" :class="{ active: showCardsOrMap }" @click="showMap()"
                v-if="showBeachesOrEvents == false">
          <img src="~/static/pics/search/map_orange.svg" alt="Вид: Карта" v-show="showCardsOrMap">
          <img src="~/static/pics/search/map_gray.svg" alt="Вид: Карта" v-show="!showCardsOrMap">
        </button>
      </div>
    </div>
    <SearchTags :tags="tags" v-if="tags.length > 0"/>
    <div class="favorites-page__favorites-types custom-container"
         v-show="searchPageResultEventBackup.data && searchPageResultEventBackup.data.list.length > 0">
      <button class="favorites-page__favorites-type" @click="showOnlyBeaches()"
              :class="{ active: !showBeachesOrEvents }">
        Пляжи
      </button>
      <button class="favorites-page__favorites-type" @click="showOnlyEvents()" :class="{ active: showBeachesOrEvents }">
        Мероприятия
      </button>
    </div>
    <div class="custom-container search-page__empty" v-if="!getSearchResult || getSearchResult.length <= 1">
      <div class="favorites-page__visited-empty">К сожалению по Вашему запросу ничего не найдено.<br>Попробуйте изменить
        запрос, или начните <a href="/" @click.prevent="$bus.goTo('/', $router)">сначала</a></div>
    </div>
    <CardGrid :perPage="20" :data="getSearchResult.slice(0, -1)" v-show="!showCardsOrMap"
              v-if="getSearchResult && getSearchResult.length > 1"/>
    <SearchMapArea :data="getSearchResult.slice(0, -1)" :mapData="mapEntity" v-show="showCardsOrMap"
                   v-if="getSearchResult && getSearchResult.length > 1"/>
  </div>
</template>

<script>
  import SearchTags from '~/components/pages/search/SearchTags';
  import SearchMapArea from '~/components/pages/search/SearchMapArea';
  import CardGrid from '~/components/global/CardGrid';

  import {mapGetters, mapMutations, mapState, mapActions} from 'vuex';

  export default {
    name: 'main-search',
    components: {
      SearchTags,
      CardGrid,
      SearchMapArea
    },

    computed: {
      ...mapGetters('search', ['getSearchResult', 'getRadiusIfCityExists']),
      ...mapState('search', ['searchParams', 'searchPageResultEventBackup', 'query']),
      ...mapGetters(['mapEntity']),

      radius() {
        return this.$route.query && this.$route.query.diameter ? this.$route.query.diameter : null;
      }
    },

    watch: {
      query: function (n, o) {
        if (n != o && !this.wait) {
          this.updateTags(n);
          this.$bus.$emit('updateMap');
        }
      },

      getSearchResult: function (n, o) {
        this.$bus.$emit('updateMap', n);
      }
    },

    head() {
      const stable = 'ПЛЯЖИ.РУ'
      return {
        title: this.meta.title || stable,
        meta: [
          {
            hid: 'description-beach',
            name: 'description',
            content: this.meta.description || stable
          },
          {hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable},
        ]
      }
    },

    data() {
      return {
        showCardsOrMap: false, // cards: false, map: true
        mapShownForTheFirstTime: false,
        tags: [],
        wait: false,
        showBeachesOrEvents: false, // beaches: false, events: true,
        last_coordinates: this.$cookies.get('last_coordinates') || {},
        geo_locating: this.$cookies.get('geo_locating') || -1,
        meta: {}
      }
    },

    async created() {
      await this.$axios.$get('seo/meta?url=' + this.$route.fullPath).then(res => {
        this.meta = res.data
      })
    },

    mounted() {
      if (this.updateQuery()) return;

      this.wait = true;
      this.updateTags();

      if (this.tags.length > 0) {
        this.search([this.last_coordinates, this.geo_locating]);
      }
      setTimeout(() => {
        this.wait = false
      }, 10);
    },

    methods: {
      ...mapMutations('search', ['updateSearchParam', 'updateInput', 'showBeaches', 'showEvents']),
      ...mapActions('search', ['search', 'searchQuery']),


      showMap() {
        this.showCardsOrMap = true;
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
        this.showCardsOrMap = false;
        this.showBeachesOrEvents = true;
        this.showEvents();
      },

      updateQuery() {
        let p = this.$nuxt.$route.fullPath,
          query = decodeURIComponent(p.replace('/search', '').replace('/', '').replace('?', '').replace('q=', '')).split('&');

        if (!p.includes('?q='))
          return false;

        if (query[0].length > 0) {
          // this.updateInput(query[0]);
          this.searchQuery([this.last_coordinates, this.geo_locating]);
        }
      },

      updateTags(path) {
        this.tags = [];
        let p = path == undefined ? this.$nuxt.$route.fullPath : path,
          query = p.replace('/search', '').replace('/', '').replace('?', '').split('&'), curQuery, curValue;
        for (let i = 0; i < query.length; i++) {
          curQuery = query[i].replace('[]', '').replace('%5B%5D', '').split('=');
          if (curQuery[0] == 'city') {
            curValue = this.searchParams.selects.cities.options.find(v => v.id === curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'cities',
              value: curValue,
              default: this.searchParams.selects.cities.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'cities', value: curValue});
          } else if (curQuery[0] == 'typeBeach') {
            curValue = this.searchParams.selects.beachTypes.options.find(v => v.id === curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'beachTypes',
              value: curValue,
              default: this.searchParams.selects.beachTypes.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'beachTypes', value: curValue})
          } else if (curQuery[0] == 'mode') {
            curValue = this.searchParams.selects.modes.options.find(v => v.id === curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'modes',
              value: curValue,
              default: this.searchParams.selects.modes.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'modes', value: curValue})
          } else if (curQuery[0] == 'paid') {
            curValue = this.searchParams.selects.price.options.find(v => v.id === curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'price',
              value: curValue,
              default: this.searchParams.selects.price.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'price', value: curValue})
          } else if (curQuery[0] == 'lengthFrom') {
            curValue = this.searchParams.selects.searchBeachLengthFrom.options.find(v => v.id == curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'searchBeachLengthFrom',
              value: {title: `Протяженность линии от: ${curValue.title} м`, id: curValue.id},
              default: this.searchParams.selects.searchBeachLengthFrom.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'searchBeachLengthFrom', value: curValue})
          } else if (curQuery[0] == 'lengthTo') {
            curValue = this.searchParams.selects.searchBeachLengthTo.options.find(v => v.id == curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'searchBeachLengthTo',
              value: {title: `Протяженность линии до: ${curValue.title} м`, id: curValue.id},
              default: this.searchParams.selects.searchBeachLengthTo.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'searchBeachLengthTo', value: curValue})
          } else if (curQuery[0] == 'tempFrom') {
            curValue = this.searchParams.selects.searchWaterTempFrom.options.find(v => v.id == curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'searchWaterTempFrom',
              value: {title: `Температура воды от: ${curValue.title} °C`, id: curValue.id},
              default: this.searchParams.selects.searchWaterTempFrom.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'searchWaterTempFrom', value: curValue})
          } else if (curQuery[0] == 'tempTo') {
            curValue = this.searchParams.selects.searchWaterTempTo.options.find(v => v.id == curQuery[1])
            if (!curValue) continue;
            this.tags.push({
              param: 'searchWaterTempTo',
              value: {title: `Температура воды до: ${curValue.title} °C`, id: curValue.id},
              default: this.searchParams.selects.searchWaterTempTo.options[0],
              type: 'select'
            });
            if (path == undefined) this.updateSearchParam({param: 'searchWaterTempTo', value: curValue})
          } else if (curQuery[0] == 'tags' || curQuery[0] == 'addTags' || curQuery[0] == 'services' || curQuery[0] == 'infrastructures') {
            if (curQuery[0] == 'tags')
              curValue = this.searchParams.checkboxes.tags[curQuery[1]];
            else if (curQuery[0] == 'addTags')
              curValue = this.searchParams.checkboxes.addTags[curQuery[1]];
            else if (curQuery[0] == 'services')
              curValue = this.searchParams.checkboxes.services[curQuery[1]];
            else if (curQuery[0] == 'infrastructures')
              curValue = this.searchParams.checkboxes.infrastructures[curQuery[0]];
            if (!curValue) continue;
            this.tags.push({
              id: curValue.id,
              value: {
                bool: curValue.value,
                title: curValue.title
              },
              type: curValue.type
            })
            if (path == undefined) this.updateSearchParam({type: curValue.type, value: true, id: curValue.id})
          }
        }
      }
    }
  }
</script>
