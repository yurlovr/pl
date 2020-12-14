import {
  mapBanner,
  mapBeach,
  mapBeachGroup,
  mapCity,
  mapCollection,
  mapPlace,
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
  map: {},
  geo: {},
  anyPlaces: null,
  show_mobile_preview: true,
  chooseToYourWishes: null,
  activeRest: null,
  familyRest: null,
});

export const mutations = {
  setMobileState: (state, data) => state.show_mobile_preview = data,
  SET_POPULAR_BEACH: (state, payload) => {
    state.beachesTop = payload;
  },

  SET_ANY_PLACES: (state, payload) => {
    const { list } = payload.data;
    const { countElements } = payload.data.pagination;

    const placeList = list.map(mapPlace);

    state.anyPlaces = {
      title: 'Где остановиться в Крыму',
      subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
      beachNumber: countElements,
      showMore: {
        type: 'beach',
        query: '?another',
      },
      beachSliderData: {
        slideNumber: 6,
        cardData: placeList,
      },
    };
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

  // SET_COLLECTION: (state, payload) => {
  //   state.collection = payload;
  // },

  SET_MAP: (state, payload) => {
    state.map = payload;
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
};

export const actions = {
  async getMainPageData({ commit, state }) {
    const popularBeachReq = state.geo.id
      ? this.$axios.$get(`/beach/list?city=${state.geo.id}&count=10`)
      : this.$axios.$get('/beach/top?count=10');

    const [
      popularBeach,
      map,
      // anyPlaces,
    ] = await Promise.all([
      popularBeachReq,
      this.$axios.$get('/beach/clusters/'),
      // this.$axios.$get('/hotel/list?count=10'),
    ]);
    commit('SET_POPULAR_BEACH', popularBeach);
    if (state.geo.id) {
      commit('SET_GEO_COUNT', state.beachesTop.data ? state.beachesTop.data.list.length : 0);
    }
    commit('SET_MAP', map);
    // commit('SET_ANY_PLACES', anyPlaces);
  },
  async setChooseToYourWishes({ commit }) {
    const result = await this.$axios.$get(`/collectionList/item?id=${TAGS.CHOOSE_WISHES}`);
    commit('SET_CHOOSE_TO_YOUR_WISHES', result.data.item);
  },
  async setBanners({ commit }) {
    const banners = await this.$axios.$get('/banner/list/');
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
  async setAnyPlaces({ commit }) {
    // поменять адрес запроса
    const anyPlaces = await this.$axios.$get('https://crimea.air-dev.agency/api/app/hotel/list?count=10');
    commit('SET_ANY_PLACES', anyPlaces);
  },
};

export const getters = {
  getBeachesTop: (state) => {
    if (!state.beachesTop.data) return null;
    const { list, pagination } = state.beachesTop.data;
    const { geo } = state;

    const beachSliderCards = list
      // .slice(0, 10)
      .map(mapBeach);

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

  // Курортные города
  getCitiesTop: (state) => state.citiesTop,

  getMap: (state) => {
    // console.log('!!!getMap', state.map.data)
    // Карта пляжей
    if (!state.map.data) return null;
    const clusterCenters = [];
    let curCluster;
    const ret = {};
    // console.log(state.map.data.list, 'state.map.data.list')

    const clusters = Object.keys(state.map.data.list).map((k) => state.map.data.list[k]);

    for (let i = 0; i < clusters.length; i++) {
      curCluster = clusters[i].filter((v) => v.COORDINATES != '');
      if (curCluster && curCluster.length > 0) {
        clusterCenters.push(
          curCluster.length != 1 ? ([curCluster.reduce((a, b) => {
            if (typeof a === 'object') a = parseFloat(a.COORDINATES.split(',')[0]);
            return a + parseFloat(b.COORDINATES.split(',')[0]);
          }) / curCluster.length,
          curCluster.reduce((a, b) => {
            if (typeof a === 'object') a = parseFloat(a.COORDINATES.split(',')[1]);
            return a + parseFloat(b.COORDINATES.split(',')[1]);
          }) / curCluster.length,
          ]) : curCluster[0].COORDINATES.split(',').map((v) => parseFloat(v)),
        );
      }
    }
    ret.map = {
      addressBeaches: [],
    };
    if (clusterCenters && clusterCenters.length > 0) {
      ret.map.center = [
        clusterCenters.length != 1 ? ([clusterCenters.reduce((a, b) => {
          if (typeof a === 'object') a = a[0];
          return a + b[0];
        }) / clusterCenters.length,
        clusterCenters.reduce((a, b) => {
          if (typeof a === 'object') a = a[1];
          return a + b[1];
        }) / clusterCenters.length,
        ]) : clusterCenters[0],
      ];
    }
    for (let i = 0; i < clusters.length; i++) {
      curCluster = [];
      for (let j = 0; j < clusters[i].length; j++) {
        if (!clusters[i][j].COORDINATES || clusters[i][j].COORDINATES && isNaN(clusters[i][j].COORDINATES.split(',').map((v) => parseFloat(v))[0])) continue;
        curCluster.push({
          pos: clusters[i][j].COORDINATES ? clusters[i][j].COORDINATES.split(',').map((v) => parseFloat(v)) : null,
          rating: parseFloat(clusters[i][j].AVERAGE_RATING),
          title: clusters[i][j].NAME,
          location: clusters[i][j].CITY ? clusters[i][j].CITY.NAME : null,
          locationId: clusters[i][j].CITY ? clusters[i][j].CITY.ID : -1,
          beachId: clusters[i][j].ID,
          pics: clusters[i][j].PHOTOS && clusters[i][j].PHOTOS.small ? [...clusters[i][j].PHOTOS.small.map((e) => e.path)] : null,
          showFavorite: true,
          paid: clusters[i][j].PAID,
          humanLink: clusters[i][j].CODE || clusters[i][j].ID,
        });
      }
      if (clusterCenters[i] && clusterCenters[i].length > 0) {
        ret.map.addressBeaches.push({
          clusterCenter: clusterCenters[i],
          beaches: curCluster,
          id: clusters[i][0].CITY ? clusters[i][0].CITY.ID : null,
        });
      }
    }
    if (state.geo.id && state.geo.count && state.geo.count > 0) {
      ret.map.geo = {
        id: ret.map.addressBeaches.findIndex((v) => v.id == state.geo.id),
      };
    }
    return ret.map;
  },

  getBanners: (state) => state.banners,

  // Отдых для всей семьи
  getFamilyRest: (state) => state.familyRest,

  getAnotherPlaces: (state) => state.anyPlaces,

  // Ближайшие мероприятия
  // TODO Fetch by api
  getEvents: (state) => state.events,

  // Выберите свой пляж
  // TODO Hardcode this shit
  // getChooseYourBeach: (state, getters, rootState) => {
  //   if (!rootState.search.searchConfig) return null;

  //   const { beachTypes } = rootState.search.searchConfig.data;
  //   if (!beachTypes) return null;

  //   const types = [
  //     'galechnye-plyazhi',
  //     'peschanye-plyazhi',
  //     'rakushechnye-plyazhi',
  //   ];

  //   return beachTypes
  //     .filter((type) => types.includes(type.CODE))
  //     .map((type) => ({
  //       title: type.NAME,
  //       id: type.EXTERNAL_ID,
  //     }));
  // },

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

  // Выбирайте по своим желаниям
  getChooseToYourWishes: (state) => state.chooseToYourWishes,
  // Активный отдых
  getActiveRest: (state) => state.activeRest,
};
