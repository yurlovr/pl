export const state = () => ({
    allBeaches: [],
    popularBeaches: [],
    cities: [],
    events: [],
    dynamicSlider: [],
    weather: [],
    beachTypes: {},
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_POPULAR_BEACH: (state, payload) => {
       state.popularBeaches = payload;
    },

    SET_ALL_BEACHES: (state, payload) => {
       state.allBeaches = payload;
    },

    SET_CITIES: (state, payload) => {
        state.cities = payload;
    },

    SET_EVENTS: (state, payload) => {
        state.events = payload;
    },

    SET_DYNAMIC_SLIDER: (state, payload) => {
        state.dynamicSlider = payload;
    },

    SET_WEATHER: (state, payload) => {
        state.weather = payload;
    },

    SET_CITY_BEACH_TYPE: (state, payload) => {
        state.beachTypes.city = payload;
    },

    SET_WILD_BEACH_TYPE: (state, payload) => {
        state.beachTypes.wild = payload;
    }
}

export const actions = {
    async getPopularBeaches({commit}) {
        commit('SET_ALL_BEACHES', await this.$axios.$get('/beach/list'));
        commit('SET_POPULAR_BEACH', await this.$axios.$get('/beach/top?count=10'));
    },

    async getCities({commit}) {
        commit('SET_CITIES', await this.$axios.$get('/city/list'));
    },

    async getEvents({commit}) {
        commit('SET_EVENTS', await this.$axios.$get('/event/list'));
    },

    async getDynamicSlider({commit}) {
        commit('SET_DYNAMIC_SLIDER', await this.$axios.$get('/collection/list'));
    },

    async getWeather({commit}) {
        commit('SET_WEATHER', await this.$axios.$get('/weather/list'));
    },

    async getBeachTypes({commit}) {
        commit('SET_CITY_BEACH_TYPE', await this.$axios.$get('/search/filter?tags%5B%5D=14'));
        commit('SET_WILD_BEACH_TYPE', await this.$axios.$get('/search/filter?tags%5B%5D=15'));
    }
}

export const getters = {
    popularBeachesData: (state) => {
        if (!state.popularBeaches.data || !state.allBeaches.data) return null;

        let ret = {
        	title: 'Самые популярные пляжи',
            subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
            beachNumber: state.allBeaches.data.list.length,
            beachSliderData: {
                slideNumber: 4,
                cardData: []
            }
    	}

        // adding formatted beaches
        for (let i = 0; i < state.popularBeaches.data.list.length; i++) {
            ret.beachSliderData.cardData.push({
                temperature: state.popularBeaches.data.list[i].TEMP.WATER,
                favorite: false,
                paid: state.popularBeaches.data.list[i].PAID,
                rating: parseFloat(state.popularBeaches.data.list[i].AVERAGE_RATING),
                title: state.popularBeaches.data.list[i].NAME,
                location: state.popularBeaches.data.list[i].CITY.NAME,
                pic: state.api + state.popularBeaches.data.list[i].PHOTOS[0],
                mainLink: `beach/${state.popularBeaches.data.list[i].ID}`,
                beachLink: `beach/${state.popularBeaches.data.list[i].ID}`
            });
        }

    	return ret;
    },

    citiesData: (state) => {
        if (!state.cities.data) return null;

        let ret = [];

        for (let i = 0; i < state.cities.data.list.length; i++) {
            ret.push({
                city: state.cities.data.list[i].NAME,
                beachNumber: state.cities.data.list[i].COUNT_BEACHES,
                pic: state.cities.data.list[i].PREVIEW_PICTURE ? state.api + state.cities.data.list[i].PREVIEW_PICTURE : null
            });
        }

        return ret;
    },

    eventsData: (state) => {
        if (!state.events.data) return null;

        let ret = {
            title: 'Ближайшие мероприятия на пляжах',
            beachNumber: state.events.data.list.length,
            beachSliderData: {
                slideNumber: 4,
                cardData: []
            }
        }

        // adding formatted events
        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.beachSliderData.cardData.push({
                temperature: state.events.data.list[i].BEACH.TEMP.WATER,
                favorite: false,
                paid: state.events.data.list[i].PAID,
                date: `${state.events.data.list[i].ACTIVE_FROM} - ${state.events.data.list[i].ACTIVE_TO}`,
                title: state.events.data.list[i].NAME,
                beach: state.events.data.list[i].BEACH.NAME,
                location: state.events.data.list[i].BEACH.CITY.NAME,
                pic: state.api + state.events.data.list[i].PHOTOS[0],
                mainLink: `event/${state.events.data.list[i].ID}`,
                beachLink: `beach/${state.events.data.list[i].BEACH.ID}`
            });
        }

        return ret;
    },

    dynamicSliderData: (state) => {
        if (!state.dynamicSlider.data) return null;

        let ret = [];

        for (let i = 0; i < state.dynamicSlider.data.list.length; i++) {
            ret.push({
                // TODO
                title: state.dynamicSlider.data.list[i],
                beachNumber: state.dynamicSlider.data.list[i],
                pic: state.dynamicSlider.data.list[i]
            });
        }

        return ret;
    },

    weatherData: (state) => {
        if (!state.weather.data) return null;

        let ret = [];

        for (let i = 0; i < state.weather.data.list.length; i++) {
            ret.push([]);
            for (let j = 0; j < state.weather.data.list[i].TEMP.AIR.length; j++) {
                ret[i].push({
                    city: state.weather.data.list[i].CITY,
                    airTemperature: state.weather.data.list[i].TEMP.AIR,
                    waterTemperature: state.weather.data.list[i].TEMP.WATER,
                    pic: state.weather.data.list[i].CITY.PREVIEW_PICTURE
                });
            }
        }

        return ret;
    },

    beachTypeData: (state) => {
        if (!state.beachTypes.city.data || !state.beachTypes.wild.data) return null;

        let ret = {
            beachNumber1: state.beachTypes.city.data.list.length,
            beachNumber2: state.beachTypes.wild.data.list.length
        };

        return ret;
    }
}
