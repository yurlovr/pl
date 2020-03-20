export const state = () => ({
    beach: [],
    temperatures: [],
    events: [],
    barsNRestos: [],
    opinions: [],
    reviews: [],
    similarBeaches: [],
    visitorPics: [],
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_BEACH: (state, payload) => {
        state.beach = payload;
    },

    SET_TEMPERATURES: (state, payload) => {
        state.temperatures = payload;
    },

    SET_EVENTS: (state, payload) => {
        state.events = payload;
    },

    SET_BARS_N_RESTOS: (state, payload) => {
        state.barsNRestos = payload;
    },

    SET_OPINIONS: (state, payload) => {
        state.opinions = payload;
    },

    SET_REVIEWS: (state, payload) => {
        state.reviews = payload;
    },

    SET_SIMILAR_BEACHES: (state, payload) => {
        state.similarBeaches = payload;
    },

    SET_VISITOR_PICS: (state, payload) => {
        state.visitorPics = payload;
    }
}

export const actions = {
    async getBeach({commit, state}, id) {
        let error;
        commit('SET_BEACH', await this.$axios.$get(`/beach/item?id=${id}`).catch((e) => {
            console.error(e)
            error = 404;
            return {};
        }));
        if (error) return error;
        commit('SET_EVENTS', await this.$axios.$get(`/event/list?beachId=${id}`));
        commit('SET_BARS_N_RESTOS', await this.$axios.$get(`/restaurant/list?beachId=${id}`));
        commit('SET_OPINIONS', await this.$axios.$get(`/opinion/list?entityId=${id}`));
        commit('SET_TEMPERATURES', await this.$axios.$get(`/weather/list`));
        commit('SET_REVIEWS', await this.$axios.$get(`/review/list?entityId=${id}&count=9999`));
        commit('SET_VISITOR_PICS', await this.$axios.$get(`/socialPhoto/list?entityId=${id}&count=10`));

        let tagsCount = 0;
        if (state.beach.data.item.TAGS)
            tagsCount += state.beach.data.item.TAGS.length;
        if (state.beach.data.item.ADD_TAGS)
            tagsCount += state.beach.data.item.ADD_TAGS.length;
        if (tagsCount >= 3) {
            let tags = '&';
            for (let i = 0; i < state.beach.data.item.TAGS.length; i++)
                tags += `tags[]=${state.beach.data.item.TAGS[i]}&`;
            commit('SET_SIMILAR_BEACHES', await this.$axios.$get(`/beach/list?city=${state.beach.data.item.CITY.ID}${tags.slice(0, -1)}`));
        }
    }
}

export const getters = {
    beachData: (state) => {
        if (!state.beach.data) return null;

        let ret = {
            avgRating: {
                rating: parseFloat(state.beach.data.item.RATING.RATING),
                peopleCount: state.beach.data.item.RATING.COUNT_REVIEWS,
                ratings: [
                    {
                        title: 'Природа',
                        rating: state.beach.data.item.RATING.NATURE
                    },
                    {
                        title: 'Чистота воды',
                        rating: state.beach.data.item.RATING.WATER_PURITY
                    },
                    {
                        title: 'Чистота берега',
                        rating: state.beach.data.item.RATING.SHORE_CLEANLINESS
                    },
                    {
                        title: 'Инфраструктура',
                        rating: state.beach.data.item.RATING.INFRASTRUCTURE
                    },
                    {
                        title: 'Безопасность',
                        rating: state.beach.data.item.RATING.SECURITY
                    },
                    {
                        title: 'Доступность',
                        rating: state.beach.data.item.RATING.AVAILABILITY
                    }
                ]
            },

            mainData: {
                title: state.beach.data.item.NAME,
                likes: state.beach.data.item.COUNT_FAVORITES,
                beachId: state.beach.data.item.ID,
                location: state.beach.data.item.CITY.NAME,
                locationId: state.beach.data.item.CITY.ID,
                beachLength: state.beach.data.item.PARAMETERS.P_LINE_LENGTH,
                price: state.beach.data.item.PARAMETERS.P_PRICE,
                beachType: state.beach.data.item.PARAMETERS.P_BEACH_TYPE.NAME,
                beachSeabedType:  state.beach.data.item.PARAMETERS.P_BOTTOM ? state.beach.data.item.PARAMETERS.P_BOTTOM.NAME : null,
                time: state.beach.data.item.PARAMETERS.P_MODE ? state.beach.data.item.PARAMETERS.P_MODE.NAME : null
            },

            hugeSliderData: {
                title: state.beach.data.item.NAME,
                isBeachClosed: state.beach.data.item.LABEL.TEXT != '',
                goldMedal: state.beach.data.item.CERTIFICATION,
                blueMedal: state.beach.data.item.WEBCAMERA,
                pics: state.beach.data.item.PHOTOS.map((s) => { return state.api + s }),
                beachClosedText: state.beach.data.item.LABEL.TEXT,
                beachClosedColor: state.beach.data.item.LABEL.COLOR,
                beachClosedTooltip: state.beach.data.item.LABEL.DESCRIPTION
            },

            infraData: [],

            about: state.beach.data.item.DESCRIPTION,

            servicesData: [],

            waterHistogramData: [],

            sideMapWeatherData: {
                title: state.beach.data.item.NAME,
                date: state.beach.data.item.WEATHER.DATE,
                pos: (state.beach.data.item.COORDINATES != '') ? state.beach.data.item.COORDINATES.split(',').map(v => parseFloat(v)) : [],
                waterTemp: state.beach.data.item.WEATHER.TEMP.WATER,
                airTemp: state.beach.data.item.WEATHER.TEMP.AIR
            },

            ptData: {
                title: state.beach.data.item.NAME,
                pos: (state.beach.data.item.COORDINATES != '') ? state.beach.data.item.COORDINATES.split(',').map(v => parseFloat(v)) : null,
                parkings: {
                    auto: [],
                    bus: []
                }
            },

            events: {
                count: Math.min(state.events.data.list.length, 45),
                cardData: []
            },

            barsNRestos: [],

            opinions: [],

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

            reviews: [],

            similarBeaches: {
                title: 'Похожие пляжи рядом',
                subtitle: '',
                showMore: [],
                beachNumber: state.similarBeaches.data ? Math.min(state.similarBeaches.data.list.filter(v => {
                    if (v.TAGS) {
                        if (v.TAGS.length < 3) return false;
                    }
                    if (v.ADD_TAGS) {
                        if (v.ADD_TAGS.length < 3) return false;
                    }
                    if (!v.TAGS && !v.ADD_TAGS) return false;
                    return true;
                }).length-1, 45) : 0, // -1 cuz 1 of them is definitely the same beach
                beachSliderData: {
                    slideNumber: 4,
                    cardData: []
                }
            },

            visitorPics: []
        };

        // adding formatted parkings and stops
        let parkings = state.beach.data.item.INFRASTRUCTURES.filter(v => v.CODE == 'parkovka'),
            stops = state.beach.data.item.INFRASTRUCTURES.filter(v => v.CODE == 'ostanovki-obshchestvennogo-transporta')
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

        // adding formatted infrastructures
        let filteredInfra = state.beach.data.item.INFRASTRUCTURES.filter(v => v.CODE != 'parkovka' && v.CODE != 'ostanovki-obshchestvennogo-transporta');
        for (let i = 0; i < filteredInfra.length; i++) {
            ret.infraData.push({
                title: filteredInfra[i].NAME,
                pic: filteredInfra[i].ICON ? state.api + filteredInfra[i].ICON : filteredInfra[i].ICON
            })
        }

        // adding formatted services
        for (let i = 0; i < state.beach.data.item.SERVICES.length; i++) {
            ret.servicesData.push({
                title: state.beach.data.item.SERVICES[i].NAME,
                pic: state.beach.data.item.SERVICES[i].ICON ? state.api + state.beach.data.item.SERVICES[i].ICON : state.beach.data.item.SERVICES[i].ICON
            })
        }

        // adding formatted temperatures
        let temps = Object.values(state.temperatures.data.list);
        for (let i = 0; i < temps.length; i++) { // going through months
            if (temps[i].find(v => v.CITY.ID == state.beach.data.item.CITY.ID))
                ret.waterHistogramData.push(parseFloat(temps[i].find(v => v.CITY.ID == state.beach.data.item.CITY.ID).TEMP.WATER));
        }

        // adding formatted events
        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.events.cardData.push({
                title: state.events.data.list[i].NAME,
                date: `${state.events.data.list[i].ACTIVE_FROM} ${state.events.data.list[i].ACTIVE_TO ? '-' : ''} ${state.events.data.list[i].ACTIVE_TO ? state.events.data.list[i].ACTIVE_TO : ''}`,
                beach: state.events.data.list[i].BEACH.NAME,
                mainLink: `event/${state.events.data.list[i].ID}`,
                beachLink: `beach/${state.events.data.list[i].BEACH.ID}`,
                location: state.events.data.list[i].BEACH.CITY.NAME,
                pic: state.api + state.events.data.list[i].PHOTOS[0],
                eventId: state.events.data.list[i].ID,
                showFavorite: true
            });
        }

        // adding formatted bars and restos
        for (let i = 0; i < state.barsNRestos.data.list.length; i++) {
            ret.barsNRestos.push({
                title: state.barsNRestos.data.list[i].NAME,
                description: state.barsNRestos.data.list[i].DESCRIPTION,
                pics: state.barsNRestos.data.list[i].PHOTOS.map(v => v ? state.api + v : null)
            });
        }

        // adding formatted opinions
        for (let i = 0; i < state.opinions.data.list.length; i++) {
            ret.opinions.push({
                pic: state.api + state.opinions.data.list[i].PICTURE,
                name: state.opinions.data.list[i].NAME,
                opinion: state.opinions.data.list[i].DESCRIPTION,
                social: state.opinions.data.list[i].SOCIAL_LINK
            });
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


        // adding formatted similar beaches
        if (state.similarBeaches.data) {
            ret.similarBeaches.showMore.push({
                param: 'cities',
                value: {
                    id: state.beach.data.item.CITY.ID,
                    title: state.beach.data.item.CITY.NAME
                },
                query: 'city'
            })
            let tagsCount;
            for (let i = 0; i < state.similarBeaches.data.list.length; i++) {
                if (state.beach.data.item.ID != state.similarBeaches.data.list[i].ID) {
                    tagsCount = 0;
                    if (state.similarBeaches.data.list[i].TAGS) tagsCount += state.similarBeaches.data.list[i].TAGS.length;
                    if (state.similarBeaches.data.list[i].ADD_TAGS) tagsCount += state.similarBeaches.data.list[i].ADD_TAGS.length;
                    if (tagsCount >= 3) {
                        ret.similarBeaches.beachSliderData.cardData.push({
                            tempWater: state.similarBeaches.data.list[i].WEATHER.TEMP ? state.similarBeaches.data.list[i].WEATHER.TEMP.WATER : 0,
                            paid: state.similarBeaches.data.list[i].PAID,
                            rating: parseFloat(state.similarBeaches.data.list[i].AVERAGE_RATING),
                            title: state.similarBeaches.data.list[i].NAME,
                            location: state.similarBeaches.data.list[i].CITY ? state.similarBeaches.data.list[i].CITY.NAME : 'Не указан',
                            locationId: state.similarBeaches.data.list[i].CITY ? state.similarBeaches.data.list[i].CITY.ID : null,
                            pic: state.similarBeaches.data.list[i].PHOTOS ? state.api + state.similarBeaches.data.list[i].PHOTOS[0] : null,
                            mainLink: `beach/${state.similarBeaches.data.list[i].ID}`,
                            beachLink: `beach/${state.similarBeaches.data.list[i].ID}`,
                            beachId: state.similarBeaches.data.list[i].ID,
                            showFavorite: true,
                            filter: []
                        });
                    }
                }
            }

            if (state.beach.data.item.TAGS) {
                for (let i = 0; i < state.beach.data.item.TAGS.length; i++) {
                    ret.similarBeaches.showMore.push({
                        type: 'tags',
                        id: state.beach.data.item.TAGS[i].ID,
                        value: true
                    });
                }
            }
            if (state.beach.data.item.ADD_TAGS) {
                for (let i = 0; i < state.beach.data.item.ADD_TAGS.length; i++) {
                    ret.similarBeaches.showMore.push({
                        type: 'addTags',
                        id: state.beach.data.item.ADD_TAGS[i].ID,
                        value: true
                    });
                }
            }
        }

        // adding formatted sections
        if (ret.infraData.length > 0)
            ret.sections.push({
                title: 'Инфраструктура',
                hash: 'infra'
            });
        if (ret.about.length > 1 && ret.about[1].paragraph && ret.about[1].paragraph.length > 0)
            ret.sections.push({
                title: 'О пляже',
                hash: 'about'
            });
        if (ret.servicesData.length > 0)
            ret.sections.push({
                title: 'Услуги и аренда',
                hash: 'services'
            });
        if (ret.ptData.parkings.auto.length > 0 || ret.ptData.parkings.bus.length > 0)
            ret.sections.push({
                title: 'Парковки и общественный транспорт',
                hash: 'pt'
            });
        if (ret.waterHistogramData.length > 0)
            ret.sections.push({
                title: 'График температуры воды',
                hash: 'water-temp'
            });
        if (ret.events.cardData.length > 0)
            ret.sections.push({
                title: 'Ближайшие мероприятия',
                hash: 'events'
            });
        if (ret.barsNRestos.length > 0)
            ret.sections.push({
                title: 'Бары и рестораны',
                hash: 'barsNRestos'
            });
        if (ret.opinions.length > 0)
            ret.sections.push({
                title: 'Мнения местных',
                hash: 'opinions'
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
        if (ret.similarBeaches.beachSliderData.cardData.length > 0)
            ret.sections.push({
                title: 'Похожие пляжи',
                hash: 'similar-beaches'
            });

        return ret;
    }
}
