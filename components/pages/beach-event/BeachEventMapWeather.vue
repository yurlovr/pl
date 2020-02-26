<template>
	<div class="beach-event__map-weather">
		<div class="beach-event__map-weather__map-card">
			<div class="map"></div>
			<div class="beach-event__map-weather__map-card__button-area">
				<nuxt-link to="/" class="main-page__card__info-area__button">
					<span>Перейти на карту</span>
				</nuxt-link>
			</div>
		</div>
    <!-- <div class="beach-event__map-weather__weather-card">
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
        <div class="beach-event__map-weather__weather-card__temp-area__item">
          <div class="beach-event__map-weather__weather-card__temp-area__item__left">
            <img src="~/static/pics/global/svg/cloudy.svg">
            <span>Пасмурные<br>дни</span>
          </div>
          <div class="beach-event__map-weather__weather-card__temp-area__item__right">
            <span><span class="orange">{{ data.cloudyDays }}</span> {{ (data.cloudyDays % 10 == 1 && data.cloudyDays % 100 != 11) ? 'день' : 'дня' }}</span>
          </div>
        </div>
      </div>
    </div> -->
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
                      center: [44.50465522867475, 34.21493291965433],
                      zoom: 8,
                      controls: []
                    });
                    // console.log(this.map.controls);
                    // this.map.behaviors.disable('scrollZoom');
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
          // making the map
          this.initMap();

          window.addEventListener('resize', this.onResize);
        }
	}
</script>