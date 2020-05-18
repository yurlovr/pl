<template>
	<div class="slider__beach-bars-n-restos">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(pic, i) in data" :key="i">
					<img v-lazy-load :src="pic">
				</div>
			</div>
		</div>
		<div class="pagination-wrapper">
			<div class="custom-pagination">
				<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.length - 1" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
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
					spaceBetween: 25,
					slidesPerView: 4,
					observer: true,
					observeParent: true,
					init: false,
					breakpoints: {
						700: {
							spaceBetween: 20,
							slidesPerView: 3
						},
						500: {
							spaceBetween: 10,
							slidesPerView: 2
						}
					}
				},
				showLeft: false,
				showRight: false,
				activeIndex: 0,
				arrowY: 125
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
			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			},

			onResize() {
				if (this.mySwiper)
					setTimeout(() => {this.mySwiper.update()}, 1);
			}
		}
	}
</script>
