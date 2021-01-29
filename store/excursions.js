import { mapExcursion } from '../helpers/mappers';

const setTitle = (page) => {
  switch (page) {
    case 'beach': return {
      title: 'Экскурсии рядом',
      subtitle: 'Наша подборка экскурсий, основанная на ваших отзывах',
    };
    default: return {
      title: 'Все экскурсии Крыма',
      subtitle: 'Наша подборка экскурсий, основанная на ваших отзывах',
    };
  }
};

export const state = () => ({
  excursions: {
    main: null,
    page: null,
  },
});

export const actions = {
  async setExcursions({ commit, state }, payload) {
    const { page, excursionsIds } = payload;
    if (page === 'main' && state.excursions.main) return;
    if (page) {
      const query = `?${excursionsIds.map((item) => `id[]=${item}`).join('&')}`;
      const excursions = await this.$axios.$get(`/excursion/list${query}`);
      commit('SET_EXCURSIONS', { excursions, page });
    } else {
      commit('SET_EXCURSIONS_DEFAULT');
    }
    // if (page === 'main' && state.hotels.main) return;
    // if (page) {
    //   const path = selectPathFromPage(page, beachId);
    //   const hotels = await this.$axios.$get(path);
    //   const coordinat = this.$cookies.get('last_coordinates') || {};
    //   commit('SET_HOTELS', { hotels, coordinat, page });
    // } else {
    //   commit('SET_HOTELS_DEFAULT');
    // }
  },
};

export const mutations = {
  SET_EXCURSIONS: (state, payload) => {
    const { page, excursions } = payload;
    const { list, pagination } = excursions.data;
    const { countElements } = pagination;
    const excursionsList = list.map(mapExcursion);
    if (page === 'beach') {
      state.excursions = {
        ...state.excursions,
        page: {
          ...setTitle(page),
          beachNumber: countElements,
          showMore: {
            type: 'excursions',
            query: '?another',
          },
          beachSliderData: {
            slideNumber: 6,
            cardData: excursionsList.map((item) => ({
              ...item,
              ignore_global_km: true,
            })),
          },
        },
      };
    } else {
      state.excursions = {
        ...state.excursions,
        main: {
          ...setTitle(page),
          beachNumber: countElements,
          showMore: {
            type: 'excursions',
            query: '?another',
          },
          beachSliderData: {
            slideNumber: 6,
            cardData: excursionsList,
          },
        },
      };
    }
  },
  SET_EXCURSIONS_DEFAULT: (state) => {
    state.hotels = {
      ...state.hotels,
      page: null,
    };
  },
};
export const getters = {
  getExcursions: (state) => state.excursions,
};
