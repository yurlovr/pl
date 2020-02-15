<template>
    <section class="main-page__map">
        <div class="custom-container">
            <h3 class="main-page__section-title">Карта пляжей Крыма</h3>
        </div>
        <div class="overlay-map">
            <MapBeaches :data="mapBeachesData" v-if="step == 2"/>
            <Map :data="mapBeachesData" />
        </div>
    </section>
</template>

<script>
    import MapBeaches from '~/components/pages/main/MapBeaches';

    export default {
        props: ['data'],

        data() {
            return {
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
                step: 1
            }
        },

        components: {
            MapBeaches,
            yandexMap,
            ymapMarker
        },

        methods: {
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
