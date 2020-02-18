<template>
	<section class="two-part-layout__card">
		<div class="beach-event__main-info">
			<div class="search-page__map-area__card__title-area beach-event__main-info__title-area">
				<div class="beach-event__main-info__title-area__left">
					<h1 class="search-page__map-area__card__title beach-event__main-info__title ">{{ data.title }}</h1>
					<h5 class="search-page__map-area__card__subtitle beach-event__main-info__subtitle">{{ data.location }}</h5>
				</div>
				<button class="beach-event__main-info__hearts" @click="updateHeart()">
					<img src="~/static/pics/global/svg/heart_button_unclicked.svg" v-show="!liked">
					<img src="~/static/pics/global/svg/heart_button_clicked.svg" v-show="liked">
					<span>{{ data.likes + (liked ? 1 : 0) }}</span>
				</button>
			</div>
			<div class="h-line mobile"></div>
			<h5 class="search-page__map-area__card__subtitle beach-event__main-info__subtitle mobile">{{ data.location }}</h5>
			<div class="search-page__map-area__card__infos beach-event__main-info__infos">
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.date">
					<img src="~/static/pics/global/svg/calendar_big.svg">
					<span class="wrapper"><span class="gray">Дата:</span><span>{{ data.date }}</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.beachLength">
					<img src="~/static/pics/search/beach_length.svg">
					<span class="wrapper"><span class="gray">Протяженность линии:</span><span>{{ data.beachLength }}</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.price">
					<img src="~/static/pics/search/beach_price.svg">
					<span class="wrapper"><span class="gray">Вход:</span><span>{{ data.price }} <span>
					<img :style="{ 'height': '11px', 'width': 'unset', 'margin-bottom': '3px', 'margin-right': '0' }" src="~/static/pics/global/svg/ruble_dark.svg" alt="руб">
					</span>/день</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.beachType">
					<img src="~/static/pics/search/beach_type.svg">
					<span class="wrapper"><span class="gray">Пляж:</span><span>{{ data.beachType }}</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.time">
					<img src="~/static/pics/search/beach_worktime.svg">
					<span class="wrapper"><span class="gray">{{ data.timeComment }}</span><span>{{ data.time }}</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.beachSeabedType">
					<img src="~/static/pics/search/beach_seabedtype.svg">
					<span class="wrapper"><span class="gray">Дно:</span><span>{{ data.beachSeabedType }}</span></span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['data'],

		data() {
			return {
				liked: false
			}
		},

		mounted() {
			this.$bus.$on('cToggleFavorites', () => {
				this.liked = !this.liked;
			});
		},

		methods: {
			updateHeart() {
				if (this.liked)
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				this.$bus.$emit('pToggleFavorites');

				this.liked = !this.liked;
			}
		}
	}
</script>
