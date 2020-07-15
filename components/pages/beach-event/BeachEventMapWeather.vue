<template>
  <div class="beach-event__map-weather">
    <div class="beach-event__map-weather__map-card">
      <div class="map__zoom-wrapper">
        <button class="map__zoom map__zoom-plus">
          <img  src="~/static/pics/global/svg/plus.svg">
        </button>
        <button class="map__zoom map__zoom-minus">
          <img  src="~/static/pics/global/svg/minus.svg">
        </button>
      </div>
      <div class="map"></div>
      <div class="beach-event__map-weather__map-card__button-area" v-if="data.pos">
        <a target="_blank" :href="`https://yandex.ru/maps/?pt=${data.pos[1]}%2C${data.pos[0]}&z=18`"
           class="banner__card__info-area__button">
          <span>Перейти на карту</span>
        </a>
<!--        <span @click.stop="goto">Перейти на panto</span>-->
      </div>
    </div>
    <div class="beach-event__map-weather__weather-card">
      <div class="beach-event__map-weather__weather-card__date">
        <img src="~/static/pics/global/svg/calendar_big.svg">
        <span>{{ data.date }}</span>
      </div>
      <h3 class="beach-event__map-weather__weather-card__title" v-html="data.title"></h3>
      <div class="h-line"></div>
      <div class="beach-event__map-weather__weather-card__temp-area">
        <div class="beach-event__map-weather__weather-card__temp-area__item">
          <div class="beach-event__map-weather__weather-card__temp-area__item__left">
            <img src="~/static/pics/global/svg/temp_air.svg">
            <span>Температура<br>воздуха</span>
          </div>
          <div class="beach-event__map-weather__weather-card__temp-area__item__right">
            <span class="slider-weather__slide__temp-number">{{ (data.airTemp > 0 ? '+ ' : '') + (data.airTemp < 0 ? '' : '') + data.airTemp }}</span>
            <span class="slider-weather__slide__temp-o beach-event__map-weather__weather-card__temp-area__temp-o"><span>o</span></span>
            <span
              class="slider-weather__slide__temp-C beach-event__map-weather__weather-card__temp-area__temp-C">C</span>
          </div>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item">
          <div class="beach-event__map-weather__weather-card__temp-area__item__left">
            <img src="~/static/pics/global/svg/temp_water.svg">
            <span>Температура<br>воды</span>
          </div>
          <div class="beach-event__map-weather__weather-card__temp-area__item__right">
            <span
              class="slider-weather__slide__temp-number beach-event__map-weather__weather-card__temp-area__temp-number">{{ (data.waterTemp > 0 ? '+ ' : '') + (data.waterTemp < 0 ? '' : '') + data.waterTemp }}</span>
            <span class="slider-weather__slide__temp-o beach-event__map-weather__weather-card__temp-area__temp-o"><span>o</span></span>
            <span
              class="slider-weather__slide__temp-C beach-event__map-weather__weather-card__temp-area__temp-C">C</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ymaps from "ymaps";

  export default {
    props: ['data', 'additional', 'mapData'],

    data() {
      return {
        map: null,
        zoom: null,
        chosenObject: -1
      }
    },

    methods: {
      goto(i, coords = [45.32, 33.03]) {
        console.warn(this.map, i, coords, 'fsdsdfsfdfsdsfddfs')
        this.map.panTo(coords, {
          safe: true
        }).then(() => {
          this.map.geoObjects.get(0).objects.balloon.open(i)
        })
      },
      initMap() {
            this.zoom = this.data.pos ? 18 : 8
        setTimeout(() => {
          ymaps
            .load()
            .then(maps => {
              this.map = new maps.Map(this.$el.getElementsByClassName('map')[0], {
                center: this.data.pos || [44.50465522867475, 34.21493291965433],
                zoom:  this.zoom,
                controls: ['typeSelector']
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
              if (this.data.pos) {
                // this.map.behaviors.disable('drag');

                let icon = maps.templateLayoutFactory.createClass(
                  `<div class="map__beach-icon">
                    <div class="map__beach-caption">${this.data.title}</div>
                  </div>`
                  ),
                  objectManager = new maps.ObjectManager({
                    geoObjectOpenBalloonOnClick: true
                  });
                this.map.geoObjects.add(objectManager);
                /*let emit_data = {
                    pic: "https://crimea.air-dev.agency/upload/iblock/2c5/2c56d3fbff9b56fabe97a74f461e77f8.png",
                    title: "Пункт медицинской помощи",
                    pos: [45.32, 33.03]
                  },
                  _em = {
                    type: "Feature",
                    id: 1,
                    geometry: {
                      type: "Point",
                      coordinates: emit_data.pos
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: emit_data.pic,
                      iconContentLayout: maps.templateLayoutFactory.createClass(
                        `<div class="map__beach-icon">
                    <div class="map__beach-caption">${emit_data.title}</div>
                  </div>`),
                      iconImageSize: [46, 60],
                      iconImageOffset: [-18, -50],
                      hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                        `<b>${emit_data.title}</b><br />` +
                        "</div>"
                      )
                    },
                    properties: {
                      balloonContentBody: "<div class='my-balloon'>" +
                        `<b>${emit_data.title}</b><br />` +
                        "</div>"
                    }
                  }*/
                let main = {
                    type: "Feature",
                    id: 0,
                    geometry: {
                      type: "Point",
                      coordinates: this.data.pos
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
                      iconContentLayout: icon,
                      iconImageSize: [30, 43],
                      iconImageOffset: [-18, -50],
                    },
                  },
                  features = [];
                if (this.additional && this.additional.length) {
                  this.additional.forEach(el => {
                    let {pos, id, title, pic} = el;
                    let icon = maps.templateLayoutFactory.createClass(
                      `<div class="map__beach-icon">
                    <div class="map__beach-caption">${title}</div>
                  </div>`
                    );
                    features.push({
                      type: "Feature",
                      id: Number(id),
                      geometry: {
                        type: "Point",
                        coordinates: pos
                      },
                      options: {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref:  pic || '/pics/global/svg/map_beach_72dpi.svg',
                        iconContentLayout: icon,
                        iconImageSize: [30, 43],
                        iconImageOffset: [-18, -50],
                        hintLayout: maps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                          `<b>${title}</b><br />` +
                          "</div>"
                        ),
                      },
                      properties: {
                        balloonContentBody: "<div class='my-balloon'>" +
                          `<b>${title}</b><br />` +
                          "</div>"
                      }
                    })
                  })
                }

                features.unshift(main);
                // features.push(_em);

                objectManager.add({
                  type: "FeatureCollection",
                  features: features
                })
              }

// adding customs
                let parkingIcon = maps.templateLayoutFactory.createClass(
                    `<div class="map__beach-parking-icon"></div>`
                  ),
                  customObjectManager = new maps.ObjectManager({
                    geoObjectOpenBalloonOnClick: true
                  });
                this.map.geoObjects.add(customObjectManager);

                for (let i = 0; i < this.mapData.length; i++) {
                  let balloonLayout = maps.templateLayoutFactory.createClass(`
                      <div class="map-popup map-popup--bottom">
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
                          <a href="${this.mapData[i].url}" class="map-popup__title">${this.mapData[i].name}</a>
                          <p>${this.mapData[i].type.NAME}</p>
                          <p>${this.mapData[i].type.DESCRIPTION}</p>
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
                      customObjectManager.objects.setObjectOptions(this.chosenObject, {
                        iconImageHref: '/pics/global/svg/beach_blue.svg',
                        iconImageOffset: [-22, -60],
                        iconImageSize: [35, 48]
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
                    iconImageSize: [27, 40]
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
            .catch(error => console.error('Failed to load Yandex Maps, ', error))
        }, 1);
      },

      onResize() {
        if (this.map)
          this.map.container.fitToViewport();
      }
    },

    async mounted() {
      // making the map
      this.initMap();

      window.addEventListener('resize', this.onResize);
    },
    created() {
      this.$bus.$on('call-balloon-weather', (id, coords) => {
        this.goto(id, coords);
      })
    }
  }
</script>
