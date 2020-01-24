<template>
    <section class="main-page__map">
        <div class="custom-container">
            <h3 class="main-page__section-title">Карта пляжей Крыма</h3>
        </div>
        <client-only>
            <yandex-map
                    :coords="[45.389194, 33.993751]"
                    ref="yandexMap"
                    zoom="8"
                    style="width: 100%; height: 600px;"
                    :cluster-options="{1: {clusterDisableClickZoom: true}}"
                    :behaviors="['drag']"
                    :controls="['zoomControl']"
                    map-type="map"
            >
                <ymap-marker
                        v-for="(item,index) in address"
                        :key="index"
                        :marker-id="index"
                        :coords="[item.lat, item.lng]"
                        :icon="markerIcon(index)"
                        :balloon-template="balloonTemplate"
                ></ymap-marker>
            </yandex-map>
        </client-only>
    </section>
</template>

<script>
    import {yandexMap, ymapMarker} from 'vue-yandex-maps';

    export default {
        props: ['data'],
        data() {
            return {
                address: [
                    {
                        lat: 45.389194,
                        lng: 33.993751
                    },
                    {
                        lat: 45.489194,
                        lng: 34.993751
                    },
                    {
                        lat: 45.589194,
                        lng: 35.993751
                    },
                ],
            }
        },
        components: {yandexMap, ymapMarker},
        methods: {
            markerIcon(index) {
                return ({
                        layout: 'default#imageWithContent',
                        content: `${index}`,
                        imageSize: [0, 0],
                        contentLayout: '<div class="item-clust"><span class="item-clust__index">$[properties.iconContent]</span></div>'
                    }
                )
            }
        },
        computed: {
            balloonTemplate() {
                return `
        <h1 class="red">Hi, everyone!</h1>
        <p>I am here: ${this.coords}</p>
       <img src="http://via.placeholder.com/350x150">`}
        },
        mounted() {
            if (process.client) {
                console.log(this.$refs)
            }
        }
    }
</script>
<style>
 .item-clust{
     width: 49px;
     height: 49px;
     background: #FCAB2D;
     box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
 }
    .item-clust__index{
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
