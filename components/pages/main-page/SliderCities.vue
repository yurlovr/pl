<template>
	<div class="slider-cities" @mousemove="updateArrows()">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper slider-cities__wrapper">
				<div class="swiper-slide slider-cities__slide" v-for="slide in data.slideData">
					<nuxt-link to="/" class="slider__slide__link">
						<div class="slider-cities__slide__pic-area">
							<img :src="slide.pic" alt="Фото" class="slider-cities__slide__pic">
							<h4 class="slider-cities__slide__title">{{ slide.city }}</h4>
						</div>
						<div class="slider-cities__slide__info-area">
							<span class="slider-cities__slide__beach-number">{{ slide.beachNumber }}</span>
							<span class="slider-cities__slide__beach">{{ (slide.beachNumber % 10 == 1 && slide.beachNumber % 100 != 11) ? 'пляж' : 'пляжей' }}</span>
						</div>
					</nuxt-link>
				</div>
			</div>
		</div>
		<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', top: arrowY + 'px', display: showLeft ? '' : 'none' }" @click="prevSlide()">
			<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', top: arrowY + 'px', display: showRight ? '' : 'none' }" @click="nextSlide()">
			<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
		</button>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['data'],

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
					spaceBetween: 24,
					slidesPerView: 6
				},
				arrowY: 0,
				showLeft: false,
				showRight: true
			}
		},

		mounted() {
			window.addEventListener('resize', this.onResize);
			setTimeout(() => { this.onResize() }, 100);
		},

		methods: {
			onResize() {
				this.arrowY = this.$el.querySelector('.slider-cities__slide__pic').offsetHeight / 2; // this.$el means we're query selecting in this component
			},

			nextSlide() {
				this.mySwiper.slideNext();
				this.updateArrows();
			},

			prevSlide() {
				this.mySwiper.slidePrev();
				this.updateArrows();
			},

			updateArrows() {
				this.showLeft = this.mySwiper.activeIndex != 0;
				this.showRight = this.mySwiper.activeIndex != this.mySwiper.slides.length / 2;
			}
		}
	}
</script>