<template>
	<div class="map-popup__slider">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide map-popup__slide" v-for="pic in pics">
					<img :data-src="pic" v-lazy-load>
				</div>
			</div>
		</div>
		<div class="pagination-wrapper"><div class="swiper-pagination"></div></div>
		<button class="slider__arrow-left" @click="mySwiper.slidePrev()">
			<img src="~/static/pics/global/svg/arrow_next_map.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" @click="mySwiper.slideNext();">
			<img src="~/static/pics/global/svg/arrow_next_map.svg" alt="Направо">
		</button>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['pics'],

		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		data() {
			return {
				swiperOption: {
					slidesPerView: 1,
					init: false,
					pagination: {
				    	el: '.swiper-pagination',
				    }
				},
			}
		},

		mounted() {
			this.mySwiper.init(this.swiperOption);
		}
	}
</script>
