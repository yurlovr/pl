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
        props: ['beaches'],

        data() {
            return {
                zoom: 7,
                chosen: -1,
                map: null
            }
        },

        methods: {
            initMap() {
                setTimeout(() => {
                    let filteredBeaches = this.beaches.filter(v => v.pos != undefined && !isNaN(v.pos[0]));
                    if (!filteredBeaches || filteredBeaches.length == 0)
                        return;

                    ymaps
                      .load()
                      .then(maps => {
                        this.map = new maps.Map(document.getElementById('map'), {
                          center: filteredBeaches.length != 1 ? ([ filteredBeaches.reduce((a, b) => {
                                    if (typeof a === 'object') a = a.pos[0];
                                        return a + b.pos[0];
                                }) / filteredBeaches.length,
                                filteredBeaches.reduce((a, b) => {
                                    if (typeof a === 'object') a = a.pos[1];
                                        return a + b.pos[1];
                                }) / filteredBeaches.length
                          ]) : filteredBeaches[0].pos,
                          zoom: this.zoom,
                          controls: ['typeSelector']
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


                        let unchoose = () => {
                            // objectManager.objects.setObjectOptions(this.chosen, {
                            //     iconImageHref: '/pics/global/svg/map_beach_blue.svg'
                            // });
                            // this.chosen = -1;
                            console.log('unchoose')
                            this.map.balloon.close();
                        }

                        const objectEvent = (e) => {
                            const objectId = e.get('objectId');
                            if (e.get('type') == 'mouseenter') {
                                objectManager.objects.setObjectOptions(objectId, {
                                    iconImageHref: '/pics/global/svg/map_beach_gold.svg'
                                });
                            }
                            if (e.get('type') == 'mouseleave') {
                                if (objectId != this.chosen) {
                                    objectManager.objects.setObjectOptions(objectId, {
                                        iconImageHref: '/pics/global/svg/map_beach_72dpi.svg'
                                    });
                                }
                            }

                            if (e.get('type') == 'click') {
                              console.warn('true click')
                                // if (window.innerWidth <= 800) {
                                    if (this.chosen == objectId) {
                                        this.$bus.$emit('closeModalAndUnscrollToCard');
                                        setTimeout(() => {this.map.balloon.close();}, 1);
                                    }
                                    console.warn(this.chosen, 'this.chosen', objectId)
                                    if (this.chosen != -1) {
                                        objectManager.objects.setObjectOptions(this.chosen, {
                                            iconImageHref: '/pics/global/svg/map_beach_72dpi.svg'
                                        });
                                    }
                                    this.chosen = objectId;
                              console.warn(this.chosen, 'this.chosen after')
                                    objectManager.objects.setObjectOptions(this.chosen, {
                                        iconImageHref: '/pics/global/svg/map_beach_gold.svg'
                                    });
                                    this.$bus.$emit('scrollToCard', this.chosen);
                                    this.$bus.$emit('openModal', this.chosen);
                                // }
                            }
                        }
                        objectManager.objects.events.add(['mouseenter', 'mouseleave', 'mouseup', 'mousedown', 'click'], objectEvent);

                        this.$bus.$on('modalClosed', () => {
                            unchoose();
                        });

                        let placeMarks = (n) => {
                            if (n != undefined) filteredBeaches = n.slice(0, -1).filter(v => v.pos && !isNaN(v.pos[0]));
                            else filteredBeaches = this.beaches.filter(v =>  v.pos != undefined && !isNaN(v.pos[0]));
                            if (!filteredBeaches || filteredBeaches.length == 0)
                                return;

                            this.map.setCenter(filteredBeaches.length != 1 ? ([ filteredBeaches.reduce((a, b) => {
                                    if (typeof a === 'object') a = a.pos[0];
                                        return a + b.pos[0];
                                }) / filteredBeaches.length,
                                filteredBeaches.reduce((a, b) => {
                                    if (typeof a === 'object') a = a.pos[1];
                                        return a + b.pos[1];
                                }) / filteredBeaches.length
                            ]) : filteredBeaches[0].pos, this.zoom);

                            objectManager.removeAll();

                            // placing the markers
                            for (let i = 0; i < filteredBeaches.length; i++) {
                                balloonLayout = maps.templateLayoutFactory.createClass(`
                                      <div class="map-popup map-popup--bottom">
                                        <div class="map-popup__pic-area">
                                            <div class="map-popup__slider">
                                                <div class="swiper-container" id="balloon-swiper">
                                                    <div class="swiper-wrapper">
                                                       <img class="map__img" src="${filteredBeaches[i].pic}" alt="">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="map-popup__info-area">
                                            <span class="map-popup__rating">
                                                <img src="/pics/global/svg/star.svg" alt="Рейтинг">
                                                <span>${filteredBeaches[i].rating.toFixed(1)}</span>
                                            </span>
                                            <a href="${filteredBeaches[i].humanLink||  filteredBeaches[i].beachId}" class="map-popup__title">${filteredBeaches[i].title}</a>
                                            <h5 class="map-popup__location">${filteredBeaches[i].location}</h5>
                                        </div>
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
                                            coordinates: filteredBeaches[i].pos
                                        },
                                        options: {
                                            iconLayout: 'default#imageWithContent',
                                            iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
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
                                          balloonOffset: [-151, -345],
                                        }
                                    }]
                                });
                            }
                        }

                        this.$bus.$on('updateMap', (n) => {
                            unchoose();
                            placeMarks(n);
                        });
                        placeMarks();

                        // on map click
                        this.map.events.add('click', (e) => {
                            if(e.get('target') === this.map) {
                                this.$bus.$emit('closeModalAndUnscrollToCard');
                                this.map.balloon.close();
                            }
                        });
                      })
                      .catch(error => console.error('Failed to load Yandex Maps, ', error))
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
