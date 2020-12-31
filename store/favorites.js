import Vue from 'vue';
import {
  mapBeach,
  mapEvent,
} from '~/helpers/mappers';

export const state = () => ({
  events: {},
  beaches: {},
  visited: {},
  myBeaches: null,
  myEvents: null,
  myVisited: null,
});

export const actions = {
  addToFavorite({ commit, dispatch }, [id, type]) {
    switch (type) {
      case 'beach':
        commit('addBeach', id);
        break;
      case 'event':
        commit('addEvent', id);
        break;
      default: break;
    }
  },
  removeFavorite({ commit, dispatch }, [id, type]) {
    switch (type) {
      case 'beach':
        commit('removeBeach', id);
        break;
      case 'event':
        commit('removeEvent', id);
        break;
      default: break;
    }
  },
  async setMyBeaches({ commit, state }, payload = true) {
    if (!payload) {
      commit('SET_MY_FAVORITES_BEACHES', null);
      return;
    }
    const query = Object.keys(state.beaches).map((item) => `id[]=${item}`)
      .join('&');
    const { data } = await this.$axios.$get(`/beach/item?${query}`);
    commit('SET_MY_FAVORITES_BEACHES', data);
  },
  async setMyEvents({ commit, state }, payload = true) {
    if (!payload) {
      commit('SET_MY_FAVORITES_EVENTS', null);
      commit('SET_MY_FAVORITES_VISITED', null);
      return;
    }
    const queryEvents = Object.keys(state.events).map((item) => `id[]=${item}`)
      .join('&');
    const queryVisited = Object.keys(state.visited).map((item) => `id[]=${item}`)
      .join('&');
    let events = null;
    let visited = null;
    if (queryEvents) {
      events = await this.$axios.$get(`/event/item?${queryEvents}`);
    }
    if (queryVisited) {
      visited = await this.$axios.$get(`/event/item?${queryVisited}`);
    }
    if (events) {
      commit('SET_MY_FAVORITES_EVENTS', events.data);
    }
    if (visited) {
      commit('SET_MY_FAVORITES_VISITED', visited.data);
    }
  },
  // async setMyVisited({ commit, state }) {
  //   console.log('VISITED');
  //   const query = Object.keys(state.visited).map((item) => `id[]=${item}`)
  //     .join('&');
  //   const { data } = await this.$axios.$get(`/event/item?${query}`);
  //   commit('SET_MY_FAVORITES_VISITED', data);
  // },
};
export const mutations = {
  addEvent: (state, id) => {
    state.events = {
      ...state.events,
      [id]: true,
    };
  },
  removeEvent: (state, id) => {
    Vue.delete(state.events, id);
  },

  addBeach: (state, id) => {
    state.beaches = {
      ...state.beaches,
      [id]: true,
    };
  },
  removeBeach: (state, id) => {
    Vue.delete(state.beaches, id);
  },

  addVisited: (state, id) => {
    state.visited = {
      ...state.visited,
      [id]: true,
    };
  },
  removeVisited: (state, id) => {
    Vue.delete(state.visited, id);
  },
  SET_MY_FAVORITES_BEACHES: (state, payload) => {
    if (!payload) {
      state.myBeaches = payload;
      return;
    }
    const { item } = payload;
    state.myBeaches = {
      list: [].concat(mapBeach(item)),
      pagination: {},
    };
  },
  SET_MY_FAVORITES_EVENTS: (state, payload) => {
    if (!payload) {
      state.myEvents = payload;
      return;
    }
    const { item } = payload;
    state.myEvents = {
      list: [].concat(mapEvent(item)),
      pagination: {},
    };
  },
  SET_MY_FAVORITES_VISITED: (state, payload) => {
    if (!payload) {
      state.myVisited = payload;
      return;
    }
    const { item } = payload;
    state.myVisited = {
      list: [].concat(mapEvent(item)),
      pagination: {},
    };
  },
};
export const getters = {
  count: (state) => Object.keys(state.events).length + Object.keys(state.beaches).length,
  isVisited: (state) => (id) => state.visited[id],
  isFavorite: (state) => (id, type) => (type === 'beach'
    ? state.beaches[id]
    : state.events[id]),
  // TODO dont use rootState
  getBeaches: (state, getters, rootState, rootGetters) => {
    const ids = Object.keys(state.beaches);
    return rootGetters.beaches.filter((b) => ids.includes(b.beachId));
  },
  // TODO dont use rootState
  getEvents: (state, getters, rootState, rootGetters) => {
    const ids = Object.keys(state.events);
    return rootGetters.events.filter((b) => ids.includes(b.eventId));
  },
  // TODO dont use rootState
  getVisitedEvents: (state, getters, rootState, rootGetters) => {
    const ids = Object.keys(state.visited);
    return rootGetters.events.filter((b) => ids.includes(b.eventId));
  },
  getHaveMyBeaches: (state) => Object.keys(state.beaches).length,
  getHaveMyEvents: (state) => Object.keys(state.events).length,
  getHaveMyVisited: (state) => Object.keys(state.visited).length,
  getMyBeaches: (state) => state.myBeaches,
  getMyEvents: (state) => state.myEvents,
  getMyVisited: (state) => state.myVisited,
};
