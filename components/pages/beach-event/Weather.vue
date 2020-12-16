<template>
  <div class="beach-event__map-weather__weather-card">
    <div class="beach-event__map-weather__weather-card__date">
      <img src="~/static/pics/global/svg/calendar_big.svg">
      <span>
        {{ weather.date }}
      </span>
    </div>
    <!-- <h3
      v-if="locationData"
      class="beach-event__map-weather__weather-card__title"
      v-html="locationData.location"
    /> -->
    <div class="h-line" />
    <div class="beach-event__map-weather__weather-card__temp-area">
      <div class="beach-event__map-weather__weather-card__temp-area__item">
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/temp_air.svg">
          <span>Температура<br>воздуха</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span class="slider-weather__slide__temp-number">
            {{ `${weather.airTemp > 0 ? '+ ' : '- '} ${weather.airTemp}` }}
          </span>
          <span
            class="slider-weather__slide__temp-o
            beach-event__map-weather__weather-card__temp-area__temp-o"
          >
            <span>o</span>
          </span>
          <span
            class="slider-weather__slide__temp-C
            beach-event__map-weather__weather-card__temp-area__temp-C"
          >C</span>
        </div>
      </div>
      <div class="beach-event__map-weather__weather-card__temp-area__item">
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/temp_water.svg">
          <span>Температура<br>воды</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span
            class="slider-weather__slide__temp-number
            beach-event__map-weather__weather-card__temp-area__temp-number"
          >
            {{ `${weather.waterTemp > 0 ? '+ ' : '- '} ${weather.waterTemp}` }}
          </span>
          <span
            class="slider-weather__slide__temp-o
            beach-event__map-weather__weather-card__temp-area__temp-o"
          >
            <span>o</span>
          </span>
          <span
            class="slider-weather__slide__temp-C
            beach-event__map-weather__weather-card__temp-area__temp-C"
          >
            C
          </span>
        </div>
      </div>
      <div
        v-if="weather.precipitation"
        class="beach-event__map-weather__weather-card__temp-area__item"
      >
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/cloudy-day.svg">
          <span>Пасмурные<br>дни</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span
            class="slider-weather__slide__temp-C
            beach-event__map-weather__weather-card__temp-area__temp-C"
          >
            {{ precipitationText(weather.precipitation) }}
          </span>
        </div>
      </div>
      <div
        v-if="weather.windSpeed"
        class="beach-event__map-weather__weather-card__temp-area__item"
      >
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/wind-speed.svg">
          <span>Скорость<br>ветра</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span
            class="slider-weather__slide__temp-number
            beach-event__map-weather__weather-card__temp-area__temp-number"
          >
            {{ weather.windSpeed }}&nbsp;
          </span>
          <span
            class="slider-weather__slide__temp-C
            beach-event__map-weather__weather-card__temp-area__temp-C"
          >
            м/с
          </span>
        </div>
      </div>
      <div class="beach-event__map-weather__weather-card__temp-area__item">
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/precipitation-type.svg">
          <span>Тип<br>осадков</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span
            class="slider-weather__slide__temp-C
            beach-event__map-weather__weather-card__temp-area__temp-C"
          >
            {{ precipitationText(weather.precipitation) }}
          </span>
        </div>
      </div>
      <div
        v-if="weather.humidity"
        class="beach-event__map-weather__weather-card__temp-area__item"
      >
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/wet.svg">
          <span>Влажность<br>воздуха</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span
            class="slider-weather__slide__temp-number
            beach-event__map-weather__weather-card__temp-area__temp-number">
            {{ weather.humidity }}
          </span>
          <span
            class="slider-weather__slide__temp-C
            beach-event__map-weather__weather-card__temp-area__temp-C"
          >
            %
          </span>
        </div>
      </div>
      <div class="beach-event__map-weather__weather-card__temp-area__item">
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/sunrise-weather.svg">
          <span>Время<br>рассвета</span>
        </div>
        <div class="beach-event__map-weather__weather-card__temp-area__item__right">
          <span
            class="slider-weather__slide__temp-number
            beach-event__map-weather__weather-card__temp-area__temp-number"
          >
            {{ weather.sunriseTime }}
          </span>
        </div>
      </div>
      <div class="beach-event__map-weather__weather-card__temp-area__item">
        <div class="beach-event__map-weather__weather-card__temp-area__item__left">
          <img src="~/static/pics/global/svg/sunset-weather.svg">
          <span>Время<br>заката</span>
        </div>
        <div
          class="beach-event__map-weather__weather-card__temp-area__item__right"
        >
          <span
            class="slider-weather__slide__temp-number
            beach-event__map-weather__weather-card__temp-area__temp-number"
          >
            {{ weather.sunsetTime }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  methods: {
    precipitationText(type) {
      switch (type) {
        case 0:
          return 'Без осадков';
        case 0.25:
          return 'Слабый дождь/снег';
        case 0.5:
          return 'Дождь/снег';
        case 0.75:
          return 'Сильный дождь/снег';
        default: return '';
      }
    },
  },
};
</script>

<style>

</style>
