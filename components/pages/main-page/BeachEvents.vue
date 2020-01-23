<template>
	<section class="main-page__beach-events custom-container">
		<div class="main-page__beach-events__title-area">
			<h3 class="main-page__section-title" style="margin-bottom: 0;">Ближайшие мероприятия на пляжах</h3>
			<nuxt-link to="/" class="main-page__see-all">
	          <span>Смотреть все ({{ areaData.beachNumber }})</span>
	          <img src="~/static/pics/global/svg/arrow_next.svg" alt="Перейти">
	        </nuxt-link>
		</div>
		<SliderBeachEventHotel :data="data" />
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