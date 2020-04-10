import {getDistanceFromLatLonInKm} from "../assets/calcDistance";

export const state = () => ({
  my_coords: {},
  my_city_id: null,
  searchInput: '',
  paramsShown: false,
  searchParams: {
    coords: [],
    radius: null,
    selects: {
      cities: {
        value: {
          title: 'Любой город',
          id: -1
        },
        param: 'cities',
        options: [
          {
            title: 'Любой город',
            id: -1
          }
        ]
      },
      beachTypes: {
        value: {
          title: 'Тип пляжа',
          id: -1
        },
        param: 'beachTypes',
        options: [
          {
            title: 'Тип пляжа',
            id: -1
          }
        ]
      },
      modes: {
        value: {
          title: 'Режим работы',
          id: -1
        },
        param: 'modes',
        id: -1,
        options: [
          {
            title: 'Режим работы',
            id: -1
          }
        ]
      },
      price: {
        value: {
          title: 'Стоимость',
          id: -1
        },
        param: 'price',
        options: [
          {
            title: 'Стоимость',
            id: -1
          },
          {
            title: 'Платно',
            id: 'paid'
          },
          {
            title: 'Бесплатно',
            id: 'free'
          }
        ]
      },
      searchBeachLengthFrom: {
        value: {
          title: 'Протяженность линии от, м',
          id: -1
        },
        param: 'searchBeachLengthFrom',
        options: [
          {
            title: 'Протяженность линии от, м',
            id: -1
          }
        ]
      },
      searchBeachLengthTo: {
        value: {
          title: 'До',
          id: -1
        },
        param: 'searchBeachLengthTo',
        options: [
          {
            title: 'До',
            id: -1
          }
        ]
      },
      searchWaterTempFrom: {
        value: {
          title: 'Температура воды от, °C',
          id: -1
        },
        param: 'searchWaterTempFrom',
        options: [
          {
            title: 'Температура воды от, °C',
            id: -1
          }
        ]
      },
      searchWaterTempTo: {
        value: {
          title: 'До',
          id: -1
        },
        param: 'searchWaterTempTo',
        options: [
          {
            title: 'До',
            id: -1
          }
        ]
      }
    },

    checkboxes: {
      tags: [],
      addTags: [],
      services: [],
      infrastructures: []
    }
  },
  searchConfig: {},
  searchPageResultEventBackup: [],
  searchPageResultBeachBackup: [],
  searchPageResult: [],
  beachesOrEventsAreShown: false, // false - beaches, true - events
  autocompleteResults: [],
  query: '',
  tags: [],
  api: 'https://crimea.air-dev.agency',
  init: false, // SET_SEARCH gets called twice, so I will check if it's init or not to not call it the second time,
  coords: {
    lat:52.9760256,
    lng: 36.077568
  },
  radius: 5000
})

export const mutations = {
  set_coords: (state, pos) => state.coords = pos,
  set_radius: (state, rad) => state.radius = rad,
  SET_MY_COORDS: (state, data) => state.my_coords = data,
  SET_MY_CITY: (state, city) => state.my_city_id = city,
  SET_SEARCH: (state, payload) => {
    if (state.init)
      return;
    state.init = true;

    state.searchConfig = payload;

    // initializing the first row
    for (let i = 0; i < payload.data.cities.length; i++) {
      state.searchParams.selects.cities.options.push({
        title: payload.data.cities[i].NAME,
        id: payload.data.cities[i].ID
      });
    }
    for (let i = 0; i < payload.data.beachTypes.length; i++) {
      state.searchParams.selects.beachTypes.options.push({
        title: payload.data.beachTypes[i].NAME,
        id: payload.data.beachTypes[i].ID
      });
    }
    for (let i = 0; i < payload.data.modes.length; i++) {
      state.searchParams.selects.modes.options.push({
        title: payload.data.modes[i].NAME,
        id: payload.data.modes[i].ID
      });
    }
    // no need to get prices, they are preinitialized
    // initializing the second row
    for (let i = 0; i < payload.data.lineLengthList.length; i++) {
      state.searchParams.selects.searchBeachLengthFrom.options.push({
        title: payload.data.lineLengthList[i],
        id: payload.data.lineLengthList[i]
      })
    }
    for (let i = 0; i < payload.data.lineLengthList.length; i++) {
      state.searchParams.selects.searchBeachLengthTo.options.push({
        title: payload.data.lineLengthList[i],
        id: payload.data.lineLengthList[i]
      })
    }
    for (let i = 0; i < payload.data.waterTempList.length; i++) {
      state.searchParams.selects.searchWaterTempFrom.options.push({
        title: payload.data.waterTempList[i],
        id: payload.data.waterTempList[i]
      })
    }
    for (let i = 0; i < payload.data.waterTempList.length; i++) {
      state.searchParams.selects.searchWaterTempTo.options.push({
        title: payload.data.waterTempList[i],
        id: payload.data.waterTempList[i]
      })
    }
    // initializing the checkboxes
    for (let i = 0; i < payload.data.tags.length; i++) {
      state.searchParams.checkboxes.tags[payload.data.tags[i].ID] = {
        value: false,
        title: payload.data.tags[i].NAME,
        id: payload.data.tags[i].ID,
        type: 'tags'
      }
    }
    for (let i = 0; i < payload.data.addTags.length; i++) {
      state.searchParams.checkboxes.addTags[payload.data.addTags[i].ID] = {
        value: false,
        title: payload.data.addTags[i].NAME,
        id: payload.data.addTags[i].ID,
        type: 'addTags'
      }
    }
    for (let i = 0; i < payload.data.services.length; i++) {
      state.searchParams.checkboxes.services[payload.data.services[i].ID] = {
        value: false,
        title: payload.data.services[i].NAME,
        id: payload.data.services[i].ID,
        type: 'services'
      }
    }
    for (let i = 0; i < payload.data.infrastructures.length; i++) {
      state.searchParams.checkboxes.infrastructures[payload.data.infrastructures[i].ID] = {
        value: false,
        title: payload.data.infrastructures[i].NAME,
        id: payload.data.infrastructures[i].ID,
        type: 'infrastructures'
      }
    }
  },

  updateParamsShown: (state, payload) => {
    state.paramsShown = payload;
  },

  SET_SEARCH_RESULT: (state, payload) => {
    state.searchPageResult = payload;
  },

  SET_SEARCH_RESULT_EVENT_BACKUP: (state, payload) => {
    state.searchPageResultEventBackup = payload;
  },

  SET_SEARCH_RESULT_BEACH_BACKUP: (state, payload) => {
    state.searchPageResultBeachBackup = payload;
  },

  updateInput(state, payload) {
    state.searchInput = payload;
  },

  updateSearchSecondRowParam(state, payload) {
    state.searchParams.selects[payload.param].options[0].title = payload.title;
    state.searchParams.selects[payload.param].options.push('lol');
    state.searchParams.selects[payload.param].options.pop();

    if (state.searchParams.selects[payload.param].value.id == -1)
      state.searchParams.selects[payload.param].value.title = payload.title;
  },

  updateSearchParam(state, payload) {
    if (payload.type) { // checkbox
      state.searchParams.checkboxes[payload.type][payload.id].value = payload.value;
      state.searchParams.checkboxes[payload.type].push('lol');
      state.searchParams.checkboxes[payload.type].pop();
    } else { // select
      state.searchParams.selects[payload.param].value = payload.value;
    }
  },

  updateSearchInput(state, payload) {
    state.searchInput = payload;
  },

  updateAutocomplete(state, payload) {
    state.autocompleteResults = [];
    if (payload.list) {
      for (let i = 0; i < payload.list.length; i++) {
        state.autocompleteResults.push({
          title: payload.list[i].TITLE,
          type: payload.list[i].TYPE == 'beach' ? 'Пляж' : 'Мероприятие',
          link: `/${payload.list[i].TYPE}/${payload.list[i].ID}`
        });
      }
    }
  },

  showBeaches(state) {
    state.beachesOrEventsAreShown = false;
    state.searchPageResult = state.searchPageResultBeachBackup;
  },

  showEvents(state) {
    state.beachesOrEventsAreShown = true;
    state.searchPageResult = state.searchPageResultEventBackup;
  },

  updateSearchQuery(state, isQuery) {
    state.query = '?';

    if (isQuery) {
      state.query += `q=${state.searchInput}`;
      return;
    }

    state.searchPageResultEventBackup = [];

    if (state.searchParams.selects.cities.value.id != -1) {
      state.query += `city=${state.searchParams.selects.cities.value.id}&`;
    }
    if (state.searchParams.selects.beachTypes.value.id != -1) {
      state.query += `typeBeach=${state.searchParams.selects.beachTypes.value.id}&`;
    }
    if (state.searchParams.selects.modes.value.id != -1) {
      state.query += `mode=${state.searchParams.selects.modes.value.id}&`;
    }
    if (state.searchParams.selects.price.value.id != -1) {
      state.query += `paid=${state.searchParams.selects.price.value.id}&`;
    }
    if (state.searchParams.selects.searchBeachLengthFrom.value.id != -1) {
      state.query += `lengthFrom=${state.searchParams.selects.searchBeachLengthFrom.value.id}&`;
    }
    if (state.searchParams.selects.searchBeachLengthTo.value.id != -1) {
      state.query += `lengthTo=${state.searchParams.selects.searchBeachLengthTo.value.id}&`;
    }
    if (state.searchParams.selects.searchWaterTempFrom.value.id != -1) {
      state.query += `tempFrom=${state.searchParams.selects.searchWaterTempFrom.value.id}&`;
    }
    if (state.searchParams.selects.searchWaterTempTo.value.id != -1) {
      state.query += `tempTo=${state.searchParams.selects.searchWaterTempTo.value.id}&`;
    }
    state.searchParams.checkboxes.tags.forEach((e) => {
      if (e.value)
        state.query += `tags[]=${e.id}&`;
    })
    state.searchParams.checkboxes.addTags.forEach((e) => {
      if (e.value)
        state.query += `addTags[]=${e.id}&`;
    })
    state.searchParams.checkboxes.services.forEach((e) => {
      if (e.value)
        state.query += `services[]=${e.id}&`;
    })
    state.searchParams.checkboxes.infrastructures.forEach((e) => {
      if (e.value)
        state.query += `infrastructures[]=${e.id}&`;
    })

    if (Object.values(state.coords).length && state.radius) {
      console.log(state.radius, state.radius/1000, 'state.radius/1000')
      state.query += `coordinates=` + encodeURIComponent(Object.values(state.coords).join(',')) + '&diameter='+(state.radius/1000)+'&'
    }
    console.log(`&coordinates=` + encodeURIComponent(Object.values(state.coords).join(',')) + '&diameter='+state.radius, 'f')

    // cleaning up the last & or ? if it's empty
    state.query = state.query.slice(0, -1);
  },

  EMPTY_RESULTS(state) {
    state.searchPageResult = [];
  },

  emptySearchParams(state) {
    state.searchInput = '';
    state.searchParams.selects.cities.value = state.searchParams.selects.cities.options[0];
    state.searchParams.selects.beachTypes.value = state.searchParams.selects.beachTypes.options[0];
    state.searchParams.selects.modes.value = state.searchParams.selects.modes.options[0];
    state.searchParams.selects.price.value = state.searchParams.selects.price.options[0];
    state.searchParams.selects.searchBeachLengthFrom.value = state.searchParams.selects.searchBeachLengthFrom.options[0];
    state.searchParams.selects.searchBeachLengthTo.value = state.searchParams.selects.searchBeachLengthTo.options[0];
    state.searchParams.selects.searchWaterTempFrom.value = state.searchParams.selects.searchWaterTempFrom.options[0];
    state.searchParams.selects.searchWaterTempTo.value = state.searchParams.selects.searchWaterTempTo.options[0];

    state.searchParams.checkboxes.tags.forEach(v => v.value = false);
    state.searchParams.checkboxes.addTags.forEach(v => v.value = false);
    state.searchParams.checkboxes.services.forEach(v => v.value = false);
    state.searchParams.checkboxes.infrastructures.forEach(v => v.value = false);
    state.searchParams.coods = [];
    state.searchParams.radius = null;

  }
}

export const actions = {
  async search({commit, state}, [coords = null, city = -1]) {
    commit('SET_MY_COORDS', coords);
    commit('SET_MY_CITY', city);
    commit('updateSearchQuery');
    // if (state.query.length > 0) {
    commit('SET_SEARCH_RESULT', await this.$axios.$get(`search/filter${state.query}&count=9999`));
    // } else commit('EMPTY_RESULTS');
  },

  async searchQuery({commit, state, rootState}, [coords = null, city = -1]) {
    commit('updateSearchQuery', true);
    commit('SET_MY_COORDS', coords);
    commit('SET_MY_CITY', city);
    // if (state.query.length > 0) {
    console.log(state.query, 'state.query')
    let autocompleteRes = await this.$axios.$get(`search/autocomplete${state.query}`),
      beaches = {
        data: {
          list: []
        }
      },
      events = {
        data: {
          list: []
        }
      };
    // if (!autocompleteRes.data)
    //     return;
    if (autocompleteRes.data && autocompleteRes.data.list)
      for (let i = 0; i < autocompleteRes.data.list.length; i++) {
        if (rootState.beaches.data.list.find(v => v.ID == autocompleteRes.data.list[i].ID))
          beaches.data.list.push(rootState.beaches.data.list.find(v => v.ID == autocompleteRes.data.list[i].ID));
        if (rootState.events.data.list.find(v => v.ID == autocompleteRes.data.list[i].ID))
          events.data.list.push(rootState.events.data.list.find(v => v.ID == autocompleteRes.data.list[i].ID));
      }
    commit('SET_SEARCH_RESULT', beaches);
    commit('SET_SEARCH_RESULT_BEACH_BACKUP', beaches);
    commit('SET_SEARCH_RESULT_EVENT_BACKUP', events);
    // } else commit('EMPTY_RESULTS');
  },

  async searchAutocomplete({commit, state}, [coords = null, city = -1]) {
    console.warn(coords, city, 'coords city search autocomplite')
    commit('SET_MY_COORDS', coords);
    commit('SET_MY_CITY', city);
    let res = await this.$axios.$get(`https://crimea.air-dev.agency/api/app/search/autocomplete?q=${state.searchInput}`);
    if (res.data) {
      commit('updateAutocomplete', res.data);
    }
  },

  async updateTags({commit, state}, path) {
    commit('updateTags', path);
  },

  async updateSearchInput({commit}, input) {
    commit('updateSearchInput', input);
    commit('emptySearchParams');
  }
}

export const getters = {
  getRadiusIfCityExists: state => {
    if (state.searchPageResult && state.searchPageResult.data) {
      let {data: {list}} = state.searchPageResult,
        {my_city_id, my_coords} = state;

      if (list && list.length && my_city_id && my_city_id != -1 && Object.keys(my_coords).length) {
        let distances = [];
        list.forEach((e, i) => {

          let {COORDINATES} = e;
          /*lat2 = pos[0],
          lng2 = pos[1],*/
          COORDINATES = COORDINATES.split(',');
          let lat2 = COORDINATES[0], lng2 = COORDINATES[1]
          const {lat, lng} = my_coords;
          distances.push(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)));
        })
        return Math.max(...distances.filter(n => !Number.isNaN(n)));
      }
    }
    return null;
  },

  getSearchResult: (state) => {
    if (!state.searchPageResult.data) return null;

    let ret = [];

    // adding formatted beaches
    for (let i = 0; i < state.searchPageResult.data.list.length; i++) {
      ret.push({
        tempWater: state.searchPageResult.data.list[i].WEATHER ? state.searchPageResult.data.list[i].WEATHER.TEMP.WATER : (state.searchPageResult.data.list[i].BEACH ? state.searchPageResult.data.list[i].BEACH.WEATHER.TEMP.WATER : null),
        showFavorite: true,
        beachId: state.searchPageResult.data.list[i].ID,
        paid: state.searchPageResult.data.list[i].PAID,
        title: state.searchPageResult.data.list[i].NAME,
        location: state.searchPageResult.data.list[i].CITY ? state.searchPageResult.data.list[i].CITY.NAME : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.CITY ? state.searchPageResult.data.list[i].BEACH.CITY.NAME : null),
        locationId: state.searchPageResult.data.list[i].CITY ? state.searchPageResult.data.list[i].CITY.ID : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.CITY ? state.searchPageResult.data.list[i].BEACH.CITY.ID : null),
        pic: state.searchPageResult.data.list[i].PHOTOS && state.searchPageResult.data.list[i].PHOTOS[0] ? (state.api + state.searchPageResult.data.list[i].PHOTOS[0]) : null,
        mainLink: `${state.beachesOrEventsAreShown ? 'event' : 'beach'}/${state.searchPageResult.data.list[i].ID}`,
        beachLink: `${state.beachesOrEventsAreShown ? 'event' : 'beach'}/${state.searchPageResult.data.list[i].ID}`,
        beachLength: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_LINE_LENGTH == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_LINE_LENGTH) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_LINE_LENGTH == '' ? null : state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_LINE_LENGTH) : null),
        beachPrice: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_PRICE == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_PRICE) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_PRICE == '' ? null : state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_PRICE) : null),
        beachType: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_BEACH_TYPE ? state.searchPageResult.data.list[i].PARAMETERS.P_BEACH_TYPE.NAME : null) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_BEACH_TYPE ? state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_BEACH_TYPE.NAME : null) : null),
        beachWorktime: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_MODE ? state.searchPageResult.data.list[i].PARAMETERS.P_MODE.NAME : null) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_MODE ? state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_MODE.NAME : null) : null),
        beachSeabedType: null
      });

      if (state.searchPageResult.data.list[i].PARAMETERS && state.searchPageResult.data.list[i].PARAMETERS.P_BOTTOM) {
        ret[i].beachSeabedType = state.searchPageResult.data.list[i].PARAMETERS.P_BOTTOM.NAME;
      }

      if (state.searchPageResult.data.list[i].BEACH) { // if event
        ret[i].date = `${state.searchPageResult.data.list[i].ACTIVE_FROM} ${state.searchPageResult.data.list[i].ACTIVE_TO ? '-' : ''} ${state.searchPageResult.data.list[i].ACTIVE_TO ? state.searchPageResult.data.list[i].ACTIVE_TO : ''}`;
        ret[i].beach = state.searchPageResult.data.list[i].BEACH ? state.searchPageResult.data.list[i].BEACH.NAME : null;
      } else {
        ret[i].rating = state.searchPageResult.data.list[i].AVERAGE_RATING ? parseFloat(state.searchPageResult.data.list[i].AVERAGE_RATING) : (state.searchPageResult.data.list[i].BEACH ? parseFloat(state.searchPageResult.data.list[i].BEACH.AVERAGE_RATING) : null);
        if (state.searchPageResult.data.list[i].COORDINATES)
          ret[i].pos = state.searchPageResult.data.list[i].COORDINATES.length > 0 ? [parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[0]), parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[1])] : []
      }
    }

    let rn = new Date();
    ret.push({
      updateTime: `${rn.getHours()}:${rn.getMinutes()}:${rn.getSeconds()}`
    })


    return ret;
  },

  paramsShown: (state) => {
    return state.paramsShown;
  }
}
