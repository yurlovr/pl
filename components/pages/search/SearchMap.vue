<template>
    <div class="map"></div>
</template>

<script>
    import ymaps from "ymaps";

    export default {
        props: ['data'],

        data() {
            return {
                coords: [44.50465522867475, 34.21493291965433],
                zoom: 8,
                hover: -1,
                chosen: -1
            }
        },

        methods: {
            initMap() {
                setTimeout(() => {
                    ymaps
                      .load()
                      .then(maps => {
                        const map = new maps.Map(document.getElementsByClassName('map')[0], {
                          center: [44.50465522867475, 34.21493291965433],
                          zoom: 8,
                          controls: []
                        });
                        console.log(map.controls);
                        map.behaviors.disable('scrollZoom');
                        map.controls.add('zoomControl', {
                            position: {
                                right: '30px',
                                bottom: '30px',
                            }
                        });
                      })
                      .catch(error => console.log('Failed to load Yandex Maps, ', error))
                }, 1);
            }
        },

        async mounted() {
            // making the map
            this.initMap();
        }
    }
</script>