<template>
	<section class="main-page__beach-events custom-container">
		<div class="main-page__beach-events__title-area">
			<h3 class="main-page__section-title" style="margin-bottom: 0;">{{ data.title }}</h3>
			<nuxt-link to="/" class="main-page__see-all main-page__beach-events__see-all-top"  v-if="areaData">
	          <span>Смотреть все ({{ data.beachNumber }})</span>
	        </nuxt-link>
		</div>
		<SliderBeachEventHotel :data="data.beachSliderData" />
		<div class="main-page__beach-events__see-all-bottom" v-if="data.beachNumber">
			<nuxt-link to="/" class="main-page__see-all">
	          <span>Смотреть все ({{ data.beachNumber }})</span>
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