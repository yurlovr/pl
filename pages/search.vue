<template>
	<div class="search-page">
		<SearchTags :tags="data.tags" />
		<div class="search-page__title-area custom-container">
			<h3 class="main-page__section-title">Результаты поиска</h3>
			<div class="search-page__title-area__buttons">
				<button class="search-page__title-area__button" :class="{ active: !showCardsOrMap }" @click="showCardsOrMap = 0">
					<img src="~/static/pics/search/cards_orange.svg" alt="Вид: Карточки" v-show="!showCardsOrMap">
					<img src="~/static/pics/search/cards_gray.svg" alt="Вид: Карточки" v-show="showCardsOrMap">
				</button>
				<button class="search-page__title-area__button" :class="{ active: showCardsOrMap }" @click="showCardsOrMap = 1">
					<img src="~/static/pics/search/map_orange.svg" alt="Вид: Карта" v-show="showCardsOrMap">
					<img src="~/static/pics/search/map_gray.svg" alt="Вид: Карта" v-show="!showCardsOrMap">
				</button>
			</div>
		</div>
		<CardGrid :data="searchCardResults" v-show="!showCardsOrMap" />
		<SearchMapArea :data="searchMapData" v-show="showCardsOrMap" />
		<div class="search-page__see-all-area custom-container" v-show="!showCardsOrMap">
			<nuxt-link to="/" class="search-page__see-all">
				<span>Смотреть все ({{ 45 }})</span>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
	import SearchTags from '~/components/pages/search-page/SearchTags';
	import SearchMapArea from '~/components/pages/search-page/SearchMapArea';
	import CardGrid from '~/components/global/CardGrid';

	export default {
		components: {
			SearchTags,
			CardGrid,
			SearchMapArea
		},

		data() {
			return {
				showCardsOrMap: false, // cards: 0, map: 1
				data: {
					tags: ['Алушта', '7:00-22:00', 'Песчаный', '1-1,5 км', 'Бесплатно', 'Остановка общественного транспорта', 'Инвентарь для активного отдыха', 'Инвентарь для активного отдыха', 'Душевые кабины']
				},
				searchCardResults: [
					{
						temperature: 22,
						favorite: false,
						expensive: true,
						rating: 5.0,
						title: 'Пляж «Лазурный берег»',
						location: 'Евпатория, КРЫМ',
						pic: '/pics/main/section1_beach3.png',
						link: '/'
					},
					{
						temperature: 20,
						favorite: false,
						expensive: false,
						rating: 5.0,
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						pic: '/pics/main/section1_beach4.png',
						link: '/'
					},
					{
						temperature: 21,
						favorite: false,
						expensive: false,
						rating: 5.0,
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						pic: '/pics/main/section1_beach1.png',
						link: '/'
					},
					{
						temperature: 20,
						favorite: false,
						expensive: false,
						rating: 5.0,
						title: 'Пляж «Ялта – Интурист»',
						location: 'Ялта, КРЫМ',
						pic: '/pics/main/section1_beach2.png',
						link: '/'
					},
					{
						temperature: 22,
						favorite: false,
						expensive: true,
						rating: 5.0,
						title: 'Пляж «Лазурный берег»',
						location: 'Евпатория, КРЫМ',
						pic: '/pics/main/section1_beach3.png',
						link: '/'
					},
					{
						temperature: 20,
						favorite: false,
						expensive: false,
						rating: 5.0,
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						pic: '/pics/main/section1_beach4.png',
						link: '/'
					},
					{
						temperature: 21,
						favorite: false,
						expensive: false,
						rating: 5.0,
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						pic: '/pics/main/section1_beach1.png',
						link: '/'
					},
					{
						temperature: 20,
						favorite: false,
						expensive: false,
						rating: 5.0,
						title: 'Пляж «Ялта – Интурист»',
						location: 'Ялта, КРЫМ',
						pic: '/pics/main/section1_beach2.png',
						link: '/'
					}
				],
				searchMapData: [
					{
						pic: '/pics/main/section1_beach4.png',
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						rating: 5.0,
						beachLength: '1,6 км',
						beachPrice: 250,
						beachType: 'Песчаный',
						beachWorktime: '7:00-22:00',
						beachRoughness: 'Ровное'
					},
					{
						pic: '/pics/main/section1_beach4.png',
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						rating: 5.0,
						beachLength: '1,6 км',
						beachPrice: 250,
						beachType: 'Песчаный',
						beachWorktime: '7:00-22:00',
						beachRoughness: 'Ровное'
					},
					{
						pic: '/pics/main/section1_beach4.png',
						title: 'Массандровский пляж',
						location: 'Ялта, КРЫМ',
						rating: 5.0,
						beachLength: '1,6 км',
						beachPrice: 250,
						beachType: 'Песчаный',
						beachWorktime: '7:00-22:00',
						beachRoughness: 'Ровное'
					}
				]
			}
		}
	}
</script>