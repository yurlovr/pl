import { sample } from 'lodash';
import { mapAnnounce } from '../helpers/mappers';

export const state = () => ({
  announcements: null,
});

export const actions = {
  async setAnnouncement({ commit }, page) {
    let announcements = null;
    if (page) {
      announcements = await this.$axios.$get(`/banner/list?page=/${page}`);
    }
    commit('SET_ANNOUNCEMENT_DATA', announcements);
  },
};

export const mutations = {
  SET_ANNOUNCEMENT_DATA: (state, announcement) => {
    if (!announcement) {
      state.announcements = announcement;
    } else {
      const list = announcement.data.list || [];
      state.announcements = list.map(mapAnnounce);
    }
  },
};
export const getters = {
  getAnnouncement: (state) => sample(state.announcements),
};
