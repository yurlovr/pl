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
    state.mappedEvents = mapEvents(payload.data.list);
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
    return mapBeaches(state.beaches.data.list)
  },
  events: (state) => {
    // console.log('getter events');
    return mapEvents(state.events.data.list)
  },
  mapEntity: (state) => {
    // console.log('getter mapEntity');
    return mapEntity(state.map_entity.data.list)
  }
}

function mapEntity(list = []) {
  return list.map(item => {
    return {
      coordinates: item.COORDINATES.length ? item.COORDINATES.split(',') : [],
      id:          item.ID,
      name:        item.NAME,
      preview:     item.PREVIEW,
      url:         item.URL,
      photos:      item.PHOTOS,
      type:        item.TYPE,
      description: item.DESCRIPTION,
    }
  })
}

function mapEvents(list = []) {
  return list.map(item => {
    return {
      tempWater: item.BEACH && item.BEACH.WEATHER && item.BEACH.WEATHER.TEMP ? item.BEACH.WEATHER.TEMP.WATER : null,
      date: item.ACTIVE_FROM,
      showFavorite: true,
      beach: item.BEACH ? item.BEACH.NAME : null,
      paid: item.PAID,
      title: item.NAME,
      location: item.BEACH && item.BEACH.CITY ? item.BEACH.CITY.NAME : null,
      pic: item.PHOTOS ? item.PHOTOS.medium[0].path : null,
      mainLink: `event/${item.ID}`,
      humanLink: item.CODE ? `event/${item.CODE}`: null,
      beachLink: item.BEACH ? `beach/${item.BEACH.CODE}` : null,
      locationId: item.BEACH && item.BEACH.CITY ? item.BEACH.CITY.ID : null,
      eventId: item.ID,
      beachId: item.BEACH ? item.BEACH.ID : null
    }
  })

}

function mapBeaches(list = []) {
  return list.map(item => {
    return {
      access: item.ACCESS || null,
      tempWater: item.WEATHER && item.WEATHER.TEMP ? item.WEATHER.TEMP.WATER : null,
      showFavorite: true,
      paid: item.PAID,
      rating: parseFloat(item.AVERAGE_RATING),
      title: item.NAME,
      location: item.CITY ? item.CITY.NAME : null,
      pic: item.PHOTOS ? item.PHOTOS.medium[0].path : null,
      mainLink: `beach/${item.ID}`,
      beachLink: `beach/${item.ID}`,
      humanLink: item.CODE ? `beach/${item.CODE}` : null,
      locationId: item.CITY ? item.CITY.ID : null,
      beachId: item.ID,
      tags: item.TAGS ? item.TAGS.map(v => ({
        id: v.ID,
        title: v.NAME,
      })) : null,
      addTags: item.ADD_TAGS ? item.ADD_TAGS.map(v => ({
        id: v.ID,
        title: v.NAME
      })) : null,
      pos: item.COORDINATES && item.COORDINATES.length > 0 ? [parseFloat(item.COORDINATES.split(',')[0]), parseFloat(item.COORDINATES.split(',')[1])] : [],
      beachLength: item.PARAMETERS ? (item.PARAMETERS.P_LINE_LENGTH == '' ? null : item.PARAMETERS.P_LINE_LENGTH) : null,
      beachPrice: item.PARAMETERS ? (item.PARAMETERS.P_PRICE == '' ? null : item.PARAMETERS.P_PRICE) : null,
      beachType: item.PARAMETERS ? (item.PARAMETERS.P_BEACH_TYPE ? item.PARAMETERS.P_BEACH_TYPE.NAME : null) : null,
      beachWorktime: item.PARAMETERS ? (item.PARAMETERS.P_MODE ? item.PARAMETERS.P_MODE.NAME : null) : null,
      beachSeabedType: null,
      coordinates: item.COORDINATES && item.COORDINATES.length > 0 ? [parseFloat(item.COORDINATES.split(',')[0]), parseFloat(item.COORDINATES.split(',')[1])] : [],
      show_distance: true,
    }
  })
}

function mapIDs(list = []) {
  return list.map(i => i.ID)
}
