<template>
	<a :href="slide.link" @click.prevent="$bus.goTo(slide.link, $router)">
		<img v-show="picLoaded" :src="slide.pic" class="slider-dynamic__slide__pic" @load="picLoaded = true">
		<img v-show="!picLoaded" src="~/static/pics/global/pics/dynamic_slide_placeholder.png" class="slider-dynamic__slide__pic">
		<h3 class="slider-dynamic__slide__title">{{ slide.title }}</h3>
		<div class="slider-dynamic__slide__beach-number-area">
			<span class="slider-dynamic__slide__beach-number">{{ slide.beachNumber }}</span>
			<span class="slider-dynamic__slide__beach">{{ (slide.beachNumber % 10 == 1 && slide.beachNumber % 100 != 11) ? 'пляж' : 'пляжей' }}</span>
		</div>
	</a>
</template>

<script>
	export default {
		props: ['slide'],

		data() {
			return {
				picLoaded: false
			}
		}
	}
</script>