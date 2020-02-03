<template>
		<div class="map-popup-text" :class="'map-popup--' + data.position">
			<h3 class="map-popup-text__title">{{ data.title }}</h3>
			<span class="map-popup-text__subtitle">{{ data.subtitle }}</span>
			<span class="map-popup-text__work-time">{{ data.workTime }}</span>
			<span class="map-popup-text__address">{{ data.address }}</span>
			<span class="map-popup-text__price">{{ data.price }}</span>
		</div>
</template>

<script>
	export default {
		props: ['data']
	}
</script>