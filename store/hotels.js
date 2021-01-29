import { mapPlace } from '../helpers/mappers';
import { getDistanceFromLatLonInKm } from '~/assets/calcDistance';

const distance = (d, coordinat) => {
  if (d && d.length === 2 && Object.keys(coordinat).length) {
    const lat2 = d[0];
    const lng2 = d[1];
    const { lat, lng } = coordinat;
    return Number(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)).toFixed(1)).toString().replace(/\./, ',');
  }
  return 0;
};

const selectPathFromPage = (page, beachId) => {
  switch (page) {
    case 'event': return '/hotel/beachList?count=10';
    case 'beach': return `/hotel/beachList?count=10&beachId=${beachId}`;
    default: return '/hotel/list?count=10';
  }
};

const setTitle = (page) => {
  switch (page) {
    case 'event':
    case 'beach': return {
      title: 'Забронируй номер рядом с пляжем',
      subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
    };
    default: return {
      title: 'Где остановиться в Крыму',
      subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
    };
  }
};

export const state = () => ({
  hotels: {
    main: null,
    page: null,
  },
});

export const actions = {
  async setHotels({ commit, state }, payload) {
    const { page, beachId } = payload;
    if (page === 'main' && state.hotels.main) return;
    if (page) {
      const path = selectPathFromPage(page, beachId);
      const hotels = await this.$axios.$get(path);
      const coordinat = this.$cookies.get('last_coordinates') || {};
      commit('SET_HOTELS', { hotels, coordinat, page });
    } else {
      commit('SET_HOTELS_DEFAULT');
    }
  },
};

export const mutations = {
  SET_HOTELS: (state, payload) => {
    const { list, pagination } = payload.hotels.data;
    const { coordinat, page } = payload;

    const { countElements } = pagination;

    const placeList = list.map(mapPlace);

    if (['event', 'beach'].includes(page)) {
      state.hotels = {
        ...state.hotels,
        page: {
          ...setTitle(page),
          beachNumber: countElements,
          showMore: {
            type: 'beach',
            query: '?another',
          },
          beachSliderData: {
            slideNumber: 6,
            cardData: placeList.map((item) => ({
              ...item,
              ignore_global_km: true,
              dist: distance(item.coordinates, coordinat),
            })),
          },
        },
      };
    } else {
      state.hotels = {
        ...state.hotels,
        main: {
          ...setTitle(page),
          beachNumber: countElements,
          showMore: {
            type: 'beach',
            query: '?another',
          },
          beachSliderData: {
            slideNumber: 6,
            cardData: placeList,
          },
        },
      };
    }
  },
  SET_HOTELS_DEFAULT: (state) => {
    state.hotels = {
      ...state.hotels,
      page: null,
    };
  },
};
export const getters = {
  getHotels: (state) => state.hotels,
};
