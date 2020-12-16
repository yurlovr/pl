import moment from 'moment';
import { getDistanceFromLatLonInKm } from "~/assets/calcDistance";
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

const distance = (d, coordinat) => {
  if (d && d.length === 2 && Object.keys(coordinat).length) {
    const lat2 = d[0];
    const lng2 = d[1];
    const { lat, lng } = coordinat;
    return Number(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)).toFixed(1)).toString().replace(/\./, ',');
  }
  return 0;
};

function defaultState() {
  return {
    eventId: null,
    event: [],
    visitorPics: null,
    announcementData: null,
    anyPlaces: null,
    hotels: null,
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
    reviews: null,
    email: null,
    telegram: null,
    position: [],
    infra: null,
    mapEntity: null,
  };
}

export const state = () => defaultState();

export const mutations = {
  SET_ANY_PLACES: (state, payload) => {
    const { list, pagination } = payload.data;

    state.anyPlaces = {
      title: 'Где остановиться в Крыму',
      subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
      beachNumber: pagination.countElements,
      showMore: {
        type: 'beach',
        query: '?another',
      },
      beachSliderData: {
        slideNumber: 6,
        cardData: list.map((_, i, list) => ({
          rating: list[i].RATING,
          title: list[i].NAME,
          pic: list[i].PICTURE,
          mainLink: list[i].URL,
          beachLink: list[i].URL,
          beachId: list[i].ID,
          show_distance: true,
          geo_string: `${list[i].COUNTRY}, ${list[i].CITY}`,
          internal_url: list[i].URL,
          another_place: true,
          price: list[i].PRICE,
          coordinates: list[i].COORDINATES ? list[i].COORDINATES.split(',').map(Number) : [],
          custom_photo: true,
        })),
      },
    };
  },
  SET_EVENT: (state, payload) => {
    state.event = payload;
    const { item } = payload.data;
    // убрать в маппер
    const sideMapWeatherData = {
      title: item.BEACH ? item.BEACH.NAME : null,
      date: item.BEACH ? item.BEACH.WEATHER.DATE : null,
      waterTemp: item.BEACH?.WEATHER?.TEMP?.WATER,
      airTemp: item.BEACH?.WEATHER?.TEMP?.AIR,
      sunriseTime: item.BEACH?.WEATHER?.SUNRISE,
      sunsetTime: item.BEACH?.WEATHER?.SUNSET,
      windSpeed: item.BEACH?.WEATHER?.WIND,
      humidity: item.BEACH?.WEATHER?.HUMIDITY,
      precipitation: item.BEACH?.WEATHER?.PRECIPITATION,
    };
    const about = {
      title: 'О мероприятии',
      about: item.DESCRIPTION,
    };

    const mainInfo = {
      title: item.NAME,
      date: dataAndTimeTransform(state.event.data.item.ACTIVE_FROM, state.event.data.item.ACTIVE_TO, 'date'),
      likes: item.COUNT_FAVORITES,
      location: item.BEACH?.CITY?.NAME,
      locationId: item.BEACH?.CITY?.ID,
      eventId: item.ID,
      price: item.PRICE || null,
      beachSeabedType: item.BEACH?.PARAMETERS?.P_BOTTOM?.NAME,
      time: item.EVENT_TIME ? item.EVENT_TIME : dataAndTimeTransform(item.ACTIVE_FROM, item.ACTIVE_TO, 'time'),
    };

    const parkings = item.BEACH.INFRASTRUCTURES.filter((v) => v.CODE === 'parkovka').map((_, i, parkings) => (
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
    const stops = item.BEACH.INFRASTRUCTURES.filter(
      (v) => v.CODE === 'ostanovki-obshchestvennogo-transporta')
      .map((_, i, stops) => (
        {
          pos: stops[i].COORDINATES ? stops[i].COORDINATES.split(',').map(Number) : [],
          title: stops[i].DESCRIPTION,
          buses: '',
          taxi: '',
        }
      ));
    const hugeSlider = {
      title: item.NAME,
      isBeachClosed: false,
      pics: item.PHOTOS.reference.map((e) => e.path),
      medium_pics: item.PHOTOS.medium.map((e) => e.path),
      goldMedal: null,
      blueMedal: null,
    };
    state.sections = state.sections.concat({
      title: 'Основные характеристики',
      hash: 'main-info',
    });

    state.infra = item.BEACH.INFRASTRUCTURES
      .filter((v) => v.CODE !== 'parkovka' && v.CODE !== 'ostanovki-obshchestvennogo-transporta')
      .map((item) => ({
        title: item.NAME,
        pic: item.ICON,
      }));

    // if (state.infra.length) {
    //   state.sections = state.sections.concat({
    //     title: 'Инфраструктура',
    //     hash: 'infra',
    //   });
    // }

    state.position = item.BEACH && item.BEACH.COORDINATES !== ''
      ? item.BEACH.COORDINATES.split(',').map((v) => parseFloat(v))
      : [];
    state.email = item.BEACH?.CONTACT?.EMAIL;
    state.telegram = item.CONTACT?.TELEGRAM;
    state.parkings = {
      title: item.BEACH?.NAME,
      pos: item.BEACH && item.BEACH.COORDINATES !== '' ? item.BEACH.COORDINATES.split(',')
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

  SET_REVIEWS: (state, payload) => {
    state.reviews = payload;
    const { list } = payload.data;
    state.reviews = list.map((_, i, list) => ({
      pic: list[i]?.PICTURE,
      name: list[i].FIO,
      date: list[i].CREATED_DATE,
      rating: list[i].AVERAGE_RATING,
      comment: list[i].DESCRIPTION,
    }));
  },

  SET_VISITOR_PICS: (state, payload) => {
    const { list } = payload.data;

    state.visitorPics = list.map((_, i, list) => ({
      avatar: list[i].USER ? list[i].USER.PICTURE : null,
      pic: list[i].PICTURE,
      name: list[i].USER ? list[i].USER.FIO : null,
      comment: list[i].DESCRIPTION,
    }));
  },

  SET_ANNOUNCEMENT_DATA: (state, payload) => {
    const { list } = payload.data;
    if (list.length) {
      // getting a random announcement
      const announcement = list[Math.floor(Math.random() * list.length)];
      state.announcementData = {
        link: announcement.LINK,
        pic: announcement.PREVIEW_PICTURE ? announcement.PREVIEW_PICTURE : null,
        title: announcement.NAME,
        date: announcement.DATE,
        description: announcement.DESCRIPTION,
        color: announcement.COLOR,
      };
    }
  },

  SET_HOTELS: (state, payload) => {
    const { list, pagination } = payload.hotels.data;
    const { coordinat } = payload;
    state.hotels = {
      title: 'Забронируй номер рядом с пляжем',
      subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
      beachNumber: pagination.countElements,
      // /*showMore: {
      //   type: 'beach',
      //   query: '?another'
      // },*/
      beachSliderData: {
        slideNumber: 6,
        cardData: list.map((_, i, list) => ({
          rating: list[i].RATING,
          title: list[i].NAME,
          pic: list[i].PICTURE,
          mainLink: list[i].URL,
          beachLink: list[i].URL,
          beachId: list[i].ID,
          show_distance: true,
          geo_string: `${list[i].COUNTRY}, ${list[i].CITY}`,
          internal_url: list[i].URL,
          another_place: true,
          price: list[i].PRICE,
          coordinates: list[i].COORDINATES ? list[i].COORDINATES.split(',').map(Number) : [],
          dist: distance(list[i].COORDINATES ? list[i].COORDINATES.split(',').map(Number) : [], coordinat),
          custom_photo: true,
          ignore_global_km: true,
        })),
      },
    };
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
  async getEvent({ commit, state }, id) {
    let error;
    const resp = await this.$axios.$get(`/event/item?id=${id}`).catch(e => {
      error = 404;
      return {};
    });

    if (error) return error;
    commit('SET_EVENT', resp);

    const eventId = state.event.data.item.ID;
    commit('SET_EVENT_ID', eventId);
  },
  async setAnnouncement({ commit }, page) {
    let announcement = null;
    if (page === 'event') {
      announcement = await this.$axios.$get('/banner/list?page=/event');
    }
    commit('SET_ANNOUNCEMENT_DATA', announcement);
  },

  async setHotels({ commit }) {
    const hotels = await this.$axios.$get('/hotel/beachList?count=10');
    const coordinat = this.$cookies.get('last_coordinates') || {};
    commit('SET_HOTELS', { hotels, coordinat });
  },

  async setAnyPlaces({ commit }) {
    const anyPlaces = await this.$axios.$get('/hotel/list?count=10');
    commit('SET_ANY_PLACES', anyPlaces);
  },
  async setVisitorPics({ commit }, eventId) {
    const visitorPics = await this.$axios.$get(`/socialPhoto/list?entityId=${eventId}&count=10`);
    commit('SET_VISITOR_PICS', visitorPics);
  },
  async setReviews({ commit }, eventId) {
    // &count=9999
    const reviews = await this.$axios.$get(`/review/list?entityId=${eventId}`);
    commit('SET_REVIEWS', reviews);
  },

  async setMapEntity({ commit }) {
    const mapEntity = await this.$axios.$get('/map-entity/list?count=10');
    commit('SET_MAP_ENTITY', mapEntity);
  },
};

export const getters = {
  // eventData: (state, getters, rootState) => {
  //       // adding formatted other events
  //       let otherEvents = rootState.events.data.list.filter(v => v.ID != state.event.data.item.ID && v.BEACH && v.BEACH.CITY && state.event.data.item.BEACH && state.event.data.item.BEACH.CITY && v.BEACH.CITY.NAME == state.event.data.item.BEACH.CITY.NAME);
  //       ret.otherEvents.beachNumber = Math.min(otherEvents.length, 45);
  //       for (let i = 0; i < otherEvents.length; i++) {
  //           ret.otherEvents.beachSliderData.cardData.push({
  //               title: otherEvents[i].NAME,
  //               date: otherEvents[i].ACTIVE_FROM,
  //               beach: otherEvents[i].BEACH ? otherEvents[i].BEACH.NAME : null,
  //               paid: otherEvents[i].PAID,
  //               tempWater: otherEvents[i].BEACH && otherEvents[i].BEACH.WEATHER && otherEvents[i].BEACH.TEMP ? otherEvents[i].BEACH.WEATHER.TEMP.WATER : null,
  //               mainLink: `event/${otherEvents[i].ID}`,
  //               beachLink: otherEvents[i].BEACH ? `beach/${otherEvents[i].BEACH.CODE}` : null,
  //               humanLink: otherEvents[i].CODE ? `event/${otherEvents[i].CODE}` : null,
  //               location: otherEvents[i].BEACH && otherEvents[i].BEACH.CITY ? otherEvents[i].BEACH.CITY.NAME : null,
  //               locationId: otherEvents[i].BEACH && otherEvents[i].BEACH.CITY ? otherEvents[i].BEACH.CITY.ID : null,
  //               pic: otherEvents[i].PHOTOS ? otherEvents[i].PHOTOS[0] : null,
  //               eventId: otherEvents[i].ID,
  //               showFavorite: true
  //           });
  //       }
  //   },
  getWeatherData: (state) => state.weatherData,
  getAbout: (state) => state.about,
  getMainInfo: (state) => state.mainInfo,
  getParkings: (state) => state.parkings,
  getHugeSlider: (state) => state.hugeSlider,
  getSections: (state) => state.sections,
  getReviews: (state) => state.reviews,
  getEmail: (state) => state.email,
  getTelegram: (state) => state.telegram,
  getPosition: (state) => state.position,
  getAnnouncement: (state) => state.announcementData,
  getHotels: (state) => state.hotels,
  getAnyPlaces: (state) => state.anyPlaces,
  getEventId: (state) => state.eventId,
  getVisitorPics: (state) => state.visitorPics,
  getInfra: (state) => state.infra,
  getMapEntity: (state) => state.mapEntity,
};
