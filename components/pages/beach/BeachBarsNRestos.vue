<template>
	<section class="beach-page__barsNrestos">
		<h2 class="two-part-layout__card__title beach-page__barsNrestos__title">Бары и рестораны</h2>
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, i) in data" :key="i">
					<div class="beach-page__barsNrestos__subtitle-area">
						<h3 class="beach-page__barsNrestos__subtitle">{{ item.title }}</h3>
						<div class="beach-page__barsNrestos__arrow-controls">
							<button @click="mySwiper.slidePrev()">
								<img src="~/static/pics/beach/arrow_left_orange.svg" alt="Налево">
							</button>
							<span class="beach-page__barsNrestos__arrow-controls__text"><span class="orange">{{ i+1 }}</span>/{{ data.length }}</span>
							<button @click="mySwiper.slideNext()">
								<img src="~/static/pics/beach/arrow_right_orange.svg" alt="Направо">
							</button>
						</div>
					</div>
					<p class="beach-page__barsNrestos__description">
						{{ item.description }}
					</p>
					<a href="#" class="beach-page__barsNrestos__online-service">
						<img src="~/static/pics/beach/online_service.svg">
						<span>Онлайн <br>обслуживание</span>
					</a>
					<SliderBeachBarsNRestos :data="item.pics" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Vue from 'vue';
	import SliderBeachBarsNRestos from '~/components/pages/beach/SliderBeachBarsNRestos';

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
			SliderBeachBarsNRestos
		},

		data() {
			return {
				swiperOption: {
					spaceBetween: 70,
					simulateTouch: false,
					allowTouchMove: false,
					slidesPerView: 1,
					init: false
				}
			}
		},

		mounted() {
			this.mySwiper.init(this.swiperOption);
		}
	}
</script>