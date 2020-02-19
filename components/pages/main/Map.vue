<template>
    <section class="main-page__map">
	   <div class="map" id="map"></div>
    </section>
</template>

<script>
	import ymaps from "ymaps";

	export default {
		props: ['addressBeaches', 'center'],

		data() {
			return {
                zoom: 8,
                // hover: -1,
                chosen: -1,
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
                          center: this.center,
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

                        let iconStep1 = maps.templateLayoutFactory.createClass(
                            '<div class="map__circle-orange step-1"><span>$[properties.iconContent]</span></div>'
                        );

                        let iconStep2 = maps.templateLayoutFactory.createClass(
                            `<div class="map__beach-icon step-2"></div>`
                        );

                        let curPlacemark, step1s = [], step2s = [], counterForChosen = 1;
                        // step 1 markers
                        for (let i = 0; i < this.addressBeaches.length; i++) {
                            this.map.geoObjects.add(curPlacemark = new maps.Placemark(this.addressBeaches[i].chunkCenter,
                            {
                                iconContent: this.addressBeaches[i].beaches.length,
                            },
                            {
                                iconLayout: 'default#imageWithContent',
                                iconImageHref: '',
                                iconImageSize: [50,50],
                                iconImageOffset: [-25, -25],
                                iconContentLayout: iconStep1
                            }));

                            curPlacemark.events.add('click', () => {
                                this.zoom = 12;
                                this.map.setZoom(this.zoom);
                                for (let j = 0; j < step1s.length; j++)
                                    step1s[j].options.set('visible', false);
                                for (let j = 0; j < step2s.length; j++)
                                    step2s[j].options.set('visible', true);
                            });

                            step1s.push(curPlacemark);

                            // step 2 markers
                            for (let j = 0; j < this.addressBeaches[i].beaches.length; j++) {
                                this.map.geoObjects.add(curPlacemark = new maps.Placemark(this.addressBeaches[i].beaches[j].pos,
                                    {
                                        balloonContent: 'hi'
                                    },
                                    {
                                        iconLayout: 'default#imageWithContent',
                                        iconImageHref: '',
                                        iconContentLayout: iconStep2,
                                        balloonShadow: false,
                                        iconImageSize: [27,38],
                                        iconImageOffset: [-13.5, -19],
                                        hideIconOnBalloonOpen: false,
                                        balloonOffset: [3, -40]
                                    }
                                ));

                                curPlacemark.options.set('visible', false);

                                curPlacemark.events.add('click', () => {
                                    if (this.chosen != -1)
                                        document.getElementById(`step-2-${this.chosen}`).classList.remove('active');
                                    this.chosen = counterForChosen;
                                    document.getElementById(`step-2-${this.chosen}`).classList.add('active');
                                });

                                step2s.push(curPlacemark);

                                counterForChosen++;
                            }
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