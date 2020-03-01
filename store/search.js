export const state = () => ({
    searchValues: [],
    searchInput: '',
    searchParams: {
        searchCity: 'Любой город',
        searchBeachType: 'Тип пляжа',
        searchWorkSchedule: 'Режим работы',
        searchPrice: 'Стоимость',
        searchBeachLengthFrom: 'Протяженность линии от, м',
        searchBeachLengthTo: 'До',
        searchWaterTempFrom: 'Температура воды от, °C',
        searchWaterTempTo: 'До',

        cbCity: false,
        cbWild: false,
        cbPopularBeaches: false,
        cbActiveRest: false,
        cbFamilyRest: false,
        cbEvents: false,
        cbTransport: false,
        cbInventoryActive: false,
        cbMedic: false,
        cbBarsRestos: false,
        cbShowers: false,
        cbRescuer: false,
        cbParking: false,
        cbInventorySwimming: false,
        cbCleanWater: false,
        cbSecurity: false
    },
    searchPageResult: [],
    autocompleteResults: [],
    tags: [],
    query: '',
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_SEARCH: (state, payload) => {
        state.searchValues = payload;
    },

    SET_SEARCH_RESULT: (state, payload) => {
        state.searchPageResult = payload;
    },

    updateInput(state, payload) {
        state.searchInput = payload;
    },

    updateSearchBeachLengthFrom(state, payload) {
        state.searchParams.searchBeachLengthFrom = payload;
    },

    updateSearchWaterTempFrom(state, payload) {
        state.searchParams.searchWaterTempFrom = payload;
    },

    updateSearchParams(state, payload) { // p is for param, v is for value
        state.searchParams[payload.p] = payload.v;
    },

    updateAutocomplete(state, payload) {
        state.autocompleteResults = [];
        if (payload.list) {
            for (let i = 0; i < payload.list.length; i++) {
                state.autocompleteResults.push({
                    title: payload.list[i].TITLE,
                    type: payload.list[i].TYPE == 'beach' ? 'Пляж' : 'Мероприятие',
                    link: `/${payload.list[i].TYPE}/${payload.list[i].ID}`
                });
            }
        }
    },

    updateSearchFilter: (state, payload) => {
        // getting the tags
        state.tags = [];
        state.query = '?';
        if (state.searchParams.searchCity && state.searchParams.searchCity != 'Любой город') {
            state.tags.push({
                tag: state.searchParams.searchCity,
                default: 'Любой город',
                param: 'searchCity'
            });
            state.query += `city=${parseInt(payload.cityValues.find(city => city.title == state.searchParams.searchCity).id)}&`;
        }
        if (state.searchParams.searchBeachType && state.searchParams.searchBeachType != 'Тип пляжа') {
            state.tags.push({
                tag: state.searchParams.searchBeachType,
                default: 'Тип пляжа',
                param: 'searchBeachType'
            });
            state.query += `typeBeach=${parseInt(payload.beachTypeValues.find(beachType => beachType.title == state.searchParams.searchBeachType).id)}&`;
        }
        if (state.searchParams.searchWorkSchedule && state.searchParams.searchWorkSchedule != 'Режим работы') {
            state.tags.push({
                tag: state.searchParams.searchWorkSchedule,
                default: 'Режим работы',
                param: 'searchWorkSchedule'
            });
            state.query += `mode=${parseInt(payload.workScheduleValues.find(workSchedule => workSchedule.title == state.searchParams.searchWorkSchedule).id)}&`;
        }
        if (state.searchParams.searchPrice && state.searchParams.searchPrice != 'Стоимость') {
            if (state.searchParams.searchPrice == 'Бесплатно') {
                state.tags.push({
                    tag: state.searchParams.searchPrice,
                    default: 'Стоимость',
                    param: 'searchPrice'
                });
                state.query += `paid=false&`;
            } else {
                state.tags.push({
                    tag: state.searchParams.searchPrice,
                    default: 'Стоимость',
                    param: 'searchPrice'
                });
                state.query += `paid=true&`;
            }
        }
        if (state.searchParams.searchBeachLengthFrom && state.searchParams.searchBeachLengthFrom != 'От' && state.searchParams.searchBeachLengthFrom != 'Протяженность линии от, м') {
            state.tags.push({
                tag: state.searchParams.searchBeachLengthFrom,
                default: 'Протяженность линии от, м',
                param: 'searchBeachLengthFrom'
            });
            state.query += `lengthFrom=${parseInt(state.searchParams.searchBeachLengthFrom.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.searchBeachLengthTo && state.searchParams.searchBeachLengthTo != 'До') {
            state.tags.push({
                tag: state.searchParams.searchBeachLengthTo,
                default: 'До',
                param: 'searchBeachLengthTo'
            });
            state.query += `lengthTo=${parseInt(state.searchParams.searchBeachLengthTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.searchWaterTempFrom && state.searchParams.searchWaterTempFrom != 'От' && state.searchParams.searchWaterTempFrom != 'Температура воды от, °C') {
            state.tags.push({
                tag: state.searchParams.searchWaterTempFrom,
                default: 'Температура воды от, °C',
                param: 'searchWaterTempFrom'
            });
            state.query += `tempFrom=${parseInt(state.searchParams.searchWaterTempFrom.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.searchWaterTempTo && state.searchParams.searchWaterTempTo != 'До') {
            state.tags.push({
                tag: state.searchParams.searchWaterTempTo,
                default: 'До',
                param: 'searchWaterTempTo'
            });
            state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbCity == true) {
            state.tags.push({
                tag: 'Городские',
                default: false,
                param: 'cbCity'
            })
            state.query += `tags[]=14&`;
        }
        if (state.searchParams.cbWild == true) {
            state.tags.push({
                tag: 'Дикие',
                default: false,
                param: 'cbWild'
            })
            state.query += `tags[]=15&`;
        }
        if (state.searchParams.cbPopularBeaches == true) {
            state.tags.push({
                tag: 'Популярные',
                default: false,
                param: 'cbPopularBeaches'
            })
            state.query += `tags[]=16&`;
        }
        if (state.searchParams.cbActiveRest == true) {
            state.tags.push({
                tag: 'Активный отдых',
                default: false,
                param: 'cbActiveRest'
            })
            state.query += `tags[]=17&`;
        }
        if (state.searchParams.cbFamilyRest == true) {
            state.tags.push({
                tag: 'Отдых для всей семьи',
                default: false,
                param: 'cbFamilyRest'
            })
            state.query += `tags[]=18&`;
        }
        if (state.searchParams.cbEvents == true) {
            state.tags.push({
                tag: 'Мероприятия',
                default: false,
                param: 'cbEvents'
            })
            state.query += `tags[]=19&`;
        }
        if (state.searchParams.cbTransport == true) {
            state.tags.push({
                tag: 'Остановка общественного транспорта',
                default: false,
                param: 'cbTransport'
            })
            state.query += `infrastructures[]=1768&`;
        }
        if (state.searchParams.cbInventoryActive == true) {
            state.tags.push({
                tag: 'Инвентарь для активного отдыха',
                default: false,
                param: 'cbInventoryActive'
            })
            // state.query += `infrastructures[]=1768&`;
        }
        if (state.searchParams.cbMedic == true) {
            state.tags.push({
                tag: 'Пункт медицинской помощи',
                default: false,
                param: 'cbMedic'
            })
            state.query += `infrastructures[]=1763&`;
        }
        if (state.searchParams.cbBarsRestos == true) {
            state.tags.push({
                tag: 'Бары, рестораны',
                default: false,
                param: 'cbBarsRestos'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbShowers == true) {
            state.tags.push({
                tag: 'Душевые кабины',
                default: false,
                param: 'cbShowers'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbRescuer == true) {
            state.tags.push({
                tag: 'Спасательный пункт',
                default: false,
                param: 'cbRescuer'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbParking == true) {
            state.tags.push({
                tag: 'Парковка',
                default: false,
                param: 'cbParking'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbInventorySwimming == true) {
            state.tags.push({
                tag: 'Инвентарь для плавания',
                default: false,
                param: 'cbInventorySwimming'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbCleanWater == true) {
            state.tags.push({
                tag: 'Чистота воды',
                default: false,
                param: 'cbCleanWater'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }
        if (state.searchParams.cbSecurity == true) {
            state.tags.push({
                tag: 'Безопасность',
                default: false,
                param: 'cbSecurity'
            })
            // state.query += `tempTo=${parseInt(state.searchParams.searchWaterTempTo.match(/\d+/)[0])}&`;
        }

        // cleaning up the last &
        state.query = state.query.slice(0, -1);

        // TODO: make the queries of the checkboxes work
    },

    EMPTY_RESULTS(state) {
        state.searchPageResult = [];
    }
}

export const actions = {
    async getSearch({commit}) {
        commit('SET_SEARCH', await this.$axios.$get('search/config'));
    },

    async search({commit, state}) {
        if (state.tags.length > 0)
            commit('SET_SEARCH_RESULT', await this.$axios.$get(`search/filter${state.query}`));
        else commit('EMPTY_RESULTS');
    },

    async searchAutocomplete({commit, state}) {
        let res = await this.$axios.$get(`https://crimea.air-dev.agency/api/app/search/autocomplete?q=${state.searchInput}`);
        if (res.data) {
            commit('updateAutocomplete', res.data);
        }
    } 
}

export const getters = {
    searchValues: (state) => {
        if (!state.searchValues.data) return null;

        let ret = {
        	cityValues: [{
                title: 'Любой город',
                id: -1
            }],

            beachTypeValues: [{
                title: 'Тип пляжа',
                id: -1
            }],

            workScheduleValues: [{
                title: 'Режим работы',
                id: -1
            }],

            priceValues: ['Стоимость', 'Платно', 'Бесплатно']
    	}

        // adding formatted city values
        for (let i = 0; i < state.searchValues.data.cities.list.length; i++) {
            ret.cityValues.push({
                title: state.searchValues.data.cities.list[i].NAME,
                id: state.searchValues.data.cities.list[i].ID
            });
        }

        // adding formatted beach type values
        for (let i = 0; i < state.searchValues.data.beachTypes.list.length; i++) {
            ret.beachTypeValues.push({
                title: state.searchValues.data.beachTypes.list[i].NAME,
                id: state.searchValues.data.beachTypes.list[i].ID
            });
        }

        // adding formatted beach type values
        for (let i = 0; i < state.searchValues.data.modes.list.length; i++) {
            ret.workScheduleValues.push({
                title: state.searchValues.data.modes.list[i].NAME,
                id: state.searchValues.data.modes.list[i].ID
            });
        }

    	return ret;
    },

    getSearchResult: (state) => {
        if (!state.searchPageResult.data) return null;

        let ret = [];

        // adding formatted beaches
        for (let i = 0; i < state.searchPageResult.data.list.length; i++) {
            ret.push({
                temperature: state.searchPageResult.data.list[i].TEMP.WATER,
                favorite: false,
                paid: state.searchPageResult.data.list[i].PAID,
                rating: parseFloat(state.searchPageResult.data.list[i].AVERAGE_RATING),
                title: state.searchPageResult.data.list[i].NAME,
                location: state.searchPageResult.data.list[i].CITY.NAME,
                pic: state.api + state.searchPageResult.data.list[i].PHOTOS[0],
                mainLink: `beach/${state.searchPageResult.data.list[i].ID}`,
                beachLink: `beach/${state.searchPageResult.data.list[i].ID}`,
                beachLength: state.searchPageResult.data.list[i].PARAMETERS.P_LINE_LENGTH == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_LINE_LENGTH,
                beachPrice: state.searchPageResult.data.list[i].PARAMETERS.P_PRICE == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_PRICE,
                beachType: state.searchPageResult.data.list[i].PARAMETERS.P_BEACH_TYPE ? state.searchPageResult.data.list[i].PARAMETERS.P_BEACH_TYPE.NAME : null,
                beachWorktime: state.searchPageResult.data.list[i].PARAMETERS.P_MODE ? state.searchPageResult.data.list[i].PARAMETERS.P_MODE.NAME : null,
                beachSeabedType: state.searchPageResult.data.list[i].PARAMETERS.P_BOTTOM == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_BOTTOM,
                pos: [parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[0]), parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[1])]
            });
        }

        return ret;
    }
}
