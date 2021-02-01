<template>
  <div
    class="search"
    :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown),
              'dark-bg': paramsShown && !labelId }"
  >
    <div class="search__bar">
      <div
        v-show="searchInputValue"
        class="search__bar__left-search"
        :class="{'pointer-events-none': !searchInputValue}"
      >
        <img
          src="~/static/pics/global/svg/search.svg"
          alt="Поиск"
        >
      </div>
      <input
        ref="searchInput"
        v-model="searchInputValue"
        class="search__bar__input"
        type="text"
        placeholder="Искать пляж"
        :style="{ opacity: (searchInputValue ? 1 : 0.6) }"
      >
      <a
        href="/search"
        class="search__bar__right-search"
        :class="{'pointer-events-none': !searchInputValue}"
        @click.prevent="searchFilter()"
      >
        <img
          v-show="!searchInputValue"
          src="~/static/pics/global/svg/search.svg"
          alt="Поиск"
        >
      </a>
      <button
        v-show="searchInputValue"
        class="search__bar__right-cross"
        @click="clearInput"
      >
        <img
          src="~/static/pics/global/svg/close.svg"
          alt="Убрать"
        >
      </button>
      <div
        v-show="paramsShown"
        v-body-scroll-lock="paramsShown && mobileView"
        class="search__params"
        :class="{ 'not-main' : labelId }"
      >
        <div class="search__params__inner">
          <div class="search__params__title-area--first">
            <h3 class="search__params__title search__params__title--first">
              Параметры поиска
            </h3>
            <!-- <div class="search__params__location">
              <button
                class="search__params__location__button"
                :class="{ active: geoLocating }"
                @click="toggleGeoLocation()"
              >
                <div class="search__params__location__button__toggler" />
              </button>
              <span class="search__params__location__text">
                Мое местоположение
              </span>
            </div> -->
          </div>
          <button
            class="search__params__close"
            @click="toggleParams()"
          >
            <img
              src="~/static/pics/global/svg/close_blue.svg"
              alt="Закрыть"
            >
          </button>
          <form
            class="search__params__form"
            @submit.prevent
          >
            <div class="search__params__part__dropdowns-area">
              <div v-if="searchParams" class="search__params__part__dropdowns-row">
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select
                      :city="true"
                      :value="searchParams.selects.city.value"
                      :param="searchParams.selects.city.param"
                      :class="{ default : searchParams.selects.city.value.id === searchParams.selects.city.options[0].id }"
                      :options="searchParams.selects.city.options"
                    />
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select
                      :value="searchParams.selects.typeBeach.value"
                      :param="searchParams.selects.typeBeach.param"
                      :class="{ default : searchParams.selects.typeBeach.value.id == searchParams.selects.typeBeach.options[0].id }"
                      :options="searchParams.selects.typeBeach.options"
                    />
                  </div>
                </div>
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select
                      :value="searchParams.selects.modes.value"
                      :param="searchParams.selects.modes.param"
                      :class="{ default: searchParams.selects.modes.value.id == searchParams.selects.modes.options[0].id }"
                      :options="searchParams.selects.modes.options"
                    />
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select
                      :value="searchParams.selects.price.value"
                      :param="searchParams.selects.price.param"
                      :class="{ default : searchParams.selects.price.value.id == searchParams.selects.price.options[0].id }"
                      :options="searchParams.selects.price.options"
                    />
                  </div>
                </div>
              </div>
              <div class="search__params__part__dropdowns-row">
                <div
                  class="search__params__part__dropdowns"
                  :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }"
                >
                  <span
                    v-show="searchMobileText || showCorrectSelectText"
                    class="search__params__part__label"
                  >
                    Протяженность линии, метров
                  </span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select
                      :value="searchParams.selects.searchBeachLengthFrom.value"
                      :param="searchParams.selects.searchBeachLengthFrom.param"
                      :class="{ default : searchParams.selects.searchBeachLengthFrom.value.id == searchParams.selects.searchBeachLengthFrom.options[0].id }"
                      :options="searchParams.selects.searchBeachLengthFrom.options"
                      :opposite="searchParams.selects.searchBeachLengthTo"
                    />
                    <c-select
                      :value="searchParams.selects.searchBeachLengthTo.value"
                      :param="searchParams.selects.searchBeachLengthTo.param"
                      :class="{ default : searchParams.selects.searchBeachLengthTo.value.id == searchParams.selects.searchBeachLengthTo.options[0].id }"
                      :options="searchParams.selects.searchBeachLengthTo.options.filter(x => x.title > 0)"
                      :opposite="searchParams.selects.searchBeachLengthFrom"
                    />
                  </div>
                </div>
                <div
                  class="search__params__part__dropdowns"
                  :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }"
                >
                  <span v-show="searchMobileText || showCorrectSelectText" class="search__params__part__label">Температура воды от, &deg;C</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select
                      :value="searchParams.selects.searchWaterTempFrom.value"
                      :param="searchParams.selects.searchWaterTempFrom.param"
                      :class="{ default : searchParams.selects.searchWaterTempFrom.value.id == searchParams.selects.searchWaterTempFrom.options[0].id }"
                      :options="searchParams.selects.searchWaterTempFrom.options"
                      :opposite="searchParams.selects.searchWaterTempTo"
                    />
                    <c-select
                      :value="searchParams.selects.searchWaterTempTo.value"
                      :param="searchParams.selects.searchWaterTempTo.param"
                      :class="{ default : searchParams.selects.searchWaterTempTo.value.id == searchParams.selects.searchWaterTempTo.options[0].id }"
                      :options="searchParams.selects.searchWaterTempTo.options"
                      :opposite="searchParams.selects.searchWaterTempFrom"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--first">
              <CustomCheckbox
                v-for="(cb, i) in Object.values(searchParams.checkboxes.tags)"
                :id="cb.id"
                :key="'tag-' + i"
                class="search__params__part--checkbox"
                :title="cb.title"
                :value="cb.value"
                :type="cb.type"
              />
            </div>
            <div class="search__params__title-area" @click="toggleAddParams()">
              <h3 class="search__params__title">
                Дополнительные параметры
              </h3>
              <img
                src="~/static/pics/global/svg/dropdown.svg"
                :class="{ active : !addParamsShown }"
              >
            </div>
            <div
              v-show="addParamsShown"
              class="search__params__part__checkboxes search__params__part__checkboxes--second"
            >
              <CustomCheckbox
                v-for="(cb, i) in Object.values(searchParams.checkboxes.addTags)"
                :id="cb.id"
                :key="'addTags-' + i"
                class="search__params__part--checkbox"
                :title="cb.title"
                :value="cb.value"
                :type="cb.type"
              />
              <CustomCheckbox
                v-for="(cb, i) in Object.values(searchParams.checkboxes.services)"
                :id="cb.id"
                :key="'services-' + i"
                class="search__params__part--checkbox"
                :title="cb.title"
                :value="cb.value"
                :type="cb.type"
              />

              <!--<CustomCheckbox class="search__params__part&#45;&#45;checkbox"
                              v-for="(cb, i) in Object.values(searchParams.checkboxes.infrastructures)"
                              :key="'infras-' + i" :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type"/>-->
            </div>
            <div class="search__params__apply-area">
              <a
                href="/search"
                class="search__params__apply"
                @click.prevent="searchFilter()"
              >
                <span>Применить</span>
              </a>
              <div class="search__params__apply-area__blank" />
            </div>
          </form>
        </div>
      </div>
      <div
        v-show="searchInputValue && searchInputValue.length >= 3"
        ref="autocomplete"
        class="search__autocomplete"
      >
        <div class="search__autocomplete__inner">
          <span
            v-show="!autocompleteResults.length"
            class="search__autocomplete__empty"
          >
            Ничего не найдено
          </span>
          <a
            v-for="result in autocompleteResults"
            :key="result.link"
            :href="result.link"
            @click.prevent="clickLink(result.link)"
          >
                      <!-- @mouseover="hoverAutocomplete([_key, true])"
            @mouseleave="hoverAutocomplete([_key, false])" -->
            <span v-html="result.title" />
            <span class="orange">
              {{ result.type }}
            </span>
          </a>
        </div>
      </div>
    </div>
    <div
      v-show="paramsShown && mobileView"
      class="dark-bg-inner"
      @click="hideParams()"
    />
    <button class="search__options" @click="toggleParams()">
      <img
        v-show="!paramsShown"
        loading="lazy"
        src="~/static/pics/global/svg/filter.svg"
        alt="Поиск"
      >
      <img
        v-show="paramsShown"
        loading="lazy"
        src="~/static/pics/global/svg/close_blue.svg"
        alt="Закрыть"
      >
    </button>
    <!--    <SearchPopup></SearchPopup>-->
  </div>
</template>

<script>
import {
  mapGetters, mapActions, mapState, mapMutations,
} from 'vuex';
import CustomCheckbox from '~/components/global/CustomCheckbox';
import CustomSelect from '~/components/global/CustomSelect';
import SearchPopup from '~/components/global/search/SearchPopup';

export default {

  components: {
    CustomCheckbox,
    'c-select': CustomSelect,
    SearchPopup,
  },
  // if labelId is given, it means that it's not the slider in the header
  // differentiates IDs for parameters
  props: ['labelId'],

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
      mouseOnAutoComplete: false,

      forceRerenderer: 0,
      geoLocating: false,
    };
  },

  computed: {
    ...mapState('search', [
      'searchInput',
      'autocompleteResults',
      'searchParams',
      'checkboxes',
      'query',
    ]),
    ...mapGetters('search', [
      'paramsShown',
      'getQueryParams',
      'getSearchConfig',
      'getSearchInputValue',
    ]),
    searchInputValue: {
      get() {
        return this.getSearchInputValue;
      },
      set(value) {
        this.setSearchInputValue(value);
      },
    },
  },

  watch: {
    searchInputValue(value) {
      if (value.length) {
        window.addEventListener('keydown', this.pressEscInput);
        window.addEventListener('click', this.clickAnotherPlace);
      } else {
        window.removeEventListener('keydown', this.pressEscInput);
        window.removeEventListener('click', this.clickAnotherPlace);
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.pressEsc);
    window.removeEventListener('click', this.clickAnotherPlace);
    window.removeEventListener('keydown', this.pressEscInput);
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

    this.$bus.$on('search', () => {
      this.searchFilter();
    });
  },

  methods: {
    ...mapActions('search', [
      'search',
      'searchQuery',
      'searchAutocomplete',
      'setSearchConfig',
      'setSeach',
      'setSendRequest',
      'setShowSearch',
      'setSearchInputValue',
    ]),
    ...mapMutations('search', [
      'updateParamsShown',
      'set_coords',
      'set_radius',
    ]),
    toggleMobileShow() {
      this.mobileSearchBarShown = !this.mobileSearchBarShown;
    },
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
      this.setShowSearch(true);
      this.updateParamsShown(true);
      window.addEventListener('keydown', this.pressEsc);
    },

    hideParams() {
      this.updateParamsShown(false);
      this.setShowSearch(false);
    },

    toggleAddParams() {
      this.addParamsShown = !this.addParamsShown;
    },

    async toggleParams() {
      if (this.tempMobileSearchBarShown) {
        this.tempMobileSearchBarShown = false;
        this.$bus.$emit('tempHideHeaderBgAndBar');
      }

      if (this.paramsShown) {
        this.hideParams();
      } else {
        this.showParams();
      }
    },

    async toggleGeoLocation() {
      if (this.geoLocating) {
        this.geoLocating = false;
        this.$cookies.set('geo_locating', -1, {
          maxAge: -1, // remove
        });

        this.$cookies.remove('last_coordinates');
        this.set_coords({});
        this.set_radius(null);
      } else {
        this.geoLocating = true;
        let cityId;
        let my_coords = {};
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const { coords: { latitude, longitude } } = pos;
            my_coords = {
              lat: latitude,
              lng: longitude,
            };
            this.$cookies.set('last_coordinates', JSON.stringify(my_coords), {
              maxAge: 30 * 24 * 60 * 60, // one month
            });
            this.$store.commit('setChoosePosition', true);
            this.$store.commit('setLastUserPos', my_coords);
          }, (err) => {
            this.geoLocating = false;
            alert('Доступ к геолокации отклонён!');
          });
        } else {
          this.geoLocating = false;
          alert('Навигация не поддерживается');
        }
        await this.$axios.$get('geo/item')
          .then((res) => {
            cityId = res.data && res.data.city ? res.data.city.ID : -1;
          })
          .catch((e) => {
            console.error(e);
          });

        this.$cookies.set('geo_locating', cityId, {
          maxAge: 30 * 24 * 60 * 60, // one month
        });
      }

      this.$bus.$emit('show_geo', this.geoLocating);
    },

    searchFilter() {
      const query = `${this.getQueryParams}&page=1&count=12`;
      this.setSeach(null);
      this.setSendRequest(true);
      this.$bus.goTo(`/search${query}`, this.$router);
    },

    clearInput() {
      this.setSearchInputValue('');
    },

    onResize() {
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
    },

    clickLink(link) {
      this.setSearchInputValue('');
      this.$bus.goTo(link, this.$router);
    },
    clickAnotherPlace(event) {
      if (event.target.parentElement !== this.$refs.autocomplete) {
        this.clearInput();
      }
    },
    pressEsc(event) {
      if (event.key === 'Escape') {
        window.removeEventListener('keydown', this.pressEsc);
        this.hideParams();
      }
    },
    pressEscInput(event) {
      if (event.key === 'Escape') {
        this.clearInput();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search__autocomplete a:hover {
  & .orange {
    color: white!important;
  }
}
</style>
