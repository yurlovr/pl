<template>
	<section class="main-page__beach-type custom-container">
		<h3 class="main-page__section-title">{{ data.title }}</h3>
		<div class="main-page__beach-type__card-area">
			<div class="main-page__beach-type__card" v-for="(card, i) in data.cards">
				<a href="/search" @click.prevent="search(card.code)">
					<img :src="card.pic" class="main-page__beach-type__card__bg">
					<div class="main-page__beach-type__card__text-area">
						<h4 class="main-page__beach-type__card__title">{{ card.title }}</h4>
						<p class="main-page__beach-type__card__text">
							{{ card.description }}
						</p>
					</div>
					<div class="main-page__beach-type__card__beach-number-area">
						<span class="main-page__beach-type__card__beach-number">{{ card.beachNumber }}</span>
						<span class="main-page__beach-type__card__beach">{{ getBeachText(card.beachNumber) }}</span>
					</div>
				</a>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['data'],

		methods: {
			// TODO
			search(code) {
				
				this.$bus.goTo('/seach', this.$router);
			},

			getBeachText(i) {
				if (i % 10 > 1 && i % 10 < 5) return 'пляжа';
				return (i % 10 == 1 && i % 100 != 11) ? 'пляж' : 'пляжей';
			}
		}
	}
</script>