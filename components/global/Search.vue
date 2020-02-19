<template>
    <div
        class="search"
        :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown), 'dark-bg': paramsShown && !labelId }"
    >
        <div class="search__bar">
            <button
                class="search__bar__left-search"
                v-show="searchInput.length > 0"
            >
                <img
                    src="~/static/pics/global/svg/search.svg"
                    alt="Поиск"
                >
            </button>
            <input
                class="search__bar__input"
                type="text"
                placeholder="Искать пляж"
                v-model="searchInput"
            >
            <a
                href="/search"
                class="search__bar__right-search"
                @click.prevent="$bus.goTo('/search', $router)"
            >
                <img
                    src="~/static/pics/global/svg/search.svg"
                    alt="Поиск"
                    v-show="searchInput.length == 0"
                >
            </a>
            <button
                class="search__bar__right-cross"
                v-show="searchInput.length > 0"
                @click="searchInput = ''"
            >
                <img
                    src="~/static/pics/global/svg/close.svg"
                    alt="Убрать"
                >
            </button>
            <div
                class="search__params"
                v-show="paramsShown"
                v-body-scroll-lock="paramsShown && mobileView"
                :class="{ 'not-main' : labelId }"
            >
                <div class="search__params__inner">
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
                        v-on:submit.prevent
                    >
                        <h3 class="search__params__title search__params__title--first">Параметры поиска</h3>
                        <div class="search__params__part__dropdowns-area">
                            <div class="search__params__part__dropdowns-row">
                                <div class="search__params__part__dropdowns">
                                    <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="city"
                                                v-model="params.searchCity"
                                                :class="{ default : params.searchCity == 'Любой город' }"
                                                :options="cityValues"
                                            ></v-select>
                                        </client-only>
                                    </div>
                                    <div class="search__params__part--dropdown">
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="beach-type"
                                                v-model="params.searchBeachType"
                                                :class="{ default : params.searchBeachType == 'Тип пляжа' }"
                                                :options="beachTypeValues"
                                            ></v-select>
                                        </client-only>
                                    </div>
                                </div>
                                <div class="search__params__part__dropdowns">
                                    <div class="search__params__part--dropdown search__params__part--dropdown--wider">
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="work-schedule"
                                                v-model="params.searchWorkSchedule"
                                                :class="{ default : params.searchWorkSchedule == 'Режим работы' }"
                                                :options="workScheduleValues"
                                            ></v-select>
                                        </client-only>
                                    </div>
                                    <div class="search__params__part--dropdown">
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="price"
                                                v-model="params.searchPrice"
                                                :class="{ default : params.searchPrice == 'Стоимость' }"
                                                :options="priceValues"
                                            ></v-select>
                                        </client-only>
                                    </div>
                                </div>
                            </div>
                            <div class="search__params__part__dropdowns-row">
                                <div
                                    class="search__params__part__dropdowns"
                                    :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }"
                                >
                                    <span
                                        class="search__params__part__label"
                                        v-show="searchMobileText && !labelId || showCorrectSelectText"
                                    >Протяженность линии, метров</span>
                                    <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="beach-length-from"
                                                v-model="params.searchBeachLengthFrom"
                                                :class="{ default : params.searchBeachLengthFrom == 'От' || params.searchBeachLengthFrom == 'Протяженность линии от, м' }"
                                                :options="beachLengthFromValues"
                                            ></v-select>
                                        </client-only>
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="beach-length-to"
                                                v-model="params.searchBeachLengthTo"
                                                :class="{ default : params.searchBeachLengthTo == 'До' }"
                                                :options="beachLengthToValues"
                                            ></v-select>
                                        </client-only>
                                    </div>
                                </div>
                                <div
                                    class="search__params__part__dropdowns"
                                    :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }"
                                >
                                    <span
                                        class="search__params__part__label"
                                        v-show="searchMobileText && !labelId || showCorrectSelectText"
                                    >Температура воды от, &deg;C</span>
                                    <div class="search__params__part--dropdown search__params__part--dropdown--merged">
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="water-temperature-from"
                                                v-model="params.searchWaterTempFrom"
                                                :class="{ default : params.searchWaterTempFrom == 'От' || params.searchWaterTempFrom == 'Температура воды от, °C' }"
                                                :options="waterTemperatureFromValues"
                                            ></v-select>
                                        </client-only>
                                        <client-only>
                                            <v-select
                                                :components="{OpenIndicator}"
                                                :clearable="false"
                                                :searchable="false"
                                                name="water-temperature-to"
                                                v-model="params.searchWaterTempTo"
                                                :class="{ default : params.searchWaterTempTo == 'До' }"
                                                :options="waterTemperatureToValues"
                                            ></v-select>
                                        </client-only>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="search__params__part__checkboxes search__params__part__checkboxes--first">
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Городские'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Популярные пляжи'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Активный отдых'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Дикие'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Отдых для всей семьи'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Мероприятия'"
                                :checked="false"
                            />
                        </div>
                        <div
                            class="search__params__title-area"
                            @click="toggleAddParams()"
                        >
                            <h3 class="search__params__title">Дополнительные параметры</h3>
                            <img
                                src="~/static/pics/global/svg/dropdown.svg"
                                :class="{ active : !addParamsShown }"
                            >
                        </div>
                        <div
                            class="search__params__part__checkboxes search__params__part__checkboxes--second"
                            v-show="addParamsShown"
                        >
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Остановка общественного<br>транспорта'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Инвентарь для активного<br>отдыха'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Пункт медицинской<br>помощи'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Бары, рестораны'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Душевые кабины'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Спасательный пункт'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Парковка'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Инвентарь для плавания'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Чистота воды'"
                                :checked="false"
                            />
                            <CustomCheckbox
                                class="search__params__part--checkbox"
                                :label="'Безопаснось'"
                                :checked="false"
                            />
                        </div>
                        <div class="search__params__apply-area">
                            <a
                                href="/search"
                                @click.prevent="$bus.goTo('/search', $router)"
                                class="search__params__apply"
                            ><span>Применить</span></a>
                            <div class="search__params__apply-area__blank"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div
            class="dark-bg-inner"
            v-show="paramsShown && mobileView"
            @click="hideParams()"
        ></div>
        <button
            class="search__options"
            @click="toggleParams()"
        >
            <img
                src="~/static/pics/global/svg/filter.svg"
                alt="Поиск"
                v-show="!paramsShown"
            >
            <img
                src="~/static/pics/global/svg/close_blue.svg"
                alt="Закрыть"
                v-show="paramsShown"
            >
        </button>
    </div>
</template>

<script>
import CustomCheckbox from '~/components/global/CustomCheckbox';

export default {
    // if labelId is given, it means that it's not the slider in the header
    // differentiates IDs for parameters
    props: ['labelId'],

    components: {
        CustomCheckbox
    },

    data () {
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

            // all parameters v-model here
            params: {
                searchCity: 'Любой город',
                searchBeachType: 'Тип пляжа',
                searchWorkSchedule: 'Режим работы',
                searchPrice: 'Стоимость',
                searchBeachLengthFrom: 'Протяженность линии от, м',
                searchBeachLengthTo: 'До',
                searchWaterTempFrom: 'Температура воды от, °C',
                searchWaterTempTo: 'До'
            },
            searchInput: "",

            cityValues: [
                'Любой город',
                'Алушта',
                'Камчатка',
                'Москва',
                'Лондон',
                'Париж',
                'Непариж'
            ],
            beachTypeValues: [
                'Тип пляжа',
                'Песчаный',
                'Ракушечный',
                'Каменный',
                'Паркетный',
                'Нормальный'
            ],
            workScheduleValues: [
                'Режим работы',
                '9-6',
                'Когда не работаю',
                'Когда солнечно',
                'Когда закат',
                'Не могу решиться'
            ],
            priceValues: [
                'Стоимость',
                'Платно',
                'Бесплатно'
            ],
            beachLengthFromValues: [
                `${(this.searchMobileText && !this.labelId || this.showCorrectSelectText) ? 'От' : 'Протяженность линии от, м'}`,
                '0',
                '1000',
                '2000'
            ],
            beachLengthToValues: [
                'До',
                '0',
                '1000',
                '2000'
            ],
            waterTemperatureFromValues: [
                `${(this.searchMobileText && !this.labelId || this.showCorrectSelectText) ? 'От' : 'Температура воды от, °C'}`,
                '10',
                '20',
                '30'
            ],
            waterTemperatureToValues: [
                'До',
                '10',
                '20',
                '30'
            ],
            OpenIndicator: {
                render: createElement => createElement('img', {
                    attrs: {
                        src: require('~/static/pics/global/svg/dropdown.svg')
                    }
                })
            }
        };
    },

    mounted () {
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
    },

    methods: {
        showParams () {
            // check, if not the main search (the search in the header) (has labelId), then
            // if the screen size is less than 450px, then open the one in the header by calling an event (temporary)
            if (this.labelId && window.innerWidth <= 450) {
                // document.documentElement.style.overflow = 'hidden';
                // document.addEventListener('touchmove', function(e) { e.preventDefault() }, false);
                // this.$el.querySelector('.search__params').addEventListener('touchmove', function(e) { e.stopPropagation() }, false);
                this.$bus.$emit('tempShowHeaderBgAndBar');
                this.$bus.$emit('tempShowMobileSearchBar');
                setTimeout(() => { this.$bus.$emit('showParams'); }, 1);
                return;
            }

            this.paramsShown = true;
        },

        hideParams () {
            this.paramsShown = false;
        },

        toggleAddParams () {
            this.addParamsShown = !this.addParamsShown;
        },

        toggleParams () {
            if (this.tempMobileSearchBarShown) {
                this.tempMobileSearchBarShown = false;
                this.$bus.$emit('tempHideHeaderBgAndBar');
                // document.documentElement.style.overflow = '';
            }

            if (this.paramsShown)
                this.hideParams();
            else this.showParams();
        },

        onResize () {
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
                if (this.params.searchBeachLengthFrom == 'Протяженность линии от, м') {
                    this.params.searchBeachLengthFrom = 'От';
                }
                if (this.params.searchWaterTempFrom == 'Температура воды от, °C') {
                    this.params.searchWaterTempFrom = 'От';
                }
            } else {
                if (this.params.searchBeachLengthFrom == 'От') {
                    this.params.searchBeachLengthFrom = 'Протяженность линии от, м';
                }
                if (this.params.searchWaterTempFrom == 'От') {
                    this.params.searchWaterTempFrom = 'Температура воды от, °C';
                }
            }

            this.beachLengthFromValues[0] = this.params.searchBeachLengthFrom;
            this.waterTemperatureFromValues[0] = this.params.searchWaterTempFrom;
        }
    }
}
</script>
