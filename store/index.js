import {
  mapBeachList,
  mapEntityList,
  mapEventList,
  mapIDs
} from "@/helpers/mappers";

export const state = () => ({
  beaches: [],
  events: [],
  user_coordinates: {},
  choose_position: false,
  map_entity: [],
  mappedEvents: []
})

export const mutations = {
  SET_ALL_BEACHES: (state, payload) => {
    state.beaches = payload;
  },

  SET_ALL_EVENTS: (state, payload) => {
    state.events = payload;
    state.mappedEvents = mapEventList(payload.data.list);
  },
  setLastUserPos: (state, data) => state.user_coordinates = data,
  setChoosePosition: (state, data) => state.choose_position = data,
  SET_MAP_ENTITY: (state, payload) => {
    state.map_entity = payload;
  },
}

export const actions = {
  async nuxtServerInit({commit}) {
    const [beaches, events, search, map] = await Promise.all([
      this.$axios.$get('/beach/list?count=9999'),
      this.$axios.$get('/event/list?count=9999'),
      this.$axios.$get('search/config'),
      this.$axios.$get('/map-entity/list?count=9999'),
    ]);
    commit('SET_ALL_BEACHES', beaches);
    commit('SET_ALL_EVENTS', events);
    commit('search/SET_SEARCH', search);
    commit('SET_MAP_ENTITY', map);
    commit('setLastUserPos', this.$cookies.get('last_coordinates') || {})
  }
}

export const getters = {
  beachIds: (state) => {
    // console.log('getter beachIds');
    return mapIDs(state.events.list)
  },

  eventIds: (state) => {
    // console.log('getter eventIds');
    return mapIDs(state.events.list)
  },

  beaches: (state) => {
    // console.log('getter beaches');
    return mapBeachList(state.beaches.data.list)
  },

  events: (state) => {
    // console.log('getter events');
    return mapEventList(state.events.data.list)
  },

  mapEntity: (state) => {
    // console.log('getter mapEntity');
    return mapEntityList(state.map_entity.data.list)
  }
}
