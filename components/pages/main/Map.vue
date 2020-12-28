<template>
  <section class="main-page__map">
    <button
      v-show="step === 2"
      id="go-to-step-1-button"
      class="main-page__map__return"
    >
      <img
        src="~/static/pics/global/svg/arrow_prev_orange.svg"
        alt="Назад"
      >
    </button>
    <div class="map__zoom-wrapper">
      <button class="map__zoom map__zoom-plus">
        <img src="~/static/pics/global/svg/plus.svg">
      </button>
      <button class="map__zoom map__zoom-minus">
        <img src="~/static/pics/global/svg/minus.svg">
      </button>
    </div>
    <div
      id="map"
      class="map"
    />
  </section>
</template>

<script>
import ymaps from 'ymaps';

export default {
  props: ['data', 'mapData'],

  data() {
    return {
      zoom: 8,
      chosen: -1,
      curSwiper: null,
      map: null,
      step: 1,
      chosenObject: -1,
    };
  },

  async mounted() {
    // TODO use ssr swiper version instead
    // requiring the Swiper
    require('~/plugins/swiper.min').__proto__;
    // making the map
    this.initMap();

    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  methods: {
    initMap() {
      setTimeout(() => {
        ymaps
          .load()
          .then((maps) => {
            this.map = new maps.Map(document.getElementById('map'), {
              center: this.data.center[0],
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

            // markers
            const iconStep1 = maps.templateLayoutFactory.createClass(
              '<div class="map__circle-orange step-1"><span>$[properties.iconContent]</span></div>',
            );
            const iconStep2 = maps.templateLayoutFactory.createClass(
              '<div class="map__beach-icon step-2"></div>',
            );
            const parkingIcon = maps.templateLayoutFactory.createClass(
              '<div class="map__beach-parking-icon"></div>',
            );

            let step1CounterForChosen = 0; let step2CounterForChosen = 0; let balloonLayout;
            const step1ObjectManager = new maps.ObjectManager({
              geoObjectOpenBalloonOnClick: false,
            });
            const step2ObjectManager = new maps.ObjectManager({
              geoObjectOpenBalloonOnClick: true,
            });
            const customObjectManager = new maps.ObjectManager({
              geoObjectOpenBalloonOnClick: true,
            });
            this.map.geoObjects.add(step1ObjectManager);
            this.map.geoObjects.add(step2ObjectManager);
            this.map.geoObjects.add(customObjectManager);

            const closeBalloon = () => {
              step2ObjectManager.objects.setObjectOptions(this.chosen, {
                iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
              });
              customObjectManager.objects.setObjectOptions(this.chosenObject, {
                iconImageHref: '/pics/global/svg/beach_blue.svg',
                iconImageOffset: [-18, -50],
                iconImageSize: [27, 40],
              });
              this.chosenObject = -1;
              this.chosen = -1;
              this.map.balloon.close();
              this.$bus.$emit('releaseSelection');
            };

            const goToStep2 = (id) => {
              this.$bus.$emit('changeStep', 2);
              step1ObjectManager.setFilter('id < 0'); // hide step-1 markers
              // show step-2 markers
              this.zoom = 12;
              this.map.setCenter(this.data.addressBeaches[id].clusterCenter, this.zoom);
              // setTimeout(this.onResize, 100);
              step2ObjectManager.setFilter('');
              this.step = 2;
            };

            // going to step 2
            const onStep1ObjectEvent = (e) => {
              const objectId = e.get('objectId');
              if (e.get('type') == 'click') {
                goToStep2(objectId);
              }
            };

            const onStep2ObjectEvent = (e) => {
              const objectId = e.get('objectId');
              if (e.get('type') == 'mouseenter') {
                // The setObjectOptions method allows you to set object options "on the fly".
                step2ObjectManager.objects.setObjectOptions(objectId, {
                  iconImageHref: '/pics/global/svg/pin_active.svg',
                });
              } else if (e.get('type') == 'mouseleave') {
                if (objectId != this.chosen) {
                  step2ObjectManager.objects.setObjectOptions(objectId, {
                    iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
                  });
                }
              } else if (e.get('type') == 'click') {
                // open the balloon
                if (this.chosen != objectId) {
                  if (this.chosen != -1) {
                    step2ObjectManager.objects.setObjectOptions(this.chosen, {
                      iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
                    });
                  }
                  this.chosen = objectId;
                  step2ObjectManager.objects.setObjectOptions(this.chosen, {
                    iconImageHref: '/pics/global/svg/pin_active.svg',
                  });
                  this.$bus.$emit('goToCard', this.chosen);
                  // close the balloon
                } else {
                  closeBalloon();
                }
              }
            };

            step1ObjectManager.objects.events.add(['click'], onStep1ObjectEvent);
            step2ObjectManager.setFilter('id < 0'); // hide step-2 markers
            step2ObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], onStep2ObjectEvent);

            // step 1 markers
            for (let i = 0; i < this.data.addressBeaches.length; i++) {
              step1ObjectManager.add({
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  id: step1CounterForChosen,
                  geometry: {
                    type: 'Point',
                    coordinates: this.data.addressBeaches[i].clusterCenter,
                  },
                  properties: {
                    iconContent: this.data.addressBeaches[i].beaches.length,
                  },
                  options: {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [50, 50],
                    iconImageOffset: [-25, -25],
                    iconContentLayout: iconStep1,
                  },
                }],
              });

              step1CounterForChosen++;

              // step 2 markers
              for (let j = 0; j < this.data.addressBeaches[i].beaches.length; j++) {
                // adding the balloon
                const slides = [];
                const { pics } = this.data.addressBeaches[i].beaches[j];

                if (pics && pics.length) {
                  for (let k = 0; k < this.data.addressBeaches[i].beaches[j].pics.length; k++) {
                    slides.push(`
                                        <div class="swiper-slide map-popup__slide">
                                            <img  src="${this.data.addressBeaches[i].beaches[j].pics[k]}">
                                        </div>
                                    `);
                  }
                }

                balloonLayout = maps.templateLayoutFactory.createClass(`
                                    <div class="map-popup map-popup--bottom">
                                        <div class="map-popup__pic-area">
                                            <div class="map-popup__slider">
                                                <div class="swiper-container" id="balloon-swiper">
                                                    <div class="swiper-wrapper">
                                                        ${slides.join('')}
                                                    </div>
                                                </div>
                                                <div class="pagination-wrapper"><div class="swiper-pagination"></div></div>
                                                <button class="slider__arrow-left slider__arrow-left-balloon">
                                                    <img  src="/pics/global/svg/arrow_next_map.svg" alt="Налево">
                                                </button>
                                                <button class="slider__arrow-right slider__arrow-right-balloon">
                                                    <img  src="/pics/global/svg/arrow_next_map.svg" alt="Направо">
                                                </button>
                                            </div>
                                        </div>
                                        <div class="map-popup__info-area">
                                            <span class="map-popup__rating">
                                                <img src="/pics/global/svg/star.svg" alt="Рейтинг">
                                                <span>${this.data.addressBeaches[i].beaches[j].rating.toFixed(1)}</span>
                                            </span>
                                            <a href="/beach/${this.data.addressBeaches[i].beaches[j].humanLink || this.data.addressBeaches[i].beaches[j].beachId}" class="map-popup__title">${this.data.addressBeaches[i].beaches[j].title}</a>
                                            <h5 class="map-popup__location">${this.data.addressBeaches[i].beaches[j].location}</h5>
                                        </div>
                                    </div>
                                `, {
                  build() {
                    this.constructor.superclass.build.call(this);

                    // init the swiper
                    this.swiper = new Swiper('#balloon-swiper', {
                      slidePerView: 1,
                      spaceBetween: 20,
                      pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                      },
                    });

                    // init the arrows
                    document.querySelector('.slider__arrow-left-balloon').addEventListener('click', () => this.swiper.slidePrev());
                    document.querySelector('.slider__arrow-right-balloon').addEventListener('click', () => this.swiper.slideNext());
                  },

                  clear() {
                    this.swiper && this.swiper.destroy && this.swiper.destroy(false, false);
                    // TODO И как с этим быть?
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

                step2ObjectManager.add({
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    id: step2CounterForChosen,
                    geometry: {
                      type: 'Point',
                      coordinates: this.data.addressBeaches[i].beaches[j].pos,
                    },
                    options: {
                      iconLayout: 'default#imageWithContent',
                      iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
                      iconContentLayout: iconStep2,
                      iconImageSize: [40, 53],
                      iconImageOffset: [-18, -50],
                      hideIconOnBalloonOpen: false,
                      balloonShadow: false,
                      balloonLayout,
                      balloonContentLayout: '',
                      balloonOffset: [-151, -345],
                      balloonPane: 'balloon',
                      balloonAutoPan: true,
                      balloonPanelMaxMapArea: 0,
                    },
                  }],
                });

                step2CounterForChosen++;
              }
            }

            // adding customs

            for (let i = 0; i < this.mapData.length; i++) {
              balloonLayout = maps.templateLayoutFactory.createClass(`
                            <div class="map-popup map-popup--bottom">
                              <a target="_blank" href="${this.mapData[i].url}" style="color: #393e48">
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
                                    ${this.mapData[i].description || ''}
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
            const customObjectEvent = (e) => {
              const objectId = e.get('objectId');
              if (e.get('type') === 'mouseenter') {
                if (objectId !== this.chosenObject) {
                  customObjectManager.objects.setObjectOptions(objectId, {
                    iconImageHref: '/pics/global/svg/beach_blue.svg',
                    iconImageOffset: [-22, -60],
                    iconImageSize: [35, 48],
                  });
                }
              } else if (e.get('type') === 'mouseleave') {
                if (objectId !== this.chosenObject) {
                  customObjectManager.objects.setObjectOptions(objectId, {
                    iconImageHref: '/pics/global/svg/beach_blue.svg',
                    iconImageOffset: [-18, -50],
                    iconImageSize: [27, 40],
                  });
                }
              } else if (e.get('type') === 'click') {
                // open the balloon
                if (this.chosenObject !== objectId) {
                  if (this.chosenObject !== -1) {
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

            if (this.data.geo) {
              goToStep2(this.data.geo.id);
            }

            document.getElementById('go-to-step-1-button').addEventListener('click', () => {
              this.zoom = 8;
              this.map.setZoom(this.zoom);
              step1ObjectManager.setFilter(''); // show step-1 markers
              step2ObjectManager.setFilter('id < 0'); // hide step-2 markers
              this.$bus.$emit('changeStep', 1);
              this.step = 1;
              setTimeout(() => this.onResize(), 1);
              step2ObjectManager.objects.setObjectOptions(this.chosen, {
                iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
              });
              this.chosen = -1;
              this.swiper && this.swiper.destroy && this.swiper.destroy(false, false);
              this.map.balloon.close();
            });

            // closing balloon on map click
            this.map.events.add('click', (e) => {
              if (e.get('target') === this.map) {
                closeBalloon();
              }
            });
            this.$emit('map-loaded');
          })
          .catch((error) => console.error('Yandex Maps ERROR:', error));
      }, 1);
    },

    onResize() {
      if (this.map) this.map.container.fitToViewport();
    },
  },
};
</script>
