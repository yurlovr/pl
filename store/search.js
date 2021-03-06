import { getDistanceFromLatLonInKm } from "../assets/calcDistance";
import { mapBeach } from '~/helpers/mappers';

function getTitleForTags({ param, title }) {
  switch (param) {
    case 'searchBeachLengthFrom': return `Протяженность линии от ${title} м.`;
    case 'searchBeachLengthTo': return `Протяженность линии до ${title} м.`;
    case 'searchWaterTempFrom': return `Температура воды от ${title} ℃`;
    case 'searchWaterTempTo': return `Температура воды до ${title} ℃`;
    default: return title;
  }
}

function getSameTags(searchParams, tagsArray) {
  return tagsArray.map((tag) => {
    const findTag = searchParams.find((item) => item.id === tag);
    if (findTag) {
      return {
        ...findTag,
        value: true,
      };
    }
    return null;
  }).filter(Boolean);
}

function defaultSearchParams() {
  return {
    selects: {
      city: {
        value: {
          title: 'Любой город',
          id: -1,
        },
        param: 'city',
        options: [
          {
            title: 'Любой город',
            id: -1,
          },
        ],
      },
      typeBeach: {
        value: {
          title: 'Тип пляжа',
          id: -1,
        },
        param: 'typeBeach',
        options: [
          {
            title: 'Тип пляжа',
            id: -1,
          },
        ],
      },
      modes: {
        value: {
          title: 'Режим работы',
          id: -1,
        },
        param: 'modes',
        id: -1,
        options: [
          {
            title: 'Режим работы',
            id: -1,
          },
        ],
      },
      price: {
        value: {
          title: 'Стоимость',
          id: -1,
        },
        param: 'price',
        options: [
          {
            title: 'Стоимость',
            id: -1,
          },
        ],
      },
      searchBeachLengthFrom: {
        value: {
          title: 'Протяженность линии от, м',
          id: -1,
        },
        param: 'searchBeachLengthFrom',
        options: [
          {
            title: 'Протяженность линии от, м',
            id: -1,
          },
        ],
      },
      searchBeachLengthTo: {
        value: {
          title: 'До',
          id: -1,
        },
        param: 'searchBeachLengthTo',
        options: [
          {
            title: 'До',
            id: -1,
          },
        ],
      },
      searchWaterTempFrom: {
        value: {
          title: 'Температура воды от, °C',
          id: -1,
        },
        param: 'searchWaterTempFrom',
        options: [
          {
            title: 'Температура воды от, °C',
            id: -1,
          },
        ],
      },
      searchWaterTempTo: {
        value: {
          title: 'До',
          id: -1,
        },
        param: 'searchWaterTempTo',
        options: [
          {
            title: 'До',
            id: -1,
          },
        ],
      },
    },

    checkboxes: {
      tags: [],
      addTags: [],
      services: [],
      infrastructures: [],
    },
  };
}

export const state = () => ({
  my_coords: {},
  my_city_id: null,
  searchInput: '',
  paramsShown: false,
  searchParams: defaultSearchParams(),
  searchConfig: null,
  searchPageResultEventBackup: [],
  searchPageResultBeachBackup: [],
  searchPageResult: [],
  beachesOrEventsAreShown: false, // false - beaches, true - events
  autocompleteResults: [],
  query: '',
  tags: [],
  init: false, // SET_SEARCH gets called twice, so I will check if it's init or not to not call it the second time
  coords: {
    lat: 52.9760256,
    lng: 36.077568,
  },
  radius: null,
  f_loaded: false,
  searchResultCity: null,
  result: null,
  config: null,
  queryParams: {
    checkBoxes: [],
    selects: [],
  },
  searchResultFromParams: null,
  searchParamsDefault: null,
  renderTags: 0,
  sendRequest: false,
  showSearchBlock: false,
  searchInputValue: '',
});

export const mutations = {
  set_coords: (state, pos) => state.coords = pos,
  set_radius: (state, rad) => state.radius = rad,
  set_loaded: (state, s) => state.f_loaded = s,
  SET_MY_COORDS: (state, data) => state.my_coords = data,
  SET_MY_CITY: (state, city) => state.my_city_id = city,

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

  SET_SEARCH_PARAMS(state, payload) {
    // checkbox
    if (Array.isArray(payload)) {
      // так как тип всегда одинаковый в массиве
      const { type } = payload[0];
      state.searchParams = {
        ...state.searchParams,
        checkboxes: {
          ...state.searchParams.checkboxes,
          [type]: state.searchParams.checkboxes[type].map((item) => {
            const currentItem = payload.find((i) => i.id === item.id);
            return currentItem || item;
          }),
        },
      };
      return;
    }
    if (payload.type) {
      const { id, type, value } = payload;
      state.searchParams = {
        ...state.searchParams,
        checkboxes: {
          ...state.searchParams.checkboxes,
          [type]: state.searchParams.checkboxes[type].map((item) => {
            if (item.id === id) {
              return {
                ...item,
                value,
              };
            }
            return item;
          }),
        },
      };
    } else {
      // select
      const { param, option } = payload;
      state.searchParams = {
        ...state.searchParams,
        selects: {
          ...state.searchParams.selects,
          [param]: {
            ...state.searchParams.selects[param],
            value: option,
          },
        },
      };
    }
  },

  updateSearchInput(state, payload) {
    state.searchInput = payload;
  },

  updateAutocomplete(state, payload) {
    if (Array.isArray(payload) && !payload.length) {
      state.autocompleteResults = [];
    } else {
      const { list } = payload;
      state.autocompleteResults = list.map((item) => ({
        title: item.TITLE,
        type: item.TYPE === 'beach' ? 'Пляж' : 'Мероприятие',
        link: item.URL && item.URL.length ? item.URL : `/${item.TYPE}/${item.ID}`,
        hover: false,
      }));
    }
  },

  hoverAutocomplete(state, [index, value, field = 'hover']) {
    state.autocompleteResults[index][field] = value;
  },

  showBeaches(state) {
    state.beachesOrEventsAreShown = false;
    state.searchPageResult = state.searchPageResultBeachBackup;
  },

  showEvents(state) {
    state.beachesOrEventsAreShown = true;
    state.searchPageResult = state.searchPageResultEventBackup;
  },

  EMPTY_RESULTS(state) {
    state.searchPageResult = [];
  },
  SET_SEARCH_RESULT_CITY(state, payload) {
    const list = payload.list.map(mapBeach);
    state.searchResultCity = {
      ...payload,
      list,
    };
  },

  SET_SEARCH1(state, payload) {
    if (!payload) {
      state.result = null;
      return;
    }
    const { list } = payload;
    state.result = {
      ...payload,
      list: list.length ? list.map(mapBeach) : [],
    };
  },
  SET_SEARCH_CONFIG(state, payload) {
    const {
      addTags,
      beachTypes,
      cities,
      equipped,
      infrastructures,
      lineLengthList,
      modes,
      prices,
      services,
      tags,
      waterTempList,
    } = payload;
    // Все убрать в маппер. И вообще нафига нам вся эта простыня в запросе
    const configCities = cities.map((c) => ({
      title: c.NAME,
      id: c.ID,
    }));
    const configBeachTypes = beachTypes.map((beachType) => ({
      title: beachType.NAME,
      id: beachType.ID,
    }));
    const configModes = modes.map((mode) => ({
      title: mode.NAME,
      id: mode.ID,
    }));
    const lengthFromConfig = lineLengthList.map((line) => ({
      title: line,
      id: line,
    }));
    const lengthToConfig = lineLengthList.map((line) => ({
      title: line,
      id: line,
    }));
    const waterTempFromConfig = waterTempList.map((temp) =>({
      title: temp,
      id: temp,
    }));
    const waterTempToConfig = waterTempList.map((temp) =>({
      title: temp,
      id: temp,
    }));
    const pricesConfig = prices.map((price) => {
      const { name, id } = price;
      return {
        title: name,
        id,
      };
    });
    const equippedConfig = equipped.map((equip) => {
      const { name, id } = equip;
      return {
        title: name,
        id,
      };
    });
    const tagsConfig = tags.map((tag) => ({
      value: false,
      title: tag.NAME,
      id: tag.ID,
      type: 'tags',
    }));
    const addTagsConfig = addTags.map((addTag) => ({
      value: false,
      title: addTag.NAME,
      id: addTag.ID,
      type: 'addTags',
    }));

    const servicesConfig = services.map((service) => ({
      value: false,
      title: service.NAME,
      id: service.ID,
      type: 'services',
    }));
    const infraConfig = infrastructures.map((inf) => ({
      value: false,
      title: inf.NAME,
      id: inf.ID,
      type: 'infrastructures',
    }));
    state.searchParams = {
      ...state.searchParams,
      selects: {
        ...state.searchParams.selects,
        city: {
          ...state.searchParams.selects.city,
          options: state.searchParams.selects.city.options.concat(configCities),
        },
        typeBeach: {
          ...state.searchParams.selects.typeBeach,
          options: state.searchParams.selects.typeBeach.options.concat(configBeachTypes),
        },
        modes: {
          ...state.searchParams.selects.modes,
          options: state.searchParams.selects.modes.options.concat(configModes),
        },
        price: {
          ...state.searchParams.selects.price,
          options: state.searchParams.selects.price.options.concat(pricesConfig),
        },
        searchBeachLengthFrom: {
          ...state.searchParams.selects.searchBeachLengthFrom,
          options: state.searchParams.selects.searchBeachLengthFrom.options.concat(lengthFromConfig),
        },
        searchBeachLengthTo: {
          ...state.searchParams.selects.searchBeachLengthTo,
          options: state.searchParams.selects.searchBeachLengthTo.options.concat(lengthToConfig),
        },
        searchWaterTempFrom: {
          ...state.searchParams.selects.searchWaterTempFrom,
          options: state.searchParams.selects.searchWaterTempFrom.options.concat(waterTempFromConfig),
        },
        searchWaterTempTo: {
          ...state.searchParams.selects.searchWaterTempTo,
          options: state.searchParams.selects.searchWaterTempTo.options.concat(waterTempToConfig),
        },
      },
      checkboxes: {
        tags: [...tagsConfig],
        addTags: [...addTagsConfig],
        services: [...servicesConfig],
        infrastructures: [...infraConfig],
      },
    };
  },
  SET_QUERY_PARAMS(state, payload) {
    if (!payload) {
      state.queryParams = {
        checkBoxes: [],
        selects: [],
      };
      return;
    }
    if (payload.action === 'delete') {
      if (payload.type === 'select') {
        state.queryParams = {
          ...state.queryParams,
          selects: state.queryParams.selects.filter((select) => select.param !== payload.param),
        };
      } else {
        state.queryParams = {
          ...state.queryParams,
          checkBoxes: state.queryParams.checkBoxes.filter((checkBox) => checkBox.id !== payload.id),
        };
      }
      return;
    }
    // checkBoxs
    if ((payload.type && payload.value) || Array.isArray(payload)) {
      state.queryParams = {
        ...state.queryParams,
        checkBoxes: state.queryParams.checkBoxes.concat(payload),
      };
    }
    if (payload.type && !payload.value) {
      state.queryParams = {
        ...state.queryParams,
        checkBoxes: state.queryParams.checkBoxes.filter((param) => param.id !== payload.id),
      };
    }

    // selects
    if (payload.param && payload.option.id !== -1) {
      const oldValue = state.queryParams.selects.find((item) => item.param === payload.param);
      let selects = [...state.queryParams.selects];
      if (oldValue) {
        selects = selects.map((item) => {
          if (item.param === payload.param) {
            return payload;
          }
          return item;
        });
      }
      state.queryParams = {
        ...state.queryParams,
        selects: oldValue ? selects : selects.concat(payload),
      };
    }

    if (payload.param && payload.option.id === -1) {
      state.queryParams = {
        ...state.queryParams,
        selects: state.queryParams.selects.filter((select) => select.param !== payload.param),
      };
    }
  },
  SET_SEARCH_FROM_PARAMS(state, payload) {
    const list = payload.list.map(mapBeach);
    state.searchResultFromParams = {
      ...payload,
      list,
    };
  },
  SET_SEARCH_CONFIG_DEFAULT(state) {
    state.searchParamsDefault = state.searchParams;
  },
  SET_DEFAULT_SEARCH_PARAMS(state) {
    state.searchParams = state.searchParamsDefault;
  },
  SET_SEARCH_PARAMS_UPDATE(state, payload) {
    const {
      id,
      param,
      type,
      action,
    } = payload;
    if (action === 'delete') {
      if (type === 'select') {
        state.searchParams = {
          ...state.searchParams,
          selects: {
            ...state.searchParams.selects,
            [param]: {
              ...state.searchParams.selects[param],
              value: {
                id: payload.default.id,
                title: payload.default.title,
              },
            },
          },
        };
      } else {
        state.searchParams = {
          ...state.searchParams,
          checkboxes: {
            ...state.searchParams.checkboxes,
            [param]: state.searchParams.checkboxes[param].map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  value: false,
                };
              }
              return item;
            }),
          },
        };
      }
    }
  },
  SET_RENDER_TAGS(state, payload) {
    state.renderTags = payload;
  },
  SET_SEND_REQUEST(state, payload) {
    state.sendRequest = payload;
  },
  SET_SHOW_SEARCH(state, payload) {
    state.showSearchBlock = payload;
  },
  SET_SEARCH_INPUT_VALUE(state, payload) {
    state.searchInputValue = payload;
  },
  SET_DEFAULT_AUTOCOMPLETE(state) {
    state.autocompleteResults = [];
  },
};

export const actions = {

  async searchAutocomplete({commit, state}, [coords = null, city = -1]) {
    commit('SET_MY_COORDS', coords);
    commit('SET_MY_CITY', city);
    const res = await this.$axios.$get(`search/autocomplete?q=${state.searchInput}`);
    if (res.data) {
      commit('updateAutocomplete', res.data);
    }
  },
  async updateTags({commit, state}, path) {
    commit('updateTags', path);
  },
  async setSearchCityQuery({ commit }, payload) {
    const { city, page, count } = payload;
    const { data } = await this.$axios.$get(`search/filter?city=${city}&page=${page}&count=${count}`);
    commit('SET_SEARCH_RESULT_CITY', data);
  },
  setTags({ state, commit }, query) {
    if (!query) {
      commit('SET_QUERY_PARAMS', null);
      commit('SET_DEFAULT_SEARCH_PARAMS');
      return;
    }
    if (state.queryParams.checkBoxes.length
      && state.queryParams.checkBoxes.length) {
      return;
    }
    const tags = query['tags[]'];
    const addTags = query['addTags[]'];
    const services = query['services[]'];
    const infrastructures = query['infrastructures[]'];
    const {
      city,
      typeBeach,
      modes,
      price,
      searchBeachLengthFrom,
      searchBeachLengthTo,
      searchWaterTempFrom,
      searchWaterTempTo,
    } = query;
    if (city) {
      const currentCity = state.searchParams.selects.city.options.find((item) => item.id === city);
      commit('SET_QUERY_PARAMS', { param: 'city', option: currentCity });
      commit('SET_SEARCH_PARAMS', { param: 'city', option: currentCity });
    }

    if (modes) {
      const currentMode = state.searchParams.selects.modes.options.find((item) => item.id === modes);
      commit('SET_QUERY_PARAMS', { param: 'modes', option: currentMode });
      commit('SET_SEARCH_PARAMS', { param: 'modes', option: currentMode });
    }

    if (typeBeach) {
      const currentBeachTypes= state.searchParams.selects.typeBeach.options.find((item) => item.id === typeBeach);
      commit('SET_QUERY_PARAMS', { param: 'typeBeach', option: currentBeachTypes });
      commit('SET_SEARCH_PARAMS', { param: 'typeBeach', option: currentBeachTypes });
    }

    if (price) {
      const currentPrice = state.searchParams.selects.price.options.find((item) => item.id === +price);
      commit('SET_QUERY_PARAMS', { param: 'price', option: currentPrice });
      commit('SET_SEARCH_PARAMS', { param: 'price', option: currentPrice });
    }

    if (searchBeachLengthFrom) {
      const currentBeachLengthFrom= state.searchParams.selects.searchBeachLengthFrom.options.find((item) => item.id === +searchBeachLengthFrom);
      commit('SET_QUERY_PARAMS', { param: 'searchBeachLengthFrom', option: currentBeachLengthFrom });
      commit('SET_SEARCH_PARAMS', { param: 'searchBeachLengthFrom', option: currentBeachLengthFrom });
    }

    if (searchBeachLengthTo) {
      const currentBeachLengthTo= state.searchParams.selects.searchBeachLengthTo.options.find((item) => item.id === +searchBeachLengthTo);
      commit('SET_QUERY_PARAMS', { param: 'searchBeachLengthTo', option: currentBeachLengthTo });
      commit('SET_SEARCH_PARAMS', { param: 'searchBeachLengthTo', option: currentBeachLengthTo });
    }

    if (searchWaterTempFrom) {
      const currentWaterTempFrom= state.searchParams.selects.searchWaterTempFrom.options.find((item) => item.id === +searchWaterTempFrom);
      commit('SET_QUERY_PARAMS', { param: 'searchWaterTempFrom', option: currentWaterTempFrom });
      commit('SET_SEARCH_PARAMS', { param: 'searchWaterTempFrom', option: currentWaterTempFrom });
    }

    if (searchWaterTempTo) {
      const currentWaterTempTo= state.searchParams.selects.searchWaterTempTo.options.find((item) => item.id === +searchWaterTempTo);
      commit('SET_QUERY_PARAMS', { param: 'searchWaterTempTo', option: currentWaterTempTo });
      commit('SET_SEARCH_PARAMS', { param: 'searchWaterTempTo', option: currentWaterTempTo });
    }
    if (tags) {
      const currentTag = Array.isArray(tags)
        ? getSameTags(state.searchParams.checkboxes.tags, tags)
        : {
          ...state.searchParams.checkboxes.tags.find((item) => item.id === tags),
          value: true,
        };
      commit('SET_QUERY_PARAMS', currentTag);
      commit('SET_SEARCH_PARAMS', currentTag);
    }
    if (addTags) {
      const currentAddTag = Array.isArray(addTags)
        ? getSameTags(state.searchParams.checkboxes.addTags, addTags)
        : {
          ...state.searchParams.checkboxes.addTags.find((item) => item.id === addTags),
          value: true,
        };
      commit('SET_QUERY_PARAMS', currentAddTag);
      commit('SET_SEARCH_PARAMS', currentAddTag);
    }
    if (services) {
      const currentServices = Array.isArray(services)
        ? getSameTags(state.searchParams.checkboxes.services, services)
        : {
          ...state.searchParams.checkboxes.services.find((item) => item.id === services),
          value: true,
        };
      commit('SET_QUERY_PARAMS', currentServices);
      commit('SET_SEARCH_PARAMS', currentServices);
    }
    if (infrastructures) {
      const currentInfra = Array.isArray(infrastructures)
        ? getSameTags(state.searchParams.checkboxes.infrastructures, infrastructures)
        : {
          ...state.searchParams.checkboxes.infrastructures
            .find((item) => item.id === infrastructures),
          value: true,
        };
      commit('SET_QUERY_PARAMS', currentInfra);
      commit('SET_SEARCH_PARAMS', currentInfra);
    }
  },
  setUpdateSearchTags({ commit }, payload) {
    commit('SET_QUERY_PARAMS', { ...payload, action: 'delete' });
    commit('SET_SEARCH_PARAMS_UPDATE', { ...payload, action: 'delete' });
  },
  async setSeach({ commit }, payload) {
    if (!payload) {
      commit('SET_SEARCH1', payload);
      return;
    }
    const { page, count, ...params } = payload;
    const paramsForQuery = Object.keys(params)
      .map((key) => {
        if (Array.isArray(params[key])) {
          return params[key].map((item) => `${key}=${item}`).join('&');
        }
        return `${key}=${params[key]}`;
      }).join('&');
    const { data } = await this.$axios.$get(`search/filter?${paramsForQuery}&page=${page}&count=${count}`);
    commit('SET_SEARCH1', data);
  },
  setSearchParams({ commit }, payload) {
    commit('SET_QUERY_PARAMS', payload);
    commit('SET_SEARCH_PARAMS', payload);
  },
  setDefaultSearchParams({ commit }) {
    commit('SET_DEFAULT_SEARCH_PARAMS');
  },
  setRenderTags({ commit }, payload) {
    commit('SET_RENDER_TAGS', payload);
  },
  setSendRequest({ commit }, payload) {
    commit('SET_SEND_REQUEST', payload);
  },
  setShowSearch({ commit }, payload) {
    commit('SET_SHOW_SEARCH', payload);
  },
  setSearchInputValue({ commit, dispatch }, payload) {
    commit('SET_SEARCH_INPUT_VALUE', payload);
    if (!payload.length) {
      commit('SET_DEFAULT_AUTOCOMPLETE');
    }
    if (payload.length >= 3) {
      dispatch('setSearchAutocomplete', payload);
    }
  },
  async setSearchAutocomplete({ commit }, payload) {
    const { data } = await this.$axios.$get(`search/autocomplete?q=${payload}`);
    commit('updateAutocomplete', data);
  },
};

export const getters = {
  getRadiusIfCityExists: (state) => {
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
        access: state.searchPageResult.data.list[i].ACCESS || null,
        tempWater: state.searchPageResult.data.list[i].WEATHER ? state.searchPageResult.data.list[i].WEATHER.TEMP.WATER : (state.searchPageResult.data.list[i].BEACH ? state.searchPageResult.data.list[i].BEACH.WEATHER.TEMP.WATER : null),
        showFavorite: true,
        beachId: state.searchPageResult.data.list[i].ID,
        paid: state.searchPageResult.data.list[i].PAID,
        title: state.searchPageResult.data.list[i].NAME,
        location: state.searchPageResult.data.list[i].CITY ? state.searchPageResult.data.list[i].CITY.NAME : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.CITY ? state.searchPageResult.data.list[i].BEACH.CITY.NAME : null),
        locationId: state.searchPageResult.data.list[i].CITY ? state.searchPageResult.data.list[i].CITY.ID : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.CITY ? state.searchPageResult.data.list[i].BEACH.CITY.ID : null),
        pic: state.searchPageResult.data.list[i].PHOTOS && state.searchPageResult.data.list[i].PHOTOS.big && state.searchPageResult.data.list[i].PHOTOS.big.length ? state.searchPageResult.data.list[i].PHOTOS.big[0].path : null,
        mainLink: `${state.beachesOrEventsAreShown ? 'event' : 'beach'}/${state.searchPageResult.data.list[i].ID}`,
        beachLink: `${state.beachesOrEventsAreShown ? 'event' : 'beach'}/${state.searchPageResult.data.list[i].ID}`,
        humanLink: `${state.beachesOrEventsAreShown ? 'event' : 'beach'}/${state.searchPageResult.data.list[i].CODE ? state.searchPageResult.data.list[i].CODE : state.searchPageResult.data.list[i].ID}`,
        beachLength: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_LINE_LENGTH == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_LINE_LENGTH) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_LINE_LENGTH == '' ? null : state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_LINE_LENGTH) : null),
        beachPrice: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_PRICE == '' ? null : state.searchPageResult.data.list[i].PARAMETERS.P_PRICE) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_PRICE == '' ? null : state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_PRICE) : null),
        beachType: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_BEACH_TYPE ? state.searchPageResult.data.list[i].PARAMETERS.P_BEACH_TYPE.NAME : null) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_BEACH_TYPE ? state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_BEACH_TYPE.NAME : null) : null),
        beachWorktime: state.searchPageResult.data.list[i].PARAMETERS ? (state.searchPageResult.data.list[i].PARAMETERS.P_MODE ? state.searchPageResult.data.list[i].PARAMETERS.P_MODE.NAME : null) : (state.searchPageResult.data.list[i].BEACH && state.searchPageResult.data.list[i].BEACH.PARAMETERS ? (state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_MODE ? state.searchPageResult.data.list[i].BEACH.PARAMETERS.P_MODE.NAME : null) : null),
        beachSeabedType: null,
        desc: state.searchPageResult.data.list[i].DESCRIPTION || null,
      });

      if (state.searchPageResult.data.list[i].PARAMETERS && state.searchPageResult.data.list[i].PARAMETERS.P_BOTTOM) {
        ret[i].beachSeabedType = state.searchPageResult.data.list[i].PARAMETERS.P_BOTTOM.NAME;
      }

      if (state.searchPageResult.data.list[i].BEACH) { // if event
        ret[i].date = `${state.searchPageResult.data.list[i].ACTIVE_FROM} ${state.searchPageResult.data.list[i].ACTIVE_TO ? '-' : ''} ${state.searchPageResult.data.list[i].ACTIVE_TO ? state.searchPageResult.data.list[i].ACTIVE_TO : ''}`;
        ret[i].beach = state.searchPageResult.data.list[i].BEACH ? state.searchPageResult.data.list[i].BEACH.NAME : null;
      } else {
        ret[i].rating = state.searchPageResult.data.list[i].AVERAGE_RATING ? parseFloat(state.searchPageResult.data.list[i].AVERAGE_RATING) : (state.searchPageResult.data.list[i].BEACH ? parseFloat(state.searchPageResult.data.list[i].BEACH.AVERAGE_RATING) : null);
        if (state.searchPageResult.data.list[i].COORDINATES) {
          ret[i].pos = state.searchPageResult.data.list[i].COORDINATES.length > 0 ? [parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[0]), parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[1])] : [];
          ret[i].coordinates = state.searchPageResult.data.list[i].COORDINATES.length > 0 ? [parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[0]), parseFloat(state.searchPageResult.data.list[i].COORDINATES.split(',')[1])] : []
          ret[i].show_distance = true;
        }
      }
    }

    let rn = new Date();
    ret.push({
      updateTime: `${rn.getHours()}:${rn.getMinutes()}:${rn.getSeconds()}`
    })


    return ret;
  },

  paramsShown: (state) => state.paramsShown,
  getSearchResultCity: (state) => state.searchResultCity,
  getSearch: (state) => state.result,
  getSearchConfig: (state) => state.searchConfig,
  getQueryParams: (state) => {
    let checkBoxString = '';
    let selectsString = '';
    if (state.queryParams.checkBoxes.length) {
      checkBoxString = state.queryParams.checkBoxes.map((item) => `${item.type}[]=${item.id}`)
        .join('&');
    }
    if (state.queryParams.selects.length) {
      selectsString = state.queryParams.selects.map((item) => `${item.param}=${item.option.id}`)
        .join('&');
    }
    if (checkBoxString && selectsString) {
      return `?${checkBoxString}&${selectsString}`;
    }
    if (!checkBoxString && selectsString) {
      return `?${selectsString}`;
    }
    if (!selectsString && checkBoxString) {
      return `?${checkBoxString}`;
    }
    return null;
  },
  getSearchResultFromParams: (state) => state.searchResultFromParams,
  getTags: (state) => {
    const defaultParams = defaultSearchParams();
    const selectTags = state.queryParams.selects.map((item) => ({
      param: item.param,
      value: {
        title: getTitleForTags({
          param: item.param,
          title: item.option.title,
        }),
      },
      id: item.option.id,
      default: {
        id: -1,
        title: defaultParams.selects[item.param].value.title,
      },
      type: 'select',
    }));
    const checkBoxTags = state.queryParams.checkBoxes.map((item) => ({
      param: item.type,
      value: {
        title: item.title,
      },
      default: null,
      type: 'check',
      id: item.id,
    }));
    const result = [...selectTags, ...checkBoxTags];
    return result.length ? result : null;
  },
  getRenderTags: (state) => state.renderTags,
  getSendRequest: (state) => state.sendRequest,
  getShowSearch: (state) => state.showSearchBlock,
  getSearchInputValue: (state) => state.searchInputValue,
};
