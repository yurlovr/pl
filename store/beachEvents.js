import { mapEventBeach } from '../helpers/mappers';

export const state = () => ({
  beachEvents: null,
});

export const actions = {
  async setBeachEvents({ commit }, beachId) {
    const events = await this.$axios.$get(`/event/list?beachId=${beachId}`);
    commit('SET_BEACH_EVENTS', { events, beachId });
  },
  setBeachEventsDefault({ commit }) {
    commit('SET_BEACH_EVENTS_DEFAULT');
  },
};

export const mutations = {
  SET_BEACH_EVENTS: (state, payload) => {
    const { beachId, events } = payload;
    const { list, pagination } = events.data;
    const beachEvents = list.map(mapEventBeach);
    state.beachEvents = {
      count: pagination.countElements,
      link: `/event-catalog?beachId=${beachId}`,
      cardData: beachEvents,
    };
  },
  SET_BEACH_EVENTS_DEFAULT: (state) => {
    state.beachEvents = null;
  },
};
export const getters = {
  getBeachEvents: (state) => state.beachEvents,
};
