<template>
	<div class="slider-cities">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper slider-cities__wrapper">
				<div class="swiper-slide slider-cities__slide" v-for="slide in data">
					<a :href="`/search?city=${slide.cityId}`" @click.prevent="searchCity(slide)" class="slider__slide__link">
						<div class="slider-cities__slide__pic-area">
							<img  v-if="slide.pic" :src="slide.pic" class="slider-cities__slide__pic">
							<img  v-if="!slide.pic" src="~/static/pics/global/pics/slider_cities_placeholder.png">
							<h4 class="slider-cities__slide__title">{{ slide.city }}</h4>
						</div>
						<div class="slider-cities__slide__info-area">
							<span class="slider-cities__slide__beach-number">{{ slide.beachNumber }}</span>
							<span class="slider-cities__slide__beach">{{ (slide.beachNumber % 10 == 1 && slide.beachNumber % 100 != 11) ? 'пляж' : 'пляжей' }}</span>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="pagination-wrapper">
			<div class="custom-pagination">
				<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.length - 1" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
			</div>
		</div>
		<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', display: showLeft && showArrows ? '' : 'none' }" @click="mySwiper.slidePrev()">
			<img  src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', display: showRight && showArrows ? '' : 'none' }" @click="mySwiper.slideNext();">
			<img  src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
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
					slidesPerView: 6,
					init: false,
					breakpoints: {
						1350: {
							slidesPerView: 5,
						},
						1150: {
							slidesPerView: 4,
							spaceBetween: 10
						},
						750: {
							slidesPerView: 3,
							spaceBetween: 10
						},
						580: {
							slidesPerView: 2,
							spaceBetween: 10
						}
					}
				},
				showLeft: false,
				showRight: false,
				showArrows: true,
				activeIndex: 0
			}
		},

		mounted() {
			if (this.data) {
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
			}
		},

		methods: {
			onResize() {
				if (window.innerWidth < 1150) {
					this.showArrows = false;
				} else {
					this.showArrows = true;
				}
			},

			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			},

		    searchCity(data) {
		      this.$bus.$emit('emptySearchParams');
		      this.$bus.$emit('updateSearchParam', { param: 'cities', value: { title: data.city, id: data.cityId }});
		      setTimeout(() => {this.$bus.$emit('search')}, 1);
		    }
		}
	}
</script>
