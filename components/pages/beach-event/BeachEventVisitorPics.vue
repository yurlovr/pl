<template>
	<div class="beach-event__visitor-pics custom-container">
		<h3 class="beach-event__visitor-pics__title">Фото посетителей</h3>
		<div class="beach-event__visitor-pics__slider">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(review, i) in data" :key="i">
						<div class="beach-event__visitor-pics__user-area">
							<a href="#">
								<img :src="review.avatar">
								<span>{{ review.name }}</span>
							</a>
						</div>
						<a href="#">
							<div class="beach-event__visitor-pics__pic-area">
								<img :src="review.pic">
							</div>
							<div class="beach-event__visitor-pics__comment-area">
								<span>
									<v-clamp autoresize :max-lines="max">
										{{ review.comment }}
									</v-clamp>
								</span>
							</div>
						</a>
						<div class="beach-event__visitor-pics__tag-area" v-if="review.tags">
							<a href="#" v-for="tag in review.tags">{{ tag }}</a>
						</div>
					</div>
				</div>
			</div>
			<div class="pagination-wrapper">
				<div class="custom-pagination">
					<button class="custom-pagination-bullet" v-for="(b,i) in data.length - 1" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
				</div>
			</div>
			<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', display: showLeft ? '' : 'none' }" @click="mySwiper.slidePrev()">
				<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
			</button>
			<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', display: showRight ? '' : 'none' }" @click="mySwiper.slideNext();">
				<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
			</button>
		</div>
		<div class="beach-event__visitor-pics__add-button-area">
			<button class="main-page__card__info-area__button">
				<span>Добавить фотографию</span>
			</button>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VClamp from 'vue-clamp';

	export default {
		props: ['data'],

		components: {
			VClamp
		},

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
					spaceBetween: 24,
					slidesPerView: 4,
					init: false,
					breakpoints: {
						900: {
							slidesPerView: 3,
							spaceBetween: 20
						},
						700: {
							slidesPerView: 2,
							spaceBetween: 10
						}
					}
				},
				showLeft: false,
				showRight: true,
				activeIndex: 0,
				max: 2
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize, false);
				this.onResize();
			});

			this.mySwiper.on('slideChange', () => {
				this.updateArrows();
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			},

			onResize() {
				if (!this.$el.querySelector('.beach-event__visitor-pics'))
					window.removeEventListener('resize', this.onResize, false);

				if (this.mySwiper)
					this.mySwiper.update();

				if (window.innerWidth < 500)
					this.max = 3;
				else this.max = 2;
			}
		}
	}
</script>