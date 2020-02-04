<template>
    <section class="main-page__map">
        <div class="custom-container">
            <h3 class="main-page__section-title">Карта пляжей Крыма</h3>
        </div>
        <div class="overlay-map">
            <MapBeaches :data="mapBeachesData" v-if="step == 2"/>
            <client-only>
                <yandex-map
                        :coords="cords"
                        :zoom="zoom"
                        style="width: 100%;height: 650px"
                        :class="{'map-size': address.length >1}"
                        :cluster-options="{1: {clusterDisableClickZoom: true}}"
                        :controls="['zoomControl']"
                        :behaviors="['drag']"
                        @map-was-initialized="getMap"
                >
                    <ymap-marker
                        v-for="(item,index) in address"
                        v-if="step == 1"
                        :key="index"
                        :marker-id="index"
                        :coords="[item.lat, item.lng]"
                        :icon="markerIcon(address_beaches.length)"
                        @click="getBeach(item)"
                    ></ymap-marker>
                    <ymap-marker
                        v-if="step == 2"
                        v-for="(item,index) in address_beaches"
                        :key="index"
                        :marker-id="index"
                        :coords="[item.lat, item.lng]"
                        :icon="beachIcon(index)"
                        :balloonTemplate="balloonTemplate(index)"
                        @balloonopen="initSwiper(index)"
                        @balloonclose="destroySwiper(index)"
                        @mouseenter="hover = index"
                        @mouseleave="hover = -1"
                        :options="options"
                        :cluster-options="coptions"
                    ></ymap-marker>
                </yandex-map>
            </client-only>
        </div>
    </section>
</template>

<script>
    import {yandexMap, ymapMarker} from 'vue-yandex-maps';
    import MapBeaches from '~/components/pages/main/MapBeaches';

    export default {
        props: ['data'],

        data() {
            return {
                cords: [44.50465522867475, 34.21493291965433],
                zoom: 8,
                address: [
                    {
                        lat: 44.521199755999035,
                        lng: 34.15580509752773
                    },
                ],
                address_beaches: [
                    {
                        lat: 44.51942103736535,
                        lng: 34.258601507843714
                    },
                    {
                        lat: 44.55842103736535,
                        lng: 34.278601507843714
                    },
                    {
                        lat: 44.5449734958915,
                        lng: 34.265251523169956
                    }
                ],
                mapBeachesData: [
                    {
                        pics: [
                            '/pics/main/section1_beach1.png',
                            '/pics/main/section1_beach2.png'
                        ],
                        rating: 5.0,
                        favorite: false,
                        title: 'Массандровский пляж',
                        location: 'алушта, КРЫМ'
                    },
                    {
                        pics: [
                            '/pics/main/section1_beach3.png',
                            '/pics/main/section1_beach4.png'
                        ],
                        rating: 5.0,
                        favorite: false,
                        title: 'Пляж «Лазурный берег»',
                        location: 'алушта, КРЫМ'
                    },
                    {
                        pics: [
                            '/pics/main/section1_beach2.png',
                            '/pics/main/section1_beach3.png'
                        ],
                        rating: 4.0,
                        favorite: false,
                        title: 'Массандровский пляж',
                        location: 'алушта, КРЫМ'
                    }
                ],
                step: 1,
                map: null,
                options: {
                    balloonCloseButton: false,
                    hideHintIcon: false,
                    hintHideIcon: false,
                    hint: {
                        hideIcon: false
                    }
                },
                coptions: {
                    hideIcon: false,
                    hint: {
                        hideIcon: false
                    }
                },
                swipers: {},
                hover: -1,
                chosen: -1
            }
        },

        components: {
            MapBeaches,
            yandexMap,
            ymapMarker
        },

        methods: {
            getBeach(item) {
                this.zoom = 12;
                this.cords = [44.640894812141954, 34.261004767121044];
                this.step = 2;
            },

            markerIcon(index) {
                return ({
                        layout: 'default#imageWithContent',
                        content: `${index}`,
                        imageSize: [42, 42],
                        imageOffset: [0, 0],
                        contentOffset: [-10, 0],
                        contentLayout: '<div class="item-clust" ><span class="item-clust__index">$[properties.iconContent]</span></div>'
                    }
                )
            },

            beachIcon(i) {
                return ({
                    layout: 'default#image',
                    imageHref:  this.hover == i || this.chosen == i ? `/pics/global/svg/beach_orange.svg` : `/pics/global/svg/beach_blue.svg`,
                    imageSize: [42, 42],
                    imageOffset: [0, 0],
                    contentOffset: [-10, 0],
                    contentLayout: '<img src="$[properties.iconContent]">'
                });
            },

            initSwiper(i) {
                this.chosen = i;

                // init the swiper
                this.swipers[i] = 
                    new Swiper(`.swiper-container-${i}`, {
                        slidesPerView: 1,
                        pagination: {
                            el: `.swiper-pagination-${i}`,
                        }
                    }
                );

                let slideLeft = () => {
                    this.swipers[i].slidePrev();
                };
                let slideRight = () => {
                    this.swipers[i].slideNext();
                }

                // make the buttons work
                document.querySelector(`.slider__arrow-left-${i}`).addEventListener('click', slideLeft);
                document.querySelector(`.slider__arrow-right-${i}`).addEventListener('click', slideRight);

                // scroll
                this.$bus.$emit('goToCard', i);
            },

            destroySwiper(i) {
                // this.swipers[i].destroy();
                // delete this.swiper[i];
            },

            balloonTemplate(index) {
                let slides = [];

                for (let i = 0; i < this.mapBeachesData[index].pics.length; i++) {
                    slides.push(`
                        <div class="swiper-slide map-popup__slide">
                            <img src="${this.mapBeachesData[index].pics[i]}">
                        </div>
                    `);
                }

                return `
                    <div class="map-popup map-popup--top">
                        <div class="map-popup__pic-area">
                            <div class="map-popup__slider">
                                <div class="swiper-container swiper-container-${index}">
                                    <div class="swiper-wrapper">
                                        ${slides.join('')}
                                    </div>
                                </div>
                                <div class="pagination-wrapper"><div class="swiper-pagination swiper-pagination-${index}"></div></div>
                                <button class="slider__arrow-left slider__arrow-left-${index}">
                                    <img src="/pics/global/svg/arrow_next_map.svg" alt="Налево">
                                </button>
                                <button class="slider__arrow-right slider__arrow-right-${index}">
                                    <img src="/pics/global/svg/arrow_next_map.svg" alt="Направо">
                                </button>
                            </div>
                        </div>
                        <div class="map-popup__info-area">
                            <span class="map-popup__rating">
                                <img src="/pics/global/svg/star.svg" alt="Рейтинг">
                                <span>${this.mapBeachesData[index].rating.toFixed(1)}</span>
                            </span>
                            <h3 class="map-popup__title">${this.mapBeachesData[index].title}</h3>
                            <h5 class="map-popup__location">${this.mapBeachesData[index].location}</h5>
                        </div>
                    </div>
                `;
            },

            getMap(e) {
                this.map = e;

                this.map.events.add('click', (e) => {
                    if(e.get('target') === this.map) { // Если клик был на карте, а не на геообъекте
                        this.map.balloon.close();
                    }
                });
            }
        },
        computed: {
           
        },

        mounted() {
            require('~/plugins/swiper.min').__proto__;
        }
    }
</script>

<style>
    .map-size {
        width: 100%;
        height: 600px;
        overflow: hidden;
    }

    .map-size-small {
        width: 70%;
        height: 600px;
    }

    .overlay-map {
        display: flex;
    }



    .item-clust {
        width: 49px;
        height: 49px;
        background: #FCAB2D;
        box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item-clust__index {
        font-weight: 500;
        font-size: 18px;
        text-align: center;
        color: #FFFFFF;
    }

    /* [class*="ymaps-2"][class*="ground-pane"] {
        filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); */
        /* Firefox 3.5+ */
        /* -webkit-filter: grayscale(100%); */
        /* Chrome 19+ & Safari 6+ */
    /* } */

    [class*="ymaps-2"][class*="-balloon__content"] {
        padding: 0 !important;
        margin: 0 !important;
        background: none !important;
    }

    /* [class*="ymaps-2"][class*="balloon__close"] {
        display: none;
    } */

    [class*="ymaps-2"][class*="balloon__layout"] {
        background: none !important;
    }

    [class*="ymaps-2"][class*="balloon"] {
        border-radius: 12px;
    }

    [class*="ymaps-2-"][class*="-map"]:not([class*="promo"]) {
        width: 100% !important;
    }
</style>
