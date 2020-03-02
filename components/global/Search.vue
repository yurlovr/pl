<template>
  <div class="search" :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown), 'dark-bg': paramsShown && !labelId }">
    <div class="search__bar">
      <button class="search__bar__left-search" v-show="searchInput.length > 0">
        <img src="~/static/pics/global/svg/search.svg" alt="Поиск">
      </button>
      <input class="search__bar__input" type="text" placeholder="Искать пляж" :value="searchInput" @input="onInput">
      <a href="/search" class="search__bar__right-search" @click.prevent="searchFilter()">
        <img src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
      </a>
      <button class="search__bar__right-cross" v-show="searchInput.length > 0" @click="clearInput">
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
              <div class="search__params__part__dropdowns-row" v-if="searchValues">
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select v-if="searchParams.selects.cities" :value="searchParams.selects.cities.value" :var="searchParams.selects.cities.default" :class="{ default :searchParams.selects.cities.value == searchParams.selects.cities.default }" :options="searchParams.selects.cities.options.map(v => v.value)">
                    </c-select>
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select v-if="searchValues" :value="searchParams.searchBeachType" :var="'searchBeachType'" :class="{ default : searchParams.searchBeachType == 'Тип пляжа' }" :options="searchValues.beachTypeValues.map(v => v.title)">
                    </c-select>
                  </div>
                </div>
                <div class="search__params__part__dropdowns">
                  <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                    <c-select v-if="searchValues" :value="searchParams.searchWorkSchedule" :var="'searchWorkSchedule'" :class="{ default : searchParams.searchWorkSchedule == 'Режим работы' }" :options="searchValues.workScheduleValues.map(v => v.title)"></c-select>
                  </div>
                  <div class="search__params__part--dropdown">
                    <c-select v-if="searchValues" :value="searchParams.searchPrice" :var="'searchPrice'" :class="{ default : searchParams.searchPrice == 'Стоимость' }" :options="searchValues.priceValues"></c-select>
                  </div>
                </div>
              </div>
              <div class="search__params__part__dropdowns-row">
                <div class="search__params__part__dropdowns" :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
                  <span class="search__params__part__label" v-show="searchMobileText && !labelId || showCorrectSelectText">Протяженность линии, метров</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select :value="searchParams.searchBeachLengthFrom" :var="'searchBeachLengthFrom'" :class="{ default : searchParams.searchBeachLengthFrom == 'От' || searchParams.searchBeachLengthFrom == 'Протяженность линии от, м' }" :options="beachLengthFromValues"></c-select>
                    <c-select :value="searchParams.searchBeachLengthTo" :var="'searchBeachLengthTo'" :class="{ default : searchParams.searchBeachLengthTo == 'До' }" :options="beachLengthToValues"></c-select>
                  </div>
                </div>
                <div class="search__params__part__dropdowns" :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
                  <span class="search__params__part__label" v-show="searchMobileText && !labelId || showCorrectSelectText">Температура воды от, &deg;C</span>
                  <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                    <c-select :value="searchParams.searchWaterTempFrom" :var="'searchWaterTempFrom'" :class="{ default : searchParams.searchWaterTempFrom == 'От' || searchParams.searchWaterTempFrom == 'Температура воды от, °C' }" :options="waterTemperatureFromValues"></c-select>
                    <c-select :value="searchParams.searchWaterTempTo" :var="'searchWaterTempTo'" :class="{ default : searchParams.searchWaterTempTo == 'До' }" :options="waterTemperatureToValues"></c-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--first">
              <CustomCheckbox class="search__params__part--checkbox" :label="'Городские'" :value="searchParams.cbCity" :var="'cbCity'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Популярные пляжи'" :value="searchParams.cbPopularBeaches" :var="'cbPopularBeaches'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Активный отдых'" :value="searchParams.cbActiveRest" :var="'cbActiveRest'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Дикие'" :value="searchParams.cbWild" :var="'cbWild'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Отдых для всей семьи'" :value="searchParams.cbFamilyRest" :var="'cbFamilyRest'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Мероприятия'" :value="searchParams.cbEvents" :var="'cbEvents'" />
            </div>
            <div class="search__params__title-area" @click="toggleAddParams()">
              <h3 class="search__params__title">Дополнительные параметры</h3>
              <img src="~/static/pics/global/svg/dropdown.svg" :class="{ active : !addParamsShown }">
            </div>
            <div class="search__params__part__checkboxes search__params__part__checkboxes--second" v-show="addParamsShown">
              <CustomCheckbox class="search__params__part--checkbox" :label="'Остановка общественного<br>транспорта'" :value="searchParams.cbTransport" :var="'cbTransport'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Инвентарь для активного<br>отдыха'" :value="searchParams.cbInventoryActive" :var="'cbInventoryActive'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Пункт медицинской<br>помощи'" :value="searchParams.cbMedic" :var="'cbMedic'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Бары, рестораны'" :value="searchParams.cbBarsRestos" :var="'cbBarsRestos'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Душевые кабины'" :value="searchParams.cbShowers" :var="'cbShowers'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Спасательный пункт'" :value="searchParams.cbRescuer" :var="'cbRescuer'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Парковка'" :value="searchParams.cbParking" :var="'cbParking'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Инвентарь для плавания'" :value="searchParams.cbInventorySwimming" :var="'cbInventorySwimming'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Чистота воды'" :value="searchParams.cbCleanWater" :var="'cbCleanWater'" />
              <CustomCheckbox class="search__params__part--checkbox" :label="'Безопасность'" :value="searchParams.cbSecurity" :var="'cbSecurity'" />
            </div>
            <div class="search__params__apply-area">
              <a href="/search" @click.prevent="searchFilter()" class="search__params__apply"><span>Применить</span></a>
              <div class="search__params__apply-area__blank"></div>
            </div>
          </form>
        </div>
      </div>
      <div class="search__autocomplete" v-show="searchInput.length >= 3">
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

  created() {
    this.getSearch();
  },

  computed: {
    ...mapGetters('search', ['searchValues']),
    ...mapState('search', ['searchInput']),
    ...mapState('search', ['searchParams']),
    ...mapState('search', ['autocompleteResults'])
  },

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

      beachLengthFromValues: [
        `${(this.searchMobileText && !this.labelId || this.showCorrectSelectText) ? 'От' : 'Протяженность линии от, м'}`,
        'Протяженность от, 100 м',
        'Протяженность от, 500 м',
        'Протяженность от, 1500 м'
      ],
      beachLengthToValues: [
        'До',
        '100 м',
        '500 м',
        '1000 м'
      ],
      waterTemperatureFromValues: [
        `${(this.searchMobileText && !this.labelId || this.showCorrectSelectText) ? 'От' : 'Температура воды от, °C'}`,
        'Температура воды от, 23 °C',
        'Температура воды от, 25 °C',
        'Температура воды от, 30 °C'
      ],
      waterTemperatureToValues: [
        'До',
        '23',
        '25',
        '30'
      ]
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

    this.$bus.$on('updateSearchParams', (payload) => {
      this.updateSearchParams(payload);
    });
  },

  methods: {
    ...mapActions('search', ['getSearch']),
    ...mapActions('search', ['search']),
    ...mapActions('search', ['searchAutocomplete']),
    ...mapMutations('search', ['updateSearchFilter']),
    ...mapMutations('search', ['updateSearchBeachLengthFrom']),
    ...mapMutations('search', ['updateSearchWaterTempFrom']),
    ...mapMutations('search', ['updateInput']),
    ...mapMutations('search', ['updateSearchParams']),

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
      this.hideParams();
      this.updateSearchFilter(this.searchValues);
      if (this.$nuxt.$route.name != 'search')
        this.$bus.goTo('/search', this.$router);
      else this.search();
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

      // recalculate the height for the params if they are open
      if (this.paramsShown) {
        this.$el.querySelector('.search__params').style.height = 0;
        setTimeout(() => {
          this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
        }, 1);
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
      if (this.searchMobileText && !this.labelId || this.showCorrectSelectText) {
        if (this.searchParams.searchBeachLengthFrom == 'Протяженность линии от, м') {
          this.updateSearchBeachLengthFrom('От');
        }
        if (this.searchParams.searchWaterTempFrom == 'Температура воды от, °C') {
          this.updateSearchWaterTempFrom('От');
        }
      } else {
        if (this.searchParams.searchBeachLengthFrom == 'От') {
          this.updateSearchBeachLengthFrom('Протяженность линии от, м');
        }
        if (this.searchParams.searchWaterTempFrom == 'От') {
          this.updateSearchWaterTempFrom('Температура воды от, °C');
        }
      }

      this.beachLengthFromValues[0] = this.searchParams.searchBeachLengthFrom;
      this.waterTemperatureFromValues[0] = this.searchParams.searchWaterTempFrom;
    },

    autocomplete: debounce(async function() {
      if (this.searchInput.length >= 3) {
        this.searchAutocomplete();
      }
    }, 250)
  }
}
</script>
