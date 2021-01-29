import { mapOpinion } from '../helpers/mappers';

export const state = () => ({
  opinions: null,
});

export const actions = {
  async setOpinions({ commit }, beachId) {
    const opinions = await this.$axios.$get(`/opinion/list?entityId=${beachId}`);
    commit('SET_OPINIONS_DATA', opinions);
  },
  setOpinionsDefault({ commit }) {
    commit('SET_OPINIONS_DEFAULT');
  },
};

export const mutations = {
  SET_OPINIONS_DATA: (state, opinions) => {
    const { list } = opinions.data;
    state.opinions = list.map(mapOpinion);
  },
  SET_OPINIONS_DEFAULT: (state) => {
    state.opinions = null;
  },
};
export const getters = {
  getOpinions: (state) => state.opinions,
};
