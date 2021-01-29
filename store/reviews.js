import { mapReview } from '../helpers/mappers';

export const state = () => ({
  reviews: null,
});

export const actions = {
  async setReviews({ commit }, id) {
    const reviews = await this.$axios.$get(`/review/list?entityId=${id}`);
    commit('SET_REVIEWS', reviews);
  },
  setDefaultReviews({ commit }) {
    commit('SET_DEFAULT_REVIEWS');
  },
};

export const mutations = {
  SET_REVIEWS: (state, payload) => {
    state.reviews = payload.data.list.map(mapReview);
  },
  SET_DEFAULT_REVIEWS: (state) => {
    state.reviews = null;
  },
};
export const getters = {
  getReviews: (state) => state.reviews,
};
