<template>
	<section class="search-page__map-area">
		<div class="search-page__map-area__info-area scroller">
			<client-only>
				<perfect-scrollbar class="scroll-area" ref="scroll" :options="options">
					<SearchMapCard :data="card" v-for="(card, i) in data" :key="i" :id="'smc-' + i" :class="{ active : activeCard == i }" />
				</perfect-scrollbar>
			</client-only>
		</div>
		<div class="search-page__map-area__info-area slider">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<SearchMapCard  v-if="data" :data="card" v-for="(card, i) in data" :key="i" class="swiper-slide" :class="{ active : activeCard == i }" />
				</div>
			</div>
			<div class="pagination-wrapper">
				<div class="custom-pagination" v-if="data">
					<button @click="mySwiper.slideTo(i)" class="custom-pagination-bullet" v-for="(b,i) in Math.max(data.length - minus, 0)" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
				</div>
			</div>
		</div>
		<div class="search-page__map-area__info-area__modal-bg" :class="{ active: indexToShow != -1 }" @click="closeModal()"></div>
		<div class="search-page__map-area__info-area search-page__map-area__info-area__modal" :class="{ active: indexToShow != -1 }">
			<SearchMapCard v-if="data" :data="data[indexToShow == -1 ? 0 : indexToShow]" />
			<div class="search-page__map-area__info-area__modal__close-button-wrapper">
				<button class="search-page__map-area__info-area__modal__close-button" @click="closeModal()">
					<img src="~/static/pics/global/svg/cross_blue.svg">
				</button>
				<a :href="data ? (data[indexToShow == -1 ? 0 : indexToShow] ? data[indexToShow == -1 ? 0 : indexToShow].beachLink : '#') : '#'" @click.prevent="$bus.goTo(data ? (data[indexToShow == -1 ? 0 : indexToShow] ? data[indexToShow == -1 ? 0 : indexToShow].beachLink : '#') : '#', $router)" class="main-page__card__info-area__button"><span>Подробнее</span></a>
			</div>
		</div>
		<SearchMap :beaches="data" />
	</section>
</template>

<script>
	import Vue from 'vue';
	import SearchMap from '~/components/pages/search/SearchMap';
	import SearchMapCard from '~/components/pages/search/SearchMapCard';

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
			SearchMap,
			SearchMapCard
		},

		data() {
			return {
				swiperOption: {
					spaceBetween: 20,
					slidesPerView: 2,
					observer: true,
					observeParents: true,
					init: false
				},
				activeIndex: 0,
				activeCard: -1,
				minus: 1,
				indexToShow: -1, // for mobile
				options: {
					swipeEasing: true
				}
			}
		},

		mounted() {
			if (this.data) {
				this.mySwiper.on('imagesReady', () => {
					window.addEventListener('resize', this.onResize);
					this.onResize();
				});

				this.mySwiper.on('slideChange', () => {
					this.activeIndex = this.mySwiper.activeIndex;
				});

				this.mySwiper.init(this.swiperOption);

				this.$bus.$on('scrollToCard', (i) => {
					this.scrollToCard(i);
				});

				this.$bus.$on('openModal', (i) => {
					this.openModal(i);
				});

				this.$bus.$on('closeModalAndUnscrollToCard', (i) => {
					this.closeModal();
					this.activeCard = -1;
				});

				this.$bus.$on('updateScrollbar', (i) => {
					if (this.$refs.scroll && window.innerWidth > 720)
						setTimeout(() => { this.$refs.scroll.update() }, 1);
				});

				this.closeModal();
			}
		},

		methods: {
			onResize() {
				if (window.innerWidth <= 720) {
					this.minus = 0;
				} else this.minus = 1;
			},

			openModal(i) {
				this.indexToShow = i;
			},

			closeModal() {
				this.indexToShow = -1;
				this.$bus.$emit('modalClosed');
			},

			scrollToCard(i) {
				if (this.$el.querySelector('.scroll-area') && this.$el.querySelector(`#smc-${i}`) && this.$el.querySelector('.search-page__map-area__info-area.scroller'))
					this.$el.querySelector('.scroll-area').scrollTop = this.$el.querySelector(`#smc-${i}`).offsetTop - this.$el.querySelector('.search-page__map-area__info-area.scroller').offsetTop + 100;
				this.activeCard = i;
				if (this.mySwiper)
					this.mySwiper.slideTo(i);
			}
		}
	}
</script>