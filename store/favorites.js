import Vue from 'vue'

export const state = () => ({
  events:  {},
  beaches: {},
  visited: {},
})

export const actions = {
  addToFavorite({ commit, dispatch }, [id, type]) {
    switch (type) {
      case 'beach':
        commit('addBeach', id);
        break;
      case 'event':
        commit('addEvent', id);
        break;
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
    }
  }
}
export const mutations = {
  addEvent: (state, id) => {
    state.events = {
      ...state.events,
      [id]: true
    }
  },
  removeEvent: (state, id) => {
    Vue.delete(state.events, id)
  },

  addBeach: (state, id) => {
    state.beaches = {
      ...state.beaches,
      [id]: true
    }
  },
  removeBeach: (state, id) => {
    Vue.delete(state.beaches, id)
  },

  addVisited: (state, id) => {
    state.visited = {
      ...state.visited,
      [id]: true
    }
  },
  removeVisited: (state, id) => {
    Vue.delete(state.visited, id)
  },
}
export const getters = {
  count: state => {
    return Object.keys(state.events).length + Object.keys(state.beaches).length
  },
  isVisited:  state => id => state.visited[id],
  isFavorite: state => (id, type) => {
    return type === 'beach'
      ? state.beaches[id]
      : state.events[id]
  },
  getBeaches: (state, getters, rootState, rootGetters) => {
    const ids = Object.keys(state.beaches)
    return rootGetters.beaches.filter(b => ids.includes(b.beachId))
  },
  getEvents: (state, getters, rootState, rootGetters) => {
    const ids = Object.keys(state.events)
    return rootGetters.events.filter(b => ids.includes(b.eventId))
  },
  getVisitedEvents: (state, getters, rootState, rootGetters) => {
    const ids = Object.keys(state.visited)
    return rootGetters.events.filter(b => ids.includes(b.eventId))
  }
}

