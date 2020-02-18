<template>
	<div class="favorites-page custom-page">
		<h1 class="favorites-page__title custom-page__title custom-container">Избранное</h1>
		<div class="favorites-page__favorites-types custom-container">
			<button class="favorites-page__favorites-type" @click="showBeachesOrEvents = false" :class="{ active: !showBeachesOrEvents }">
				Пляжи
			</button>
			<button class="favorites-page__favorites-type" @click="showBeachesOrEvents = true" :class="{ active: showBeachesOrEvents }">
				Мероприятия
			</button>
		</div>
		<CardGrid :data="beachesData" v-show="!showBeachesOrEvents" />
		<CardGrid :data="eventsData" :showIfVisited="true" v-show="showBeachesOrEvents" />
		<div class="custom-container">
			<h3 class="main-page__section-title">Посещенные мероприятия</h3>
			<h4 class="favorites-page__visited-empty" v-show="visited.length == 0">Пусто</h4>
		</div>
		<CardGrid :data="visited" :showIfVisited="true" :visited="true" v-show="visited.length > 0" />
	</div>
</template>

<script>
	import CardGrid from '~/components/global/CardGrid';

	export default {
		components: {
			CardGrid
		},

		mounted() {
			this.$bus.$on('visitedAdd', (link) => { // since beach links for each beach are unique, removing everything from here using them
				this.visited.push(this.eventsData.find(e => e.beachLink == link));
			});

			this.$bus.$on('visitedRemove', (link) => {
				this.visited = this.visited.filter((v) => {
					return v.beachLink != link;
				});
				this.$bus.$emit('updateVisited');
			});
		},

		data() {
			return {
				showBeachesOrEvents: false, // beaches: false, events: true
				visited: [],
				beachesData: [
		            {
		              temperature: 21,
		              favorite: false,
		              expensive: false, // ruble sign
		              rating: 4.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach1.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Пляж «Ялта – Интурист»',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach2.png'
		            },
		            {
		              temperature: 22,
		              favorite: false,
		              expensive: true,
		              rating: 5.0,
		              title: 'Пляж «Лазурный берег»',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section1_beach3.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach4.png'
		            },
		            {
		              temperature: 21,
		              favorite: false,
		              expensive: false, // ruble sign
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach1.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Пляж «Ялта – Интурист»',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach2.png'
		            },
		            {
		              temperature: 22,
		              favorite: false,
		              expensive: true,
		              rating: 5.0,
		              title: 'Пляж «Лазурный берег»',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section1_beach3.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach4.png'
		            },
		            {
		              temperature: 21,
		              favorite: false,
		              expensive: false, // ruble sign
		              rating: 4.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach1.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Пляж «Ялта – Интурист»',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach2.png'
		            },
		            {
		              temperature: 22,
		              favorite: false,
		              expensive: true,
		              rating: 5.0,
		              title: 'Пляж «Лазурный берег»',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section1_beach3.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach4.png'
		            },
		            {
		              temperature: 21,
		              favorite: false,
		              expensive: false, // ruble sign
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach1.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Пляж «Ялта – Интурист»',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach2.png'
		            },
		            {
		              temperature: 22,
		              favorite: false,
		              expensive: true,
		              rating: 5.0,
		              title: 'Пляж «Лазурный берег»',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section1_beach3.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach4.png'
		            },
		            {
		              temperature: 21,
		              favorite: false,
		              expensive: false, // ruble sign
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach1.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Пляж «Ялта – Интурист»',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach2.png'
		            },
		            {
		              temperature: 22,
		              favorite: false,
		              expensive: true,
		              rating: 5.0,
		              title: 'Пляж «Лазурный берег»',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section1_beach3.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach4.png'
		            },
		            {
		              temperature: 21,
		              favorite: false,
		              expensive: false, // ruble sign
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach1.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Пляж «Ялта – Интурист»',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach2.png'
		            },
		            {
		              temperature: 22,
		              favorite: false,
		              expensive: true,
		              rating: 5.0,
		              title: 'Пляж «Лазурный берег»',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section1_beach3.png'
		            },
		            {
		              temperature: 20,
		              favorite: false,
		              expensive: false,
		              rating: 5.0,
		              title: 'Массандровский пляж',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section1_beach4.png'
		            }
	          	],
	          	eventsData: [
	          		{
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/adsa',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/zx',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/xzcc',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/fafa',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/wqewq',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/aaa',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/z',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/xxx',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/adssa',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/ee',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/rrrr',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/zxczcxz',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/xz',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/ffffffff',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/hhhhhhhhhhh',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/jjjjjjjjjjjj',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/adsaq',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/yyy',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/iiii',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/oooo',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/ppppp',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/cwqa',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/zxwqeg',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/ggggggggg',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            }
	          	]
			}
		}
	}
</script>