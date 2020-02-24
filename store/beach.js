export const state = () => ({
    popularBeaches: [],
    cities: [],
    beachData: []
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

    async getBeach({commit}, payload) {
        console.log('wow', payload)
        commit('SET_BEACH', await this.$axios.$get(`/beach/item?id=${payload}`))
    }
}
