<template>
	<section class="two-part-layout__card beach-page__quick-data-wrapper">
		<div class="beach-page__quick-data">
			<h2 class="two-part-layout__card__title beach-page__quick-data__title">{{ title }}</h2>
			<div class="beach-page__quick-data__items">
				<div class="beach-page__quick-data__item" v-if="data.data1">
					<img :src="data.data1.pic">
					<span v-html="data.data1.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data2">
					<img :src="data.data2.pic">
					<span v-html="data.data2.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data3">
					<img :src="data.data3.pic">
					<span v-html="data.data3.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data4">
					<img :src="data.data4.pic">
					<span v-html="data.data4.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data5">
					<img :src="data.data5.pic">
					<span v-html="data.data5.title"></span>
				</div>
			</div>
			<div class="beach-page__quick-data__slider">
				<div v-swiper:mySwiper="swiperOption">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-if="data.data1">
							<div class="beach-page__quick-data__item">
								<img :src="data.data1.pic">
								<span v-html="data.data1.slideTitle ? data.data1.slideTitle : data.data1.title"></span>
							</div>
						</div>
						<div class="swiper-slide" v-if="data.data2">
							<div class="beach-page__quick-data__item">
								<img :src="data.data2.pic">
								<span v-html="data.data2.slideTitle ? data.data2.slideTitle : data.data2.title"></span>
							</div>
						</div>
						<div class="swiper-slide" v-if="data.data3">
							<div class="beach-page__quick-data__item">
								<img :src="data.data3.pic">
								<span v-html="data.data3.slideTitle ? data.data3.slideTitle : data.data3.title"></span>
							</div>
						</div>
						<div class="swiper-slide" v-if="data.data4">
							<div class="beach-page__quick-data__item">
								<img :src="data.data4.pic">
								<span v-html="data.data4.slideTitle ? data.data4.slideTitle : data.data4.title"></span>
							</div>
						</div>
						<div class="swiper-slide" v-if="data.data5">
							<div class="beach-page__quick-data__item">
								<img :src="data.data5.pic">
								<span v-html="data.data5.slideTitle ? data.data5.slideTitle : data.data5.title"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="pagination-wrapper">
					<div class="custom-pagination">
						<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in Object.keys(data).length - minus" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['data', 'title'],

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
					slidesPerView: 3,
					init: false,
					breakpoints: {
						500: {
							slidesPerView: 2
						},
						400: {
							slidesPerView: 1
						}
					}
				},
				activeIndex: 0,
				minus: 2
			}
		},

		mounted() {
			this.mySwiper.on('slideChange', () => {
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.mySwiper.init(this.swiperOption);

			window.addEventListener('resize', this.onResize);
			this.onResize();
		},

		methods: {
			onResize() {
				if (window.innerWidth > 500)
					this.minus = 2;
				else if (window.innerWidth <= 500 && window.innerWidth > 400)
					this.minus = 1;
				else this.minus = 0;
			}
		}
	}
</script>