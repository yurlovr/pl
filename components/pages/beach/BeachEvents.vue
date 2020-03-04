<template>
	<section class="beach-page__events">
		<div class="main-page__section-subtitle-area beach-page__events__title-area">
			<h3 class="two-part-layout__card__title beach-page__events__title">Ближайшие мероприятия на пляже</h3>
			<nuxt-link to="/" class="main-page__section__subtitle-area__see-all beach-page__events__see-all">
	          <span>Смотреть все ({{ data.count }})</span>
	        </nuxt-link>
		</div>
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<Card v-for="(slide, i) in data.cardData" :data="slide" :temp="temp" :key="i" class="swiper-slide" />
			</div>
		</div>
		<div class="pagination-wrapper">
			<div class="custom-pagination">
				<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.cardData.length - 1" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
			</div>
		</div>
		<div class="main-page__beach-events__see-all-bottom">
			<nuxt-link to="/" class="main-page__see-all">
	          <span>Смотреть все ({{ data.count }})</span>
	        </nuxt-link>
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