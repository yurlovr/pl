<template>
	<div class="slider-beach-event">
		<div class="slider-beach-event__left">
			<div class="slider-beach-event__left__inner">
				<div class="slider-beach-event__medal-gold" v-if="data.goldMedal">
					<img src="~/static/pics/global/svg/goldMedal.svg">
					<div class="slider-beach-event__medal-gold__tooltip">
						<span>Пляж сертифицирован</span>
					</div>
				</div>
				<div class="slider-beach-event__medal-blue" v-if="data.blueMedal">
					<img src="~/static/pics/global/svg/blueMedal.svg">
				</div>
				<div class="slider-beach-event__beach-closed" v-if="data.isBeachClosed">
					<div class="slider-beach-event__beach-closed__inner">
						<div class="slider-beach-event__beach-closed__tooltip" v-if="data.beachClosedTooltip">
							<span>{{ data.beachClosedTooltip }}</span>
						</div>
					</div>
					<span :style="{ color: data.beachClosedColor }">
						{{ data.beachClosedText }}
					</span>
				</div>
				<button class="slider-beach-event__zoom-button" @click="modalOpen = !modalOpen">
					<img src="~/static/pics/global/svg/zoom.svg">
				</button>
				<div v-swiper:mySwiper="swiperOption">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(pic, i) in data.pics" :key="i">
							<img :src="pic">
						</div>
					</div>
				</div>
				<div class="pagination-wrapper" v-if="data.pics.length > 1">
					<div class="custom-pagination">
						<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.pics.length" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
					</div>
				</div>
				<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', display: showLeft ? '' : 'none' }" @click="mySwiper.slidePrev()">
					<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
				</button>
				<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', display: showRight ? '' : 'none' }" @click="mySwiper.slideNext();">
					<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
				</button>
			</div>
		</div>
		<div class="slider-beach-event__right">
			<div class="slider-beach-event__right__item" v-for="(pic, i) in data.pics" :key="i" v-if="i != 0 && i <= 6"
			:style="{ height: getRightPicsHeight }">
				<div class="slider-beach-event__right__item__inner" @click="openModal(i)">
					<img :src="pic">
					<span v-if="i == 6 && data.pics.length - 7 > 0">+{{ data.pics.length - 7 }}</span>
				</div>
			</div>
		</div>
		<div class="slider-beach-event__modal" v-body-scroll-lock="modalOpen" :class="{ active: modalOpen }">
			<button class="slider-beach-event__modal__close-button" @click="modalOpen = !modalOpen">
				<img src="~/static/pics/global/svg/cross_blue.svg">
			</button>
			<div class="slider-beach-event__modal__inner">
				<div class="slider-beach-event__modal__title-area">
					<h2 class="slider-beach-event__modal__title">{{ data.title }}</h2>
					<span class="slider-beach-event__modal__count"><span class="orange">{{ activeIndex+1 }}</span>/{{ data.pics.length }}</span>
				</div>
				<div class="slider-beach-event__modal__sides">
					<div class="slider-beach-event__modal__left">
						<div v-swiper:mySwiperModal="swiperOption">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(pic, i) in data.pics" :key="i">
									<img :src="pic">
								</div>
							</div>
						</div>
						<button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }" @click="mySwiperModal.slidePrev()">
							<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
						</button>
						<button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }" @click="mySwiperModal.slideNext();">
							<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
						</button>
					</div>
					<div class="slider-beach-event__modal__right">
						<div v-swiper:mySwiperModalSmall="swiperModalSmallOption">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(pic, i) in data.pics" :key="i" :class="{ active: activeIndex == i }" @click="mySwiperModal.slideTo(i)">
									<img :src="pic">
								</div>
							</div>
						</div>
						<button class="slider__arrow-left" :style="{ display: showLeft ? '' : 'none' }" @click="mySwiperModal.slidePrev()">
							<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
						</button>
						<button class="slider__arrow-right" :style="{ display: showRight ? '' : 'none' }" @click="mySwiperModal.slideNext();">
							<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
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
		props: ['data'],

		beforeMount () {
			if (process.browser) {
				require('swiper/dist/css/swiper.css');
				const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
				Vue.use(VueAwesomeSwiper);
			}
		},

		computed: {
			getRightPicsHeight() {
				if (Math.min(this.data.pics.length - 1, 6) % 2 == 0)
					return `${(100 / (Math.min(this.data.pics.length - 1, 6) / 2)).toFixed(2)}%`;
				else return `${(100 / (Math.min(this.data.pics.length, 6) / 2)).toFixed(2)}%`;
			}
		},

		data() {
			return {
				swiperOption: {
					spaceBetween: 20,
					slidesPerView: 1,
					observer: true,
					observeParents: true,
					init: false,
					breakpoints: {
						550: {
							spaceBetween: 10
						}
					},
					keyboard: {
						enabled: true,
						onlyInViewport: false,
					}
				},
				showLeft: false,
				showRight: true,
				activeIndex: 0,
				modalOpen: false,
				swiperModalSmallOption: {
					slidesPerView: 'auto',
					spaceBetween: 15,
					direction: 'vertical',
					mousewheel: true,
					init: false,
					breakpoints: {
						600: {
							direction: 'horizontal',
							spaceBetween: 10
						}
					}
				}
			}
		},

		mounted() {
			this.mySwiper.on('slideChange', () => {
				if (!this.modalOpen)
					this.mySwiperModal.slideTo(this.mySwiper.activeIndex);
				this.mySwiperModalSmall.slideTo(this.mySwiper.activeIndex);
				this.updateArrows();
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.mySwiperModal.on('slideChange', () => {
				if (this.modalOpen)
					this.mySwiper.slideTo(this.mySwiperModal.activeIndex);
			});

			this.mySwiper.init(this.swiperOption);
			this.mySwiperModal.init(this.swiperOption);
			this.mySwiperModalSmall.init(this.swiperOption);

			this.updateArrows();
		},

		methods: {
			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			},

			openModal(i) {
				this.mySwiper.slideTo(i);
				if (i > 5)
					this.modalOpen = true;
			}
		}
	}
</script>