<template>
	<div class="map" id="map-2"></div>
</template>

<script>
	import ymaps from "ymaps";

	export default {
		props: ['data'],

		data() {
			return {
				coords: [44.50465522867475, 34.21493291965433],
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
                swipers: {},
                hover: -1,
                chosen: -1,
                map: null
			}
		},

		methods: {
            initMap() {
                setTimeout(() => {
                    ymaps
                      .load()
                      .then(maps => {
                        this.map = new maps.Map(document.getElementById('map-2'), {
                          center: [44.50465522867475, 34.21493291965433],
                          zoom: 8,
                          controls: []
                        });
                        console.log(this.map.controls);
                        this.map.behaviors.disable('scrollZoom');
                        this.map.controls.add('zoomControl', {
                            position: {
                                right: '30px',
                                bottom: '30px',
                            }
                        });
                      })
                      .catch(error => console.log('Failed to load Yandex Maps, ', error))
                }, 1);
            },

            onResize() {
                if (this.map)
            	   this.map.container.fitToViewport();
            }
        },

        async mounted() {
            // requiring the Swiper
            // require('~/plugins/swiper.min').__proto__;
            // making the map
            this.initMap();

            window.addEventListener('resize', this.onResize);
        }
	}
</script>