<template>
  <div class="map" id="map-2"></div>
</template>

<script>
import ymaps from "ymaps";

export default {
  props: ['data'],

  data() {
    return {
      center: [44.50465522867475, 34.21493291965433],
      zoom: 3,
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
              center: this.center,
              zoom: this.zoom,
              controls: []
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
            });
            this.map.geoObjects.add(beachesObjectManager);
            this.map.geoObjects.add(parkingsObjectManager);

            beachesObjectManager.add({
              type: "FeatureCollection",
              features: [{
                type: "Feature",
                id: 0,
                geometry: {
                  type: "Point",
                  coordinates: [44.50465522867475, 34.21493291965433]
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

            let balloonLayout;
            for (let i = 0; i < this.data.parkings.length; i++) {
              balloonLayout = maps.templateLayoutFactory.createClass(`
                  <div class="map-popup map-popup--bottom map-pt__popup">
                    <h3 class="map-pt__popup__title">
                      ${this.data.parkings[i].NAME}
                    </h3>
                    <span class="map-pt__popup__info">
                      ${this.data.parkings[i].TYPE}
                    </span>
                    <h4 class="map-pt__popup__subtitle">
                      ${this.data.parkings[i].MODE}
                    </h4>
                    <span class="map-pt__popup__info">
                      ${this.data.parkings[i].ADDRESS}
                    </span>
                    <span class="map-pt__popup__price">
                      ${this.data.parkings[i].PRICE}
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
                          coordinates: this.data.parkings[i].COORDINATES
                      },
                      options: {
                          iconLayout: 'default#imageWithContent',
                          iconImageHref: '/pics/global/svg/parking_small.svg',
                          iconContentLayout: parkingIcon,
                          iconImageSize: [27,40],
                          iconImageOffset: [-18, -50],
                          hideIconOnBalloonOpen: false,
                          balloonShadow: false,
                          balloonLayout: balloonLayout,
                          balloonContentLayout: '',
                          balloonOffset: [-155, -230],
                          balloonPane: 'balloon',
                          balloonAutoPan: true,
                          balloonPanelMaxMapArea: 0
                      }
                  }]
              });

              const parkingsObjectEvent = (e) => {
                  const objectId = e.get('objectId');
                  if (e.get('type') == 'mouseenter') {
                      parkingsObjectManager.objects.setObjectOptions(objectId, {
                          iconImageHref: '/pics/global/svg/parking_big.svg',
                          iconImageOffset: [-22, -60],
                          iconImageSize: [35,48]
                      });
                  } else if (e.get('type') == 'mouseleave') {
                      if (objectId != this.chosen) {
                          parkingsObjectManager.objects.setObjectOptions(objectId, {
                              iconImageHref: '/pics/global/svg/parking_small.svg',
                              iconImageOffset: [-18, -50],
                              iconImageSize: [27,40]
                          });
                      }
                  } else if (e.get('type') == 'click') {
                      // open the balloon
                      if (this.chosen != objectId) {
                          if (this.chosen != -1) {
                              parkingsObjectManager.objects.setObjectOptions(this.chosen, {
                                  iconImageHref: '/pics/global/svg/parking_small.svg',
                                  iconImageOffset: [-18, -50],
                                  iconImageSize: [27,40]
                              });
                          }
                          this.chosen = objectId;
                          parkingsObjectManager.objects.setObjectOptions(this.chosen, {
                              iconImageHref: '/pics/global/svg/parking_big.svg',
                              iconImageOffset: [-22, -60],
                              iconImageSize: [35,48]
                          });
                      // close the balloon
                      } else {
                          closeBalloon();
                      }
                  }
              }

              parkingsObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], parkingsObjectEvent);
            }

            // closing balloon on map click
            this.map.events.add('click', (e) => {
                if(e.get('target') === this.map) {
                    closeBalloon();
                }
            });

            const closeBalloon = () => {
              parkingsObjectManager.objects.setObjectOptions(this.chosen, {
                  iconImageHref: '/pics/global/svg/parking_small.svg',
                  iconImageOffset: [-18, -50],
                  iconImageSize: [27,40]
              });
              this.chosen = -1;
              this.map.balloon.close();
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

  mounted() {
    this.initMap();

    window.addEventListener('resize', this.onResize);
  }
}
</script>
