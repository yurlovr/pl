<template>
	<!-- map-popup can have two classes -->
	<!-- Either map-popup--top OR map-popup--bottom -->
	<!-- top add an arrow at the top and you can guess what bottom does -->
	<!-- The position must be in the data.position (top or bottom) -->
	<div class="map-popup" :class="'map-popup--' + data.position">
		<div class="map-popup__pic-area">
			<SliderMapPopup :pics="data.pics" />
		</div>
		<div class="map-popup__info-area">
			<span class="map-popup__rating">
				<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
				<span>{{ data.rating.toFixed(1) }}</span>
			</span>
			<h3 class="map-popup__title">{{ data.title }}</h3>
			<h5 class="map-popup__location">{{ data.location }}</h5>
		</div>
	</div>
</template>

<script>
	import SliderMapPopup from '~/components/global/sliders/SliderMapPopup';

	export default {
		props: ['data'],

		components: {
			SliderMapPopup
		}
	}
</script>