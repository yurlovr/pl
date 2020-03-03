export const state = () => ({
    searchInput: '',
    searchParams: {
        selects: {
            cities: {
                default: 'Любой город',
                value: 'Любой город',
                param: 'cities',
                id: -1,
                options: [
                    'Любой город'
                ]
            },
            beachTypes: {
                default: 'Тип пляжа',
                value: 'Тип пляжа',
                param: 'beachTypes',
                id: -1,
                options: [
                    'Тип пляжа'
                ]
            },
            modes: {
                default: 'Режим работы',
                value: 'Режим работы',
                param: 'modes',
                id: -1,
                options: [
                    'Режим работы'
                ]
            },
            price: {
                default: 'Стоимость',
                value: 'Стоимость',
                param: 'price',
                id: -1,
                options: [
                    'Стоимость',
                    'Платно',
                    'Бесплатно'
                ]
            },
            searchBeachLengthFrom: {
                value: 'Протяженность линии от, м',
                param: 'searchBeachLengthFrom',
                id: -1,
                options: []
            },
            searchBeachLengthTo: {
                default: 'До',
                value: 'До',
                param: 'searchBeachLengthTo',
                id: -1,
                options: []
            },
            searchWaterTempFrom: {
                value: 'Температура воды от, °C',
                param: 'searchWaterTempFrom',
                id: -1,
                options: []
            },
            searchWaterTempTo: {
                default: 'До',
                value: 'До',
                param: 'searchWaterTempTo',
                id: -1,
                options: []
            }
        },

        checkboxes: []
    },
    searchPageResult: [],
    autocompleteResults: [],
    tags: [],
    query: '',
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_SEARCH: (state, payload) => {
        for (let i = 0; i < payload.data.cities.length; i++) {
            state.searchParams.selects.cities.options.push(payload.data.cities[i].NAME);
        }
        for (let i = 0; i < payload.data.beachTypes.length; i++) {
            state.searchParams.selects.beachTypes.options.push(payload.data.beachTypes[i].NAME);
        }
        for (let i = 0; i < payload.data.modes.length; i++) {
            state.searchParams.selects.modes.options.push(payload.data.modes[i].NAME);
        }
        // for (let i = 0; i < payload.data.tags.length; i++) {
        //     state.searchParams.checkboxes.push({
        //         title: payload.data.tags[i].NAME,
        //         id: parseInt(payload.data.tags[i].ID),
        //         cheched: false
        //     })
        // }
        // for (let i = 0; i < payload.data.addTags.length; i++) {
        //     state.searchParams.checkboxes.push({
        //         title: payload.data.addTags[i].NAME,
        //         id: parseInt(payload.data.addTags[i].ID),
        //         cheched: false
        //     })
        // }
        // for (let i = 0; i < payload.data.services.length; i++) {
        //     state.searchParams.checkboxes.push({
        //         title: payload.data.services[i].NAME,
        //         id: parseInt(payload.data.services[i].ID),
        //         cheched: false
        //     })
        // }
        // for (let i = 0; i < payload.data.infrastructures.length; i++) {
        //     state.searchParams.checkboxes.push({
        //         title: payload.data.infrastructures[i].NAME,
        //         id: parseInt(payload.data.infrastructures[i].ID),
        //         cheched: false
        //     })
        // }
    },

    SET_SEARCH_RESULT: (state, payload) => {
        state.searchPageResult = payload;
    },

    updateInput(state, payload) {
        state.searchInput = payload;
    },

    updateSearchBeachLengthFrom(state, payload) {
        state.searchParams.searchBeachLengthFrom.value = payload;
    },

    updateSearchWaterTempFrom(state, payload) {
        state.searchParams.searchWaterTempFrom.value = payload;
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
            commit('updateSearchFilter');
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
