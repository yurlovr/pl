export const state = () => ({
    popularBeaches: [],
    cities: [],
    beach: [],
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_POPULAR_BEACH: (state, payload) => {
           state.popularBeaches = payload;
    },

    SET_CITIES: (state, payload) => {
        state.cities = payload;
    },

    SET_BEACH: (state, payload) => {
        state.beach = payload;
    }
}

export const actions = {
    async getPopularBeaches({commit}) {
        commit('SET_POPULAR_BEACH', await this.$axios.$get('/beach/top'));
    },

    async getCities({commit}) {
        commit('SET_CITIES', await this.$axios.$get('/city/list'));
    },

    async getBeach({commit}, id) {
        commit('SET_BEACH', await this.$axios.$get(`/beach/item?id=${id}`));
    }
}

export const getters = {
    beachData: (state) => {
        if (!state.beach.data) return {};

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
                beachSeabedType: state.beach.data.item.PARAMETERS.P_BOTTOM
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

            servicesData: []
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

        return ret;
    }
}
