import moment from 'moment';
import { mapEntityList } from '@/helpers/mappers';

moment.locale('ru');

const dataAndTimeTransform = (from, to, part = 'date') => {
  let result = null;
  if (part === 'date') {
    const _from = from ? moment(from, 'DD-MM-YYYY HH:mm:ss').format('D MMMM') : null;
    const _to = to ? moment(to, 'DD-MM-YYYY HH:mm:ss').format('D MMMM') : null;
    result = to && from ? (_from + ' - ' + _to) : (_to || _from);
  } else {
    const _from = from ?  moment(from, 'YYYY-MM-DD HH:mm:ss').format('HH:mm') : null;
    const _to = to ? moment(to, 'YYYY-MM-DD HH:mm:ss').format('HH:mm') : null;
    result = to && from ? (_from + ' - ' + _to) : (_to || _from);
  }
  return result;
};

function defaultState() {
  return {
    eventId: null,
    event: [],
    weatherData: null,
    mainInfo: null,
    parkings: null,
    hugeSlider: null,
    sections: [
      {
        title: 'Галерея',
        hash: 'gallery',
      },
    ],
    email: null,
    telegram: null,
    position: [],
    infra: null,
    mapEntity: null,
    error: false,
  };
}

export const state = () => defaultState();

export const mutations = {
  SET_EVENT: (state, payload) => {
    const { event, city, beach } = payload;
    const eventItem = event.data ? event.data.item : null;
    const cityItem = city.data ? city.data.item : null;
    const beachItem = beach.data ? beach.data.item : null;
    if (!eventItem && !cityItem && !beachItem) {
      state.error = true;
    }
    // убрать в маппер
    const { WEATHER } = eventItem;

    const sideMapWeatherData = {
      title: cityItem ? cityItem.NAME : '',
      date: WEATHER ? WEATHER.WEATHER_DATE : '',
      waterTemp: WEATHER ? WEATHER.TEMP_WATER : '',
      airTemp: WEATHER ? WEATHER.TEMP_AIR : '',
      sunriseTime: WEATHER ? WEATHER.SUNRISE : '',
      sunsetTime: WEATHER ? WEATHER.SUNSET : '',
      windSpeed: WEATHER ? WEATHER.WIND : '',
      humidity: WEATHER ? WEATHER.HUMIDITY : '',
      precipitation: WEATHER ? WEATHER.PRECIPITATION : '',
    };
    const about = {
      title: 'О мероприятии',
      about: eventItem.DESCRIPTION,
    };
    const mainInfo = {
      title: eventItem.NAME,
      date: dataAndTimeTransform(eventItem.ACTIVE_FROM, eventItem.ACTIVE_TO, 'date'),
      likes: eventItem.COUNT_FAVORITES,
      location: cityItem ? cityItem.NAME : null,
      locationId: cityItem ? cityItem.ID : null,
      eventId: eventItem.ID,
      price: eventItem.PRICE || null,
      beachSeabedType: beachItem.PARAMETERS ? (beachItem.PARAMETERS.P_BOTTOM ? beachItem.PARAMETERS.P_BOTTOM.NAME : '') : '',
      time: eventItem.EVENT_TIME ? eventItem.EVENT_TIME : dataAndTimeTransform(eventItem.ACTIVE_FROM, eventItem.ACTIVE_TO, 'time'),
    };

    const parkings = beachItem.INFRASTRUCTURES.filter((v) => v.CODE === 'parkovka')
      .map((_, i, parkings) => (
        {
          pos: parkings[i].COORDINATES ? parkings[i].COORDINATES.split(',').map(Number) : [],
          title: parkings[i].DESCRIPTION,
          type: 'Автомобильная парковка',
          mode: '',
          address: '',
          price: '',
          iconMap: parkings[i].ICON_ON_MAP,
          icon: parkings[i].ICON,
        }
      ));
    const stops = beachItem.INFRASTRUCTURES.filter((v) => v.CODE === 'ostanovki-obshchestvennogo-transporta')
      .map((_, i, stops) => (
        {
          pos: stops[i].COORDINATES ? stops[i].COORDINATES.split(',').map(Number) : [],
          title: stops[i].DESCRIPTION,
          buses: '',
          taxi: '',
        }));
    const hugeSlider = {
      title: eventItem.NAME,
      isBeachClosed: false,
      pics: eventItem.PHOTOS.reference.map((e) => e.path),
      medium_pics: eventItem.PHOTOS.medium.map((e) => e.path),
      goldMedal: null,
      blueMedal: null,
    };
    state.sections = state.sections.concat({
      title: 'Основные характеристики',
      hash: 'main-info',
    });

    state.infra = beachItem.INFRASTRUCTURES
      .filter((v) => v.CODE !== 'parkovka' && v.CODE !== 'ostanovki-obshchestvennogo-transporta')
      .map((item) => ({
        title: item.NAME,
        pic: item.ICON,
        id: item.ID,
      }));

    if (state.infra.length) {
      state.sections = state.sections.concat({
        title: 'Инфраструктура',
        hash: 'infra',
      });
    }

    state.position = beachItem.COORDINATES
      ? beachItem.COORDINATES.split(',').map((v) => parseFloat(v))
      : [];
    state.email = beachItem.CONTACT ? beachItem.CONTACT.EMAIL : null;
    state.telegram = beachItem.CONTACT ? beachItem.CONTACT.TELEGRAM : null;
    state.parkings = {
      title: beachItem.NAME,
      pos: beachItem.COORDINATES ? beachItem.COORDINATES.split(',')
        .map((v) => parseFloat(v)) : null,
      auto: parkings,
      bus: stops,
    };
    state.weatherData = sideMapWeatherData;
    state.about = about;
    state.mainInfo = mainInfo;
    state.hugeSlider = hugeSlider;

    if (about.about.length) {
      state.sections = state.sections.concat({
        title: 'О мероприятии',
        hash: 'about',
      });
    }

    if (parkings.length || stops.length) {
      state.sections = state.sections.concat({
        title: 'Парковки и общественный транспорт',
        hash: 'pt',
      });
    }

    state.sections = state.sections.concat([
      {
        title: 'Отзывы гостей',
        hash: 'reviews',
      },
      {
        title: 'Фото посетителей',
        hash: 'visitor-pics',
      },
    ]);
  },
  SET_EVENT_ID: (state, id) => {
    state.eventId = id;
  },
  SET_MAP_ENTITY: (state, payload) => {
    const { list } = payload.data;
    state.mapEntity = mapEntityList(list);
  },
  SET_DEFAULT_STATE: (state) => {
    const s = defaultState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
};

export const actions = {
  setDefaultState({ commit }) {
    commit('SET_DEFAULT_STATE');
  },
  async getEvent({ commit }, id) {
    let event = null;
    let beach = null;
    let city = null;
    let eventId = null;
    try {
      event = await this.$axios.$get(`/event/item?id=${id}`);
      const { BEACH, CITIES, ID } = event.data.item;
      eventId = ID;
      beach = await this.$axios.$get(`/beach/item?id=${BEACH}`);
      city = await this.$axios.$get(`/city/item?id=${CITIES}`);
    } catch (error) {}
    commit('SET_EVENT', { event, beach, city });

    commit('SET_EVENT_ID', eventId);
  },

  async setMapEntity({ commit }) {
    const mapEntity = await this.$axios.$get('/map-entity/list?count=10');
    commit('SET_MAP_ENTITY', mapEntity);
  },
};

export const getters = {
  getWeatherData: (state) => state.weatherData,
  getAbout: (state) => state.about,
  getMainInfo: (state) => state.mainInfo,
  getParkings: (state) => state.parkings,
  getHugeSlider: (state) => state.hugeSlider,
  getSections: (state) => state.sections,
  getEmail: (state) => state.email,
  getTelegram: (state) => state.telegram,
  getPosition: (state) => state.position,
  getEventId: (state) => state.eventId,
  getInfra: (state) => state.infra,
  getMapEntity: (state) => state.mapEntity,
  getError: (state) => state.error,
};
