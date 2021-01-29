export const state = () => ({
  temperatures: null,
});

export const actions = {
  async setWaterTemp({ commit }, cityId) {
    const temperatures = await this.$axios.$get(`/weather/list${cityId ? `?cityId[]=${cityId}` : ''}`);
    commit('SET_TEMPERATURES', temperatures);
  },
};

export const mutations = {
  SET_TEMPERATURES: (state, payload) => {
    const { list } = payload.data;
    state.temperatures = list;
  },
};
export const getters = {
  getWaterTemp: (state) => state.temperatures,
};
