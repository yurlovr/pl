export const state = () => ({
    allBeaches: [],
    popularBeaches: [],
    cities: [],
    events: [],
    dynamicSlider: [],
    weather: [],
    beachTypes: {},
    collection: {},
    collectionList: {},
    banners: {},
    map: {},
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_POPULAR_BEACH: (state, payload) => {
       state.popularBeaches = payload;
    },

    SET_ALL_BEACHES: (state, payload) => {
       state.allBeaches = payload;
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

    SET_BANNERS: (state, payload) => {
        state.banners = payload;

        if (state.banners.data)
            state.banners.data.list.sort((a,b) => (parseInt(a.POSITION)-parseInt(b.POSITION)));
    }
}

export const actions = {
    async getPopularBeaches({commit}) {
        commit('SET_ALL_BEACHES', await this.$axios.$get('/beach/list'));
        commit('SET_POPULAR_BEACH', await this.$axios.$get('/beach/top?count=10'));
    },

    async getCities({commit}) {
        commit('SET_CITIES', await this.$axios.$get('/city/list'));
    },

    async getEvents({commit}) {
        commit('SET_EVENTS', await this.$axios.$get('/event/list'));
    },

    async getDynamicSlider({commit}) {
        commit('SET_DYNAMIC_SLIDER', await this.$axios.$get('/collection/list'));
    },

    async getWeather({commit}) {
        commit('SET_WEATHER', await this.$axios.$get('/weather/list'));
    },

    async getBeachTypes({commit}) {
        commit('SET_CITY_BEACH_TYPE', await this.$axios.$get('/search/filter?tags%5B%5D=14'));
        commit('SET_WILD_BEACH_TYPE', await this.$axios.$get('/search/filter?tags%5B%5D=15'));
    },

    async getCollection({commit}) {
        commit('SET_COLLECTION', await this.$axios.$get('/collection/list/'));
    },

    async getCollectionList({commit}) {
        commit('SET_COLLECTION_LIST', await this.$axios.$get('/collectionList/list/'));
    },

    async getBanners({commit}) {
        commit('SET_BANNERS', await this.$axios.$get('/banner/list/'));
    },

    async getMap({commit}) {
        commit('SET_MAP', await this.$axios.$get('/beach/clusters/'));
    }
}

export const getters = {
    popularBeachesData: (state) => {
        if (!state.popularBeaches.data || !state.allBeaches.data) return null;

        let ret = {
        	title: 'Самые популярные пляжи',
            subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
            beachNumber: state.allBeaches.data.list.length,
            beachSliderData: {
                slideNumber: 4,
                cardData: []
            }
    	}

        // adding formatted beaches
        for (let i = 0; i < state.popularBeaches.data.list.length; i++) {
            ret.beachSliderData.cardData.push({
                tempWater: state.popularBeaches.data.list[i].TEMP.WATER,
                favorite: false,
                paid: state.popularBeaches.data.list[i].PAID,
                rating: parseFloat(state.popularBeaches.data.list[i].AVERAGE_RATING),
                title: state.popularBeaches.data.list[i].NAME,
                location: state.popularBeaches.data.list[i].CITY.NAME,
                pic: state.api + state.popularBeaches.data.list[i].PHOTOS[0],
                mainLink: `beach/${state.popularBeaches.data.list[i].ID}`,
                beachLink: `beach/${state.popularBeaches.data.list[i].ID}`
            });
        }

    	return ret;
    },

    citiesData: (state) => {
        if (!state.cities.data) return null;

        let ret = [];

        for (let i = 0; i < state.cities.data.list.length; i++) {
            if (state.cities.data.list[i].COUNT_BEACHES > 0)
                ret.push({
                    city: state.cities.data.list[i].NAME,
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
            beachNumber: state.events.data.list.length,
            beachSliderData: {
                slideNumber: 4,
                cardData: []
            }
        }

        // adding formatted events
        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.beachSliderData.cardData.push({
                temperature: state.events.data.list[i].BEACH.TEMP.WATER,
                favorite: false,
                paid: state.events.data.list[i].PAID,
                date: `${state.events.data.list[i].ACTIVE_FROM} - ${state.events.data.list[i].ACTIVE_TO}`,
                title: state.events.data.list[i].NAME,
                beach: state.events.data.list[i].BEACH.NAME,
                location: state.events.data.list[i].BEACH.CITY.NAME,
                pic: state.api + state.events.data.list[i].PHOTOS[0],
                mainLink: `event/${state.events.data.list[i].ID}`,
                beachLink: `beach/${state.events.data.list[i].BEACH.ID}`
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

    familyData: (state) => {
        if (!state.collection.data) return null;
        
        let family = state.collection.data.list.find(v => v.CODE == 'for_all_family');

        let ret = {
            title: 'Отдых для всей семьи',
            subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
            beachNumber: family.BEACHES.length,
            beachSliderData: {
                slideNumber: 6,
                cardData: []
            }
        }

        // adding formatted beaches
        for (let i = 0; i < Math.min(8, family.BEACHES.length); i++) {
            ret.beachSliderData.cardData.push({
                temperature: family.BEACHES[i].TEMP.WATER,
                favorite: false,
                paid: family.BEACHES[i].PAID,
                rating: parseFloat(family.BEACHES[i].AVERAGE_RATING),
                title: family.BEACHES[i].NAME,
                location: family.BEACHES[i].CITY.NAME,
                pic: state.api + family.BEACHES[i].PHOTOS[0],
                mainLink: `beach/${family.BEACHES[i].ID}`,
                beachLink: `beach/${family.BEACHES[i].ID}`
            });
        }

        return ret;
    },

    activeRestData: (state) => {
        if (!state.collectionList.data) return null;

        let activeRest = state.collectionList.data.list.find(v => v.CODE == 'active-leisure');

        let ret = [];

        for (let i = 0; i < activeRest.COLLECTIONS.length; i++) {
            ret.push({
                link: '#',
                title: activeRest.COLLECTIONS[i].NAME,
                pic: activeRest.COLLECTIONS[i].PREVIEW_PICTURE ? (state.api + activeRest.COLLECTIONS[i].PREVIEW_PICTURE) : null,
                beachNumber: activeRest.COLLECTIONS[i].BEACHES.length
            });
        }

        return ret;
    },

    beachTypeData: (state) => {
        if (!state.collectionList.data) return null;

        let beachType = state.collectionList.data.list.find(v => v.CODE == 'choose-to-your-wishes');
    
        let ret = {
            title: beachType.NAME,
            cards: []
        };

        for (let i = 0; i < beachType.COLLECTIONS.length; i++) {
            ret.cards.push({
                title: beachType.COLLECTIONS[i].NAME,
                pic: beachType.COLLECTIONS[i].PREVIEW_PICTURE ? (state.api + beachType.COLLECTIONS[i].PREVIEW_PICTURE) : null,
                beachNumber: beachType.COLLECTIONS[i].BEACHES.length,
                description: beachType.COLLECTIONS[i].DESCRIPTION,
                code: beachType.COLLECTIONS[i].CODE
            });
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
                    pics: [ ...clusters[i][j].PHOTOS.map(v => state.api + v) ]
                });
            }
            ret.addressBeaches.push({
                clusterCenter: clusterCenters[i],
                beaches: curCluster
            });
        }

        return ret;
    }
}
