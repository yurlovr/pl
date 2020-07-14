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
})

export const mutations = {
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
    }
}

export const actions = {
    async getMainPageData({commit, state}, callback) {
        if (state.geo.id) {
            commit('SET_POPULAR_BEACH', await this.$axios.$get(`/beach/list?city=${state.geo.id}&count=45`));
            commit('SET_GEO_COUNT', state.beachesTop.data ? state.beachesTop.data.list.length : 0)
        }
        if (!state.geo.id || !state.geo.count)
            commit('SET_POPULAR_BEACH', await this.$axios.$get('/beach/top?count=45'));
        commit('SET_CITIES', await this.$axios.$get('/city/top?count=9999'));
        commit('SET_WEATHER', await this.$axios.$get('/weather/list'));
        commit('SET_COLLECTION', await this.$axios.$get('/collection/list/'));
        commit('SET_COLLECTION_LIST', await this.$axios.$get('/collectionList/list/'));
        commit('SET_BANNERS', await this.$axios.$get('/banner/list/'));
        commit('SET_MAP', await this.$axios.$get('/beach/clusters/'));
        commit('SET_ANY_PLACES', await this.$axios.$get('/hotel/list?count=9999'));
        callback();
    }
}

export const getters = {
    mainData: (state, getters, rootState, rootGetters) => {
        let ret = {};

        // Популярные пляжи
            if (state.beachesTop.data) {
                ret.beachesTop = {
                    title: 'Самые популярные пляжи' + (state.geo.id && state.geo.count && state.geo.count != 0 && state.state.beachesTop.data.list[0] && state.state.beachesTop.data.list[0].CITY ? ' ' + state.state.beachesTop.data.list[0].CITY.NAME : ''),
                    subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
                    beachNumber: Math.min(state.beachesTop.data.list.length, 45),
                    showMore: {
                        type: 'beach',
                        query: '?popular&'
                    },
                    beachSliderData: {
                        slideNumber: 4,
                        cardData: []
                    }
                }
                if (state.geo.id && state.geo.count && state.geo.count > 0) {
                    ret.beachesTop.showMore.query += `city=${state.geo.id}&`;
                }
                ret.beachesTop.showMore.query = ret.beachesTop.showMore.query.slice(0, -1); // get rid of last &
                for (let i = 0; i < Math.min(state.beachesTop.data.list.length, 10); i++) {
                    ret.beachesTop.beachSliderData.cardData.push({
                        access: state.beachesTop.data.list[i].ACCESS || null,
                        tempWater: state.beachesTop.data.list[i].WEATHER ? state.beachesTop.data.list[i].WEATHER.TEMP.WATER : null,
                        showFavorite: true,
                        paid: state.beachesTop.data.list[i].PAID,
                        rating: parseFloat(state.beachesTop.data.list[i].AVERAGE_RATING),
                        title: state.beachesTop.data.list[i].NAME,
                        location: state.beachesTop.data.list[i].CITY ? state.beachesTop.data.list[i].CITY.NAME : null,
                        pic: state.beachesTop.data.list[i].PREVIEW ? state.beachesTop.data.list[i].PREVIEW : null,
                        mainLink: `beach/${state.beachesTop.data.list[i].ID}`,
                        beachLink: `beach/${state.beachesTop.data.list[i].ID}`,
                        humanLink: state.beachesTop.data.list[i].CODE ? `beach/${state.beachesTop.data.list[i].CODE}` : null,
                        locationId: state.beachesTop.data.list[i].CITY ? state.beachesTop.data.list[i].CITY.ID : -1,
                        beachId: state.beachesTop.data.list[i].ID,
                        coordinates: state.beachesTop.data.list[i].COORDINATES.length ? state.beachesTop.data.list[i].COORDINATES.split(',') : [],
                        show_distance: true,
                    });
                }
            } else {
                ret.beachesTop = null;
            }

        // Курортные города
            ret.citiesTop = [];
            if (state.citiesTop.data) {
                let cities = state.citiesTop.data.list.slice();
                cities.sort((a,b) => (a.COUNT_BEACHES < b.COUNT_BEACHES) ? 1 : -1)
                for (let i = 0; i < Math.min(10, cities.length); i++) {
                    if (cities[i].COUNT_BEACHES > 0)
                        ret.citiesTop.push({
                            city: cities[i].NAME,
                            cityId: cities[i].ID,
                            beachNumber: cities[i].COUNT_BEACHES,
                            pic: cities[i].PREVIEW_PICTURE ? cities[i].PREVIEW_PICTURE : null
                        });
                }
            } else {
                ret.citiesTop = null;
            }
            if (ret.citiesTop && ret.citiesTop.length == 0)
                ret.citiesTop = null;

        // Карта пляжей
            if (state.map.data) {
                let clusterCenters = [], curCluster;
                console.log(state.map.data.list, 'state.map.data.list')
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
                            pics: clusters[i][j].PHOTOS && clusters[i][j].PHOTOS.medium ? [ ...clusters[i][j].PHOTOS.medium ] : null,
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
            } else {
                ret.map = null;
            }

        // Баннеры
            ret.banners = [];
            if (state.banners.data) {
                for (let i = 0; i < state.banners.data.list.length; i++) {
                    ret.banners.push({
                        title: state.banners.data.list[i].NAME,
                        description: state.banners.data.list[i].DESCRIPTION,
                        link: state.banners.data.list[i].LINK,
                        pic: state.banners.data.list[i].PREVIEW_PICTURE,
                        buttonText: state.banners.data.list[i].BUTTON_NAME,
                        // by default pic is on the left
                        rightToLeft: state.banners.data.list[i].PICTURE_POSITION == 'right'
                    });
                }
            } else {
                ret.banners = null;
            }

        // Отдых для всей семьи
            if (state.collection.data) {
                let family = state.collection.data.list.find(v => v.CODE == 'for_all_family');
                if (family) {
                    ret.familyRest = {
                        title: 'Отдых для всей семьи',
                        subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
                        beachNumber: Math.min(family.BEACHES.length, 45),
                        showMore: {
                            type: 'beach',
                            query: '?family'
                        },
                        beachSliderData: {
                            slideNumber: 6,
                            cardData: []
                        }
                    }

                    for (let i = 0; i < Math.min(10, family.BEACHES.length); i++) {
                        ret.familyRest.beachSliderData.cardData.push({
                            temperature: family.BEACHES[i].WEATHER ? family.BEACHES[i].WEATHER.TEMP.WATER : null,
                            showFavorite: true,
                            paid: family.BEACHES[i].PAID,
                            rating: parseFloat(family.BEACHES[i].AVERAGE_RATING),
                            title: family.BEACHES[i].NAME,
                            location: family.BEACHES[i].CITY ? family.BEACHES[i].CITY.NAME : null,
                            locationId: family.BEACHES[i].CITY ? family.BEACHES[i].CITY.ID : -1,
                            pic: family.BEACHES[i].PHOTOS[0],
                            mainLink: `beach/${family.BEACHES[i].ID}`,
                            beachLink: `beach/${family.BEACHES[i].ID}`,
                            humanLink: family.BEACHES[i].CODE ? `beach/${family.BEACHES[i].CODE}` : null,
                            beachId: family.BEACHES[i].ID,
                            coordinates: family.BEACHES[i].COORDINATES.length ? family.BEACHES[i].COORDINATES.split(',') : [],
                            show_distance: true
                        });
                    }
                } else {
                    ret.familyRest = null;
                }
            } else {
                ret.familyRest = null;
            }

            if (state.any_places.data){
              let another_places = state.any_places.data.list

              ret.another_places = {
                title: 'Где остановиться в Крыму',
                subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
                beachNumber: another_places.length,
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

            }

        // Ближайшие мероприятия
            if (rootGetters.events) {
                ret.events = {
                    title: 'Ближайшие мероприятия на пляжах',
                    beachNumber: Math.min(rootGetters.events.length, 45),
                    showMore: {
                        type: 'event',
                        query: null
                    },
                    beachSliderData: {
                        slideNumber: 4,
                        cardData: rootGetters.events.slice(0, 10)
                    }
                }
            } else {
                ret.events = null;
            }

        // Выберите свой пляж
            if (rootState.search.searchConfig) {

                ret.chooseYourBeach = [
                    {
                        title: rootState.search.searchConfig.data.beachTypes && rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'galechnye-plyazhi') ? rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'galechnye-plyazhi').NAME : null,
                        id: rootState.search.searchConfig.data.beachTypes && rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'galechnye-plyazhi') ? rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'galechnye-plyazhi').EXTERNAL_ID : null
                    },
                    {
                        title: rootState.search.searchConfig.data.beachTypes && rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'peschanye-plyazhi') ? rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'peschanye-plyazhi').NAME : null,
                        id: rootState.search.searchConfig.data.beachTypes && rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'peschanye-plyazhi') ? rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'peschanye-plyazhi').EXTERNAL_ID : null
                    },
                    {
                        title: rootState.search.searchConfig.data.beachTypes && rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi') ? rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi').NAME : null,
                        id: rootState.search.searchConfig.data.beachTypes && rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi') ? rootState.search.searchConfig.data.beachTypes.find(v => v.CODE == 'rakushechnye-plyazhi').EXTERNAL_ID : null
                    }
                ]

            } else {
                ret.chooseYourBeach = null;
            }

        // Активный отдых
            if (state.collectionList.data) {
                let activeRest = state.collectionList.data.list.find(v => v.CODE == 'active-leisure');

                if (activeRest) {
                    let curFilters, curFilter;

                    ret.activeRest = []
                    for (let i = 0; i < activeRest.COLLECTIONS.length; i++) {
                        ret.activeRest.push({
                            title: activeRest.COLLECTIONS[i].NAME,
                            pic: activeRest.COLLECTIONS[i].PREVIEW_PICTURE ? (activeRest.COLLECTIONS[i].PREVIEW_PICTURE) : null,
                            beachNumber: activeRest.COLLECTIONS[i].BEACHES ? activeRest.COLLECTIONS[i].BEACHES.length : 0,
                            filter: []
                        });

                        curFilters = Object.entries(activeRest.COLLECTIONS[i].SEARCH_FILTER)[0]
                        if(curFilters[1]) {
                            for (let j = 0; j < curFilters[1].length; j++) {
                                curFilter = curFilters[0].toLowerCase().split('_');
                                for (let k = 1; k < curFilter.length; k++) { // don't touch the first value
                                    curFilter[k] = curFilter[k].charAt(0).toUpperCase() + curFilter[k].slice(1);
                                }
                                ret.activeRest[i].filter.push({
                                    type: curFilter.join(''),
                                    id: curFilters[1][j],
                                    value: true
                                });
                            }
                        }
                    }
                } else {
                    ret.activeRest = null;
                }
            } else {
                ret.activeRest = null;
            }

        // Погода
            if (state.weather.data) {
                let curCluster,
                    weatherData = Object.keys(state.weather.data.list).map((k) => state.weather.data.list[k]);

                if (weatherData) {
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
                } else {
                    ret.weather = null;
                }
            } else {
                ret.weather = null;
            }

        // Выбирайте по своим желаниям
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
                            beachNumber: beachType.COLLECTIONS[i].BEACHES ? beachType.COLLECTIONS[i].BEACHES.length : 0,
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

        return ret;
    }
}
