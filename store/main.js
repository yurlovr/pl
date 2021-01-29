import {
  mapBanner,
  mapBeach,
  mapCity,
  mapCollection,
  mapRest,
  mapEvent,
} from '@/helpers/mappers';
import { TAGS } from '../const/const';

export const state = () => ({
  beachesTop: [],
  events: null,
  citiesTop: null,
  weather: null,
  beachTypes: {},
  banners: null,
  geo: {},
  show_mobile_preview: true,
  chooseToYourWishes: null,
  activeRest: null,
  familyRest: null,
  clusters: null,
  beachFromMap: null,
});

export const mutations = {
  setMobileState: (state, data) => state.show_mobile_preview = data,
  SET_POPULAR_BEACH: (state, payload) => {
    state.beachesTop = payload;
  },

  SET_CITIES: (state, payload) => {
    const { list } = payload.data;
    state.citiesTop = list
      .sort((a, b) => ((a.COUNT_BEACHES < b.COUNT_BEACHES) ? 1 : -1))
      .map(mapCity);
  },

  SET_WEATHER: (state, payload) => {
    state.weather = payload;
  },

  SET_BANNERS: (state, payload) => {
    state.banners = payload.data.list.map(mapBanner)
      .sort((a, b) => (parseInt(a.POSITION, 10) - parseInt(b.POSITION, 10)));
  },

  setGeoLocating: (state, payload) => {
    state.geo.id = payload;
  },

  SET_GEO_COUNT: (state, payload) => {
    state.geo.count = payload;
  },
  SET_EVENTS: (state, payload) => {
    const events = payload.data.list.map(mapEvent);
    state.events = {
      title: 'Ближайшие мероприятия на пляжах',
      beachNumber: events.length,
      showMore: {
        type: 'event',
        query: null,
      },
      beachSliderData: {
        slideNumber: 4,
        cardData: events,
      },
    };
  },
  SET_CHOOSE_TO_YOUR_WISHES: (state, payload) => {
    state.chooseToYourWishes = mapCollection(payload);
  },
  SET_ACTIVE_REST: (state, payload) => {
    state.activeRest = mapCollection(payload.data.item);
  },
  SET_FAMILY_REST: (state, payload) => {
    const beaches = payload.data.list.map(mapRest);
    const beachNumber = payload.data.pagination.countElements;
    state.familyRest = {
      title: 'Отдых для всей семьи',
      subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
      beachNumber,
      showMore: {
        type: 'beach',
        query: '?family',
      },
      beachSliderData: {
        slideNumber: 6,
        cardData: beaches,
      },
    };
  },
  SET_CLUSTERS: (state, data) => {
    const { list } = data.list;
    state.clusters = list.map((item) => ({
      coords: item.COORDINATES.split(',').map((item) => +item),
      id: item.ID,
      beachName: item.NAME,
    }));
  },
  SET_BEACH_FROM_MAP: (state, data) => {
    if (!data) {
      state.beachFromMap = null;
      return;
    }
    const { item } = data;
    state.beachFromMap = mapBeach(item);
  },
};

export const actions = {
  async getMainPageData({ commit, state }) {
    const popularBeach = state.geo.id
      ? await this.$axios.$get(`/beach/list?city=${state.geo.id}&count=10`)
      : await this.$axios.$get('/beach/top?count=10');
    commit('SET_POPULAR_BEACH', popularBeach);
    if (state.geo.id) {
      commit('SET_GEO_COUNT', state.beachesTop.data ? state.beachesTop.data.list.length : 0);
    }
  },
  async setChooseToYourWishes({ commit }) {
    const result = await this.$axios.$get(`/collectionList/item?id=${TAGS.CHOOSE_WISHES}`);
    commit('SET_CHOOSE_TO_YOUR_WISHES', result.data.item);
  },
  async setBanners({ commit }) {
    const banners = await this.$axios.$get('/banner/list');
    commit('SET_BANNERS', banners);
  },
  async setActiveRest({ commit }) {
    const active = await this.$axios.$get(`/collectionList/item?id=${TAGS.ACTIVE_REST}`);
    commit('SET_ACTIVE_REST', active);
  },

  async setWeather({ commit }) {
    const weather = await this.$axios.$get('/weather/list');
    commit('SET_WEATHER', weather);
  },

  async setEvents({ commit }) {
    const events = await this.$axios.$get('/event/list?count=10');
    commit('SET_EVENTS', events);
  },

  async setFamilyRest({ commit }) {
    const familyRest = await this.$axios.$get(`/beach/list?tags=${TAGS.FAMILY_REST}`);
    commit('SET_FAMILY_REST', familyRest);
  },
  async setCities({ commit }) {
    const cities = await this.$axios.$get('/city/top?count=10');
    commit('SET_CITIES', cities);
  },
  async setMap({ commit }) {
    const dataForClusters = await this.$axios.$get('/beach/listforcluster');
    commit('SET_CLUSTERS', dataForClusters.data);
  },
  async setBeachFromMap({ commit }, beachId) {
    let dataBeach = null;
    if (beachId) {
      const { data } = await this.$axios.$get(`/beach/item?id=${beachId}`);
      dataBeach = data;
    }
    commit('SET_BEACH_FROM_MAP', dataBeach);
  },
};

export const getters = {
  getBeachesTop: (state) => {
    if (!state.beachesTop.data) return null;
    const { list, pagination } = state.beachesTop.data;
    const { geo } = state;

    const beachSliderCards = list.map(mapBeach);

    // TODO Use query builder instead
    let query = '?popular&';
    if (geo.id && geo.count && geo.count > 0) {
      query += `city=${geo.id}&`;
    }
    query = query.slice(0, -1); // get rid of last &

    const geoName = (geo.id && geo.count && geo.count != 0 && list[0] && list[0].CITY ? ` ${list[0].CITY.NAME}` : '');

    const beachesTop = {
      title: `Самые популярные пляжи${geoName}`,
      subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
      beachNumber: pagination.countElements,
      showMore: {
        type: 'beach',
        query,
      },
      beachSliderData: {
        slideNumber: 4,
        cardData: beachSliderCards,
      },
    };
    return beachesTop;
  },
  getCitiesTop: (state) => state.citiesTop,
  getBanners: (state) => state.banners,
  getFamilyRest: (state) => state.familyRest,
  getEvents: (state) => state.events,

  getWeather: (state) => {
    if (!state.weather) return null;

    let curCluster;
    const weatherData = Object.keys(state.weather.data.list)
      .map((k) => state.weather.data.list[k]);

    if (!weatherData) return null;

    const ret = {};

    ret.weather = [];
    for (let i = 0; i < weatherData.length; i++) {
      curCluster = [];
      for (let j = 0; j < weatherData[i].length; j++) {
        curCluster.push({
          city: weatherData[i][j].CITY ? weatherData[i][j].CITY.NAME : null,
          pic: weatherData[i][j].CITY && weatherData[i][j].CITY.PREVIEW_PICTURE ? weatherData[i][j].CITY.PREVIEW_PICTURE : null,
          airTemperature: weatherData[i][j].TEMP ? parseFloat(weatherData[i][j].TEMP.AIR) : null,
          waterTemperature: weatherData[i][j].TEMP ? parseFloat(weatherData[i][j].TEMP.WATER) : null,
        });
      }
      ret.weather.push(curCluster);
    }

    return ret.weather;
  },
  getChooseToYourWishes: (state) => state.chooseToYourWishes,
  getActiveRest: (state) => state.activeRest,
  getClusters: (state) => state.clusters,
  getBeachFromMap: (state) => state.beachFromMap,
};
