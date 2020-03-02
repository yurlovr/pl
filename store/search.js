export const state = () => ({
    searchInput: '',
    searchParams: {
        selects: {
            cities: {
                default: 'Любой город',
                value: 'Любой город',
                options: []
            },
            beachTypes: {
                default: 'Тип пляжа',
                value: 'Тип пляжа',
                options: []
            },
            modes: {
                default: 'Режим работы',
                value: 'Режим работы',
                options: []
            },
            price: {
                default: 'Стоимость',
                value: 'Стоимость',
                options: []
            },
            searchBeachLengthFrom: {
                default: 'Протяженность линии от, м',
                value: 'Протяженность линии от, м',
                options: []
            },
            searchBeachLengthTo: {
                default: 'До',
                value: 'До',
                options: []
            },
            searchWaterTempFrom: {
                default: 'Температура воды от, °C',
                value: 'Температура воды от, °C',
                options: []
            },
            searchWaterTempTo: {
                default: 'До',
                value: 'До',
                options: []
            }
        },

        checkboxes: {}
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

    updateSearchSelect(state, payload) { // s is for select, v is for value
        state.searchParams[payload.s] = payload.v;
    },

    updateSearchCheckbox(state, payload) { // c is for checkbox, v is for value
        state.searchParams[payload.c] = payload.v;
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

    // TODO
    updateSearchFilter: (state) => {
        // getting the tags
        // PAYLOAD is the GETTER of searchValues, NOT STATE
        state.tags = [];
        state.query = '?';
        

        // cleaning up the last &
        state.query = state.query.slice(0, -1);
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
        if (state.tags.length > 0) {
            commit('SET_SEARCH_RESULT', await this.$axios.$get(`search/filter${state.query}`));
        } else commit('EMPTY_RESULTS');
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
        for (let i = 0; i < state.searchValues.data.cities.length; i++) {
            ret.cityValues.push({
                title: state.searchValues.data.cities[i].NAME,
                id: state.searchValues.data.cities[i].ID
            });
        }

        // adding formatted beach type values
        for (let i = 0; i < state.searchValues.data.beachTypes.length; i++) {
            ret.beachTypeValues.push({
                title: state.searchValues.data.beachTypes[i].NAME,
                id: state.searchValues.data.beachTypes[i].ID
            });
        }

        // adding formatted beach type values
        for (let i = 0; i < state.searchValues.data.modes.length; i++) {
            ret.workScheduleValues.push({
                title: state.searchValues.data.modes[i].NAME,
                id: state.searchValues.data.modes[i].ID
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
