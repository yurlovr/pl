<template>
    <section class="main-page__map">
        <div class="map__zoom-wrapper">
            <button class="map__zoom map__zoom-plus">
                <img src="~/static/pics/global/svg/plus.svg">
            </button>
            <button class="map__zoom map__zoom-minus">
                <img src="~/static/pics/global/svg/minus.svg">
            </button>
        </div>
       <div class="map" id="map"></div>
    </section>
</template>

<script>
    import ymaps from "ymaps";

    export default {
        data() {
            return {
                center: [44.50465522867475, 34.21493291965433],
                zoom: 12,
                chosen: -1,
                map: null,
                beaches: [
                    {
                        title: 'Масяковский пляж',
                        pos: [44.51942103736535, 34.258601507843714]
                    },
                    {
                        title: 'Массандровский пляж',
                        pos: [44.55842103736535, 34.258601507843714]
                    },
                    {
                        title: 'Какой-то пляж',
                        pos: [44.5449734958915, 34.265251523169956]
                    }
                ]
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

                        // zoom buttons
                        this.$el.querySelector('.map__zoom-plus').addEventListener('click', () => {
                            if (this.zoom < 15) {
                                this.zoom++;
                                this.map.setZoom(this.zoom);
                            }
                        });
                        this.$el.querySelector('.map__zoom-minus').addEventListener('click', () => {
                            if (this.zoom > 0) {
                                this.zoom--;
                                this.map.setZoom(this.zoom);
                            }
                        });

                        // markers
                        let icon = maps.templateLayoutFactory.createClass(
                            `<div class="map__beach-icon step-2"></div>`
                        );

                        let step1CounterForChosen = 0, step2CounterForChosen = 0, balloonLayout,
                        objectManager = new maps.ObjectManager({
                            geoObjectOpenBalloonOnClick: true
                        });
                        this.map.geoObjects.add(objectManager);

                        const objectEvent = (e) => {
                            const objectId = e.get('objectId');
                            if (e.get('type') == 'mouseenter') {
                                objectManager.objects.setObjectOptions(objectId, {
                                    iconImageHref: '/pics/global/svg/map_beach_gold.svg'
                                });
                            } else if (e.get('type') == 'mouseleave') {
                                if (objectId != this.chosen) {
                                    objectManager.objects.setObjectOptions(objectId, {
                                        iconImageHref: '/pics/global/svg/map_beach_blue.svg'
                                    });
                                }
                            } else if (e.get('type') == 'click') {
                                if (this.chosen == objectId) {
                                    this.$bus.$emit('closeModalAndUnscrollToCard');
                                    this.map.balloon.close();
                                    return;
                                }

                                if (this.chosen != -1) {
                                    objectManager.objects.setObjectOptions(this.chosen, {
                                        iconImageHref: '/pics/global/svg/map_beach_blue.svg'
                                    });
                                }
                                this.chosen = objectId;
                                objectManager.objects.setObjectOptions(this.chosen, {
                                    iconImageHref: '/pics/global/svg/map_beach_gold.svg'
                                });
                                this.$bus.$emit('scrollToCard', this.chosen);
                                this.$bus.$emit('openModal', this.chosen);
                            }
                        }
                        objectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], objectEvent);

                        this.$bus.$on('modalClosed', () => {
                            unchoose();
                        });

                        // placing the markers
                        for (let i = 0; i < this.beaches.length; i++) {
                            balloonLayout = maps.templateLayoutFactory.createClass(`
                                <div class="map__sidename">
                                    <span>${this.beaches[i].title}</span>
                                </div>
                            `, {
                                build() {
                                    this.constructor.superclass.build.call(this);
                                },

                                clear() {
                                    this.constructor.superclass.clear.call(this);
                                },

                                getShape() {
                                    return new maps.shape.Rectangle(new maps.geometry.pixel.Rectangle([
                                        [0, 0], [100, 0] // balloon's width is always 300 and -25 for the margin
                                    ]));
                                },

                                _isElement(element) {
                                    return element && element[0];
                                }
                            });

                            objectManager.add({
                                type: "FeatureCollection",
                                features: [{
                                    type: "Feature",
                                    id: i,
                                    geometry: {
                                        type: "Point",
                                        coordinates: this.beaches[i].pos
                                    },
                                    options: {
                                        iconLayout: 'default#imageWithContent',
                                        iconImageHref: '/pics/global/svg/map_beach_blue.svg',
                                        iconContentLayout: icon,
                                        iconImageSize: [40,53],
                                        iconImageOffset: [-18, -50],
                                        balloonAutoPan: true,
                                        balloonPanelMaxMapArea: 0,
                                        balloonContentLayout: '',
                                        balloonLayout: balloonLayout,
                                        hideIconOnBalloonOpen: false,
                                        balloonShadow: false,
                                        balloonPane: 'balloon',
                                        balloonOffset: [25, -20]
                                    }
                                }]
                            });
                        }

                        // on map click
                        this.map.events.add('click', (e) => {
                            if(e.get('target') === this.map) {
                                this.$bus.$emit('closeModalAndUnscrollToCard');
                                this.map.balloon.close();
                            }
                        });

                        let unchoose = () => {
                            objectManager.objects.setObjectOptions(this.chosen, {
                                iconImageHref: '/pics/global/svg/map_beach_blue.svg'
                            });
                            this.chosen = -1;
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
            this.onResize();
        }
    }
</script>
