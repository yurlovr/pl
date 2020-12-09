import { mapBeach } from '~/helpers/mappers';

export const state = () => ({
  type: null,
  query: null,
  popularBeach: null,
  allBeaches: null,
  page: 1,
});

export const mutations = {
  setType: (state, payload) => {
    state.type = payload;
  },

  setQuery: (state, payload) => {
    state.query = payload;
  },
  SET_POPULAR_BEACHES: (state, data) => {
    state.popularBeach = data;
  },
  SET_ALL_BEACHES: (state, data) => {
    state.allBeaches = data;
  },
  SET_PAGE: (state, data) => {
    state.page = data;
  },
};

export const actions = {
  async setPopularBeaches({ commit }, payload) {
    const { page, count } = payload;
    const { data } = await this.$axios.$get(`beach/top?count=${count}&page=${page}`);
    commit('SET_POPULAR_BEACHES', {
      ...data,
      list: data.list.map(mapBeach),
      title: 'Популярные пляжи',
    });
  },
  async setAllBeaches({ commit }, payload) {
    const { page, count } = payload;
    const { data } = await this.$axios.$get(`/beach/list?count=${count}&page=${page}`);
    commit('SET_ALL_BEACHES', {
      ...data,
      list: data.list.map(mapBeach),
      title: 'Каталог пляжей',
    });
  },
  setPage({ commit }, page) {
    commit('SET_PAGE', page);
  },
};

export const getters = {
  data: (state, getters, rootState, rootGetters) => {
    if (!state.type) return null;

    const ret = {};

    if (state.type === 'beach') {
      // ret.title = 'Каталог пляжей';
      // ret.grid = rootGetters.beaches.slice();
    } else if (state.type === 'event') {
      ret.title = 'Каталог мероприятий';
      ret.grid = rootGetters.events.slice();
    }
    if (!ret.grid) ret.grid = [];
    else if (state.query) {
      if (state.type === 'beach') {
        if (state.query.popular === null) {
          ret.grid = ret.grid.sort((a, b) => a.rating < b.rating).splice(0, 45);
        }
        if (state.query.family === null) {
          ret.grid = ret.grid.filter((v) => (v.tags && v.tags.find((f) => f.title == 'Отдых для всей семьи'))).splice(0, 45);
        }
        if (state.query['tags[]'] || state.query['addTags[]']) {
          let queryTagCount = 0; let tags; let
            addTags;
          if (state.query['tags[]']) {
            tags = state.query['tags[]'];
            queryTagCount += Array.isArray(tags) ? tags.length : 1;
          }
          if (state.query['addTags[]']) {
            addTags = state.query['addTags[]'];
            queryTagCount += Array.isArray(addTags) ? addTags.length : 1;
          }

          if (queryTagCount >= 3) {
            let curTagCount;
            for (let i = 0; i < ret.grid.length; i++) {
              curTagCount = 0;
              if (tags) {
                for (let j = 0; j < tags.length; j++) {
                  if (ret.grid[i].tags.find((v) => v.id == tags[j])) curTagCount++;
                }
              }
              if (addTags) {
                for (let j = 0; j < addTags.length; j++) {
                  if (ret.grid[i].addTags.find((v) => v.id == addTags[j])) curTagCount++;
                }
              }
              if (curTagCount < 3) ret.grid.splice(i, 1);
            }
          }
        }

        if (state.query.fromBeach) {
          ret.grid = ret.grid.filter((v) => v.beachId != state.query.fromBeach);
        }
      } else if (state.type == 'event') {
        if (state.query.beach) {
          ret.grid = ret.grid.filter((v) => v.beachId == state.query.beach);
        }

        if (state.query.fromEvent) {
          ret.grid = ret.grid.filter((v) => v.eventId != state.query.fromEvent);
        }
      }
      if (state.query.city) {
        ret.grid = ret.grid.filter((v) => v.locationId == state.query.city);
      }
      // ret.grid = ret.grid.slice(0, 45); // max 45 items if there's a query (why? client knows)
    }

    return ret;
  },
  getPopularBeaches: (state) => state.popularBeach,
  getAllBeaches: (state) => state.allBeaches,
  getPage: (state) => state.page,
};
