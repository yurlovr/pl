<template>
	<div class="slider-beh">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide slider-beh__slide" v-for="slide in data.slideData">
					<nuxt-link to="/" class="slider__slide__link">
						<div class="slider-beh__slide__pic-area">
							<img :src="slide.pic" alt="Фото" class="slider-beh__slide__pic">
							<div class="slider-beh__slide__temp-area" v-if="slide.temperature">
								<img src="~/static/pics/global/svg/temper_big.svg" alt="Температура">
								<span class="slider-beh__slide__temp">{{ (slide.temperature > 0 ? '+ ' : '') + (slide.temperature < 0 ? '- ' : '') + slide.temperature }}</span>
								<span class="slider-beh__slide__temp-o"><span>o</span></span>
								<span class="slider-beh__slide__temp-C">C</span>
							</div>
							<button class="slider-beh__slide__heart-button" @click.prevent v-if="slide.favorite == false || slide.favorite == true">
								<img src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" class="slider-beh__slide__heart">
							</button>
							<img class="slider-beh__slide__expensive" v-if="slide.expensive" src="~/static/pics/global/svg/expensive.svg" alt="Дорого">
						</div>
					</nuxt-link>
					<div class="slider-beh__slide__info-area">
						<div class="slider-beh__slide__rating-area" v-if="slide.rating">
							<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
							<span>{{ slide.rating.toFixed(1) }}</span>
						</div>
						<div class="slider-beh__slide__date-area" v-if="slide.date">
							<img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
							<span>{{ slide.date }}</span>
						</div>
						<nuxt-link to="/" class="slider-beh__slide__title" :style="{ 'font-size': slide.beach ? '18px' : '20px' }">{{ slide.title }}</nuxt-link>
						<nuxt-link :to="slide.beachLink" class="slider-beh__slide__beach" v-if="slide.beach">{{ slide.beach }}</nuxt-link>
						<h6 class="slider-beh__slide__location" :style="{ 'font-size': slide.beach ? '10px' : '12px' }">{{ slide.location }}</h6>
						<nuxt-link :to="slide.priceLink" class="slider-beh__slide__price" :style="{ 'font-size': slide.beach ? '10px' : '12px' }" v-if="slide.price">от {{ slide.price }} ₽/сутки</nuxt-link>
					</div>
				</div>
			</div>
		</div>
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
					slidesPerView: this.data.slideNumber,
					init: false,
					breakpoints: {
						1150: {
							slidesPerView: 4,
							spaceBetween: 20
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
			});

			this.mySwiper.on('slideChange', () => {
				this.updateArrows();
			});

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			onResize() {
				this.arrowY = this.$el.querySelector('.slider-beh__slide__pic').offsetHeight / 2; // this.$el means we're query selecting in this component

				if (window.innerWidth < 1150) {
					this.showArrows = false;
				} else {
					this.showArrows = true;
				}
			},

			updateArrows() {
				this.showLeft = this.mySwiper.activeIndex != 0;
				this.showRight = this.mySwiper.activeIndex != Math.floor(this.mySwiper.slides.length / 2);
			}
		}
	}
</script>
