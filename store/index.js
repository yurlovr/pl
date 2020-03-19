export const state = () => ({
	announcementData: {
		color: '#FCAB2D',
		date: '12-15 июня',
		title: 'Конкурс надувных матрасов',
		description: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		pic: '/pics/global/pics/announcement.png'
	},
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
		commit('SET_ALL_BEACHES', await this.$axios.$get('/beach/list'));
        commit('SET_ALL_EVENTS', await this.$axios.$get('/event/list'));
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
                tempWater: state.beaches.data.list[i].WEATHER.TEMP.WATER,
                showFavorite: true,
                paid: state.beaches.data.list[i].PAID,
                rating: parseFloat(state.beaches.data.list[i].AVERAGE_RATING),
                title: state.beaches.data.list[i].NAME,
                location: state.beaches.data.list[i].CITY.NAME,
                pic: state.api + state.beaches.data.list[i].PHOTOS[0],
                mainLink: `beach/${state.beaches.data.list[i].ID}`,
                beachLink: `beach/${state.beaches.data.list[i].ID}`,
                locationId: state.beaches.data.list[i].CITY.ID,
                beachId: state.beaches.data.list[i].ID
            });
        }

        return ret;
    },

    events: (state) => {
        if (!state.events.data) return [];

        let ret = [];

        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.push({
                tempWater: state.events.data.list[i].BEACH.WEATHER.TEMP.WATER,
                date: `${state.events.data.list[i].ACTIVE_FROM} ${state.events.data.list[i].ACTIVE_TO ? '-' : ''} ${state.events.data.list[i].ACTIVE_TO ? state.events.data.list[i].ACTIVE_TO : ''}`,
                showFavorite: true,
                beach: state.events.data.list[i].BEACH.NAME,
                paid: state.events.data.list[i].PAID,
                title: state.events.data.list[i].NAME,
                location: state.events.data.list[i].BEACH.CITY.NAME,
                pic: state.api + state.events.data.list[i].PHOTOS[0],
                mainLink: `event/${state.events.data.list[i].ID}`,
                beachLink: `beach/${state.events.data.list[i].ID}`,
                locationId: state.events.data.list[i].BEACH.CITY.ID,
                eventId: state.events.data.list[i].ID
            });
        }

        return ret;
    }
}
