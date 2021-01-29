import { mapSimilar } from '../helpers/mappers';

export const state = () => ({
  similar: null,
});

export const actions = {
  async setSimilarBeaches({ commit }, payload) {
    const { cityId, tags, beachId } = payload;
    const query = tags.map((item) => `tags[]=${item.id}`).join('&');
    const similar = await this.$axios.$get(`/beach/list?city=${cityId}&${query}`);
    commit('SET_SIMILAR_BEACHES', { similar, tags, beachId, cityId });
  },
  setSimilarDefault({ commit }) {
    commit('SET_SIMILAR_DEFAULT');
  },
};

export const mutations = {
  SET_SIMILAR_BEACHES: (state, payload) => {
    const {
      similar,
      tags,
      beachId,
      cityId,
    } = payload;
    const { list, pagination } = similar.data;
    const beaches = list.map(mapSimilar).filter((item) => item.id !== beachId);
    if (beaches.length) {
      const query = `?city=${cityId}&${tags.map((item) => `tags[]=${item.id}`).join('&')}&fromBeach=${beachId}`;

      state.similar = {
        title: 'Похожие пляжи рядом',
        subtitle: '',
        beachNumber: pagination.countElements - 1,
        showMore: {
          type: 'similar',
          query,
        },
        beachSliderData: {
          slideNumber: 6,
          cardData: beaches,
        },
      };
    } else {
      state.similar = {};
    }
  },
  SET_SIMILAR_DEFAULT: (state) => {
    state.similar = null;
  },
};
export const getters = {
  getSimilarBeaches: (state) => state.similar,
};
