import {getDistanceFromLatLonInKm} from "../assets/calcDistance";
export const state = () => ({
    beach: null,
    temperatures: null,
    events: null,
    barsNRestos: null,
    opinions: null,
    reviews: null,
    similarBeaches: null,
    visitorPics: null,
    announcementData: null,
    tags: null,
    any_places: [],
    hotels: []
})

export const mutations = {
    SET_BEACH: (state, payload) => {
        state.beach = payload;
    },
    SET_ANY_PLACES: (state, data) => {
    state.any_places = data
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
    },

    SET_ANNOUNCEMENT_DATA: (state, payload) => {
        state.announcementData = payload;
    },

    SET_TAGS: (state, payload) => state.tags = payload,

    SET_HOTELS: (state, data) => {
      state.hotels = data
    },
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
        let beach_id = state.beach.data.item.ID

        commit('SET_EVENTS', await this.$axios.$get(`/event/list?beachId=${beach_id}`));
        commit('SET_BARS_N_RESTOS', await this.$axios.$get(`/restaurant/list?beachId=${beach_id}`));
        commit('SET_OPINIONS', await this.$axios.$get(`/opinion/list?entityId=${beach_id}`));
        commit('SET_TEMPERATURES', await this.$axios.$get(`/weather/list`));
        commit('SET_REVIEWS', await this.$axios.$get(`/review/list?entityId=${beach_id}`));
        commit('SET_VISITOR_PICS', await this.$axios.$get(`/socialPhoto/list?entityId=${beach_id}&count=10`));
        commit('SET_ANNOUNCEMENT_DATA', await this.$axios.$get(`/banner/list?page=/beach`));

        commit('SET_ANY_PLACES', await this.$axios.$get('/hotel/list?count=10'));
        commit('SET_HOTELS', await this.$axios.$get('/hotel/beachList?count=9999'));

        let tagsCount = 0, tags;
        if (state.beach.data.item.TAGS)
            tagsCount += state.beach.data.item.TAGS.length;
        if (state.beach.data.item.ADD_TAGS)
            tagsCount += state.beach.data.item.ADD_TAGS.length;

        if (tagsCount >= 3) {
            tags = '&';
            for (let i = 0; i < state.beach.data.item.TAGS.length; i++)
                tags += `tags[]=${state.beach.data.item.TAGS[i].ID}&`;
            commit('SET_TAGS', tags);
            commit('SET_SIMILAR_BEACHES', await this.$axios.$get(`/beach/list?city=${state.beach.data.item.CITY.ID}${state.tags.slice(0, -1)}`));
        }
    }
}

export const getters = {
    beachData: (state, getters, rootState, rootGetters) => {
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
                time: state.beach.data.item.PARAMETERS.P_MODE ? state.beach.data.item.PARAMETERS.P_MODE.NAME : null,
                sunrise: state.beach.data.item.WEATHER.SUNRISE,
                sunset: state.beach.data.item.WEATHER.SUNSET,
            },

            hugeSliderData: {
                title: state.beach.data.item.NAME,
                isBeachClosed: state.beach.data.item.LABEL.TEXT != '',
                goldMedal: state.beach.data.item.CERTIFICATION,
                blueMedal: state.beach.data.item.WEBCAMERA,
                pics: !state.beach.data.item.VIDEO.LINK ?  state.beach.data.item.PHOTOS.medium.map(e => e.path)
                  : [...state.beach.data.item.PHOTOS.medium.map(e => e.path), state.beach.data.item.VIDEO.LINK],
                beachClosedText: state.beach.data.item.LABEL.TEXT,
                beachClosedColor: state.beach.data.item.LABEL.COLOR,
                beachClosedTooltip: state.beach.data.item.LABEL.DESCRIPTION,
                beautySunrise: state.beach.data.item.WEATHER.BEAUTIFUL_SUNRISE,
                beautySunset: state.beach.data.item.WEATHER.BEAUTIFUL_SUNSET,
                panorama: state.beach.data.item.PANORAMA
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
                airTemp: state.beach.data.item.WEATHER.TEMP.AIR,
                email: state.beach.data.item.CONTACT && state.beach.data.item.CONTACT.EMAIL ? state.beach.data.item.CONTACT.EMAIL : null,
                telegram: state.beach.data.item.CONTACT && state.beach.data.item.CONTACT.TELEGRAM ? state.beach.data.item.CONTACT.TELEGRAM : null,
                sunriseTime: state.beach.data.item.WEATHER.SUNRISE,
                sunsetTime: state.beach.data.item.WEATHER.SUNSET,
                windSpeed: state.beach.data.item.WEATHER.WIND,
                humidity: state.beach.data.item.WEATHER.HUMIDITY,
                precipitation: state.beach.data.item.WEATHER.PRECIPITATION,
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
                link: `/event-catalog?beach=${state.beach.data.item.ID}`,
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
                showMore: {
                    type: 'beach',
                    query: '?' + (state.tags ? state.tags.slice(1) : '') + `city=${state.beach && state.beach.data && state.beach.data.item && state.beach.data.item.CITY ?
                        state.beach.data.item.CITY.ID : -1}&fromBeach=${state.beach && state.beach.data && state.beach.data.item ? state.beach.data.item.ID : -1}`
                },
                beachNumber: state.similarBeaches && state.similarBeaches.data ? Math.min(state.similarBeaches.data.list.filter(v => {
                  let count = 0;
                    if (v.TAGS) {
                      count += v.TAGS.length
                    }

                    if (v.ADD_TAGS) {
                      count += v.ADD_TAGS.length
                    }
                    if (count < 3) return  false;
                    if (!v.TAGS && !v.ADD_TAGS) return false;
                    if (v.ID == state.beach.data.item.ID) return false;
                    return true;
                }).length, 45) : 0,
                beachSliderData: {
                    slideNumber: 4,
                    cardData: []
                }
            },

            visitorPics: [],

            announcementData: {}
        };

      if (state.any_places.data){
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
            custom_photo: true
          });
        }

      }

      if (state.hotels.data){
        let hotels = state.hotels.data.list

        ret.hotels = {
          title: 'Забронируй номер рядом с пляжем',
          subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
          beachNumber: hotels.length,
          /*showMore: {
            type: 'beach',
            query: '?another'
          },*/
          beachSliderData: {
            slideNumber: 6,
            cardData: []
          }
        }

        let coordinat = rootState.user_coordinates

        let distance = (d, coord) => {
          if (d && d.length == 2 && Object.keys(coord).length) {
            let lat2 = d[0], lng2 = d[1],
              {lat, lng} = coord;
            return Number(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)).toFixed(1)).toString().replace(/\./, ',')
          }
          return 0;
        }

        for (let i = 0; i < hotels.length; i++) {
          ret.hotels.beachSliderData.cardData.push({
            rating: hotels[i].RATING,
            title: hotels[i].NAME,
            pic: hotels[i].PICTURE,
            mainLink: hotels[i].URL,
            beachLink: hotels[i].URL,
            beachId: hotels[i].ID,
            show_distance: true,
            geo_string: hotels[i].COUNTRY + ', ' + hotels[i].CITY,
            internal_url: hotels[i].URL,
            another_place: true,
            price: hotels[i].PRICE,
            coordinates: hotels[i].COORDINATES ? hotels[i].COORDINATES.split(',').map(Number) : [],
            dist: distance(hotels[i].COORDINATES ? hotels[i].COORDINATES.split(',').map(Number) : [], coordinat),
            custom_photo: true
          })
        }

        ret.hotels.beachSliderData.cardData.sort((a, b) => (a.dist > b.dist) ? 1 : (a.dist === b.dist) ? ((a.dist > b.dist) ? 1 : -1) : -1 )

      }

        // adding formatted and random announcement
        if (state.announcementData && state.announcementData.data) {
            let announcement = state.announcementData.data.list[Math.floor(Math.random() * state.announcementData.data.list.length)]; // getting a random announcement
            if (announcement)
                ret.announcementData = {
                    link: announcement.LINK,
                    pic: announcement.PREVIEW_PICTURE ? announcement.PREVIEW_PICTURE : null,
                    title: announcement.NAME,
                    date: announcement.DATE,
                    description: announcement.DESCRIPTION,
                    color: announcement.COLOR
                }
        }

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
                title: stops[i].DESCRIPTION || 'Автобусная остановка',
                buses: '',
                taxi: ''
            })
        }

        // adding formatted infrastructures
        let filteredInfra = state.beach.data.item.INFRASTRUCTURES.filter(v => v.CODE != 'parkovka' && v.CODE != 'ostanovki-obshchestvennogo-transporta');
        for (let i = 0; i < filteredInfra.length; i++) {
            ret.infraData.push({
                title: filteredInfra[i].NAME,
                pic: filteredInfra[i].ICON ? filteredInfra[i].ICON : filteredInfra[i].ICON,
                pos: filteredInfra[i].COORDINATES ? filteredInfra[i].COORDINATES.split(',') : null,
                id: filteredInfra[i].ID,
                description: filteredInfra[i].DESCRIPTION,
                pictures: filteredInfra[i].PICTURES
            })
        }

        // adding formatted services
        for (let i = 0; i < state.beach.data.item.SERVICES.length; i++) {
            ret.servicesData.push({
                title: state.beach.data.item.SERVICES[i].NAME,
                pic: state.beach.data.item.SERVICES[i].ICON ? state.beach.data.item.SERVICES[i].ICON : state.beach.data.item.SERVICES[i].ICON,
                pos: state.beach.data.item.SERVICES[i].COORDINATES ? state.beach.data.item.SERVICES[i].COORDINATES.split(',') : null,
                id: state.beach.data.item.SERVICES[i].ID,
                description: state.beach.data.item.SERVICES[i].DESCRIPTION,
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
                date: state.events.data.list[i].ACTIVE_FROM,
                beach: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.NAME : null,
                mainLink: `event/${state.events.data.list[i].ID}`,
                beachLink: state.events.data.list[i].BEACH ? `beach/${state.events.data.list[i].BEACH.CODE}` : null,
                humanLink: state.events.data.list[i].CODE ? `event/${state.events.data.list[i].CODE}` : null,
                location: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.CITY.NAME : null,
                locationId: state.events.data.list[i].BEACH ? state.events.data.list[i].BEACH.CITY.ID : null,
                pic: state.events.data.list[i].PHOTOS ? state.events.data.list[i].PHOTOS.medium[0].path : null,
                eventId: state.events.data.list[i].ID,
                showFavorite: true
            });
        }

        // adding formatted bars and restos
        for (let i = 0; i < state.barsNRestos.data.list.length; i++) {
            ret.barsNRestos.push({
                title: state.barsNRestos.data.list[i].NAME,
                description: state.barsNRestos.data.list[i].DESCRIPTION,
                pics: state.barsNRestos.data.list[i].PHOTOS.medium.map(v => v ? v.path : null),
                coordinates: state.barsNRestos.data.list[i].COORDINATES ? state.barsNRestos.data.list[i].COORDINATES.split(',') : [],
                contact: state.barsNRestos.data.list[i].CONTACT || null,
                contact_telegram: state.barsNRestos.data.list[i].CONTACT_TELEGRAM || null,
            });
        }

        // adding formatted opinions
        for (let i = 0; i < state.opinions.data.list.length; i++) {
            ret.opinions.push({
                pic: state.opinions.data.list[i].PICTURE,
                name: state.opinions.data.list[i].NAME,
                opinion: state.opinions.data.list[i].DESCRIPTION,
                social: state.opinions.data.list[i].SOCIAL_LINK,
                icon: state.opinions.data.list[i].SOCIAL
            });
        }

        // adding formatted reviews
        for (let i = 0; i < state.reviews.data.list.length; i++) {
            ret.reviews.push({
                pic: state.reviews.data.list[i].PICTURE ?  state.reviews.data.list[i].PICTURE : null,
                name: state.reviews.data.list[i].FIO,
                date: state.reviews.data.list[i].CREATED_DATE,
                rating: state.reviews.data.list[i].AVERAGE_RATING,
                comment: state.reviews.data.list[i].DESCRIPTION,
                photos: state.reviews.data.list[i].PHOTOS
            });
        }

        // adding formatted visitor pics
        if (state.visitorPics) {
            for (let i = 0; i < state.visitorPics.data.list.length; i++) {
                ret.visitorPics.push({
                    avatar: state.visitorPics.data.list[i].USER.PICTURE,
                    pic: state.visitorPics.data.list[i].PICTURE,
                    name: state.visitorPics.data.list[i].USER.FIO,
                    comment: state.visitorPics.data.list[i].DESCRIPTION
                });
            }
        }

        // adding formatted similar beaches
        if (state.similarBeaches && state.similarBeaches.data) {
            for (let i = 0; i < state.similarBeaches.data.list.length; i++) {
                if (state.beach.data.item.ID != state.similarBeaches.data.list[i].ID) {
                    ret.similarBeaches.beachSliderData.cardData.push({
                        access: state.similarBeaches.data.list[i] || null,
                        tempWater: state.similarBeaches.data.list[i].WEATHER.TEMP ? state.similarBeaches.data.list[i].WEATHER.TEMP.WATER : 0,
                        paid: state.similarBeaches.data.list[i].PAID,
                        rating: parseFloat(state.similarBeaches.data.list[i].AVERAGE_RATING),
                        title: state.similarBeaches.data.list[i].NAME,
                        location: state.similarBeaches.data.list[i].CITY ? state.similarBeaches.data.list[i].CITY.NAME : 'Не указан',
                        locationId: state.similarBeaches.data.list[i].CITY ? state.similarBeaches.data.list[i].CITY.ID : null,
                        pic: state.similarBeaches.data.list[i].PHOTOS ? state.similarBeaches.data.list[i].PHOTOS.medium[0].path : null,
                        mainLink: `beach/${state.similarBeaches.data.list[i].ID}`,
                        beachLink: `beach/${state.similarBeaches.data.list[i].ID}`,
                        humanLink: state.similarBeaches.data.list[i].CODE ? `beach/${state.similarBeaches.data.list[i].CODE}`: null,
                        beachId: state.similarBeaches.data.list[i].ID,
                        showFavorite: true,
                        filter: [],
                        coordinates: state.similarBeaches.data.list[i].COORDINATES.length ? state.similarBeaches.data.list[i].COORDINATES.split(',') : [],
                        show_distance: true
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
        if (ret.about && ret.about.length > 0)
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
