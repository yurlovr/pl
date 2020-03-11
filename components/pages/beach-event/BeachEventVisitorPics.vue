<template>
	<div class="beach-event__visitor-pics custom-container" :class="{ empty: data && data.length == 0 }">
		<h3 class="beach-event__visitor-pics__title">Фото посетителей</h3>
		<div class="beach-event__visitor-pics__slider">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-if="data && data.length == 0"></div>
					<div class="swiper-slide" v-for="(review, i) in data">
						<div class="beach-event__visitor-pics__user-area">
							<img :src="review.avatar">
							<div class="beach-event__visitor-pics__user-area__nickname-wrapper">
								<span>{{ review.name }}</span>
							</div>
						</div>
						<div class="beach-event__visitor-pics__pic-area">
							<img :src="review.pic">
						</div>
						<div class="beach-event__visitor-pics__comment-area">
							<span v-html="review.comment"></span>
						</div>
						<div class="beach-event__visitor-pics__tag-area" v-if="review.tags">
							<span v-for="tag in review.tags">{{ tag }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="pagination-wrapper">
				<div class="custom-pagination">
					<button class="custom-pagination-bullet" v-for="(b,i) in Math.max(data.length - 1, 0)" :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"></button>
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
			<button class="banner__card__info-area__button" @click="modalOpen = true">
				<span>Добавить фотографию</span>
			</button>
		</div>
		<div class="beach-event__visitor-pics__modal" v-show="modalOpen" v-body-scroll-lock="modalOpen">
			<div class="beach-event__visitor-pics__modal__bg" @click="modalOpen = false"></div>
			<div class="beach-event__visitor-pics__modal__card">
				<h3 class="beach-event__visitor-pics__modal__title">Добавить фотографию</h3>
				<span class="beach-event__visitor-pics__modal__info">Пожалуйста вставьте ссылку на пост Instagram</span>
				<input class="beach-event__visitor-pics__modal__link-area" placeholder="Вставьте ссылку" v-model="link">
				<button class="banner__card__info-area__button" @click="sendPic()" :disabled="error == false">
					<span v-show="error == null">Добавить фотографию</span>
					<span v-show="error == true">Попробовать снова</span>
				</button>
				<span class="beach-event__visitor-pics__modal__error" v-show="errorMsg.length > 0">{{ errorMsg }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: ['data', 'type', 'typeId'],

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
				showRight: false,
				activeIndex: 0,
				link: '',
				modalOpen: false,
				error: null,
				errorMsg: ''
			}
		},

		mounted() {
			this.mySwiper.on('imagesReady', () => {
				window.addEventListener('resize', this.onResize, false);
				this.onResize();
				this.updateArrows();
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
			},

			async sendPic() {
				if (this.link.replace(/\s/g,"") == "") {
					this.errorMsg = "Пожалуйста введите ссылку";
					this.error = true;
				} else {
					this.errorMsg = '';
					this.error = null;
				}

				let data = new FormData();
				data.append(`${this.type}Id`, this.typeId);
				data.append('link', this.link);
				await this.$axios.$post(`/socialPhoto/${this.type}Add`, {
					data
				}).then(res => {
					this.error = !res.status;
					if (this.error)
						this.errorMsg = res.error;
					else this.errorMsg = '';
				})
			}
		},

	    beforeRouteLeave(to, from, next) {
    		this.mySwiper.destroy();
	        next();
	    }
	}
</script>