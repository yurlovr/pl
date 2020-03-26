<template>
  <div class="beach-event__map-weather">
    <div class="beach-event__map-weather__map-card">
      <div class="map"></div>
      <div class="beach-event__map-weather__map-card__button-area" v-if="data.pos">
        <a target="_blank" :href="`https://yandex.ru/maps/?pt=${data.pos[1]}%2C${data.pos[0]}&z=18`" class="banner__card__info-area__button">
          <span>Перейти на карту</span>
        </a>
      </div>
    </div>
    <div class="beach-event__map-weather__weather-card">
      <div class="beach-event__map-weather__weather-card__date">
        <img src="~/static/pics/global/svg/calendar_big.svg">
        <span>{{ data.date }}</span>
      </div>
      <h3 class="beach-event__map-weather__weather-card__title">{{ data.title }}</h3>
      <div class="h-line"></div>
      <div class="beach-event__map-weather__weather-card__temp-area">
        <div class="beach-event__map-weather__weather-card__temp-area__item">
          <div class="beach-event__map-weather__weather-card__temp-area__item__left">
            <img src="~/static/pics/global/svg/temp_air.svg">
            <span>Температура<br>воздуха</span>
          </div>
          <div class="beach-event__map-weather__weather-card__temp-area__item__right">
            <span class="slider-weather__slide__temp-number">{{ (data.airTemp > 0 ? '+ ' : '') + (data.airTemp < 0 ? '- ' : '') + data.airTemp }}</span>
            <span class="slider-weather__slide__temp-o beach-event__map-weather__weather-card__temp-area__temp-o"><span>o</span></span>
            <span class="slider-weather__slide__temp-C beach-event__map-weather__weather-card__temp-area__temp-C">C</span>
          </div>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item">
          <div class="beach-event__map-weather__weather-card__temp-area__item__left">
            <img src="~/static/pics/global/svg/temp_water.svg">
            <span>Температура<br>воды</span>
          </div>
          <div class="beach-event__map-weather__weather-card__temp-area__item__right">
            <span class="slider-weather__slide__temp-number beach-event__map-weather__weather-card__temp-area__temp-number">{{ (data.waterTemp > 0 ? '+ ' : '') + (data.waterTemp < 0 ? '- ' : '') + data.waterTemp }}</span>
            <span class="slider-weather__slide__temp-o beach-event__map-weather__weather-card__temp-area__temp-o"><span>o</span></span>
            <span class="slider-weather__slide__temp-C beach-event__map-weather__weather-card__temp-area__temp-C">C</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ymaps from "ymaps";

export default {
  props: ['data'],

  data() {
    return {
      map: null
    }
  },

  methods: {
    initMap() {
      setTimeout(() => {
        ymaps
          .load()
          .then(maps => {
            this.map = new maps.Map(this.$el.getElementsByClassName('map')[0], {
              center: this.data.pos || [44.50465522867475, 34.21493291965433],
              zoom: this.data.pos ? 18 : 8,
              controls: []
            });

            if (this.data.pos) {
              this.map.behaviors.disable('drag');

              let icon = maps.templateLayoutFactory.createClass(
                  `<div class="map__beach-icon">
                    <div class="map__beach-caption">${this.data.title}</div>
                  </div>`
                ),
                objectManager = new maps.ObjectManager({
                  geoObjectOpenBalloonOnClick: false
                });
              this.map.geoObjects.add(objectManager);

              objectManager.add({
                type: "FeatureCollection",
                features: [{
                  type: "Feature",
                  id: 0,
                  geometry: {
                    type: "Point",
                    coordinates: this.data.pos
                  },
                  options: {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '/pics/global/svg/map_beach_blue.svg',
                    iconContentLayout: icon,
                    iconImageSize: [30, 43],
                    iconImageOffset: [-18, -50]
                  }
                }]
              });
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

  async mounted() {
    // making the map
    this.initMap();

    window.addEventListener('resize', this.onResize);
  }
}
</script>
