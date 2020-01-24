<template>
	<div class="slider-dynamic">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper slider-dynamic__wrapper">
				<div class="swiper-slide slider-dynamic__slide" v-for="slide in data">
					<nuxt-link :to="slide.link">
						<img :src="slide.pic" class="slider-dynamic__slide__pic">
						<h3 class="slider-dynamic__slide__title">{{ slide.title }}</h3>
						<div class="slider-dynamic__slide__beach-number-area">
							<span class="slider-dynamic__slide__beach-number">{{ slide.beachNumber }}</span>
							<span class="slider-dynamic__slide__beach">{{ (slide.beachNumber % 10 == 1 && slide.beachNumber % 100 != 11) ? 'пляж' : 'пляжей' }}</span>
						</div>
					</nuxt-link>
				</div>
				<div class="swiper-slide slider-dynamic__slide"></div>
			</div>
		</div>
		<div class="pagination-wrapper"><div class="swiper-pagination"></div></div>
		<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', top: arrowY + 'px', display: showLeft && showArrows ? '' : 'none' }" @click="mySwiper.slidePrev()">
			<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', top: arrowY + 'px', display: showRight && showArrows ? '' : 'none' }" @click="mySwiper.slideNext();">
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
					slidesPerView: 4,
					init: false,
					pagination: {
				    	el: '.swiper-pagination',
				    },
					breakpoints: {
						1000: {
							slidesPerView: 3,
							spaceBetween: 20
						},
						600: {
							slidesPerView: 2,
							spaceBetween: 10
						}
					}
				},
				arrowY: 0,
				showLeft: false,
				showRight: true,
				showArrows: true
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize);
				this.onResize();
				this.updateActiveSlide();
			});

			this.mySwiper.on('slideChange', () => {
				this.updateArrows();
				this.updateActiveSlide();
			});

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			onResize() {
				this.arrowY = this.$el.querySelector('.slider-dynamic__slide__pic').offsetHeight / 2; // this.$el means we're query selecting in this component
				this.updateActiveSlide();

				if (window.innerWidth <= 1000) {
					this.showArrows = false;
				} else {
					this.showArrows = true;
				}
			},

			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			},

			updateActiveSlide() {
				if (window.innerWidth > 1000) {
					setTimeout(() => {
						let slides = this.$el.querySelectorAll('.swiper-slide'),
							slideWidth = (this.$el.querySelector('.swiper-wrapper').offsetWidth - this.swiperOption.spaceBetween * (this.swiperOption.slidesPerView - 1)) / 4;
						for (let i = 0; i < slides.length; i++){
							slides[i].style.width = slideWidth + 'px';
						}
						this.$el.querySelector('.swiper-slide-next').style.width = this.$el.querySelector('.swiper-wrapper').offsetWidth - slideWidth * 2 - this.swiperOption.spaceBetween * 2 + 'px';
					}, 50);
				}
			}
		}
	}
</script>