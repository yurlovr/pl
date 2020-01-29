<template>
	<section class="main-page__weather-slider-area custom-container">
		<h3 class="main-page__section-title" style="margin-bottom: 50px;">Погода в курортных городах Крыма</h3>
		<div class="slider-weather">
		<!-- <div class="slider-weather__months" v-show="!mobileMonthSlider">
			<button class="slider-weather__month" v-for="(month, i) in months" :key="i" :class="{ active : i == activeMonth }" @click="activeMonth = i">
				<span>{{ month }}</span>
			</button>
		</div> -->
		<div class="slider-weather__months">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(month, i) in months">
						<button class="slider-weather__month":class="{ active : i == activeMonth }" @click="activeMonth = i">
							<span>{{ month }}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="slider-weather__parts">
			<div class="slider-weather__part-left">
				<div class="slider-weather__part__info slider-weather__part__temperature-text">
					<img src="~/static/pics/main/temp_air.svg">
					<span>Температура воздуха</span>
				</div>
				<div class="slider-weather__part__info slider-weather__part__temperature-text">
					<img src="~/static/pics/main/temp_water.svg">
					<span>Температура воды</span>
				</div>
				<div class="slider-weather__part-left__cover"></div>
			</div>
			<div class="slider-weather__part-right">
				<SliderWeather :slideData="slideData" v-for="(slideData, monthIndex) in data" :key="monthIndex" v-show="monthIndex == activeMonth || activeMonth == -1" />
			</div>
		</div>
	</div>
	</section>
</template>

<script>
	import Vue from 'vue';
	import SliderWeather from '~/components/pages/main-page/sliders/SliderWeather';

	export default {
		props: ['data'],

		components: {
			SliderWeather
		},

		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		data() {
			return {
				// mobileMonthSlider: false,
				activeMonth: -1,
				months: [
					'январь',
					'февраль',
					'март',
					'апрель',
					'май',
					'июнь',
					'июль',
					'август',
					'сентябрь',
					'октябрь',
					'ноябрь',
					'декабрь'
				],
				swiperOption: {
					freeMode: true,
					spaceBetween: 0,
					slidesPerView: 12,
					init: false,
					breakpoints: {
						1301: {
							slidesPerView: 'auto'
						}
					}
				}
			}
		},

		mounted() {
			this.activeMonth = new Date().getMonth();

			// window.addEventListener('resize', this.onResize);
			// this.onResize();

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			onResize() {
				// if (window.innerWidth < 1320) {
				// 	this.mobileMonthSlider = true;
				// } else {
				// 	this.mobileMonthSlider = false;
				// }
			}
		}
	}
</script>