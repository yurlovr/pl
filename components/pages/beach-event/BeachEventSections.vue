<template>
	<div class="beach-page-sections slider-weather__months">
		<div class="custom-container">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(section, i) in sections" @click="activeSection = i" :class="{ active : i == activeSection }">
						<nuxt-link :to="{path: '#id-'+i, hash: '#id-'+i}" class="slider-weather__month beach-page-sections__section" :class="{ active : i == activeSection }">
							<span>{{ section }}</span>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['sections'],

		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		data() {
			return {
				activeSection: 0,
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