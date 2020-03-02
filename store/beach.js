export const state = () => ({
    beach: [],
    temperatures: [],
    events: [],
    barsNRestos: [],
    opinions: [],
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
    }
}

export const actions = {
    async getBeach({commit}, id) {
        commit('SET_BEACH', await this.$axios.$get(`/beach/item?id=${id}`));
        commit('SET_EVENTS', await this.$axios.$get(`/event/list?beachId=${id}`));
        commit('SET_BARS_N_RESTOS', await this.$axios.$get(`/restaurant/list?beachId=${id}`));
        commit('SET_OPINIONS', await this.$axios.$get(`/opinion/list?entityId=${id}`));
        commit('SET_TEMPERATURES', await this.$axios.$get(`/weather/list`));
    }
}

export const getters = {
    beachData: (state) => {
        if (!state.beach.data) return null;

        let ret = {
            avgRating: {
                rating: state.beach.data.item.AVERAGE_RATING,
                peopleCount: 0,
                ratings: [
                    {
                        title: 'Природа',
                        rating: state.beach.data.item.AVERAGE_RATING_NATURE
                    },
                    {
                        title: 'Чистота воды',
                        rating: state.beach.data.item.AVERAGE_RATING_WATER_PURITY
                    },
                    {
                        title: 'Чистота берега',
                        rating: state.beach.data.item.AVERAGE_RATING_SHORE_CLEANLINESS
                    },
                    {
                        title: 'Инфраструктура',
                        rating: state.beach.data.item.AVERAGE_RATING_INFRASTRUCTURE
                    },
                    {
                        title: 'Безопасность',
                        rating: state.beach.data.item.AVERAGE_RATING_SECURITY
                    },
                    {
                        title: 'Доступность',
                        rating: state.beach.data.item.AVERAGE_RATING_AVAILABILITY
                    }
                ]
            },

            mainData: {
                title: state.beach.data.item.NAME,
                likes: state.beach.data.item.COUNT_FAVORITES,
                location: state.beach.data.item.CITY.NAME,
                beachLength: state.beach.data.item.PARAMETERS.P_LINE_LENGTH,
                price: state.beach.data.item.PARAMETERS.P_PRICE,
                beachType: state.beach.data.item.PARAMETERS.P_BEACH_TYPE.NAME,
                beachSeabedType: state.beach.data.item.PARAMETERS.P_BOTTOM,
                time: (state.beach.data.item.PARAMETERS.P_MODE ? state.beach.data.item.PARAMETERS.P_MODE.NAME : '')
            },

            hugeSliderData: {
                title: state.beach.data.item.NAME,
                isBeachClosed: true,
                goldMedal: state.beach.data.item.CERTIFICATION,
                blueMedal: state.beach.data.item.WEBCAMERA,
                pics: state.beach.data.item.PHOTOS.map((s) => { return state.api + s })
            },

            infraData: [],

            about: [
                {
                    title: 'О пляже'
                }
            ],

            servicesData: [],

            waterHistogramData: [],

            sideMapData: {
                title: state.beach.data.item.NAME,
                pos: (state.beach.data.item.COORDINATES != '') ? state.beach.data.item.COORDINATES.split(',').map(v => parseFloat(v)) : null
            },

            ptData: {
                title: state.beach.data.item.NAME,
                parkings: state.beach.data.item.PARKINGS || []
            },

            events: {
                cardData: []
            },

            barsNRestos: [],

            opinions: [],

            sections: [
                {
                    title: 'Галерея',
                    hash: 'gallery'
                }
            ]
        };

        // adding formatted infrastructures
        for (let i = 0; i < state.beach.data.item.INFRASTRUCTURES.length; i++) {
            ret.infraData.push({
                title: state.beach.data.item.INFRASTRUCTURES[i].NAME
            })
            switch (state.beach.data.item.INFRASTRUCTURES[i].NAME) {
                case 'Пункт медицинской помощи':
                    ret.infraData[i].pic = '/pics/beach/medic.svg';
                    break;
                case 'Душевые кабины':
                    ret.infraData[i].pic = '/pics/beach/shower.svg';
                    break;
                case 'Спательная вышка':
                    ret.infraData[i].pic = '/pics/beach/rescuer.svg';
                    break;
                case 'Переодевалки':
                    ret.infraData[i].pic = '/pics/beach/closet.svg';
                    break;
                case 'Остановка общественного транспорта':
                    ret.infraData[i].pic = '/pics/beach/transportation.svg';
                    break;
            }
        }

        // adding formatted about
        let about = state.beach.data.item.DESCRIPTION.split('<br>\r\n <br>\r\n ');
        for (let i = 0; i < about.length; i++) {
            about[i] = about[i].split('<br>\r\n ');
            // clean up from junk <br>
            for (let j = 0; j < about[i].length; j++) {
                about[i][j] = about[i][j].replace('<br>', '');
            }            
            if (about[i].length == 1) // only paragraph
                ret.about.push({
                    paragraph: about[i][0]
                })
            else if (about[i].length == 2) // title and paragraph
                ret.about.push({
                    title: about[i][0],
                    paragraph: about[i][1]
                })
        }

        // adding formatted services
        if (state.beach.data.item.SERVICES.S_SUN_LOUNGERS) {
            ret.servicesData.push({
                title: 'Шезлонги',
                pic: '/pics/beach/lounger.svg'
            });
        }
        if (state.beach.data.item.SERVICES.S_BEACH_UMBRELLAS) {
            ret.servicesData.push({
                title: 'Пляжные зонтики',
                pic: '/pics/beach/umbrella.svg'
            });
        }
        if (state.beach.data.item.SERVICES.S_SWIMMING_EQUIPMENT) {
            ret.servicesData.push({
                title: 'Инвентарь для плавания',
                pic: '/pics/beach/equipment.svg'
            });
        }
        if (state.beach.data.item.SERVICES.S_BEACH_TOWELS) {
            ret.servicesData.push({
                title: 'Пляжные полотенца',
                pic: '/pics/beach/towel.svg'
            });
        }
        if (state.beach.data.item.SERVICES.S_FOR_OUTDOOR_ACTIVITIES) {
            ret.servicesData.push({
                title: 'Инвентарь для активного отдыха',
                pic: '/pics/beach/sports.svg'
            });
        }

        // adding formatted temperatures
        for (let i = 0; i < state.temperatures.data.list.length; i++) {
            if (state.temperatures.data.list[i].CITY.ID == state.beach.data.item.CITY.ID) {
                for (let j in state.temperatures.data.list[i].TEMP.WATER) {
                    ret.waterHistogramData.push(parseFloat(state.temperatures.data.list[i].TEMP.WATER[j]));
                }
                break;
            }
        }

        // adding formatted events
        for (let i = 0; i < state.events.data.list.length; i++) {
            ret.events.cardData.push({
                title: state.events.data.list[i].NAME,
                date: `${state.events.data.list[i].ACTIVE_FROM} - ${state.events.data.list[i].ACTIVE_TO}`,
                beach: state.events.data.list[i].BEACH.NAME,
                beachLink: `beach/${state.events.data.list[i].BEACH.ID}`,
                location: state.events.data.list[i].BEACH.CITY.NAME,
                pic: state.api + state.events.data.list[i].PHOTOS[0]         
            });
        }

        // adding formatted bars and restos
        for (let i = 0; i < state.barsNRestos.data.list.length; i++) {
            ret.barsNRestos.push({
                title: state.barsNRestos.data.list[i].NAME,
                description: state.barsNRestos.data.list[i].DESCRIPTION,
                pics: state.barsNRestos.data.list[i].PHOTOS.map(v => state.api + v)
            });
        }

        // adding formatted opinions
        for (let i = 0; i < state.opinions.data.list.length; i++) {
            ret.opinions.push({
                pic: state.api + state.opinions.data.list[i].PICTURE,
                name: state.opinions.data.list[i].NAME,
                opinion: state.opinions.data.list[i].DESCRIPTION
            });
        }

        // adding formatted sections
        if (ret.infraData.length > 0)
            ret.sections.push({
                title: 'Инфраструктура',
                hash: 'infra'
            });
        if (ret.about.length > 1)
            ret.sections.push({
                title: 'О пляже',
                hash: 'about'
            });
        if (ret.waterHistogramData.length > 0)
            ret.sections.push({
                title: 'Температура воды',
                hash: 'waterTemp'
            });
        if (ret.servicesData.length > 0)
            ret.sections.push({
                title: 'Услуги и аренда',
                hash: 'services'
            });
        if (ret.ptData.parkings.length > 0)
            ret.sections.push({
                title: 'Парковки и транспорт',
                hash: 'pt'
            });
        if (ret.events.cardData.length > 0)
            ret.sections.push({
                title: 'Мероприятия',
                hash: 'events'
            });
        if (ret.barsNRestos.length > 0)
            ret.sections.push({
                title: 'Бары и рестораны',
                hash: 'barsNRestos'
            });
        // TODO: once apis are connected, add these to the sections
        ret.sections.push({
            title: 'Отзывы',
            hash: 'reviews'
        }, {
            title: 'Фото посетителей',
            hash: 'visitorPics'
        });

        return ret;
    }
}
