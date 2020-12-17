<template>
  <div class="beach-event__map-weather">
    <div class="beach-event__map-weather__map-card">
      <div class="map__zoom-wrapper">
        <button class="map__zoom map__zoom-plus">
          <img src="~/static/pics/global/svg/plus.svg">
        </button>
        <button class="map__zoom map__zoom-minus">
          <img src="~/static/pics/global/svg/minus.svg">
        </button>
      </div>
      <div class="map" />
      <div
        v-if="data.pos"
        class="beach-event__map-weather__map-card__button-area"
      >
        <a
          target="_blank"
          :href="`https://yandex.ru/maps/?pt=
            ${data.pos[1]}%2C${data.pos[0]}&z=18`"
          class="banner__card__info-area__button"
        >
          <span>Перейти на карту</span>
        </a>
        <!-- <span @click.stop="goto">Перейти на panto</span> -->
      </div>
    </div>
    <Weather
      v-if="showWeatherBlock"
      :weather="beach ? data : data.weather"
    />
  </div>
</template>

<script>
import ymaps from 'ymaps';

export default {
  components: {
    Weather: () => import('./Weather'),
  },
  props: ['data', 'additional', 'mapData', 'beach'],

  data() {
    return {
      map: null,
      zoom: 15,
      chosenObject: -1,
    };
  },

  computed: {
    showWeatherBlock() {
      if (this.beach) {
        // поправить для пляжа, так как нужно проверять определенные свойства
        return !!Object.keys(this.data).filter((key) => this.data[key]).length;
      }
      return !!Object.keys(this.data.weather).filter((key) => this.data.weather[key]).length;
    },
  },

  async mounted() {
    // making the map
    this.initMap();
    window.addEventListener('resize', this.onResize);

    if (process.browser) {
      this.$bus.$on('call-balloon-weather', (id, coords) => {
        this.goto(id, coords);
      });
    }
  },
  beforeDestroy() {
    this.$bus.$off('call-balloon-weather');
  },

  methods: {
    goto(i, coords = [45.32, 33.03]) {
      console.warn(this.map, i, coords, 'почему у нас весь сайт в логах?');
      this.map.panTo(coords, {
        safe: true,
      }).then(() => {
        this.map.geoObjects.get(0).objects.balloon.open(i);
      });
    },
    initMap() {
      this.zoom = this.data.pos ? 18 : 8;
      setTimeout(() => {
        ymaps
          .load()
          .then((maps) => {
            this.map = new maps.Map(this.$el.getElementsByClassName('map')[0], {
              center: this.data.pos || [44.50465522867475, 34.21493291965433],
              zoom: this.zoom,
              controls: ['typeSelector'],
            });
            this.map.behaviors.disable('scrollZoom');

            this.$el.querySelector('.map__zoom-plus').addEventListener('click', () => {
              if (this.zoom < 25) {
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
            if (this.data.pos) {
              // this.map.behaviors.disable('drag');
              const icon = maps.templateLayoutFactory.createClass(
                `<div class="map__beach-icon">
                    <div class="map__beach-caption">${this.data.title || this.data.weather.title}</div>
                  </div>`,
              );
              const objectManager = new maps.ObjectManager({
                geoObjectOpenBalloonOnClick: true,
              });
              this.map.geoObjects.add(objectManager);
              const main = {
                type: 'Feature',
                id: 0,
                geometry: {
                  type: 'Point',
                  coordinates: this.data.pos,
                },
                options: {
                  iconLayout: 'default#imageWithContent',
                  iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
                  iconContentLayout: icon,
                  iconImageSize: [30, 43],
                  iconImageOffset: [-18, -50],
                },
              };
              const features = [];
              if (this.additional && this.additional.length) {
                this.additional.forEach((el) => {
                  const {
                    pos, id, title, pic,
                  } = el;
                  const icon = maps.templateLayoutFactory.createClass(
                    `<div class="map__beach-icon">
                    <div class="map__beach-caption">${title}</div>
                  </div>`,
                  );
                  features.push({
                    type: 'Feature',
                    id: Number(id),
                    geometry: {
                      type: 'Point',
                      coordinates: pos,
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: pic || '/pics/global/svg/map_beach_72dpi.svg',
                      iconContentLayout: icon,
                      iconImageSize: [30, 43],
                      iconImageOffset: [-18, -50],
                      hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>"
                          + `<b>${title}</b><br />`
                          + '</div>'),
                    },
                    properties: {
                      balloonContentBody: "<div class='my-balloon'>"
                          + `<b>${title}</b><br />`
                          + '</div>',
                    },
                  });
                });
              }

              features.unshift(main);
              // features.push(_em);

              objectManager.add({
                type: 'FeatureCollection',
                features,
              });
            }

            // adding customs
            const customObjectManager = new maps.ObjectManager({
              geoObjectOpenBalloonOnClick: true,
            });
            const parkingIcon = maps.templateLayoutFactory.createClass(
              '<div class="map__beach-parking-icon"></div>',
            );
            //  this.map.geoObjects.add(objectManager);
            this.map.geoObjects.add(customObjectManager);
            if (this.mapData && this.mapData.length) {
              for (let i = 0; i < this.mapData.length; i++) {
                const balloonLayout = maps.templateLayoutFactory.createClass(`
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
                              <p>${this.mapData[i].type ? this.mapData[i].type.DESCRIPTION : ''}</p>
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
                      [25, 0], [275, 0], // balloon's width is always 300 and -25 for the margin
                    ]));
                  },

                  _isElement(element) {
                    return element && element[0];
                  },
                });

                customObjectManager.add({
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    id: i,
                    geometry: {
                      type: 'Point',
                      coordinates: this.mapData[i] ? this.mapData[i].coordinates : [0, 0],
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: '/pics/global/svg/beach_blue.svg',
                      iconContentLayout: parkingIcon,
                      iconImageSize: [27, 40],
                      iconImageOffset: [-18, -50],
                      hideIconOnBalloonOpen: false,
                      balloonShadow: false,
                      balloonLayout,
                      balloonContentLayout: '',
                      balloonOffset: [-155, -345],
                      balloonPane: 'balloon',
                      balloonAutoPan: true,
                      balloonPanelMaxMapArea: 0,
                      hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>"
                          + `<b>${this.mapData[i].name}</b><br />`
                          + '</div>'),
                    },
                  }],
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
                    iconImageSize: [35, 48],
                  });
                }
              } else if (e.get('type') == 'mouseleave') {
                if (objectId != this.chosenObject) {
                  customObjectManager.objects.setObjectOptions(objectId, {
                    iconImageHref: '/pics/global/svg/beach_blue.svg',
                    iconImageOffset: [-18, -50],
                    iconImageSize: [27, 40],
                  });
                }
              } else if (e.get('type') == 'click') {
                // open the balloon
                if (this.chosenObject != objectId) {
                  if (this.chosenObject != -1) {
                    customObjectManager.objects.setObjectOptions(this.chosenObject, {
                      iconImageHref: '/pics/global/svg/beach_blue.svg',
                      iconImageOffset: [-18, -50],
                      iconImageSize: [27, 40],
                    });
                  }
                  this.chosenObject = objectId;
                  customObjectManager.objects.setObjectOptions(this.chosenObject, {
                    iconImageHref: '/pics/global/svg/beach_blue.svg',
                    iconImageOffset: [-22, -60],
                    iconImageSize: [35, 48],
                  });
                  // close the balloon
                } else {
                  closeBalloon();
                }
              }
            };
            customObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], customObjectEvent);
            const closeBalloon = () => {
              customObjectManager.objects.setObjectOptions(this.chosenObject, {
                iconImageHref: '/pics/global/svg/beach_blue.svg',
                iconImageOffset: [-18, -50],
                iconImageSize: [27, 40],
              });
              this.chosenObject = -1;
              this.map.balloon.close();
            };
              // closing balloon on map click
            this.map.events.add('click', (e) => {
              if (e.get('target') === this.map) {
                closeBalloon();
              }
            });
          })
          .catch((error) => console.error('Failed to load Yandex Maps, ', error));
      }, 1);
    },

    onResize() {
      if (this.map) this.map.container.fitToViewport();
    },
  },
};
</script>
