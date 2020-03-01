<template>
	<div class="search-page custom-page">
		<SearchTags :tags="tags" />
		<div class="search-page__title-area custom-container">
			<h3 class="main-page__section-title">Результаты поиска</h3>
			<div class="search-page__title-area__buttons" v-if="getSearchResult">
				<button class="search-page__title-area__button" :class="{ active: !showCardsOrMap }" @click="showCardsOrMap = false">
					<img src="~/static/pics/search/cards_orange.svg" alt="Вид: Карточки" v-show="!showCardsOrMap">
					<img src="~/static/pics/search/cards_gray.svg" alt="Вид: Карточки" v-show="showCardsOrMap">
				</button>
				<button class="search-page__title-area__button" :class="{ active: showCardsOrMap }" @click="showMap()">
					<img src="~/static/pics/search/map_orange.svg" alt="Вид: Карта" v-show="showCardsOrMap">
					<img src="~/static/pics/search/map_gray.svg" alt="Вид: Карта" v-show="!showCardsOrMap">
				</button>
			</div>
		</div>
		<div class="custom-container search-page__empty" v-if="!getSearchResult || getSearchResult.length == 0">
			<div class="favorites-page__visited-empty">К сожалению по Вашему запросу ничего не найдено.<br>Попробуйте изменить запрос, или начните <a href="/" @click.prevent="$bus.goTo('/', $router)">сначала</a></div>
		</div>
		<CardGrid :data="getSearchResult" v-show="!showCardsOrMap" v-if="getSearchResult" />
		<SearchMapArea :data="getSearchResult" v-show="showCardsOrMap" v-if="getSearchResult" />
	</div>
</template>

<script>
	import SearchTags from '~/components/pages/search/SearchTags';
	import SearchMapArea from '~/components/pages/search/SearchMapArea';
	import CardGrid from '~/components/global/CardGrid';
	import RouterPagination from '~/components/global/RouterPagination';

	import { mapGetters, mapActions, mapState } from 'vuex';

	export default {
		components: {
			SearchTags,
			CardGrid,
			SearchMapArea,
			RouterPagination
		},

		computed: {
			...mapGetters('search', ['getSearchResult']),
			...mapState('search', ['tags'])
		},

		watch: {
			getSearchResult: function (newS, oldS) {
				if (this.tags.length > 0 && oldS != null)
					setTimeout(() => { this.$bus.$emit('updateMap')}, 100);
			}
		},

		data() {
			return {
				showCardsOrMap: false, // cards: false, map: true
				mapShownForTheFirstTime: false
			}
		},

		async fetch({ store }) {
			await store.dispatch('search/search');
		},

		methods: {
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