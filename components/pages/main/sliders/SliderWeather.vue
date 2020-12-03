<template>
	<div>
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide slider-weather__slide" v-for="(slide, key) in slideData" :key="key">
					<div class="slider-weather__slide__pic-area">
						<img v-lazy-load :data-src="slide.pic ? slide.pic : '/pics/global/pics/weather_placeholder.png'" alt="Фото" class="slider-weather__slide__pic">
            <div class="slide-placeholder slide-placeholder--weather" >
              <span class="slide-placeholder__text">загрузка изображения</span>
            </div>
            <div class="slider-weather__slide__title-area">
							<h4 class="slider-weather__slide__title">{{ slide.city.slice(0, maxCharsInCityName) + (slide.city.length > maxCharsInCityName ? '...' : '') }}</h4>
							<div class="slider-weather__slide__title__tooltip" v-if="slide.city.length > maxCharsInCityName">
								<span>{{ slide.city }}</span>
							</div>
						</div>
					</div>
					<div class="slider-weather__slide__info-area">
						<div class="slider-weather__slide__temp slider-weather__part__info">
							<span class="slider-weather__slide__temp-number">{{ (slide.airTemperature > 0 ? '+ ' : '') + slide.airTemperature }}</span>
							<span class="slider-weather__slide__temp-o"><span>o</span></span>
							<span class="slider-weather__slide__temp-C">C</span>
						</div>
						<div class="slider-weather__slide__temp slider-weather__part__info">
							<span class="slider-weather__slide__temp-number">{{ (slide.waterTemperature > 0 ? '+ ' : '') + slide.waterTemperature }}</span>
							<span class="slider-weather__slide__temp-o"><span>o</span></span>
							<span class="slider-weather__slide__temp-C">C</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pagination-wrapper">
			<div class="custom-pagination">
				<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in slideData.length - minus" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
			</div>
		</div>
		<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', display: showLeft ? '' : 'none' }" @click="!mySwiper.isBeginning ? mySwiper.slidePrev() : ''">
			<img  src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', display: showRight ? '' : 'none' }" @click="!mySwiper.isEnd ? mySwiper.slideNext() : ''">
			<img  src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
		</button>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['slideData'],

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
					spaceBetween: 50,
					slidesPerView: 6,
					observer: true,
					observeParents: true,
					init: false,
					breakpoints: {
						900: {
              spaceBetween: 50,
							slidesPerView: 5
						},
						780: {
              spaceBetween: 70,
							slidesPerView: 4
						},
						660: {
							slidesPerView: 3
						},
						540: {
							spaceBetween: 110,
							slidesPerView: 2
						},
						500: {
							spaceBetween: 50,
							slidesPerView: 3
						},
						440: {
							spaceBetween: 100,
							slidesPerView: 2
						},
						400: {
							spaceBetween: 70,
							slidesPerView: 2
						},
						350: {
							spaceBetween: 50,
							slidesPerView: 2
						}
					}
				},
				showLeft: false,
				showRight: true,
				activeIndex: 0,
				minus: 2,
				maxCharsInCityName: 12
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize);
				this.onResize();
			});

			this.mySwiper.on('slideChange', () => {
				this.updateArrows();
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.mySwiper.init(this.swiperOption);
			this.updateArrows();
		},

		methods: {
			onResize() {
				if (window.innerWidth <= 440)
					this.minus = 1;
				else this.minus = 2;
			},

			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			}
		}
	}
</script>
