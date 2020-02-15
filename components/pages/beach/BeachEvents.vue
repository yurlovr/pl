<template>
	<section class="beach-page__events">
		<h2 class="two-part-layout__card__title beach-page__events__title">Ближайшие мероприятия на пляже</h2>
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<Card v-for="(slide, i) in data.cardData" :data="slide" :temp="temp" :key="i" class="swiper-slide" />
			</div>
		</div>
	</section>
</template>

<script>
	import Vue from 'vue';
	import Card from '~/components/global/Card';

	export default {
		props: ['data', 'temp'],

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
					slidesPerView: 'auto',
					init: false,
					breakpoints: {
						1200: {
							spaceBetween: 20
						},
						520: {
							spaceBetween: 10
						}
					}
				},
				activeIndex: 0
			}
		},

		mounted() {
			// this.mySwiper.on('imagesReady', () => {
				// window.addEventListener('resize', this.onResize);
				// this.onResize();
			// });

			this.mySwiper.on('slideChange', () => {
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.mySwiper.init(this.swiperOption);
		},
	}
</script>