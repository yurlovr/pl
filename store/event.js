export const state = () => ({
    event: [],
    reviews: [],
    visitorPics: [],
    searchConfig: {},
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_EVENT: (state, payload) => {
        state.event = payload;
    },

    SET_REVIEWS: (state, payload) => {
        state.reviews = payload;
    },

    SET_VISITOR_PICS: (state, payload) => {
        state.visitorPics = payload;
    },

    SET_SEARCH_CONFIG: (state, payload) => {
        state.searchConfig = payload;
    }
}

export const actions = {
    async getEvent({commit}, id) {
        let error;
        commit('SET_SEARCH_CONFIG', await this.$axios.$get(`/search/config`));
        commit('SET_EVENT', await this.$axios.$get(`/event/item?id=${id}`).catch(e => {
            console.log(e);
            error = 404;
            return {};
        }));
        if (error) return error;
        commit('SET_REVIEWS', await this.$axios.$get(`/review/list?entityId=${id}`));
        commit('SET_VISITOR_PICS', await this.$axios.$get(`/socialPhoto/list?entityId=${id}&count=10`))
    }
}

export const getters = {
    eventData: (state, getters, rootState) => {
        if (!state.event.data) return {
            hugeSliderData: {},
            mainData: {},
            about: [],
            sideMapData: {},
            ptData: {}
        };

        let ret = {
        	hugeSliderData: {
        		title: state.event.data.item.NAME,
                isBeachClosed: false,
                pics: state.event.data.item.PHOTOS.map((s) => { return state.api + s }),
                goldMedal: null,
                blueMedal: null
        	},

        	mainData: {
                title: state.event.data.item.NAME,
                likes: state.event.data.item.COUNT_FAVORITES,
                location: state.event.data.item.BEACH.CITY.NAME,
                eventId: state.event.data.item.ID,
                beachLength: state.event.data.item.BEACH.PARAMETERS.P_LINE_LENGTH,
                price: state.event.data.item.BEACH.PARAMETERS.P_PRICE,
                beachType: state.event.data.item.BEACH.PARAMETERS.P_BEACH_TYPE.NAME,
                beachSeabedType: state.event.data.item.BEACH.PARAMETERS.P_BOTTOM ? state.event.data.item.BEACH.PARAMETERS.P_BOTTOM.NAME : null,
                time: (state.event.data.item.BEACH.PARAMETERS.P_MODE ? state.event.data.item.BEACH.PARAMETERS.P_MODE.NAME : '')
            },

            about: state.event.data.item.DESCRIPTION,

            reviews: [],

            sideMapWeatherData: {
                title: state.event.data.item.BEACH.NAME,
                date: state.event.data.item.BEACH.WEATHER.DATE,
                pos: (state.event.data.item.BEACH.COORDINATES != '') ? state.event.data.item.BEACH.COORDINATES.split(',').map(v => parseFloat(v)) : [],
                waterTemp: state.event.data.item.BEACH.WEATHER.TEMP.WATER,
                airTemp: state.event.data.item.BEACH.WEATHER.TEMP.AIR
            },

            ptData: {
                title: state.event.data.item.BEACH.NAME,
                pos: (state.event.data.item.BEACH.COORDINATES != '') ? state.event.data.item.BEACH.COORDINATES.split(',').map(v => parseFloat(v)) : null,
                parkings: {
                    auto: [],
                    bus: []
                }
            },

            sections: [
                {
                    title: 'Галерея',
                    hash: 'gallery'
                },
                {
                    title: 'Основные характеристики',
                    hash: 'main-info'
                }
            ],

            otherEvents: {
                title: 'Другие мероприятия на этом пляже',
                showMore: {
                    id: Object.values(state.searchConfig.data.tags).find(v => v.NAME == 'Мероприятия') ? Object.values(state.searchConfig.data.tags).find(v => v.NAME == 'Мероприятия').ID : -1,
                    type: 'tags',
                    value: true
                },
                more: {
                    param: 'cities',
                    value: {
                        id: state.event.data.item.BEACH.CITY.ID,
                        title: state.event.data.item.BEACH.CITY.NAME
                    }
                },
                query: 'city',
                beachSliderData: {
                    slideNumber: 4,
                    cardData: []
                }
            },

            visitorPics: [],
            infraData: []
    	}

        // adding formatted infrastructures
        let filteredInfra = state.event.data.item.BEACH.INFRASTRUCTURES.filter(v => v.CODE != 'parkovka' && v.CODE != 'ostanovki-obshchestvennogo-transporta');
        for (let i = 0; i < filteredInfra.length; i++) {
            ret.infraData.push({
                title: filteredInfra[i].NAME,
                pic: filteredInfra[i].ICON ? state.api + filteredInfra[i].ICON : filteredInfra[i].ICON
            })
        }

        // adding formatted reviews
        for (let i = 0; i < state.reviews.data.list.length; i++) {
            ret.reviews.push({
                pic: state.reviews.data.list[i].PICTURE ? state.api + state.reviews.data.list[i].PICTURE : null,
                name: state.reviews.data.list[i].FIO,
                date: state.reviews.data.list[i].CREATED_DATE,
                rating: state.reviews.data.list[i].AVERAGE_RATING,
                comment: state.reviews.data.list[i].DESCRIPTION
            });
        }

        // adding formatted parkings and stops
        let parkings = state.event.data.item.BEACH.INFRASTRUCTURES.filter(v => v.CODE == 'parkovka'),
            stops = state.event.data.item.BEACH.INFRASTRUCTURES.filter(v => v.CODE == 'ostanovki-obshchestvennogo-transporta')
        for (let i = 0; i < parkings.length; i++) {
            ret.ptData.parkings.auto.push({
                pos: parkings[i].COORDINATES ? parkings[i].COORDINATES.split(',').map(Number) : [],
                title: parkings[i].DESCRIPTION,
                type: 'Автомобильная парковка',
                mode: '',
                address: '',
                price: ''
            })
        }
        for (let i = 0; i < stops.length; i++) {
            ret.ptData.parkings.bus.push({
                pos: stops[i].COORDINATES ? stops[i].COORDINATES.split(',').map(Number) : [],
                title: stops[i].DESCRIPTION,
                buses: '',
                taxi: ''
            })
        }

        // adding formatted visitor pics
        for (let i = 0; i < state.visitorPics.data.list.length; i++) {
            ret.visitorPics.push({
                avatar: state.visitorPics.data.list[i].USER.PICTURE,
                pic: state.visitorPics.data.list[i].PICTURE,
                name: state.visitorPics.data.list[i].USER.FIO,
                comment: state.visitorPics.data.list[i].DESCRIPTION,
                tags: ['#класс']
            });
        }

        // adding formatted other events
        let otherEvents = rootState.events.data.list.filter(v => v.ID != state.event.data.item.ID && v.BEACH.CITY.NAME == state.event.data.item.BEACH.CITY.NAME);
        ret.otherEvents.beachNumber = Math.min(otherEvents.length, 45);
        for (let i = 0; i < otherEvents.length; i++) {
            ret.otherEvents.beachSliderData.cardData.push({
                title: otherEvents[i].NAME,
                date: `${otherEvents[i].ACTIVE_FROM} ${otherEvents[i].ACTIVE_TO ? '-' : ''} ${otherEvents[i].ACTIVE_TO ? otherEvents[i].ACTIVE_TO : ''}`,
                beach: otherEvents[i].BEACH.NAME,
                paid: otherEvents[i].PAID,
                tempWater: otherEvents[i].BEACH.WEATHER.TEMP.WATER,
                mainLink: `event/${otherEvents[i].ID}`,
                beachLink: `beach/${otherEvents[i].BEACH.ID}`,
                location: otherEvents[i].BEACH.CITY.NAME,
                locationId: otherEvents[i].BEACH.CITY.ID,
                pic: state.api + otherEvents[i].PHOTOS[0],
                eventId: otherEvents[i].ID,
                showFavorite: true
            });
        }

        // adding formatted sections
        if (ret.infraData.length > 0)
            ret.sections.push({
                title: 'Инфраструктура',
                hash: 'infra'
            });
        if (ret.about.length > 1 && ret.about[1].paragraph && ret.about[1].paragraph.length > 0)
            ret.sections.push({
                title: 'О мероприятии',
                hash: 'about'
            });
        if (ret.ptData.parkings.auto.length > 0 || ret.ptData.parkings.bus.length > 0)
            ret.sections.push({
                title: 'Парковки и общественный транспорт',
                hash: 'pt'
            });
        // gonna have these anyway
        ret.sections.push({
            title: 'Отзывы гостей',
            hash: 'reviews'
        });
        ret.sections.push({
            title: 'Фото посетителей',
            hash: 'visitor-pics'
        });
        if (ret.otherEvents.beachSliderData.cardData.length > 0)
            ret.sections.push({
                title: 'Другие мероприятия на этом пляже',
                hash: 'other-events'
            });

    	return ret;
    }
}