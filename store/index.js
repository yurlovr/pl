export const state = () => ({
	beaches: [],
    events: [],
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_ALL_BEACHES: (state, payload) => {
        state.beaches = payload;
    },

    SET_ALL_EVENTS: (state, payload) => {
        state.events = payload;
    }
}

export const actions = {
	async nuxtServerInit({commit}) {
		commit('SET_ALL_BEACHES', await this.$axios.$get('/beach/list?count=9999'));
        commit('SET_ALL_EVENTS', await this.$axios.$get('/event/list?count=9999'));
        commit('search/SET_SEARCH', await this.$axios.$get('search/config'));
	}
}

export const getters = {
    beachIds: (state) => {
        if (!state.beaches.data) return [];

        let ret = [];

        for (let i = 0; i < state.beaches.data.list.length; i++) {
            ret.push(state.beaches.data.list[i].ID);
        }

        return ret;
    },

    eventIds: (state) => {
        if (!state.events.data) return [];

        let ret = [];

        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.push(state.events.data.list[i].ID);
        }

        return ret;
    },

    beaches: (state) => {
        if (!state.beaches.data) return [];

        let ret = [];

        for (let i = 0; i < state.beaches.data.list.length; i++) {
            ret.push({
                tempWater: state.beaches.data.list[i].WEATHER && state.beaches.data.list[i].WEATHER.TEMP ? state.beaches.data.list[i].WEATHER.TEMP.WATER : null,
                showFavorite: true,
                paid: state.beaches.data.list[i].PAID,
                rating: parseFloat(state.beaches.data.list[i].AVERAGE_RATING),
                title: state.beaches.data.list[i].NAME,
                location: state.beaches.data.list[i].CITY ? state.beaches.data.list[i].CITY.NAME : null,
                pic: state.beaches.data.list[i].PHOTOS ? state.api + state.beaches.data.list[i].PHOTOS[0] : null,
                mainLink: `beach/${state.beaches.data.list[i].ID}`,
                beachLink: `beach/${state.beaches.data.list[i].ID}`,
                locationId: state.beaches.data.list[i].CITY ? state.beaches.data.list[i].CITY.ID : null,
                beachId: state.beaches.data.list[i].ID,
                tags: state.beaches.data.list[i].TAGS ? state.beaches.data.list[i].TAGS.map(v => {
                    return {
                        id: v.ID,
                        title: v.NAME
                    }
                }) : null,
                addTags: state.beaches.data.list[i].ADD_TAGS ? state.beaches.data.list[i].ADD_TAGS.map(v => {
                    return {
                        id: v.ID,
                        title: v.NAME
                    }
                }) : null,
            });
        }

        return ret;
    },

    events: (state) => {
        if (!state.events.data) return [];

        let ret = [];

        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.push({
                tempWater: state.events.data.list[i].BEACH && state.events.data.list[i].BEACH.WEATHER && state.events.data.list[i].BEACH.WEATHER.TEMP ? state.events.data.list[i].BEACH.WEATHER.TEMP.WATER : null,
                date: state.events.data.list[i].ACTIVE_FROM,
                showFavorite: true,
                beach: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.NAME : null,
                paid: state.events.data.list[i].PAID,
                title: state.events.data.list[i].NAME,
                location: state.events.data.list[i].BEACH && state.events.data.list[i].BEACH.CITY ? state.events.data.list[i].BEACH.CITY.NAME : null,
                pic: state.events.data.list[i].PHOTOS ? state.api + state.events.data.list[i].PHOTOS[0] : null,
                mainLink: `event/${state.events.data.list[i].ID}`,
                beachLink: state.events.data.list[i].BEACH ? `beach/${state.events.data.list[i].BEACH.ID}` : null,
                locationId: state.events.data.list[i].BEACH && state.events.data.list[i].BEACH.CITY ? state.events.data.list[i].BEACH.CITY.ID : null,
                eventId: state.events.data.list[i].ID,
                beachId: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.ID : null
            });
        }

        return ret;
    }
}
