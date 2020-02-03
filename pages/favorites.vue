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
	</div>
</template>

<script>
	import CardGrid from '~/components/global/CardGrid';

	export default {
		components: {
			CardGrid
		},

		data() {
			return {
				showBeachesOrEvents: false, // beaches: false, events: true
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
		              expensive: false,
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
		              expensive: true,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
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
		              expensive: true,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
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
		              expensive: true,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Ялта – Интурист»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event1.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '24.05-15.06',
		              title: 'Конкурс надувных матрасов',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event2.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: true,
		              date: '12-15.06',
		              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		              beach: 'Пляж «Лазурный берег»',
		              beachLink: '/',
		              location: 'Евпатория, КРЫМ',
		              pic: '/pics/main/section5_event3.png'
		            },
		            {
		              temperature: 24,
		              favorite: false,
		              expensive: false,
		              date: '19.06',
		              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
		              beach: 'Массандровский пляж',
		              beachLink: '/',
		              location: 'Ялта, КРЫМ',
		              pic: '/pics/main/section5_event4.png'
		            }
	          	]
			}
		}
	}
</script>