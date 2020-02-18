<template>
    <section class="main-page__map">
	   <div class="map" id="map"></div>
    </section>
</template>

<script>
	import ymaps from "ymaps";

	export default {
		props: ['data'],

		data() {
			return {
				coords: [44.50465522867475, 34.21493291965433],
                zoom: 8,
                addressBeaches: [
                    {
                        chunk: [ 44.521199755999035, 34.15580509752773 ],
                        beaches: [
                            {
                                pos: [44.51942103736535, 34.258601507843714]
                            },
                            {
                                pos: [44.55842103736535, 34.258601507843714]
                            },
                            {
                                pos: [44.5449734958915, 34.265251523169956]
                            }
                        ]
                    }
                ],
                hover: -1,
                chosen: -1,
                step: 1,
                curSwiper: null,
                map: null
			}
		},

		methods: {
            initMap() {
                setTimeout(() => {
                    ymaps
                      .load()
                      .then(maps => {
                        this.map = new maps.Map(document.getElementById('map'), {
                          center: this.coords,
                          zoom: this.zoom,
                          controls: []
                        });
                        this.map.behaviors.disable('scrollZoom');
                        this.map.controls.add('zoomControl', {
                            position: {
                                right: '30px',
                                bottom: '30px'
                            }
                        });

                        let circleOrangeStep1 = maps.templateLayoutFactory.createClass(
                            '<div class="map__circle-orange step-1"><span>$[properties.iconContent]</span></div>'
                        );

                        let curPlacemark;
                        for (let i = 0; i < this.addressBeaches.length; i++) {
                            this.map.geoObjects.add(curPlacemark = new maps.Placemark(this.addressBeaches[i].chunk,
                            {
                                iconContent: this.addressBeaches[i].beaches.length,
                            },
                            {
                                iconLayout: 'default#imageWithContent',
                                iconImageSize: [50,50],
                                iconImageOffset: [-25, -25],
                                iconContentLayout: circleOrangeStep1
                            }));

                            curPlacemark.events.add('click', () => {
                                this.step = 2;
                                this.zoom = 12;
                                this.map.setZoom(this.zoom);
                                curPlacemark.options.set('visible', false);
                            });
                        }


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
            require('~/plugins/swiper.min').__proto__;
            // making the map
            this.initMap();

            window.addEventListener('resize', this.onResize);
        }
	}
</script>