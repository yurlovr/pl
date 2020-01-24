<template>
	<section class="main-page__beach-slider-area custom-container">
      <h3 class="main-page__section-title" style="margin-bottom: 10px;">{{ areaData.title }}</h3>
      <div class="main-page__section-subtitle-area">
        <span class="main-page__section-subtitle">{{ areaData.subtitle }}</span>
        <nuxt-link to="/" class="main-page__section__subtitle-area__see-all">
          <span>Смотреть все ({{ areaData.beachNumber }})</span>
          <img src="~/static/pics/global/svg/arrow_next.svg" alt="Перейти">
        </nuxt-link>
      </div>
      <SliderBeachEventHotel :data="data" />
      <div class="main-page__beach-slider-area__see-all-bottom">
        <nuxt-link to="/" class="main-page__see-all">
              <span>Смотреть все ({{ areaData.beachNumber }})</span>
              <img src="~/static/pics/global/svg/arrow_next.svg" alt="Перейти">
            </nuxt-link>
      </div>
    </section>
</template>

<script>
  import SliderBeachEventHotel from '~/components/global/sliders/SliderBeachEventHotel';

  export default {
  	props: ['data', 'areaData'],

    components: {
      SliderBeachEventHotel
    }
  }
</script>