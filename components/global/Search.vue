<template>
  <div class="search"
       :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown), 'dark-bg': paramsShown && !labelId }">
    <div class="search__bar">
      <button class="search__bar__left-search" v-show="searchInput && searchInput.length > 0" @click="searchCurQuery()"
              :class="{'pointer-events-none': !searchInput.length}">
        <img src="~/static/pics/global/svg/search.svg" alt="Поиск">
      </button>
      <input class="search__bar__input" type="text" :placeholder="showAutocomplete ? '' : 'Искать пляж'"
             :value="searchInput" @input="onInput" @blur="showAutocomplete = false" @focus="showAutocomplete = true"
             @keyup.enter="searchCurQuery()" :style="{ opacity: (searchInput.length > 0 ? 1 : 0.6) }">
      <a href="/search" class="search__bar__right-search" @click.prevent="searchFilter()"
         :class="{'pointer-events-none': !searchInput.length}">
        <img src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
      </a>
      <button class="search__bar__right-cross" v-show="searchInput && searchInput.length > 0" @click="clearInput">
        <img src="~/static/pics/global/svg/close.svg" alt="Убрать">
      </button>
      <div class="search__params" v-show="paramsShown" v-body-scroll-lock="paramsShown && mobileView"
           :class="{ 'not-main' : labelId }">
        <div class="search__params__inner">
          <div class="search__params__title-area--first">
            <h3 class="search__params__title search__params__title--first">Параметры поиска</h3>
            <div class="search__params__location">
              <button class="search__params__location__button" @click="toggleGeoLocation()"
                      :class="{ active: geoLocating }">
                <div class="search__params__location__button__toggler"></div>
              </button>
              <span class="search__params__location__text">Мое местоположение</span>
            </div>
          </div>
          <button class="search__params__close" @click="toggleParams()">
            <img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть">
          </button>
          <form class="search__params__form" v-on:submit.prevent>
            <div class="search__params__part__dropdowns-area">
              <div class="search__params__part__dropdowns-row" v-if="searchParams">
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select :value="searchParams.selects.cities.value" :param="searchParams.selects.cities.param"
                              :class="{ default : searchParams.selects.cities.value.id == searchParams.selects.cities.options[0].id }"
                              :options="searchParams.selects.cities.options">
                    </c-select>
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select :value="searchParams.selects.beachTypes.value"
                              :param="searchParams.selects.beachTypes.param"
                              :class="{ default : searchParams.selects.beachTypes.value.id == searchParams.selects.beachTypes.options[0].id }"
                              :options="searchParams.selects.beachTypes.options">
                    </c-select>
                  </div>
                </div>
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select :value="searchParams.selects.modes.value" :param="searchParams.selects.modes.param"
                              :class="{ default: searchParams.selects.modes.value.id == searchParams.selects.modes.options[0].id }"
                              :options="searchParams.selects.modes.options"></c-select>
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select :value="searchParams.selects.price.value" :param="searchParams.selects.price.param"
                              :class="{ default : searchParams.selects.price.value.id == searchParams.selects.price.options[0].id }"
                              :options="searchParams.selects.price.options"></c-select>
                  </div>
                </div>
              </div>
              <div class="search__params__part__dropdowns-row">
                <div class="search__params__part__dropdowns"
                     :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
                  <span class="search__params__part__label" v-show="searchMobileText || showCorrectSelectText">Протяженность линии, метров</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select :value="searchParams.selects.searchBeachLengthFrom.value"
                              :param="searchParams.selects.searchBeachLengthFrom.param"
                              :class="{ default : searchParams.selects.searchBeachLengthFrom.value.id == searchParams.selects.searchBeachLengthFrom.options[0].id }"
                              :options="searchParams.selects.searchBeachLengthFrom.options"
                              :opposite="searchParams.selects.searchBeachLengthTo">
                    </c-select>
                    <c-select :value="searchParams.selects.searchBeachLengthTo.value"
                              :param="searchParams.selects.searchBeachLengthTo.param"
                              :class="{ default : searchParams.selects.searchBeachLengthTo.value.id == searchParams.selects.searchBeachLengthTo.options[0].id }"
                              :options="searchParams.selects.searchBeachLengthTo.options"
                              :opposite="searchParams.selects.searchBeachLengthFrom">
                    </c-select>
                  </div>
                </div>
                <div class="search__params__part__dropdowns"
                     :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
                  <span class="search__params__part__label" v-show="searchMobileText  || showCorrectSelectText">Температура воды от, &deg;C</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select :value="searchParams.selects.searchWaterTempFrom.value"
                              :param="searchParams.selects.searchWaterTempFrom.param"
                              :class="{ default : searchParams.selects.searchWaterTempFrom.value.id == searchParams.selects.searchWaterTempFrom.options[0].id }"
                              :options="searchParams.selects.searchWaterTempFrom.options"
                              :opposite="searchParams.selects.searchWaterTempTo">
                    </c-select>
                    <c-select :value="searchParams.selects.searchWaterTempTo.value"
                              :param="searchParams.selects.searchWaterTempTo.param"
                              :class="{ default : searchParams.selects.searchWaterTempTo.value.id == searchParams.selects.searchWaterTempTo.options[0].id }"
                              :options="searchParams.selects.searchWaterTempTo.options"
                              :opposite="searchParams.selects.searchWaterTempFrom">
                    </c-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--first">
              <CustomCheckbox class="search__params__part--checkbox"
                              v-for="(cb, i) in Object.values(searchParams.checkboxes.tags)" :key="'tag-' + i"
                              :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type"/>
            </div>
            <div class="search__params__title-area" @click="toggleAddParams()">
              <h3 class="search__params__title">Дополнительные параметры</h3>
              <img src="~/static/pics/global/svg/dropdown.svg" :class="{ active : !addParamsShown }">
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--second"
                 v-show="addParamsShown">
              <CustomCheckbox class="search__params__part--checkbox"
                              v-for="(cb, i) in Object.values(searchParams.checkboxes.addTags)" :key="'addTags-' + i"
                              :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type"/>
              <CustomCheckbox class="search__params__part--checkbox"
                              v-for="(cb, i) in Object.values(searchParams.checkboxes.services)" :key="'services-' + i"
                              :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type"/>

              <!--<CustomCheckbox class="search__params__part&#45;&#45;checkbox"
                              v-for="(cb, i) in Object.values(searchParams.checkboxes.infrastructures)"
                              :key="'infras-' + i" :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type"/>-->
            </div>
            <div class="search__params__apply-area">
              <a href="/search" @click.prevent="searchFilter()" class="search__params__apply"><span>Применить</span></a>
              <div class="search__params__apply-area__blank"></div>
            </div>
          </form>
        </div>
      </div>
      <div class="search__autocomplete"
           v-show="searchInput && searchInput.length >= 1 && showAutocomplete || searchInput && searchInput.length >= 1 && mouseOnAutoComplete"
           @mouseover="mouseOnAutoComplete = true" @mouseleave="mouseOnAutoComplete = false">
        <div class="search__autocomplete__inner">
          <span class="search__autocomplete__empty" v-show="autocompleteResults.length == 0">Ничего не найдено</span>
          <a :href="result.link" @click.prevent="$bus.goTo(result.link, $router)" v-for="(result, _key) in autocompleteResults"
          @mouseover="hoverAutocomplete([_key, true])" @mouseleave="hoverAutocomplete([_key, false])"
          >
            <span>{{ result.title }} {{result}}</span>
            <span :class="[{'autocomplete-line': result.hover}, 'orange']">{{ result.type }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="dark-bg-inner" v-show="paramsShown && mobileView" @click="hideParams()"></div>
    <button class="search__options" @click="toggleParams()">
      <img loading="lazy" src="~/static/pics/global/svg/filter.svg" alt="Поиск" v-show="!paramsShown">
      <img loading="lazy" src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть" v-show="paramsShown">
    </button>
    <!--    <SearchPopup></SearchPopup>-->
  </div>
</template>

<script>
  import CustomCheckbox from '~/components/global/CustomCheckbox';
  import CustomSelect from '~/components/global/CustomSelect';
  import SearchPopup from '~/components/global/search/SearchPopup'

  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex';
  import {debounce} from '~/helpers/index';

  export default {
    // if labelId is given, it means that it's not the slider in the header
    // differentiates IDs for parameters
    props: ['labelId'],

    components: {
      CustomCheckbox,
      'c-select': CustomSelect,
      SearchPopup
    },

    data() {
      return {
        // in the params change От to Протяженность линии от or Температура воды от
        searchMobileText: false,
        // sometimes it is not needed to show the mobile text even its corrected for a small width
        showCorrectSelectText: false,

        // are parameters shown?
        addParamsShown: false,
        // mobile search bar vars (<= 650px) and temp for it
        mobileSearchBarShown: false,
        tempMobileSearchBarShown: false,

        // mobileView starts from 650px and less
        mobileView: false,

        showAutocomplete: false,
        mouseOnAutoComplete: false,

        forceRerenderer: 0,
        geoLocating: false
      };
    },

    mounted() {
      window.addEventListener('resize', this.onResize);
      this.onResize();

      this.$bus.$on('changeToggle', (status) => {
        this.geoLocating = status;
      });


      this.$bus.$on('showCorrectSelectText', () => {
        this.showCorrectSelectText = true;
      });

      this.$bus.$on('dontShowCorrectSelectText', () => {
        this.showCorrectSelectText = false;
      });

      this.$bus.$on('showBgAndBar', () => {
        this.showBgAndBar = true;
      });

      this.$bus.$on('hideBgAndBar', () => {
        this.showBgAndBar = false;
      });

      this.$bus.$on('tempShowMobileSearchBar', () => { // !thisl.labelId means it's the header's search
        if (!this.labelId) {
          this.tempMobileSearchBarShown = true;
        }
      });

      this.$bus.$on('tempHideMobileSearchBar', () => { // !thisl.labelId means it's the header's search
        if (!this.labelId) {
          this.tempMobileSearchBarShown = false;
        }
      });

      // for screens <= 650, the main search will have different design for its bar, so, to show it, another button is clicked
      // and it is caught here
      this.$bus.$on('toggleMobileSearchBar', () => {
        if (this.mobileSearchBarShown)
          this.mobileSearchBarShown = false;
        else this.mobileSearchBarShown = true;
      });

      // when requested to open the header search from elsewhere, this gets called
      // it shows the header and opens the parameters automatically
      // when the params are closed, the script makes sure to hide the header (tempShowHeader = false)
      // (temp because the header itself checks if it should be shown at all depending on the scroll)
      // and hides the search-bar if it was not shown (tempShowSearch = false)
      this.$bus.$on('showParams', () => {
        // only the search in the header can be opened using this event (it has no labelId)
        if (!this.labelId) {
          this.showParams();
        }
      });

      this.$bus.$on('hideParams', () => {
        this.hideParams();
      });

      this.$bus.$on('updateSearchParam', (payload) => {
        this.updateSearchParam(payload);
      });

      this.$bus.$on('search', () => {
        this.searchFilter();
      });

      this.$bus.$on('emptySearchParams', () => {
        this.emptySearchParams();
      });

      this.$bus.$on('updateSearchInput', () => {
        this.updateSearchInput();
      });
    },

    computed: {
      ...mapState('search', ['searchInput', 'autocompleteResults', 'searchParams', 'checkboxes', 'query']),
      ...mapGetters('search', ['paramsShown'])
    },

    methods: {
      ...mapActions('search', ['search', 'searchQuery', 'searchAutocomplete']),
      ...mapMutations('search',
        ['updateSearchQuery', 'updateSearchSecondRowParam', 'updateInput', 'updateSearchParam', 'emptySearchParams',
          'updateSearchInput', 'updateParamsShown', 'set_coords', 'set_radius',
        'hoverAutocomplete']),

      showParams() {
        // check, if not the main search (the search in the header) (has labelId), then
        // if the screen size is less than 650px, then open the one in the header by calling an event
        if (this.labelId && window.innerWidth <= 650) {
          this.$bus.$emit('tempShowHeaderBgAndBar');
          this.$bus.$emit('tempShowMobileSearchBar');
          setTimeout(() => {
            this.$bus.$emit('showParams');
          }, 1);
          return;
        }

        this.updateParamsShown(true);
      },

      hideParams() {
        this.updateParamsShown(false);
      },

      toggleAddParams() {
        this.addParamsShown = !this.addParamsShown;
      },

      toggleParams() {
        if (this.tempMobileSearchBarShown) {
          this.tempMobileSearchBarShown = false;
          this.$bus.$emit('tempHideHeaderBgAndBar');
        }

        if (this.paramsShown)
          this.hideParams();
        else this.showParams();
      },

      async toggleGeoLocation() {
        if (this.geoLocating) {
          this.geoLocating = false;
          this.$cookies.set('geo_locating', -1, {
            maxAge: -1 // remove
          });

          this.$cookies.remove('last_coordinates');
          this.set_coords({})
          this.set_radius(null);
        } else {
          this.geoLocating = true;
          let cityId,
            my_coords = {};
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
              const {coords: {latitude, longitude}} = pos;
              my_coords = {
                lat: latitude,
                lng: longitude
              }
              this.$cookies.set('last_coordinates', JSON.stringify(my_coords), {
                maxAge: 30 * 24 * 60 * 60 // one month
              });
              this.$bus.$emit('position-modal', true, my_coords);
            }, err => {
              this.geoLocating = false;
              alert('Доступ к геолокации отклонён!')
            });
          } else {
            this.geoLocating = false;
            alert('Навигация не поддерживается')
          }
          await this.$axios.$get('geo/item')
            .then(res => {
              cityId = res.data && res.data.city ? res.data.city.ID : -1;
            })
            .catch(e => {
              console.error(e);
            });

          this.$cookies.set('geo_locating', cityId, {
            maxAge: 30 * 24 * 60 * 60 // one month
          });
        }

      },

      searchFilter() {
        if (this.$nuxt.$route.path == '/search') { // already in the search page
          this.search([this.geoLocating ? (this.$cookies.get('last_coordinates') || {}) : {}, this.$cookies.get('geo_locating') || -1]); // update results and tags
          this.$bus.goTo(`/search${this.query}`, this.$router, false); // updateQuery
          setTimeout(() => {
            this.$bus.goTo(`/search${this.query}`, this.$router, false)
          }, 1); // updateQuery
        } else {
          this.search([this.geoLocating ? (this.$cookies.get('last_coordinates') || {}) : {}, this.$cookies.get('geo_locating') || -1]);
          setTimeout(() => {
            this.$bus.goTo(`/search${this.query}`, this.$router);
          }, 1);
        }
      },

      searchCurQuery() {
        document.querySelector('.search__bar__input').blur(); // hide autocomlete
        if (this.autocompleteResults.length == 1) {
          this.$bus.goTo(this.autocompleteResults[0].link, this.$router);
        } else if (this.searchInput != '') {
          if (this.$nuxt.$route.path == '/search') { // already in the search page
            this.searchQuery([this.$cookies.get('last_coordinates') || {}, this.$cookies.get('geo_locating') || -1]); // update results and tags
            this.$bus.goTo(`/search${this.query}`, this.$router, false); // updateQuery
            setTimeout(() => {
              this.$bus.goTo(`/search${this.query}`, this.$router, false)
            }, 1); // updateQuery
          } else {
            this.searchQuery([this.$cookies.get('last_coordinates') || {}, this.$cookies.get('geo_locating') || -1]);
            setTimeout(() => {
              this.$bus.goTo(`/search${this.query}`, this.$router);
            }, 1);
          }
        }
        this.clearInput();
        this.mobileSearchBarShown = false;
      },

      clearInput() {
        this.updateInput('');
      },

      onInput(e) {
        this.updateInput(e.target.value);
        this.autocomplete();
      },

      onResize() {
        // if it's not the main slider and its params are open, and the screen size gets lower than 450, then close its own params
        if (window.innerWidth <= 450 && this.labelId && this.paramsShown) {
          setTimeout(() => {
            this.toggleParams();
          }, 2);
        }

        // turn on mobile view for width lower than 650 ONLY for the header search
        if (window.innerWidth <= 650 && !this.labelId) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }

        // show mobile texts of parameters for width less than 800px (still if showCorrectSelectText is off, then it won't be shown)
        if (window.innerWidth <= 800) {
          this.searchMobileText = true;
        } else {
          this.searchMobileText = false;
        }

        // correcting the params values if they area set to default for different screen width
        if (this.searchParams) {
          if (this.searchMobileText || this.showCorrectSelectText) {
            if (this.searchParams.selects.searchBeachLengthFrom.options[0].title == 'Протяженность линии от, м') {
              this.updateSearchSecondRowParam({
                title: 'От',
                param: this.searchParams.selects.searchBeachLengthFrom.param
              });
            }
            if (this.searchParams.selects.searchWaterTempFrom.options[0].title == 'Температура воды от, °C') {
              this.updateSearchSecondRowParam({
                title: 'От',
                param: this.searchParams.selects.searchWaterTempFrom.param
              });
            }
          } else {
            if (this.searchParams.selects.searchBeachLengthFrom.options[0].title == 'От') {
              this.updateSearchSecondRowParam({
                title: 'Протяженность линии от, м',
                param: this.searchParams.selects.searchBeachLengthFrom.param
              });
            }
            if (this.searchParams.selects.searchWaterTempFrom.options[0].title == 'От') {
              this.updateSearchSecondRowParam({
                title: 'Температура воды от, °C',
                param: this.searchParams.selects.searchWaterTempFrom.param
              });
            }
          }
        }
      },

      autocomplete: debounce(async function () {
        if (this.searchInput && this.searchInput.length >= 1) {
          this.searchAutocomplete([this.$cookies.get('last_coordinates') || {}, this.$cookies.get('geo_locating') || -1]);
        }
      }, 250)
    }
  }
</script>
