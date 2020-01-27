<template>
	<div class="map-beaches-main">
		<client-only>
			<perfect-scrollbar class="scroll-area" :settings="settings">
				<div class="map-beaches-main__card" v-for="(card, i) in data" :key="i">
					<a href="/" @click.prevent="$bus.goTo('/', $router)">
						<div class="map-beaches-main__card__pic-area">
							<img :src="card.pic">
							<button class="map-beaches-main__card__favorite">
								<img src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" v-show="!card.favorite" @click.prevent>
							</button>
						</div>
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
	</div>
</template>

<script>
	export default {
		props: ['data'],

		data() {
			return {
				settings: {
					maxScrollbarLength: 60,
					suppressScrollX: true
				}
			}
		}
	}
</script>