import {
  mapBanner,
  mapBeach,
  mapBeachGroup,
  mapCity,
  mapCollection,
  mapPlace,
  mapRest,
  mapSettings,
} from "@/helpers/mappers";

export const state = () => ({
  beachesTop: [],
  citiesTop: [],
  weather: [],
  beachTypes: {},
  collection: {},
  collectionList: {},
  banners: {},
  map: {},
  geo: {},
  any_places: [],
  mobile_settings: [],
  show_mobile_preview: true,
})

export const mutations = {
  setMobileState: (state, data) => state.show_mobile_preview = data,
  SET_POPULAR_BEACH: (state, payload) => {
    state.beachesTop = payload;
  },

    SET_ANY_PLACES: (state, data) => {
      state.any_places = data
    },

    SET_CITIES: (state, payload) => {
        state.citiesTop = payload;
    },

    SET_WEATHER: (state, payload) => {
        state.weather = payload;
    },

    SET_COLLECTION: (state, payload) => {
        state.collection = payload;
    },

    SET_COLLECTION_LIST: (state, payload) => {
        state.collectionList = payload;
    },

    SET_MAP: (state, payload) => {
        state.map = payload;
    },

    SET_BANNERS: (state, payload) => {
        state.banners = payload;

        if (state.banners.data)
            state.banners.data.list.sort((a,b) => (parseInt(a.POSITION) - parseInt(b.POSITION)));
    },

    setGeoLocating: (state, payload) => {
        state.geo.id = payload;
    },

    SET_GEO_COUNT: (state, payload) => {
        state.geo.count = payload;
    },
    SET_MOBILE_SETTINGS: (state, payload) => {
    state.mobile_settings = payload;
    }
}

export const actions = {
  async getMainPageData({commit, state}) {

    let popularBeachReq = state.geo.id
      ? this.$axios.$get(`/beach/list?city=${state.geo.id}&count=10`)
      : this.$axios.$get('/beach/top?count=10');

    const [
      popularBeach,
      mobileSettings,
      cities,
      weather,
      collection,
      collectionList,
      banners,
      map,
      anyPlaces
    ] = await Promise.all([
      popularBeachReq,
      this.$axios.$get('/settings/list'),
      this.$axios.$get('/city/top?count=9999'),
      this.$axios.$get('/weather/list'),
      this.$axios.$get('/collection/list/'),
      this.$axios.$get('/collectionList/list/'),
      this.$axios.$get('/banner/list/'),
      this.$axios.$get('/beach/clusters/'),
      this.$axios.$get('/hotel/list?count=10'),
    ]);

    commit('SET_POPULAR_BEACH', popularBeach);
    if (state.geo.id) {
      commit('SET_GEO_COUNT', state.beachesTop.data ? state.beachesTop.data.list.length : 0)
    }

    commit('SET_MOBILE_SETTINGS', mobileSettings);
    commit('SET_CITIES', cities);
    commit('SET_WEATHER', weather);
    commit('SET_COLLECTION', collection);
    commit('SET_COLLECTION_LIST', collectionList);
    commit('SET_BANNERS', banners);
    commit('SET_MAP', map);
    commit('SET_ANY_PLACES', anyPlaces);
  },
}

export const getters = {
  getBeachesTop: (state) => {
    // console.log('!!!getBeachesTop', state.beachesTop.data)
    if (!state.beachesTop.data) return null;
    const { list, pagination } = state.beachesTop.data;
    const { geo } = state

    const beachSliderCards = list
      .slice(0, 10)
      .map(mapBeach)

    // TODO Use query builder instead
    let query = '?popular&'
    if (geo.id && geo.count && geo.count > 0) {
      query += `city=${geo.id}&`;
    }
    query = query.slice(0, -1); // get rid of last &

    const geoName = (geo.id && geo.count && geo.count != 0 && list[0] && list[0].CITY ? ' ' + list[0].CITY.NAME : '');

    const beachesTop = {
      title: 'Самые популярные пляжи' + geoName,
      subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
      beachNumber: pagination.countElements,
      showMore: {
        type: 'beach',
        query
      },
      beachSliderData: {
        slideNumber: 4,
        cardData: beachSliderCards
      }
    }
    return beachesTop;
  },

  // Курортные города
  getCitiesTop: state => {
    // console.log('!!!getCitiesTop', state.citiesTop.data)
    // let citiesTop = [
    //   {id: 'fake', "city":"Ялта","cityId":"47","beachNumber":3,"pic":google_pic,},
    //   {id: 'fake', "city":"Киев","cityId":"2012","beachNumber":1,"pic":google_pic,},
    //   {id: 'fake', "city":"Севастополь","cityId":"1856","beachNumber":1,"pic":google_pic,},
    //   {id: 'fake', "city":"село Поповка","cityId":"51","beachNumber":1,"pic":google_pic,},
    //   {id: 'fake', "city":"Форос","cityId":"46","beachNumber":1,"pic":google_pic,},
    // ]

    if (!state.citiesTop.data) return null;
    const { list } = state.citiesTop.data;
    return [...list]
      .sort((a,b) => (a.COUNT_BEACHES < b.COUNT_BEACHES) ? 1 : -1)
      .slice(0, 10)
      .map(mapCity)
  },

  getMap: state => {
    // console.log('!!!getMap', state.map.data)
    // Карта пляжей
    if (!state.map.data) return null;
    let clusterCenters = [];
    let curCluster;
    const ret = {};
    // console.log(state.map.data.list, 'state.map.data.list')


    let clusters = Object.keys(state.map.data.list).map((k) => state.map.data.list[k]);

      for (let i = 0; i < clusters.length; i++) {
        curCluster = clusters[i].filter(v => v.COORDINATES != '');
        if (curCluster && curCluster.length > 0) {
          clusterCenters.push(
            curCluster.length != 1 ? ([ curCluster.reduce((a, b) => {
              if (typeof a === 'object') a = parseFloat(a.COORDINATES.split(',')[0]);
              return a + parseFloat(b.COORDINATES.split(',')[0]);
            }) / curCluster.length,
              curCluster.reduce((a, b) => {
                if (typeof a === 'object') a = parseFloat(a.COORDINATES.split(',')[1]);
                return a + parseFloat(b.COORDINATES.split(',')[1]);
              }) / curCluster.length
            ]) : curCluster[0].COORDINATES.split(',').map(v => parseFloat(v)));
        }
      }
      ret.map = {
        addressBeaches: []
      };
      if (clusterCenters && clusterCenters.length > 0) {
        ret.map.center = [
          clusterCenters.length != 1 ? ([ clusterCenters.reduce((a, b) => {
            if (typeof a === 'object') a = a[0];
            return a + b[0];
          }) / clusterCenters.length,
            clusterCenters.reduce((a, b) => {
              if (typeof a === 'object') a = a[1];
              return a + b[1];
            }) / clusterCenters.length
          ]) : clusterCenters[0]
        ]
      }
      for (let i = 0; i < clusters.length; i++) {
        curCluster = [];
        for (let j = 0; j < clusters[i].length; j++) {
          if (!clusters[i][j].COORDINATES || clusters[i][j].COORDINATES && isNaN(clusters[i][j].COORDINATES.split(',').map(v => parseFloat(v))[0])) continue;
          curCluster.push({
            pos: clusters[i][j].COORDINATES ? clusters[i][j].COORDINATES.split(',').map(v => parseFloat(v)) : null,
            rating: parseFloat(clusters[i][j].AVERAGE_RATING),
            title: clusters[i][j].NAME,
            location: clusters[i][j].CITY ? clusters[i][j].CITY.NAME : null,
            locationId: clusters[i][j].CITY ? clusters[i][j].CITY.ID : -1,
            beachId: clusters[i][j].ID,
            pics: clusters[i][j].PHOTOS && clusters[i][j].PHOTOS.small ? [ ...clusters[i][j].PHOTOS.small.map(e=>e.path) ] : null,
            showFavorite: true,
            paid: clusters[i][j].PAID,
            humanLink: clusters[i][j].CODE || clusters[i][j].ID
          });
        }
        if (clusterCenters[i] && clusterCenters[i].length > 0) {
          ret.map.addressBeaches.push({
            clusterCenter: clusterCenters[i],
            beaches: curCluster,
            id: clusters[i][0].CITY ? clusters[i][0].CITY.ID : null
          });
        }
      }
      if (state.geo.id && state.geo.count && state.geo.count > 0) {
        ret.map.geo = {
          id: ret.map.addressBeaches.findIndex(v => v.id == state.geo.id)
        }
      }
      return ret.map;
  },

  getBanners: state => {
    // console.log('!!!getBanners', !!state.banners.data)
    // const fake = [
    //   {id: 'fake', "title":"Z FEST","description":"Приглашаем Вас поучаствовать в самом ярком событии весны – социально-благотворительном фестивале Z FEST, посвященному Досугу нового поколения!","link":"https://uat.plyazhi.ru/event/1930","pic": google_pic,"buttonText":"Присоединяйтесь","rightToLeft":true},
    //   {id: 'fake', "title":"День рождения Mriya Resort & SPA","description":"Яркие декорации, удивительные персонажи и незабываемые развлечения — откройте для себя чудесный мир Mriya и почувствуйте силу нашего гостеприимства и радушия!","link":"https://uat.plyazhi.ru/event/1945","pic":google_pic,"buttonText":"Подробнее","rightToLeft":true},
    //   {id: 'fake', "title":"Шесть чувств","description":"Японский сад, предназначенный для медитаций, раздумий и расслабления,\r\nпредмет особой гордости отеля Mriya Resort &amp; Spa","link":"https://uat.plyazhi.ru/beach/1939","pic":google_pic,"buttonText":"Подробнее","rightToLeft":true},
    //   {id: 'fake', "title":"Праздник Непутна","description":"","link":"https://uat.plyazhi.ru/event/2265","pic":google_pic,"buttonText":"продолжить","rightToLeft":false}
    // ];
    if (!state.banners.data) return null;
    return state.banners.data.list.map(mapBanner);

  },

  // Отдых для всей семьи
  getFamilyRest: state => {
    // console.log('!!!getFamilyRest', !!state.collection.data)
    if (!state.collection.data) return null;
    const { list } = state.collection.data;

    let family = list.find(v => v.CODE == 'for_all_family');
    if (!family) return null;

    const familyBeaches = family.BEACHES
      .slice(0, 10)
      .map(mapRest);

    return {
      title: 'Отдых для всей семьи',
      subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
      beachNumber: Math.min(family.COUNT_BEACHES, 45),
      showMore: {
        type: 'beach',
        query: '?family'
      },
      beachSliderData: {
        slideNumber: 6,
        cardData: familyBeaches
      }
    }
  },

  getAnotherPlaces: state => {
    // console.log('!!!getAnotherPlaces', !!state.any_places.data)
    if (!state.any_places.data) return null;
    const { list } = state.any_places.data;
    const { countElements } = state.any_places.data.pagination;

    const placeList = list.map(mapPlace)

    return {
      title: 'Где остановиться в Крыму',
      subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
      beachNumber: countElements,
      showMore: {
        type: 'beach',
        query: '?another'
      },
      beachSliderData: {
        slideNumber: 6,
        cardData: placeList
      }
    }
  },

  // Ближайшие мероприятия
  getEvents: (state, getters, rootState) => {
    if (!rootState.mappedEvents) return null;

    return {
      title: 'Ближайшие мероприятия на пляжах',
      beachNumber: Math.min(rootState.mappedEvents.length, 45),
      showMore: {
        type: 'event',
        query: null
      },
      beachSliderData: {
        slideNumber: 4,
        cardData: rootState.mappedEvents.slice(0, 10)
      }
    }
  },

  // Выберите свой пляж
  getChooseYourBeach: (state, getters, rootState) => {
    if (!rootState.search.searchConfig) return null;

    // TODO Rename??
    const { beachTypes } = rootState.search.searchConfig.data;
    if (!beachTypes) return null;

    const types = [
      'galechnye-plyazhi',
      'peschanye-plyazhi',
      'rakushechnye-plyazhi',
    ];

    return beachTypes
      .filter(type => types.includes(type.CODE))
      .map(type => ({
        title: type.NAME,
        id:    type.EXTERNAL_ID
      }));
  },

  // Активный отдых
  getActiveRest: state => {
    // console.log('!!!getActiveRest', state.collectionList.data)
    if (!state.collectionList.data) return null;
    const { list } = state.collectionList.data

    const collection = list.find(v => v.CODE == 'active-leisure');
    if (!collection) return null;

    return collection.COLLECTIONS.map(mapBeachGroup);
  },

  getWeather: state => {
    // console.log('!!!getWeather', state.weather.data)
    if (!state.weather.data) return null;

    let curCluster;
    let weatherData = Object.keys(state.weather.data.list)
      .map((k) => state.weather.data.list[k]);

    if (!weatherData) return null;

    const ret = {}

    ret.weather = [];
    for (let i = 0; i < weatherData.length; i++) {
      curCluster = [];
      for (let j = 0; j < weatherData[i].length; j++) {
        curCluster.push({
          city: weatherData[i][j].CITY ? weatherData[i][j].CITY.NAME : null,
          pic: weatherData[i][j].CITY && weatherData[i][j].CITY.PREVIEW_PICTURE ? weatherData[i][j].CITY.PREVIEW_PICTURE : null,
          airTemperature: weatherData[i][j].TEMP ? parseFloat(weatherData[i][j].TEMP.AIR) : null,
          waterTemperature: weatherData[i][j].TEMP ? parseFloat(weatherData[i][j].TEMP.WATER) : null
        })
      }
      ret.weather.push(curCluster);
    }

    return ret.weather;
  },

  // Mobile settings
  getMobileSettings: state => {
    // console.log('getMobileSettings', state.mobile_settings.data)
    if (!state.mobile_settings.data) return null;
    const { list } = state.mobile_settings.data;

    return list.map(mapSettings);
  },

  // Выбирайте по своим желаниям
  getChooseToYourWishes: state => {
    // console.log('getChooseToYourWishes', state.collectionList.data)
    if (!state.collectionList.data) return null;

    const { list } = state.collectionList.data
    const collection = list.find(v => v.CODE == 'choose-to-your-wishes');
    if (!collection) return null;

    return mapCollection(collection);
  },
}
