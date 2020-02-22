export const state = () => ({
    popular_beaches: [],
    cities: []
})

export const mutations = {
    SET_POPULAR_BEACH: (state, payload) => {
           state.popular_beaches = payload;
    },
    SET_CITIES: (state, payload) => {
        state.cities = payload;
    },
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
}
