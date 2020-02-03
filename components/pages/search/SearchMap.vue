<template>
    <section class="main-page__map">
        <div class="overlay-map">
            <client-only>
                <yandex-map
                    :coords="cords"
                    :zoom="zoom"
                    style="width: 100%;height: 600px"
                    :cluster-options="{1: {clusterDisableClickZoom: true}}"
                    :controls="['zoomControl']"
                    :behaviors="['drag']"
                    map-type="map"
                >
                    <ymap-marker
                        v-for="(item,index) in address_beaches"
                        :key="index"
                        :marker-id="index"
                        :coords="[item.lat, item.lng]"
                        :icon="markerImage(index)"
                        @mouseenter="hover = index"
                        @mouseleave="hover = -1"
                        @click="getItem(item, index)"
                    ></ymap-marker>
                </yandex-map>
            </client-only>
        </div>
    </section>
</template>

<script>
    import {yandexMap, ymapMarker} from 'vue-yandex-maps';

    export default {
        props: ['data'],
        data() {
            return {
                cords: [44.50465522867475, 34.21493291965433],
                zoom: 12,
                address_beaches: [
                    {
                        lat: 44.51942103736535,
                        lng: 34.258601507843714,
                    },
                    {
                        lat: 44.55842103736535,
                        lng: 34.278601507843714,
                    },
                    {
                        lat: 44.5449734958915,
                        lng: 34.265251523169956,
                    },

                ],
                hover: -1,
                chosen: -1
            }
        },
        components: {yandexMap, ymapMarker},
        methods: {
            getItem(item, index) {
                this.chosen = index;
                item.active = true;
                this.$bus.$emit('openModal', index);
                this.$bus.$emit('scrollToCard', index);
            },
            markerImage(i) {
                return ({
                        layout: 'default#image',
                        imageHref: this.hover == i || this.chosen == i ? `/pics/global/svg/beach_orange.svg` : `/pics/global/svg/beach_blue.svg`,
                        imageSize: [42, 42],
                        imageOffset: [0, 0],
                        contentOffset: [-10, 0],
                        contentLayout: '<img src="$[properties.iconContent]">'
                    }
                )
            }
        },
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
</style>
