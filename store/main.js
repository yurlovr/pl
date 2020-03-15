export const state = () => ({
    beachesTop: [],
    citiesTop: [],
    events: [],
    dynamicSlider: [],
    weather: [],
    beachTypes: {},
    collection: {},
    collectionList: {},
    banners: {},
    map: {},
    searchData: {},
    geo: {},
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_POPULAR_BEACH: (state, payload) => {
       state.beachesTop = payload;
    },

    SET_CITIES: (state, payload) => {
        state.cities = payload;
    },

    SET_EVENTS: (state, payload) => {
        state.events = payload;
    },

    SET_DYNAMIC_SLIDER: (state, payload) => {
        state.dynamicSlider = payload;
    },

    SET_WEATHER: (state, payload) => {
        state.weather = payload;
    },

    SET_CITY_BEACH_TYPE: (state, payload) => {
        state.beachTypes.city = payload;
    },

    SET_WILD_BEACH_TYPE: (state, payload) => {
        state.beachTypes.wild = payload;
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

    SET_SEARCH_DATA: (state, payload) => {
        state.searchData = payload;
    },

    SET_BANNERS: (state, payload) => {
        state.banners = payload;

        if (state.banners.data)
            state.banners.data.list.sort((a,b) => (parseInt(a.POSITION) - parseInt(b.POSITION)));
    },

    SET_GEO: (state, payload) => {
        state.geo = payload;
    }
}

export const actions = {
    async getMainPageData({commit, state}) {
        commit('SET_GEO', await this.$axios.$get('/geo/item'));
        commit('SET_SEARCH_DATA', await this.$axios.$get('/search/config/'));
        if (state.geo && state.geo.data && state.geo.data.city)
            commit('SET_POPULAR_BEACH', await this.$axios.$get(`/beach/list?city=${state.geo.data.city.ID}&count=10`));
        if (!state.beachesTop.data || !state.geo.data || !state.geo.data.city)
            commit('SET_POPULAR_BEACH', await this.$axios.$get('/beach/top?count=10'));
        commit('SET_CITIES', await this.$axios.$get('/city/top'));
        commit('SET_EVENTS', await this.$axios.$get('/event/list'));
        commit('SET_DYNAMIC_SLIDER', await this.$axios.$get('/collection/list'));
        commit('SET_WEATHER', await this.$axios.$get('/weather/list'));
        commit('SET_CITY_BEACH_TYPE', await this.$axios.$get('/search/filter?tags%5B%5D=14'));
        commit('SET_WILD_BEACH_TYPE', await this.$axios.$get('/search/filter?tags%5B%5D=15'));
        commit('SET_COLLECTION', await this.$axios.$get('/collection/list/'));
        commit('SET_COLLECTION_LIST', await this.$axios.$get('/collectionList/list/'));
        commit('SET_BANNERS', await this.$axios.$get('/banner/list/'));
        commit('SET_MAP', await this.$axios.$get('/beach/clusters/'));
    },
}

export const getters = {
    beachesTopData: (state) => {
        if (!state.beachesTop.data) return null;

        let ret = {
        	title: 'Самые популярные пляжи' + (state.geo.data && state.geo.data.city ? ' ' + state.geo.data.city.NAME : ''),
            subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
            beachNumber: Math.min(state.beachesTop.data.list.length, 45),
            showMore: [{
                id: state.searchData.data.tags.find(v => v.NAME == 'Популярные') ? state.searchData.data.tags.find(v => v.NAME == 'Популярные').ID : -1,
                value: true,
                type: 'tags'
            }],
            beachSliderData: {
                slideNumber: 4,
                cardData: []
            }
    	}

        // adding geotargeting beachTop link to showMore
        if (state.geo.data) {
            ret.showMore.push({
                param: 'cities',
                value: {
                    id: state.beachesTop.data.list[0].CITY ? state.beachesTop.data.list[0].CITY.ID : -1,
                    title: state.beachesTop.data.list[0].CITY.NAME
                },
                query: 'city'
            })
        }

        // adding formatted beaches
        for (let i = 0; i < Math.min(state.beachesTop.data.list.length, 10); i++) {
            ret.beachSliderData.cardData.push({
                tempWater: state.beachesTop.data.list[i].WEATHER.TEMP.WATER,
                showFavorite: true,
                paid: state.beachesTop.data.list[i].PAID,
                rating: parseFloat(state.beachesTop.data.list[i].AVERAGE_RATING),
                title: state.beachesTop.data.list[i].NAME,
                location: state.beachesTop.data.list[i].CITY.NAME,
                pic: state.api + state.beachesTop.data.list[i].PHOTOS[0],
                mainLink: state.beachesTop.data.list[i] ? `beach/${state.beachesTop.data.list[i].ID}` : '',
                beachLink: state.beachesTop.data.list[i] ? `beach/${state.beachesTop.data.list[i].ID}` : '',
                locationId: state.beachesTop.data.list[i].CITY ? state.beachesTop.data.list[i].CITY.ID : -1,
                beachId: state.beachesTop.data.list[i] ? state.beachesTop.data.list[i].ID : -1
            });
        }

    	return ret;
    },

    familyData: (state) => {
        if (!state.collection.data) return null;
        
        let family = state.collection.data.list.find(v => v.CODE == 'for_all_family');

        let ret = {
            title: 'Отдых для всей семьи',
            subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
            beachNumber: Math.min(family.BEACHES.length, 45),
            showMore: [{
                id: state.searchData.data.tags.find(v => v.NAME == 'Отдых для всей семьи') ? state.searchData.data.tags.find(v => v.NAME == 'Отдых для всей семьи').ID : -1,
                value: true,
                type: 'tags'
            }],
            beachSliderData: {
                slideNumber: 6,
                cardData: []
            }
        }

        // adding formatted beaches
        for (let i = 0; i < Math.min(10, family.BEACHES.length); i++) {
            ret.beachSliderData.cardData.push({
                temperature: family.BEACHES[i].WEATHER.TEMP.WATER,
                showFavorite: true,
                paid: family.BEACHES[i].PAID,
                rating: parseFloat(family.BEACHES[i].AVERAGE_RATING),
                title: family.BEACHES[i].NAME,
                location: family.BEACHES[i].CITY.NAME,
                locationId: family.BEACHES[i].CITY ? family.BEACHES[i].CITY.ID : -1,
                pic: state.api + family.BEACHES[i].PHOTOS[0],
                mainLink: family.BEACHES[i] ? `beach/${family.BEACHES[i].ID}` : '',
                beachLink: family.BEACHES[i] ? `beach/${family.BEACHES[i].ID}` : '',
                beachId: family.BEACHES[i] ? family.BEACHES[i].ID : -1
            });
        }

        return ret;
    },

    citiesTopData: (state) => {
        if (!state.cities.data) return null;

        let ret = [];

        for (let i = 0; i < Math.min(state.cities.data.list.length, 10); i++) {
            if (state.cities.data.list[i].COUNT_BEACHES > 0)
                ret.push({
                    city: state.cities.data.list[i].NAME,
                    cityId: state.cities.data.list[i] ? state.cities.data.list[i].ID : -1,
                    beachNumber: state.cities.data.list[i].COUNT_BEACHES,
                    pic: state.cities.data.list[i].PREVIEW_PICTURE ? state.api + state.cities.data.list[i].PREVIEW_PICTURE : null
                });
        }

        return ret;
    },

    eventsData: (state) => {
        if (!state.events.data) return null;

        let ret = {
            title: 'Ближайшие мероприятия на пляжах',
            beachNumber: Math.min(state.events.data.list.length, 45),
            showMore: {
                id: state.searchData.data.tags.find(v => v.NAME == 'Мероприятия') ? state.searchData.data.tags.find(v => v.NAME == 'Мероприятия').ID : -1,
                value: true,
                type: 'tags'
            },
            beachSliderData: {
                slideNumber: 4,
                cardData: []
            }
        }

        // adding formatted events
        for (let i = 0; i < Math.min(state.events.data.list.length, 10); i++) {
            ret.beachSliderData.cardData.push({
                temperature: state.events.data.list[i].BEACH.WEATHER.TEMP.WATER,
                showFavorite: true,
                paid: state.events.data.list[i].PAID,
                date: `${state.events.data.list[i].ACTIVE_FROM} ${state.events.data.list[i].ACTIVE_TO ? '-' : ''} ${state.events.data.list[i].ACTIVE_TO ? state.events.data.list[i].ACTIVE_TO : ''}`,
                title: state.events.data.list[i].NAME,
                beach: state.events.data.list[i].BEACH.NAME,
                location: state.events.data.list[i].BEACH.CITY.NAME,
                locationId: state.events.data.list[i].BEACH.CITY ? state.events.data.list[i].BEACH.CITY.ID : -1,
                pic: state.api + state.events.data.list[i].PHOTOS[0],
                mainLink: state.events.data.list[i] ? `event/${state.events.data.list[i].ID}` : -1,
                beachLink: state.events.data.list[i].BEACH ? `beach/${state.events.data.list[i].BEACH.ID}` : -1,
                eventId: state.events.data.list[i] ? state.events.data.list[i].ID : -1
            });
        }

        return ret;
    },

    dynamicSliderData: (state) => {
        if (!state.dynamicSlider.data) return null;

        let ret = [];

        for (let i = 0; i < state.dynamicSlider.data.list.length; i++) {
            ret.push({
                title: state.dynamicSlider.data.list[i],
                beachNumber: state.dynamicSlider.data.list[i],
                pic: state.dynamicSlider.data.list[i]
            });
        }

        return ret;
    },

    beachTypeData: (state) => {
        if (!state.beachTypes.city.data || !state.beachTypes.wild.data) return null;

        let ret = {
            beachNumber1: state.beachTypes.city.data.list.length,
            beachNumber2: state.beachTypes.wild.data.list.length
        };

        return ret;
    },

    activeRestData: (state) => {
        if (!state.collectionList.data) return null;

        let activeRest = state.collectionList.data.list.find(v => v.CODE == 'active-leisure');

        let ret = [], curFilters, curFilter;

        for (let i = 0; i < activeRest.COLLECTIONS.length; i++) {
            ret.push({
                title: activeRest.COLLECTIONS[i].NAME,
                pic: activeRest.COLLECTIONS[i].PREVIEW_PICTURE ? (state.api + activeRest.COLLECTIONS[i].PREVIEW_PICTURE) : null,
                beachNumber: activeRest.COLLECTIONS[i].BEACHES.length,
                filter: []
            });

            curFilters = Object.entries(activeRest.COLLECTIONS[i].SEARCH_FILTER)[0]
            if(curFilters[1]) {
                for (let j = 0; j < curFilters[1].length; j++) {
                    curFilter = curFilters[0].toLowerCase().split('_');
                    for (let k = 1; k < curFilter.length; k++) { // don't touch the first value
                        curFilter[k] = curFilter[k].charAt(0).toUpperCase() + curFilter[k].slice(1);
                    }
                    ret[i].filter.push({
                        type: curFilter.join(''),
                        id: curFilters[1][j],
                        value: true
                    });
                }
            }
        }

        return ret;
    },

    beachTypeData: (state) => {
        if (!state.collectionList.data) return null;

        let beachType = state.collectionList.data.list.find(v => v.CODE == 'choose-to-your-wishes');
    
        let ret = {
            title: beachType.NAME,
            cards: []
        }, curFilters, curFilter;

        for (let i = 0; i < beachType.COLLECTIONS.length; i++) {
            ret.cards.push({
                title: beachType.COLLECTIONS[i].NAME,
                pic: beachType.COLLECTIONS[i].PREVIEW_PICTURE ? (state.api + beachType.COLLECTIONS[i].PREVIEW_PICTURE) : null,
                beachNumber: beachType.COLLECTIONS[i].BEACHES.length,
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
                    ret.cards[i].filter.push({
                        type: curFilter.join(''),
                        id: curFilters[1][j],
                        value: true
                    });
                }
            }
        }

        return ret;
    },

    bannersData: (state) => {
        if (!state.banners.data) return null;

        let ret = [];

        for (let i = 0; i < state.banners.data.list.length; i++) {
            ret.push({
                title: state.banners.data.list[i].NAME,
                description: state.banners.data.list[i].DESCRIPTION,
                link: state.banners.data.list[i].LINK,
                pic: state.api + state.banners.data.list[i].PREVIEW_PICTURE,
                buttonText: state.banners.data.list[i].BUTTON_NAME,
                // by default pic is on the left
                rightToLeft: state.banners.data.list[i].PICTURE_POSITION == 'right'
            });
        }

        return ret;
    },

    weatherData: (state) => {
        if (!state.weather.data) return null;

        let ret = [],
        curCluster,
        weatherData = Object.keys(state.weather.data.list).map((k) => state.weather.data.list[k]);

        for (let i = 0; i < weatherData.length; i++) {
            curCluster = [];
            for (let j = 0; j < weatherData[i].length; j++) {
                curCluster.push({
                    city: weatherData[i][j].CITY.NAME,
                    pic: state.api + '/' + weatherData[i][j].CITY.PREVIEW_PICTURE,
                    airTemperature: parseFloat(weatherData[i][j].TEMP.AIR),
                    waterTemperature: parseFloat(weatherData[i][j].TEMP.WATER)
                })
            }
            ret.push(curCluster);
        }

        return ret;
    },

    mapData: (state) => {
        if (!state.map.data) return null;

        let clusterCenters = [], curCluster;
        let clusters = Object.keys(state.map.data.list).map((k) => state.map.data.list[k]);
        for (let i = 0; i < clusters.length; i++) {
            curCluster = clusters[i].filter(v => v.COORDINATES != '');
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

        let ret = {
            center: [
                clusterCenters.length != 1 ? ([ clusterCenters.reduce((a, b) => {
                        if (typeof a === 'object') a = a[0];
                            return a + b[0];
                    }) / clusterCenters.length,
                    clusterCenters.reduce((a, b) => {
                        if (typeof a === 'object') a = a[1];
                            return a + b[1];
                    }) / clusterCenters.length
                ]) : clusterCenters[0]
            ],
            addressBeaches: []
        }

        for (let i = 0; i < clusters.length; i++) {
            curCluster = [];
            for (let j = 0; j < clusters[i].length; j++) {
                if (isNaN(clusters[i][j].COORDINATES.split(',').map(v => parseFloat(v))[0])) continue;
                curCluster.push({
                    pos: clusters[i][j].COORDINATES.split(',').map(v => parseFloat(v)),
                    rating: parseFloat(clusters[i][j].AVERAGE_RATING),
                    title: clusters[i][j].NAME,
                    location: clusters[i][j].CITY.NAME,
                    locationId: clusters[i][j].CITY ? clusters[i][j].CITY.ID : -1,
                    beachId: clusters[i][j] ? clusters[i][j].ID : -1,
                    pics: [ ...clusters[i][j].PHOTOS.map(v => state.api + v) ],
                    showFavorite: true,
                    paid: clusters[i][j].PAID
                });
            }
            ret.addressBeaches.push({
                clusterCenter: clusterCenters[i],
                beaches: curCluster,
                name: clusters[i][0].CITY.NAME
            });
        }

        if (state.geo.data && state.geo.data.city) {
            ret.geo = {
                id: ret.addressBeaches.findIndex(v => v.name == state.geo.data.city.NAME)
            };
        }

        return ret;
    },

    beachChoiceData: (state) => {
        if (!state.searchData.data) return null;

        return [
            {
                title: state.searchData.data.beachTypes[0].NAME,
                id: state.searchData.data.beachTypes[0] ? state.searchData.data.beachTypes[0].ID : -1
            },
            {
                title: state.searchData.data.beachTypes[1].NAME,
                id: state.searchData.data.beachTypes[1] ? state.searchData.data.beachTypes[1].ID : -1
            },
            {
                title: state.searchData.data.beachTypes[2].NAME,
                id: state.searchData.data.beachTypes[2] ? state.searchData.data.beachTypes[2].ID : -1
            }
        ]
    }
}
