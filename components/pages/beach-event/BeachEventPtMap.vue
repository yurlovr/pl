<template>
	<div class="map" id="map-2"></div>
</template>

<script>
	import ymaps from "ymaps";

	export default {
		props: ['data'],

		data() {
			return {
                zoom: 8,
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
            this.initMap();

            window.addEventListener('resize', this.onResize);
        }
	}
</script>