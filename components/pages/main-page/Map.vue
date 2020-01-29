<template>
    <section class="main-page__map">
        <div class="custom-container">
            <h3 class="main-page__section-title">Карта пляжей Крыма</h3>
        </div>
        <div class="overlay-map">
            <MapBeaches :data="mapBeachesData" v-if="address.length >1"/>
            <client-only>
                <yandex-map
                        :coords="cords"
                        :zoom="zoom"
                        style="width: 100%;height: 650px"
                        :class="{'map-size': address.length >1}"
                        :cluster-options="{1: {clusterDisableClickZoom: true}}"
                        :controls="['zoomControl']"
                        :behaviors="['drag']"
                        map-type="map"
                        @click="closeAll"
                >
                    <ymap-marker
                            v-if="address.length === 1"
                            v-for="(item,index) in address"
                            :key="index"
                            :marker-id="index"
                            :coords="[item.lat, item.lng]"
                            :icon="markerIcon(address_beaches.length)"
                            @click="getBeach(item)"
                    ></ymap-marker>
                    <ymap-marker
                            v-else
                            v-for="(item,index) in address"
                            :key="item.lng"
                            :marker-id="index"
                            :coords="[item.lat, item.lng]"
                            :icon="beachIcon()"
                            :balloonTemplate="balloonTemplate(index)"
                            @balloonopen="initSwiper()"
                    ></ymap-marker>
                </yandex-map>
            </client-only>
        </div>
    </section>
</template>

<script>
    import {yandexMap, ymapMarker} from 'vue-yandex-maps';
    import MapBeaches from "./MapBeaches";
    import MapPopupSlider from "../../global/MapPopupSlider";

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
                    },

                ],
                mapPopupData: {
                    pics: [
                        '/pics/main/section1_beach1.png',
                        '/pics/main/section1_beach1.png',
                        '/pics/main/section1_beach1.png',
                        '/pics/main/section1_beach1.png'
                    ],
                    position: 'bottom',
                    rating: 5.0,
                    title: 'Массандровский пляж',
                    location: 'алушта, КРЫМ'
                },
                mapBeachesData: [
                    {
                        pic: '/pics/main/section1_beach1.png',
                        rating: 5.0,
                        favorite: false,
                        title: 'Массандровский пляж',
                        location: 'алушта, КРЫМ'
                    },
                    {
                        pic: '/pics/main/section1_beach2.png',
                        rating: 5.0,
                        favorite: false,
                        title: 'Пляж «Лазурный берег»',
                        location: 'алушта, КРЫМ'
                    },
                    {
                        pic: '/pics/main/section1_beach3.png',
                        rating: 4.0,
                        favorite: false,
                        title: 'Массандровский пляж',
                        location: 'алушта, КРЫМ'
                    }
                ]
            }
        },
        components: {MapPopupSlider, MapBeaches, yandexMap, ymapMarker},
        methods: {
            initSwiper(){
              console.log('IEROPEPEP')
            },
            getBeach(item) {
                this.zoom = 12;
                this.cords = [44.640894812141954, 34.261004767121044];
                this.address = this.address_beaches;
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
            beachIcon() {
                return ({
                    layout: 'default#image',
                    imageHref: `/pics/global/svg/map_beach.svg`,
                    imageSize: [42, 42],
                    imageOffset: [0, 0],
                    contentOffset: [-10, 0],
                    contentLayout: '<img src="$[properties.iconContent]">'
                });
            },
            closeAll(e){
             console.log(e.originalEvent.target.balloon.events.close())
            },
            balloonTemplate(index) {
                return `<div class="map-popup map-popup--top">
                    <div class="map-popup__pic-area">
                    {{ index }}
                    </div>
                    <div class="map-popup__info-area">
                        <span class="map-popup__rating">
                            <img src="/pics/global/svg/star.svg" alt="Рейтинг">
                            <span>{{ 5.0 }}</span>
                        </span>
                        <h3 class="map-popup__title">Массандровский пляж</h3>
                        <h5 class="map-popup__location">алушта, КРЫМ</h5>
                    </div>
                </div>`
            }
        },
        computed: {
        },
        mounted() {
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

    [class*="ymaps-2"][class*="-ground-pane"] {
        filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
        /* Firefox 3.5+ */
        -webkit-filter: grayscale(100%);
        /* Chrome 19+ & Safari 6+ */
    }
</style>
