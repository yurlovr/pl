<template>
	<div class="map-beaches-main">
		<client-only>
			<perfect-scrollbar class="scroll-area" :options="options">
				<div class="map-beaches-main__card" v-for="(card, i) in data" :key="i" :id="`smc-${i}`" :class="{ active : activeCard == i }">
					<div class="map-beaches-main__card__pic-area">
						<a href="/" @click.prevent="$bus.goTo('/', $router)">
							<img :src="card.pics[0]">
						</a>
						<AddToFavorites :fav="card.favorite" />
					</div>
					<a href="/" @click.prevent="$bus.goTo('/', $router)">
						<div class="map-beaches-main__card__info-area">
							<div class="map-beaches-main__card__rating-area">
								<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
								<span>{{ card.rating.toFixed(1) }}</span>
							</div>
							<h3 class="map-beaches-main__card__title">{{ card.title }}</h3>
							<h5 class="map-beaches-main__card__location">{{ card.location }}</h5>
						</div>
					</a>
				</div>
			</perfect-scrollbar>
		</client-only>
		<div class="map-beaches-main__slider">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide map-beaches-main__slide" v-for="(slide, i) in data" :key="i" :class="{ active : activeCard == i }">
						<div class="map-beaches-main__card__pic-area">
							<a href="/" @click.prevent="$bus.goTo('/', $router)">
								<img class="map-beaches-main__card__pic" :src="slide.pics[0]">
							</a>
							<AddToFavorites :fav="slide.favorite" />
						</div>
						<a href="/" @click.prevent="$bus.goTo('/', $router)">
							<div class="map-beaches-main__card__info-area">
								<div class="map-beaches-main__card__rating-area">
									<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
									<span>{{ slide.rating.toFixed(1) }}</span>
								</div>
								<h3 class="map-beaches-main__card__title">{{ slide.title }}</h3>
								<h5 class="map-beaches-main__card__location">{{ slide.location }}</h5>
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="pagination-wrapper">
				<div class="custom-pagination">
					<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in data.length - minus" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import AddToFavorites from '~/components/global/AddToFavorites';

	export default {
		props: ['data'],

		components: {
			AddToFavorites
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
				options: {
					swipeEasing: true
				},
				swiperOption: {
					spaceBetween: 20,
					slidesPerView: 2,
					init: false,
					breakpoints: {
						400: {
							slidesPerView: 1
						}
					}
				},
				arrowY: 0,
				activeIndex: 0,
				activeCard: -1,
				minus: 1
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize);
				this.onResize();
			});

			this.mySwiper.on('slideChange', () => {
				this.activeIndex = this.mySwiper.activeIndex;
			});

			this.$bus.$on('goToCard', (i) => {
				this.activeCard = i;
				if (window.innerWidth > 800)
					this.scrollToCard(i);
				else
					this.slideToCard(i);
			});

			this.mySwiper.init(this.swiperOption);
		},

		methods: {
			onResize() {
				this.arrowY = this.$el.querySelector('.map-beaches-main__card__pic').offsetHeight / 2;

				if (window.innerWidth > 400)
					this.minus = 1;
				else this.minus = 0;
			},

			scrollToCard(i) {
				this.$el.querySelector('.scroll-area').scrollTop = this.$el.querySelector(`#smc-${i}`).offsetTop - this.$el.querySelector('.scroll-area').offsetTop;
			},

			slideToCard(i) {
				if (this.mySwiper)
					this.mySwiper.slideTo(i);
			}
		}
	}
</script>
