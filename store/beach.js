export const state = () => ({
    popularBeaches: [],
    cities: [],
    beach: []
})

export const mutations = {
    SET_POPULAR_BEACH: (state, payload) => {
           state.popularBeaches = payload;
    },

    SET_CITIES: (state, payload) => {
        state.cities = payload;
    },

    SET_BEACH: (state, payload) => {
        state.beach = payload;
    }
}

export const actions = {
    async getPopularBeaches({commit}) {
        const data = await this.$axios.$get('/beach/top');
        commit('SET_POPULAR_BEACH', data)
    },

    async getCities({commit}) {
        const data = await this.$axios.$get('/city/list');
        commit('SET_CITIES', data)
    },

    async getBeach({commit}, id) {
        commit('SET_BEACH', await this.$axios.$get(`/beach/item?id=${id}`));
    }
}

export const getters = {
    beachData: (state) => {
        if (!state.beach.data) return null;

        console.log(state.beach.data.item);

        return {
            avgRating: {
                rating: state.beach.data.item.AVERAGE_RATING,
                peopleCount: 0,
                ratings: [
                    {
                        title: 'Природа',
                        rating: state.beach.data.item.AVERAGE_RATING_NATURE
                    },
                    {
                        title: 'Чистота воды',
                        rating: state.beach.data.item.AVERAGE_RATING_WATER_PURITY
                    },
                    {
                        title: 'Чистота берега',
                        rating: state.beach.data.item.AVERAGE_RATING_SHORE_CLEANLINESS
                    },
                    {
                        title: 'Инфраструктура',
                        rating: state.beach.data.item.AVERAGE_RATING_INFRASTRUCTURE
                    },
                    {
                        title: 'Безопасность',
                        rating: state.beach.data.item.AVERAGE_RATING_SECURITY
                    },
                    {
                        title: 'Доступность',
                        rating: state.beach.data.item.AVERAGE_RATING_AVAILABILITY
                    }
                ]
            },

            mapWeatherData: {
                date: '15.06.2020',
                title: 'Погода на пляже',
                airTemp: state.beach.data.item.TEMP.AIR,
                waterTemp: state.beach.data.item.TEMP.WATER,
                cloudyDays: 0
            }
        }
    }
}
