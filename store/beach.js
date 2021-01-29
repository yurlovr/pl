import {
  mapBeach,
  mapBeachHugeSliderData,
  mapBeachMainData,
  mapBeachServices,
  mapBeachToAvgRating,
  mapBeachToSideMapWeatherData,
  mapBar,
} from '../helpers/mappers';

function mapBeachFull(beach) {
  return {
    ...mapBeachToAvgRating(beach),
    ...mapBeachToSideMapWeatherData(beach),
    ...mapBeachHugeSliderData(beach),
    ...mapBeachServices(beach),
    ...mapBeachMainData(beach),
    ...mapBeach(beach),
  };
}

export const state = () => ({
  beach: null,
  barsNRestos: null,
  similarBeaches: null,
  announcementData: null,
  announcements: null,
  tags: null,
  error: false,
});

export const actions = {
  async getBeach({ commit }, id) {
    try {
      const beach = await this.$axios.$get(`/beach/item?id=${id}`);
      commit('SET_BEACH', beach);
    } catch (e) {
      console.log('e', e)
      commit('SET_ERROR', true);
    }
  },
  async setBarnRestors({ commit }, id) {
    let barsNrestos = null;
    if (id) {
      barsNrestos = await this.$axios.$get(`/restaurant/list?beachId=${id}`);
    }
    commit('SET_BARS_N_RESTOS', barsNrestos);
  },
};

export const mutations = {
  SET_BEACH: (state, payload) => {
    if (!payload || !payload.data) return;
    const { item } = payload.data;
    state.beach = mapBeachFull(item);
  },

  SET_BARS_N_RESTOS: (state, payload) => {
    if (!payload) {
      state.barsNRestos = payload;
    } else {
      state.barsNRestos = payload.data.list.map(mapBar);
    }
  },

  SET_ERROR: (state, data) => {
    state.error = data;
  },
};

export const getters = {
  getInfraData: (state) => {
    const infra = state.beach.infrastructures
      .filter((i) => ![
        'ostanovki-obshchestvennogo-transporta',
        'parkovka',
      ].includes(i.code));
    return infra;
  },
  getSections: () => {
    const sections = [
      {
        title: 'Галерея',
        hash: 'gallery',
        show: true,
      },
      {
        title: 'Основные характеристики',
        hash: 'main-info',
        show: true,
      },
      {
        title: 'Инфраструктура',
        hash: 'infra',
        show: true,
      },
      {
        title: 'О пляже',
        hash: 'about',
        show: true,
      },
      {
        title: 'Услуги и аренда',
        hash: 'services',
        show: true,
      },
      {
        title: 'Парковки и общественный транспорт',
        hash: 'pt',
        show: true,
      },
      {
        title: 'График температуры воды',
        hash: 'water-temp',
        show: true,
      },
      {
        title: 'Ближайшие мероприятия',
        hash: 'events',
        show: true,
      },
      {
        title: 'Бары и рестораны',
        hash: 'barsNRestos',
        show: true,
      },
      {
        title: 'Мнения местных',
        hash: 'opinions',
        show: true,
      },
      {
        title: 'Отзывы гостей',
        hash: 'reviews',
        show: true,
      },
      {
        title: 'Фото посетителей',
        hash: 'visitor-pics',
        show: true,
      },
      {
        title: 'Похожие пляжи',
        hash: 'similar',
        show: true,
      },
    ];
    return sections;
  },
  getParking: (state) => {
    if (!state.beach) return null;
    const { beach } = state;

    const auto = beach.infrastructures
      .filter((v) => v.code === 'parkovka')
      .map((item) => ({
        // pos: item.COORDINATES ? item.COORDINATES.split(',').map(Number) : [],
        pos: item.pos,
        title: item.title,
        type: 'Автомобильная парковка',
        mode: '',
        address: '',
        price: '',
      }));
    const bus = beach.infrastructures
      .filter((v) => v.code === 'ostanovki-obshchestvennogo-transporta')
      .map((item) => ({
        // pos: item.COORDINATES ? item.COORDINATES.split(',').map(Number) : [],
        pos: item.pos,
        title: item.title || 'Автобусная остановка',
        buses: '',
        taxi: '',
      }));

    return {
      title: beach.title,
      pos: (beach.coordinates !== '')
        ? beach.coordinates
        : null,
      parkings: {
        auto,
        bus,
      },
    };
  },

  getError: (state) => state.error,
  getBarNrestors: (state) => state.barsNRestos,
};
