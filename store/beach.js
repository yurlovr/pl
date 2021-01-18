import { sample, isEmpty } from 'lodash'
import {
  mapAnnounce,
  mapBeach,
  mapBeachHugeSliderData,
  mapBeachMainData,
  mapBeachServices,
  mapBeachToAvgRating,
  mapBeachToSideMapWeatherData,
  mapEvent,
  mapOpinion,
  mapPlace,
  mapBar,
  mapReview,
  mapService,
  mapVisitors,
} from "../helpers/mappers";

export const state = () => ({
    beach: null,
    temperatures: null,
    events: null,
    barsNRestos: null,
    opinions: null,
    reviews: null,
    similarBeaches: null,
    visitorPics: null,
    announcementData: null,
    announcements: null,
    tags: null,
    any_places: [],
    hotels: []
})

export const actions = {
    async getBeach({commit, state}, id) {
        let error;
        commit('SET_BEACH', await this.$axios.$get(`/beach/item?id=${id}`).catch((e) => {
            console.error(e)
            error = 404;
            return {};
        }));
        if (error) return error;
        let beach_id = state.beach.id

        const [
          events,
          bars_n_restos,
          opinions,
          temperatures,
          reviews,
          visitor_pics,
          announcement_data,
          any_places,
          hotels,
        ] = await Promise.all([
          this.$axios.$get(`/event/list?beachId=${beach_id}`),
          this.$axios.$get(`/restaurant/list?beachId=${beach_id}`),
          this.$axios.$get(`/opinion/list?entityId=${beach_id}`),
          this.$axios.$get(`/weather/list`),
          this.$axios.$get(`/review/list?entityId=${beach_id}&count=9999`),
          this.$axios.$get(`/socialPhoto/list?entityId=${beach_id}&count=10`),
          this.$axios.$get(`/banner/list?page=/beach`),
          this.$axios.$get('/hotel/list?count=10'),
          this.$axios.$get(`/hotel/beachList?count=10&beachId=${beach_id}`),
        ])
        commit('SET_EVENTS',            events);
        commit('SET_BARS_N_RESTOS',     bars_n_restos);
        commit('SET_OPINIONS',          opinions);
        commit('SET_TEMPERATURES',      temperatures);
        commit('SET_REVIEWS',           reviews);
        commit('SET_VISITOR_PICS',      visitor_pics);
        commit('SET_ANNOUNCEMENT_DATA', announcement_data);
        commit('SET_ANY_PLACES',        any_places);
        commit('SET_HOTELS',            hotels);

        // commit('SET_SIMILAR_BEACHES', await this.$axios.$get(`/beach/list?city=${state.beach.localtionId}${state.tags.slice(0, -1)}`));
    },
}

export const mutations = {
  SET_BEACH: (state, payload) => {
    if (!payload || !payload.data) return;
    const { item } = payload.data;
    state.beach = mapBeachFull(item);
  },
  SET_ANY_PLACES: (state, data) => {
    state.any_places = data;
  },

  SET_TEMPERATURES: (state, payload) => {
    state.temperatures = payload;
  },

  SET_EVENTS: (state, payload) => {
    state.events = payload.data.list.map(mapEvent)
  },

  SET_BARS_N_RESTOS: (state, payload) => {
    state.barsNRestos = payload.data.list.map(mapBar)
  },

  SET_OPINIONS: (state, payload) => {
    state.opinions = payload.data.list.map(mapOpinion);
  },

  SET_REVIEWS: (state, payload) => {
    state.reviews = payload.data.list.map(mapReview);
  },

  SET_SIMILAR_BEACHES: (state, payload) => {
    state.similarBeaches = payload.data.list.map(mapBeachFull)
  },

  SET_VISITOR_PICS: (state, payload) => {
    state.visitorPics = payload.data.list.map(mapVisitors);
  },

  SET_ANNOUNCEMENT_DATA: (state, payload) => {
    const list = payload.data.list || [];
    state.announcements = list.map(mapAnnounce);
  },

  SET_HOTELS: (state, data) => {
    state.hotels = data;
  },
};

export const getters = {
  getAvgRating: (state) => {
    if (!state.beach.data) return null;
    const beach = state.beach.data.item;
    return mapBeachToAvgRating(beach);
  },
  getMainData: (state) => mapBeachMainData(state.beach.data.item),
  getHugeSliderData: (state) => mapBeachHugeSliderData(state.beach.data.item),
  getSideMapWeatherData: (state) => mapBeachToSideMapWeatherData(state.beach.data.item),
  getInfraData: (state) => {
    const infra = state.beach.infrastructures
      .filter((i) => ![
        'ostanovki-obshchestvennogo-transporta',
        'parkovka',
      ].includes(i.code));
    return infra;
  },
  hotelsData: (state) => {
      // console.log('getHotelsData')
      let ret = {};
      if (state.hotels.data) {
        let hotels = state.hotels.data.list;
        ret.hotels = {
          title: 'Забронируй номер рядом с пляжем',
          subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
          beachNumber: state.hotels.data.pagination.countElements,
          /*showMore: {
            type: 'beach',
            query: '?another'
          },*/
          beachSliderData: {
            slideNumber: 6,
            cardData: [],
          },
        };

        for (let i = 0; i < hotels.length; i++) {
          ret.hotels.beachSliderData.cardData.push({
            rating:    hotels[i].RATING,
            title:     hotels[i].NAME,
            pic:       hotels[i].PICTURE,
            mainLink:  hotels[i].URL,
            beachLink: hotels[i].URL,
            beachId:   hotels[i].ID,
            show_distance: true,
            geo_string:    hotels[i].COUNTRY + ', ' + hotels[i].CITY,
            internal_url:  hotels[i].URL,
            another_place: true,
            price:         hotels[i].PRICE,
            coordinates:   hotels[i].COORDINATES ? hotels[i].COORDINATES.split(',').map(Number) : [],
            dist:          hotels[i].DISTANCE,
            custom_photo:  true,
            ignore_global_km: true,
          })
        }
      }
      return ret;
    },
  getSections: (state, getters) => {
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
        show: state.beach.infrastructures.length > 0,
      },
      {
        title: 'О пляже',
        hash: 'about',
        show: state.beach.desc && state.beach.desc.length > 0,
      },
      {
        title: 'Услуги и аренда',
        hash: 'services',
        show: state.beach.services.length > 0,
      },
      {
        title: 'Парковки и общественный транспорт',
        hash: 'pt',
        show: getters.getParking && getters.getParking.parkings && (getters.getParking.parkings.auto.length > 0 || getters.getParking.parkings.bus.length > 0),
      },
      {
        title: 'График температуры воды',
        hash: 'water-temp',
        show: getters.getWaterTemp.waterHistogramData.length > 0,
      },
      {
        title: 'Ближайшие мероприятия',
        hash: 'events',
        show: state.events.length > 0,
      },
      {
        title: 'Бары и рестораны',
        hash: 'barsNRestos',
        show: state.barsNRestos.length > 0,
      },
      {
        title: 'Мнения местных',
        hash: 'opinions',
        show: state.opinions.length > 0,
      },
      {
        title: 'Отзывы гостей',
        hash: 'reviews',
        show: true,
      },
      {
        title: 'Похожие пляжи',
        hash: 'similar-beaches',
        show: state.similarBeaches && state.similarBeaches.length > 0,
      },
      {
        title: 'Фото посетителей',
        hash: 'visitor-pics',
        show: true,
      },
    ];
    return sections;
  },
  getDescription: (state) => state.beach.data.item.DESCRIPTION,
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

  getSimilarBeaches: state => {
    if (!state.similarBeaches) return null;
    const query = {
      city: state.beach.locationId,
      fromBeach: state.beach.id,
      tags: state.beach.tags,
    }

    return {
      title: 'Похожие пляжи рядом',
        subtitle: '',
        showMore: {
        type: 'beach',
        query
      },
      beachNumber: 45,
      beachSliderData: {
        slideNumber: 4,
        cardData: state.similarBeaches
      }
    };

  },

  getEvents: (state) => ({
    count: Math.min(state.events.length, 45),
    link: `/event-catalog?beachId=${state.beach.id}`,
    cardData: state.events,
  }),

  getAnnounce: state => {
    if (!state.announcements) return null;
    return sample(state.announcements);
  },

  getAnotherPlaces: state => {
    const ret = { }
    if (state.any_places.data) {
      let another_places = state.any_places.data.list

      ret.another_places = {
        title: 'Где остановиться в Крыму',
        subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
        beachNumber: state.any_places.data.pagination.countElements,
        showMore: {
          type: 'beach',
          query: '?another'
        },
        beachSliderData: {
          slideNumber: 6,
          cardData: []
        }
      }
      ret.another_places.cardData = another_places.map(mapPlace)
    }

    return ret.another_places
  },

  getWaterTemp: state => {
    const ret = {
      waterHistogramData: [],
      airHistogramData: [],
    }
    // adding formatted temperatures
    let temps = Object.values(state.temperatures.data.list);

    for (let i = 0; i < temps.length; i++) { // going through months
      if (temps[i].find(v => v.CITY.ID == state.beach.locationId)) {
        ret.waterHistogramData.push(parseFloat(temps[i].find(v => v.CITY.ID == state.beach.locationId).TEMP.WATER));
        ret.airHistogramData.push(parseFloat(temps[i].find(v => v.CITY.ID == state.beach.locationId).TEMP.AIR));
      }
    }
    return ret
  },
}

function mapBeachFull(beach) {
  return {
    ...mapBeachToAvgRating(beach),
    ...mapBeachToSideMapWeatherData(beach),
    ...mapBeachHugeSliderData(beach),
    ...mapBeachServices(beach),
    ...mapBeachMainData(beach),
    ...mapBeach(beach),
  }
}
