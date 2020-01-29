<template>
	<div class="slider-beh">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide slider-beh__slide" v-for="(slide, i) in data.slideData" :class="{ tall : data.tall }">
					<a href="/" class="slider__slide__link" @click.prevent="$bus.goTo('/', $router)">
						<div class="slider-beh__slide__pic-area">
							<img :src="slide.pic" alt="Фото" class="slider-beh__slide__pic">
							<div class="slider-beh__slide__temp-area" v-if="slide.temperature">
								<img src="~/static/pics/global/svg/temper_big.svg" alt="Температура">
								<span class="slider-beh__slide__temp">{{ (slide.temperature > 0 ? '+ ' : '') + (slide.temperature < 0 ? '- ' : '') + slide.temperature }}</span>
								<span class="slider-beh__slide__temp-o"><span>o</span></span>
								<span class="slider-beh__slide__temp-C">C</span>
							</div>
							<button class="slider-beh__slide__heart-button" @click.prevent="updateHearts(i)" @mouseenter="updateHeartsHover(i)" @mouseleave="updateHeartsHover(i)" v-if="slide.favorite == false || slide.favorite == true">
								<img src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" class="slider-beh__slide__heart" v-show="!favorites[i] && !favoritesHover[i] || favorites[i] && favoritesHover[i]">
								<img src="~/static/pics/global/svg/heart_clicked.svg" alt="В избранное" class="slider-beh__slide__heart" v-show="favorites[i] && !favoritesHover[i] || !favorites[i] && favoritesHover[i]">
							</button>
							<img class="slider-beh__slide__expensive" v-if="slide.expensive" src="~/static/pics/global/svg/expensive.svg" alt="Дорого">
						</div>
					</a>
					<div class="slider-beh__slide__info-area" :class="{ event: data.slideData[0].beach }">
						<div class="slider-beh__slide__rating-area" v-if="slide.rating">
							<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
							<span>{{ slide.rating.toFixed(1) }}</span>
						</div>
						<div class="slider-beh__slide__date-area" v-if="slide.date">
							<img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
							<span>{{ slide.date }}</span>
						</div>
						<a href="/" class="slider-beh__slide__title" @click.prevent="$bus.goTo('/', $router)" :style="{ 'font-size': slide.beach ? '18px' : '20px' }"><v-clamp autoresize :max-lines="2">{{ slide.title }}</v-clamp></a>
						<div class="slider-beh__slide__subtitle-area">
							<a :href="slide.beachLink" @click.prevent="$bus.goTo(slide.beachLink, $router)" class="slider-beh__slide__beach" v-if="slide.beach">{{ slide.beach }}</a>
							<h6 class="slider-beh__slide__location" :style="{ 'font-size': slide.beach ? '10px' : '12px' }">{{ slide.location }}</h6>
							<a :href="slide.priceLink" @click.prevent="$bus.goTo(slide.priceLink, $router)" class="slider-beh__slide__price" :style="{ 'font-size': slide.beach ? '10px' : '12px' }" v-if="slide.price">от {{ slide.price }}
								<span>
									<img :style="{ 'height': slide.beach ? '9px' : '11px', 'margin-bottom': '3px' }" src="~/static/pics/global/svg/ruble.svg" alt="руб">
								</span>/сутки</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pagination-wrapper">
			<div class="custom-pagination">
				<div class="custom-pagination-bullet" v-for="(b,i) in data.slideData.length - 1" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></div>
			</div>
		</div>
		<button class="slider__arrow-left" :style="{ transform: 'translate(-50%, -50%)', top: arrowY + 'px', display: showLeft && showArrows ? '' : 'none' }" @click="mySwiper.slidePrev()">
			<img src="~/static/pics/global/svg/slider_arrow_left.svg" alt="Налево">
		</button>
		<button class="slider__arrow-right" :style="{ transform: 'translate(50%, -50%)', top: arrowY + 'px', display: showRight && showArrows ? '' : 'none' }" @click="mySwiper.slideNext();">
			<img src="~/static/pics/global/svg/slider_arrow_right.svg" alt="Направо">
		</button>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VClamp from 'vue-clamp';

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
	  		VClamp
		},

		data() {
			return {
				swiperOption: {
					spaceBetween: 24,
					slidesPerView: this.data.slideNumber,
					init: false,
					breakpoints: {
						1150: {
							slidesPerView: 5,
							spaceBetween: 20
						},
						1000: {
							slidesPerView: 4
						},
						700: {
							slidesPerView: 3
						},
						550: {
							slidesPerView: 2,
							spaceBetween: 10
						}
					}
				},
				arrowY: 0,
				showLeft: false,
				showRight: true,
				showArrows: true,
				activeIndex: 0,
				favorites: new Array(this.data.slideData.length).fill(false),
				favoritesHover: new Array(this.data.slideData.length).fill(false)
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize);
				this.onResize();
			});

			this.mySwiper.on('slideChange', () => {
				this.updateArrows();
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			onResize() {
				this.arrowY = this.$el.querySelector('.slider-beh__slide__pic').offsetHeight / 2; // this.$el means we're query selecting in this component

				if (window.innerWidth < 1150) {
					this.showArrows = false;
				} else {
					this.showArrows = true;
				}
			},

			updateArrows() {
				this.showLeft = !this.mySwiper.isBeginning;
				this.showRight = !this.mySwiper.isEnd;
			},

			updateHearts(i) {
				if (this.favorites[i])
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				this.favorites[i] = !this.favorites[i];
				this.favorites.push('');
				this.favorites.pop();
			},

			updateHeartsHover(i) {
				if (this.favoritesHover[i])
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				this.favoritesHover[i] = !this.favoritesHover[i];
				this.favoritesHover.push('');
				this.favoritesHover.pop();
			}
		}
	}
</script>
