import fakeData from './mainData.json'

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
const google_pic = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
function mapBeachesTop(list, pagination, geo) {
  // console.log('!!! HARD MAPPER')
  // Популярные пляжи
  const beachesTop = {
    title: 'Самые популярные пляжи' + (geo.id && geo.count && geo.count != 0 && list[0] && list[0].CITY ? ' ' + list[0].CITY.NAME : ''),
    subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
    beachNumber: Math.min(pagination.countElements, 45),
    showMore: {
      type: 'beach',
      query: '?popular&'
    },
    beachSliderData: {
      slideNumber: 4,
      cardData: []
    }
  }

  if (geo.id && geo.count && geo.count > 0) {
    beachesTop.showMore.query += `city=${geo.id}&`;
  }

  beachesTop.showMore.query = beachesTop.showMore.query.slice(0, -1); // get rid of last &

  const beachSliderCards = list.slice(0, 10).map(item => {
    return {
      access: item.ACCESS || null,
      tempWater: item.WEATHER ? item.WEATHER.TEMP.WATER : null,
      showFavorite: true,
      paid: item.PAID,
      rating: parseFloat(item.AVERAGE_RATING),
      title: item.NAME,
      location: item.CITY ? item.CITY.NAME : null,
      pic: item.PREVIEW ? item.PREVIEW : null,
      mainLink: `beach/${item.ID}`,
      beachLink: `beach/${item.ID}`,
      humanLink: item.CODE ? `beach/${item.CODE}` : null,
      locationId: item.CITY ? item.CITY.ID : -1,
      beachId: item.ID,
      coordinates: item.COORDINATES.length ? item.COORDINATES.split(',') : [],
      show_distance: true,
    }
  })
  beachesTop.beachSliderData.cardData = beachSliderCards;
  return beachesTop;
}
export const getters = {
  mainData2: () => {
    // console.log('getter start')
    return fakeData;
  },
  getBeachesTop: (state) => {
    // console.log('!!!getBeachesTop', state.beachesTop.data)
    if (!state.beachesTop.data) return null;
    const { list, pagination } = state.beachesTop.data;
    const { geo } = state
    return mapBeachesTop(list, pagination, geo);
  },

  getCitiesTop: state => {
    // console.log('!!!getCitiesTop', state.citiesTop.data)
    // Курортные города
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
      .map(item => {
        return  {
          city: item.NAME,
          cityId: item.ID,
          beachNumber: item.COUNT_BEACHES,
          pic: item.PREVIEW_PICTURE ? item.PREVIEW_PICTURE : null
        }
      })
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
    const { list } = state.banners.data;

    return list.map(item => {
      return {
        title: item.NAME,
        description: item.DESCRIPTION,
        link: item.LINK,
        pic: item.PREVIEW_PICTURE,
        buttonText: item.BUTTON_NAME,
        // by default pic is on the left
        rightToLeft: item.PICTURE_POSITION == 'right'
      }
    });
  },

  getFamilyRest: state => {
    // console.log('!!!getFamilyRest', !!state.collection.data)
    // Отдых для всей семьи
    if (!state.collection.data) return null;
    const { list } = state.collection.data;

    let family = list.find(v => v.CODE == 'for_all_family');
    if (!family) return null;

    const familyRest = {
      title: 'Отдых для всей семьи',
      subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
      beachNumber: Math.min(family.COUNT_BEACHES, 45),
      showMore: {
        type: 'beach',
        query: '?family'
      },
      beachSliderData: {
        slideNumber: 6,
        cardData: [
          {id: 'fake', "temperature":26,"showFavorite":true,"paid":false,"rating":4.7,"title":"Массандровский пляж","location":"Ялта","locationId":"47","pic":google_pic,"mainLink":"beach/1924","beachLink":"beach/1924","humanLink":"beach/massandrovskiy-plyazh","beachId":"1924","coordinates":["44.497041757352","34.171652423195"],"show_distance":true},
          {id: 'fake', "temperature":26,"showFavorite":true,"paid":false,"rating":4.5,"title":"Форос","location":"Форос","locationId":"46","pic":google_pic,"mainLink":"beach/1925","beachLink":"beach/1925","humanLink":"beach/foros","beachId":"1925","coordinates":["44.392499007611","33.791695251465"],"show_distance":true},
          {id: 'fake', "temperature":26,"showFavorite":true,"paid":true,"rating":4,"title":"ФГБУ &quot;Санаторий РОП РФ &quot;Электроника&quot;","location":"Форос","locationId":"46","pic":google_pic,"mainLink":"beach/2204","beachLink":"beach/2204","humanLink":"beach/tikhiy","beachId":"2204","coordinates":["44.3915298","33.792564098312"],"show_distance":true},
          {id: 'fake', "temperature":26,"showFavorite":true,"paid":false,"rating":4,"title":"Зелёный пляж","location":"Форос","locationId":"46","pic":google_pic,"mainLink":"beach/2263","beachLink":"beach/2263","humanLink":"beach/zelyenyy-plyazh","beachId":"2263","coordinates":["44.3918298","33.792364098312"],"show_distance":true},
          {id: 'fake', "temperature":26,"showFavorite":true,"paid":false,"rating":4,"title":"Холодный пляж","location":"Форос","locationId":"46","pic":google_pic,"mainLink":"beach/2273","beachLink":"beach/2273","humanLink":"beach/kholodnyy-plyazh","beachId":"2273","coordinates":["44.39314765","33.795542356502"],"show_distance":true},
          {id: 'fake', "temperature":26,"showFavorite":true,"paid":false,"rating":4,"title":"Золотой пляж Курпаты черновик","location":"посёлок городского типа Курпаты","locationId":"91","pic":google_pic,"mainLink":"beach/2307","beachLink":"beach/2307","humanLink":"beach/zolotoy-plyazh-kurpaty","beachId":"2307","coordinates":["44.445287","34.134888"],"show_distance":true}
        ]
      }
    }

    let truth_familyRest = []
    for (let i = 0; i < Math.min(10, family.BEACHES.length); i++) {
        truth_familyRest.push({
          temperature: family.BEACHES[i].WEATHER ? family.BEACHES[i].WEATHER.TEMP.WATER : null,
          showFavorite: true,
          paid: family.BEACHES[i].PAID,
          rating: parseFloat(family.BEACHES[i].AVERAGE_RATING),
          title: family.BEACHES[i].NAME,
          location: family.BEACHES[i].CITY ? family.BEACHES[i].CITY.NAME : null,
          locationId: family.BEACHES[i].CITY ? family.BEACHES[i].CITY.ID : -1,
          pic: family.BEACHES[i].PHOTOS.medium && family.BEACHES[i].PHOTOS.medium.length ? family.BEACHES[i].PHOTOS.medium[0].path : null,
          mainLink: `beach/${family.BEACHES[i].ID}`,
          beachLink: `beach/${family.BEACHES[i].ID}`,
          humanLink: family.BEACHES[i].CODE ? `beach/${family.BEACHES[i].CODE}` : null,
          beachId: family.BEACHES[i].ID,
          coordinates: family.BEACHES[i].COORDINATES.length ? family.BEACHES[i].COORDINATES.split(',') : [],
          show_distance: true
        });
      }
    if (Math.min(10, family.BEACHES.length) > 0){
      familyRest.beachSliderData.cardData = truth_familyRest
    }

    return familyRest;
  },

  getAnotherPlaces: state => {
    // console.log('!!!getAnotherPlaces', !!state.any_places.data)
    if (!state.any_places.data) return null;
    const ret = {}
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

    for (let i = 0; i < another_places.length; i++) {
      ret.another_places.beachSliderData.cardData.push({
        rating: another_places[i].RATING,
        title: another_places[i].NAME,
        pic: another_places[i].PICTURE,
        mainLink: another_places[i].URL,
        beachLink: another_places[i].URL,
        beachId: another_places[i].ID,
        show_distance: true,
        geo_string: another_places[i].COUNTRY + ', ' + another_places[i].CITY,
        internal_url: another_places[i].URL,
        another_place: true,
        price: another_places[i].PRICE,
        coordinates: another_places[i].COORDINATES ? another_places[i].COORDINATES.split(',').map(Number) : [],
      });
    }
    return ret.another_places;
  },

  // Ближайшие мероприятия
  // TODO calls 2 times
  getEvents: (state, getters, rootState) => {
    // console.log('!!!getEvents', !!rootState.mappedEvents)

    if (!rootState.mappedEvents) return null;
    const events = {
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
    return events
  },

  // Выберите свой пляж
  // TODO calls two times
  getChooseYourBeach: (state, getters, rootState, rootGetters) => {
    // console.log('!!!getChooseYourBeach', !!rootState.search.searchConfig)
    if (!rootState.search.searchConfig) return null;
    const { beachTypes } = rootState.search.searchConfig.data;
    return [
      {
        title: beachTypes && beachTypes.find(v => v.CODE == 'galechnye-plyazhi') ? beachTypes.find(v => v.CODE == 'galechnye-plyazhi').NAME : null,
        id: beachTypes && beachTypes.find(v => v.CODE == 'galechnye-plyazhi') ? beachTypes.find(v => v.CODE == 'galechnye-plyazhi').EXTERNAL_ID : null
      },
      {
        title: beachTypes && beachTypes.find(v => v.CODE == 'peschanye-plyazhi') ? beachTypes.find(v => v.CODE == 'peschanye-plyazhi').NAME : null,
        id: beachTypes && beachTypes.find(v => v.CODE == 'peschanye-plyazhi') ? beachTypes.find(v => v.CODE == 'peschanye-plyazhi').EXTERNAL_ID : null
      },
      {
        title: beachTypes && beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi') ? beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi').NAME : null,
        id: beachTypes && beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi') ? beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi').EXTERNAL_ID : null
      }
    ]
  },

  // Активный отдых
  getActiveRest: state => {
    // console.log('!!!getActiveRest', state.collectionList.data)
    if (!state.collectionList.data) return null;
    const { list } = state.collectionList.data
    let activeRest = list.find(v => v.CODE == 'active-leisure');
    const ret = {}
    if (activeRest) {
      let curFilters, curFilter;

      ret.activeRest = [
        {"title":"Серфинг","pic":google_pic,"beachNumber":2,"filter":[{"type":"addTags","id":"fake","value":true}]},
        {"title":"Яхты и катера","pic":google_pic,"beachNumber":4,"filter":[{"type":"addTags","id":"fake","value":true}]},
        {"title":"Вечеринки","pic":google_pic,"beachNumber":9,"filter":[{"type":"tags","id":"fake","value":true}]}
      ]
      let truth_activeRest = [];
      for (let i = 0; i < activeRest.COLLECTIONS.length; i++) {
        truth_activeRest.push({
          title: activeRest.COLLECTIONS[i].NAME,
          pic: activeRest.COLLECTIONS[i].PREVIEW_PICTURE ? (activeRest.COLLECTIONS[i].PREVIEW_PICTURE) : null,
          beachNumber: activeRest.COLLECTIONS[i].COUNT_BEACHES ? activeRest.COLLECTIONS[i].COUNT_BEACHES : 0,
          filter: []
        });

        curFilters = Object.entries(activeRest.COLLECTIONS[i].SEARCH_FILTER)[0]
        if(curFilters[1]) {
          for (let j = 0; j < curFilters[1].length; j++) {
            curFilter = curFilters[0].toLowerCase().split('_');
            for (let k = 1; k < curFilter.length; k++) { // don't touch the first value
              curFilter[k] = curFilter[k].charAt(0).toUpperCase() + curFilter[k].slice(1);
            }
            truth_activeRest[i].filter.push({
              type: curFilter.join(''),
              id: curFilters[1][j],
              value: true
            });
          }
        }
      }
      ret.activeRest = truth_activeRest
    } else {
      ret.activeRest = null;
    }
    return ret.activeRest;
  },

  getWeather: state => {
    // console.log('!!!getWeather', state.weather.data)
    if (!state.weather.data) return null;

    let curCluster;
    let weatherData = Object.keys(state.weather.data.list).map((k) => state.weather.data.list[k]);

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

  getMobileSettings: state => {
    // Mobile settings
    // console.log('getMobileSettings', state.mobile_settings.data)
    const ret = {}
    ret.mobile_settings = [];
    if (state.mobile_settings.data) {
      for (let i = 0; i < state.mobile_settings.data.list.length; i++) {
        ret.mobile_settings.push({
          active: state.mobile_settings.data.list[i].ACTIVE,
          id: state.mobile_settings.data.list[i].ID,
          code: state.mobile_settings.data.list[i].CODE,
          value: state.mobile_settings.data.list[i].VALUE,
        });
      }
    } else {
      ret.mobile_settings = null;
    }

    return ret.mobile_settings;
  },

  getChooseToYourWishes: state => {
    // console.log('getChooseToYourWishes', state.collectionList.data)
    // Выбирайте по своим желаниям
    let ret = {}
    if (state.collectionList.data) {
      let beachType = state.collectionList.data.list.find(v => v.CODE == 'choose-to-your-wishes');

      if (beachType) {
        ret.chooseToYourWishes = {
          title: beachType.NAME,
          cards: []
        }
        let curFilters, curFilter;

        for (let i = 0; i < beachType.COLLECTIONS.length; i++) {
          ret.chooseToYourWishes.cards.push({
            title: beachType.COLLECTIONS[i].NAME,
            pic: beachType.COLLECTIONS[i].PREVIEW_PICTURE ? (beachType.COLLECTIONS[i].PREVIEW_PICTURE) : null,
            beachNumber: beachType.COLLECTIONS[i].COUNT_BEACHES ? beachType.COLLECTIONS[i].COUNT_BEACHES : 0,
            description: beachType.COLLECTIONS[i].DESCRIPTION,
            filter: []
          });

          curFilters = Object.entries(beachType.COLLECTIONS[i].SEARCH_FILTER)[0]
          if(curFilters[1]) {
            for (let j = 0; j < curFilters[1].length; j++) {
              curFilter = curFilters[0].toLowerCase().split('_');
              for (let k = 1; k < curFilter.length; k++) { // don't touch the first value
                curFilter[k] = curFilter[k].charAt(0).toUpperCase() + curFilter[k].slice(1);
              }
              ret.chooseToYourWishes.cards[i].filter.push({
                type: curFilter.join(''),
                id: curFilters[1][j],
                value: true
              });
            }
          }
        }
      } else {
        ret.chooseToYourWishes = null;
      }
    } else {
      ret.chooseToYourWishes = null;
    }
    return ret.chooseToYourWishes;
  },
}
