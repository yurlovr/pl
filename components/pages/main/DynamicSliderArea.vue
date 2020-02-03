<template>
	<section class="main-page__dynamic-slider-area custom-container">
		<h3 class="main-page__section-title" style="margin-bottom: 10px;">Активный отдых</h3>
		<span class="main-page__section-subtitle">Наша подборка основанная на водных активностях</span>
		<SliderDynamic :data="data" />
	</section>
</template>

<script>
	import SliderDynamic from '~/components/pages/main/sliders/SliderDynamic';

	export default {
		props: ['data'],

		components: {
			SliderDynamic
		}
	}
</script>