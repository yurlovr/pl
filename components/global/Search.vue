<template>
  <div class="search" :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown), 'dark-bg': paramsShown && !labelId }">
    <div class="search__bar">
      <button class="search__bar__left-search" v-show="searchInput && searchInput.length > 0">
        <img src="~/static/pics/global/svg/search.svg" alt="Поиск">
      </button>
      <input class="search__bar__input" type="text" placeholder="Искать пляж" :value="searchInput" @input="onInput" @blur="showAutocomplete = false" @focus="showAutocomplete = true">
      <a href="/search" class="search__bar__right-search" @click.prevent="searchFilter()">
        <img src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
      </a>
      <button class="search__bar__right-cross" v-show="searchInput && searchInput.length > 0" @click="clearInput">
        <img src="~/static/pics/global/svg/close.svg" alt="Убрать">
      </button>
      <div class="search__params" v-show="paramsShown" v-body-scroll-lock="paramsShown && mobileView" :class="{ 'not-main' : labelId }">
        <div class="search__params__inner">
          <button class="search__params__close" @click="toggleParams()">
            <img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть">
          </button>
          <form class="search__params__form" v-on:submit.prevent>
            <h3 class="search__params__title search__params__title--first">Параметры поиска</h3>
            <div class="search__params__part__dropdowns-area">
              <div class="search__params__part__dropdowns-row" v-if="searchParams">
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select
                    :value="searchParams.selects.cities.value"
                    :param="searchParams.selects.cities.param"
                    :class="{ default : searchParams.selects.cities.value.id == searchParams.selects.cities.options[0].id }"
                    :options="searchParams.selects.cities.options">
                    </c-select>
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select
                    :value="searchParams.selects.beachTypes.value"
                    :param="searchParams.selects.beachTypes.param"
                    :class="{ default : searchParams.selects.beachTypes.value.id == searchParams.selects.beachTypes.options[0].id }"
                    :options="searchParams.selects.beachTypes.options">
                    </c-select>
                  </div>
                </div>
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select
                    :value="searchParams.selects.modes.value"
                    :param="searchParams.selects.modes.param"
                    :class="{ default: searchParams.selects.modes.value.id == searchParams.selects.modes.options[0].id }"
                    :options="searchParams.selects.modes.options"></c-select>
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select
                    :value="searchParams.selects.price.value"
                    :param="searchParams.selects.price.param"
                    :class="{ default : searchParams.selects.price.value.id == searchParams.selects.price.options[0].id }"
                    :options="searchParams.selects.price.options"></c-select>
                  </div>
                </div>
              </div>
              <div class="search__params__part__dropdowns-row">
                <div class="search__params__part__dropdowns" :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
                  <span class="search__params__part__label" v-show="searchMobileText || showCorrectSelectText">Протяженность линии, метров</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select
                      :value="searchParams.selects.searchBeachLengthFrom.value"
                      :param="searchParams.selects.searchBeachLengthFrom.param" 
                      :class="{ default : searchParams.selects.searchBeachLengthFrom.value.id == searchParams.selects.searchBeachLengthFrom.options[0].id }"
                      :options="searchParams.selects.searchBeachLengthFrom.options">
                    </c-select>
                    <c-select
                      :value="searchParams.selects.searchBeachLengthTo.value"
                      :param="searchParams.selects.searchBeachLengthTo.param" 
                      :class="{ default : searchParams.selects.searchBeachLengthTo.value.id == searchParams.selects.searchBeachLengthTo.options[0].id }"
                      :options="searchParams.selects.searchBeachLengthTo.options">
                    </c-select>
                  </div>
                </div>
                <div class="search__params__part__dropdowns" :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
                  <span class="search__params__part__label" v-show="searchMobileText  || showCorrectSelectText">Температура воды от, &deg;C</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select
                      :value="searchParams.selects.searchWaterTempFrom.value"
                      :param="searchParams.selects.searchWaterTempFrom.param"
                      :class="{ default : searchParams.selects.searchWaterTempFrom.value.id == searchParams.selects.searchWaterTempFrom.options[0].id }"
                      :options="searchParams.selects.searchWaterTempFrom.options">
                    </c-select>
                    <c-select
                      :value="searchParams.selects.searchWaterTempTo.value"
                      :param="searchParams.selects.searchWaterTempTo.param"
                      :class="{ default : searchParams.selects.searchWaterTempTo.value.id == searchParams.selects.searchWaterTempTo.options[0].id }"
                      :options="searchParams.selects.searchWaterTempTo.options">
                    </c-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--first">
              <CustomCheckbox class="search__params__part--checkbox" v-for="(cb, i) in Object.values(searchParams.checkboxes.tags)" :key="'tag-' + i" :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type" />
            </div>
            <div class="search__params__title-area" @click="toggleAddParams()">
              <h3 class="search__params__title">Дополнительные параметры</h3>
              <img src="~/static/pics/global/svg/dropdown.svg" :class="{ active : !addParamsShown }">
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--second" v-show="addParamsShown">
              <CustomCheckbox class="search__params__part--checkbox" v-for="(cb, i) in Object.values(searchParams.checkboxes.addTags)" :key="'addTags-' + i" :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type" />
              <CustomCheckbox class="search__params__part--checkbox" v-for="(cb, i) in Object.values(searchParams.checkboxes.services)" :key="'services-' + i" :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type" />
              <CustomCheckbox class="search__params__part--checkbox" v-for="(cb, i) in Object.values(searchParams.checkboxes.infrastructures)" :key="'infras-' + i" :title="cb.title" :value="cb.value" :id="cb.id" :type="cb.type" />
            </div>
            <div class="search__params__apply-area">
              <a href="/search" @click.prevent="searchFilter()" class="search__params__apply"><span>Применить</span></a>
              <div class="search__params__apply-area__blank"></div>
            </div>
          </form>
        </div>
      </div>
      <div class="search__autocomplete" v-show="searchInput && searchInput.length >= 3 && showAutocomplete || searchInput && searchInput.length >= 3 && mouseOnAutoComplete" @mouseover="mouseOnAutoComplete = true" @mouseleave="mouseOnAutoComplete = false">
        <div class="search__autocomplete__inner">
          <span class="search__autocomplete__empty" v-show="autocompleteResults.length == 0">Ничего не найдено</span>
          <a :href="result.link" @click.prevent="$bus.goTo(result.link, $router)" v-for="result in autocompleteResults">
            <span>{{ result.title }}</span>
            <span class="orange">{{ result.type }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="dark-bg-inner" v-show="paramsShown && mobileView" @click="hideParams()"></div>
    <button class="search__options" @click="toggleParams()">
      <img src="~/static/pics/global/svg/filter.svg" alt="Поиск" v-show="!paramsShown">
      <img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть" v-show="paramsShown">
    </button>
  </div>
</template>

<script>
import CustomCheckbox from '~/components/global/CustomCheckbox';
import CustomSelect from '~/components/global/CustomSelect';

import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import { debounce } from '~/helpers/index';

export default {
  // if labelId is given, it means that it's not the slider in the header
  // differentiates IDs for parameters
  props: ['labelId'],

  components: {
    CustomCheckbox,
    'c-select': CustomSelect
  },

  data() {
    return {
      // in the params change От to Протяженность линии от or Температура воды от
      searchMobileText: false,
      // sometimes it is not needed to show the mobile text even its corrected for a small width
      showCorrectSelectText: false,

      // are parameters shown?
      paramsShown: false,
      addParamsShown: false,
      // mobile search bar vars (<= 650px) and temp for it
      mobileSearchBarShown: false,
      tempMobileSearchBarShown: false,

      // mobileView starts from 650px and less
      mobileView: false,

      showAutocomplete: false,
      mouseOnAutoComplete: false,

      forceRerenderer: 0
    };
  },

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();

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

  created() {
    this.getSearch();
  },

  computed: {
    ...mapState('search', ['searchInput']),
    ...mapState('search', ['autocompleteResults']),
    ...mapState('search', ['searchParams']),
    ...mapState('search', ['checkboxes']),
    ...mapState('search', ['query'])
  },

  methods: {
    ...mapActions('search', ['search']),
    ...mapActions('search', ['getSearch']),
    ...mapActions('search', ['searchAutocomplete']),
    ...mapMutations('search', ['updateSearchQuery']),
    ...mapMutations('search', ['updateSearchSecondRowParam']),
    ...mapMutations('search', ['updateInput']),
    ...mapMutations('search', ['updateSearchParam']),
    ...mapMutations('search', ['emptySearchParams']),
    ...mapMutations('search', ['updateSearchInput']),

    showParams() {
      // check, if not the main search (the search in the header) (has labelId), then
      // if the screen size is less than 450px, then open the one in the header by calling an event (temporary)
      if (this.labelId && window.innerWidth <= 450) {
        this.$bus.$emit('tempShowHeaderBgAndBar');
        this.$bus.$emit('tempShowMobileSearchBar');
        setTimeout(() => { this.$bus.$emit('showParams'); }, 1);
        return;
      }

      this.paramsShown = true;
    },

    hideParams() {
      this.paramsShown = false;
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

    searchFilter() {
      // this.hideParams();
      if (this.$nuxt.$route.path == '/search') { // already in the search page
          this.search(); // update results and tags
          this.$bus.goTo(`/search${this.query}`, this.$router, false); // updateQuery
        setTimeout(() => {
          setTimeout(() => {
            this.$bus.goTo(`/search${this.query}`, this.$router, false)
          }, 1);
        }, 1); // updateQuery
      } else {
        this.search();
        setTimeout(() => {
          this.$bus.goTo(`/search${this.query}`, this.$router);
        }, 1);
      }
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
            this.updateSearchSecondRowParam({ title: 'От', param: this.searchParams.selects.searchBeachLengthFrom.param });
          }
          if (this.searchParams.selects.searchWaterTempFrom.options[0].title == 'Температура воды от, °C') {
            this.updateSearchSecondRowParam({ title: 'От', param: this.searchParams.selects.searchWaterTempFrom.param });
          }
        } else {
          if (this.searchParams.selects.searchBeachLengthFrom.options[0].title == 'От') {
            this.updateSearchSecondRowParam({ title: 'Протяженность линии от, м', param: this.searchParams.selects.searchBeachLengthFrom.param });
          }
          if (this.searchParams.selects.searchWaterTempFrom.options[0].title == 'От') {
            this.updateSearchSecondRowParam({ title: 'Температура воды от, °C', param: this.searchParams.selects.searchWaterTempFrom.param });
          }
        }
      }
    },

    autocomplete: debounce(async function() {
      if (this.searchInput && this.searchInput.length >= 3) {
        this.searchAutocomplete();
      }
    }, 250)
  }
}
</script>
