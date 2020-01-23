<template>
	<div>
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide slider-weather__slide" v-for="(slide, key) in slideData" :key="key">
					<div class="slider-weather__slide__pic-area">
						<img :src="slide.pic" alt="Фото" class="slider-weather__slide__pic">
						<h4 class="slider-weather__slide__title">{{ slide.city }}</h4>
					</div>
					<div class="slider-weather__slide__info-area">
						<div class="slider-weather__slide__air-temp slider-weather__part__info">
							<span class="slider-weather__slide__temp-number">{{ (slide.airTemperature > 0 ? '+ ' : '') + (slide.airTemperature < 0 ? '- ' : '') + slide.airTemperature }}</span>
							<span class="slider-weather__slide__temp-o"><span>o</span></span>
							<span class="slider-weather__slide__temp-C">C</span>
						</div>
						<div class="slider-weather__slide__water-temp slider-weather__part__info">
							<span class="slider-weather__slide__temp-number">{{ (slide.waterTemperature > 0 ? '+ ' : '') + (slide.waterTemperature < 0 ? '- ' : '') + slide.waterTemperature }}</span>
							<span class="slider-weather__slide__temp-o"><span>o</span></span>
							<span class="slider-weather__slide__temp-C">C</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', top: arrowY + 'px', display: showLeft ? '' : 'none' }" @click="mySwiper.slidePrev()">
			<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', top: arrowY + 'px', display: showRight ? '' : 'none' }" @click="mySwiper.slideNext();">
			<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
		</button>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['slideData', 'slideNumber'],

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
					slidesPerView: 7,
					init: false,
					breakpoints: {
						1200: {
							slidesPerView: 6
						},
						1050: {
							slidesPerView: 'auto',
							spaceBetween: 36
						}
					}
				},
				arrowY: 0,
				showLeft: false,
				showRight: true
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize);
				this.onResize();
			});

			this.mySwiper.on('slideChange', () => {
				this.updateArrows();
			});

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			onResize() {
				let imgs = this.$el.querySelectorAll('.slider-weather__slide__pic'); // this.$el means we're query selecting in this component
				for (let i = 0; i < imgs.length; i++) {
					if (imgs[i].offsetHeight > 0) {
						this.arrowY = imgs[i].offsetHeight / 2;
						break;
					}
				}
			},

			updateArrows() {
				this.showLeft = this.mySwiper.activeIndex != 0;
				this.showRight = this.mySwiper.activeIndex != Math.floor(this.mySwiper.slides.length / 2);
			}
		}
	}
</script>