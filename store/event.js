export const state = () => ({
    event: [],
    reviews: [],
    visitorPics: [],
    announcementData: null,
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

    SET_ANNOUNCEMENT_DATA: (state, payload) => {
        state.announcementData = payload;
    }
}

export const actions = {
    async getEvent({commit}, id) {
        let error;
        commit('SET_EVENT', await this.$axios.$get(`/event/item?id=${id}`).catch(e => {
            console.error(e);
            error = 404;
            return {};
        }));
        if (error) return error;
        commit('SET_REVIEWS', await this.$axios.$get(`/review/list?entityId=${id}&count=9999`));
        commit('SET_VISITOR_PICS', await this.$axios.$get(`/socialPhoto/list?entityId=${id}&count=10`));
        commit('SET_ANNOUNCEMENT_DATA', await this.$axios.$get(`/banner/list?page=/event`));
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
                pics: state.event.data.item.PHOTOS,
                goldMedal: null,
                blueMedal: null
        	},

        	mainData: {
                title: state.event.data.item.NAME,
                likes: state.event.data.item.COUNT_FAVORITES,
                location: state.event.data.item.BEACH && state.event.data.item.BEACH.CITY ? state.event.data.item.BEACH.CITY.NAME : null,
                locationId: state.event.data.item.BEACH && state.event.data.item.BEACH.CITY ? state.event.data.item.BEACH.CITY.ID : null,
                eventId: state.event.data.item.ID,
                beachLength: state.event.data.item.BEACH && state.event.data.item.BEACH.PARAMETERS ? state.event.data.item.BEACH.PARAMETERS.P_LINE_LENGTH : null,
                price: state.event.data.item.BEACH && state.event.data.item.BEACH.PARAMETERS ? state.event.data.item.BEACH.PARAMETERS.P_PRICE: null,
                beachType: state.event.data.item.BEACH && state.event.data.item.BEACH.PARAMETERS && state.event.data.item.BEACH.PARAMETERS.P_BEACH_TYPE ? state.event.data.item.BEACH.PARAMETERS.P_BEACH_TYPE.NAME : null,
                beachSeabedType: state.event.data.item.BEACH && state.event.data.item.BEACH.PARAMETERS && state.event.data.item.BEACH.PARAMETERS.P_BOTTOM ? state.event.data.item.BEACH.PARAMETERS.P_BOTTOM.NAME : null,
                time: state.event.data.item.BEACH && state.event.data.item.BEACH.PARAMETERS && state.event.data.item.BEACH.PARAMETERS.P_MODE ? state.event.data.item.BEACH.PARAMETERS.P_MODE.NAME : ''
            },

            about: state.event.data.item.DESCRIPTION,

            reviews: [],

            sideMapWeatherData: {
                title: state.event.data.item.BEACH ? state.event.data.item.BEACH.NAME : null,
                date: state.event.data.item.BEACH ? state.event.data.item.BEACH.WEATHER.DATE : null,
                pos: state.event.data.item.BEACH && state.event.data.item.BEACH.COORDINATES != '' ? state.event.data.item.BEACH.COORDINATES.split(',').map(v => parseFloat(v)) : [],
                waterTemp: state.event.data.item.BEACH && state.event.data.item.BEACH.WEATHER && state.event.data.item.BEACH.WEATHER.TEMP ? state.event.data.item.BEACH.WEATHER.TEMP.WATER : null,
                airTemp: state.event.data.item.BEACH && state.event.data.item.BEACH.WEATHER && state.event.data.item.BEACH.WEATHER.TEMP ? state.event.data.item.BEACH.WEATHER.TEMP.AIR : null
            },

            ptData: {
                title: state.event.data.item.BEACH ? state.event.data.item.BEACH.NAME : null,
                pos: state.event.data.item.BEACH && state.event.data.item.BEACH.COORDINATES != '' ? state.event.data.item.BEACH.COORDINATES.split(',').map(v => parseFloat(v)) : null,
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
                    type: 'event',
                    query: state.event.data.item.BEACH && state.event.data.item.ID ? `?beach=${state.event.data.item.BEACH.ID}&fromEvent=${state.event.data.item.ID}` : null
                },
                beachSliderData: {
                    slideNumber: 4,
                    cardData: []
                }
            },

            visitorPics: [],
            infraData: [],
            announcementData: {}
    	}

        // adding formatted and random announcement
        if (state.announcementData && state.announcementData.data) {
            let announcement = state.announcementData.data.list[Math.floor(Math.random() * state.announcementData.data.list.length)]; // getting a random announcement
            if (announcement)
                ret.announcementData = {
                    link: announcement.LINK,
                    pic: announcement.PREVIEW_PICTURE ?  announcement.PREVIEW_PICTURE : null,
                    title: announcement.NAME,
                    date: announcement.DATE,
                    description: announcement.DESCRIPTION,
                    color: announcement.COLOR
                }
        }

        // adding formatted infrastructures
        if (state.event.data.item.BEACH) {
            let filteredInfra = state.event.data.item.BEACH.INFRASTRUCTURES.filter(v => v.CODE != 'parkovka' && v.CODE != 'ostanovki-obshchestvennogo-transporta');
            for (let i = 0; i < filteredInfra.length; i++) {
                ret.infraData.push({
                    title: filteredInfra[i].NAME,
                    pic: filteredInfra[i].ICON ? filteredInfra[i].ICON : filteredInfra[i].ICON
                })
            }
        }

        // adding formatted reviews
        for (let i = 0; i < state.reviews.data.list.length; i++) {
            ret.reviews.push({
                pic: state.reviews.data.list[i].PICTURE ? state.reviews.data.list[i].PICTURE : null,
                name: state.reviews.data.list[i].FIO,
                date: state.reviews.data.list[i].CREATED_DATE,
                rating: state.reviews.data.list[i].AVERAGE_RATING,
                comment: state.reviews.data.list[i].DESCRIPTION
            });
        }

        // adding formatted parkings and stops
        if (state.event.data.item.BEACH) {
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
        }

        // adding formatted visitor pics
        for (let i = 0; i < state.visitorPics.data.list.length; i++) {
            ret.visitorPics.push({
                avatar: state.visitorPics.data.list[i].USER ? state.visitorPics.data.list[i].USER.PICTURE : null,
                pic: state.visitorPics.data.list[i].PICTURE,
                name: state.visitorPics.data.list[i].USER ? state.visitorPics.data.list[i].USER.FIO : null,
                comment: state.visitorPics.data.list[i].DESCRIPTION
            });
        }

        // adding formatted other events
        let otherEvents = rootState.events.data.list.filter(v => v.ID != state.event.data.item.ID && v.BEACH && v.BEACH.CITY && state.event.data.item.BEACH && state.event.data.item.BEACH.CITY && v.BEACH.CITY.NAME == state.event.data.item.BEACH.CITY.NAME);
        ret.otherEvents.beachNumber = Math.min(otherEvents.length, 45);
        for (let i = 0; i < otherEvents.length; i++) {
            ret.otherEvents.beachSliderData.cardData.push({
                title: otherEvents[i].NAME,
                date: otherEvents[i].ACTIVE_FROM,
                beach: otherEvents[i].BEACH ? otherEvents[i].BEACH.NAME : null,
                paid: otherEvents[i].PAID,
                tempWater: otherEvents[i].BEACH && otherEvents[i].BEACH.WEATHER && otherEvents[i].BEACH.TEMP ? otherEvents[i].BEACH.WEATHER.TEMP.WATER : null,
                mainLink: `event/${otherEvents[i].ID}`,
                beachLink: otherEvents[i].BEACH ? `beach/${otherEvents[i].BEACH.ID}` : null,
                humanLink: otherEvents[i].CODE ? `event/${otherEvents[i].CODE}` : null,
                location: otherEvents[i].BEACH && otherEvents[i].BEACH.CITY ? otherEvents[i].BEACH.CITY.NAME : null,
                locationId: otherEvents[i].BEACH && otherEvents[i].BEACH.CITY ? otherEvents[i].BEACH.CITY.ID : null,
                pic: otherEvents[i].PHOTOS ? otherEvents[i].PHOTOS[0] : null,
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
        if (ret.about && ret.about.length > 1)
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
