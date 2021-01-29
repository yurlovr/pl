import { mapVisitors } from '../helpers/mappers';

export const state = () => ({
  visitorPics: null,
});

export const actions = {
  async setVisitorPics({ commit }, eventId) {
    let visitorPics = null;
    if (eventId) {
      visitorPics = await this.$axios.$get(`/socialPhoto/list?entityId=${eventId}&count=10`);
    }
    commit('SET_VISITOR_PICS', visitorPics);
  },
};

export const mutations = {
  SET_VISITOR_PICS: (state, payload) => {
    if (!payload) {
      state.visitorPics = payload;
    } else {
      const { list } = payload.data;
      state.visitorPics = list.map(mapVisitors);
    }
  },
};
export const getters = {
  getVisitorPics: (state) => state.visitorPics,
};
