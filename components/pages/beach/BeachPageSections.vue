<template>
	<div class="beach-page-sections slider-weather__months">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(section, i) in sections">
					<button class="slider-weather__month":class="{ active : i == activeSection }" @click="activeSection = i">
						<span>{{ section }}</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		data() {
			return {
				activeSection: 1,
				sections: [
					'Галерея',
					'Инфраструктура',
					'О пляже',
					'Услуги и аренда',
					'Парковки и транспорт',
					'Температура воды',
					'Мероприятия',
					'Бары и рестораны',
					'Фото посетителей',
					'Отзывы'
				],
				swiperOption: {
					freeMode: true,
					spaceBetween: 0,
					slidesPerView: 'auto',
					init: false
				}
			}
		},

		mounted() {
			this.mySwiper.init(this.swiperOption);
		}
	}
</script>