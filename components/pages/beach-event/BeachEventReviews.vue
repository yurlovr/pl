<template>
	<section class="beach-event__reviews">
		<h2 class="two-part-layout__card__title beach-event__reviews__title">Отзывы гостей ({{ data.length }})</h2>
		<div class="beach-event__reviews__desktop">
			<BeachEventReview :data="review" v-for="(review, i) in data" :key="i" v-show="i < 6" />
			<div class="pagination-num-wrapper beach-event__reviews__pagination custom-container" v-if="data.length > 6">
				<RouterPagination :page="1" :size="6" :totalElements="data.length" />
			</div>
		</div>
		<div class="beach-event__reviews__mobile">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(review, i) in data" :key="i">
						<BeachEventReview :data="review" :lines="0" />
					</div>
				</div>
			</div>
			<div class="pagination-wrapper">
				<div class="custom-pagination">
					<button class="custom-pagination-bullet" v-for="(b,i) in Math.min(Math.max(data.length, 1), max)" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
				</div>
			</div>
		</div>
		<BeachEventLeaveReview />
	</section>
</template>

<script>
	import Vue from 'vue';
	import BeachEventReview from '~/components/pages/beach-event/BeachEventReview';
	import BeachEventLeaveReview from '~/components/pages/beach-event/BeachEventLeaveReview';
	import RouterPagination from '~/components/global/RouterPagination';

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
			BeachEventReview,
			BeachEventLeaveReview,
			RouterPagination
		},

		data() {
			return {
				swiperOption: {
					autoHeight: true,
					spaceBetween: 70,
					slidesPerView: 1,
					init: false
				},
				activeIndex: 0,
				max: 10
			}
		},

		mounted() {
			this.mySwiper.on('slideNextTransitionEnd', () => {
				if (this.activeIndex < 8)
					this.activeIndex++;
			});

			this.mySwiper.on('slidePrevTransitionEnd', () => {
				if (this.activeIndex > 1)
					this.activeIndex--;
			});

			this.mySwiper.on('reachEnd', () => {
				this.activeIndex = this.max - 1;
			});

			this.mySwiper.on('reachBeginning', () => {
				this.activeIndex = 0;
			});

			setTimeout(()=> { this.mySwiper.init(this.swiperOption) }, 1);
		}
	}
</script>