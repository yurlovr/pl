<template>
	<section class="two-part-layout__card">
		<div class="beach-event__main-info">
			<div class="search-page__map-area__card__title-area beach-event__main-info__title-area">
				<div class="beach-event__main-info__title-area__left">
					<h1 class="search-page__map-area__card__title beach-event__main-info__title ">{{ data.title }}</h1>
					<a :href="getLink" @click.prevent="$bus.goTo(getLink, $router)" class="search-page__map-area__card__subtitle beach-event__main-info__subtitle">{{ data.location }}</a>
				</div>
				<button class="beach-event__main-info__hearts" @click="updateHeart()">
					<img loading="lazy" src="~/static/pics/global/svg/heart_button_unclicked.svg" v-show="!favorite">
					<img src="~/static/pics/global/svg/heart_button_clicked.svg" v-show="favorite">
					<span>{{ data.likes + (favorite ? 1 : 0) }}</span>
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
					<span class="wrapper"><span class="gray">Протяженность линии:</span><span>{{ data.beachLength }} м</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.price">
					<img src="~/static/pics/search/beach_price.svg">
					<span class="wrapper"><span class="gray">Вход:</span><span>{{ data.price }} <span>
					<img :style="{ 'height': '11px', 'width': 'unset', 'margin-bottom': '3px', 'margin-right': '0' }" src="~/static/pics/global/svg/ruble_dark.svg" alt="руб">
					</span>/день</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="beachType">
					<img src="~/static/pics/search/beach_type.svg">
					<span class="wrapper"><span class="gray">Поверхность:</span><span>{{ beachType }}</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.time">
					<img src="~/static/pics/search/beach_worktime.svg">
					<span class="wrapper"><span class="gray">Режим работы:</span><span>{{ data.time }}</span></span>
				</div>
				<div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.beachSeabedType">
					<img src="~/static/pics/search/beach_seabedtype.svg">
					<span class="wrapper"><span class="gray">Дно:</span><span>{{ data.beachSeabedType }}</span></span>
				</div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.sunrise">
					<img src="~/static/pics/global/svg/_sunrise.svg">
					<span class="wrapper"><span class="gray">Время рассвета:</span><span>{{ data.sunrise }}</span></span>
				</div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.sunset">
					<img src="~/static/pics/global/svg/_sunset.svg">
					<span class="wrapper"><span class="gray">Время заката:</span><span>{{ data.sunset }}</span></span>
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
				favorite: false
			}
		},

		mounted() {
			this.$bus.$on('cToggleFavorites', () => {
				this.updateHeart();
			});

			if (this.data.beachId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`) || this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`))
				this.favorite = true;
		},

		computed: {
			getLink() {
				if (this.data.beachId)
					return `/beach-catalog?city=${this.data.locationId}`;
				else (this.data.eventId)
					return `/event-catalog?city=${this.data.locationId}`;
			},

			beachType() {
				if (this.data.beachType) {
					if (this.data.beachType == 'Галечные пляжи')
						return 'Галька';
					else if (this.data.beachType == 'Песчаные пляжи')
						return 'Песок';
					else if (this.data.beachType == 'Ракушечные пляжи')
						return 'Ракушки';
				} else {
					return null;
				}
			}
		},

		methods: {
			updateHeart() {
				if (this.favorite)
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				this.$bus.$emit('pToggleFavorites');

				this.favorite = !this.favorite;

				if (this.data.beachId) {
					if (this.$cookies.get(`favorites.beaches.${this.data.beachId}`))
						this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
							maxAge: -1 // remove
						});
					else {
						this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
							maxAge: 30 * 24 * 60 * 60 // one month
						});
					}
				} else if (this.data.eventId) {
					if (this.$cookies.get(`favorites.events.${this.data.eventId}`))
						this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
							maxAge: -1 // one month
						});
					else {
						this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
							maxAge: 30 * 24 * 60 * 60 // one month
						});
					}
				}
			}
		}
	}
</script>
