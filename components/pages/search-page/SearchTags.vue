<template>
	<div class="search-page__tags custom-container">
		<div class="search-page__desktop-tablet">
			<div class="search-page__tag" v-for="(tag, i) in tags" :key="i">
				<span>{{ tag }}</span>
				<button class="search-page__tag__remove">
					<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
				</button>
			</div>
		</div>
		<div class="search-page__mobile">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide search-page__tag" v-for="tag in tags">
						<span>{{ tag }}</span>
						<button class="search-page__tag__remove">
							<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['tags'],

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
					init: false,
					freeMode: true,
					slidesPerView: 'auto'
				},
			}
		},

		mounted() {
			this.mySwiper.init(this.swiperOption);
		}
	}
</script>