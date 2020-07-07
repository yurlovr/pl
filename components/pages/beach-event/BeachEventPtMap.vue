<template>
  <div class="map" id="map-2"></div>
</template>

<script>
  import ymaps from "ymaps";

  export default {
    props: ['data', 'additional'],

    data() {
      return {
        zoom: 15,
        chosenAuto: -1,
        chosenBus: -1,
        map: null
      }
    },

    methods: {
      goto(i, coords = [45.32, 33.03]) {
        console.warn(i, 'coords', coords);
        this.map.panTo(coords.map(e => Number(e)), {
          safe: true
        }).then(() => {
          this.map.setZoom(23);
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
                });
              this.map.geoObjects.add(beachesObjectManager);
              this.map.geoObjects.add(parkingsObjectManager);
              this.map.geoObjects.add(busStopsObjectManager);
              this.map.geoObjects.add(additionalObjectManager);

              let features = [];
              if (this.additional && this.additional.length) {
                this.additional.forEach((el, i) => {
                  let {pos, id, title, pic, description} = el;
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
                      iconImageHref: pic || '/pics/global/svg/map_beach_blue.svg',
                      // iconContentLayout: icon,
                      iconImageSize: [30, 43],
                      minWidth: 200,
                      minHeight: 50,
                      iconImageOffset: [-18, -50],
                      hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                        `<div class='header'>${title}</div><br />` +
                        `<div class='description'>${description}</div>` +
                        "</div>"
                      ),
                    },
                    properties: {
                      balloonContentBody: "<div class='my-balloon'>" +
                        `<div class='header'>${title}</div><br />` +
                        `<div class='description'>${description}</div>` +
                        "</div>"
                    }
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
                    iconImageHref: '/pics/global/svg/map_beach_blue.svg',
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
                    <h3 class="map-pt__popup__title">
                      ${this.data.parkings.auto[i].title}
                    </h3>
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
                    <h3 class="map-pt__popup__title">
                      Остановка общественного транспорта
                    </h3>
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
                this.chosenAuto = this.chosenBus = -1;
                this.map.balloon.close();
              }
            })
            .catch(error => console.error('Failed to load Yandex Maps, ', error))
        }, 1);
      },

      onResize() {
        if (this.map)
          this.map.container.fitToViewport();
      }
    },

    mounted() {
      this.initMap();

      window.addEventListener('resize', this.onResize);
    },
    created() {
      this.$bus.$on('call-balloon-service', (id, coords) => {
        this.goto(id, coords);
      })
    }
  }
</script>
