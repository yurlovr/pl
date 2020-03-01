<template>
	<section class="main-page__beach-slider-area custom-container">
      <h3 class="main-page__section-title" style="margin-bottom: 10px;">{{ data.title }}</h3>
      <div class="main-page__section-subtitle-area">
        <span class="main-page__section-subtitle">{{ data.subtitle }}</span>
        <nuxt-link to="/" class="main-page__section__subtitle-area__see-all">
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </nuxt-link>
      </div>
      <SliderBeachEventHotel :data="data.beachSliderData" />
      <div class="main-page__beach-slider-area__see-all-bottom">
        <nuxt-link to="/" class="main-page__see-all">
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </nuxt-link>
      </div>
    </section>
</template>

<script>
  import SliderBeachEventHotel from '~/components/global/sliders/SliderBeachEventHotel';

  export default {
  	props: ['data'],

    components: {
      SliderBeachEventHotel
    }
  }
</script>