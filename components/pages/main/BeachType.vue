<template>
	<section class="main-page__beach-type custom-container">
		<h3 class="main-page__section-title">{{ data.title }}</h3>
		<div class="main-page__beach-type__card-area">
			<div class="main-page__beach-type__card" v-for="(card, i) in data.cards">
				<a :href="getLink(i)" @click.prevent="search(card)">
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
			search(card) {
		      this.$bus.$emit('emptySearchParams');
		      for (let i = 0; i < card.filter.length; i++) {
		      	this.$bus.$emit('updateSearchParam', card.filter[i]);
		      }
		      setTimeout(() => {this.$bus.$emit('search')}, 1);
			},

			getBeachText(i) {
				if (i % 10 > 1 && i % 10 < 5) return 'пляжа';
				return (i % 10 == 1 && i % 100 != 11) ? 'пляж' : 'пляжей';
			},

			getLink(type) {
				let link = '/search?';
				for (let i = 0; i < this.data.cards[type].filter.length; i++) {
					link += `${this.data.cards[type].filter[i].type}[]=${this.data.cards[type].filter[i].id}&`;
				}
				return link.slice(0, -1);
			}
		}
	}
</script>