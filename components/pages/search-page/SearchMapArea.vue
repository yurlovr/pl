<template>
	<section class="search-page__map-area">
		<div class="search-page__map-area__info-area">
			<nuxt-link to="/" class="search-page__map-area__card" v-for="(card, i) in data" :key="i">
				<div class="search-page__map-area__card__pic-area">
					<img :src="card.pic">
				</div>
				<div class="search-page__map-area__card__info-area">
					<div class="search-page__map-area__card__title-area">
						<h3 class="search-page__map-area__card__title">{{ card.title }}</h3>
						<div class="search-page__map-area__card__rating-area">
							<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
							<span>{{ card.rating.toFixed(1) }}</span>
						</div>
					</div>
					<h5 class="search-page__map-area__card__subtitle">{{ card.location }}</h5>
					<div class="search-page__map-area__card__infos">
						<div class="search-page__map-area__card__infos__item">
							<img src="~/static/pics/search/beach_length.svg">
							<span>{{ card.beachLength }}</span>
						</div>
						<div class="search-page__map-area__card__infos__item">
							<img src="~/static/pics/search/beach_price.svg">
							<span>{{ card.beachPrice }} <span style="font-family: Helvetica Heue">&#x20BD;</span>/день</span>
						</div>
						<div class="search-page__map-area__card__infos__item">
							<img src="~/static/pics/search/beach_type.svg">
							<span>{{ card.beachType }}</span>
						</div>
						<div class="search-page__map-area__card__infos__item">
							<img src="~/static/pics/search/beach_worktime.svg">
							<span>{{ card.beachWorktime }}</span>
						</div>
						<div class="search-page__map-area__card__infos__item">
							<img src="~/static/pics/search/beach_roughness.svg">
							<span>{{ card.beachRoughness }}</span>
						</div>
					</div>
				</div>
			</nuxt-link>
		</div>
		<SearchMap />
	</section>
</template>

<script>
	import SearchMap from '~/components/pages/search-page/SearchMap';

	export default {
		props: ['data'],

		components: {
			SearchMap
		}
	}
</script>