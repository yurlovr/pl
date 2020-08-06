<template>
	<div class="catalog-page custom-page" v-if="data">
		<div class="catalog-page__title-area custom-container">
			<h3 class="custom-page__title catalog-page__title">{{ data.title }}</h3>
			<div class="search-page__title-area__buttons" v-if="data && type == 'beach'">
				<button class="search-page__title-area__button" :class="{ active: !showCardsOrMap }" @click="showCardsOrMap = false">
					<img  src="~/static/pics/search/cards_orange.svg" alt="Вид: Карточки" v-show="!showCardsOrMap">
					<img  src="~/static/pics/search/cards_gray.svg" alt="Вид: Карточки" v-show="showCardsOrMap">
				</button>
				<button class="search-page__title-area__button" :class="{ active: showCardsOrMap }" @click="showMap()">
					<img  src="~/static/pics/search/map_orange.svg" alt="Вид: Карта" v-show="showCardsOrMap">
					<img  src="~/static/pics/search/map_gray.svg" alt="Вид: Карта" v-show="!showCardsOrMap">
				</button>
			</div>
		</div>
		<CardGrid :perPage="20" :data="data.grid" v-if="data.grid" v-show="!showCardsOrMap" />
		<SearchMapArea :data="data.grid" v-show="showCardsOrMap" v-if="data.grid && data.grid.length > 0 && type == 'beach'" />
	</div>
</template>

<script>
import CardGrid from '~/components/global/CardGrid';
import SearchMapArea from '~/components/pages/search/SearchMapArea';

import { mapGetters, mapMutations } from 'vuex';

export default {
	props: ['type'],

	components: {
		CardGrid,
		SearchMapArea
	},

	computed: {
		...mapGetters('catalog', ['data'])
	},

	data() {
		return {
			showCardsOrMap: false, // cards: false, map: true
			mapShownForTheFirstTime: false,
		}
	},
  async asyncData( {$axios, route}){
    const {data} = await $axios.$get('seo/meta?url=' + route.fullPath)
    return {
      meta: data
    }
  },
  head() {
    const stable = 'ПЛЯЖИ.РУ'
    return {
      title: this.meta.title || stable,
      meta: [
        {
          hid: 'description-beach',
          name: 'description',
          content: this.meta.description || stable
        },
        {hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable},
      ]
    }
  },

	methods: {
		...mapMutations('catalog', ['setType', 'setQuery']),

		showMap() {
			this.showCardsOrMap = true;
			if (!this.mapShownForTheFirstTime) {
				this.mapShownForTheFirstTime = true;
				this.$bus.$emit('updateScrollbar');
			}
		}
	}
}
</script>
