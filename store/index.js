export const state = () => ({
  beaches: [],
  events: [],
  map_entity: []
})

export const mutations = {
  SET_ALL_BEACHES: (state, payload) => {
    state.beaches = payload;
  },

  SET_ALL_EVENTS: (state, payload) => {
    state.events = payload;
  },

  SET_MAP_ENTITY: (state, payload) => {
    state.map_entity = payload;
  }
}

export const actions = {
  async nuxtServerInit({commit}) {
    commit('SET_ALL_BEACHES', await this.$axios.$get('/beach/list?count=9999'));
    commit('SET_ALL_EVENTS', await this.$axios.$get('/event/list?count=9999'));
    commit('search/SET_SEARCH', await this.$axios.$get('search/config'));
    commit('SET_MAP_ENTITY', await this.$axios.$get('/map-entity/list?count=9999'));
  }
}

export const getters = {
  beachIds: (state) => {
    if (!state.beaches.data) return [];

    let ret = [];

    for (let i = 0; i < state.beaches.data.list.length; i++) {
      ret.push(state.beaches.data.list[i].ID);
    }

    return ret;
  },

  eventIds: (state) => {
    if (!state.events.data) return [];

    let ret = [];

    for (let i = 0; i < state.events.data.list.length; i++) {
      ret.push(state.events.data.list[i].ID);
    }

    return ret;
  },

  beaches: (state) => {
    if (!state.beaches.data) return [];

    let ret = [];

    for (let i = 0; i < state.beaches.data.list.length; i++) {
      ret.push({
        id: state.beaches.data.list[i].ID || null,
        access: state.beaches.data.list[i].ACCESS || null,
        tempWater: state.beaches.data.list[i].WEATHER && state.beaches.data.list[i].WEATHER.TEMP ? state.beaches.data.list[i].WEATHER.TEMP.WATER : null,
        showFavorite: true,
        paid: state.beaches.data.list[i].PAID,
        rating: parseFloat(state.beaches.data.list[i].AVERAGE_RATING),
        title: state.beaches.data.list[i].NAME,
        location: state.beaches.data.list[i].CITY ? state.beaches.data.list[i].CITY.NAME : null,
        pic: state.beaches.data.list[i].PHOTOS ? state.beaches.data.list[i].PHOTOS.medium[0].path : null,
        mainLink: `beach/${state.beaches.data.list[i].ID}`,
        beachLink: `beach/${state.beaches.data.list[i].ID}`,
        humanLink: state.beaches.data.list[i].CODE ? `beach/${state.beaches.data.list[i].CODE}` : null,
        locationId: state.beaches.data.list[i].CITY ? state.beaches.data.list[i].CITY.ID : null,
        beachId: state.beaches.data.list[i].ID,
        tags: state.beaches.data.list[i].TAGS ? state.beaches.data.list[i].TAGS.map(v => {
          return {
            id: v.ID,
            title: v.NAME
          }
        }) : null,
        addTags: state.beaches.data.list[i].ADD_TAGS ? state.beaches.data.list[i].ADD_TAGS.map(v => {
          return {
            id: v.ID,
            title: v.NAME
          }
        }) : null,
        pos: state.beaches.data.list[i].COORDINATES && state.beaches.data.list[i].COORDINATES.length > 0 ? [parseFloat(state.beaches.data.list[i].COORDINATES.split(',')[0]), parseFloat(state.beaches.data.list[i].COORDINATES.split(',')[1])] : [],
        beachLength: state.beaches.data.list[i].PARAMETERS ? (state.beaches.data.list[i].PARAMETERS.P_LINE_LENGTH == '' ? null : state.beaches.data.list[i].PARAMETERS.P_LINE_LENGTH) : null,
        beachPrice: state.beaches.data.list[i].PARAMETERS ? (state.beaches.data.list[i].PARAMETERS.P_PRICE == '' ? null : state.beaches.data.list[i].PARAMETERS.P_PRICE) : null,
        beachType: state.beaches.data.list[i].PARAMETERS ? (state.beaches.data.list[i].PARAMETERS.P_BEACH_TYPE ? state.beaches.data.list[i].PARAMETERS.P_BEACH_TYPE.NAME : null) : null,
        beachWorktime: state.beaches.data.list[i].PARAMETERS ? (state.beaches.data.list[i].PARAMETERS.P_MODE ? state.beaches.data.list[i].PARAMETERS.P_MODE.NAME : null) : null,
        beachSeabedType: null,
        coordinates: state.beaches.data.list[i].COORDINATES && state.beaches.data.list[i].COORDINATES.length > 0 ? [parseFloat(state.beaches.data.list[i].COORDINATES.split(',')[0]), parseFloat(state.beaches.data.list[i].COORDINATES.split(',')[1])] : [],
        show_distance: true,
      });
    }

    return ret;
  },

  events: (state) => {
    if (!state.events.data) return [];

    let ret = [];

    for (let i = 0; i < state.events.data.list.length; i++) {
      ret.push({
        tempWater: state.events.data.list[i].BEACH && state.events.data.list[i].BEACH.WEATHER && state.events.data.list[i].BEACH.WEATHER.TEMP ? state.events.data.list[i].BEACH.WEATHER.TEMP.WATER : null,
        date: state.events.data.list[i].ACTIVE_FROM,
        showFavorite: true,
        beach: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.NAME : null,
        paid: state.events.data.list[i].PAID,
        title: state.events.data.list[i].NAME,
        location: state.events.data.list[i].BEACH && state.events.data.list[i].BEACH.CITY ? state.events.data.list[i].BEACH.CITY.NAME : null,
        pic: state.events.data.list[i].PHOTOS ? state.events.data.list[i].PHOTOS.medium[0].path : null,
        mainLink: `event/${state.events.data.list[i].ID}`,
        humanLink: state.events.data.list[i].CODE ? `event/${state.events.data.list[i].CODE}`: null,
        beachLink: state.events.data.list[i].BEACH ? `beach/${state.events.data.list[i].BEACH.CODE}` : null,
        locationId: state.events.data.list[i].BEACH && state.events.data.list[i].BEACH.CITY ? state.events.data.list[i].BEACH.CITY.ID : null,
        eventId: state.events.data.list[i].ID,
        beachId: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.ID : null
      });
    }

    return ret;
  },

  mapEntity: (state) => {
    if (!state.map_entity.data) return [];

    let ret = [];

    for (let i = 0; i < state.map_entity.data.list.length; i++) {
      ret.push({
        coordinates: state.map_entity.data.list[i].COORDINATES.length ? state.map_entity.data.list[i].COORDINATES.split(',') : [],
        id: state.map_entity.data.list[i].ID,
        name: state.map_entity.data.list[i].NAME,
        preview: state.map_entity.data.list[i].PREVIEW,
        url: state.map_entity.data.list[i].URL,
        photos: state.map_entity.data.list[i].PHOTOS,
        type: state.map_entity.data.list[i].TYPE
      });
    }

    return ret;
  }
}
