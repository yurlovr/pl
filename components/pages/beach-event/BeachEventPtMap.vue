<template>
  <div class="position-relative">
    <div class="map__zoom-wrapper">
      <button class="map__zoom map__zoom-plus">
        <img  src="~/static/pics/global/svg/plus.svg">
      </button>
      <button class="map__zoom map__zoom-minus">
        <img  src="~/static/pics/global/svg/minus.svg">
      </button>
    </div>
    <div class="map" id="map-2"></div>
  </div>

</template>

<script>
  import ymaps from "ymaps";

  export default {
    props: ['data', 'additional', 'mapData'],

    data() {
      return {
        zoom: 15,
        chosenAuto: -1,
        chosenBus: -1,
        chosenObject: -1,
        map: null,
        mobile: 1025
      }
    },

    methods: {
      goto(i, coords = [45.32, 33.03]) {
        console.warn(i, 'coords', coords);
        this.map.panTo(coords.map(e => Number(e)), {
          safe: true
        }).then(() => {
          this.map.setZoom(20);
          this.map.geoObjects.get(0).objects.balloon.open(i)
        })
      },
      initMap() {
        setTimeout(() => {
          ymaps
            .load()
            .then(maps => {
              this.map = new maps.Map(document.getElementById('map-2'), {
                center: this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433],
                zoom: this.zoom,
                controls: ['typeSelector'],
              });
              this.map.behaviors.disable('scrollZoom');
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

              let beachIcon = maps.templateLayoutFactory.createClass(
                `<div class="map__beach-icon">
                <div class="map__beach-caption">${this.data.title}</div>
              </div>`
                ),
                parkingIcon = maps.templateLayoutFactory.createClass(
                  `<div class="map__beach-parking-icon"></div>`
                ),
                beachesObjectManager = new maps.ObjectManager({
                  geoObjectOpenBalloonOnClick: false
                }),
                parkingsObjectManager = new maps.ObjectManager({
                  geoObjectOpenBalloonOnClick: true
                }),
                busStopsObjectManager = new maps.ObjectManager({
                  geoObjectOpenBalloonOnClick: true
                }),
                additionalObjectManager = new maps.ObjectManager({
                  geoObjectOpenBalloonOnClick: true
                }),
                customObjectManager = new maps.ObjectManager({
                  geoObjectOpenBalloonOnClick: true
                });
              this.map.geoObjects.add(beachesObjectManager);
              this.map.geoObjects.add(parkingsObjectManager);
              this.map.geoObjects.add(busStopsObjectManager);
              this.map.geoObjects.add(additionalObjectManager);
              this.map.geoObjects.add(customObjectManager);

              let features = [];
              if (this.additional && this.additional.length) {
                this.additional.forEach((el, i) => {
                  let {pos, id, title, pic, description, pictures, map_pic} = el;
                  let slides = [];
                  if (pictures) {
                    for (let k = 0; k < pictures.length; k++) {
                      slides.push(`
                      <div class="swiper-slide map-swiper-d">
                        <div class="beach-event__visitor-pics__pic-area" style="height: 90px; width: 135px;">
                          <img src="${pictures[k]}" style="border-radius: 12px;">
                        </div>
                      </div>
                    `);
                    }
                  }
                  let icon = maps.templateLayoutFactory.createClass(
                    `<div class="map__beach-icon">
                    <div class="map__beach-caption">${title}</div>
                  </div>`
                  );
                  features.push({
                    type: "Feature",
                    id: id,
                    geometry: {
                      type: "Point",
                      coordinates: pos
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: (map_pic || pic) || '/pics/global/svg/map_beach_72dpi.svg',
                      // iconContentLayout: icon,
                      iconImageSize: [30, 43],
                      minWidth: 200,
                      minHeight: 50,
                      zIndexActive: 2000,
                      zIndexDrag: 2000,
                      zIndexHover: 2000,
                      zIndex: 2000,
                      iconImageOffset: [-18, -50],
                      balloonLayout: maps.templateLayoutFactory.createClass("<div class='my-hint features'>" +
                        `<div class='header'>${title}</div><br />` +
                        `<div class='description'>${description}</div>`+
                        `<div class="beach-event__visitor-pics__slider" style='height: 100%'>
                          <div class="swiper-container" id='balloon-swiper'>
                            <div class="swiper-wrapper">
                               ${slides.join('')}
                            </div>
                          </div>
                          <button class="slider__arrow-left slider__arrow-left-balloon ${slides && slides.length <= 2 ? 'd-none': ''}"
                                  style="transform: translate(-50%, -50%); top: 50%; opacity: 1 !important; display: none; left: 13px">
                            <img src="/pics/global/svg/slider_arrow_left.svg" alt="Налево">
                          </button>
                          <button class="slider__arrow-right slider__arrow-right-balloon ${slides && slides.length <= 2 ? 'd-none': ''}"
                                  style="transform: translate(50%, -50%); top: 50%; opacity: 1 !important; display: none; right: 13px">
                            <img src="/pics/global/svg/slider_arrow_right.svg" alt="Направо">
                          </button>
                        </div>` +
                        "</div>", {
                          build() {
                            this.constructor.superclass.build.call(this);

                            if (!pictures || pictures.length <= 0) {
                              document.querySelector(`.beach-event__visitor-pics__slider`).style.display = 'none'
                            }

                            // init the swiper
                            this.swiper = new Swiper(`#balloon-swiper`, {
                              slidesPerView: 2,
                              on: {
                                imagesReady: function() {
                                  let left = document.querySelector(`.slider__arrow-left-balloon`);
                                  let right = document.querySelector(`.slider__arrow-right-balloon`);
                                  this.isBeginning === false ? left.style.display = 'block' : left.style.display = 'none';
                                  this.isEnd === false ? right.style.display = 'block' : right.style.display = 'none'
                                },
                                slideChange: function() {
                                  let left = document.querySelector(`.slider__arrow-left-balloon`);
                                  let right = document.querySelector(`.slider__arrow-right-balloon`);
                                  this.isBeginning === false ? left.style.display = 'block' : left.style.display = 'none';
                                  this.isEnd === false ? right.style.display = 'block' : right.style.display = 'none'
                                }
                              }
                            });

                            // init the arrows
                            document.querySelector(`.slider__arrow-left-balloon`).addEventListener('click', () => this.swiper.slidePrev());
                            document.querySelector(`.slider__arrow-right-balloon`).addEventListener('click', () => this.swiper.slideNext());
                          },
                          clear() {
                            this.swiper.destroy();

                            this.constructor.superclass.clear.call(this);
                          },
                          getShape() {
                            return new maps.shape.Rectangle(new maps.geometry.pixel.Rectangle([
                              [25, 0], [275, 0] // balloon's width is always 300 and -25 for the margin
                            ]));
                          },
                        }
                      ),
                      balloonContentLayout: '',
                      balloonOffset: this.mobile > 600 ? [-155, -5] : [-170, -150],
                      balloonPane: 'balloon',
                      balloonAutoPan: true,
                      balloonPanelMaxMapArea: 0,
                      hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint features'>" +
                        `<div class='header'>${title}</div><br />` +
                        `<div class='description'>${description} ${slides.length}</div>` +
                        `<div class="beach-event__visitor-pics__slider" style='height: 100%'>
                          <div class="swiper-container" id='balloon-swiper'>
                            <div class="swiper-wrapper">
                               ${slides.join('')}
                            </div>
                          </div>
                          <button class="slider__arrow-left slider__arrow-left-balloon ${slides && slides.length <= 2 ? 'd-none': ''}"
                                  style="transform: translate(-50%, -50%); top: 50%; opacity: 1 !important; display: none; left: 13px">
                            <img src="/pics/global/svg/slider_arrow_left.svg" alt="Налево">
                          </button>
                          <button class="slider__arrow-right slider__arrow-right-balloon ${slides && slides.length <= 2 ? 'd-none': ''}"
                                  style="transform: translate(50%, -50%); top: 50%; opacity: 1 !important; display: none; right: 13px">
                            <img src="/pics/global/svg/slider_arrow_right.svg" alt="Направо">
                          </button>
                        </div>` +
                        "</div>",{
                        build() {
                          this.constructor.superclass.build.call(this);

                          if (!pictures || pictures.length <= 0) {
                            document.querySelector(`.beach-event__visitor-pics__slider`).style.display = 'none'
                          }

                          // init the swiper
                          this.swiper = new Swiper(`#balloon-swiper`, {
                            slidesPerView: 2,
                            on: {
                              imagesReady: function () {
                                let left = document.querySelector(`.slider__arrow-left-balloon`);
                                let right = document.querySelector(`.slider__arrow-right-balloon`);
                                this.isBeginning === false ? left.style.display = '' : left.style.display = 'none';
                                this.isEnd === false ? right.style.display = '' : right.style.display = 'none'
                              },
                              slideChange: function() {
                                let left = document.querySelector(`.slider__arrow-left-balloon`);
                                let right = document.querySelector(`.slider__arrow-right-balloon`);
                                this.isBeginning === false ? left.style.display = '' : left.style.display = 'none';
                                this.isEnd === false ? right.style.display = '' : right.style.display = 'none'
                              }
                            }
                          });

                          // init the arrows
                          document.querySelector(`.slider__arrow-left-balloon`).addEventListener('click', () => this.swiper.slidePrev());
                          document.querySelector(`.slider__arrow-right-balloon`).addEventListener('click', () => this.swiper.slideNext());
                        },
                          clear() {
                            this.swiper.destroy();

                            this.constructor.superclass.clear.call(this);
                          },
                          getShape() {
                            return new maps.shape.Rectangle(new maps.geometry.pixel.Rectangle([
                              [0, 0], [1000, 350] // balloon's width is always 300 and -25 for the margin
                            ]));
                          },
                      }
                      ),
                    },
                  })
                })
              }
              console.log(features, 'features')
              additionalObjectManager.add({
                type: "FeatureCollection",
                features: features
              });


              // adding the beach marker to the map
              beachesObjectManager.add({
                type: "FeatureCollection",
                features: [{
                  type: "Feature",
                  id: 0,
                  geometry: {
                    type: "Point",
                    coordinates: this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433]
                  },
                  options: {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
                    iconContentLayout: beachIcon,
                    iconImageSize: [30, 43],
                    iconImageOffset: [-18, -50]
                  }
                }]
              });

              this.$bus.$emit('routeCoords', this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433]);

              // adding parkings
              let balloonLayout;
              for (let i = 0; i < this.data.parkings.auto.length; i++) {
                balloonLayout = maps.templateLayoutFactory.createClass(`
                  <div class="map-popup map-popup--top map-pt__popup">
                      ${this.data.parkings.auto[i].title}
                    <span class="map-pt__popup__info">
                      ${this.data.parkings.auto[i].type}
                    </span>
                    <h4 class="map-pt__popup__subtitle">
                      ${this.data.parkings.auto[i].mode}
                    </h4>
                    <span class="map-pt__popup__info">
                      ${this.data.parkings.auto[i].address}
                    </span>
                    <span class="map-pt__popup__price">
                      ${this.data.parkings.auto[i].price}
                    </span>
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
                      [25, 0], [275, 0] // balloon's width is always 300 and -25 for the margin
                    ]));
                  },

                  _isElement(element) {
                    return element && element[0];
                  }
                });

                parkingsObjectManager.add({
                  type: "FeatureCollection",
                  features: [{
                    type: "Feature",
                    id: i,
                    geometry: {
                      type: "Point",
                      coordinates: this.data.parkings.auto[i] ? this.data.parkings.auto[i].pos : [0, 0]
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: '/pics/global/svg/parking_small.svg',
                      iconContentLayout: parkingIcon,
                      iconImageSize: [27, 40],
                      iconImageOffset: [-18, -50],
                      hideIconOnBalloonOpen: false,
                      balloonShadow: false,
                      balloonLayout: balloonLayout,
                      balloonContentLayout: '',
                      balloonOffset: [-155, -5],
                      balloonPane: 'balloon',
                      balloonAutoPan: true,
                      balloonPanelMaxMapArea: 0,
                      hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                        `<b>${this.data.parkings.auto[i].type}</b><br />` +
                        "</div>"
                      )
                    },
                  }]
                });
              }
              const parkingsObjectEvent = (e) => {
                const objectId = e.get('objectId');
                if (e.get('type') == 'mouseenter') {
                  if (objectId != this.chosenAuto) {
                    parkingsObjectManager.objects.setObjectOptions(objectId, {
                      iconImageHref: '/pics/global/svg/parking_big.svg',
                      iconImageOffset: [-22, -60],
                      iconImageSize: [35, 48]
                    });
                  }
                } else if (e.get('type') == 'mouseleave') {
                  if (objectId != this.chosenAuto) {
                    parkingsObjectManager.objects.setObjectOptions(objectId, {
                      iconImageHref: '/pics/global/svg/parking_small.svg',
                      iconImageOffset: [-18, -50],
                      iconImageSize: [27, 40]
                    });
                  }
                } else if (e.get('type') == 'click') {
                  // open the balloon
                  if (this.chosenAuto != objectId) {
                    if (this.chosenAuto != -1) {
                      parkingsObjectManager.objects.setObjectOptions(this.chosenAuto, {
                        iconImageHref: '/pics/global/svg/parking_small.svg',
                        iconImageOffset: [-18, -50],
                        iconImageSize: [27, 40]
                      });
                    }
                    this.chosenAuto = objectId;
                    this.$bus.$emit('routeCoords', this.data.parkings.auto[this.chosenAuto].pos);
                    parkingsObjectManager.objects.setObjectOptions(this.chosenAuto, {
                      iconImageHref: '/pics/global/svg/parking_big.svg',
                      iconImageOffset: [-22, -60],
                      iconImageSize: [35, 48]
                    });
                    // close the balloon
                  } else {
                    closeBalloon();
                    this.$bus.$emit('routeCoords', this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433]);
                  }
                }
              }
              parkingsObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], parkingsObjectEvent);

              // adding bus stops

              for (let i = 0; i < this.data.parkings.bus.length; i++) {
                balloonLayout = maps.templateLayoutFactory.createClass(`
                  <div class="map-popup map-popup--top map-pt__popup">
                    <div>
                      Остановка общественного транспорта
                    </div>
                    <span class="map-pt__popup__info">
                      Автобусы:
                    </span>
                    <h4 class="map-pt__popup__subtitle">
                      ${this.data.parkings.bus[i].buses || ''}
                    </h4>
                    <span class="map-pt__popup__info">
                      Маршрутное такси:
                    </span>
                    <span class="map-pt__popup__subtitle">
                      ${this.data.parkings.bus[i].taxi || ''}
                    </span>
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
                      [25, 0], [275, 0] // balloon's width is always 300 and -25 for the margin
                    ]));
                  },

                  _isElement(element) {
                    return element && element[0];
                  }
                });

                busStopsObjectManager.add({
                  type: "FeatureCollection",
                  features: [{
                    type: "Feature",
                    id: i,
                    geometry: {
                      type: "Point",
                      coordinates: this.data.parkings.bus[i] ? this.data.parkings.bus[i].pos : [0, 0]
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: '/pics/global/svg/bus_stop_small.svg',
                      iconContentLayout: parkingIcon,
                      iconImageSize: [27, 40],
                      iconImageOffset: [-18, -50],
                      hideIconOnBalloonOpen: false,
                      balloonShadow: false,
                      balloonLayout: balloonLayout,
                      balloonContentLayout: '',
                      balloonOffset: [-155, -5],
                      balloonPane: 'balloon',
                      balloonAutoPan: true,
                      balloonPanelMaxMapArea: 0
                    }
                  }]
                });
              }
              const busStopsObjectEvent = (e) => {
                const objectId = e.get('objectId');
                if (e.get('type') == 'mouseenter') {
                  busStopsObjectManager.objects.setObjectOptions(objectId, {
                    iconImageHref: '/pics/global/svg/bus_stop_big.svg',
                    iconImageOffset: [-22, -60],
                    iconImageSize: [35, 48]
                  });
                } else if (e.get('type') == 'mouseleave') {
                  if (objectId != this.chosenBus) {
                    busStopsObjectManager.objects.setObjectOptions(objectId, {
                      iconImageHref: '/pics/global/svg/bus_stop_small.svg',
                      iconImageOffset: [-18, -50],
                      iconImageSize: [27, 40]
                    });
                  }
                } else if (e.get('type') == 'click') {
                  // open the balloon
                  if (this.chosenBus != objectId) {
                    if (this.chosenBus != -1) {
                      busStopsObjectManager.objects.setObjectOptions(this.chosenBus, {
                        iconImageHref: '/pics/global/svg/bus_stop_small.svg',
                        iconImageOffset: [-18, -50],
                        iconImageSize: [27, 40]
                      });
                    }
                    this.chosenBus = objectId;
                    this.$bus.$emit('routeCoords', this.data.parkings.bus[this.chosenBus].pos);
                    busStopsObjectManager.objects.setObjectOptions(this.chosenBus, {
                      iconImageHref: '/pics/global/svg/bus_stop_big.svg',
                      iconImageOffset: [-22, -60],
                      iconImageSize: [35, 48]
                    });
                    // close the balloon
                  } else {
                    closeBalloon();
                    this.$bus.$emit('routeCoords', this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433]);
                  }
                }
              }
              busStopsObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], busStopsObjectEvent);

              // closing balloon on map click
              this.map.events.add('click', (e) => {
                if (e.get('target') === this.map) {
                  closeBalloon();
                  this.$bus.$emit('routeCoords', this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433]);
                }
              });

              busStopsObjectManager.setFilter('id < 0');

              this.$bus.$on('showOnMap', id => {
                closeBalloon();
                if (id == 0) {
                  parkingsObjectManager.setFilter('');
                  busStopsObjectManager.setFilter('id < 0');
                } else if (id == 1) {
                  busStopsObjectManager.setFilter('');
                  parkingsObjectManager.setFilter('id < 0');
                }
              });


              // adding customs

              if (this.mapData && this.mapData.length) {
                for (let i = 0; i < this.mapData.length; i++) {
                  balloonLayout = maps.templateLayoutFactory.createClass(`
                      <div class="map-popup map-popup--bottom">
                        <a href="${this.mapData[i].url}" style="color: #393e48">
                          <div class="map-popup__pic-area">
                              <div class="map-popup__slider">
                                  <div class="swiper-container" id="balloon-swiper">
                                      <div class="swiper-wrapper">
                                         <img class="map__img" src="${this.mapData[i].preview}" alt="">
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="map-popup__info-area">
                              <div class="map-popup__title">${this.mapData[i].name}</div>
                              <p>${this.mapData[i].type.DESCRIPTION}</p>
                          </div>
                        </a>
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
                        [25, 0], [275, 0] // balloon's width is always 300 and -25 for the margin
                      ]));
                    },

                    _isElement(element) {
                      return element && element[0];
                    }
                  });

                  customObjectManager.add({
                    type: "FeatureCollection",
                    features: [{
                      type: "Feature",
                      id: i,
                      geometry: {
                        type: "Point",
                        coordinates: this.mapData[i] ? this.mapData[i].coordinates : [0, 0]
                      },
                      options: {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: '/pics/global/svg/beach_blue.svg',
                        iconContentLayout: parkingIcon,
                        iconImageSize: [27, 40],
                        iconImageOffset: [-18, -50],
                        hideIconOnBalloonOpen: false,
                        balloonShadow: false,
                        balloonLayout: balloonLayout,
                        balloonContentLayout: '',
                        balloonOffset: [-155, -345],
                        balloonPane: 'balloon',
                        balloonAutoPan: true,
                        balloonPanelMaxMapArea: 0,
                        hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                          `<b>${this.mapData[i].name}</b><br />` +
                          "</div>"
                        )
                      },
                    }]
                  });
                }
              }

              const customObjectEvent = (e) => {
                const objectId = e.get('objectId');
                if (e.get('type') == 'mouseenter') {
                  if (objectId != this.chosenObject) {
                    customObjectManager.objects.setObjectOptions(objectId, {
                      iconImageHref: '/pics/global/svg/beach_blue.svg',
                      iconImageOffset: [-22, -60],
                      iconImageSize: [35, 48]
                    });
                  }
                } else if (e.get('type') == 'mouseleave') {
                  if (objectId != this.chosenObject) {
                    customObjectManager.objects.setObjectOptions(objectId, {
                      iconImageHref: '/pics/global/svg/beach_blue.svg',
                      iconImageOffset: [-18, -50],
                      iconImageSize: [27, 40]
                    });
                  }
                } else if (e.get('type') == 'click') {
                  // open the balloon
                  if (this.chosenObject != objectId) {
                    if (this.chosenObject != -1) {
                      customObjectManager.objects.setObjectOptions(this.chosenObject, {
                        iconImageHref: '/pics/global/svg/beach_blue.svg',
                        iconImageOffset: [-18, -50],
                        iconImageSize: [27, 40]
                      });
                    }
                    this.chosenObject = objectId;
                    this.$bus.$emit('routeCoords', this.mapData[this.chosenObject].coordinates);
                   customObjectManager.objects.setObjectOptions(this.chosenObject, {
                      iconImageHref: '/pics/global/svg/beach_blue.svg',
                      iconImageOffset: [-22, -60],
                      iconImageSize: [35, 48]
                    });
                    // close the balloon
                  } else {
                    closeBalloon();
                    this.$bus.$emit('routeCoords', this.data && this.data.pos ? this.data.pos : [44.50465522867475, 34.21493291965433]);
                  }
                }
              }
              customObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], customObjectEvent);


              const closeBalloon = () => {
                parkingsObjectManager.objects.setObjectOptions(this.chosenAuto, {
                  iconImageHref: '/pics/global/svg/parking_small.svg',
                  iconImageOffset: [-18, -50],
                  iconImageSize: [27, 40]
                });
                busStopsObjectManager.objects.setObjectOptions(this.chosenBus, {
                  iconImageHref: '/pics/global/svg/parking_small.svg',
                  iconImageOffset: [-18, -50],
                  iconImageSize: [27, 40]
                });
                customObjectManager.objects.setObjectOptions(this.chosenObject, {
                  iconImageHref: '/pics/global/svg/beach_blue.svg',
                  iconImageOffset: [-18, -50],
                  iconImageSize: [27, 40]
                });
                this.chosenAuto = this.chosenBus = this.chosenObject = -1;
                this.map.balloon.close();
              }
            })
            .catch(error => console.error('Failed to load Yandex Maps, ', error))
        }, 1);
      },

      onResize() {
        if (this.map)
          this.map.container.fitToViewport();
      },
    },

    async mounted() {
      // requiring the Swiper
      require('~/plugins/swiper.min').__proto__;
      this.initMap();

      window.addEventListener('resize', this.onResize);
    },
    created() {
      this.$bus.$on('call-balloon-service', (id, coords) => {
        this.goto(id, coords);
      })
        if (process.browser) {
          this.mobile = window.innerWidth
          window.onresize = () => {
            this.mobile = window.innerWidth
          }
        }
    },
    beforeDestroy() {
      window.onresize = null
    },
    beforeDestroy() {
      this.$bus.$off('showOnMap');
      this.$bus.$off('call-balloon-service')
    }
  }
</script>
