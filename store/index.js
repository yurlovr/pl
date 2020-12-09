import {
  mapBeachList,
  mapEntityList,
  mapEventList,
  mapIDs,
} from '@/helpers/mappers';
import { mapSettings } from '../helpers/mappers';

export const state = () => ({
  beaches: [],
  events: [],
  user_coordinates: {},
  choose_position: false,
  map_entity: [],
  mappedEvents: [],

  // TODO Move to settings store module
  mobile_settings: [],
  isModalViewed: false,

});

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

  // TODO Move to settings store module
  SET_MOBILE_SETTINGS: (state, payload) => {
    state.mobile_settings = payload;
  },
  // TODO Move to settings store module
  SET_MODAL_VIEWED: (state, status = false) => {
    state.isModalViewed = status;
  },
};

export const actions = {
  // async nuxtServerInit({ commit }, { app }) {
//     const start = new Date().getTime();
    // const [
//       // beaches,
//       events,
      // search,
//       map,
//       settings,
//     ] = await Promise.all([
//       // this.$axios.$get('/beach/list?count=10'),
//       // this.$axios.$get('/event/list?count=10'),
//       // this.$axios.$get('search/config'),
//       // this.$axios.$get('/map-entity/list?count=10'),
//       // this.$axios.$get('/settings/list'),
//     ]);
//     console.log(`end load data ${new Date().getTime() - start}ms`);

//     // commit('SET_ALL_BEACHES', beaches);
//     // commit('SET_ALL_EVENTS', events);
//     // commit('search/SET_SEARCH', search);
//     // commit('SET_MAP_ENTITY', map);
//     // commit('SET_MOBILE_SETTINGS', settings);

//     // TODO Configure cookie plugin for ssr
//     const storeCache = app.$cookies.get('store');
//     const { isModalViewed = false } = storeCache || {};
//     commit('SET_MODAL_VIEWED', isModalViewed);

//     commit('setLastUserPos', this.$cookies.get('last_coordinates') || {});
  // },
};

export const getters = {
  beachIds: (state) =>
    // console.log('getter beachIds');
    mapIDs(state.beaches.data.list),

  eventIds: (state) =>
    // console.log('getter eventIds');
    mapIDs(state.events.data.list),

  beaches: (state) =>
    // console.log('getter beaches');
    mapBeachList(state.beaches.data.list),

  events: (state) =>
    // console.log('getter events');
    mapEventList(state.events.data.list),

  mapEntity: (state) =>
    // console.log('getter mapEntity');
    mapEntityList(state.map_entity.data.list),

  // Mobile settings
  getMobileSettings: (state) => {
    // console.log('getMobileSettings', state.mobile_settings.data)
    if (!state.mobile_settings.data) return null;
    const { list } = state.mobile_settings.data;

    return list.map(mapSettings);
  },
};
