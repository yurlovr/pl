<template>
	<div class="slider-beh">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<Card v-for="(slide, i) in data.cardData" :data="slide" :key="i" class="swiper-slide" />
			</div>
		</div>
		<div class="pagination-wrapper">
			<div class="custom-pagination">
				<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.cardData.length - 1" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
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
	import Card from '~/components/global/Card';

	export default {
		props: ['data'],

		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		components: {
	  		Card
		},

		data() {
			return {
				swiperOption: {
					spaceBetween: 24,
					slidesPerView: this.data.slideNumber,
					init: false,
					breakpoints: {
						1150: {
							slidesPerView: 5,
							spaceBetween: 20
						},
						1000: {
							slidesPerView: 4
						},
						700: {
							slidesPerView: 3
						},
						550: {
							slidesPerView: 2,
							spaceBetween: 10
						}
					}
				},
				arrowY: 0,
				showLeft: false,
				showRight: true,
				showArrows: this.data.showArrows,
				activeIndex: 0
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
		},

		methods: {
			onResize() {
				this.arrowY = this.$el.querySelector('.custom-card__pic').offsetHeight / 2; // this.$el means we're query selecting in this component

				if (window.innerWidth < 1150) {
					this.showArrows = false;
				} else {
					if (this.data.showArrows)
						this.showArrows = true;
				}
			},

			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			}
		}
	}
</script>
