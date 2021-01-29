import {
  mapEventList,
} from '@/helpers/mappers';
import { mapSettings } from '../helpers/mappers';

export const state = () => ({
  user_coordinates: {},
  choose_position: false,
  mobile_settings: [],
  isModalViewed: false,
  addTags: null,
  tags: null,
  typeDisplay: 'list',
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
  SET_ADD_TAGS: (state, payload) => {
    state.addTags = payload;
  },
  SET_TAGS: (state, payload) => {
    state.tags = payload;
  },
  SET_TYPE_DISPLAY: (state, payload) => {
    state.typeDisplay = payload;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const [addTags, tags, searchConfig] = await Promise.all([
      this.$axios.$get('/addtag/list?count=50'),
      this.$axios.$get('/tag/list?count=10'),
      this.$axios.$get('/search/config'),
    ]);
    commit('SET_ADD_TAGS', addTags.data.list);
    commit('SET_TAGS', tags.data.list);
    commit('search/SET_SEARCH_CONFIG', searchConfig.data);
    commit('search/SET_SEARCH_CONFIG_DEFAULT');
  },
  setTypeDisplay({ commit }, payload) {
    commit('SET_TYPE_DISPLAY', payload);
  },
};

export const getters = {
  // Mobile settings
  getMobileSettings: (state) => {
    if (!state.mobile_settings.data) return null;
    const { list } = state.mobile_settings.data;
    return list.map(mapSettings);
  },
  getTypeDisplay: (state) => state.typeDisplay,
};
